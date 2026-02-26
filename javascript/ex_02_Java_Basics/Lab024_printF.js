// Converted from Java: Lab024_printF.java
// Note: Java's System.out.printf() uses format specifiers like %d, %s, %f, %b.
// JavaScript uses template literals (backtick strings) for string interpolation.

let a = 10;
let b = 20;
//        console.log(a);
//        console.log(b);

//        process.stdout.write(String(a));
//        process.stdout.write(String(b));

console.log(`Value of a=${a}`);
console.log(`Value of b=${b}`);

// %d -> int, byte, long, short, - data type (Java format specifier)
// %s -> String
// %f -> float, double,
// %b -> boolean

let table = 9;
console.log(`${table}x1=${table * 1}`);
