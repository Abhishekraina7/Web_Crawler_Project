# What is a module?

- In JavaScript, a module is a file that contains a self-contained piece of code that can be imported and used by other parts of an application. In this case, we're creating a module called crawl.js.

# What is the normalizeURL function?

- The normalizeURL function takes a URL as an input and returns a normalized version of that URL. 
- In this example, the function removes any trailing slashes from the URL and converts it to lowercase. 
- This can be useful when working with URLs, as it ensures that they're in a consistent format.

# What does module.exports do?

- module.exports is a way to export specific functions or variables from a module, making them available for use by other parts of the application. 
- In our case, we're exporting the normalizeURL function from the crawl.js module.
- By using module.exports, we're making the normalizeURL function a public API of the crawl.js module. 
- This means that other parts of the application can import the crawl.js module and use the normalizeURL function.