// Extra_05_Callbacks_Async.js
// Topic: Asynchronous Callbacks - Part 5 of 8
// Extends: ex_13_Functions
//
// CONCEPT: Asynchronous callbacks are functions that execute LATER, after some
// operation completes (timer, file read, network request). Nesting multiple
// async callbacks creates "callback hell" - the pyramid of doom.
// JAVA COMPARISON: Similar to Java's CompletableFuture callbacks like
// thenApply(), thenAccept(), but JS callbacks predate Promises entirely.
// PLAYWRIGHT RELEVANCE: Understanding async callbacks explains WHY Playwright
// uses async/await instead. The evolution: callbacks -> Promises -> async/await.
// ============================================================

// ---- Shared async helper functions (used across multiple examples) ----

function authenticate(username, password, callback) {
    setTimeout(() => {
        if (username === "admin" && password === "secret") {
            callback(null, { token: "abc123", userId: 1 });
        } else {
            callback(new Error("Invalid credentials"));
        }
    }, 30);
}

function fetchUserProfile(token, userId, callback) {
    setTimeout(() => {
        if (token === "abc123") {
            callback(null, { userId, name: "Admin", preferences: { theme: "dark" } });
        } else {
            callback(new Error("Invalid token"));
        }
    }, 30);
}

function fetchUserOrders(userId, callback) {
    setTimeout(() => {
        callback(null, [
            { id: 101, item: "Laptop", amount: 999 },
            { id: 102, item: "Mouse", amount: 29 },
            { id: 103, item: "Keyboard", amount: 79 }
        ]);
    }, 30);
}

function processOrders(orders, callback) {
    setTimeout(() => {
        const total = orders.reduce((sum, o) => sum + o.amount, 0);
        callback(null, { orderCount: orders.length, total, processed: true });
    }, 30);
}

function saveReport(report, callback) {
    setTimeout(() => {
        callback(null, { ...report, savedAt: new Date().toISOString(), reportId: "RPT-001" });
    }, 30);
}

function sendNotification(reportId, userId, callback) {
    setTimeout(() => {
        callback(null, { sent: true, to: userId, about: reportId });
    }, 30);
}

// ---- Examples begin ----

console.log("--- Example 1: Synchronous vs Asynchronous Callbacks ---");

// SYNCHRONOUS: callback runs immediately, blocks execution
function syncOperation(callback) {
    console.log("  Sync: before callback");
    callback("sync result");
    console.log("  Sync: after callback");
}

console.log("Before sync call");
syncOperation((result) => console.log("  Sync callback:", result));
console.log("After sync call (runs after callback)");

console.log();

// ASYNCHRONOUS: callback runs later, does NOT block
function asyncOperation(callback) {
    console.log("  Async: before setTimeout");
    setTimeout(() => {
        callback("async result");
    }, 0);
    console.log("  Async: after setTimeout (callback NOT yet called!)");
}

console.log("Before async call");
asyncOperation((result) => console.log("  Async callback:", result));
console.log("After async call (runs BEFORE callback!)");


// Wrap remaining examples in setTimeout to run after initial async examples
setTimeout(() => {

console.log("\n\n--- Example 2: Simulating Async Operations with Callbacks ---");

// Simulating a database query
function fetchUser(userId, callback) {
    console.log(`  Fetching user ${userId}...`);
    setTimeout(() => {
        const users = {
            1: { id: 1, name: "Alice", email: "alice@example.com" },
            2: { id: 2, name: "Bob", email: "bob@example.com" },
            3: { id: 3, name: "Charlie", email: "charlie@example.com" }
        };
        const user = users[userId];
        if (user) {
            callback(null, user);  // Convention: error-first callback
        } else {
            callback(new Error(`User ${userId} not found`), null);
        }
    }, 100);
}

// Error-first callback pattern (Node.js convention)
// First argument is error (null if success), second is result
fetchUser(1, (error, user) => {
    if (error) {
        console.log("  Error:", error.message);
    } else {
        console.log("  Found user:", user);
    }
});

fetchUser(99, (error, user) => {
    if (error) {
        console.log("  Error:", error.message);
    } else {
        console.log("  Found user:", user);
    }
});

}, 100);


setTimeout(() => {

console.log("\n--- Example 3: Chaining Async Callbacks (Getting Messy) ---");

// Simulated async operations
function getUser(userId, callback) {
    setTimeout(() => {
        callback(null, { id: userId, name: "Alice", departmentId: 10 });
    }, 50);
}

function getDepartment(deptId, callback) {
    setTimeout(() => {
        callback(null, { id: deptId, name: "Engineering", managerId: 5 });
    }, 50);
}

function getManager(managerId, callback) {
    setTimeout(() => {
        callback(null, { id: managerId, name: "Diana", title: "VP Engineering" });
    }, 50);
}

// Chaining: Get user -> Get department -> Get manager
// This is still manageable but notice the nesting...
getUser(1, (err, user) => {
    if (err) { console.log("Error:", err.message); return; }
    console.log("  Step 1 - User:", user.name);

    getDepartment(user.departmentId, (err, dept) => {
        if (err) { console.log("Error:", err.message); return; }
        console.log("  Step 2 - Department:", dept.name);

        getManager(dept.managerId, (err, manager) => {
            if (err) { console.log("Error:", err.message); return; }
            console.log("  Step 3 - Manager:", manager.name);
            console.log("  Result:", `${user.name} is in ${dept.name}, managed by ${manager.name}`);
        });
    });
});

}, 400);


