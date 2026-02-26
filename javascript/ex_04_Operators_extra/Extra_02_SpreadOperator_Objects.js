// Extra_02_SpreadOperator_Objects.js
// Topic: Spread Operator (...) with Objects - Part 2 of 6
// Extends: ex_04_Operators
//
// CONCEPT: The spread operator on objects ({...obj}) copies all enumerable own
// properties into a new object. When properties collide during a merge, the
// last one wins — making it perfect for config/defaults patterns.
// JAVA COMPARISON: Java has no object spread. You would use clone(), copy
// constructors, or builder patterns to achieve similar merging behavior.
// PLAYWRIGHT RELEVANCE: Playwright heavily uses object spread for merging
// browser launch options, test configuration overrides, and action options.
// ============================================================

console.log("--- Example 1: Cloning Objects ---");

const user = { name: "Alice", age: 30, role: "QA" };
const userClone = { ...user };

console.log("Original:", user);
console.log("Clone:   ", userClone);

// They are independent objects
userClone.age = 31;
console.log("After modifying clone's age:");
console.log("  Original age:", user.age);      // 30 — unchanged
console.log("  Clone age:   ", userClone.age); // 31

// Prove they are different references
console.log("  Same object?", user === userClone); // false

console.log("\n--- Example 2: Merging Objects (Last One Wins) ---");

const defaults = {
  timeout: 30000,
  headless: true,
  slowMo: 0,
  viewport: { width: 1280, height: 720 }
};

const userPrefs = {
  headless: false,
  slowMo: 100
};

// Properties from userPrefs override defaults where they overlap
const finalConfig = { ...defaults, ...userPrefs };
console.log("Defaults:", defaults);
console.log("User prefs:", userPrefs);
console.log("Merged config:", finalConfig);
// timeout: 30000 (from defaults), headless: false (overridden), slowMo: 100 (overridden)

// Order matters! The LAST spread wins for duplicate keys
const configA = { color: "red", size: 10 };
const configB = { color: "blue", weight: 5 };
console.log("\n{ ...A, ...B }:", { ...configA, ...configB }); // color: "blue"
console.log("{ ...B, ...A }:", { ...configB, ...configA }); // color: "red"

console.log("\n--- Example 3: Adding/Overriding Properties ---");

const baseTest = { browser: "chromium", retries: 0 };

// Add new properties and override existing ones inline
const ciTest = {
  ...baseTest,
  retries: 2,            // override
  reporter: "junit",     // new property
  workers: 4             // new property
};
console.log("Base test config:", baseTest);
console.log("CI test config:  ", ciTest);

// Conditionally add properties using spread with ternary
const isCI = true;
const testConfig = {
  ...baseTest,
  ...(isCI ? { retries: 2, workers: 4 } : {}),
  ...(isCI ? { reporter: "html" } : { reporter: "list" })
};
console.log("\nConditional CI config:", testConfig);

// Spread with computed property names
const fieldName = "email";
const withDynamic = { ...user, [fieldName]: "alice@test.com" };
console.log("With dynamic property:", withDynamic);

console.log("\n--- Example 4: Shallow Copy Caveat ---");

const original = {
  name: "Test Suite",
  settings: { retries: 3, parallel: true },
  tags: ["smoke", "regression"]
};

const cloned = { ...original };

// Modify a nested object in the clone
cloned.settings.retries = 0;
cloned.tags.push("e2e");

console.log("Original settings.retries:", original.settings.retries); // 0 — CHANGED!
console.log("Original tags:", original.tags); // includes "e2e" — CHANGED!
console.log("Spread is SHALLOW — nested objects and arrays are shared references.");

// To deep-clone, use structuredClone (built-in since Node 17)
const deepCloned = structuredClone(original);
deepCloned.settings.retries = 99;
deepCloned.tags.push("deep");
console.log("\nAfter structuredClone modification:");
console.log("  Original retries:", original.settings.retries); // 0 — NOT changed
console.log("  Deep clone retries:", deepCloned.settings.retries); // 99

console.log("\n--- Example 5: Playwright Connection ---");

// Pattern 1: Merging browser launch options
const defaultLaunchOptions = {
  headless: true,
  timeout: 30000,
  args: ["--no-sandbox"]
};

const debugLaunchOptions = {
  ...defaultLaunchOptions,
  headless: false,
  slowMo: 500,
  devtools: true
};
console.log("Default launch:", defaultLaunchOptions);
console.log("Debug launch:  ", debugLaunchOptions);

// Pattern 2: Page action options with overrides
function simulateClick(selector, options = {}) {
  const defaultOptions = {
    button: "left",
    clickCount: 1,
    delay: 0,
    force: false
  };
  const finalOptions = { ...defaultOptions, ...options };
  console.log(`  Clicking "${selector}" with:`, finalOptions);
  return finalOptions;
}

console.log("\nSimulated click actions:");
simulateClick("#login-btn");
simulateClick("#submit", { delay: 100, force: true });
simulateClick("#menu", { button: "right", clickCount: 2 });

// Pattern 3: Test fixture/config composition
const baseConfig = {
  baseURL: "http://localhost:3000",
  browserName: "chromium",
  screenshot: "off",
  trace: "off"
};

const envConfigs = {
  ci: { screenshot: "on-failure", trace: "retain-on-failure", workers: 4 },
  debug: { screenshot: "on", trace: "on", workers: 1 },
  local: { workers: 2 }
};

const environment = "ci";
const resolvedConfig = { ...baseConfig, ...envConfigs[environment] };
console.log(`\nResolved config for "${environment}":`, resolvedConfig);

// === KEY TAKEAWAYS ===
// 1. {...obj} creates a shallow clone — nested objects/arrays are still shared references.
// 2. When merging, the LAST spread wins for duplicate property names.
// 3. The config-merge pattern ({...defaults, ...overrides}) is extremely common in Playwright.
// 4. You can conditionally spread: {...(condition ? {key: val} : {})}
// 5. For true deep copies, use structuredClone() instead of spread.
