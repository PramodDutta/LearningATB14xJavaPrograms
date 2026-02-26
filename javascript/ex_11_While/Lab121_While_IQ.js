// Lab121_While_IQ

// Factorial Program

// The logic building formula we are discussing.
// Step number one, you have to figure out what is the data type for input and output.
// Step number two, write a rough logic around this.
// Step number three, write a proper logic around this.
// Step number four, optimize.
// Step number five, which is edge cases.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Enter the Number for Factorial Program!");

rl.question("", (answer) => {
    if (isNaN(parseInt(answer))) {
        console.log("You Fool, int only!");
    } else {
        let number = parseInt(answer);
        let fact = 1;
        if (number === 0) {
            fact = 1;
            console.log("fact = 1");
        }
        if (number < 0 || number > Number.MAX_SAFE_INTEGER) {
            console.log("Can't get the factorial as out of bound!(int)");
        }

        let i = 1;
        while (i <= number) {
            fact = fact * i;
            i++;
        }

        console.log(fact);
    }
    rl.close();
});
