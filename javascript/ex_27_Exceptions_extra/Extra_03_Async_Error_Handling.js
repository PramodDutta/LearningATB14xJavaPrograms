// Extra_03_Async_Error_Handling.js
// Topic: Async Error Handling - Part 3 of 4
// Extends: ex_27_Exceptions
//
// CONCEPT: Asynchronous code in JavaScript requires special error handling patterns.
// try/catch works with async/await, but promise chains use .catch(). Unhandled
// rejections crash Node.js processes — handling them globally is essential.
// JAVA COMPARISON: Java's CompletableFuture has .exceptionally() and .handle() for
// async error handling; try/catch works with virtual threads in Java 21+.
// PLAYWRIGHT RELEVANCE: All Playwright APIs are async — page.click(), page.goto(),
// expect() all return promises. Proper async error handling is critical for stable tests.
// ============================================================

console.log("--- Example 1: try/catch with async/await ---");

// Simulate async operations using Promises with setTimeout
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId === 1) {
                resolve({ id: 1, name: "Alice", role: "admin" });
            } else if (userId === 2) {
                resolve({ id: 2, name: "Bob", role: "user" });
            } else {
                reject(new Error(`User with id ${userId} not found`));
            }
        }, 100);
    });
}

async function example1() {
    // Successful fetch
    try {
        const user = await fetchUserData(1);
        console.log("  Found user:", user.name);
    } catch (error) {
        console.log("  Error:", error.message);
    }

    // Failed fetch — caught by try/catch
    try {
        const user = await fetchUserData(999);
        console.log("  Found user:", user.name); // never reached
    } catch (error) {
        console.log("  Caught async error:", error.message);
    }

    // Multiple awaits in one try block
    try {
        const alice = await fetchUserData(1);
        const bob = await fetchUserData(2);
        const unknown = await fetchUserData(42); // this will throw
        console.log("All users loaded"); // never reached
    } catch (error) {
        console.log("  Failed during batch load:", error.message);
    }
}

console.log("\n--- Example 2: Promise.reject and .catch() chains ---");

async function example2() {
    // Promise.reject creates an already-rejected promise
    const rejected = Promise.reject(new Error("Immediate rejection"));

    // Must handle it — either with .catch() or try/catch
    rejected.catch(e => {
        console.log("  Handled rejection:", e.message);
    });

    // .then().catch() chain pattern
    function processOrder(orderId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (orderId > 0) {
                    resolve({ orderId, status: "processed" });
                } else {
                    reject(new Error("Invalid order ID"));
                }
            }, 50);
        });
    }

    // Chain with .catch()
    await processOrder(42)
        .then(order => {
            console.log("  Order processed:", order.orderId);
            return order;
        })
        .catch(error => {
            console.log("  Order failed:", error.message);
        });

    await processOrder(-1)
        .then(order => {
            console.log("  Order processed:", order.orderId);
        })
        .catch(error => {
            console.log("  Order failed:", error.message);
        });

    // .finally() runs regardless of success or failure
    await processOrder(7)
        .then(order => console.log("  Order OK:", order.orderId))
        .catch(error => console.log("  Error:", error.message))
        .finally(() => console.log("  (cleanup: connection closed)"));
}

console.log("\n--- Example 3: Promise.all, Promise.allSettled, Promise.race error handling ---");

async function example3() {
    function fetchPage(url, shouldFail) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (shouldFail) {
                    reject(new Error(`Failed to load ${url}`));
                } else {
                    resolve({ url, status: 200, body: "<html>...</html>" });
                }
            }, 50);
        });
    }

    // Promise.all — fails fast on first rejection
    console.log("  Promise.all (one fails):");
    try {
        const results = await Promise.all([
            fetchPage("/home", false),
            fetchPage("/about", true),    // this fails
            fetchPage("/contact", false),
        ]);
        console.log("  All loaded:", results.length);
    } catch (error) {
        console.log("    FAILED:", error.message);
        console.log("    (other promises still ran, but results are lost)");
    }

    // Promise.allSettled — never rejects, collects all results
    console.log("\n  Promise.allSettled (one fails):");
    const settled = await Promise.allSettled([
        fetchPage("/home", false),
        fetchPage("/about", true),
        fetchPage("/contact", false),
    ]);

    for (const result of settled) {
        if (result.status === "fulfilled") {
            console.log(`    OK: ${result.value.url}`);
        } else {
            console.log(`    FAILED: ${result.reason.message}`);
        }
    }

    // Promise.race — resolves/rejects with first settled promise
    console.log("\n  Promise.race:");
    try {
        const fastest = await Promise.race([
            new Promise((_, reject) => setTimeout(() => reject(new Error("Slow failure")), 200)),
            new Promise(resolve => setTimeout(() => resolve({ data: "fast response" }), 50)),
        ]);
        console.log("    Winner:", fastest.data);
    } catch (error) {
        console.log("    First to settle was an error:", error.message);
    }
}

