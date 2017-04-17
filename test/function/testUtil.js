'use strict';

let {
    filterTextByLang
} = require('../../src/util');

let assert = require('assert');

describe('util', () => {
    it('filterTextByLang: base', () => {
        assert.deepEqual(filterTextByLang('abc\ndef'), [
            'abc', 'def'
        ]);
    });

    it('filterTextByLang: zh', () => {
        assert.deepEqual(filterTextByLang('abc\n[readme-lang:zh]def', 'zh'), ['def']);
    });

    it('filterTextByLang: mul line', () => {
        assert.deepEqual(filterTextByLang('abc\n[readme-lang:zh]def\nok\ngood', 'zh'), ['def', 'ok', 'good']);
    });

    it('filterTextByLang: mul line2', () => {
        assert.deepEqual(filterTextByLang('abc\n[readme-lang:zh]def\n[readme-lang:zh]ok', 'zh'), ['def', 'ok']);
    });

    it('filterTextByLang: mul line3', () => {
        assert.deepEqual(filterTextByLang('abc\n[readme-lang:zh]def\nok\n[readme-lang:en]good', 'zh'), ['def', 'ok']);
        assert.deepEqual(filterTextByLang('abc\n[readme-lang:zh]def\nok\n[readme-lang:en]good'), ['abc', 'good']);
    });
});
