//This piece of code asks the user's name, and once the text is entered and the user presses enter, we send a greeting.

function main(input) {

    const { argv } = require('node:process');
    if (argv.length !== 3) {
        console.error('Error: Invalid number of arguments.');
        console.error('Usage: node cli.js <argument>');
        process.exit(1);
    }
    const argument = argv[input]
    console.log(`Processing: ${argument} please wait......`)
}

main(2)





// const readline = require('node:readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// rl.question(`What's your name?`, name => {
//     console.log(`Hi ${name}!`);
//     rl.close();
// });

// The question() method shows the first parameter (a question) and waits for the user input.
//It calls the callback function once enter is pressed.
