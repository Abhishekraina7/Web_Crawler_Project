const { test, expect } = require("@jest/globals");
const { normalizeURL } = require("./crawl.mjs");


// normalizeURL.test.js
const normalizeURL = require('./normalizeURL');

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


// describe('normalizeURL', () => {
//     it('removes protocols (http/https)', () => {
//         expect(normalizeURL('https://blog.boot.dev/path').toBe('blog.boot.dev/path'));
//         expect(normalizeURL('http://blog.boot.dev/path').toBe('blog.boot.dev/path'));
//     })
// })