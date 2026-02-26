// Lab149_Program_CharArray.js
// Converted from Java: Lab149_Program_CharArray.java

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Write a program to reverse a string without using inbuilt functions.

rl.question("Enter the input string, i will reverse it\n", (user_input) => {
    // Pramod

    let reverse_user_input = "";

    const arr = user_input.split(''); // toCharArray() equivalent

    for (let i = arr.length - 1; i >= 0; i--) {
        reverse_user_input = reverse_user_input + arr[i];
    }

    console.log(reverse_user_input);

    rl.close();
});
