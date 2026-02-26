// Extra_06_NullishCoalescing.js
// Topic: Nullish Coalescing (??) and Nullish Assignment (??=) - Part 6 of 6
// Extends: ex_04_Operators
//
// CONCEPT: The nullish coalescing operator (??) returns the right-hand side
// only when the left-hand side is null or undefined — NOT for other falsy
// values like 0, '', or false. This is critical because || treats ALL falsy
// values as "missing", which causes bugs with legitimate 0 or false values.
// JAVA COMPARISON: Similar in spirit to Optional.orElse() or the ternary
// (value != null ? value : defaultValue), but much more concise.
// PLAYWRIGHT RELEVANCE: Environment variable fallbacks, config defaults,
// and timeout values often use ?? to handle missing values without
// accidentally overriding intentional 0 or false settings.
// ============================================================

console.log("--- Example 1: ?? vs || — The Critical Difference ---");

// || returns the right side for ANY falsy value: null, undefined, 0, '', false, NaN
// ?? returns the right side ONLY for null and undefined

const values = [null, undefined, 0, "", false, NaN, "hello", 42];

console.log("Value           || 'default'    ?? 'default'");
console.log("─".repeat(55));
values.forEach(val => {
  const orResult = val || "default";
  const nullishResult = val ?? "default";
  const label = JSON.stringify(val) ?? String(val);
  console.log(
    `${String(label).padEnd(16)} ${String(JSON.stringify(orResult)).padEnd(15)} ${JSON.stringify(nullishResult)}`
  );
});

console.log("\nKey difference: 0, '', false, and NaN are falsy but NOT nullish.");
console.log('So ?? preserves them, while || replaces them with the default.');

console.log("\n--- Example 2: Why This Matters (Real Bugs) ---");

// Bug scenario: Using || when you should use ??

// Scenario 1: Timeouts
const userTimeout = 0; // User explicitly wants NO timeout (0ms)
const configuredTimeout = userTimeout || 30000;  // BUG: becomes 30000!
const correctTimeout = userTimeout ?? 30000;      // CORRECT: stays 0
console.log("User wants timeout = 0:");
console.log("  With ||:", configuredTimeout, "(BUG! Overridden to 30000)");
console.log("  With ??:", correctTimeout, "(Correct! Stays 0)");

// Scenario 2: Retries
const retries = 0; // User explicitly wants 0 retries
console.log("\nUser wants retries = 0:");
console.log("  With ||:", retries || 3, "(BUG! Overridden to 3)");
console.log("  With ??:", retries ?? 3, "(Correct! Stays 0)");

// Scenario 3: Empty string is intentional
const customLabel = ""; // User wants an empty label (hide it)
console.log("\nUser wants empty label:");
console.log('  With ||:', customLabel || "Default Label", "(BUG! Shows default)");
console.log('  With ??:', customLabel ?? "Default Label", '(Correct! Stays "")');

// Scenario 4: Boolean false is intentional
const headless = false; // User explicitly wants headed mode
console.log("\nUser wants headless = false:");
console.log("  With ||:", headless || true, "(BUG! Overridden to true)");
console.log("  With ??:", headless ?? true, "(Correct! Stays false)");

console.log("\n--- Example 3: Nullish Assignment (??=) ---");

// ??= assigns ONLY if the current value is null or undefined
const config = {
  baseURL: null,
  timeout: undefined,
  retries: 0,         // intentionally 0
  headless: false,     // intentionally false
  reporter: ""         // intentionally empty
};

console.log("Before ??= assignment:", { ...config });

config.baseURL ??= "http://localhost:3000";   // null -> assigned
config.timeout ??= 30000;                     // undefined -> assigned
config.retries ??= 3;                         // 0 -> NOT assigned (0 is not nullish)
config.headless ??= true;                     // false -> NOT assigned
config.reporter ??= "list";                   // "" -> NOT assigned
config.workers ??= 1;                         // missing prop (undefined) -> assigned

console.log("After ??= assignment: ", config);

// Compare with ||= (logical OR assignment)
const config2 = {
  baseURL: null,
  timeout: undefined,
  retries: 0,
  headless: false,
  reporter: ""
};

config2.baseURL ||= "http://localhost:3000";
config2.timeout ||= 30000;
config2.retries ||= 3;      // BUG: 0 is falsy, so it gets overwritten!
config2.headless ||= true;  // BUG: false is falsy, so it gets overwritten!
config2.reporter ||= "list"; // BUG: "" is falsy, so it gets overwritten!
config2.workers ||= 1;

console.log("\nWith ||= (notice the bugs):", config2);

console.log("\n--- Example 4: Combining ?? with Optional Chaining (?.) ---");

