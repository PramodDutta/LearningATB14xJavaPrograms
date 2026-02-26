// Extra_05_AsyncAwait_Basics.js
// Topic: async/await Fundamentals - Part 5 of 8
// Extends: ex_31 (Promises & Async/Await)
//
// CONCEPT: async/await is syntactic sugar over Promises that makes asynchronous code
// look and behave like synchronous code. An async function always returns a Promise.
// The await keyword pauses execution until the awaited Promise settles.
// JAVA COMPARISON: Java has no direct equivalent. CompletableFuture.get() blocks the thread.
//   Kotlin has coroutines with suspend functions which are closest to JS async/await.
// PLAYWRIGHT RELEVANCE: Every Playwright test is an async function. Every action
//   (page.goto, page.click, page.fill) must be awaited. This is THE pattern you use most.
// ============================================================

// Helper: simulate async operation
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchData(name, ms = 50) {
    return new Promise(resolve => {
        setTimeout(() => resolve({ name, timestamp: Date.now() }), ms);
    });
}

console.log("--- Example 1: async Function Always Returns a Promise ---");

// An async function ALWAYS returns a Promise, even if you return a plain value.
async function greet() {
    return "Hello!"; // This gets wrapped in Promise.resolve("Hello!")
}

const result = greet();
console.log(`  greet() returned: ${result}`); // Promise { 'Hello!' }
console.log(`  Is it a Promise? ${result instanceof Promise}`); // true

result.then(val => console.log(`  Resolved value: ${val}`)); // "Hello!"

// Even returning nothing wraps in a Promise:
async function doNothing() {
    // no return statement
}
doNothing().then(val => console.log(`  doNothing resolved: ${val}`)); // undefined

console.log("\n--- Example 2: await Pauses Until Promise Settles ---");

async function fetchUserProfile() {
    console.log("  1. Starting fetch...");

    // await pauses HERE until fetchData resolves
    const user = await fetchData("Alice", 100);
    console.log(`  2. Got user: ${user.name}`);

    // await pauses again
    const posts = await fetchData("Alice's posts", 50);
    console.log(`  3. Got posts: ${posts.name}`);

    console.log("  4. All done!");
    return { user, posts };
}

fetchUserProfile().then(result => {
    console.log(`  5. Final result has: ${result.user.name} and ${result.posts.name}`);
});

console.log("  0. This runs BEFORE any await completes (sync code continues)");

console.log("\n--- Example 3: Converting .then() Chains to async/await ---");

// BEFORE: Promise chain style
function loadDataChain() {
    return fetchData("step1", 30)
        .then(step1 => {
            console.log(`  Chain - Step 1: ${step1.name}`);
            return fetchData("step2", 30);
        })
        .then(step2 => {
            console.log(`  Chain - Step 2: ${step2.name}`);
            return fetchData("step3", 30);
        })
        .then(step3 => {
            console.log(`  Chain - Step 3: ${step3.name}`);
            return "chain complete";
        });
}

// AFTER: async/await style (MUCH cleaner!)
async function loadDataAsync() {
    const step1 = await fetchData("step1", 30);
    console.log(`  Async - Step 1: ${step1.name}`);

    const step2 = await fetchData("step2", 30);
    console.log(`  Async - Step 2: ${step2.name}`);

    const step3 = await fetchData("step3", 30);
    console.log(`  Async - Step 3: ${step3.name}`);

    return "async complete";
}

loadDataChain().then(r => console.log(`  ${r}`));
loadDataAsync().then(r => console.log(`  ${r}`));

console.log("\n--- Example 4: await Only Works Inside async Functions ---");

// This would be a syntax error (uncomment to see):
// const data = await fetchData("test"); // SyntaxError: await is only valid in async functions

// You must wrap in an async function:
async function wrapper() {
    const data = await fetchData("inside async", 30);
    console.log(`  Inside async function: ${data.name}`);
}
wrapper();

// Or use an async IIFE (Immediately Invoked Function Expression):
(async () => {
    const data = await fetchData("inside IIFE", 30);
    console.log(`  Inside async IIFE: ${data.name}`);
})();

// NOTE: Top-level await works in ES Modules (.mjs files) and Node.js 14.8+
// In CommonJS (.js), you still need an async wrapper.

console.log("\n--- Example 5: await with Non-Promise Values ---");

async function awaitAnything() {
    // await with a non-Promise value resolves immediately
    const num = await 42;
    console.log(`  await 42 = ${num}`); // 42

    const str = await "hello";
    console.log(`  await "hello" = ${str}`); // "hello"

    const obj = await { key: "value" };
    console.log(`  await {key: "value"} = ${JSON.stringify(obj)}`);

    // This is equivalent to: await Promise.resolve(42)
    // It's pointless but doesn't cause an error.
}

awaitAnything();

console.log("\n--- Example 6: Playwright-Style Test (Simulated) ---");

