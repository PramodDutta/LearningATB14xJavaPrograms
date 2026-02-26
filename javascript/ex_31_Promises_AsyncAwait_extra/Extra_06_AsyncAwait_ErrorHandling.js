// Extra_06_AsyncAwait_ErrorHandling.js
// Topic: Error Handling with async/await - Part 6 of 8
// Extends: ex_31 (Promises & Async/Await)
//
// CONCEPT: With async/await, you handle errors using try/catch/finally — the same
// pattern as synchronous error handling. A rejected promise throws an exception at the
// await point, which can be caught by a surrounding try block.
// JAVA COMPARISON: Java's try/catch/finally works identically for synchronous exceptions.
//   The difference is that JS uses it for async errors too (Java uses .exceptionally() on futures).
// PLAYWRIGHT RELEVANCE: Handling locator timeouts, navigation errors, and assertion failures.
//   Playwright throws TimeoutError when elements aren't found, which you catch with try/catch.
// ============================================================

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Simulated API that can fail
function fetchAPI(endpoint, shouldFail = false, delayMs = 50) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error(`API Error: ${endpoint} returned 500`));
            } else {
                resolve({ endpoint, data: `Data from ${endpoint}`, status: 200 });
            }
        }, delayMs);
    });
}

console.log("--- Example 1: Basic try/catch with await ---");

async function basicErrorHandling() {
    try {
        console.log("  Attempting API call...");
        const result = await fetchAPI("/users", true); // This will reject
        console.log(`  Got result: ${result.data}`); // Never reached
    } catch (error) {
        // The rejected promise's error is caught here
        console.log(`  Caught error: ${error.message}`);
    }
    console.log("  Execution continues after catch");
}

basicErrorHandling();

console.log("\n--- Example 2: try/catch/finally ---");

async function withFinally() {
    let connection = null;
    try {
        console.log("  Opening connection...");
        connection = "OPEN";
        const result = await fetchAPI("/data", true);
        console.log(`  Got: ${result.data}`);
    } catch (error) {
        console.log(`  Error: ${error.message}`);
    } finally {
        // ALWAYS runs — regardless of success or failure
        // Perfect for cleanup: closing connections, releasing resources
        if (connection) {
            connection = "CLOSED";
            console.log(`  Finally: connection ${connection}`);
        }
    }
}

withFinally();

console.log("\n--- Example 3: Multiple awaits in Single try Block ---");

async function multipleAwaits() {
    try {
        // If any of these fail, we jump to catch
        const users = await fetchAPI("/users");
        console.log(`  Got: ${users.endpoint}`);

        const posts = await fetchAPI("/posts");
        console.log(`  Got: ${posts.endpoint}`);

        const comments = await fetchAPI("/comments", true); // FAILS HERE
        console.log(`  Got: ${comments.endpoint}`); // Never reached

        const likes = await fetchAPI("/likes"); // Never reached
        console.log(`  Got: ${likes.endpoint}`); // Never reached
    } catch (error) {
        console.log(`  Caught at: ${error.message}`);
        console.log("  Note: /likes was never even attempted");
    }
}

multipleAwaits();

console.log("\n--- Example 4: Per-Operation Error Handling ---");

async function perOperationHandling() {
    // Wrap each operation in its own try/catch for independent error handling
    let users = null;
    let posts = null;
    let comments = null;

    try {
        users = await fetchAPI("/users");
        console.log(`  Users: loaded`);
    } catch (error) {
        console.log(`  Users: failed (${error.message})`);
        users = { data: "default users", fallback: true };
    }

    try {
        posts = await fetchAPI("/posts", true); // This fails
        console.log(`  Posts: loaded`);
    } catch (error) {
        console.log(`  Posts: failed (${error.message})`);
        posts = { data: "default posts", fallback: true };
    }

    try {
        comments = await fetchAPI("/comments");
        console.log(`  Comments: loaded`);
    } catch (error) {
        console.log(`  Comments: failed (${error.message})`);
        comments = { data: "default comments", fallback: true };
    }

    // All three are available — some may be fallback values
    console.log(`  Results: users=${users.fallback ? "fallback" : "real"}, ` +
                `posts=${posts.fallback ? "fallback" : "real"}, ` +
                `comments=${comments.fallback ? "fallback" : "real"}`);
}

perOperationHandling();

