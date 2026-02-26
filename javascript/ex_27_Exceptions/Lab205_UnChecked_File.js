// NOTE: JavaScript has no checked exceptions. All exceptions are unchecked. try/catch/finally works the same.

let a = 0;
let b = 10;
// NOTE: In JS, division by zero returns Infinity (not an exception like Java's ArithmeticException)
let c = b / a; // In Java: java.lang.ArithmeticException; In JS: Infinity
console.log(c);

// UnChecked -> ArithmeticException, NullPointerException

let name = null;
// NOTE: In JS, calling a method on null throws TypeError (similar to Java's NullPointerException)
name.trim(); // TypeError: Cannot read properties of null (reading 'trim')
