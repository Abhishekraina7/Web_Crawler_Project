
export { normalizeURL }; // this makes the normalizeURL function available to be used in other modules using 'import'
export { getURLsFromHTML };

function normalizeURL(url) {
    const urlObject = new URL(url);
    const pathname = urlObject.pathname.replace(/\/$/, ''); // remove trailing slash
    const hostname = urlObject.hostname;
    return `${hostname}${pathname}`;
}


//This function takes a string of HTML as input and returns a list of all the link URLs.

const jsdom = require('jsdom');

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new jsdom.JSDOM(htmlBody);
    const urls = [];

    // Extract URLs from <a> tags
    dom.window.document.querySelectorAll('a').forEach((anchor) => {
        const href = anchor.getAttribute('href');
        if (href) {
            urls.push(new URL(href, baseURL).href);
        }
    });

    // Extract URLs from <img> tags
    dom.window.document.querySelectorAll('img').forEach((img) => {
        const src = img.getAttribute('src');
        if (src) {
            urls.push(new URL(src, baseURL).href);
        }
    });

    // Extract URLs from <script> tags
    dom.window.document.querySelectorAll('script').forEach((script) => {
        const src = script.getAttribute('src');
        if (src) {
            urls.push(new URL(src, baseURL).href);
        }
    });

    // Extract URLs from <link> tags
    dom.window.document.querySelectorAll('link').forEach((link) => {
        const href = link.getAttribute('href');
        if (href) {
            urls.push(new URL(href, baseURL).href);
        }
    });

    return urls;
}



