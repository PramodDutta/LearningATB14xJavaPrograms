// NOTE: JavaScript has no wrapper classes. Primitives are auto-boxed when methods are called on them.

// Main
let num = "10";
let aa = 10;

// String -> Number Conversion (equivalent to String -> Wrapper Conversion)
let a = parseInt(num);        // Integer.parseInt() -> parseInt()
// parseFloat()               // Double.parseDouble() -> parseFloat()
// parseFloat()               // Float.parseFloat() -> parseFloat()
// parseInt() or Number()     // Long.parseLong() -> parseInt() or Number()

// String to Primitive (same in JS since there's no wrapper distinction)
let a_p = parseInt(num);

let aa3 = Number("10");       // Integer.valueOf("10") -> Number("10")
console.log(aa3);

let aa10 = 10;
let s = aa10.toString();      // Integer.toString() -> .toString()
console.log(s);
console.log(typeof s === 'string'); // instanceof String -> typeof check in JS
