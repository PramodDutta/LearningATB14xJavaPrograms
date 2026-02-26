// Converted from Java: Lab012_Common_Math_Exception.java
// Note: In Java, dividing an integer by zero throws ArithmeticException.
// In JavaScript, dividing by zero returns Infinity (not an error).
// To replicate Java behavior, we check for division by zero explicitly.

try {
    let result = 10 / 0;
    if (!isFinite(result)) {
        throw new Error("ArithmeticException: / by zero");
    }
    console.log(result);
} catch (e) {
    console.log(e.message);
}
// Exception in thread "main" java.lang.ArithmeticException
