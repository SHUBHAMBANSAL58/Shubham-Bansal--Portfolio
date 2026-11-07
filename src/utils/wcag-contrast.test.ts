import { test } from 'node:test';
import assert from 'node:assert/strict';

/**
 * Calculates WCAG 2.2 Relative Luminance for an sRGB hex or RGB color
 * Specification: https://www.w3.org/WAI/GL/wiki/Relative_luminance
 */
export function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((val) => {
    const s = val / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Parses Hex color to [R, G, B]
 */
export function hexToRgb(hex: string): [number, number, number] {
  const cleaned = hex.replace('#', '').trim();
  if (cleaned.length === 3) {
    return [
      parseInt(cleaned[0] + cleaned[0], 16),
      parseInt(cleaned[1] + cleaned[1], 16),
      parseInt(cleaned[2] + cleaned[2], 16)
    ];
  }
  return [
    parseInt(cleaned.slice(0, 2), 16),
    parseInt(cleaned.slice(2, 4), 16),
    parseInt(cleaned.slice(4, 6), 16)
  ];
}

/**
 * Calculates WCAG 2.2 Contrast Ratio between foreground and background colors
 */
export function calculateContrastRatio(fgHex: string, bgHex: string): number {
  const [r1, g1, b1] = hexToRgb(fgHex);
  const [r2, g2, b2] = hexToRgb(bgHex);
  const lum1 = getRelativeLuminance(r1, g1, b1);
  const lum2 = getRelativeLuminance(r2, g2, b2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return Number(((brightest + 0.05) / (darkest + 0.05)).toFixed(2));
}

test('WCAG 2.2 AA Contrast Compliance: Light Mode Tokens', () => {
  const lightBgCanvas = '#f8fafc'; // slate-50
  const lightBgCard = '#ffffff';   // white
  const lightBgSurface = '#f1f5f9';// slate-100

  // 1. Primary Text on Card & Canvas
  const textPrimary = '#0f172a'; // slate-900
  const contrastPrimaryCard = calculateContrastRatio(textPrimary, lightBgCard);
  const contrastPrimaryCanvas = calculateContrastRatio(textPrimary, lightBgCanvas);
  assert.ok(contrastPrimaryCard >= 7.0, `Primary on Card should exceed AAA (got ${contrastPrimaryCard}:1)`);
  assert.ok(contrastPrimaryCanvas >= 7.0, `Primary on Canvas should exceed AAA (got ${contrastPrimaryCanvas}:1)`);

  // 2. Secondary Text on Card
  const textSecondary = '#1e293b'; // slate-800
  const contrastSecondaryCard = calculateContrastRatio(textSecondary, lightBgCard);
  assert.ok(contrastSecondaryCard >= 7.0, `Secondary text on Card should exceed AAA (got ${contrastSecondaryCard}:1)`);

  // 3. Body Copy on Card & Canvas
  const textBody = '#334155'; // slate-700
  const contrastBodyCard = calculateContrastRatio(textBody, lightBgCard);
  const contrastBodyCanvas = calculateContrastRatio(textBody, lightBgCanvas);
  assert.ok(contrastBodyCard >= 7.0, `Body on Card should exceed AAA (got ${contrastBodyCard}:1)`);
  assert.ok(contrastBodyCanvas >= 7.0, `Body on Canvas should exceed AAA (got ${contrastBodyCanvas}:1)`);

  // 4. Muted Text on Card (WCAG AA requires 4.5:1)
  const textMuted = '#475569'; // slate-600
  const contrastMutedCard = calculateContrastRatio(textMuted, lightBgCard);
  assert.ok(contrastMutedCard >= 4.5, `Muted text on Card must pass WCAG AA 4.5:1 (got ${contrastMutedCard}:1)`);

  // 5. Accent Indigo Text on Card
  const textAccent = '#3730a3'; // indigo-800
  const contrastAccentCard = calculateContrastRatio(textAccent, lightBgCard);
  assert.ok(contrastAccentCard >= 7.0, `Accent text on Card must exceed AAA (got ${contrastAccentCard}:1)`);

  // 6. Cyan Deep Accent on Card & Cyan Soft Badges
  const textCyanDeep = '#155e75'; // cyan-800
  const contrastCyanCard = calculateContrastRatio(textCyanDeep, lightBgCard);
  const contrastCyanBadge = calculateContrastRatio(textCyanDeep, '#ecfeff'); // cyan-50 badge bg
  assert.ok(contrastCyanCard >= 7.0, `Deep cyan text on Card must exceed AAA (got ${contrastCyanCard}:1)`);
  assert.ok(contrastCyanBadge >= 4.5, `Deep cyan text on Cyan Badge must pass AA 4.5:1 (got ${contrastCyanBadge}:1)`);

  // 7. Primary Action Button: White text on Indigo-600 background
  const btnPrimaryBg = '#4f46e5'; // indigo-600
  const btnPrimaryText = '#ffffff';
  const contrastPrimaryBtn = calculateContrastRatio(btnPrimaryText, btnPrimaryBg);
  assert.ok(contrastPrimaryBtn >= 4.5, `Primary CTA button must pass WCAG AA 4.5:1 (got ${contrastPrimaryBtn}:1)`);

  // 8. Secondary Button: Slate-900 text on White button
  const contrastSecondaryBtn = calculateContrastRatio('#0f172a', '#ffffff');
  assert.ok(contrastSecondaryBtn >= 7.0, `Secondary button text must exceed AAA (got ${contrastSecondaryBtn}:1)`);

  // 9. Ghost Button: Slate-800 text on Slate-100 button
  const contrastGhostBtn = calculateContrastRatio('#1e293b', lightBgSurface);
  assert.ok(contrastGhostBtn >= 7.0, `Ghost button text must exceed AAA (got ${contrastGhostBtn}:1)`);
});

test('WCAG 2.2 AA Contrast Compliance: Dark Mode Tokens', () => {
  const darkBgCanvas = '#030712'; // slate-950
  const darkBgCard = '#0f172a';   // slate-900 card surface
  const darkBgSurface = '#1e293b';// slate-800 elevated surface

  // 1. Primary Text on Canvas & Card
  const textPrimary = '#f8fafc'; // slate-50
  const contrastPrimaryCanvas = calculateContrastRatio(textPrimary, darkBgCanvas);
  const contrastPrimaryCard = calculateContrastRatio(textPrimary, darkBgCard);
  assert.ok(contrastPrimaryCanvas >= 7.0, `Primary on Canvas should exceed AAA (got ${contrastPrimaryCanvas}:1)`);
  assert.ok(contrastPrimaryCard >= 7.0, `Primary on Card should exceed AAA (got ${contrastPrimaryCard}:1)`);

  // 2. Secondary Text on Canvas & Card
  const textSecondary = '#e2e8f0'; // slate-200
  const contrastSecondaryCanvas = calculateContrastRatio(textSecondary, darkBgCanvas);
  const contrastSecondaryCard = calculateContrastRatio(textSecondary, darkBgCard);
  assert.ok(contrastSecondaryCanvas >= 7.0, `Secondary on Canvas should exceed AAA (got ${contrastSecondaryCanvas}:1)`);
  assert.ok(contrastSecondaryCard >= 7.0, `Secondary on Card should exceed AAA (got ${contrastSecondaryCard}:1)`);

  // 3. Body Copy on Card & Canvas
  const textBody = '#cbd5e1'; // slate-300
  const contrastBodyCanvas = calculateContrastRatio(textBody, darkBgCanvas);
  const contrastBodyCard = calculateContrastRatio(textBody, darkBgCard);
  assert.ok(contrastBodyCanvas >= 7.0, `Body on Canvas should exceed AAA (got ${contrastBodyCanvas}:1)`);
  assert.ok(contrastBodyCard >= 7.0, `Body on Card should exceed AAA (got ${contrastBodyCard}:1)`);

  // 4. Muted Text on Card (WCAG AA requires 4.5:1)
  const textMuted = '#94a3b8'; // slate-400
  const contrastMutedCard = calculateContrastRatio(textMuted, darkBgCard);
  assert.ok(contrastMutedCard >= 4.5, `Muted text on Card must pass WCAG AA 4.5:1 (got ${contrastMutedCard}:1)`);

  // 5. Accent Indigo Text on Canvas (WCAG AA requires >= 4.5:1)
  const textAccent = '#818cf8'; // indigo-400
  const contrastAccentCanvas = calculateContrastRatio(textAccent, darkBgCanvas);
  assert.ok(contrastAccentCanvas >= 4.5, `Accent text on Canvas must pass WCAG AA 4.5:1 (got ${contrastAccentCanvas}:1)`);

  // 6. Cyan Accent Text on Canvas
  const textCyan = '#22d3ee'; // cyan-400
  const contrastCyanCanvas = calculateContrastRatio(textCyan, darkBgCanvas);
  assert.ok(contrastCyanCanvas >= 7.0, `Cyan text on Canvas must exceed AAA (got ${contrastCyanCanvas}:1)`);

  // 7. Dark Mode Secondary Button: Slate-50 on Slate-900
  const contrastDarkSecBtn = calculateContrastRatio('#f8fafc', darkBgCard);
  assert.ok(contrastDarkSecBtn >= 7.0, `Dark secondary button must exceed AAA (got ${contrastDarkSecBtn}:1)`);

  // 8. Dark Mode Ghost Button: Slate-200 on Slate-800
  const contrastDarkGhostBtn = calculateContrastRatio('#e2e8f0', darkBgSurface);
  assert.ok(contrastDarkGhostBtn >= 7.0, `Dark ghost button must exceed AAA (got ${contrastDarkGhostBtn}:1)`);
});