// ?? and ?. are a natural pair

const testResults = {
  suite1: {
    name: "Auth Tests",
    tests: [
      { name: "Login", status: "passed", duration: 1200 },
      { name: "Logout", status: "passed", duration: 800 }
    ]
  },
  // suite2 does not exist
};

function getSuiteInfo(results, suiteId) {
  const suite = results?.[suiteId];
  const name = suite?.name ?? "Unknown Suite";
  const testCount = suite?.tests?.length ?? 0;
  const firstTest = suite?.tests?.[0]?.name ?? "No tests";
  const totalDuration = suite?.tests?.reduce?.((sum, t) => sum + t.duration, 0) ?? 0;

  return { name, testCount, firstTest, totalDuration };
}

console.log("suite1:", getSuiteInfo(testResults, "suite1"));
console.log("suite2:", getSuiteInfo(testResults, "suite2"));
console.log("null:  ", getSuiteInfo(null, "suite1"));

// Nested defaults
function getTestConfig(env) {
  const configs = {
    ci: { workers: 4 },
    local: { workers: 1 }
  };
  return {
    workers: configs?.[env]?.workers ?? 2,       // env-specific or default 2
    timeout: configs?.[env]?.timeout ?? 30000,    // always falls back
    retries: configs?.[env]?.retries ?? 0         // always falls back
  };
}

console.log("\nConfig for 'ci':     ", getTestConfig("ci"));
console.log("Config for 'local':  ", getTestConfig("local"));
console.log("Config for 'unknown':", getTestConfig("unknown"));

console.log("\n--- Example 5: Playwright Connection ---");

// Pattern 1: Environment variable fallbacks (THE most common use case)
// In real Playwright: process.env.BASE_URL ?? 'http://localhost:3000'
// We simulate with an envVars object

const envVars = {
  BASE_URL: undefined,      // not set
  HEADLESS: "false",        // set as string
  TIMEOUT: "0",             // explicitly 0 (as string from env)
  CI: "",                   // set but empty
  RETRIES: undefined,       // not set
  WORKERS: "4"              // set
};

function getEnv(key) {
  return envVars[key];  // returns undefined if not set
}

const playwrightConfig = {
  baseURL: getEnv("BASE_URL") ?? "http://localhost:3000",
  headless: getEnv("HEADLESS") !== "false",  // string comparison for env vars
  timeout: parseInt(getEnv("TIMEOUT") ?? "30000", 10),
  retries: parseInt(getEnv("RETRIES") ?? "0", 10),
  workers: parseInt(getEnv("WORKERS") ?? "1", 10)
};

console.log("Environment-derived config:");
console.log(playwrightConfig);

// Pattern 2: Safe test assertion messages
function assertElementText(actual, expected, context) {
  const elementDesc = context?.selector ?? "unknown element";
  const pageName = context?.page ?? "unknown page";
  const message = `Expected "${elementDesc}" on ${pageName} to have text "${expected}", but got "${actual ?? "(null)"}"`;
  console.log("  Assertion:", message);
  return actual === expected;
}

console.log("\nTest assertions:");
assertElementText("Welcome", "Welcome", { selector: "#heading", page: "Home" });
assertElementText(null, "Welcome", { selector: "#heading" });
assertElementText("Login", "Dashboard", null);

// Pattern 3: Default test data with nullish coalescing
function createTestUser(overrides) {
  return {
    username: overrides?.username ?? `user_${Date.now()}`,
    email: overrides?.email ?? `test_${Date.now()}@example.com`,
    age: overrides?.age ?? 25,           // ?? preserves age=0 if passed
    isAdmin: overrides?.isAdmin ?? false, // ?? preserves explicit true/false
    bio: overrides?.bio ?? "Test user"    // ?? preserves empty string ""
  };
}

console.log("\nTest users:");
console.log("  Default:", createTestUser({}));
console.log("  Age 0:  ", createTestUser({ age: 0 }));       // age stays 0
console.log("  Admin:  ", createTestUser({ isAdmin: true }));
console.log("  No bio: ", createTestUser({ bio: "" }));       // bio stays ""
console.log("  Null:   ", createTestUser(null));              // all defaults

// === KEY TAKEAWAYS ===
// 1. ?? only triggers on null/undefined — it preserves 0, '', false, and NaN.
// 2. || triggers on ALL falsy values — use ?? when 0, '', or false are valid.
// 3. ??= assigns only if current value is null/undefined — perfect for filling gaps.
// 4. Combine ?. with ?? for safe deep access with defaults: obj?.a?.b ?? 'fallback'.
// 5. In Playwright, ?? is essential for env var fallbacks and config defaults.
