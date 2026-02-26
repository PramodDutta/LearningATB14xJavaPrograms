// Extra_04_Promise_All_Race.js
// Topic: Promise Combinators (all, allSettled, race, any) - Part 4 of 8
// Extends: ex_31 (Promises & Async/Await)
//
// CONCEPT: Promise combinators let you work with MULTIPLE promises at once. Promise.all()
// waits for all to succeed (fails fast on any rejection). Promise.allSettled() waits for all
// regardless. Promise.race() resolves with the first to settle. Promise.any() resolves with first success.
// JAVA COMPARISON: CompletableFuture.allOf(), CompletableFuture.anyOf() are similar but less
//   ergonomic. Java lacks direct equivalents of allSettled and any.
// PLAYWRIGHT RELEVANCE: Promise.all() is used to run parallel browser operations, e.g.,
//   await Promise.all([page.click('#submit'), page.waitForNavigation()]);
// ============================================================

// Helper function to simulate async operations
function simulateAPI(name, delay, shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error(`${name} failed`));
            } else {
                resolve({ api: name, data: `Result from ${name}`, time: delay });
            }
        }, delay);
    });
}

console.log("--- Example 1: Promise.all() — Wait for ALL ---");
// All must succeed. Returns array of results in the SAME ORDER as input.

const startAll = Date.now();
Promise.all([
    simulateAPI("Users", 100),
    simulateAPI("Posts", 150),
    simulateAPI("Comments", 80)
]).then(results => {
    const elapsed = Date.now() - startAll;
    console.log(`  All completed in ~${elapsed}ms (parallel, not 330ms sequential!)`);
    results.forEach(r => console.log(`    ${r.api}: ${r.data} (took ${r.time}ms)`));
}).catch(err => {
    console.log(`  Error: ${err.message}`);
});

console.log("\n--- Example 2: Promise.all() — Fail Fast ---");
// If ANY promise rejects, the entire Promise.all() rejects IMMEDIATELY.

Promise.all([
    simulateAPI("Fast", 50),
    simulateAPI("Failing", 100, true),  // This will fail
    simulateAPI("Slow", 200)            // This is still running but result is ignored
]).then(results => {
    console.log("  Should NOT see this");
}).catch(err => {
    console.log(`  Promise.all rejected: ${err.message}`);
    console.log("  Note: 'Slow' was still running but its result is discarded");
});

console.log("\n--- Example 3: Promise.all() — With Different Value Types ---");

Promise.all([
    Promise.resolve(42),           // Already resolved
    Promise.resolve("hello"),      // Already resolved
    simulateAPI("Async", 50),      // Async operation
    Promise.resolve([1, 2, 3])     // Already resolved
]).then(([num, str, apiResult, arr]) => {
    console.log(`  Destructured: num=${num}, str=${str}, api=${apiResult.api}, arr=${arr}`);
});

console.log("\n--- Example 4: Promise.all() — Empty Array ---");

Promise.all([]).then(results => {
    console.log(`  Empty Promise.all resolves immediately: [${results}]`);
    console.log(`  Length: ${results.length}`);
});

console.log("\n--- Example 5: Promise.allSettled() — Wait for ALL, Never Rejects ---");
// Returns status objects for each promise, regardless of success or failure.
// Each result: { status: "fulfilled", value: ... } or { status: "rejected", reason: ... }

Promise.allSettled([
    simulateAPI("Success1", 50),
    simulateAPI("Failure1", 100, true),
    simulateAPI("Success2", 75),
    simulateAPI("Failure2", 60, true)
]).then(results => {
    console.log(`  allSettled got ${results.length} results:`);
    results.forEach((result, i) => {
        if (result.status === "fulfilled") {
            console.log(`    [${i}] FULFILLED: ${result.value.api}`);
        } else {
            console.log(`    [${i}] REJECTED: ${result.reason.message}`);
        }
    });

    // Separate successes and failures:
    const successes = results.filter(r => r.status === "fulfilled").map(r => r.value);
    const failures = results.filter(r => r.status === "rejected").map(r => r.reason);
    console.log(`  Successes: ${successes.length}, Failures: ${failures.length}`);
});

