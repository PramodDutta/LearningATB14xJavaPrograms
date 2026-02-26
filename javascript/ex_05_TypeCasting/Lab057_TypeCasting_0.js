// Converted from Java: Lab057_TypeCasting_0.java
// Note: JavaScript does not have explicit type casting like Java.
// All numbers in JS are 64-bit floating point, so widening/narrowing casting
// between byte, short, int, long doesn't apply. Number() can be used for explicit conversion.

let b = 10;
// let a = b; // Valid syntax - Implicit - Casting -> Widening ->
let a = Number(b); // Explicit Casting - Widening (trivial in JS since all numbers are the same type)

//        let a1 = 300;
//        let b1 = a1; // In Java, int to byte narrowing is not allowed implicitly
