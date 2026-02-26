// Extra_04_SpreadRest_RealExamples.js
// Topic: Spread & Rest Combined — Real-World Patterns - Part 4 of 6
// Extends: ex_04_Operators
//
// CONCEPT: Spread and rest are two sides of the same coin. In real projects,
// they often appear together: rest collects arguments, spread passes them on.
// This file shows practical patterns you will encounter in Playwright test
// codebases, utility libraries, and configuration management.
// JAVA COMPARISON: Java achieves similar patterns with Builder pattern, varargs,
// and method overloading — but with significantly more boilerplate.
// PLAYWRIGHT RELEVANCE: Config merging, option forwarding, test data builders,
// and wrapper/helper functions all rely heavily on spread/rest.
// ============================================================

console.log("--- Example 1: Config Builder Pattern ---");

// A common pattern: default config + environment overrides + runtime overrides
const playwrightDefaults = {
  baseURL: "http://localhost:3000",
  headless: true,
  timeout: 30000,
  retries: 0,
  workers: 1,
  reporter: "list",
  screenshot: "off",
  trace: "off"
};

const envOverrides = {
  ci: {
    headless: true,
    retries: 2,
    workers: 4,
    reporter: "junit",
    screenshot: "on-failure",
    trace: "retain-on-failure"
  },
  staging: {
    baseURL: "https://staging.example.com",
    retries: 1,
    workers: 2
  },
  debug: {
    headless: false,
    timeout: 0,  // no timeout in debug
    workers: 1,
    trace: "on"
  }
};

function buildConfig(environment, runtimeOverrides = {}) {
  const envConfig = envOverrides[environment] || {};
  return {
    ...playwrightDefaults,   // base defaults
    ...envConfig,             // environment-specific
    ...runtimeOverrides       // anything passed at runtime wins
  };
}

console.log("CI config:", buildConfig("ci"));
console.log("\nStaging config:", buildConfig("staging"));
console.log("\nDebug + custom timeout:", buildConfig("debug", { timeout: 5000 }));
console.log("\nUnknown env + overrides:", buildConfig("unknown", { baseURL: "http://custom.test" }));

console.log("\n--- Example 2: Object Subset Extraction ---");

// Extract only what you need, discard the rest
const fullTestReport = {
  testName: "Checkout Flow",
  status: "failed",
  duration: 12500,
  error: "Element not found: #pay-button",
  stackTrace: "at Object.click (test.js:42)\nat processTicksAndRejections...",
  screenshot: "/artifacts/checkout-fail.png",
  video: "/artifacts/checkout-fail.webm",
  retryCount: 2,
  browser: "webkit",
  os: "linux"
};

// Pull out the summary, leave detailed artifacts behind
const { stackTrace, screenshot, video, ...summary } = fullTestReport;
console.log("Summary (for Slack notification):");
console.log(summary);

// Pull out only specific fields using destructuring + rest
function extractErrorInfo({ testName, status, error, ...rest }) {
  return { testName, status, error, fieldCount: Object.keys(rest).length };
}
console.log("\nError info:", extractErrorInfo(fullTestReport));

console.log("\n--- Example 3: Function Wrapping with Rest/Spread ---");

// Wrap any function with logging — rest collects, spread forwards
function withLogging(fnName, fn) {
  return function (...args) {
    console.log(`  [LOG] Calling ${fnName}(${args.map(a => JSON.stringify(a)).join(", ")})`);
    const startTime = Date.now();
    const result = fn(...args);
    const elapsed = Date.now() - startTime;
    console.log(`  [LOG] ${fnName} returned ${JSON.stringify(result)} in ${elapsed}ms`);
    return result;
  };
}

function multiply(a, b) {
  return a * b;
}

function concatenate(...strings) {
  return strings.join(" ");
}

const loggedMultiply = withLogging("multiply", multiply);
const loggedConcat = withLogging("concatenate", concatenate);

console.log("Result:", loggedMultiply(6, 7));
console.log("Result:", loggedConcat("Hello", "Playwright", "World"));

console.log("\n--- Example 4: Immutable Array Operations ---");

// Using spread to do "immutable" array operations (common in state management)
const testQueue = ["test_login", "test_checkout", "test_profile"];

// Add to end (like push, but returns new array)
const withNewTest = [...testQueue, "test_search"];
console.log("Original queue:", testQueue);
console.log("With new test: ", withNewTest);

// Add to beginning (like unshift, but returns new array)
const withPriority = ["test_smoke", ...testQueue];
console.log("With priority:  ", withPriority);

// Insert at specific position
const insertAt = 2;
const withInserted = [
  ...testQueue.slice(0, insertAt),
  "test_NEW",
  ...testQueue.slice(insertAt)
];
console.log("With insert at [2]:", withInserted);

// Remove by index (without mutating)
const removeIndex = 1;
const withRemoved = [
  ...testQueue.slice(0, removeIndex),
  ...testQueue.slice(removeIndex + 1)
];
console.log("With [1] removed: ", withRemoved);

// Replace at index
const replaceIndex = 1;
const withReplaced = [
  ...testQueue.slice(0, replaceIndex),
  "test_checkout_v2",
  ...testQueue.slice(replaceIndex + 1)
];
console.log("With [1] replaced:", withReplaced);

console.log("\n--- Example 5: Playwright Connection — Test Data Builders ---");

// Factory function for test data with defaults
function createUser(overrides = {}) {
  const timestamp = Date.now();
  return {
    firstName: "Test",
    lastName: "User",
    email: `testuser+${timestamp}@example.com`,
    password: "SecurePass123!",
    role: "customer",
    ...overrides  // any overrides replace the defaults
  };
}

console.log("Default user:", createUser());
console.log("Admin user:  ", createUser({ role: "admin", firstName: "Admin" }));
console.log("Custom email:", createUser({ email: "specific@test.com" }));

// Composable test data builder using rest/spread
function createOrder(userOverrides = {}, ...items) {
  const user = createUser(userOverrides);
  return {
    orderId: `ORD-${Date.now()}`,
    user: { name: `${user.firstName} ${user.lastName}`, email: user.email },
    items: items.length > 0 ? items : [{ name: "Default Item", price: 9.99, qty: 1 }],
    total: items.length > 0
      ? items.reduce((sum, item) => sum + item.price * item.qty, 0)
      : 9.99
  };
}

console.log("\nDefault order:", JSON.stringify(createOrder(), null, 2));

const customOrder = createOrder(
  { firstName: "Alice" },
  { name: "Widget", price: 29.99, qty: 2 },
  { name: "Gadget", price: 49.99, qty: 1 }
);
console.log("\nCustom order:", JSON.stringify(customOrder, null, 2));

// Pattern: collecting test options with rest, spreading into Playwright-style calls
function simulateTest(testName, ...tags) {
  const testInfo = {
    name: testName,
    tags: tags,
    tagString: tags.map(t => `@${t}`).join(" ")
  };
  console.log(`\n  Test: "${testInfo.name}" ${testInfo.tagString}`);
  return testInfo;
}

simulateTest("Login with valid credentials", "smoke", "auth", "P0");
simulateTest("Search with special characters", "regression", "search");
simulateTest("Homepage loads", "smoke");

// === KEY TAKEAWAYS ===
// 1. Config builder pattern: {...defaults, ...envConfig, ...runtimeOverrides} — last wins.
// 2. Rest/spread together enable transparent function wrappers (logging, retry, timing).
// 3. Spread enables immutable array operations: insert, remove, replace without mutating.
// 4. Test data factories with spread overrides are cleaner than Java's Builder pattern.
// 5. These patterns appear constantly in Playwright: page options, test fixtures, data setup.
