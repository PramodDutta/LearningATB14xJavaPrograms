// Lab149_Program_ChatAt_Reverse_String.js
// Converted from Java: Lab149_Program_ChatAt_Reverse_String.java

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Write a program to reverse a string without using inbuilt functions.

rl.question("Enter the input string, i will reverse it\n", (user_input) => {
    // Pramod

    //        let stringBuilder = user_input;
    //        console.log(stringBuilder.split('').reverse().join(''));

    // Pramod -> user_input.length, charAt()
    let reverse_user_input = "";

    for (let i = user_input.length - 1; i >= 0; i--) {
        reverse_user_input = reverse_user_input + user_input.charAt(i);
    }

    console.log(reverse_user_input);

    rl.close();
});
