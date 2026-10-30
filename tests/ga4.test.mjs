import test from 'node:test';
import assert from 'node:assert/strict';
import { analyticsPage, cleanReferrer } from '../lib/ga4.mjs';

test('GA4 tracks only production public paths without URL parameters', () => {
  assert.equal(analyticsPage('https://shh-magazine.vercel.app/read/2026-09?page=10&entry_id=abc'), 'https://shh-magazine.vercel.app/read/2026-09');
  assert.equal(analyticsPage('https://shh-magazine.vercel.app/admin/preview/issues/2026-09'), null);
  assert.equal(analyticsPage('https://preview.vercel.app/issues'), null);
});
test('referrer preserves source host without query or private path', () => {
  assert.equal(cleanReferrer('https://example.com/path?secret=1'), 'https://example.com/');
  assert.equal(cleanReferrer(''), '');
});
