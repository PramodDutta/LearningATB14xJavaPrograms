// NOTE: JavaScript has no checked exceptions. All exceptions are unchecked. try/catch/finally works the same.
// NOTE: JS does not throw ArithmeticException for division by zero; it returns Infinity or NaN.
// To simulate Java behavior, we manually throw for division by zero.

let a = 0;
let c = 0;
try {
    if (a === 0) {
        throw new RangeError("/ by zero"); // Simulating ArithmeticException
    }
    c = 10 / a;
    let s1 = null;
    s1.trim(); // Would throw TypeError (similar to NullPointerException)
} catch (e) {
    // NOTE: JS only allows a single catch block. Use instanceof to differentiate.
    if (e instanceof RangeError) {
        console.log(e.message); // ArithmeticException equivalent
    } else if (e instanceof TypeError) {
        console.log(e.message); // NullPointerException equivalent
    } else {
        console.log(e.message); // General Exception equivalent
    }
}
