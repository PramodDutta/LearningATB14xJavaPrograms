// NOTE: JavaScript has no checked exceptions. All exceptions are unchecked. try/catch/finally works the same.

try {
    let a = 10 / 10;
    console.log("Try Executed");
    // NOTE: process.exit(0) terminates immediately, finally block will NOT execute (same as Java's System.exit(0))
    process.exit(0);
    // return;
} catch (e) {
    console.log("Catching the exception");
} finally {
    console.log("I will be always executed!");
}
