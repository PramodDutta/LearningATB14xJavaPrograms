// Extra_08_AsyncAwait_RealPatterns.js
// Topic: Real-World async/await Patterns - Part 8 of 8
// Extends: ex_31 (Promises & Async/Await)
//
// CONCEPT: Production async code uses patterns like retry with backoff, polling,
// timeouts, and debouncing. These patterns are essential for reliable test automation
// where network and UI timing are unpredictable.
// JAVA COMPARISON: Java uses libraries like Resilience4j for retry/circuit-breaker.
//   JavaScript achieves the same with simple async functions and loops.
// PLAYWRIGHT RELEVANCE: Playwright has built-in auto-waiting, but custom retry logic,
//   polling waitForFunction, and timeout wrappers are still commonly needed.
// ============================================================

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================================
// PATTERN 1: RETRY WITH EXPONENTIAL BACKOFF
// ============================================================
console.log("--- Pattern 1: Retry with Exponential Backoff ---");

async function retry(fn, options = {}) {
    const {
        maxRetries = 3,
        initialDelay = 100,
        backoffMultiplier = 2,
        maxDelay = 5000,
        retryOn = () => true // Predicate: which errors should trigger retry
    } = options;

    let lastError;

    for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
        try {
            const result = await fn(attempt);
            if (attempt > 1) {
                console.log(`    Succeeded on attempt ${attempt}`);
            }
            return result;
        } catch (error) {
            lastError = error;

            if (attempt > maxRetries || !retryOn(error)) {
                break;
            }

            const delayMs = Math.min(
                initialDelay * Math.pow(backoffMultiplier, attempt - 1),
                maxDelay
            );
            console.log(`    Attempt ${attempt} failed: ${error.message}. Retrying in ${delayMs}ms...`);
            await delay(delayMs);
        }
    }

    throw lastError;
}

// Simulate a flaky API that fails the first 2 times
let flakyCallCount = 0;
async function flakyAPI() {
    flakyCallCount++;
    if (flakyCallCount <= 2) {
        throw new Error(`Flaky failure #${flakyCallCount}`);
    }
    return { data: "Success!", attempts: flakyCallCount };
}

(async () => {
    console.log("  Testing retry with flaky API:");
    try {
        const result = await retry(flakyAPI, {
            maxRetries: 3,
            initialDelay: 50,
            backoffMultiplier: 2
        });
        console.log(`    Final result: ${JSON.stringify(result)}`);
    } catch (error) {
        console.log(`    All retries failed: ${error.message}`);
    }
})();

// ============================================================
// PATTERN 2: POLLING UNTIL CONDITION MET
// ============================================================
console.log("\n--- Pattern 2: Polling Until Condition ---");

async function pollUntil(checkFn, options = {}) {
    const {
        interval = 100,
        timeout = 5000,
        message = "Polling timed out"
    } = options;

    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
        const result = await checkFn();
        if (result.ready) {
            return result;
        }
        console.log(`    Poll check: not ready yet (${Date.now() - startTime}ms elapsed)`);
        await delay(interval);
    }

    throw new Error(`${message} after ${timeout}ms`);
}

// Simulate a job that becomes ready after ~300ms
let jobProgress = 0;
const jobInterval = setInterval(() => {
    jobProgress += 25;
    if (jobProgress >= 100) clearInterval(jobInterval);
}, 80);

(async () => {
    console.log("  Polling for job completion:");
    try {
        const result = await pollUntil(
            async () => {
                return { ready: jobProgress >= 100, progress: jobProgress };
            },
            { interval: 60, timeout: 2000, message: "Job did not complete" }
        );
        console.log(`    Job completed! Progress: ${result.progress}%`);
    } catch (error) {
        console.log(`    ${error.message}`);
    }
})();

// ============================================================
// PATTERN 3: TIMEOUT WRAPPER
// ============================================================
console.log("\n--- Pattern 3: Timeout Wrapper ---");

