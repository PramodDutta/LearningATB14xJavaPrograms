// Extra_04_Error_Handling_Patterns.js
// Topic: Error Handling Patterns - Part 4 of 4
// Extends: ex_27_Exceptions
//
// CONCEPT: Production-grade error handling uses patterns like retry with backoff,
// fallback chains, and structured error logging. These patterns make systems resilient
// to transient failures and provide clear diagnostics when things break.
// JAVA COMPARISON: Java uses Spring Retry, resilience4j for retry patterns. Try-with-resources
// for cleanup. Custom exception handlers for structured error reporting.
// PLAYWRIGHT RELEVANCE: Playwright has built-in retry for assertions (expect with timeout),
// soft assertions for non-blocking checks, and screenshot-on-failure for evidence collection.
// ============================================================

console.log("--- Example 1: Retry pattern with configurable attempts ---");

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function retry(fn, options = {}) {
    const {
        maxAttempts = 3,
        delayMs = 100,
        backoff = 2,          // multiplier for delay between retries
        onRetry = null,       // callback before each retry
    } = options;

    let lastError;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            const result = await fn(attempt);
            return result; // success — return immediately
        } catch (error) {
            lastError = error;

            if (attempt < maxAttempts) {
                const waitTime = delayMs * Math.pow(backoff, attempt - 1);
                if (onRetry) {
                    onRetry(attempt, error, waitTime);
                }
                await delay(waitTime);
            }
        }
    }

    throw new Error(`All ${maxAttempts} attempts failed. Last error: ${lastError.message}`);
}

async function example1() {
    // Simulate a flaky operation that succeeds on the 3rd try
    let callCount = 0;
    async function flakyApiCall() {
        callCount++;
        if (callCount < 3) {
            throw new Error(`Connection timeout (attempt ${callCount})`);
        }
        return { status: "success", data: "API response data" };
    }

    try {
        const result = await retry(flakyApiCall, {
            maxAttempts: 5,
            delayMs: 50,
            backoff: 1.5,
            onRetry: (attempt, error, waitMs) => {
                console.log(`  Retry ${attempt}: "${error.message}" — waiting ${waitMs}ms`);
            },
        });
        console.log("  Final result:", result);
    } catch (error) {
        console.log("  All retries exhausted:", error.message);
    }

    // Simulate an operation that never succeeds
    console.log("\n  Operation that always fails:");
    try {
        await retry(
            () => { throw new Error("Server is down"); },
            {
                maxAttempts: 3,
                delayMs: 30,
                onRetry: (attempt, error) => {
                    console.log(`  Retry ${attempt}: ${error.message}`);
                },
            }
        );
    } catch (error) {
        console.log("  Gave up:", error.message);
    }
}

console.log("\n--- Example 2: Fallback pattern — primary/secondary/default ---");

async function example2() {
    function createDataSource(name, shouldFail) {
        return async function () {
            await delay(30);
            if (shouldFail) {
                throw new Error(`${name} is unavailable`);
            }
            return { source: name, data: [1, 2, 3] };
        };
    }

    async function withFallback(strategies) {
        const errors = [];

        for (const { name, fn } of strategies) {
            try {
                const result = await fn();
                console.log(`  [OK] ${name} succeeded`);
                return result;
            } catch (error) {
                console.log(`  [FAIL] ${name}: ${error.message}`);
                errors.push({ source: name, error: error.message });
            }
        }

        return {
            source: "none",
            data: [],
            errors,
            fallbackUsed: true,
        };
    }

    // Scenario: primary database down, cache works
    console.log("  Scenario A: Primary fails, cache succeeds");
    const resultA = await withFallback([
        { name: "Primary DB", fn: createDataSource("Primary DB", true) },
        { name: "Redis Cache", fn: createDataSource("Redis Cache", false) },
        { name: "Local File", fn: createDataSource("Local File", false) },
    ]);
    console.log("  Result:", resultA);

    // Scenario: everything fails
    console.log("\n  Scenario B: All sources fail");
    const resultB = await withFallback([
        { name: "Primary DB", fn: createDataSource("Primary DB", true) },
        { name: "Redis Cache", fn: createDataSource("Redis Cache", true) },
        { name: "Local File", fn: createDataSource("Local File", true) },
    ]);
    console.log("  Result (with errors):", JSON.stringify(resultB, null, 2));
}

