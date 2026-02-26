// Extra_06_Collection_Patterns_Testing.js
// Topic: Collection Patterns for QA/Testing - Part 6 of 6
// Extends: ex_30_Collection_Framework
//
// CONCEPT: Collections become powerful when combined with array methods for real QA tasks:
// grouping test results, deduplicating data, transforming datasets, collecting unique
// errors, and counting occurrences. These patterns replace verbose loops with expressive code.
// JAVA COMPARISON: Java 8 Streams with Collectors.groupingBy(), Collectors.counting(),
// Collectors.toSet() provide similar functionality but with more verbose syntax.
// PLAYWRIGHT RELEVANCE: These patterns are used in test reporters, result analyzers,
// parallel test coordinators, and data-driven test setup/teardown.
// ============================================================

console.log("--- Example 1: Grouping test results by status using reduce ---");

const testResults = [
    { name: "login_valid_credentials", status: "passed", duration: 1250, suite: "auth" },
    { name: "login_invalid_password", status: "passed", duration: 890, suite: "auth" },
    { name: "login_locked_account", status: "failed", duration: 2100, suite: "auth", error: "Timeout waiting for error message" },
    { name: "search_basic_query", status: "passed", duration: 650, suite: "search" },
    { name: "search_empty_results", status: "failed", duration: 3200, suite: "search", error: "Expected 0 results, got 3" },
    { name: "search_special_chars", status: "skipped", duration: 0, suite: "search" },
    { name: "cart_add_item", status: "passed", duration: 1100, suite: "cart" },
    { name: "cart_remove_item", status: "passed", duration: 950, suite: "cart" },
    { name: "cart_checkout", status: "failed", duration: 5000, suite: "cart", error: "Navigation timeout" },
    { name: "profile_update_name", status: "passed", duration: 780, suite: "profile" },
    { name: "profile_upload_avatar", status: "failed", duration: 4500, suite: "profile", error: "File upload timeout" },
    { name: "profile_delete_account", status: "skipped", duration: 0, suite: "profile" },
];

// Group by status
const byStatus = testResults.reduce((groups, test) => {
    const key = test.status;
    if (!groups[key]) groups[key] = [];
    groups[key].push(test);
    return groups;
}, {});

console.log("  Results by status:");
for (const [status, tests] of Object.entries(byStatus)) {
    console.log(`    ${status.toUpperCase()}: ${tests.length} test(s)`);
    for (const test of tests) {
        console.log(`      - ${test.name}${test.error ? ` (${test.error})` : ""}`);
    }
}

// Group by suite
const bySuite = testResults.reduce((groups, test) => {
    if (!groups[test.suite]) groups[test.suite] = [];
    groups[test.suite].push(test);
    return groups;
}, {});

console.log("\n  Results by suite:");
for (const [suite, tests] of Object.entries(bySuite)) {
    const passed = tests.filter(t => t.status === "passed").length;
    const failed = tests.filter(t => t.status === "failed").length;
    const skipped = tests.filter(t => t.status === "skipped").length;
    console.log(`    ${suite}: ${passed} passed, ${failed} failed, ${skipped} skipped`);
}

// Reusable groupBy function
function groupBy(array, keyFn) {
    return array.reduce((groups, item) => {
        const key = typeof keyFn === "function" ? keyFn(item) : item[keyFn];
        if (!groups[key]) groups[key] = [];
        groups[key].push(item);
        return groups;
    }, {});
}

// Group by duration bucket
const bySpeed = groupBy(testResults, test => {
    if (test.duration === 0) return "skipped";
    if (test.duration < 1000) return "fast (<1s)";
    if (test.duration < 3000) return "medium (1-3s)";
    return "slow (>3s)";
});

console.log("\n  Results by speed:");
for (const [speed, tests] of Object.entries(bySpeed)) {
    console.log(`    ${speed}: ${tests.map(t => t.name).join(", ")}`);
}

console.log("\n--- Example 2: Deduplicating test data with Set ---");

// Raw test data with duplicates
const rawTestData = [
    { email: "alice@test.com", role: "admin" },
    { email: "bob@test.com", role: "user" },
    { email: "alice@test.com", role: "admin" },   // duplicate
    { email: "charlie@test.com", role: "user" },
    { email: "bob@test.com", role: "user" },       // duplicate
    { email: "diana@test.com", role: "admin" },
    { email: "charlie@test.com", role: "user" },   // duplicate
];

