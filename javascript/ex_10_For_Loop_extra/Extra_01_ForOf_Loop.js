// Extra_01_ForOf_Loop.js
// Topic: for...of Loop — Iterating Values - Part 1 of 4
// Extends: ex_10_For_Loop
//
// CONCEPT: The for...of loop iterates over the VALUES of any iterable object:
// arrays, strings, Maps, Sets, and any object implementing the iterator protocol.
// It is the cleanest way to loop when you need values but not indices, and it
// supports break, continue, and return — unlike forEach.
// JAVA COMPARISON: Directly equivalent to Java's enhanced for-each loop:
// for (String s : list) { ... }. Same syntax philosophy, same use cases.
// PLAYWRIGHT RELEVANCE: After calling await locator.all(), you get an array
// of element handles. for...of is the idiomatic way to iterate over them.
// ============================================================

console.log("--- Example 1: for...of with Arrays ---");

const browsers = ["chromium", "firefox", "webkit"];

// Basic iteration — get each value directly
console.log("Supported browsers:");
for (const browser of browsers) {
  console.log(`  - ${browser}`);
}

// Compare three loop styles
const scores = [95, 87, 76, 68, 91];

// Style 1: Traditional for loop (index-based)
console.log("\nTraditional for loop:");
let sum1 = 0;
for (let i = 0; i < scores.length; i++) {
  sum1 += scores[i];
}
console.log("  Sum:", sum1);

// Style 2: forEach (callback-based, cannot break/continue)
console.log("forEach:");
let sum2 = 0;
scores.forEach(score => { sum2 += score; });
console.log("  Sum:", sum2);

// Style 3: for...of (value-based, CAN break/continue)
console.log("for...of:");
let sum3 = 0;
for (const score of scores) {
  sum3 += score;
}
console.log("  Sum:", sum3);

// Key advantage: break and continue work with for...of
console.log("\nFind first score below 80 (using break):");
for (const score of scores) {
  if (score < 80) {
    console.log("  Found:", score);
    break;  // Cannot do this with forEach!
  }
}

console.log("Skip scores below 80 (using continue):");
for (const score of scores) {
  if (score < 80) continue;
  console.log("  Passing score:", score);
}

console.log("\n--- Example 2: for...of with Strings ---");

const greeting = "Hello!";
console.log(`Characters in "${greeting}":`);
for (const char of greeting) {
  console.log(`  '${char}' (code: ${char.charCodeAt(0)})`);
}

// Handles Unicode emoji correctly (unlike traditional for loop)
const emoji = "Hi 👋🌍";
console.log(`\nCharacters in "${emoji}" (for...of handles multi-byte):`);
for (const char of emoji) {
  console.log(`  '${char}'`);
}

// Count character frequency
const sentence = "abracadabra";
const freq = {};
for (const ch of sentence) {
  freq[ch] = (freq[ch] ?? 0) + 1;
}
console.log(`\nCharacter frequency of "${sentence}":`, freq);

console.log("\n--- Example 3: for...of with Map and Set ---");

// Map: iterates as [key, value] pairs
const testStatus = new Map();
testStatus.set("login", "passed");
testStatus.set("checkout", "failed");
testStatus.set("search", "skipped");
testStatus.set("profile", "passed");

console.log("Test results (Map):");
for (const [testName, status] of testStatus) {
  const icon = status === "passed" ? "[PASS]" : status === "failed" ? "[FAIL]" : "[SKIP]";
  console.log(`  ${icon} ${testName}`);
}

// Count statuses
const statusCounts = {};
for (const [, status] of testStatus) {
  statusCounts[status] = (statusCounts[status] ?? 0) + 1;
}
console.log("Status counts:", statusCounts);

// Set: iterates unique values
const uniqueBrowsers = new Set(["chromium", "firefox", "webkit", "chromium", "firefox"]);
console.log("\nUnique browsers (Set):");
for (const browser of uniqueBrowsers) {
  console.log(`  - ${browser}`);
}

// Practical: collecting unique error messages
const errors = [
  "Timeout waiting for selector",
  "Element not visible",
  "Timeout waiting for selector",
  "Navigation failed",
  "Element not visible",
  "Timeout waiting for selector"
];
const uniqueErrors = new Set(errors);
console.log("\nUnique errors found:");
for (const error of uniqueErrors) {
  const count = errors.filter(e => e === error).length;
  console.log(`  "${error}" (occurred ${count}x)`);
}

console.log("\n--- Example 4: for...of with Generators and Custom Iterables ---");

// Generators produce iterable sequences
function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}

console.log("Range 0 to 5:");
for (const n of range(0, 5)) {
  process.stdout.write(`${n} `);
}
console.log();

console.log("Range 0 to 20, step 3:");
for (const n of range(0, 20, 3)) {
  process.stdout.write(`${n} `);
}
console.log();

// for...of with Array.from to create ranges
console.log("\nArray from range:", Array.from(range(1, 6)));

// Iterate over function arguments (using rest)
function printAll(...items) {
  for (const item of items) {
    console.log(`  > ${item}`);
  }
}
console.log("Variadic args:");
printAll("alpha", "beta", "gamma");

console.log("\n--- Example 5: Playwright Connection ---");

// Simulating Playwright's locator.all() pattern
// In real Playwright: for (const el of await page.locator('.item').all()) { ... }

const locatorResults = [
  { tagName: "button", textContent: "Login", isVisible: true, isEnabled: true },
  { tagName: "button", textContent: "Submit", isVisible: true, isEnabled: false },
  { tagName: "button", textContent: "Cancel", isVisible: false, isEnabled: true },
  { tagName: "button", textContent: "Delete", isVisible: true, isEnabled: true },
  { tagName: "button", textContent: "Save", isVisible: true, isEnabled: true }
];

// Pattern 1: Iterate and assert on each element
console.log("Checking all buttons:");
for (const element of locatorResults) {
  const status = element.isVisible && element.isEnabled ? "OK" : "ISSUE";
  console.log(`  [${status}] "${element.textContent}" (visible: ${element.isVisible}, enabled: ${element.isEnabled})`);
}

// Pattern 2: Find first matching element with break
console.log("\nFind first disabled button:");
for (const element of locatorResults) {
  if (!element.isEnabled) {
    console.log(`  Found: "${element.textContent}"`);
    break;
  }
}

// Pattern 3: Collect visible button texts
const visibleTexts = [];
for (const element of locatorResults) {
  if (element.isVisible) {
    visibleTexts.push(element.textContent);
  }
}
console.log("Visible button texts:", visibleTexts);

// Pattern 4: Sequential operations (async would use for...of with await)
console.log("\nSimulated sequential clicks (in real Playwright, these would be async):");
const clickableButtons = locatorResults.filter(el => el.isVisible && el.isEnabled);
for (const button of clickableButtons) {
  console.log(`  Clicking "${button.textContent}"...`);
  // In real Playwright: await button.click();
}

// Pattern 5: for...of with index when you need it (use .entries())
console.log("\nNumbered test steps:");
const steps = ["Navigate to login page", "Enter credentials", "Click submit", "Verify dashboard"];
for (const [index, step] of steps.entries()) {
  console.log(`  Step ${index + 1}: ${step}`);
}

// === KEY TAKEAWAYS ===
// 1. for...of iterates VALUES of any iterable (arrays, strings, Maps, Sets, generators).
// 2. Unlike forEach, for...of supports break, continue, and return.
// 3. Handles Unicode correctly when iterating strings.
// 4. Use destructuring with Maps: for (const [key, value] of map).
// 5. In Playwright, for...of is the standard pattern for iterating locator.all() results.