console.log("\n--- Example 6: Promise.allSettled() — Practical Use Case ---");
// Load page data from multiple sources — show what's available, log what failed.

function loadDashboardData() {
    return Promise.allSettled([
        simulateAPI("UserProfile", 50),
        simulateAPI("Notifications", 80, true), // Notifications service is down
        simulateAPI("RecentActivity", 60),
        simulateAPI("Analytics", 120, true)      // Analytics service is down
    ]).then(results => {
        const dashboard = {};
        const errors = [];

        const keys = ["profile", "notifications", "activity", "analytics"];
        results.forEach((result, i) => {
            if (result.status === "fulfilled") {
                dashboard[keys[i]] = result.value;
            } else {
                dashboard[keys[i]] = null; // Mark as unavailable
                errors.push(`${keys[i]}: ${result.reason.message}`);
            }
        });

        console.log("  Dashboard loaded (partial success):");
        console.log(`    Profile: ${dashboard.profile ? "loaded" : "unavailable"}`);
        console.log(`    Notifications: ${dashboard.notifications ? "loaded" : "unavailable"}`);
        console.log(`    Activity: ${dashboard.activity ? "loaded" : "unavailable"}`);
        console.log(`    Analytics: ${dashboard.analytics ? "loaded" : "unavailable"}`);
        if (errors.length > 0) {
            console.log(`  Errors (${errors.length}): ${errors.join("; ")}`);
        }
        return dashboard;
    });
}

loadDashboardData();

console.log("\n--- Example 7: Promise.race() — First to Settle Wins ---");
// Returns the result of whichever promise settles FIRST (fulfilled OR rejected).

const raceStart = Date.now();
Promise.race([
    simulateAPI("Turtle", 200),
    simulateAPI("Rabbit", 50),
    simulateAPI("Horse", 100)
]).then(winner => {
    console.log(`  Race winner: ${winner.api} (${Date.now() - raceStart}ms)`);
    // "Rabbit" wins because it resolves first (50ms)
});

console.log("\n--- Example 8: Promise.race() — Timeout Pattern ---");
// Use race to implement a timeout for any async operation.

function withTimeout(promise, timeoutMs, operationName = "Operation") {
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error(`${operationName} timed out after ${timeoutMs}ms`));
        }, timeoutMs);
    });

    return Promise.race([promise, timeoutPromise]);
}

// Operation completes before timeout:
withTimeout(simulateAPI("FastOp", 50), 200, "FastOp")
    .then(result => console.log(`  FastOp completed: ${result.api}`))
    .catch(err => console.log(`  FastOp error: ${err.message}`));

// Operation exceeds timeout:
withTimeout(simulateAPI("SlowOp", 500), 100, "SlowOp")
    .then(result => console.log(`  SlowOp completed: ${result.api}`))
    .catch(err => console.log(`  SlowOp error: ${err.message}`));

console.log("\n--- Example 9: Promise.race() — First Failure Wins Too ---");
// If the fastest promise REJECTS, race rejects.

Promise.race([
    simulateAPI("Slow-Success", 200),
    simulateAPI("Fast-Failure", 50, true) // This settles first (with rejection)
]).then(result => {
    console.log(`  Should NOT see this`);
}).catch(err => {
    console.log(`  Race rejected (fast failure): ${err.message}`);
});

console.log("\n--- Example 10: Promise.any() — First SUCCESS Wins ---");
// Unlike race, any() IGNORES rejections unless ALL promises reject.

