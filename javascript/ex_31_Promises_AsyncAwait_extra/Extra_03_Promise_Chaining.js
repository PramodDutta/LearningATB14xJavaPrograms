// Extra_03_Promise_Chaining.js
// Topic: Promise Chaining - Part 3 of 8
// Extends: ex_31 (Promises & Async/Await)
//
// CONCEPT: Each .then() returns a NEW promise, enabling sequential async operations.
// Values returned from .then() become the resolved value of the next promise. If you
// return a promise, the chain waits for it to settle before proceeding.
// JAVA COMPARISON: Similar to CompletableFuture.thenApply().thenAccept() chaining.
//   Java chains are type-safe; JS chains are dynamic.
// PLAYWRIGHT RELEVANCE: Before async/await, Playwright operations were chained with
//   .then(). Understanding chains helps debug complex async flows.
// ============================================================

console.log("--- Example 1: Basic .then() Chaining ---");
// Each .then() gets the return value of the previous .then()

Promise.resolve(1)
    .then(value => {
        console.log(`  Step 1: received ${value}`);
        return value + 1; // Returns 2
    })
    .then(value => {
        console.log(`  Step 2: received ${value}`);
        return value * 3; // Returns 6
    })
    .then(value => {
        console.log(`  Step 3: received ${value}`);
        return value + 4; // Returns 10
    })
    .then(value => {
        console.log(`  Final value: ${value}`); // 10
    });

console.log("\n--- Example 2: Data Transformation Pipeline ---");
// Chains are great for step-by-step data transformation.

const rawData = '  { "name": "Alice", "scores": [85, 92, 78] }  ';

Promise.resolve(rawData)
    .then(data => {
        // Step 1: Trim whitespace
        const trimmed = data.trim();
        console.log(`  Trimmed: "${trimmed.substring(0, 20)}..."`);
        return trimmed;
    })
    .then(data => {
        // Step 2: Parse JSON
        const parsed = JSON.parse(data);
        console.log(`  Parsed: name=${parsed.name}`);
        return parsed;
    })
    .then(data => {
        // Step 3: Calculate average score
        const avg = data.scores.reduce((sum, s) => sum + s, 0) / data.scores.length;
        return { ...data, averageScore: Math.round(avg * 100) / 100 };
    })
    .then(data => {
        // Step 4: Add grade
        const grade = data.averageScore >= 90 ? 'A' :
                      data.averageScore >= 80 ? 'B' :
                      data.averageScore >= 70 ? 'C' : 'F';
        return { ...data, grade };
    })
    .then(result => {
        console.log(`  Final result: ${result.name} — Avg: ${result.averageScore}, Grade: ${result.grade}`);
    });

console.log("\n--- Example 3: Returning a Value vs Returning a Promise ---");

// Returning a plain VALUE — next .then() gets it immediately:
Promise.resolve("start")
    .then(val => {
        console.log(`  Received: ${val}`);
        return "plain value"; // Not a promise — just a value
    })
    .then(val => {
        console.log(`  Got plain value: ${val}`);
    });

// Returning a PROMISE — chain waits for it to resolve:
function delayedValue(value, ms) {
    return new Promise(resolve => {
        setTimeout(() => resolve(value), ms);
    });
}

Promise.resolve("start")
    .then(val => {
        console.log(`  Starting async step...`);
        return delayedValue("async result", 100); // Returns a promise!
    })
    .then(val => {
        // This runs AFTER the 100ms delay
        console.log(`  Got async result: ${val}`);
    });

console.log("\n--- Example 4: Simulating Sequential API Calls ---");

function fetchUser(userId) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`  [API] Fetched user ${userId}`);
            resolve({ id: userId, name: "Bob", departmentId: 42 });
        }, 50);
    });
}

function fetchDepartment(deptId) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`  [API] Fetched department ${deptId}`);
            resolve({ id: deptId, name: "Engineering", managerId: 7 });
        }, 50);
    });
}