console.log("\n--- Example 3: Error logging and reporting pattern ---");

async function example3() {
    // Structured error logger
    class ErrorReporter {
        constructor() {
            this.errors = [];
        }

        report(error, context = {}) {
            const entry = {
                timestamp: new Date().toISOString(),
                name: error.name || "Error",
                message: error.message,
                stack: error.stack ? error.stack.split("\n").slice(0, 3).join("\n") : "N/A",
                context,
            };
            this.errors.push(entry);
            return entry;
        }

        getSummary() {
            const byType = {};
            for (const err of this.errors) {
                byType[err.name] = (byType[err.name] || 0) + 1;
            }
            return {
                totalErrors: this.errors.length,
                byType,
                latest: this.errors[this.errors.length - 1],
            };
        }

        getErrors() {
            return [...this.errors];
        }
    }

    const reporter = new ErrorReporter();

    // Simulate various errors in a test suite
    const testScenarios = [
        { name: "Login test", error: new TypeError("Cannot click on null element") },
        { name: "Search test", error: new Error("Timeout waiting for search results") },
        { name: "Cart test", error: new TypeError("price.toFixed is not a function") },
        { name: "Checkout test", error: new RangeError("Quantity must be between 1 and 99") },
        { name: "Profile test", error: new Error("Timeout waiting for avatar upload") },
    ];

    for (const scenario of testScenarios) {
        const entry = reporter.report(scenario.error, {
            testName: scenario.name,
            browser: "chromium",
            environment: "staging",
        });
        console.log(`  Logged: [${entry.name}] ${entry.message} (test: ${scenario.name})`);
    }

    console.log("\n  Error Summary:", JSON.stringify(reporter.getSummary(), null, 4));
}

console.log("\n--- Example 4: Soft assertions pattern (Playwright-inspired) ---");

async function example4() {
    class SoftAssertionCollector {
        constructor() {
            this.failures = [];
            this.passCount = 0;
        }

        expect(actual, description) {
            return {
                toBe: (expected) => {
                    if (actual === expected) {
                        this.passCount++;
                        console.log(`    PASS: ${description}`);
                    } else {
                        const failure = {
                            description,
                            expected,
                            actual,
                            message: `Expected "${expected}" but got "${actual}"`,
                        };
                        this.failures.push(failure);
                        console.log(`    SOFT FAIL: ${description} — ${failure.message}`);
                    }
                },
                toContain: (substring) => {
                    if (typeof actual === "string" && actual.includes(substring)) {
                        this.passCount++;
                        console.log(`    PASS: ${description}`);
                    } else {
                        const failure = {
                            description,
                            expected: `contains "${substring}"`,
                            actual,
                            message: `Expected "${actual}" to contain "${substring}"`,
                        };
                        this.failures.push(failure);
                        console.log(`    SOFT FAIL: ${description} — ${failure.message}`);
                    }
                },
                toBeTruthy: () => {
                    if (actual) {
                        this.passCount++;
                        console.log(`    PASS: ${description}`);
                    } else {
                        const failure = {
                            description,
                            expected: "truthy",
                            actual,
                            message: `Expected truthy but got "${actual}"`,
                        };
                        this.failures.push(failure);
                        console.log(`    SOFT FAIL: ${description} — ${failure.message}`);
                    }
                },
            };
        }

        assertAll() {
            console.log(`\n    Results: ${this.passCount} passed, ${this.failures.length} failed`);
            if (this.failures.length > 0) {
                const messages = this.failures.map(
                    (f, i) => `  ${i + 1}. ${f.description}: ${f.message}`
                );
                throw new Error(
                    `${this.failures.length} soft assertion(s) failed:\n${messages.join("\n")}`
                );
            }
        }
    }

    // Simulate testing a product page
    const productPage = {
        title: "Premium Widget",
        price: "$29.95",
        inStock: true,
        description: "A high-quality widget for professionals",
        rating: "4.2",
    };

    const soft = new SoftAssertionCollector();

    // All assertions run even if some fail
    soft.expect(productPage.title, "Product title").toBe("Premium Widget");
    soft.expect(productPage.price, "Product price").toBe("$29.99");          // WILL FAIL
    soft.expect(productPage.inStock, "In stock status").toBeTruthy();
    soft.expect(productPage.description, "Has 'premium' in description").toContain("premium"); // WILL FAIL (case-sensitive)
    soft.expect(productPage.rating, "Product rating").toBe("4.5");           // WILL FAIL

    // Now check all at once
    try {
        soft.assertAll();
    } catch (error) {
        console.log(`\n    ${error.message}`);
    }
}

