// Lab084_Switch

// You need to take a user input and ask for the integer from 1 to 7.
// And if user enters 1 to 7,
// you will tell which day it is.

// Logic Building Formula

// Step 1 - Number one is using the Scanner class.
// Step 2 number two will be basically figuring out the expression and the day.
// Step 3- We will basically add step 3 as a rough logic.
// Step 4 - 4 is you will write the fix the logic and optimize.
// Step 5 - figure out the edge cases.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Step1
console.log("Enter the day to 1 to 7");

rl.question("", (answer) => {
    let day = parseInt(answer);
    if (!isNaN(day)) {
        switch (day) {
            case 1:
                console.log("Mon");
                break;
            case 2:
                console.log("Tue");
                break;
            case 3:
                console.log("Wed");
                break;
            case 4:
                console.log("Thur");
                break;
            case 5:
                console.log("Fri");
                break;
            case 6:
                console.log("Sat");
                break;
            case 7:
                console.log("Sun");
                break;
            default:
                console.log("Enter int number from 1 to 7 only, you fool!");
        }
    } else {
        console.log("Enter int you FOOL!");
    }
    rl.close();
});