function fetchManager(managerId) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`  [API] Fetched manager ${managerId}`);
            resolve({ id: managerId, name: "Carol", title: "VP Engineering" });
        }, 50);
    });
}

// Chain: fetch user -> their department -> the department's manager
fetchUser(1)
    .then(user => {
        console.log(`  User: ${user.name}`);
        return fetchDepartment(user.departmentId); // Return promise
    })
    .then(dept => {
        console.log(`  Department: ${dept.name}`);
        return fetchManager(dept.managerId); // Return promise
    })
    .then(manager => {
        console.log(`  Manager: ${manager.name} (${manager.title})`);
    });

console.log("\n--- Example 5: Error Propagation Through Chains ---");
// Errors propagate DOWN the chain until caught by a .catch()

Promise.resolve(1)
    .then(val => {
        console.log(`  Step 1: ${val}`);
        return val + 1;
    })
    .then(val => {
        console.log(`  Step 2: ${val}`);
        throw new Error("Oops at step 2!"); // Error thrown here
        // eslint-disable-next-line no-unreachable
        return val + 1; // Never reached
    })
    .then(val => {
        // SKIPPED — error propagates past this
        console.log(`  Step 3: ${val} (SHOULD NOT SEE THIS)`);
        return val + 1;
    })
    .then(val => {
        // SKIPPED — error still propagating
        console.log(`  Step 4: ${val} (SHOULD NOT SEE THIS)`);
    })
    .catch(err => {
        // Catches the error from step 2
        console.log(`  Caught: ${err.message}`);
    })
    .then(() => {
        // After .catch(), the chain CONTINUES — .catch() returns a resolved promise
        console.log("  Chain continues after .catch()!");
    });

console.log("\n--- Example 6: Multiple .catch() Handlers ---");

Promise.reject(new Error("Initial error"))
    .catch(err => {
        console.log(`  First catch: ${err.message}`);
        return "recovered value"; // Recovers — returns a value
    })
    .then(val => {
        console.log(`  After recovery: ${val}`);
        throw new Error("Second error"); // Throw again
    })
    .catch(err => {
        console.log(`  Second catch: ${err.message}`);
        // Not returning anything — next .then() gets undefined
    })
    .then(val => {
        console.log(`  After second catch: val=${val}`); // undefined
    });

console.log("\n--- Example 7: Branching Chains ---");
// A single promise can have multiple .then() handlers (branching)

const basePromise = Promise.resolve(10);

// Branch 1:
basePromise
    .then(val => val * 2)
    .then(val => console.log(`  Branch 1 (x2): ${val}`)); // 20

// Branch 2:
basePromise
    .then(val => val * 3)
    .then(val => console.log(`  Branch 2 (x3): ${val}`)); // 30

// Branch 3:
basePromise
    .then(val => val + 5)
    .then(val => console.log(`  Branch 3 (+5): ${val}`)); // 15

// All three branches execute independently from the same source.

console.log("\n--- Example 8: Real-World Chain — Validate, Process, Save ---");

function validateInput(input) {
    return new Promise((resolve, reject) => {
        console.log(`  Validating: "${input}"`);
        if (!input || input.trim().length === 0) {
            reject(new Error("Input cannot be empty"));
        } else if (input.length > 100) {
            reject(new Error("Input too long"));
        } else {
            resolve(input.trim());
        }
    });
}

function processData(data) {
    return new Promise(resolve => {
        setTimeout(() => {
            const processed = {
                original: data,
                uppercase: data.toUpperCase(),
                wordCount: data.split(/\s+/).length,
                timestamp: new Date().toISOString()
            };
            console.log(`  Processed: ${processed.wordCount} words`);
            resolve(processed);
        }, 50);
    });
}

function saveResult(result) {
    return new Promise(resolve => {
        setTimeout(() => {
            const id = Math.floor(Math.random() * 10000);
            console.log(`  Saved with ID: ${id}`);
            resolve({ ...result, savedId: id });
        }, 50);
    });
}

