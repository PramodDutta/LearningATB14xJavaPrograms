// NOTE: JavaScript has no wrapper classes. Primitives are auto-boxed when methods are called on them.

// Main
let a = 10;
// a. // no attribute (In JS, primitives are auto-boxed, so you CAN call methods like a.toString())
// a.len() // no method
let a1 = 10; // In JS, there is no Integer wrapper - just use the number
console.log(Number.MAX_SAFE_INTEGER); // Integer.MAX_VALUE equivalent
console.log(a1); // .intValue() not needed in JS - it's already a number
