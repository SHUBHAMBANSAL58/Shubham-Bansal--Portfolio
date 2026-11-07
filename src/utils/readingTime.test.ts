import test from 'node:test';
import assert from 'node:assert/strict';
import { countWords, calculateReadingTime } from './readingTime';

test('countWords accurately splits text and handles string arrays', () => {
  assert.equal(countWords(''), 0);
  assert.equal(countWords('   '), 0);
  assert.equal(countWords('Hello world'), 2);
  assert.equal(countWords(['First sentence.', 'Second paragraph with more words.']), 7);
  assert.equal(countWords('Multiple   spaces   between\nwords\tand\r\nnewlines'), 6);
});

test('calculateReadingTime returns proper formatting and word count metadata', () => {
  // Empty
  const empty = calculateReadingTime('');
  assert.equal(empty.minutes, 0);
  assert.equal(empty.wordCount, 0);
  assert.equal(empty.formatted, '0 min read');

  // Short snippet (< 160 words at 200 WPM)
  const shortText = 'This is a short bio about a software engineer who builds web applications.';
  const shortResult = calculateReadingTime(shortText);
  assert.equal(shortResult.minutes, 1);
  assert.equal(shortResult.formatted, '< 1 min read');
  assert.ok(shortResult.label.includes('~13 words'));

  // Longer article / bio (> 300 words)
  const longText = Array.from({ length: 400 }, (_, i) => `word${i}`).join(' ');
  const longResult = calculateReadingTime(longText, 200);
  assert.equal(longResult.minutes, 2);
  assert.equal(longResult.formatted, '2 min read');
  assert.equal(longResult.wordCount, 400);
});
