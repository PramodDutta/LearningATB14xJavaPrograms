// Extra_01_Error_Types.js
// Topic: Built-in Error Types - Part 1 of 4
// Extends: ex_27_Exceptions
//
// CONCEPT: JavaScript has several built-in error types that represent different
// categories of runtime problems. Each inherits from the base Error class and
// carries name, message, and stack properties for debugging.
// JAVA COMPARISON: Similar to Java's exception hierarchy — IllegalArgumentException,
// NullPointerException, ArrayIndexOutOfBoundsException all extend RuntimeException.
// PLAYWRIGHT RELEVANCE: Playwright throws TimeoutError (extends Error) for locator
// timeouts, and different error types help you write targeted catch blocks in tests.
// ============================================================

console.log("--- Example 1: TypeError — wrong type or missing method ---");
try {
    let num = 42;
    num.toUpperCase(); // number has no toUpperCase method
} catch (e) {
    console.log("Caught:", e.name);        // TypeError
    console.log("Message:", e.message);    // num.toUpperCase is not a function
    console.log("Is TypeError?", e instanceof TypeError);   // true
    console.log("Is Error?", e instanceof Error);           // true
}

try {
    let nothing = null;
    nothing.someProperty; // cannot read property of null
} catch (e) {
    console.log("\nNull access:", e.name, "-", e.message);
}

try {
    let obj = undefined;
    obj.method(); // cannot read property of undefined
} catch (e) {
    console.log("Undefined access:", e.name, "-", e.message);
}

console.log("\n--- Example 2: RangeError — value out of allowed range ---");
try {
    let arr = new Array(-1); // negative array length
} catch (e) {
    console.log("Caught:", e.name);
    console.log("Message:", e.message);
    console.log("Is RangeError?", e instanceof RangeError);
}

try {
    let num = 1.5;
    num.toFixed(200); // max precision is 100
} catch (e) {
    console.log("\ntoFixed range:", e.name, "-", e.message);
}

try {
    function infiniteRecursion() { infiniteRecursion(); }
    infiniteRecursion();
} catch (e) {
    console.log("\nStack overflow:", e.name, "-", e.message);
    console.log("Is RangeError?", e instanceof RangeError);
}

console.log("\n--- Example 3: ReferenceError — accessing undeclared variable ---");
try {
    console.log(undeclaredVariable); // variable was never declared
} catch (e) {
    console.log("Caught:", e.name);
    console.log("Message:", e.message);
    console.log("Is ReferenceError?", e instanceof ReferenceError);
}

try {
    // let and const have a temporal dead zone
    // This demonstrates it via eval to avoid actual syntax issues
    eval("let x = x + 1;");
} catch (e) {
    console.log("\nTDZ error:", e.name, "-", e.message);
}

console.log("\n--- Example 4: SyntaxError caught via eval and URIError ---");
// SyntaxError cannot normally be caught at runtime because it happens
// at parse time. But eval() parses at runtime so we can catch it.
try {
    eval("if (true {"); // missing closing parenthesis
} catch (e) {
    console.log("Caught:", e.name);
    console.log("Message:", e.message);
    console.log("Is SyntaxError?", e instanceof SyntaxError);
}

try {
    eval("let 123abc = 5;"); // invalid identifier
} catch (e) {
    console.log("\nInvalid syntax:", e.name, "-", e.message);
}

// URIError — malformed URI components
try {
    decodeURIComponent("%"); // incomplete percent-encoding
} catch (e) {
    console.log("\nCaught:", e.name);
    console.log("Message:", e.message);
    console.log("Is URIError?", e instanceof URIError);
}

try {
    decodeURI("%E0%A4%A"); // malformed UTF-8 sequence
} catch (e) {
    console.log("\nMalformed URI:", e.name, "-", e.message);
}

console.log("\n--- Example 5: instanceof checking for targeted error handling ---");
function riskyOperation(input) {
    if (input === "type") {
        return null.toString();
    } else if (input === "range") {
        return new Array(-5);
    } else if (input === "reference") {
        eval("undeclaredVar");
    } else if (input === "uri") {
        decodeURIComponent("%%invalid%%");
    }
}

const scenarios = ["type", "range", "reference", "uri"];

for (const scenario of scenarios) {
    try {
        riskyOperation(scenario);
    } catch (e) {
        if (e instanceof TypeError) {
            console.log(`[TYPE ERROR] Field validation failed: ${e.message}`);
        } else if (e instanceof RangeError) {
            console.log(`[RANGE ERROR] Value out of bounds: ${e.message}`);
        } else if (e instanceof ReferenceError) {
            console.log(`[REF ERROR] Missing variable/import: ${e.message}`);
        } else if (e instanceof URIError) {
            console.log(`[URI ERROR] Bad URL encoding: ${e.message}`);
        } else {
            console.log(`[UNKNOWN] ${e.name}: ${e.message}`);
        }

        // All errors share these properties
        console.log(`  -> name: ${e.name}`);
        console.log(`  -> stack (first line): ${e.stack.split("\n")[0]}`);
        console.log();
    }
}

// Error hierarchy demonstration
console.log("Error hierarchy check:");
const te = new TypeError("demo");
console.log("TypeError instanceof TypeError:", te instanceof TypeError);   // true
console.log("TypeError instanceof Error:", te instanceof Error);           // true
console.log("TypeError instanceof RangeError:", te instanceof RangeError); // false

// === KEY TAKEAWAYS ===
// 1. TypeError: wrong type used, calling method on null/undefined, or method doesn't exist
// 2. RangeError: numeric value out of allowed range, or stack overflow
// 3. ReferenceError: accessing a variable that was never declared
// 4. SyntaxError: can only be caught at runtime via eval(); otherwise halts parsing
// 5. URIError: malformed URI encoding in decodeURI/decodeURIComponent
// 6. All built-in errors inherit from Error — use instanceof to differentiate
// 7. Every error has .name, .message, and .stack for debugging
// 8. In Playwright: TimeoutError is a custom Error subclass — same instanceof pattern
