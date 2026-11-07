import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateScrollProgress, getScrollGradient, computeScrollLinkedCardTransform } from './scrollProgress';

test('calculateScrollProgress calculates exact percentages and clamps within 0 to 100', () => {
  // At the top
  assert.equal(calculateScrollProgress(0, 2000, 1000), 0);

  // At 50%
  assert.equal(calculateScrollProgress(500, 2000, 1000), 50);

  // At the bottom
  assert.equal(calculateScrollProgress(1000, 2000, 1000), 100);

  // Over-scrolled (bounce / elastic scroll)
  assert.equal(calculateScrollProgress(1200, 2000, 1000), 100);

  // Negative scroll (pull down / bounce at top)
  assert.equal(calculateScrollProgress(-50, 2000, 1000), 0);

  // Zero or negative max scroll (short page)
  assert.equal(calculateScrollProgress(100, 800, 1000), 0);
});

test('getScrollGradient changes color gradient stages based on scroll depth', () => {
  const stage1 = getScrollGradient(10);
  assert.ok(stage1.gradient.includes('#06b6d4'), 'Stage 1 should feature electric cyan');
  assert.equal(stage1.stageName, 'Introduction & About');

  const stage2 = getScrollGradient(35);
  assert.ok(stage2.gradient.includes('#6366f1'), 'Stage 2 should feature indigo');
  assert.equal(stage2.stageName, 'Skills & Experience');

  const stage3 = getScrollGradient(60);
  assert.ok(stage3.gradient.includes('#a855f7'), 'Stage 3 should feature purple');
  assert.equal(stage3.stageName, 'Engineering Projects & Journey');

  const stage4 = getScrollGradient(90);
  assert.ok(stage4.gradient.includes('#10b981'), 'Stage 4 should complete in emerald');
  assert.equal(stage4.stageName, 'Credentials & Contact');
});

test('computeScrollLinkedCardTransform calculates smooth entrance transforms and respects boundaries', () => {
  // Start of entrance (progress = 0)
  const atStart = computeScrollLinkedCardTransform(0);
  assert.equal(atStart.opacity, 0.6);
  assert.equal(atStart.scale, 0.95);
  assert.equal(atStart.y, 32);

  // Fully entered focal viewport area (progress = 1)
  const atFull = computeScrollLinkedCardTransform(1);
  assert.equal(atFull.opacity, 1);
  assert.equal(atFull.scale, 1);
  assert.equal(atFull.y, 0);

  // Mid-way entrance (progress = 0.5)
  const atMid = computeScrollLinkedCardTransform(0.5);
  assert.ok(atMid.opacity > 0.6 && atMid.opacity < 1);
  assert.ok(atMid.scale > 0.95 && atMid.scale < 1);
  assert.ok(atMid.y > 0 && atMid.y < 32);

  // Clamped bounds for overscroll or negative values
  const over = computeScrollLinkedCardTransform(1.5);
  assert.equal(over.opacity, 1);
  assert.equal(over.scale, 1);
  assert.equal(over.y, 0);

  const under = computeScrollLinkedCardTransform(-0.5);
  assert.equal(under.opacity, 0.6);
  assert.equal(under.scale, 0.95);
  assert.equal(under.y, 32);

  // Reduced motion support
  const reduced = computeScrollLinkedCardTransform(0, { reduceMotion: true });
  assert.equal(reduced.opacity, 1);
  assert.equal(reduced.scale, 1);
  assert.equal(reduced.y, 0);
});

