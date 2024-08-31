
export { normalizeURL }; // this makes the normalizeURL function available to be used in other modules using 'import'
export { getURLsFromHTML };
export { crawlPage };

const currentURL = ''

function normalizeURL(url) {
    const urlObject = new URL(url);
    const pathname = urlObject.pathname.replace(/\/$/, ''); // remove trailing slash
    const hostname = urlObject.hostname;
    currentURL = `${hostname}${pathname}`;
    return currentURL;
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

async function crawlPage(URL) {
    try {
        const response = await fetch(currentURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'text/html',
            }
        })
        const content_Type = response.headers.get('Content-Type')
        // for status code error handling
        if (response.status >= 400) {
            console.error(`Error ${response.status}: ${response.statusText}`)
        }
        // for content_Type error handling
        if (!content_Type || !content_Type.includes('text/html')) {
            console.error('Error: Expected text/html content type, but got:', content_Type);
        }
        else {
            const htmlstring = await response.text();
            console.log(htmlstring); // Print the HTML response as a string
            return htmlstring; // Return the HTML string if needed
        }

    } catch (err) {
        console.log(`Tried but I catced this: ${err}`)
    }
}

// crawlPage(currentURL)