setTimeout(() => {

console.log("\n--- Example 4: Callback Hell / Pyramid of Doom ---");
console.log("(The problem that led to Promises and async/await)\n");

// THE PYRAMID OF DOOM - each step nested inside the previous one
// Notice how the code drifts to the right and becomes hard to follow
console.log("Starting callback hell example...");
authenticate("admin", "secret", (err, auth) => {                              // Level 1
    if (err) { console.log("Auth error:", err.message); return; }
    console.log("  1. Authenticated:", auth.token);

    fetchUserProfile(auth.token, auth.userId, (err, profile) => {              // Level 2
        if (err) { console.log("Profile error:", err.message); return; }
        console.log("  2. Profile:", profile.name);

        fetchUserOrders(profile.userId, (err, orders) => {                     // Level 3
            if (err) { console.log("Orders error:", err.message); return; }
            console.log("  3. Orders:", orders.length, "items");

            processOrders(orders, (err, summary) => {                          // Level 4
                if (err) { console.log("Process error:", err.message); return; }
                console.log("  4. Summary: $" + summary.total);

                saveReport(summary, (err, report) => {                         // Level 5
                    if (err) { console.log("Save error:", err.message); return; }
                    console.log("  5. Saved:", report.reportId);

                    sendNotification(report.reportId, auth.userId, (err, notif) => { // Level 6
                        if (err) { console.log("Notify error:", err.message); return; }
                        console.log("  6. Notification sent:", notif.sent);
                        console.log("  DONE! (After 6 levels of nesting)");
                    });
                });
            });
        });
    });
});

}, 700);


setTimeout(() => {

console.log("\n--- Example 5: Problems with Callback Hell ---");
console.log("Problems demonstrated by the pyramid above:");
console.log("  1. READABILITY: Code drifts rightward, hard to follow the flow");
console.log("  2. ERROR HANDLING: Must check err in every single callback");
console.log("  3. COMPOSABILITY: Hard to reuse or rearrange steps");
console.log("  4. DEBUGGING: Stack traces are fragmented across callbacks");
console.log("  5. INVERSION OF CONTROL: You trust the caller to call your callback correctly");


console.log("\n--- Example 6: Attempt to Flatten Callbacks (Named Functions) ---");
// One mitigation: use named functions instead of anonymous ones

// But we lose closure over `auth` variable - must pass data differently
// This is awkward and shows why callbacks are fundamentally limited
let savedAuth = null;

function onAuthenticated(err, auth) {
    if (err) { console.log("Auth error:", err.message); return; }
    savedAuth = auth;
    console.log("  1(flat). Authenticated:", auth.token);
    fetchUserProfile(auth.token, auth.userId, onProfileFetched);
}

function onProfileFetched(err, profile) {
    if (err) { console.log("Profile error:", err.message); return; }
    console.log("  2(flat). Profile:", profile.name, "- auth was:", savedAuth.token);
    // But we had to use a module-level variable to access `auth` here!
    // This gets increasingly awkward with more steps
}

console.log("Flattened callbacks:");
authenticate("admin", "secret", onAuthenticated);

}, 1100);


