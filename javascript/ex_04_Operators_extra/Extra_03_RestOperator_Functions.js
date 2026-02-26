// Extra_03_RestOperator_Functions.js
// Topic: Rest Operator (...) in Functions and Destructuring - Part 3 of 6
// Extends: ex_04_Operators
//
// CONCEPT: The rest operator (...) collects multiple elements into a single
// array or object. It looks identical to spread (...) but works in reverse:
// spread EXPANDS, rest COLLECTS. Rest is used in function parameters and
// destructuring assignments.
// JAVA COMPARISON: Rest parameters replace Java's varargs (int... args).
// Like varargs, rest must be the last parameter, and it becomes an array.
// PLAYWRIGHT RELEVANCE: Many Playwright helper functions accept variable
// arguments. Understanding rest helps you write flexible test utilities.
// ============================================================

console.log("--- Example 1: Rest Parameters in Functions ---");

// Rest collects ALL arguments into an array
function sum(...numbers) {
  console.log("  Received:", numbers, `(type: ${Array.isArray(numbers) ? "Array" : typeof numbers})`);
  return numbers.reduce((total, n) => total + n, 0);
}

console.log("sum(1, 2, 3):", sum(1, 2, 3));
console.log("sum(10, 20):", sum(10, 20));
console.log("sum(5):", sum(5));
console.log("sum():", sum()); // 0 — empty array, reduce returns initial value

// Rest with leading named parameters
function greetAll(greeting, ...names) {
  return names.map(name => `${greeting}, ${name}!`);
}

console.log("\ngreetAll('Hello', 'Alice', 'Bob', 'Charlie'):");
console.log(" ", greetAll("Hello", "Alice", "Bob", "Charlie"));

console.log("greetAll('Hi', 'Diana'):");
console.log(" ", greetAll("Hi", "Diana"));

// Rest must be LAST — this would be a syntax error:
// function bad(a, ...middle, b) {} // SyntaxError!

console.log("\n--- Example 2: Rest vs arguments Object ---");

// Old-school: the `arguments` object (NOT a real array, no .map/.filter)
function oldWay() {
  // arguments is array-like but not an Array
  console.log("  arguments:", arguments);
  console.log("  Is array?", Array.isArray(arguments)); // false
  // To use array methods, you'd need: Array.from(arguments)
  const arr = Array.from(arguments);
  console.log("  Converted:", arr);
  return arr.join(" + ");
}
console.log("Old way: ", oldWay(1, 2, 3));

// Modern: rest params give you a real Array
function newWay(...args) {
  console.log("  args:", args);
  console.log("  Is array?", Array.isArray(args)); // true
  return args.join(" + ");
}
console.log("New way: ", newWay(1, 2, 3));

// Arrow functions do NOT have `arguments` — rest is the only option
const arrowSum = (...nums) => nums.reduce((a, b) => a + b, 0);
console.log("\nArrow with rest:", arrowSum(4, 5, 6));

console.log("\n--- Example 3: Rest in Array Destructuring ---");

const scores = [95, 87, 76, 68, 55, 42];

const [first, second, ...remaining] = scores;
console.log("First:", first);       // 95
console.log("Second:", second);     // 87
console.log("Rest:", remaining);    // [76, 68, 55, 42]

// Useful pattern: head and tail
const [head, ...tail] = [10, 20, 30, 40];
console.log("\nHead:", head);  // 10
console.log("Tail:", tail);   // [20, 30, 40]

// Skip elements with commas, then collect rest
const [, , thirdPlace, ...others] = scores;
console.log("\nThird place:", thirdPlace); // 76
console.log("Others:", others);            // [68, 55, 42]

// Rest with empty remainder
const [only] = [99];
const [a, ...empty] = [99];
console.log("\nSingle element, rest is empty:", empty); // []

console.log("\n--- Example 4: Rest in Object Destructuring ---");

const testResult = {
  testName: "Login Flow",
  status: "passed",
  duration: 3200,
  retries: 1,
  browser: "chromium",
  screenshot: "/shots/login.png"
};

// Extract specific properties, collect the rest
const { testName, status, ...metadata } = testResult;
console.log("Test:", testName);
console.log("Status:", status);
console.log("Metadata (rest):", metadata);
// metadata = { duration: 3200, retries: 1, browser: "chromium", screenshot: "..." }

// Practical pattern: removing properties from an object
const userWithPassword = {
  name: "Alice",
  email: "alice@test.com",
  password: "secret123",
  role: "admin"
};

const { password, ...safeUser } = userWithPassword;
console.log("\nOriginal (has password):", Object.keys(userWithPassword));
console.log("Safe user (no password):", safeUser);
// password is extracted and discarded, safeUser has everything else

console.log("\n--- Example 5: Playwright Connection ---");

// Pattern 1: Flexible test utility with rest params
function logTestStep(stepNumber, description, ...details) {
  console.log(`  Step ${stepNumber}: ${description}`);
  if (details.length > 0) {
    details.forEach(d => console.log(`    - ${d}`));
  }
}

console.log("Test: User Registration");
logTestStep(1, "Navigate to signup page");
logTestStep(2, "Fill form", "name=Alice", "email=alice@test.com", "password=***");
logTestStep(3, "Submit and verify", "check redirect", "check welcome message");

// Pattern 2: Config extraction with rest destructuring
function simulateLaunchBrowser(options = {}) {
  const { browserName, headless, ...extraOptions } = options;
  console.log(`\n  Launching: ${browserName || "chromium"}`);
  console.log(`  Headless: ${headless !== undefined ? headless : true}`);
  console.log("  Extra options:", extraOptions);
}

simulateLaunchBrowser({
  browserName: "firefox",
  headless: false,
  slowMo: 100,
  timeout: 60000,
  devtools: true
});

// Pattern 3: Wrapping a function — rest collects, spread passes through
function withRetry(fn, maxRetries = 3) {
  return function (...args) {           // REST: collect all arguments
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const result = fn(...args);       // SPREAD: pass them through
      if (result !== "fail") {
        console.log(`    Attempt ${attempt}: passed`);
        return result;
      }
      console.log(`    Attempt ${attempt}: failed, retrying...`);
    }
    return "all retries exhausted";
  };
}

let callCount = 0;
function flakyTest(url, selector) {
  callCount++;
  // Simulate: fails first 2 times, passes on 3rd
  if (callCount < 3) return "fail";
  return `Found "${selector}" at ${url}`;
}

console.log("\nFlaky test with retry wrapper:");
const reliableTest = withRetry(flakyTest, 5);
const result = reliableTest("http://example.com", "#login");
console.log("Result:", result);

// === KEY TAKEAWAYS ===
// 1. Rest (...) COLLECTS multiple values into an array — the opposite of spread.
// 2. In function params, rest must be the LAST parameter: function(a, b, ...rest).
// 3. In destructuring, rest collects remaining elements/properties: const [first, ...rest] = arr.
// 4. Object rest is great for extracting properties: const {unwanted, ...clean} = obj.
// 5. Rest + spread together enable powerful function wrapping patterns used in test frameworks.
