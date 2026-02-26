// Extra_02_Promise_Basics.js
// Topic: Promise Fundamentals - Part 2 of 8
// Extends: ex_31 (Promises & Async/Await)
//
// CONCEPT: A Promise is an object representing the eventual completion (or failure)
// of an asynchronous operation. It has three states: pending (initial), fulfilled
// (success), or rejected (failure). Once settled, a promise cannot change state.
// JAVA COMPARISON: Similar to CompletableFuture<T> — represents a future result.
//   Java: future.get() blocks the thread. JS: promise.then() is non-blocking.
// PLAYWRIGHT RELEVANCE: Every Playwright method returns a Promise. page.goto(),
//   page.click(), page.textContent() — all return promises you must await.
// ============================================================

console.log("--- Example 1: Creating a Basic Promise ---");

// A Promise takes an executor function with two callbacks: resolve and reject.
const myFirstPromise = new Promise((resolve, reject) => {
    // This executor runs IMMEDIATELY (synchronously)
    console.log("  Executor runs immediately!");
    resolve("Success!"); // Fulfill the promise with a value
});

// .then() handles the fulfilled value
myFirstPromise.then((value) => {
    console.log(`  Promise resolved with: ${value}`);
});

console.log("  This runs before .then() callback (microtask queue)");

console.log("\n--- Example 2: The Three Promise States ---");

// STATE 1: Pending — initial state, neither fulfilled nor rejected
const pendingPromise = new Promise((resolve, reject) => {
    // Never calling resolve or reject — stays pending forever
    console.log("  pendingPromise created (stays pending)");
});

// STATE 2: Fulfilled — operation completed successfully
const fulfilledPromise = new Promise((resolve, reject) => {
    resolve(42);
});

fulfilledPromise.then(val => console.log(`  fulfilledPromise value: ${val}`));

// STATE 3: Rejected — operation failed
const rejectedPromise = new Promise((resolve, reject) => {
    reject(new Error("Something went wrong"));
});

rejectedPromise.catch(err => console.log(`  rejectedPromise error: ${err.message}`));

// IMPORTANT: Once settled (fulfilled or rejected), state cannot change!
const cannotChange = new Promise((resolve, reject) => {
    resolve("First");  // This wins — promise is now fulfilled
    resolve("Second"); // Ignored — already settled
    reject("Error");   // Ignored — already settled
});

cannotChange.then(val => console.log(`  Only first settlement counts: ${val}`));

console.log("\n--- Example 3: Promise.resolve() and Promise.reject() ---");
// Shorthand for creating already-settled promises.

// Already fulfilled:
const resolved = Promise.resolve("Already done!");
resolved.then(v => console.log(`  Promise.resolve: ${v}`));

// Already rejected:
const rejected = Promise.reject(new Error("Already failed!"));
rejected.catch(e => console.log(`  Promise.reject: ${e.message}`));

// Promise.resolve with a non-promise wraps it:
const wrappedNumber = Promise.resolve(100);
wrappedNumber.then(n => console.log(`  Wrapped number: ${n}`));

// Promise.resolve with a promise returns the same promise:
const original = Promise.resolve("original");
const wrapped = Promise.resolve(original);
console.log(`  Same promise? ${original === wrapped}`); // true

console.log("\n--- Example 4: .then() — Handling Fulfillment ---");

const greetPromise = Promise.resolve("World");

// .then() takes up to two arguments: onFulfilled, onRejected
greetPromise.then(
    (value) => console.log(`  Hello, ${value}!`),         // onFulfilled
    (error) => console.log(`  Error: ${error.message}`)    // onRejected (not used here)
);

// .then() with only onFulfilled (most common):
Promise.resolve(10)
    .then(x => {
        console.log(`  Received: ${x}`);
        return x * 2; // .then() returns a NEW promise resolved with this value
    })
    .then(x => {
        console.log(`  Doubled: ${x}`);
    });

console.log("\n--- Example 5: .catch() — Handling Rejection ---");

// .catch() is shorthand for .then(null, onRejected)
const failingPromise = new Promise((resolve, reject) => {
    reject(new Error("Network timeout"));
});

failingPromise.catch((error) => {
    console.log(`  Caught error: ${error.message}`);
});

// Errors thrown inside executor also cause rejection:
const throwingPromise = new Promise((resolve, reject) => {
    throw new Error("Thrown inside executor");
    // This is equivalent to: reject(new Error("Thrown inside executor"))
});

throwingPromise.catch(err => console.log(`  Caught thrown error: ${err.message}`));

// Errors thrown inside .then() are caught by the next .catch():
Promise.resolve("start")
    .then(val => {
        throw new Error("Error in .then()");
    })
    .catch(err => console.log(`  Caught .then() error: ${err.message}`));

console.log("\n--- Example 6: .finally() — Always Runs ---");
// .finally() runs regardless of fulfillment or rejection.
// It does NOT receive the value or error — used for cleanup.

