// Lab134_Function_Arth.js
// Converted from Java: Lab134_Function_Arth.java

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

// Create a Function of Sub, Sum, Mul and Div
// with parameter, a, b (take the parameter from the User)

// Logic Building
// Step 1 -> Inputs and Outputs
//  a, b - int -> Scanner
//  int -> variable result ->

// Step 2 - Rough logic -> Create functions
// function -> type 4th - with return and with arguments/ parameters

// Step 3 - Write the code and Find and Fix  -> Edge Cases

function readInt(input) {
    const num = parseInt(input);
    if (isNaN(num)) {
        console.log("Enter the int only.");
        process.exit(0);
    }
    return num;
}

function sum(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function div(a, b) {
    if (b === 0) {
        throw new Error("Division by zero is not allowed.");
    }
    return Math.trunc(a / b);
}

function mul(a, b) {
    return a * b;
}

function mod(a, b) {
    return a % b;
}

(async () => {
    const aStr = await question("Enter the num1: \n");
    const a = readInt(aStr);
    const bStr = await question("Enter the num2: \n");
    const b = readInt(bStr);

    const result_sum = sum(a, b);
    const result_sub = sub(a, b);
    const result_mul = mul(a, b);
    const result_div = div(a, b);
    const result_mod = mod(a, b);

    console.log(result_sum);
    console.log(result_sub);
    console.log(result_mul);
    console.log(result_div);
    console.log(result_mod);

    rl.close();
})();
