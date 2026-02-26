// Lab131_User_Defined_One.js
// Converted from Java: Lab131_User_Defined_One.java

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

function sum_of_two_number(a, b) {
    return a + b;
}

function sum_of_two_number_no_args() {
    console.log("Hi,there");
}

(async () => {
    const aStr = await question("Enter the a\n");
    const a = parseInt(aStr);
    const bStr = await question("Enter the b\n");
    const b = parseInt(bStr);

    const result = sum_of_two_number(a, b);
    const result2 = sum_of_two_number(10, 45);
    const result3 = sum_of_two_number(333, 3333);

    console.log(result);
    console.log(result2);
    console.log(result3);

    rl.close();
})();
