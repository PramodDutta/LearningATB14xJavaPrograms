// Lab086_Switch

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
            break;
    }
    rl.close();
});
