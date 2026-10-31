import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  alternateLocalePath,
  formatBoxIndex,
  formatDate,
  getLocaleFromPath,
  localePath,
  toLocaleDigits,
} from '../src/i18n/utils.ts';

describe('localePath', () => {
  it('keeps Persian paths at the root', () => {
    assert.equal(localePath('fa', '/'), '/');
    assert.equal(localePath('fa', '/about'), '/about');
    assert.equal(localePath('fa', '/#contact'), '/#contact');
  });

  it('prefixes English paths', () => {
    assert.equal(localePath('en', '/'), '/en');
    assert.equal(localePath('en', '/about'), '/en/about');
    assert.equal(localePath('en', 'about'), '/en/about');
  });

  it('leaves no slash between the prefix and a root hash or query', () => {
    assert.equal(localePath('en', '/#contact'), '/en#contact');
    assert.equal(localePath('en', '/?contact=sent#contact'), '/en?contact=sent#contact');
  });
});

describe('alternateLocalePath', () => {
  it('maps a page to the same page in the other language', () => {
    assert.equal(alternateLocalePath('fa', '/'), '/en');
    assert.equal(alternateLocalePath('en', '/en'), '/');
    assert.equal(alternateLocalePath('fa', '/articles/x'), '/en/articles/x');
    assert.equal(alternateLocalePath('en', '/en/articles/x'), '/articles/x');
  });

  it('does not mistake a path that merely starts with "en" for the prefix', () => {
    assert.equal(alternateLocalePath('en', '/enterprise'), '/enterprise');
  });
});

describe('getLocaleFromPath', () => {
  it('reads the locale from the first segment only', () => {
    assert.equal(getLocaleFromPath('/'), 'fa');
    assert.equal(getLocaleFromPath('/about'), 'fa');
    assert.equal(getLocaleFromPath('/en'), 'en');
    assert.equal(getLocaleFromPath('/en/about'), 'en');
    assert.equal(getLocaleFromPath('/enterprise'), 'fa');
  });
});

describe('digits', () => {
  it('converts Western digits for Persian only', () => {
    assert.equal(toLocaleDigits(1405, 'fa'), '۱۴۰۵');
    assert.equal(toLocaleDigits('24/7', 'fa'), '۲۴/۷');
    assert.equal(toLocaleDigits(1405, 'en'), '1405');
  });

  it('pads box indexes to two digits', () => {
    assert.equal(formatBoxIndex(3, 'en'), '03');
    assert.equal(formatBoxIndex(3, 'fa'), '۰۳');
    assert.equal(formatBoxIndex(12, 'en'), '12');
  });
});

describe('formatDate', () => {
  it('keeps a date-only value on its own day in any timezone', () => {
    const original = process.env.TZ;
    try {
      for (const zone of ['America/Los_Angeles', 'Pacific/Auckland']) {
        process.env.TZ = zone;
        assert.equal(formatDate(new Date('2026-10-20'), 'en'), 'October 20, 2026');
      }
    } finally {
      process.env.TZ = original;
    }
  });

  it('uses the Persian calendar for Persian', () => {
    assert.match(formatDate(new Date('2026-10-20'), 'fa'), /۱۴۰۵/);
  });
});