console.log("\n--- Example 5: Screenshot-on-failure and cleanup pattern ---");

async function example5() {
    // Simulate a test runner with screenshot-on-failure
    class TestRunner {
        constructor() {
            this.results = [];
        }

        async runTest(testName, testFn) {
            const page = {
                screenshotTaken: false,
                async screenshot(path) {
                    this.screenshotTaken = true;
                    return `${path || "test-failure"}-${Date.now()}.png`;
                },
            };

            const startTime = Date.now();
            let status = "passed";
            let errorInfo = null;
            let screenshotPath = null;

            try {
                await testFn(page);
            } catch (error) {
                status = "failed";
                errorInfo = { name: error.name, message: error.message };

                // Screenshot on failure
                try {
                    screenshotPath = await page.screenshot(`failure-${testName}`);
                    console.log(`    Screenshot: ${screenshotPath}`);
                } catch (screenshotErr) {
                    console.log(`    Could not capture screenshot: ${screenshotErr.message}`);
                }
            } finally {
                // Cleanup always runs
                const duration = Date.now() - startTime;
                const result = {
                    testName,
                    status,
                    duration: `${duration}ms`,
                    error: errorInfo,
                    screenshot: screenshotPath,
                };
                this.results.push(result);
                console.log(`  [${status.toUpperCase()}] ${testName} (${duration}ms)`);
            }
        }

        printSummary() {
            const passed = this.results.filter(r => r.status === "passed").length;
            const failed = this.results.filter(r => r.status === "failed").length;
            console.log(`\n  Test Summary: ${passed} passed, ${failed} failed, ${this.results.length} total`);

            if (failed > 0) {
                console.log("  Failed tests:");
                for (const result of this.results.filter(r => r.status === "failed")) {
                    console.log(`    - ${result.testName}: ${result.error.message}`);
                    if (result.screenshot) {
                        console.log(`      Evidence: ${result.screenshot}`);
                    }
                }
            }
        }
    }

    const runner = new TestRunner();

    // Test 1: Passes
    await runner.runTest("login_success", async (page) => {
        await delay(30);
        // test passes
    });

    // Test 2: Fails — element not found
    await runner.runTest("add_to_cart", async (page) => {
        await delay(20);
        throw new Error('Locator "#add-to-cart" not found — timeout 30000ms');
    });

    // Test 3: Passes
    await runner.runTest("view_profile", async (page) => {
        await delay(25);
        // test passes
    });

    // Test 4: Fails — assertion
    await runner.runTest("verify_total", async (page) => {
        await delay(20);
        const expected = "$99.99";
        const actual = "$89.99";
        if (actual !== expected) {
            throw new Error(`Expected total "${expected}" but found "${actual}"`);
        }
    });

    // Test 5: Fails — timeout
    await runner.runTest("checkout_flow", async (page) => {
        await delay(30);
        throw new Error("Navigation timeout: checkout page did not load within 30000ms");
    });

    runner.printSummary();
}

// Run all examples
async function runAll() {
    await example1();
    await example2();
    await example3();
    await example4();
    await example5();

    console.log("\n// === KEY TAKEAWAYS ===");
    console.log("// 1. Retry pattern: loop with max attempts, delay with exponential backoff");
    console.log("// 2. Fallback pattern: try primary -> secondary -> default, collect all errors");
    console.log("// 3. Error reporter: structured logging with context (test name, browser, env)");
    console.log("// 4. Soft assertions: collect failures without stopping, assertAll() at the end");
    console.log("// 5. Screenshot on failure: try/catch the test, capture evidence in catch, cleanup in finally");
    console.log("// 6. Playwright has built-in retry in expect() — configurable timeout and intervals");
    console.log("// 7. Playwright soft assertions: expect.soft() continues test on failure");
    console.log("// 8. Always use finally {} for cleanup — close browsers, delete temp files, reset state");
}

runAll();
