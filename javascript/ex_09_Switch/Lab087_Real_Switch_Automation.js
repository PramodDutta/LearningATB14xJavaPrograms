// Lab087_Real_Switch_Automation

// Web Automation
// I will ask the user to give me the input from browser which he wants to
// use to I will start the automation in that browser.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Enter the browser");

rl.question("", (answer) => {
    let browser = answer.trim();

    switch (browser) {
        case "chrome":
            console.log("Starting the chrome");
            console.log("........");
            console.log("TC1");
            console.log("TC2");
            break;
        case "firefox":
            console.log("Starting the firefox browser");
            // Further code to start the Firefox
            // let driver = new Firefox(); // Selenium Code
            break;
        case "edge":
            console.log("Execute the Edge Code");
            break;
        default:
            console.log("I have no idea which browser is this");
            break;
    }
    rl.close();
});
