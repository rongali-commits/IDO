import test from 'node:test';
import assert from 'node:assert/strict';
import { formatProjectBrief } from '../lib/project-brief.ts';

test('the brief preserves the workflow and clearly states optional blanks', () => {
  const result = formatProjectBrief({ name: '  Alex  ', business: '', workflow: 'Track enquiries\nand the next follow-up.', tools: '', budget: '$249 workflow clarity sprint', timeline: '' });
  assert.ok(result.includes('Name: Alex\n'));
  assert.ok(result.includes('Business or website: Not specified'));
  assert.ok(result.includes('Track enquiries\nand the next follow-up.'));
  assert.ok(result.includes('Budget range: $249 workflow clarity sprint'));
  assert.ok(result.includes('Preferred timeline: Not specified'));
});

test('email encoding preserves punctuation without creating new query parameters', () => {
  const result = formatProjectBrief({ name: 'Maya & Alex', business: 'https://example.com/?a=1&b=2', workflow: 'Review & approve #1', tools: 'CRM', budget: 'Exploring', timeline: 'Within a month' });
  const url = new URL(`mailto:hello@noerong.com?subject=${encodeURIComponent('Noerong project brief')}&body=${encodeURIComponent(result)}`);
  assert.equal(url.searchParams.get('body'), result);
  assert.equal([...url.searchParams.keys()].length, 2);
});
