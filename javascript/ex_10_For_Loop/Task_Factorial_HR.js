// Task_Factorial_HR

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Enter the number");

rl.question("", (answer) => {
    let n = parseInt(answer);
    let fact = 1;
    if (n === 0) {
        fact = 1;
    }

    // for (let i = n; i >= 1; i--) {
    for (let i = 1; i <= n; i++) {
        fact = fact * i;
    }
    console.log(fact);
    rl.close();
});
