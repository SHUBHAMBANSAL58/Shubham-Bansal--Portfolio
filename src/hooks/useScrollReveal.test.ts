import test from 'node:test';
import assert from 'node:assert/strict';
import { getScrollRevealConfig } from './useScrollReveal';

test('getScrollRevealConfig applies default values', () => {
  const config = getScrollRevealConfig();

  assert.equal(config.distance, 24);
  assert.equal(config.duration, 0.6);
  assert.equal(config.delay, 0);
  assert.equal(config.once, true);
  assert.deepEqual(config.initial, { opacity: 0, y: 24 });
  assert.deepEqual(config.animate, { opacity: 1, y: 0 });
});

test('getScrollRevealConfig supports custom distance, duration, and delay', () => {
  const config = getScrollRevealConfig({
    distance: 40,
    duration: 0.8,
    delay: 0.2,
    once: false
  });

  assert.equal(config.distance, 40);
  assert.equal(config.duration, 0.8);
  assert.equal(config.delay, 0.2);
  assert.equal(config.once, false);
  assert.deepEqual(config.initial, { opacity: 0, y: 40 });
  assert.equal(config.transition.delay, 0.2);
});

test('getScrollRevealConfig respects prefers-reduced-motion', () => {
  const config = getScrollRevealConfig(
    { distance: 30, duration: 0.7 },
    true // shouldReduceMotion = true
  );

  // When reduced motion is requested, Y translation must be 0 and duration short
  assert.deepEqual(config.initial, { opacity: 0, y: 0 });
  assert.equal(config.duration, 0.2);
  assert.equal(config.transition.duration, 0.2);
});
