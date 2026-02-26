// NOTE: JavaScript has no checked exceptions. All exceptions are unchecked. try/catch/finally works the same.

const pi = 3.14; // final -> const
let a = 0;
try {
    if (a === 0) {
        throw new Error("/ by zero");
    }
    let x = Math.floor(10 / a);
} catch (e) {
    console.log("div by Zero");
} finally {
    console.log("I will be executed anyHow!!");
}
