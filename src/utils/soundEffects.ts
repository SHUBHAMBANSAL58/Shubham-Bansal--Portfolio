/**
 * Tactile Sound Effects Engine for Interactive UI
 * Built using the native Web Audio API (zero external asset dependencies, zero latency).
 * Produces subtle, low-volume, smooth tactile audio cues on user interaction.
 */

// Global audio context singleton
let audioCtx: AudioContext | null = null;
let lastSoundTime = 0;
const THROTTLE_MS = 75; // Prevent rapid audio stacking on quick cursor traversal

const STORAGE_KEY = 'sb_portfolio_audio_enabled';

/**
 * Returns true if sound effects are enabled by user preference.
 * Defaults to true.
 */
export const isSoundEnabled = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === null ? true : stored === 'true';
  } catch {
    return true;
  }
};

/**
 * Sets user audio preference.
 */
export const setSoundEnabled = (enabled: boolean): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, enabled ? 'true' : 'false');
  } catch {
    // Ignore storage errors in restricted iframe modes
  }
};

/**
 * Safely initializes or resumes the Web Audio context.
 * Browsers require a user gesture before starting the audio hardware.
 */
const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;

  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextClass) return null;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {
        // Silently catch autoplay restriction until user interaction
      });
    }

    return audioCtx;
  } catch {
    return null;
  }
};

// Automatically attach one-time window listeners to unlock audio upon first user gesture
if (typeof window !== 'undefined') {
  const unlock = () => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    window.removeEventListener('pointerdown', unlock);
    window.removeEventListener('keydown', unlock);
  };
  window.addEventListener('pointerdown', unlock, { passive: true });
  window.addEventListener('keydown', unlock, { passive: true });
}

/**
 * Plays a subtle, low-volume tactile hover sound effect for project cards.
 * Uses a soft sine-triangle hybrid oscillator with an exponential decay envelope
 * and low-pass filtering to create a modern, non-fatiguing haptic auditory cue.
 */
export const playProjectCardHoverSound = (): void => {
  if (!isSoundEnabled()) return;

  const now = performance.now();
  if (now - lastSoundTime < THROTTLE_MS) return;
  lastSoundTime = now;

  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  try {
    const currentTime = ctx.currentTime;
    const duration = 0.055; // 55ms total duration

    // Master gain node - strictly low volume (~0.022 peak)
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.0001, currentTime);
    // Smooth micro-attack (5ms) to prevent speaker popping
    masterGain.gain.linearRampToValueAtTime(0.024, currentTime + 0.006);
    // Soft exponential decay
    masterGain.gain.exponentialRampToValueAtTime(0.0001, currentTime + duration);

    // Low-pass filter to remove any harsh digital harmonics
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, currentTime);
    filter.frequency.exponentialRampToValueAtTime(600, currentTime + duration);

    // Warm, rounded primary oscillator (sine wave with subtle frequency slide)
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    // Frequency sweeps gently from 480Hz down to 340Hz (warm organic tactile click)
    osc.frequency.setValueAtTime(480, currentTime);
    osc.frequency.exponentialRampToValueAtTime(340, currentTime + duration);

    // Second harmonic overtone (very quiet, adds mechanical depth)
    const subOsc = ctx.createOscillator();
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(240, currentTime);
    subOsc.frequency.exponentialRampToValueAtTime(170, currentTime + duration);

    const subGain = ctx.createGain();
    subGain.gain.setValueAtTime(0.008, currentTime);
    subGain.gain.exponentialRampToValueAtTime(0.0001, currentTime + duration);

    // Connect node graph: [osc] -> [masterGain] -> [filter] -> [destination]
    osc.connect(masterGain);
    subOsc.connect(subGain);
    subGain.connect(masterGain);
    masterGain.connect(filter);
    filter.connect(ctx.destination);

    // Start and clean up
    osc.start(currentTime);
    subOsc.start(currentTime);
    osc.stop(currentTime + duration);
    subOsc.stop(currentTime + duration);

    osc.onended = () => {
      osc.disconnect();
      subOsc.disconnect();
      subGain.disconnect();
      masterGain.disconnect();
      filter.disconnect();
    };
  } catch {
    // Fail silently without disrupting UI
  }
};

/**
 * Plays a subtle, tactile click sound when selecting or opening cards/modals.
 */
export const playProjectCardClickSound = (): void => {
  if (!isSoundEnabled()) return;

  const ctx = getAudioContext();
  if (!ctx || ctx.state === 'suspended') return;

  try {
    const currentTime = ctx.currentTime;
    const duration = 0.065;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, currentTime);
    gain.gain.linearRampToValueAtTime(0.035, currentTime + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, currentTime + duration);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1800, currentTime);
    filter.frequency.exponentialRampToValueAtTime(800, currentTime + duration);

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(560, currentTime);
    osc.frequency.exponentialRampToValueAtTime(420, currentTime + duration);

    osc.connect(gain);
    gain.connect(filter);
    filter.connect(ctx.destination);

    osc.start(currentTime);
    osc.stop(currentTime + duration);

    osc.onended = () => {
      osc.disconnect();
      gain.disconnect();
      filter.disconnect();
    };
  } catch {
    // Fail silently
  }
};
