// NOTE: JavaScript has no checked exceptions. All exceptions are unchecked. try/catch/finally works the same.

let a = 1;
let c = 0;
try {
    // NOTE: JS division by zero returns Infinity, not an exception.
    // To simulate Java's ArithmeticException, we manually throw.
    if (0 === 0) {
        throw new Error("/ by zero");
    }
    c = 10 / 0;
} catch (e) {
    console.log(e.message);
} finally {
    console.log("I will be always executed!");
}
console.log(c);