console.log("\n--- Example 4: Global unhandled rejection handler ---");

async function example4() {
    // Register global handler for unhandled promise rejections
    // In a real app, this goes at the top of your entry point
    const handler = (reason, promise) => {
        console.log("  [GLOBAL] Unhandled Rejection caught!");
        console.log("  Reason:", reason instanceof Error ? reason.message : reason);
    };

    process.on("unhandledRejection", handler);

    // This rejection IS handled — global handler won't fire
    const handled = Promise.reject(new Error("I am handled"));
    handled.catch(e => console.log("  Locally handled:", e.message));

    // Demonstrate: creating a rejection that we intentionally leave unhandled
    // (In production you should NEVER do this — always handle rejections)
    // We'll skip actually creating one to avoid crashing the demo,
    // but here's what it would look like:
    console.log("\n  Pattern for production code:");
    console.log("  process.on('unhandledRejection', (reason, promise) => {");
    console.log("      logger.error('Unhandled rejection:', reason);");
    console.log("      // optionally: process.exit(1);");
    console.log("  });");

    // Clean up: remove our handler so it doesn't affect other examples
    process.removeListener("unhandledRejection", handler);

    // Also: uncaughtException handler
    console.log("\n  Pattern for uncaught exceptions:");
    console.log("  process.on('uncaughtException', (error) => {");
    console.log("      logger.error('Uncaught exception:', error);");
    console.log("      process.exit(1); // must exit — state is unreliable");
    console.log("  });");
}

console.log("\n--- Example 5: Async error handling in realistic test scenarios ---");

async function example5() {
    // Simulate Playwright-like operations
    class PageSimulator {
        constructor(pageTitle) {
            this.title = pageTitle;
            this.loaded = false;
        }

        async goto(url) {
            await delay(50);
            if (url.includes("timeout")) {
                throw new Error(`Navigation timeout: ${url} did not load within 30000ms`);
            }
            if (url.includes("404")) {
                throw new Error(`net::ERR_NAME_NOT_RESOLVED for ${url}`);
            }
            this.loaded = true;
            return { status: 200, url };
        }

        async click(selector) {
            await delay(30);
            if (!this.loaded) {
                throw new Error("Cannot interact with page before navigation");
            }
            if (selector.includes("missing")) {
                throw new Error(`locator.click: Timeout 30000ms exceeded waiting for "${selector}"`);
            }
            return true;
        }

        async screenshot() {
            await delay(20);
            return `screenshot_${Date.now()}.png`;
        }
    }

    // Test scenario with proper error handling
    const page = new PageSimulator("Test Page");

    // Scenario 1: Successful test
    console.log("  Scenario 1: Happy path");
    try {
        await page.goto("https://example.com");
        await page.click("#submit-button");
        console.log("    Test PASSED");
    } catch (error) {
        console.log(`    Test FAILED: ${error.message}`);
        const screenshot = await page.screenshot();
        console.log(`    Screenshot saved: ${screenshot}`);
    }

    // Scenario 2: Navigation failure with screenshot
    console.log("\n  Scenario 2: Navigation failure");
    const page2 = new PageSimulator("Test Page 2");
    try {
        await page2.goto("https://timeout.example.com");
        console.log("    Test PASSED");
    } catch (error) {
        console.log(`    Test FAILED: ${error.message}`);
        // Note: page might not be loaded enough for screenshot
        try {
            const screenshot = await page2.screenshot();
            console.log(`    Screenshot saved: ${screenshot}`);
        } catch (screenshotError) {
            console.log("    Could not capture screenshot");
        }
    }

    // Scenario 3: Interaction failure
    console.log("\n  Scenario 3: Element not found");
    const page3 = new PageSimulator("Test Page 3");
    try {
        await page3.goto("https://example.com");
        await page3.click(".missing-element");
        console.log("    Test PASSED");
    } catch (error) {
        console.log(`    Test FAILED: ${error.message}`);
        const screenshot = await page3.screenshot();
        console.log(`    Evidence captured: ${screenshot}`);
    }
}

// Run all async examples sequentially
async function runAll() {
    await example1();
    await example2();
    await example3();
    await example4();
    await example5();

    console.log("\n// === KEY TAKEAWAYS ===");
    console.log("// 1. try/catch works naturally with async/await — just like synchronous code");
    console.log("// 2. Promise chains use .catch() instead of try/catch");
    console.log("// 3. .finally() runs cleanup code regardless of success/failure");
    console.log("// 4. Promise.all fails fast; Promise.allSettled collects all results");
    console.log("// 5. process.on('unhandledRejection') catches missed promise rejections");
    console.log("// 6. Always handle async errors — unhandled rejections crash Node.js");
    console.log("// 7. Playwright: all page methods are async — every interaction needs error handling");
    console.log("// 8. Pattern: try the action, catch to screenshot, finally to cleanup");
}

runAll();
