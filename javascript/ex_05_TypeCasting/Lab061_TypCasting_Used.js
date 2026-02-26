// Converted from Java: Lab061_TypCasting_Used.java
// Note: In Java, (int) cast truncates the decimal part. In JavaScript, use Math.trunc().
// Widening (int to float) happens automatically in JS since all numbers are the same type.

let course = 100;
let GST = 18.45;
//        let total1 = course + GST; // Narrowing - Implicit (not allowed in Java for int result)
let total = course + Math.trunc(GST); // Narrowing - Explicit (Math.trunc simulates (int) cast)
console.log(total);

let total2 = course + GST; // Widening - auto - implicit
//        let total3 = course + GST; // Widening  - Explicit (not needed in JS)
console.log(total2);
