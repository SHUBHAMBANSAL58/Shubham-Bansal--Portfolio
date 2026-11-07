import test from 'node:test';
import assert from 'node:assert/strict';
import { getInitialTheme, THEME_STORAGE_KEY } from './theme';

test('getInitialTheme defaults to dark when localStorage is empty', () => {
  assert.equal(getInitialTheme(), 'dark');
});

test('THEME_STORAGE_KEY is configured with unique namespace', () => {
  assert.equal(THEME_STORAGE_KEY, 'sb_portfolio_theme');
});
