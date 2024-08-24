
export { normalizeURL }; // this makes the normalizeURL function available to be used in other modules using 'import'



function normalizeURL(url) {
    const urlObject = new URL(url);
    const protocol = urlObject.protocol === 'http:' ? 'http://' : 'https://';
    const pathname = urlObject.pathname.replace(/\/$/, ''); // remove trailing slash
    const hostname = urlObject.hostname;
    return `${protocol}${hostname}${pathname}`;
}

