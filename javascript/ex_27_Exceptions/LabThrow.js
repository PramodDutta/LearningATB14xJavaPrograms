// NOTE: JavaScript has no checked exceptions. All exceptions are unchecked. try/catch/finally works the same.

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('', (input) => {
    if (input.toLowerCase() !== "pramod") {
        rl.close();
        throw new Error("Hehehehe");
    }
    rl.close();
});
