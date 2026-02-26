// Extra_01_Sync_vs_Async.js
// Topic: Synchronous vs Asynchronous JavaScript - Part 1 of 8
// Extends: ex_31 (Promises & Async/Await)
//
// CONCEPT: JavaScript is single-threaded — it has one call stack and processes one
// thing at a time. Synchronous code blocks the thread until it completes. Asynchronous
// code uses the event loop to schedule work and continue executing without blocking.
// JAVA COMPARISON: Java uses real OS threads for concurrency (Thread class, ExecutorService).
//   JavaScript has NO threads — it uses an event loop with a callback queue instead.
// PLAYWRIGHT RELEVANCE: Every browser interaction (click, type, navigate) is async because
//   the browser runs in a separate process. Without async, your test would freeze.
// ============================================================

console.log("--- Example 1: Synchronous Blocking ---");
// Synchronous code runs line by line — each line must finish before the next begins.

console.log("Step 1: Start");
console.log("Step 2: Middle");
console.log("Step 3: End");
// Output: Step 1, Step 2, Step 3 — always in order, no surprises.

console.log("\n--- Example 2: Simulating a Blocking Operation ---");
// A heavy computation blocks the ENTIRE thread — nothing else can run.

function heavyComputation(label) {
    console.log(`  ${label}: Starting heavy computation...`);
    const start = Date.now();
    // Simulate blocking work — a busy loop for ~200ms
    while (Date.now() - start < 200) {
        // Intentionally blocking the thread
    }
    console.log(`  ${label}: Done after ${Date.now() - start}ms`);
}

console.log("Before heavy work");
heavyComputation("Task A");
console.log("After heavy work — this had to WAIT");
// In Java, you could run heavyComputation on a separate thread.
// In JS, the entire program is frozen during that 200ms.

console.log("\n--- Example 3: setTimeout — Introducing Async ---");
// setTimeout schedules a callback to run AFTER the current code finishes.

console.log("1. Before setTimeout");

setTimeout(function() {
    console.log("3. Inside setTimeout callback (runs LATER)");
}, 1000); // 1 second delay

console.log("2. After setTimeout — this runs FIRST, not after the delay!");
// Output order: 1, 2, then (after 1 second) 3.
// setTimeout does NOT pause execution — it SCHEDULES a future callback.

console.log("\n--- Example 4: setTimeout with 0ms Delay ---");
// Even with 0ms delay, setTimeout callback runs AFTER all synchronous code.

console.log("A: Synchronous - first");

setTimeout(() => {
    console.log("C: setTimeout(0) - runs AFTER all sync code");
}, 0);

console.log("B: Synchronous - second");
// Output: A, B, C — NOT A, C, B!
// Why? The event loop puts the callback in the queue AFTER the call stack is empty.

console.log("\n--- Example 5: The Event Loop Explained ---");
// The event loop has these parts:
// 1. CALL STACK — where synchronous code executes (one frame at a time)
// 2. WEB APIs / Node APIs — handle async operations (timers, I/O, network)
// 3. CALLBACK QUEUE (Task Queue) — callbacks waiting to be moved to the call stack
// 4. MICROTASK QUEUE — Promise callbacks (higher priority than callback queue)
// 5. EVENT LOOP — checks if call stack is empty, then moves tasks from queues

console.log("Sync 1");

setTimeout(() => console.log("Timeout 1 (macro-task)"), 0);
setTimeout(() => console.log("Timeout 2 (macro-task)"), 0);

Promise.resolve().then(() => console.log("Promise 1 (micro-task)"));
Promise.resolve().then(() => console.log("Promise 2 (micro-task)"));

console.log("Sync 2");

// Output order:
//   Sync 1
//   Sync 2
//   Promise 1 (micro-task)   <-- microtasks run BEFORE macrotasks
//   Promise 2 (micro-task)
//   Timeout 1 (macro-task)
//   Timeout 2 (macro-task)

console.log("\n--- Example 6: Multiple Timers — Order Matters ---");

setTimeout(() => console.log("  Timer A: 100ms"), 100);
setTimeout(() => console.log("  Timer B: 50ms"), 50);
setTimeout(() => console.log("  Timer C: 0ms"), 0);

console.log("  All timers scheduled — sync code continues immediately");
// Output: sync message first, then C (0ms), B (50ms), A (100ms)

