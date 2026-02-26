// NOTE: JavaScript Array replaces Java's ArrayList. No type enforcement.
// NOTE: Node.js uses readline for user input instead of Java's Scanner.

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let continueInput = "Y";
const names = [];

function askName() {
    if (continueInput.toUpperCase() === "Y") {
        rl.question("Enter the name\n", (name) => {
            names.push(name);
            rl.question("Do you want to enter another name Y/N\n", (answer) => {
                continueInput = answer;
                askName();
            });
        });
    } else {
        for (const name of names) {
            console.log(name);
        }
        rl.close();
    }
}

askName();
