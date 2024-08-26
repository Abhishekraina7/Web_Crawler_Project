import { test, expect } from "@jest/globals";


// ES Module support is enabled using babel, because Babel to convert your ES module code to CommonJS syntax that Jest can understand
//Jest doesn't support ES modules out of the box.

// normalizeURL.test.js

const { normalizeURL } = require('./crawl');

describe('normalizeURL', () => {
    it('removes protocol (http/https)', () => {
        expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path');
        expect(normalizeURL('http://blog.boot.dev/path')).toBe('blog.boot.dev/path');
    });
    it('removes trailing slashes', () => {
        expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
        expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
    });

    it('handles URLs with no path', () => {
        expect(normalizeURL('https://blog.boot.dev')).toBe('blog.boot.dev');
        expect(normalizeURL('http://blog.boot.dev')).toBe('blog.boot.dev');
    });

    it('handles URLs with query parameters', () => {
        expect(normalizeURL('https://blog.boot.dev/path?a=1&b=2')).toBe('blog.boot.dev/path');
        expect(normalizeURL('http://blog.boot.dev/path?a=1&b=2')).toBe('blog.boot.dev/path');
    });

    it('handles URLs with fragments', () => {
        expect(normalizeURL('https://blog.boot.dev/path#anchor')).toBe('blog.boot.dev/path');
        expect(normalizeURL('http://blog.boot.dev/path#anchor')).toBe('blog.boot.dev/path');
    });

    it('normalizes multiple examples of the same URL', () => {
        const urls = [
            'https://blog.boot.dev/path/',
            'https://blog.boot.dev/path',
            'http://blog.boot.dev/path/',
            'http://blog.boot.dev/path',
        ];
        const expected = 'blog.boot.dev/path';
        urls.forEach((url) => {
            expect(normalizeURL(url)).toBe(expected);
        });
    });
});

//test for getURLsFromHTML function

const assert = require('assert');
const { getURLsFromHTML } = require('./crawl');

describe('getURLsFromHTML', () => {
    it('converts relative URLs to absolute URLs', () => {
        const htmlBody = '<a href="/about">About</a>';
        const baseURL = 'https://example.com';
        const expectedUrls = ['https://example.com/about'];
        const actualUrls = getURLsFromHTML(htmlBody, baseURL);
        assert.deepStrictEqual(actualUrls, expectedUrls);
    });

    it('finds all anchor elements in a body of HTML', () => {
        const htmlBody = `
      <body>
        <a href="/about">About</a>
        <p>Some text</p>
        <a href="/contact">Contact</a>
        <a href="/faq">FAQ</a>
      </body>
    `;
        const baseURL = 'https://example.com';
        const expectedUrls = [
            'https://example.com/about',
            'https://example.com/contact',
            'https://example.com/faq',
        ];
        const actualUrls = getURLsFromHTML(htmlBody, baseURL);
        assert.deepStrictEqual(actualUrls, expectedUrls);
    });

    it('ignores anchor elements with no href attribute', () => {
        const htmlBody = `
      <body>
        <a>About</a>
        <a href="/contact">Contact</a>
      </body>
    `;
        const baseURL = 'https://example.com';
        const expectedUrls = ['https://example.com/contact'];
        const actualUrls = getURLsFromHTML(htmlBody, baseURL);
        assert.deepStrictEqual(actualUrls, expectedUrls);
    });
});