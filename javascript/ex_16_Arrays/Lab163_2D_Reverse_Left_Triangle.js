// Converted from: ex_16_Arrays/Lab163_2D_Reverse_Left_Triangle.java
// Note: Java's Scanner is replaced with Node.js readline module for CLI input.

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// left hand triangle pattern
// How the pattern we want
//  n = 3
// *
// **
// ***

rl.question("Enter the n for the pattern, e.g n = 3\n", (answer) => {
    const n = parseInt(answer);

    for (let i = n; i >= 1; i--) {
        let row = "";
        for (let j = 1; j <= i; j++) {
            row += "*";
        }
        console.log(row);
    }

    rl.close();
});
