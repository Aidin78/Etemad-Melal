import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { parseArticleId } from '../src/lib/article-utils.ts';
import { getYearsActive } from '../src/lib/dates.ts';
import { serializeJsonLd } from '../src/lib/json-ld.ts';
import { parsePanelLinks, splitTitleAccent } from '../src/lib/rich-text.ts';

const panelUrl = 'https://panel.example.com';

describe('parsePanelLinks', () => {
  it('turns a panel hostname into a link and keeps the surrounding text', () => {
    assert.deepEqual(parsePanelLinks('Our panel (panel.etemadmelal.com) is live.', panelUrl), [
      { type: 'text', value: 'Our panel (' },
      { type: 'link', label: 'panel.etemadmelal.com', href: panelUrl },
      { type: 'text', value: ') is live.' },
    ]);
  });

  it('matches the bare domain too', () => {
    assert.equal(parsePanelLinks('See etemadmelal.com', panelUrl)[1].type, 'link');
  });

  it('leaves the domain of an email address alone', () => {
    assert.deepEqual(parsePanelLinks('Write to info@etemadmelal.com', panelUrl), [
      { type: 'text', value: 'Write to info@etemadmelal.com' },
    ]);
  });

  it('returns plain text unchanged', () => {
    assert.deepEqual(parsePanelLinks('No hosts here', panelUrl), [{ type: 'text', value: 'No hosts here' }]);
  });
});

describe('splitTitleAccent', () => {
  it('moves the last word to the accent', () => {
    assert.deepEqual(splitTitleAccent('Terms and Conditions'), { title: 'Terms and', titleAccent: 'Conditions' });
  });

  it('keeps a single word whole', () => {
    assert.deepEqual(splitTitleAccent('FAQ'), { title: 'FAQ', titleAccent: '' });
  });
});

describe('getYearsActive', () => {
  it('rolls over on the anniversary, not before', () => {
    assert.equal(getYearsActive(new Date(2026, 7, 22)), 0);
    assert.equal(getYearsActive(new Date(2026, 7, 23)), 1);
    assert.equal(getYearsActive(new Date(2027, 7, 22)), 1);
    assert.equal(getYearsActive(new Date(2027, 7, 23)), 2);
  });

  it('never goes negative before the anchor date', () => {
    assert.equal(getYearsActive(new Date(2024, 0, 1)), 0);
  });
});

describe('parseArticleId', () => {
  it('splits locale and slug', () => {
    assert.deepEqual(parseArticleId('en/gold-inflation-hedge'), { locale: 'en', slug: 'gold-inflation-hedge' });
    assert.deepEqual(parseArticleId('fa/gold-inflation-hedge'), { locale: 'fa', slug: 'gold-inflation-hedge' });
  });

  it('keeps nested slugs intact', () => {
    assert.deepEqual(parseArticleId('en/guides/gold'), { locale: 'en', slug: 'guides/gold' });
  });

  it('falls back to Persian for an id without a locale', () => {
    assert.deepEqual(parseArticleId('standalone'), { locale: 'fa', slug: 'standalone' });
    assert.deepEqual(parseArticleId('de/x'), { locale: 'fa', slug: 'de/x' });
  });
});

describe('serializeJsonLd', () => {
  it('cannot be closed from inside a value', () => {
    const json = serializeJsonLd({ name: '</script><script>alert(1)</script>' });
    assert.ok(!json.includes('<'));
    assert.deepEqual(JSON.parse(json), { name: '</script><script>alert(1)</script>' });
  });

  it('keeps Persian text readable', () => {
    assert.equal(serializeJsonLd({ name: 'اعتماد ملل' }), '{"name":"اعتماد ملل"}');
  });
});
