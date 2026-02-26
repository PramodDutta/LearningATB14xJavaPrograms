// Extra_02_ForIn_Loop.js
// Topic: for...in Loop — Iterating Object Keys - Part 2 of 4
// Extends: ex_10_For_Loop
//
// CONCEPT: The for...in loop iterates over the ENUMERABLE PROPERTY NAMES (keys)
// of an object, including inherited properties from the prototype chain. It is
// designed for objects, NOT arrays. Using for...in on arrays can produce
// unexpected results because it iterates string keys and includes inherited props.
// JAVA COMPARISON: Similar to iterating over Map.keySet() in Java:
// for (String key : map.keySet()) { ... }
// PLAYWRIGHT RELEVANCE: Useful for iterating over configuration objects, test
// metadata, and environment variables where you need key-value access.
// ============================================================

console.log("--- Example 1: Basic for...in with Objects ---");

const testConfig = {
  browser: "chromium",
  headless: true,
  timeout: 30000,
  retries: 2,
  baseURL: "http://localhost:3000"
};

console.log("Test configuration:");
for (const key in testConfig) {
  console.log(`  ${key}: ${testConfig[key]}`);
}

// for...in gives you the KEY (always a string), you access the value with obj[key]
console.log("\nKey types:");
for (const key in testConfig) {
  console.log(`  key="${key}" (type: ${typeof key}), value=${testConfig[key]} (type: ${typeof testConfig[key]})`);
}

console.log("\n--- Example 2: Why NOT to Use for...in on Arrays ---");

const fruits = ["apple", "banana", "cherry"];

// Looks okay at first...
console.log("for...in on array (DO NOT DO THIS):");
for (const index in fruits) {
  console.log(`  index="${index}" (type: ${typeof index}), value="${fruits[index]}"`);
}
// Problem 1: Indices are STRINGS, not numbers
// Problem 2: Order is not guaranteed in all engines (though modern ones preserve it)
// Problem 3: Inherited prototype properties can leak through

// Demonstration of the prototype problem
const arr = [10, 20, 30];
// Simulate a badly-behaved library adding to Array.prototype
Array.prototype.customMethod = function () { return "oops"; };

console.log("\nfor...in with prototype pollution:");
for (const key in arr) {
  console.log(`  key="${key}", value="${arr[key]}"`);
  // This will include "customMethod" as a key!
}

// The correct approaches for arrays:
console.log("\nfor...of (correct for arrays):");
for (const value of arr) {
  console.log(`  value=${value}`);
}

console.log("\nTraditional for loop (also correct):");
for (let i = 0; i < arr.length; i++) {
  console.log(`  index=${i}, value=${arr[i]}`);
}

// Clean up our prototype pollution
delete Array.prototype.customMethod;

console.log("\n--- Example 3: hasOwnProperty Guard ---");

// for...in includes inherited properties — use hasOwnProperty to filter

function Animal(name) {
  this.name = name;
}
Animal.prototype.type = "animal";
Animal.prototype.breathes = true;

const dog = new Animal("Rex");
dog.breed = "Labrador";
dog.age = 5;

console.log("for...in WITHOUT guard (includes inherited):");
for (const key in dog) {
  console.log(`  ${key}: ${dog[key]}`);
}
// Shows: name, breed, age, type, breathes

console.log("\nfor...in WITH hasOwnProperty guard:");
for (const key in dog) {
  if (dog.hasOwnProperty(key)) {
    console.log(`  ${key}: ${dog[key]}`);
  }
}
// Shows only: name, breed, age

// Modern alternative: Object.hasOwn() (Node 16.9+)
console.log("\nUsing Object.hasOwn() (modern):");
for (const key in dog) {
  if (Object.hasOwn(dog, key)) {
    console.log(`  ${key}: ${dog[key]}`);
  }
}

console.log("\n--- Example 4: for...in vs Object.keys/values/entries ---");

const envVars = {
  NODE_ENV: "test",
  BASE_URL: "http://localhost:3000",
  CI: "true",
  HEADLESS: "true",
  WORKERS: "4"
};