console.log("\n--- Example 5: Specific Error Types ---");

// Custom error classes (like Playwright's TimeoutError)
class TimeoutError extends Error {
    constructor(message, timeout) {
        super(message);
        this.name = "TimeoutError";
        this.timeout = timeout;
    }
}

class NetworkError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = "NetworkError";
        this.statusCode = statusCode;
    }
}

class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.name = "AuthenticationError";
    }
}

function simulateFlakeyRequest() {
    return new Promise((resolve, reject) => {
        const rand = Math.random();
        setTimeout(() => {
            if (rand < 0.33) {
                reject(new TimeoutError("Request timed out", 30000));
            } else if (rand < 0.66) {
                reject(new NetworkError("Server error", 503));
            } else {
                reject(new AuthenticationError("Token expired"));
            }
        }, 30);
    });
}

async function handleSpecificErrors() {
    try {
        await simulateFlakeyRequest();
    } catch (error) {
        // Handle different error types differently
        if (error instanceof TimeoutError) {
            console.log(`  TimeoutError: ${error.message} (timeout: ${error.timeout}ms)`);
            console.log("  Action: Retry the request");
        } else if (error instanceof NetworkError) {
            console.log(`  NetworkError: ${error.message} (status: ${error.statusCode})`);
            console.log("  Action: Check server health");
        } else if (error instanceof AuthenticationError) {
            console.log(`  AuthenticationError: ${error.message}`);
            console.log("  Action: Refresh the auth token");
        } else {
            console.log(`  Unknown error: ${error.message}`);
            throw error; // Re-throw unknown errors
        }
    }
}

handleSpecificErrors();

console.log("\n--- Example 6: Re-throwing Errors ---");

async function innerFunction() {
    throw new Error("Something broke inside");
}

async function middleFunction() {
    try {
        await innerFunction();
    } catch (error) {
        console.log(`  Middle caught: ${error.message}`);
        // Add context and re-throw
        const enrichedError = new Error(`middleFunction failed: ${error.message}`);
        enrichedError.originalError = error;
        throw enrichedError; // Re-throw for outer handler
    }
}

async function outerFunction() {
    try {
        await middleFunction();
    } catch (error) {
        console.log(`  Outer caught: ${error.message}`);
        console.log(`  Original: ${error.originalError?.message}`);
    }
}

outerFunction();

console.log("\n--- Example 7: 'return' vs 'return await' in try/catch ---");

function createRejectedPromise() {
    return Promise.reject(new Error("Rejected!"));
}

// BUG: 'return' without await BYPASSES the catch block!
async function returnWithoutAwait() {
    try {
        return createRejectedPromise(); // Promise escapes try/catch!
    } catch (error) {
        console.log(`  returnWithoutAwait caught: ${error.message}`);
        return "recovered"; // NEVER REACHED
    }
}

// CORRECT: 'return await' — the error IS caught
async function returnWithAwait() {
    try {
        return await createRejectedPromise(); // Awaited = caught by try
    } catch (error) {
        console.log(`  returnWithAwait caught: ${error.message}`);
        return "recovered";
    }
}

// Demonstrate the difference:
returnWithoutAwait()
    .then(v => console.log(`  Without await resolved: ${v}`))
    .catch(e => console.log(`  Without await REJECTED (escaped try/catch!): ${e.message}`));

returnWithAwait()
    .then(v => console.log(`  With await resolved: ${v}`))
    .catch(e => console.log(`  With await rejected: ${e.message}`));

console.log("\n--- Example 8: Playwright-Style Error Handling (Simulated) ---");

// Simulated Playwright errors and page object
class PlaywrightTimeoutError extends Error {
    constructor(selector) {
        super(`Timeout 30000ms exceeded waiting for selector "${selector}"`);
        this.name = "TimeoutError";
    }
}

const simulatedPage = {
    goto: async (url) => {
        await delay(20);
        if (url.includes("broken")) {
            throw new Error(`net::ERR_NAME_NOT_RESOLVED at ${url}`);
        }
    },
    click: async (selector) => {
        await delay(20);
        if (selector === "#missing-btn") {
            throw new PlaywrightTimeoutError(selector);
        }
    },
    waitForSelector: async (selector, options = {}) => {
        await delay(20);
        if (selector === ".slow-element") {
            throw new PlaywrightTimeoutError(selector);
        }
        return { innerText: "Found!" };
    },
    screenshot: async (options = {}) => {
        await delay(10);
        console.log(`    Screenshot saved: ${options.path || "screenshot.png"}`);
    }
};

