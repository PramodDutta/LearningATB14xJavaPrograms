// NOTE: JavaScript has no checked exceptions. All exceptions are unchecked. try/catch/finally works the same.

// Equivalent of Java main with command-line args
const args = process.argv.slice(2);

console.log("Start the program");

// NOTE: In JS, accessing an out-of-bounds array index returns undefined (no exception thrown)
let ip = args[0]; // In Java: java.lang.ArrayIndexOutOfBoundsException
// NOTE: In JS, parseInt() returns NaN instead of throwing NumberFormatException
let a = parseInt(ip); // In Java: java.lang.NumberFormatException
// NOTE: In JS, division by zero returns Infinity or NaN instead of throwing ArithmeticException
let b = Math.floor(100 / a); // In Java: java.lang.ArithmeticException
console.log(b);

console.log("End the program");