// Deduplicate by email
const seenEmails = new Set();
const uniqueTestData = rawTestData.filter(item => {
    if (seenEmails.has(item.email)) return false;
    seenEmails.add(item.email);
    return true;
});

console.log("  Raw data count:", rawTestData.length);
console.log("  Unique data count:", uniqueTestData.length);
console.log("  Unique entries:", uniqueTestData);

// Deduplicate by composite key
const apiCalls = [
    { method: "GET", url: "/api/users", status: 200 },
    { method: "POST", url: "/api/users", status: 201 },
    { method: "GET", url: "/api/users", status: 200 },    // dup
    { method: "GET", url: "/api/products", status: 200 },
    { method: "POST", url: "/api/users", status: 201 },   // dup
];

const uniqueApiCalls = [...new Map(
    apiCalls.map(call => [`${call.method}:${call.url}`, call])
).values()];

console.log("\n  Unique API calls:");
for (const call of uniqueApiCalls) {
    console.log(`    ${call.method} ${call.url} -> ${call.status}`);
}

console.log("\n--- Example 3: Mapping test data transformations ---");

// Transform test data for different environments
const baseTestUsers = [
    { name: "Admin User", email: "admin@company.com", role: "admin" },
    { name: "Standard User", email: "user@company.com", role: "user" },
    { name: "Guest User", email: "guest@company.com", role: "guest" },
];

function transformForEnvironment(users, env) {
    const domainMap = { dev: "dev.test", staging: "staging.test", prod: "company.com" };
    const domain = domainMap[env] || domainMap.dev;

    return users.map(user => ({
        ...user,
        email: user.email.replace("company.com", domain),
        password: env === "prod" ? undefined : `${env}_pass_123`,
        environment: env,
    }));
}

for (const env of ["dev", "staging", "prod"]) {
    console.log(`  ${env.toUpperCase()} users:`);
    const envUsers = transformForEnvironment(baseTestUsers, env);
    for (const user of envUsers) {
        console.log(`    ${user.name}: ${user.email} (password: ${user.password || "N/A"})`);
    }
    console.log();
}

// Transform flat data to hierarchical
const flatPermissions = [
    { user: "Alice", resource: "dashboard", action: "read" },
    { user: "Alice", resource: "dashboard", action: "write" },
    { user: "Alice", resource: "settings", action: "read" },
    { user: "Bob", resource: "dashboard", action: "read" },
    { user: "Bob", resource: "reports", action: "read" },
];

const hierarchical = flatPermissions.reduce((result, perm) => {
    if (!result[perm.user]) result[perm.user] = {};
    if (!result[perm.user][perm.resource]) result[perm.user][perm.resource] = [];
    result[perm.user][perm.resource].push(perm.action);
    return result;
}, {});

console.log("  Hierarchical permissions:");
console.log(JSON.stringify(hierarchical, null, 4));

console.log("\n--- Example 4: Collecting unique error messages ---");

const testRunResults = [
    { test: "test_1", status: "failed", error: "TimeoutError: locator.click timeout 30000ms" },
    { test: "test_2", status: "passed", error: null },
    { test: "test_3", status: "failed", error: "AssertionError: expected 'Hello' to equal 'World'" },
    { test: "test_4", status: "failed", error: "TimeoutError: page.goto timeout 30000ms" },
    { test: "test_5", status: "passed", error: null },
    { test: "test_6", status: "failed", error: "TimeoutError: locator.click timeout 30000ms" },
    { test: "test_7", status: "failed", error: "NetworkError: net::ERR_CONNECTION_REFUSED" },
    { test: "test_8", status: "failed", error: "AssertionError: expected 'Hello' to equal 'World'" },
    { test: "test_9", status: "passed", error: null },
    { test: "test_10", status: "failed", error: "TimeoutError: locator.click timeout 30000ms" },
];

// Collect all unique error messages
const uniqueErrors = [...new Set(
    testRunResults
        .filter(r => r.error !== null)
        .map(r => r.error)
)];

console.log("  Unique errors:");
for (const error of uniqueErrors) {
    const count = testRunResults.filter(r => r.error === error).length;
    console.log(`    (${count}x) ${error}`);
}

// Extract error categories
const errorCategories = testRunResults
    .filter(r => r.error)
    .reduce((cats, r) => {
        const category = r.error.split(":")[0]; // "TimeoutError", "AssertionError", etc.
        if (!cats[category]) cats[category] = { count: 0, tests: [] };
        cats[category].count++;
        cats[category].tests.push(r.test);
        return cats;
    }, {});