async function testWithErrorHandling() {
    // Pattern 1: Catch navigation errors
    try {
        await simulatedPage.goto("https://broken-site.invalid");
    } catch (error) {
        console.log(`  Navigation failed: ${error.message}`);
    }

    // Pattern 2: Handle timeout with screenshot on failure
    try {
        await simulatedPage.click("#missing-btn");
    } catch (error) {
        if (error.name === "TimeoutError") {
            console.log(`  Timeout! Taking screenshot...`);
            await simulatedPage.screenshot({ path: "failure-screenshot.png" });
        } else {
            throw error; // Re-throw unexpected errors
        }
    }

    // Pattern 3: Soft assertion with fallback
    try {
        const element = await simulatedPage.waitForSelector(".slow-element");
        console.log(`  Element found: ${element.innerText}`);
    } catch (error) {
        console.log(`  Element not found, continuing test: ${error.message}`);
    }
}

testWithErrorHandling();

console.log("\n--- Example 9: Error Handling with Promise.all ---");

async function handleParallelErrors() {
    // Method 1: Single catch for all
    try {
        const results = await Promise.all([
            fetchAPI("/api1"),
            fetchAPI("/api2", true),  // This fails
            fetchAPI("/api3")
        ]);
        console.log("  All succeeded"); // Never reached
    } catch (error) {
        console.log(`  Promise.all failed: ${error.message}`);
        console.log("  But we don't know which ones succeeded!");
    }

    // Method 2: allSettled for independent error handling
    const results = await Promise.allSettled([
        fetchAPI("/api1"),
        fetchAPI("/api2", true),
        fetchAPI("/api3")
    ]);

    results.forEach((result, i) => {
        if (result.status === "fulfilled") {
            console.log(`  API ${i + 1}: Success (${result.value.endpoint})`);
        } else {
            console.log(`  API ${i + 1}: Failed (${result.reason.message})`);
        }
    });

    // Method 3: Individual error catching within Promise.all
    const safeResults = await Promise.all([
        fetchAPI("/api1").catch(e => ({ error: e.message })),
        fetchAPI("/api2", true).catch(e => ({ error: e.message })),
        fetchAPI("/api3").catch(e => ({ error: e.message }))
    ]);

    safeResults.forEach((result, i) => {
        if (result.error) {
            console.log(`  Safe API ${i + 1}: Error - ${result.error}`);
        } else {
            console.log(`  Safe API ${i + 1}: OK - ${result.endpoint}`);
        }
    });
}

handleParallelErrors();

console.log("\n--- Example 10: Async Error in Event-Style Callbacks ---");

// DANGER: Errors in async callbacks can be silently swallowed!
async function riskyPattern() {
    const items = [1, 2, 3];

    // BAD: forEach doesn't handle async errors
    // items.forEach(async (item) => {
    //     await fetchAPI(`/item/${item}`, item === 2);
    //     // Error on item 2 is UNHANDLED — silent failure!
    // });

    // GOOD: for...of with try/catch handles errors properly
    for (const item of items) {
        try {
            const result = await fetchAPI(`/item/${item}`, item === 2);
            console.log(`  Item ${item}: ${result.data}`);
        } catch (error) {
            console.log(`  Item ${item}: Error caught — ${error.message}`);
        }
    }
}

riskyPattern();

// === KEY TAKEAWAYS ===
// 1. Use try/catch/finally with async/await — same syntax as synchronous error handling.
// 2. A rejected await throws an exception caught by the surrounding try block.
// 3. finally ALWAYS runs — use it for cleanup (close connections, release resources).
// 4. Multiple awaits in one try: first failure jumps to catch, skipping the rest.
// 5. Use separate try/catch blocks when operations should fail independently.
// 6. Check error types with instanceof for specific handling (TimeoutError, etc.).
// 7. 'return await' is caught by try/catch; 'return' (without await) BYPASSES it.
// 8. In Playwright: catch TimeoutError for missing elements, take screenshots on failure.
// 9. With Promise.all: use allSettled or .catch() per-promise for granular handling.
// 10. async callbacks in forEach() silently swallow errors — use for...of instead.
