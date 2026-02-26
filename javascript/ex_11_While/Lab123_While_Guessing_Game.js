// Lab123_While_Guessing_Game

// Guess a number between 1 and 100
// n = 56
//  90 , 60 ,  50 ->  50 to 60 yes

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let numberTOGuess = Math.floor(Math.random() * 101);
// console.log(numberTOGuess);

console.log("Enter the number");
let attempts = 0;

function askGuess() {
    rl.question("", (answer) => {
        let guess = parseInt(answer);

        if (isNaN(guess)) {
            console.log("Invalid input! Please enter a number.");
            askGuess();
            return;
        }

        attempts++;

        if (guess < 1 || guess > 100) {
            console.log("Please enter a number between 1 and 100.");
            askGuess();
            return;
        }

        if (guess < numberTOGuess) {
            console.log("Too low, try again");
            askGuess();
        } else if (guess > numberTOGuess) {
            console.log("Too high, try again");
            askGuess();
        } else {
            console.log("Correct! You guessed it in " + attempts + " attempts");
            rl.close();
        }
    });
}

askGuess();
