// NOTE: JavaScript has no checked exceptions. All exceptions are unchecked. try/catch/finally works the same.

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('', (input) => {
    try {
        let v = parseInt(input);
        if (isNaN(v) || v === 0) {
            throw new Error("/ by zero");
        }
        let a = Math.floor(10 / v);
        console.log(a);
    } catch (e) {
        console.log(e.message);
    } finally {
        rl.close();
        // db, json, ...close
    }
});
