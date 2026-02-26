// Extra_04_Modern_Iteration_Patterns.js
// Topic: Modern Iteration Patterns — entries, keys, values, destructuring - Part 4 of 4
// Extends: ex_10_For_Loop
//
// CONCEPT: JavaScript provides .entries(), .keys(), and .values() methods on
// both arrays and objects (via Object.*). Combined with destructuring in for...of
// loops, these give you clean, readable iteration with access to both indices/keys
// and values simultaneously — no manual index tracking needed.
// JAVA COMPARISON: Similar to Map.entrySet() for key-value pairs, or using
// IntStream for indexed iteration. JavaScript's destructuring makes it more concise.
// PLAYWRIGHT RELEVANCE: Iterating locator results with indices, processing test
// data entries, and working with configuration key-value pairs.
// ============================================================

console.log("--- Example 1: Array .entries(), .keys(), .values() ---");

const browsers = ["chromium", "firefox", "webkit"];

// .entries() returns an iterator of [index, value] pairs
console.log("Array .entries() — [index, value]:");
for (const entry of browsers.entries()) {
  console.log(`  `, entry);  // [0, 'chromium'], [1, 'firefox'], ...
}

// Destructure for clean access
console.log("\nDestructured entries:");
for (const [index, browser] of browsers.entries()) {
  console.log(`  Browser ${index + 1}: ${browser}`);
}

// .keys() returns an iterator of indices
console.log("\nArray .keys() — indices:");
for (const index of browsers.keys()) {
  console.log(`  Index: ${index}`);
}

// .values() returns an iterator of values (same as for...of on the array)
console.log("\nArray .values() — values:");
for (const value of browsers.values()) {
  console.log(`  Value: ${value}`);
}

// Practical: numbered list with entries
const testSteps = [
  "Open browser",
  "Navigate to login page",
  "Enter username",
  "Enter password",
  "Click submit",
  "Verify dashboard"
];

console.log("\nTest execution steps:");
for (const [stepNum, description] of testSteps.entries()) {
  console.log(`  Step ${String(stepNum + 1).padStart(2)}: ${description}`);
}

console.log("\n--- Example 2: Object.entries(), Object.keys(), Object.values() ---");

const testResults = {
  login: "passed",
  checkout: "failed",
  search: "passed",
  profile: "skipped",
  settings: "passed"
};

// Object.entries() returns [key, value] pairs as an array of arrays
console.log("Object.entries():");
for (const [testName, status] of Object.entries(testResults)) {
  const icon = status === "passed" ? "PASS" : status === "failed" ? "FAIL" : "SKIP";
  console.log(`  [${icon}] ${testName}`);
}

// Object.keys() returns an array of keys
console.log("\nObject.keys():", Object.keys(testResults));

// Object.values() returns an array of values
console.log("Object.values():", Object.values(testResults));

// Practical: count results by status
const statusCounts = {};
for (const status of Object.values(testResults)) {
  statusCounts[status] = (statusCounts[status] ?? 0) + 1;
}
console.log("Status counts:", statusCounts);

// Practical: filter and transform
const failedTests = Object.entries(testResults)
  .filter(([, status]) => status === "failed")
  .map(([name]) => name);
console.log("Failed tests:", failedTests);

console.log("\n--- Example 3: Map and Set Iteration ---");

// Maps have built-in .entries(), .keys(), .values() — and iterate as [key, value] by default
const browserVersions = new Map([
  ["chromium", 120],
  ["firefox", 121],
  ["webkit", 17]
]);

console.log("Map — default iteration (same as .entries()):");
for (const [browser, version] of browserVersions) {
  console.log(`  ${browser}: v${version}`);
}

console.log("\nMap .keys():");
for (const browser of browserVersions.keys()) {
  console.log(`  ${browser}`);
}

console.log("\nMap .values():");
for (const version of browserVersions.values()) {
  console.log(`  v${version}`);
}

// Convert Map to plain object
const mapAsObject = Object.fromEntries(browserVersions);
console.log("\nMap -> Object:", mapAsObject);

// Sets iterate over their unique values
const tags = new Set(["smoke", "regression", "e2e", "smoke", "P0"]);
console.log("\nSet iteration:");
for (const tag of tags) {
  console.log(`  @${tag}`);
}

// Set also has .entries() (each entry is [value, value] — keys and values are the same)
console.log("\nSet .entries() (key === value in Sets):");
for (const [key, value] of tags.entries()) {
  console.log(`  key=${key}, value=${value}, same? ${key === value}`);
}

console.log("\n--- Example 4: Advanced Destructuring in Loops ---");

// Nested destructuring in for...of
const testData = [
  { user: { name: "Alice", role: "admin" }, action: "delete", expected: "success" },
  { user: { name: "Bob", role: "viewer" }, action: "delete", expected: "forbidden" },
  { user: { name: "Charlie", role: "editor" }, action: "edit", expected: "success" }
];

console.log("Nested destructuring:");
for (const { user: { name, role }, action, expected } of testData) {
  console.log(`  ${name} (${role}) -> ${action} -> expect ${expected}`);
}

// Entries + destructuring for indexed objects
console.log("\nIndexed with entries:");
for (const [index, { user: { name }, expected }] of testData.entries()) {
  console.log(`  Test ${index + 1}: ${name} should get "${expected}"`);
}