function simulateOperation(shouldSucceed) {
    return new Promise((resolve, reject) => {
        console.log(`  Operation started (shouldSucceed=${shouldSucceed})`);
        setTimeout(() => {
            if (shouldSucceed) {
                resolve("Data loaded");
            } else {
                reject(new Error("Load failed"));
            }
        }, 50);
    });
}

// Success case:
simulateOperation(true)
    .then(val => console.log(`  Success: ${val}`))
    .catch(err => console.log(`  Error: ${err.message}`))
    .finally(() => console.log("  Cleanup: closing connection (success case)"));

// Failure case:
simulateOperation(false)
    .then(val => console.log(`  Success: ${val}`))
    .catch(err => console.log(`  Error: ${err.message}`))
    .finally(() => console.log("  Cleanup: closing connection (failure case)"));

console.log("\n--- Example 7: Simulated Async Operation with setTimeout ---");

function fetchUser(userId) {
    return new Promise((resolve, reject) => {
        console.log(`  Fetching user ${userId}...`);
        setTimeout(() => {
            if (userId > 0) {
                resolve({
                    id: userId,
                    name: "Alice",
                    email: "alice@test.com"
                });
            } else {
                reject(new Error("Invalid user ID"));
            }
        }, 100);
    });
}

// Successful fetch:
fetchUser(1).then(user => {
    console.log(`  Fetched user: ${user.name} (${user.email})`);
});

// Failed fetch:
fetchUser(-1).catch(err => {
    console.log(`  Fetch failed: ${err.message}`);
});

console.log("\n--- Example 8: Promise Executor Runs Synchronously ---");
// A common misconception: the executor function runs RIGHT AWAY.

console.log("  Before promise creation");

const p = new Promise((resolve, reject) => {
    console.log("  Inside executor (this is SYNCHRONOUS)");
    resolve("done");
});

console.log("  After promise creation");

p.then(val => {
    console.log(`  .then() callback (this is ASYNCHRONOUS): ${val}`);
});

console.log("  After .then() registration");

// Output order:
//   Before promise creation
//   Inside executor (this is SYNCHRONOUS)
//   After promise creation
//   After .then() registration
//   .then() callback (this is ASYNCHRONOUS): done

console.log("\n--- Example 9: Wrapping Callback APIs in Promises ---");
// Promisification: converting callback-based functions to promise-based.

// Old callback-style function:
function readFileCallback(filename, callback) {
    setTimeout(() => {
        if (filename === "exists.txt") {
            callback(null, "File contents here");
        } else {
            callback(new Error("File not found"));
        }
    }, 50);
}

// Promisified version:
function readFilePromise(filename) {
    return new Promise((resolve, reject) => {
        readFileCallback(filename, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}

// Now we can use .then()/.catch() instead of callbacks:
readFilePromise("exists.txt")
    .then(data => console.log(`  Read success: ${data}`))
    .catch(err => console.log(`  Read error: ${err.message}`));

readFilePromise("missing.txt")
    .then(data => console.log(`  Read success: ${data}`))
    .catch(err => console.log(`  Read error: ${err.message}`));

console.log("\n--- Example 10: Common Mistakes ---");

// MISTAKE 1: Forgetting to return in .then() chain
Promise.resolve(5)
    .then(x => {
        x * 2; // Forgot 'return' — next .then() gets undefined!
    })
    .then(x => console.log(`  Mistake - forgot return: ${x}`)); // undefined

// CORRECT:
Promise.resolve(5)
    .then(x => {
        return x * 2; // Explicit return
    })
    .then(x => console.log(`  Correct - with return: ${x}`)); // 10

// Even shorter with arrow function implicit return:
Promise.resolve(5)
    .then(x => x * 2)
    .then(x => console.log(`  Arrow implicit return: ${x}`)); // 10

// MISTAKE 2: Creating unnecessary promise wrapper (Promise constructor antipattern)
// BAD:
function badExample() {
    return new Promise((resolve, reject) => {
        Promise.resolve(42).then(val => resolve(val));
    });
}

// GOOD: Just return the promise directly
function goodExample() {
    return Promise.resolve(42);
}

goodExample().then(v => console.log(`  No wrapper needed: ${v}`));

// MISTAKE 3: Unhandled promise rejection
// Promise.reject("unhandled"); // This would crash Node.js!
// Always attach a .catch() or use try/catch with await.

// === KEY TAKEAWAYS ===
// 1. A Promise has 3 states: PENDING, FULFILLED, REJECTED.
// 2. Once settled (fulfilled/rejected), state CANNOT change.
// 3. new Promise((resolve, reject) => {...}) — executor runs SYNCHRONOUSLY.
// 4. .then(onFulfilled) — handles success (runs as MICROTASK).
// 5. .catch(onRejected) — handles failure (shorthand for .then(null, onRejected)).
// 6. .finally() — always runs, receives no arguments, used for cleanup.
// 7. Promise.resolve(value) / Promise.reject(error) — create already-settled promises.
// 8. Always handle rejections — unhandled rejections crash Node.js.
// 9. .then() returns a NEW promise — enables chaining (next topic).
// 10. In Playwright, EVERY method returns a Promise you must handle.
