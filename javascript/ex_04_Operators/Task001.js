// Converted from Java: Task001.java
// Note: Java's System.out.printf() is replaced with template literals.
// Java's .println() chained after printf() is replaced with console.log().

// Print the table of 9 or 5 using template literals
let num = 9;
// 9x1=9
// 9x2=18
// int -> %d, String -> %s, Char -%c, float -> %f
console.log(`${num}x1=${num * 1}`);
console.log(`${num}x2=${num * 2}`);
console.log(`${num}x3=${num * 3}`);
console.log("...");
console.log(`${num}x9=${num * 9}`);
console.log(`${num}x10=${num * 10}`);
