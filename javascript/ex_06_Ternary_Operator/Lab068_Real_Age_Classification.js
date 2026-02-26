// Converted from Java: Lab068_Real_Age_Classification.java
// Note: Java uses args[] from the command line. In Node.js, process.argv is used.
// process.argv[0] is 'node', process.argv[1] is the script name,
// so actual arguments start from process.argv[2].

let user_input = process.argv[2]; // equivalent to args[0] in Java
console.log(user_input);
console.log(typeof user_input === 'string');

// Input - String
// String - Int
let age = parseInt(user_input);

let result = (age < 18) ? "Minor" : (age <= 60) ? "Adult" : "Sr. Citizen";
console.log(result);
