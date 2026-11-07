import test from 'node:test';
import assert from 'node:assert/strict';
import { ErrorBoundary } from './ErrorBoundary';

test('ErrorBoundary.getDerivedStateFromError updates state to hasError: true', () => {
  const err = new Error('Test unexpected runtime condition');
  const nextState = ErrorBoundary.getDerivedStateFromError(err);
  assert.equal(nextState.hasError, true);
  assert.equal(nextState.error?.message, 'Test unexpected runtime condition');
});
