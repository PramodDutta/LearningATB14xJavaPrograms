// NOTE: JavaScript has no checked exceptions. All exceptions are unchecked. try/catch/finally works the same.

const args = process.argv.slice(2);

try {
    // NOTE: In JS, accessing out-of-bounds array index returns undefined (no exception)
    let ip = args[0];
    if (ip === undefined) {
        throw new RangeError("Index 0 out of bounds");
    }
    // NOTE: In JS, parseInt() returns NaN instead of throwing NumberFormatException
    let a = parseInt(ip);
    if (isNaN(a)) {
        throw new Error("Not a number");
    }
    // NOTE: In JS, division by zero returns Infinity (no ArithmeticException)
    if (a === 0) {
        throw new Error("/ by zero");
    }
    let b = Math.floor(100 / a);
    console.log(b);
} catch (e) {
    // In Java: catch (NumberFormatException | ArithmeticException | ArrayIndexOutOfBoundsException e)
    // In JS, a single catch block handles all exceptions
    console.log("Problem");
} finally {
    console.log("I will be always called ");
}
