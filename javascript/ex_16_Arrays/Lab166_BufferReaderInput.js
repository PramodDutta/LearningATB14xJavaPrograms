// Converted from: ex_16_Arrays/Lab166_BufferReaderInput.java
// Note: Java's BufferedReader is replaced with Node.js readline module for CLI input.
// In Java, BufferedReader reads input as strings and you must parse manually (e.g., Integer.parseInt).
// The same pattern applies in JS with readline.

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter the value of N\n", (answer) => {
    const N = parseInt(answer.trim());

    // Scanner scanner = new Scanner(System.in);
    // let N1 = parseInt(input);

    console.log(N);

    rl.close();
});
