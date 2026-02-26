// NOTE: JavaScript has no checked exceptions. All exceptions are unchecked. try/catch/finally works the same.

const args = process.argv.slice(2);

try {
    if (args[0] === undefined) {
        throw new RangeError("Index 0 out of bounds");
    }
    let ip = args[0]; // In Java: java.lang.ArrayIndexOutOfBoundsException
    let a = parseInt(ip); // In Java: NumberFormatException
    if (isNaN(a)) {
        throw new Error("For input string: \"" + ip + "\"");
    }
    if (a === 0) {
        throw new Error("/ by zero"); // In Java: ArithmeticException
    }
    let b = Math.floor(100 / a);
    console.log(b);
} catch (e) {
    console.log(e.message);
}