// Default values in destructuring
const configs = [
  { name: "test1", timeout: 5000 },
  { name: "test2" },
  { name: "test3", timeout: 0 },  // 0 is intentional
];

console.log("\nDefaults in destructuring:");
for (const { name, timeout = 30000 } of configs) {
  console.log(`  ${name}: timeout=${timeout}`);
  // Note: default only applies when timeout is undefined, not 0
}

// Renaming with destructuring
const apiResponses = [
  { status_code: 200, response_body: "OK" },
  { status_code: 404, response_body: "Not Found" },
  { status_code: 500, response_body: "Internal Error" }
];

console.log("\nRenaming during destructuring:");
for (const { status_code: statusCode, response_body: body } of apiResponses) {
  console.log(`  HTTP ${statusCode}: ${body}`);
}

console.log("\n--- Example 5: Playwright Connection ---");

// Pattern 1: Iterating locator results with index
// Real Playwright: for (const [i, el] of (await page.locator('.item').all()).entries())

const locatorResults = [
  { text: "Home", href: "/", active: true },
  { text: "Products", href: "/products", active: false },
  { text: "Cart", href: "/cart", active: false },
  { text: "Account", href: "/account", active: false }
];

console.log("Nav link verification (indexed):");
for (const [index, { text, href, active }] of locatorResults.entries()) {
  const status = active ? "ACTIVE" : "      ";
  console.log(`  [${index}] ${status} "${text}" -> ${href}`);
}

// Pattern 2: Test matrix with Object.entries
const testMatrix = {
  chromium: { viewport: { width: 1280, height: 720 }, mobile: false },
  firefox: { viewport: { width: 1280, height: 720 }, mobile: false },
  webkit: { viewport: { width: 375, height: 812 }, mobile: true },
};

console.log("\nTest matrix:");
for (const [browser, config] of Object.entries(testMatrix)) {
  const { viewport: { width, height }, mobile } = config;
  const device = mobile ? "mobile" : "desktop";
  console.log(`  ${browser.padEnd(10)} ${width}x${height} (${device})`);
}

// Pattern 3: Processing form field test data
const formFields = new Map([
  ["username", { type: "text", required: true, minLength: 3 }],
  ["email", { type: "email", required: true, minLength: 5 }],
  ["phone", { type: "tel", required: false, minLength: 10 }],
  ["bio", { type: "textarea", required: false, minLength: 0 }]
]);

console.log("\nForm field validation plan:");
for (const [fieldName, { type, required, minLength }] of formFields) {
  const tests = [];
  if (required) tests.push("empty-field-error");
  if (minLength > 0) tests.push(`min-length-${minLength}`);
  tests.push(`valid-${type}`);
  console.log(`  ${fieldName.padEnd(10)} [${required ? "REQ" : "OPT"}] Tests: ${tests.join(", ")}`);
}

// Pattern 4: Parallel iteration (zip pattern)
function* zip(...iterables) {
  const iterators = iterables.map(it => it[Symbol.iterator]());
  while (true) {
    const results = iterators.map(it => it.next());
    if (results.some(r => r.done)) return;
    yield results.map(r => r.value);
  }
}

const selectors = ["#username", "#password", "#submit"];
const actions = ["fill('admin')", "fill('pass123')", "click()"];
const expectations = ["value set", "value set", "navigated"];

console.log("\nZipped test steps (selector + action + expectation):");
for (const [selector, action, expected] of zip(selectors, actions, expectations)) {
  console.log(`  ${selector}.${action} -> expect: ${expected}`);
}

// Pattern 5: Building a test report summary
const suiteResults = {
  "Auth Suite": { passed: 5, failed: 1, skipped: 0, duration: 12000 },
  "Cart Suite": { passed: 8, failed: 0, skipped: 2, duration: 25000 },
  "Search Suite": { passed: 3, failed: 2, skipped: 1, duration: 18000 }
};

console.log("\n=== TEST REPORT ===");
let totalPassed = 0, totalFailed = 0, totalSkipped = 0, totalDuration = 0;

for (const [suiteName, { passed, failed, skipped, duration }] of Object.entries(suiteResults)) {
  const total = passed + failed + skipped;
  const passRate = ((passed / total) * 100).toFixed(0);
  console.log(`  ${suiteName.padEnd(15)} ${passed}P ${failed}F ${skipped}S  (${passRate}% pass, ${duration}ms)`);
  totalPassed += passed;
  totalFailed += failed;
  totalSkipped += skipped;
  totalDuration += duration;
}

console.log("  " + "─".repeat(55));
const grandTotal = totalPassed + totalFailed + totalSkipped;
console.log(`  ${"TOTAL".padEnd(15)} ${totalPassed}P ${totalFailed}F ${totalSkipped}S  (${((totalPassed / grandTotal) * 100).toFixed(0)}% pass, ${totalDuration}ms)`);

// === KEY TAKEAWAYS ===
// 1. Array .entries() gives [index, value] — perfect for numbered iteration.
// 2. Object.entries() gives [key, value] pairs — the go-to for object iteration.
// 3. Maps iterate as [key, value] by default — no need for .entries().
// 4. Destructuring in for...of enables clean extraction: for (const {name, status} of results).
// 5. These patterns are the standard way to iterate locator results, config objects, and test data in Playwright.