console.log("\n  Error categories:");
for (const [category, info] of Object.entries(errorCategories)) {
    console.log(`    ${category}: ${info.count} occurrence(s) in [${info.tests.join(", ")}]`);
}

// Find the most common error
const mostCommon = Object.entries(errorCategories)
    .sort(([, a], [, b]) => b.count - a.count)[0];
console.log(`\n  Most common error: ${mostCommon[0]} (${mostCommon[1].count} times)`);

console.log("\n--- Example 5: Counting occurrences and building reports ---");

// Count function
function countBy(array, keyFn) {
    return array.reduce((counts, item) => {
        const key = typeof keyFn === "function" ? keyFn(item) : item[keyFn];
        counts[key] = (counts[key] || 0) + 1;
        return counts;
    }, {});
}

// Count by status
const statusCounts = countBy(testResults, "status");
console.log("  Status counts:", statusCounts);

// Count by suite
const suiteCounts = countBy(testResults, "suite");
console.log("  Suite counts:", suiteCounts);

// Count by duration bucket
const speedCounts = countBy(testResults, test => {
    if (test.duration === 0) return "N/A";
    if (test.duration < 1000) return "fast";
    if (test.duration < 3000) return "medium";
    return "slow";
});
console.log("  Speed counts:", speedCounts);

// Build a full test report
function buildTestReport(results) {
    const total = results.length;
    const passed = results.filter(t => t.status === "passed").length;
    const failed = results.filter(t => t.status === "failed").length;
    const skipped = results.filter(t => t.status === "skipped").length;

    const durations = results.filter(t => t.duration > 0).map(t => t.duration);
    const totalDuration = durations.reduce((sum, d) => sum + d, 0);
    const avgDuration = durations.length > 0 ? Math.round(totalDuration / durations.length) : 0;
    const maxDuration = Math.max(...durations, 0);

    const failedTests = results
        .filter(t => t.status === "failed")
        .map(t => ({ name: t.name, error: t.error, duration: t.duration }));

    const suiteBreakdown = Object.entries(groupBy(results, "suite"))
        .map(([suite, tests]) => ({
            suite,
            total: tests.length,
            passed: tests.filter(t => t.status === "passed").length,
            failed: tests.filter(t => t.status === "failed").length,
            passRate: Math.round((tests.filter(t => t.status === "passed").length / tests.length) * 100),
        }));

    return {
        summary: {
            total,
            passed,
            failed,
            skipped,
            passRate: `${Math.round((passed / total) * 100)}%`,
        },
        timing: {
            totalDuration: `${totalDuration}ms`,
            avgDuration: `${avgDuration}ms`,
            maxDuration: `${maxDuration}ms`,
            slowestTest: results.reduce((max, t) => t.duration > max.duration ? t : max, results[0]).name,
        },
        failures: failedTests,
        suites: suiteBreakdown,
    };
}

const report = buildTestReport(testResults);
console.log("\n  Test Report:");
console.log(JSON.stringify(report, null, 2));

// Trend analysis: compare two runs
const run1Statuses = ["passed", "passed", "failed", "passed", "failed"];
const run2Statuses = ["passed", "failed", "passed", "passed", "passed"];

// Compare each test across two runs
const trendFixed = run1Statuses.map((r1, i) => {
    const r2 = run2Statuses[i];
    let change;
    if (r1 === r2) change = "stable";
    else if (r1 === "failed" && r2 === "passed") change = "fixed";
    else if (r1 === "passed" && r2 === "failed") change = "regressed";
    else change = "changed";
    return { test: `test_${i + 1}`, run1: r1, run2: r2, change };
});

console.log("\n  Run comparison:");
for (const t of trendFixed) {
    console.log(`    ${t.test}: ${t.run1} -> ${t.run2} [${t.change}]`);
}

const changeCounts = countBy(trendFixed, "change");
console.log("  Changes:", changeCounts);

// === KEY TAKEAWAYS ===
// 1. reduce() is the Swiss Army knife for grouping: groupBy(array, key) pattern
// 2. Set deduplicates by value; for objects, use Map with composite key
// 3. map() transforms test data for different environments/contexts
// 4. filter() + Set collects unique error messages from test results
// 5. countBy pattern: reduce into { key: count } for occurrence counting
// 6. Combine group/count/filter for comprehensive test reports
// 7. These patterns replace dozens of lines of imperative loops
// 8. Java equivalent: Stream API with Collectors.groupingBy, counting, toSet