// The complete pipeline:
validateInput("  Hello World from Playwright  ")
    .then(valid => processData(valid))
    .then(processed => saveResult(processed))
    .then(saved => {
        console.log(`  Complete pipeline result:`);
        console.log(`    Original: "${saved.original}"`);
        console.log(`    Uppercase: "${saved.uppercase}"`);
        console.log(`    Words: ${saved.wordCount}`);
        console.log(`    Saved ID: ${saved.savedId}`);
    })
    .catch(err => {
        console.log(`  Pipeline error: ${err.message}`);
    });

// Error case:
validateInput("")
    .then(valid => processData(valid))
    .then(processed => saveResult(processed))
    .then(saved => console.log(`  Should not see this`))
    .catch(err => console.log(`  Empty input caught: ${err.message}`));

console.log("\n--- Example 9: Common Chain Mistakes ---");

// MISTAKE 1: Breaking the chain (not returning the promise)
Promise.resolve("start")
    .then(val => {
        // Missing return!
        delayedValue("oops", 50);
    })
    .then(val => {
        console.log(`  Broken chain got: ${val}`); // undefined (not "oops")
    });

// CORRECT:
Promise.resolve("start")
    .then(val => {
        return delayedValue("correct", 50); // Return the promise!
    })
    .then(val => {
        console.log(`  Fixed chain got: ${val}`); // "correct"
    });

// MISTAKE 2: Nesting .then() instead of chaining (callback hell with promises)
// BAD:
Promise.resolve(1).then(a => {
    return Promise.resolve(2).then(b => {
        return Promise.resolve(3).then(c => {
            console.log(`  Nested (bad): ${a + b + c}`); // Works but ugly
        });
    });
});

// GOOD — flat chain:
Promise.resolve(1)
    .then(a => {
        return Promise.resolve(a + 2); // accumulate
    })
    .then(ab => {
        return Promise.resolve(ab + 3); // accumulate
    })
    .then(abc => {
        console.log(`  Flat chain (good): ${abc}`); // Same result
    });

console.log("\n--- Example 10: Chain with Conditional Logic ---");

function authenticateUser(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username === "admin") {
                resolve({ username, role: "admin", token: "abc123" });
            } else if (username === "user") {
                resolve({ username, role: "viewer", token: "xyz789" });
            } else {
                reject(new Error(`Unknown user: ${username}`));
            }
        }, 30);
    });
}

function fetchAdminDashboard(token) {
    return delayedValue({ dashboard: "admin", stats: [100, 200, 300] }, 30);
}

function fetchUserDashboard(token) {
    return delayedValue({ dashboard: "user", items: ["item1", "item2"] }, 30);
}

authenticateUser("admin")
    .then(authResult => {
        console.log(`  Authenticated as: ${authResult.role}`);
        // Conditional: different API call based on role
        if (authResult.role === "admin") {
            return fetchAdminDashboard(authResult.token);
        } else {
            return fetchUserDashboard(authResult.token);
        }
    })
    .then(dashboard => {
        console.log(`  Dashboard type: ${dashboard.dashboard}`);
        console.log(`  Dashboard data: ${JSON.stringify(dashboard)}`);
    })
    .catch(err => {
        console.log(`  Auth error: ${err.message}`);
    });

// === KEY TAKEAWAYS ===
// 1. Each .then() returns a NEW promise — that's what enables chaining.
// 2. Return a VALUE from .then() — next .then() gets it immediately.
// 3. Return a PROMISE from .then() — chain waits for it to settle.
// 4. Errors PROPAGATE through the chain until caught by .catch().
// 5. After .catch(), the chain CONTINUES (catch returns a resolved promise).
// 6. ALWAYS return in .then() — forgetting return is the #1 chain bug.
// 7. Keep chains FLAT — don't nest .then() inside .then() (use chaining instead).
// 8. Use .catch() at the END of a chain for general error handling.
// 9. Chains can branch from a single promise.
// 10. async/await (next topics) replaces chains with cleaner syntax.
