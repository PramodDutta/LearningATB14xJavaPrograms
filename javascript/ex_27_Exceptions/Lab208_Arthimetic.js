// NOTE: JavaScript has no checked exceptions. All exceptions are unchecked. try/catch/finally works the same.
// NOTE: JS does not throw ArithmeticException for division by zero; it returns Infinity or NaN.
// To simulate Java behavior, we manually check for division by zero.

let c = 0;
let b = 0;
try {
    if (c === 0) {
        throw new Error("/ by zero");
    }
    b = 10 / c;
} catch (e) {
    // NOTE: JS has no multi-catch by exception type like Java.
    // We check the error message or use instanceof for custom errors.
    if (e.message === "/ by zero") {
        console.log("Not allowed"); // Equivalent of ArithmeticException catch
    } else {
        console.log("Hello"); // Equivalent of general Exception catch
    }
}
// NOTE: In Java there's a Throwable catch too; in JS, catch catches all thrown values.
