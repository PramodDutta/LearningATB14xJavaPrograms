// Lab082_If_Else_Scanner

// Allowed to vote or not - age
// If age > 18 -> allowed to vote.
// else age < >18 -> Not allowed to vote.

// How to take the user Input
// 1. CLI Options
//
// let age = parseInt(process.argv[2]);

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter your age\n", (answer) => {
    let age = parseInt(answer);
    console.log(age);
    rl.close();
});
