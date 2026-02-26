// NOTE: JavaScript has no wrapper classes. Primitives are auto-boxed when methods are called on them.
// Boxing and Unboxing do not exist in JavaScript - all number values are just 'number' type.

// Main
let a = 10;
let b = a;
// Boxing - primitive -> Wrapper - AutoBoxing - In JS, this is just a simple assignment
console.log(b);       // .intValue() not needed in JS
console.log(b);
console.log(a);

// UnBoxing (wrapper -> primitive) - In JS, this is just a simple assignment
let aa = 43;
let a1 = aa;          // UNBOXING - no distinction in JS
console.log(a1);