function withTimeout(asyncFn, timeoutMs, label = "Operation") {
    return new Promise(async (resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error(`${label} timed out after ${timeoutMs}ms`));
        }, timeoutMs);

        try {
            const result = await asyncFn();
            clearTimeout(timer);
            resolve(result);
        } catch (error) {
            clearTimeout(timer);
            reject(error);
        }
    });
}

// Alternative cleaner implementation using AbortController pattern:
async function withTimeoutClean(promise, timeoutMs, label = "Operation") {
    let timer;
    const timeoutPromise = new Promise((_, reject) => {
        timer = setTimeout(() => {
            reject(new Error(`${label} timed out after ${timeoutMs}ms`));
        }, timeoutMs);
    });

    try {
        const result = await Promise.race([promise, timeoutPromise]);
        clearTimeout(timer);
        return result;
    } catch (error) {
        clearTimeout(timer);
        throw error;
    }
}

(async () => {
    // Success: operation completes before timeout
    try {
        const result = await withTimeoutClean(
            delay(50).then(() => "fast result"),
            200,
            "FastOperation"
        );
        console.log(`  Fast operation: ${result}`);
    } catch (error) {
        console.log(`  Error: ${error.message}`);
    }

    // Failure: operation exceeds timeout
    try {
        const result = await withTimeoutClean(
            delay(500).then(() => "slow result"),
            100,
            "SlowOperation"
        );
        console.log(`  Slow operation: ${result}`);
    } catch (error) {
        console.log(`  Timeout: ${error.message}`);
    }
})();

// ============================================================
// PATTERN 4: DEBOUNCE (Async Version)
// ============================================================
console.log("\n--- Pattern 4: Async Debounce ---");

function asyncDebounce(fn, delayMs) {
    let timer = null;
    let pendingResolve = null;

    return function (...args) {
        return new Promise((resolve) => {
            if (timer) {
                clearTimeout(timer);
            }
            pendingResolve = resolve;
            timer = setTimeout(async () => {
                const result = await fn.apply(this, args);
                pendingResolve(result);
                timer = null;
            }, delayMs);
        });
    };
}

const debouncedSearch = asyncDebounce(async (query) => {
    console.log(`    Searching for: "${query}"`);
    await delay(30);
    return [`${query}_result1`, `${query}_result2`];
}, 100);

// Simulate rapid typing — only the last call should execute
(async () => {
    console.log("  Simulating rapid search input:");
    debouncedSearch("h");    // Cancelled
    debouncedSearch("he");   // Cancelled
    debouncedSearch("hel");  // Cancelled
    const results = await debouncedSearch("hello"); // This one executes
    console.log(`    Final results: ${results.join(", ")}`);
})();

// ============================================================
// PATTERN 5: QUEUE (Sequential Execution of Async Tasks)
// ============================================================
console.log("\n--- Pattern 5: Async Task Queue ---");

class AsyncQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
    }

    enqueue(asyncFn) {
        return new Promise((resolve, reject) => {
            this.queue.push({ fn: asyncFn, resolve, reject });
            this.processNext();
        });
    }

    async processNext() {
        if (this.processing || this.queue.length === 0) return;

        this.processing = true;
        const { fn, resolve, reject } = this.queue.shift();

        try {
            const result = await fn();
            resolve(result);
        } catch (error) {
            reject(error);
        } finally {
            this.processing = false;
            this.processNext();
        }
    }
}

(async () => {
    const queue = new AsyncQueue();

    console.log("  Queuing 3 tasks (all start near-simultaneously):");

    const results = await Promise.all([
        queue.enqueue(async () => {
            await delay(60);
            console.log("    Task 1 completed");
            return "result1";
        }),
        queue.enqueue(async () => {
            await delay(40);
            console.log("    Task 2 completed");
            return "result2";
        }),
        queue.enqueue(async () => {
            await delay(20);
            console.log("    Task 3 completed");
            return "result3";
        })
    ]);

    console.log(`  All done in order: ${results.join(", ")}`);
    console.log("  (Tasks ran sequentially despite being submitted in parallel)");
})();

// ============================================================
// PATTERN 6: MUTEX / LOCK
// ============================================================
console.log("\n--- Pattern 6: Simple Async Mutex ---");

