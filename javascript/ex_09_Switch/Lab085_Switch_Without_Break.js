// Lab085_Switch_Without_Break

// Switch

// Take a user input and tell them the day which they have told.
// 1 to 7 -> 1 -> mon, 5 -> fri
// 8 ? - Not allowed or error

// let day = parseInt(process.argv[2]); - CLI option

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Enter the day num(1 to 7)");

rl.question("", (answer) => {
    let day = parseInt(answer);

    switch (day) {
        case 1:
            console.log("Mon");
            break;
        case 2:
            console.log("Tue");
        case 3:
            console.log("Wed");
        case 4:
            console.log("Thur");
        case 5:
            console.log("Friday");
        case 6:
            console.log("Sat");
        case 7:
            console.log("Sun");
        default:
            console.log("Invalid, day number");
    }
    rl.close();
});
