// Converted from Java: Lab037_Operators_Arithmetic_Operators.java
// Note: In Java, int/int gives integer result (20/3 = 6).
// In JavaScript, all division returns floating point (20/3 = 6.666...).
// To match Java behavior for integer division, use Math.trunc().

// Arithmetic Operators
//        + (Addition)
//       - (Subtraction)
//       * (Multiplication)
//       / (Division)
//       % (Modulus) | Modulus - Remainder
let a = 20;
let b = 3;
let c = 3.0;

console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(Math.trunc(a / b)); // Java int division: 20/3 = 6

console.log(a / c);
console.log("a+b");
console.log(a + b);
