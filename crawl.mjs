
export { normalizeURL };

var input_url = 'https://blog.boot.dev/path';


function normalizeURL(input_url) {
    const extracted_url = new URL(input_url)
    console.log(extracted_url.hostname);
}

normalizeURL(input_url)