// Approach 1: for...in
console.log("Approach 1 — for...in:");
for (const key in envVars) {
  console.log(`  ${key}=${envVars[key]}`);
}

// Approach 2: Object.keys() — returns own enumerable keys as an array
console.log("\nApproach 2 — Object.keys():");
console.log("  Keys:", Object.keys(envVars));

// Approach 3: Object.values() — returns own values as an array
console.log("\nApproach 3 — Object.values():");
console.log("  Values:", Object.values(envVars));

// Approach 4: Object.entries() — returns [key, value] pairs
console.log("\nApproach 4 — Object.entries():");
for (const [key, value] of Object.entries(envVars)) {
  console.log(`  ${key} = ${value}`);
}

// When to use which:
console.log("\nRecommendation:");
console.log("  - for...in: Only for plain objects when you need inherited props (rare)");
console.log("  - Object.keys(): When you need keys as an array (filter, map, etc.)");
console.log("  - Object.entries(): When you need both key and value (most common)");
console.log("  - for...of + entries: Best readability for object iteration");

// Practical comparison: counting property types
const mixed = { name: "Test", count: 5, active: true, tags: ["a", "b"], nested: { x: 1 } };

console.log("\nProperty type analysis:");
for (const key in mixed) {
  const value = mixed[key];
  const type = Array.isArray(value) ? "array" : typeof value;
  console.log(`  ${key}: ${type}`);
}

console.log("\n--- Example 5: Playwright Connection ---");

// Pattern 1: Iterating over test metadata / annotations
const testAnnotations = {
  "test.describe: Auth Suite": "smoke",
  "test: Login with valid creds": "P0",
  "test: Login with invalid creds": "P1",
  "test: Forgot password flow": "P2",
  "test: Session timeout": "regression"
};

console.log("Test annotations:");
for (const testName in testAnnotations) {
  const priority = testAnnotations[testName];
  console.log(`  [${priority.toUpperCase().padEnd(10)}] ${testName}`);
}

// Pattern 2: Environment variable validation
const requiredEnvVars = {
  BASE_URL: "string",
  TIMEOUT: "number",
  HEADLESS: "boolean",
  RETRIES: "number"
};

const actualEnv = {
  BASE_URL: "http://localhost:3000",
  TIMEOUT: "30000",
  HEADLESS: "true"
  // RETRIES is missing
};

console.log("\nEnvironment variable validation:");
for (const varName in requiredEnvVars) {
  const isSet = varName in actualEnv;
  const status = isSet ? "SET" : "MISSING";
  const value = isSet ? actualEnv[varName] : "N/A";
  console.log(`  [${status.padEnd(7)}] ${varName} = ${value}`);
}

// Pattern 3: Comparing two config objects
const defaultConfig = { headless: true, timeout: 30000, retries: 0, workers: 1 };
const ciConfig = { headless: true, timeout: 60000, retries: 2, workers: 4 };

console.log("\nConfig differences (default vs CI):");
for (const key in defaultConfig) {
  if (defaultConfig[key] !== ciConfig[key]) {
    console.log(`  ${key}: ${defaultConfig[key]} -> ${ciConfig[key]}`);
  }
}

// Pattern 4: Building query parameters from an object
const searchParams = {
  page: 1,
  limit: 25,
  sort: "date",
  order: "desc",
  filter: "active"
};

let queryString = "";
for (const key in searchParams) {
  if (queryString) queryString += "&";
  queryString += `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`;
}
console.log("\nQuery string:", queryString);
console.log("Full URL:", `https://api.example.com/tests?${queryString}`);

// === KEY TAKEAWAYS ===
// 1. for...in iterates KEYS (property names) of an object — always as strings.
// 2. NEVER use for...in on arrays — it includes prototype properties and gives string indices.
// 3. Use hasOwnProperty() or Object.hasOwn() to skip inherited properties.
// 4. Prefer Object.keys(), Object.values(), or Object.entries() over for...in in most cases.
// 5. for...in is still useful for simple object inspection and config comparison.