console.log("\n--- Example 7: Callback Pattern (Pre-Promise Era) ---");
// Before Promises, async operations used callbacks.

function fetchUserData(userId, callback) {
    console.log(`  Fetching user ${userId}...`);
    setTimeout(() => {
        // Simulate async data retrieval
        const user = { id: userId, name: "Alice", role: "tester" };
        callback(null, user); // Node.js convention: (error, result)
    }, 100);
}

function fetchUserPosts(userId, callback) {
    setTimeout(() => {
        const posts = ["Post 1", "Post 2", "Post 3"];
        callback(null, posts);
    }, 100);
}

// Callback Hell / Pyramid of Doom:
fetchUserData(1, (err, user) => {
    if (err) {
        console.log("Error:", err);
        return;
    }
    console.log(`  Got user: ${user.name}`);
    fetchUserPosts(user.id, (err, posts) => {
        if (err) {
            console.log("Error:", err);
            return;
        }
        console.log(`  Got ${posts.length} posts for ${user.name}`);
        // Imagine nesting 5-10 levels deep... that's callback hell.
    });
});

console.log("\n--- Example 8: Why Playwright REQUIRES Async ---");
// Every Playwright action crosses a process boundary:
//   Your Node.js test --> WebSocket --> Browser Process --> DOM
//
// This is inherently asynchronous. Consider:
//
//   // Playwright code (cannot run here, shown for illustration):
//   // const page = await browser.newPage();     // async: creates browser tab
//   // await page.goto('https://example.com');    // async: network request
//   // await page.click('#button');               // async: sends click to browser
//   // const text = await page.textContent('h1'); // async: reads from browser DOM
//
// If these were synchronous, your test would FREEZE the Node.js process
// while waiting for the browser to respond. With async/await, Node.js can
// handle other events while waiting.

// Simulating what Playwright operations look like conceptually:
function simulateBrowserAction(action) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`  Browser completed: ${action}`);
            resolve(`Result of ${action}`);
        }, 50);
    });
}

// This is essentially what your Playwright test does:
async function simulatedTest() {
    console.log("  Test starting...");
    const page = await simulateBrowserAction("newPage()");
    await simulateBrowserAction("goto('https://example.com')");
    await simulateBrowserAction("click('#login-btn')");
    const title = await simulateBrowserAction("title()");
    console.log(`  Test got title: ${title}`);
    console.log("  Test finished.");
}

simulatedTest();

console.log("\n--- Example 9: Blocking vs Non-Blocking Comparison ---");

// BLOCKING approach (synchronous simulation):
function blockingOperation(name, durationMs) {
    const start = Date.now();
    while (Date.now() - start < durationMs) { /* busy wait */ }
    return `${name} done in ${durationMs}ms`;
}

const startSync = Date.now();
const r1 = blockingOperation("TaskX", 100);
const r2 = blockingOperation("TaskY", 100);
const r3 = blockingOperation("TaskZ", 100);
console.log(`  Sync total: ${Date.now() - startSync}ms (ran sequentially: ~300ms)`);

// NON-BLOCKING approach (asynchronous):
function nonBlockingOperation(name, durationMs) {
    return new Promise(resolve => {
        setTimeout(() => resolve(`${name} done`), durationMs);
    });
}

const startAsync = Date.now();
Promise.all([
    nonBlockingOperation("TaskX", 100),
    nonBlockingOperation("TaskY", 100),
    nonBlockingOperation("TaskZ", 100)
]).then(results => {
    console.log(`  Async total: ${Date.now() - startAsync}ms (ran in parallel: ~100ms)`);
    console.log(`  Results: ${results.join(", ")}`);
});

// === KEY TAKEAWAYS ===
// 1. JavaScript is SINGLE-THREADED — one call stack, one thing at a time.
// 2. Synchronous code BLOCKS — nothing else runs until it finishes.
// 3. setTimeout, Promises, and I/O operations are ASYNCHRONOUS — they don't block.
// 4. The EVENT LOOP moves callbacks from queues to the call stack when it's empty.
// 5. MICROTASKS (Promises) have higher priority than MACROTASKS (setTimeout).
// 6. Java uses THREADS for concurrency; JavaScript uses the EVENT LOOP.
// 7. Playwright is async because browser communication crosses process boundaries.
// 8. setTimeout(fn, 0) does NOT run immediately — it runs after the call stack empties.