// Simulated Playwright API
const page = {
    goto: async (url) => {
        await delay(30);
        console.log(`    page.goto('${url}') - navigated`);
    },
    fill: async (selector, value) => {
        await delay(20);
        console.log(`    page.fill('${selector}', '${value}') - typed`);
    },
    click: async (selector) => {
        await delay(20);
        console.log(`    page.click('${selector}') - clicked`);
    },
    title: async () => {
        await delay(10);
        return "Dashboard - MyApp";
    },
    textContent: async (selector) => {
        await delay(10);
        return "Welcome, Alice!";
    },
    waitForSelector: async (selector) => {
        await delay(30);
        console.log(`    page.waitForSelector('${selector}') - found`);
        return { selector };
    }
};

// This looks EXACTLY like a real Playwright test:
async function testLoginFlow() {
    console.log("  Running simulated Playwright test...");

    await page.goto("https://myapp.com/login");
    await page.fill("#username", "alice");
    await page.fill("#password", "secret123");
    await page.click("#login-button");
    await page.waitForSelector(".dashboard");

    const title = await page.title();
    console.log(`    Title: ${title}`);

    const welcome = await page.textContent(".welcome-msg");
    console.log(`    Welcome text: ${welcome}`);

    // In real Playwright: expect(title).toBe('Dashboard - MyApp');
    const passed = title === "Dashboard - MyApp";
    console.log(`    Assertion: title === 'Dashboard - MyApp' -> ${passed}`);
}

testLoginFlow();

console.log("\n--- Example 7: async Arrow Functions ---");

// Regular async function declaration:
async function fetchA() {
    return await fetchData("A", 20);
}

// async arrow function:
const fetchB = async () => {
    return await fetchData("B", 20);
};

// async arrow with implicit return:
const fetchC = async () => fetchData("C", 20);

// async method in an object:
const api = {
    async getData() {
        return await fetchData("objectMethod", 20);
    }
};

// async method in a class:
class DataService {
    async fetch(name) {
        return await fetchData(name, 20);
    }
}

// All work the same way:
Promise.all([
    fetchA(),
    fetchB(),
    fetchC(),
    api.getData(),
    new DataService().fetch("classMethod")
]).then(results => {
    console.log(`  All async variants: ${results.map(r => r.name).join(", ")}`);
});

console.log("\n--- Example 8: Return vs Return Await ---");

// These two functions behave ALMOST identically:
async function returnPromise() {
    return fetchData("no-await", 20); // Returns the promise directly
}

async function returnAwaitPromise() {
    return await fetchData("with-await", 20); // Awaits then returns
}

// Both resolve to the same value:
returnPromise().then(r => console.log(`  return promise: ${r.name}`));
returnAwaitPromise().then(r => console.log(`  return await: ${r.name}`));

// BUT: They differ in error handling with try/catch (covered in next file).
// 'return await' is caught by the surrounding try/catch.
// 'return' bypasses the try/catch because the promise hasn't been awaited yet.

console.log("\n--- Example 9: Sequential vs Parallel with async/await ---");

async function sequential() {
    const start = Date.now();
    // These run ONE AT A TIME (sequential)
    const a = await fetchData("seq-A", 80);
    const b = await fetchData("seq-B", 80);
    const c = await fetchData("seq-C", 80);
    console.log(`  Sequential: ${Date.now() - start}ms (~240ms)`);
    return [a, b, c];
}

async function parallel() {
    const start = Date.now();
    // These run ALL AT ONCE (parallel)
    const [a, b, c] = await Promise.all([
        fetchData("par-A", 80),
        fetchData("par-B", 80),
        fetchData("par-C", 80)
    ]);
    console.log(`  Parallel: ${Date.now() - start}ms (~80ms)`);
    return [a, b, c];
}

sequential();
parallel();

console.log("\n--- Example 10: Awaiting in Sequence When Needed ---");

async function processInOrder() {
    // Sometimes you NEED sequential execution:
    // The result of step 1 is needed for step 2.
    const user = await fetchData("user-lookup", 30);
    console.log(`  Looked up: ${user.name}`);

    // user.name is needed to fetch the right profile
    const profile = await fetchData(`profile-for-${user.name}`, 30);
    console.log(`  Got profile: ${profile.name}`);

    // profile result determines next action
    const dashboard = await fetchData(`dashboard-${profile.name}`, 30);
    console.log(`  Got dashboard: ${dashboard.name}`);

    return { user, profile, dashboard };
}

processInOrder().then(() => console.log("  Sequential dependency chain done"));

// === KEY TAKEAWAYS ===
// 1. async function ALWAYS returns a Promise (even if you return a plain value).
// 2. await PAUSES execution until the Promise settles — but doesn't block the thread.
// 3. await can only be used inside async functions (or top-level in ES Modules).
// 4. async/await is syntactic sugar over .then() chains — same behavior, cleaner syntax.
// 5. In Playwright: EVERY action is awaited (await page.click, await page.fill, etc.).
// 6. await on a non-Promise value resolves immediately (wraps in Promise.resolve).
// 7. For PARALLEL execution, use await Promise.all([...]) instead of sequential awaits.
// 8. async works with arrow functions, object methods, and class methods.
// 9. 'return await' vs 'return' matters for try/catch error handling.
// 10. Java comparison: no direct equivalent — closest is Kotlin coroutines.