class AsyncMutex {
    constructor() {
        this.locked = false;
        this.waitQueue = [];
    }

    async acquire() {
        if (!this.locked) {
            this.locked = true;
            return;
        }
        // Wait until the lock is released
        return new Promise(resolve => {
            this.waitQueue.push(resolve);
        });
    }

    release() {
        if (this.waitQueue.length > 0) {
            const next = this.waitQueue.shift();
            next(); // Give lock to next waiter
        } else {
            this.locked = false;
        }
    }
}

(async () => {
    const mutex = new AsyncMutex();
    let sharedResource = 0;

    async function incrementSafely(id) {
        await mutex.acquire();
        try {
            const current = sharedResource;
            await delay(20); // Simulate async read-modify-write
            sharedResource = current + 1;
            console.log(`    Worker ${id}: incremented to ${sharedResource}`);
        } finally {
            mutex.release();
        }
    }

    console.log("  Running 3 workers with mutex:");
    await Promise.all([
        incrementSafely("A"),
        incrementSafely("B"),
        incrementSafely("C")
    ]);
    console.log(`  Final value: ${sharedResource} (correct: 3)`);
})();

// ============================================================
// PATTERN 7: PLAYWRIGHT-STYLE CUSTOM WAITING
// ============================================================
console.log("\n--- Pattern 7: Playwright-Style Custom Waiting ---");

// Simulated page state
const pageState = {
    elements: {},
    loaded: false
};

// Simulate elements appearing after delays
setTimeout(() => { pageState.elements[".header"] = "Header Content"; }, 80);
setTimeout(() => { pageState.elements[".sidebar"] = "Sidebar Content"; }, 150);
setTimeout(() => { pageState.elements[".main"] = "Main Content"; }, 200);
setTimeout(() => { pageState.loaded = true; }, 250);

async function waitForSelector(selector, options = {}) {
    const { timeout = 5000, state = "visible" } = options;
    const start = Date.now();

    while (Date.now() - start < timeout) {
        if (pageState.elements[selector]) {
            const elapsed = Date.now() - start;
            console.log(`    Found "${selector}" after ${elapsed}ms`);
            return pageState.elements[selector];
        }
        await delay(20); // Poll interval
    }

    throw new Error(`Timeout waiting for "${selector}" (${timeout}ms)`);
}

async function waitForLoadState(state = "loaded", timeout = 5000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
        if (pageState.loaded) {
            console.log(`    Page loaded after ${Date.now() - start}ms`);
            return;
        }
        await delay(20);
    }
    throw new Error(`Page did not reach "${state}" state (${timeout}ms)`);
}

(async () => {
    console.log("  Waiting for page elements:");
    const header = await waitForSelector(".header");
    console.log(`    Header content: "${header}"`);

    const sidebar = await waitForSelector(".sidebar");
    console.log(`    Sidebar content: "${sidebar}"`);

    await waitForLoadState("loaded");
    console.log("  Page fully loaded!");
})();

// ============================================================
// PATTERN 8: COMPLETE RETRY UTILITY
// ============================================================
console.log("\n--- Pattern 8: Complete Retry Utility ---");

class RetryError extends Error {
    constructor(message, attempts, errors) {
        super(message);
        this.name = "RetryError";
        this.attempts = attempts;
        this.errors = errors;
    }
}

async function retryWithFullOptions(fn, options = {}) {
    const {
        maxRetries = 3,
        initialDelay = 100,
        maxDelay = 10000,
        backoffMultiplier = 2,
        jitter = true,           // Add randomness to prevent thundering herd
        retryOn = () => true,    // Which errors to retry
        onRetry = null,          // Callback on each retry
        timeout = 0              // Overall timeout (0 = no limit)
    } = options;

    const errors = [];
    const overallStart = Date.now();

    for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
        // Check overall timeout
        if (timeout > 0 && Date.now() - overallStart > timeout) {
            throw new RetryError(
                `Overall timeout of ${timeout}ms exceeded`,
                attempt - 1,
                errors
            );
        }

        try {
            return await fn(attempt);
        } catch (error) {
            errors.push({ attempt, error: error.message, time: Date.now() - overallStart });

            if (attempt > maxRetries || !retryOn(error)) {
                throw new RetryError(
                    `Failed after ${attempt} attempt(s): ${error.message}`,
                    attempt,
                    errors
                );
            }

            let delayMs = Math.min(
                initialDelay * Math.pow(backoffMultiplier, attempt - 1),
                maxDelay
            );

            // Add jitter: +/- 25%
            if (jitter) {
                const jitterFactor = 0.75 + Math.random() * 0.5;
                delayMs = Math.round(delayMs * jitterFactor);
            }

            if (onRetry) {
                onRetry({ attempt, error, nextDelay: delayMs, totalErrors: errors.length });
            }

            await delay(delayMs);
        }
    }
}

