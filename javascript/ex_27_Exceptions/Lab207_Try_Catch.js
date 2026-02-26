// NOTE: JavaScript has no checked exceptions. All exceptions are unchecked. try/catch/finally works the same.

let s1 = null;

try {
    s1.trim();
} catch (e) {
    console.log("Error, Trim not allowed for the null values");
}

// unchecked null pointer
// NOTE: In JS, accessing a property on null throws TypeError (similar to Java's NullPointerException)