Promise.any([
    simulateAPI("Fail-1", 50, true),   // Rejects — ignored
    simulateAPI("Fail-2", 100, true),  // Rejects — ignored
    simulateAPI("Win", 150),           // First to FULFILL — wins!
    simulateAPI("Late", 200)           // Also fulfills but too late
]).then(winner => {
    console.log(`  Promise.any winner: ${winner.api} (first to succeed)`);
}).catch(err => {
    console.log(`  All failed: ${err.message}`);
});

console.log("\n--- Example 11: Promise.any() — AggregateError (All Reject) ---");
// If ALL promises reject, Promise.any() rejects with AggregateError.

Promise.any([
    simulateAPI("Fail-A", 50, true),
    simulateAPI("Fail-B", 100, true),
    simulateAPI("Fail-C", 75, true)
]).then(winner => {
    console.log("  Should NOT see this");
}).catch(err => {
    console.log(`  All rejected! Error type: ${err.constructor.name}`);
    console.log(`  Message: ${err.message}`);
    if (err.errors) {
        err.errors.forEach((e, i) => {
            console.log(`    Error ${i}: ${e.message}`);
        });
    }
});

console.log("\n--- Example 12: Parallel API Calls Simulation ---");
// Real-world: Loading all data needed for a page

function fetchPageData() {
    const start = Date.now();

    return Promise.all([
        simulateAPI("Header-Data", 60),
        simulateAPI("Sidebar-Data", 80),
        simulateAPI("Main-Content", 120),
        simulateAPI("Footer-Data", 40)
    ]).then(([header, sidebar, main, footer]) => {
        const elapsed = Date.now() - start;
        console.log(`  Page data loaded in ~${elapsed}ms (parallel)`);
        console.log(`    Header: ${header.data}`);
        console.log(`    Sidebar: ${sidebar.data}`);
        console.log(`    Main: ${main.data}`);
        console.log(`    Footer: ${footer.data}`);
    });
}

fetchPageData();

console.log("\n--- Example 13: Comparison Table ---");
console.log(`
  +-------------------+--------------------+--------------------+------------------+
  | Method            | Waits for          | Rejects when       | Returns          |
  +-------------------+--------------------+--------------------+------------------+
  | Promise.all()     | ALL to fulfill     | ANY rejects        | Array of values  |
  | Promise.allSettled| ALL to settle      | NEVER              | Array of status  |
  | Promise.race()    | FIRST to settle    | First rejects      | Single value     |
  | Promise.any()     | FIRST to fulfill   | ALL reject         | Single value     |
  +-------------------+--------------------+--------------------+------------------+
`);

console.log("--- Example 14: Playwright-Style Pattern ---");
// In Playwright, a common pattern: click and wait for navigation simultaneously.

function simulateClick(selector) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`  Clicked: ${selector}`);
            resolve();
        }, 50);
    });
}

function simulateWaitForNavigation() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("  Navigation completed");
            resolve("https://example.com/dashboard");
        }, 100);
    });
}

// This is the pattern used in Playwright:
// await Promise.all([page.click('#submit'), page.waitForNavigation()]);
Promise.all([
    simulateClick("#submit-button"),
    simulateWaitForNavigation()
]).then(([_, url]) => {
    console.log(`  Both completed. Navigated to: ${url}`);
});

// === KEY TAKEAWAYS ===
// 1. Promise.all() — parallel execution, FAILS FAST on any rejection.
// 2. Promise.allSettled() — parallel execution, NEVER rejects, reports all outcomes.
// 3. Promise.race() — first to SETTLE (fulfill or reject) wins.
// 4. Promise.any() — first to FULFILL wins, ignores rejections unless all fail.
// 5. Use Promise.all() when you need ALL results and any failure is fatal.
// 6. Use Promise.allSettled() for graceful degradation (partial success is OK).
// 7. Use Promise.race() for timeouts and "fastest source" patterns.
// 8. Use Promise.any() for redundant sources (try multiple, take first success).
// 9. Results from Promise.all() maintain ORDER (not completion order).
// 10. Playwright uses Promise.all() for click+waitForNavigation patterns.