// Demo the full retry utility
let fullRetryCount = 0;
(async () => {
    console.log("  Full retry utility demo:");
    try {
        const result = await retryWithFullOptions(
            async (attempt) => {
                fullRetryCount++;
                if (fullRetryCount <= 2) {
                    throw new Error(`Service unavailable (attempt ${fullRetryCount})`);
                }
                return { success: true, finalAttempt: fullRetryCount };
            },
            {
                maxRetries: 4,
                initialDelay: 30,
                backoffMultiplier: 2,
                jitter: false,
                onRetry: ({ attempt, error, nextDelay }) => {
                    console.log(`    Retry ${attempt}: "${error.message}" -> wait ${nextDelay}ms`);
                }
            }
        );
        console.log(`    Success: ${JSON.stringify(result)}`);
    } catch (error) {
        console.log(`    Failed: ${error.message}`);
        console.log(`    Attempts: ${error.attempts}`);
        error.errors.forEach(e => console.log(`      ${e.attempt}: ${e.error} at ${e.time}ms`));
    }
})();

// ============================================================
// PATTERN 9: SEMAPHORE (Concurrent Limit)
// ============================================================
console.log("\n--- Pattern 9: Semaphore (Limit Concurrency) ---");

class Semaphore {
    constructor(maxConcurrency) {
        this.max = maxConcurrency;
        this.current = 0;
        this.waitQueue = [];
    }

    async acquire() {
        if (this.current < this.max) {
            this.current++;
            return;
        }
        return new Promise(resolve => {
            this.waitQueue.push(resolve);
        });
    }

    release() {
        this.current--;
        if (this.waitQueue.length > 0) {
            this.current++;
            const next = this.waitQueue.shift();
            next();
        }
    }

    async run(fn) {
        await this.acquire();
        try {
            return await fn();
        } finally {
            this.release();
        }
    }
}

(async () => {
    const semaphore = new Semaphore(2); // Max 2 concurrent

    const tasks = Array.from({ length: 6 }, (_, i) => async () => {
        const start = Date.now();
        console.log(`    Task ${i + 1} started`);
        await delay(60);
        console.log(`    Task ${i + 1} completed (${Date.now() - start}ms)`);
        return `result_${i + 1}`;
    });

    console.log("  Running 6 tasks with concurrency limit of 2:");
    const startTime = Date.now();
    const results = await Promise.all(tasks.map(task => semaphore.run(task)));
    console.log(`  All done in ~${Date.now() - startTime}ms`);
    console.log(`  Results: ${results.join(", ")}`);
})();

// === KEY TAKEAWAYS ===
// 1. RETRY with exponential backoff: essential for flaky network/API calls.
// 2. Add JITTER to backoff to prevent thundering herd problem.
// 3. POLLING: use while + await + delay for waiting on conditions.
// 4. TIMEOUT wrapper: use Promise.race with a timer promise.
// 5. DEBOUNCE async: prevent rapid repeated calls (useful for search-as-you-type).
// 6. QUEUE: enforce sequential execution of async tasks.
// 7. MUTEX: protect shared resources from concurrent async access.
// 8. SEMAPHORE: limit concurrency (e.g., max 3 parallel requests).
// 9. Playwright has built-in auto-waiting, but custom patterns are still needed.
// 10. These patterns are the building blocks of robust test automation.
