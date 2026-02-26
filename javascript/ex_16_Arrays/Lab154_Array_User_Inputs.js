// Converted from: ex_16_Arrays/Lab154_Array_User_Inputs.java
// Note: Java's Scanner is replaced with Node.js readline module for CLI input.

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, (answer) => {
            resolve(answer);
        });
    });
}

(async () => {
    const sizeInput = await question("Enter the size of the array(int)\n");
    const size = parseInt(sizeInput);

    let numbers_marks = new Array(size).fill(null);

    for (let i = 0; i < numbers_marks.length; i++) {
        numbers_marks[i] = await question(`Enter the elements -> ${i}\n`);
    }

    console.log(" --- Print the values");

    numbers_marks.sort();
    for (const marks of numbers_marks) {
        console.log(marks);
    }

    rl.close();
})();