setTimeout(() => {

console.log("\n--- Example 7: Why This Led to Promises ---");
console.log("With Promises, the same 6-step chain looks like:\n");
console.log(`  authenticate("admin", "secret")
    .then(auth => fetchUserProfile(auth.token, auth.userId))
    .then(profile => fetchUserOrders(profile.userId))
    .then(orders => processOrders(orders))
    .then(summary => saveReport(summary))
    .then(report => sendNotification(report.reportId, 1))
    .catch(err => console.log("Error:", err.message));
`);

console.log("And with async/await (what Playwright uses):\n");
console.log(`  try {
      const auth = await authenticate("admin", "secret");
      const profile = await fetchUserProfile(auth.token, auth.userId);
      const orders = await fetchUserOrders(profile.userId);
      const summary = await processOrders(orders);
      const report = await saveReport(summary);
      await sendNotification(report.reportId, auth.userId);
  } catch (err) {
      console.log("Error:", err.message);
  }
`);
console.log("This is FLAT, READABLE, and has a SINGLE error handler!");
console.log("(See ex_31_Promises_AsyncAwait_extra for Promise/async details)");


console.log("\n--- Example 8: Mock API Call Chain with Callbacks ---");
// A realistic scenario: building a test report

function fetchTestSuites(projectId, callback) {
    setTimeout(() => {
        callback(null, [
            { id: "s1", name: "Login Tests", projectId },
            { id: "s2", name: "Dashboard Tests", projectId },
            { id: "s3", name: "API Tests", projectId }
        ]);
    }, 30);
}

function fetchTestResults(suiteId, callback) {
    setTimeout(() => {
        const results = {
            s1: [{ test: "login-valid", pass: true }, { test: "login-invalid", pass: true }],
            s2: [{ test: "dashboard-load", pass: true }, { test: "dashboard-data", pass: false }],
            s3: [{ test: "api-get", pass: true }, { test: "api-post", pass: true }, { test: "api-delete", pass: false }]
        };
        callback(null, results[suiteId] || []);
    }, 30);
}

function generateReport(allResults, callback) {
    setTimeout(() => {
        const total = allResults.length;
        const passed = allResults.filter(r => r.pass).length;
        const failed = total - passed;
        callback(null, {
            total,
            passed,
            failed,
            passRate: ((passed / total) * 100).toFixed(1) + "%"
        });
    }, 30);
}

// Callback hell to build a test report
fetchTestSuites("proj-1", (err, suites) => {
    if (err) { console.log("Error:", err.message); return; }
    console.log("  Suites found:", suites.length);

    let allResults = [];
    let completed = 0;

    // Parallel callbacks (even messier!)
    suites.forEach(suite => {
        fetchTestResults(suite.id, (err, results) => {
            if (err) { console.log("Error:", err.message); return; }
            console.log(`  ${suite.name}: ${results.length} tests`);
            allResults = allResults.concat(results.map(r => ({ ...r, suite: suite.name })));
            completed++;

            // Check if all parallel operations are done
            if (completed === suites.length) {
                generateReport(allResults, (err, report) => {
                    if (err) { console.log("Error:", err.message); return; }
                    console.log("  ---- Test Report ----");
                    console.log(`  Total:     ${report.total}`);
                    console.log(`  Passed:    ${report.passed}`);
                    console.log(`  Failed:    ${report.failed}`);
                    console.log(`  Pass Rate: ${report.passRate}`);
                });
            }
        });
    });
});

}, 1350);


setTimeout(() => {

console.log("\n--- Example 9: Callback Error-First Convention Explained ---");

// Node.js established the error-first callback convention:
// callback(error, result)
// If error is null/undefined -> success, use result
// If error is truthy -> failure, ignore result

function divideAsync(a, b, callback) {
    setTimeout(() => {
        if (b === 0) {
            callback(new Error("Division by zero"));
        } else {
            callback(null, a / b);
        }
    }, 10);
}

// Success case
divideAsync(10, 3, (err, result) => {
    if (err) {
        console.log("  Error:", err.message);
    } else {
        console.log("  10 / 3 =", result.toFixed(4));
    }
});

// Error case
divideAsync(10, 0, (err, result) => {
    if (err) {
        console.log("  Error:", err.message);
    } else {
        console.log("  10 / 0 =", result);
    }
});

// Multiple results pattern
function parseJSON(jsonString, callback) {
    setTimeout(() => {
        try {
            const data = JSON.parse(jsonString);
            callback(null, data);
        } catch (e) {
            callback(new Error(`Invalid JSON: ${e.message}`));
        }
    }, 10);
}

parseJSON('{"name":"Alice","age":30}', (err, data) => {
    if (err) console.log("  Parse error:", err.message);
    else console.log("  Parsed:", data);
});

parseJSON('not valid json', (err, data) => {
    if (err) console.log("  Parse error:", err.message);
    else console.log("  Parsed:", data);
});

}, 1700);


setTimeout(() => {

console.log("\n--- Example 10: The Evolution Timeline ---");
console.log("  1995-2015: Callbacks everywhere (XMLHttpRequest, Node.js)");
console.log("  2015 (ES6): Promises standardized (cleaner chaining)");
console.log("  2017 (ES8): async/await (synchronous-looking async code)");
console.log("  Playwright: Built entirely on async/await (modern approach)");
console.log("");
console.log("  Callbacks are the FOUNDATION - you must understand them");
console.log("  to understand why Promises and async/await were created.");

// === KEY TAKEAWAYS ===
// 1. Async callbacks execute LATER, after the current synchronous code finishes
// 2. Error-first convention: callback(error, result) - null error means success
// 3. Nesting multiple async callbacks creates "callback hell" (pyramid of doom)
// 4. Problems: poor readability, fragmented error handling, hard to compose
// 5. Named functions can flatten callbacks slightly but lose closure access
// 6. Managing parallel async callbacks is especially complex
// 7. These problems led directly to Promises (ES6) and async/await (ES8)
// 8. Playwright uses async/await, which is built on top of Promises, which replaced callbacks
// 9. Java equivalent: CompletableFuture.thenApply() chains are similar to callback chains
// 10. Understanding callbacks is essential to understanding modern async JS

}, 2000);
