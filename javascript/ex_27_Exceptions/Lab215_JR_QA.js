// NOTE: JavaScript has no checked exceptions. All exceptions are unchecked. try/catch/finally works the same.

const args = process.argv.slice(2);

let ip = null; // In Java: java.lang.ArrayIndexOutOfBoundsException
try {
    if (args[0] === undefined) {
        throw new RangeError("Index 0 out of bounds");
    }
    ip = args[0];
} catch (e) {
    console.log(e.message);
}

let a = 0; // NumberFormatException
try {
    a = parseInt(ip);
    if (isNaN(a)) {
        throw new Error("For input string: \"" + ip + "\"");
    }
} catch (e) {
    console.log(e.message);
}

let b = 0; // ArithmeticException
try {
    if (a === 0) {
        throw new Error("/ by zero");
    }
    b = Math.floor(100 / a);
} catch (e) {
    console.log(e.message);
}
console.log(b);
