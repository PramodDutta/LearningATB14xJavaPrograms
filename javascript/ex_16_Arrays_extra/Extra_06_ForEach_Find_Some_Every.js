// Extra_06_ForEach_Find_Some_Every.js
// Topic: forEach, find, findIndex, some, every - Part 6 of 7
// Extends: ex_16_Arrays
//
// CONCEPT: These array methods each serve a specific purpose: forEach for side effects
// (logging, DOM updates), find/findIndex for locating the first match, some for checking
// if ANY element passes a test, and every for checking if ALL elements pass. Understanding
// when to use each one makes code cleaner and more intentional.
// JAVA COMPARISON: Java Streams: forEach -> .forEach(), find -> .findFirst(), some -> .anyMatch(),
// every -> .allMatch(). JavaScript array methods are called directly without creating a stream.
// PLAYWRIGHT RELEVANCE: Iterating over elements for actions, finding specific elements in
// collections, checking if any/all elements match expected conditions in assertions.
// ============================================================

console.log("=== SECTION 1: forEach() ===");

console.log("--- Example 1: Basic forEach ---");

const fruits = ["apple", "banana", "cherry", "date"];

// forEach executes a function for each element (for side effects)
fruits.forEach(fruit => {
    console.log(`  Processing: ${fruit}`);
});

// Full callback: (element, index, array)
console.log("\nWith index:");
fruits.forEach((fruit, index) => {
    console.log(`  ${index}: ${fruit}`);
});

// forEach ALWAYS returns undefined
const result = fruits.forEach(f => f.toUpperCase());
console.log("\nforEach return:", result);  // undefined


console.log("\n--- Example 2: forEach for Side Effects ---");

// Logging
const scores = [95, 87, 72, 91, 68];
let total = 0;
scores.forEach(score => {
    total += score;
});
console.log("Total (accumulated):", total);
console.log("Average:", (total / scores.length).toFixed(1));

// Building output
const lines = [];
scores.forEach((score, i) => {
    const grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "D";
    lines.push(`Student ${i + 1}: ${score} (${grade})`);
});
console.log("Report:");
lines.forEach(line => console.log(`  ${line}`));

// Simulating Playwright: performing actions on each element
const buttons = [
    { selector: "#btn1", text: "Save" },
    { selector: "#btn2", text: "Cancel" },
    { selector: "#btn3", text: "Delete" },
];

console.log("\nSimulated clicks:");
buttons.forEach(btn => {
    // await page.locator(btn.selector).click()
    console.log(`  Clicked: ${btn.text} (${btn.selector})`);
});


console.log("\n--- Example 3: forEach vs for...of ---");

const items = ["a", "b", "c", "d"];

// forEach: cannot break early, cannot use await directly
console.log("forEach:");
items.forEach(item => console.log(`  ${item}`));

// for...of: can break, can use continue, supports await
console.log("for...of:");
for (const item of items) {
    if (item === "c") break;  // can break!
    console.log(`  ${item}`);
}

// for...of with index (using entries)
console.log("for...of with index:");
for (const [index, item] of items.entries()) {
    console.log(`  ${index}: ${item}`);
}

// KEY: Use for...of when you need break/continue/await
// Use forEach for simple iteration without early exit


console.log("\n--- Example 4: forEach Gotchas ---");

// Cannot break out of forEach
console.log("forEach processes ALL elements (no break):");
[1, 2, 3, 4, 5].forEach(n => {
    if (n === 3) return; // 'return' only skips current iteration, doesn't break
    console.log(`  ${n}`);
});
// Output: 1, 2, 4, 5 (3 is skipped, but 4 and 5 still run)

// forEach with async functions: does NOT await each one
// BAD pattern (common mistake):
// items.forEach(async (item) => {
//     await someAsyncOperation(item);  // These all fire at once!
// });
// GOOD: Use for...of with await instead


console.log("\n=== SECTION 2: find() and findIndex() ===");

console.log("\n--- Example 5: find() - First Match ---");

const users = [
    { id: 1, name: "Alice", role: "admin", active: true },
    { id: 2, name: "Bob", role: "user", active: true },
    { id: 3, name: "Charlie", role: "user", active: false },
    { id: 4, name: "Diana", role: "admin", active: true },
    { id: 5, name: "Eve", role: "user", active: true },
];

// find returns the FIRST element that passes the test
const admin = users.find(u => u.role === "admin");
console.log("First admin:", admin);

const inactive = users.find(u => !u.active);
console.log("First inactive:", inactive);

// find returns undefined if no match
const superAdmin = users.find(u => u.role === "superadmin");
console.log("Super admin:", superAdmin);  // undefined

// Safe usage with optional chaining
console.log("Safe name:", users.find(u => u.role === "superadmin")?.name ?? "Not found");

// Find by ID (common pattern)
function findUserById(id) {
    return users.find(u => u.id === id);
}
console.log("User #3:", findUserById(3)?.name);
console.log("User #99:", findUserById(99)?.name ?? "Not found");


console.log("\n--- Example 6: findIndex() ---");

// findIndex returns the INDEX of the first matching element, or -1
const numbers = [10, 20, 30, 40, 50, 60];

const idx1 = numbers.findIndex(n => n > 25);
console.log("First > 25 at index:", idx1);  // 2 (value 30)

const idx2 = numbers.findIndex(n => n > 100);
console.log("First > 100 at index:", idx2);  // -1 (not found)

// findIndex vs indexOf
const arr = [5, 12, 8, 130, 44];
// indexOf: finds by VALUE (strict equality)
console.log("indexOf(8):", arr.indexOf(8));       // 2
// findIndex: finds by CONDITION
console.log("findIndex(>10):", arr.findIndex(n => n > 10));  // 1

// Practical: find and update
const products = [
    { id: 1, name: "Laptop", stock: 5 },
    { id: 2, name: "Mouse", stock: 0 },
    { id: 3, name: "Keyboard", stock: 12 },
];

const outOfStockIdx = products.findIndex(p => p.stock === 0);
if (outOfStockIdx !== -1) {
    console.log(`Out of stock: ${products[outOfStockIdx].name} at index ${outOfStockIdx}`);
}

// findLast and findLastIndex (ES2023)
const nums = [1, 2, 3, 4, 5, 4, 3, 2, 1];
const lastGt3 = nums.findLast(n => n > 3);
console.log("findLast > 3:", lastGt3);  // 4 (last occurrence)

const lastGt3Idx = nums.findLastIndex(n => n > 3);
console.log("findLastIndex > 3:", lastGt3Idx);  // 5


console.log("\n--- Example 7: find() vs filter() ---");

const testResults = [
    { name: "Login Test", status: "passed", duration: 1200 },
    { name: "Cart Test", status: "failed", duration: 3400 },
    { name: "Search Test", status: "passed", duration: 890 },
    { name: "Checkout", status: "failed", duration: 5200 },
    { name: "Profile", status: "passed", duration: 700 },
];

// find: first match only (stops searching after finding)
const firstFailed = testResults.find(t => t.status === "failed");
console.log("First failed (find):", firstFailed?.name);

// filter: all matches
const allFailed = testResults.filter(t => t.status === "failed");
console.log("All failed (filter):", allFailed.map(t => t.name));

// When to use which:
// - find: "Does user #5 exist?" "What's the first error?"
// - filter: "Show all failed tests" "List all active users"

// find is more efficient when you only need the first match
// because it stops iterating after finding it


console.log("\n=== SECTION 3: some() and every() ===");

console.log("\n--- Example 8: some() - Any Match ---");

// some() returns true if AT LEAST ONE element passes the test
const ages = [14, 17, 21, 16, 25, 13];

const hasAdult = ages.some(age => age >= 18);
console.log("Has adult?", hasAdult);  // true

const allTeens = ages.every(age => age >= 13 && age <= 19);
console.log("All teens?", allTeens);  // false (21 and 25 are not teens)

const hasNegative = ages.some(age => age < 0);
console.log("Has negative?", hasNegative);  // false

// some() short-circuits: stops as soon as it finds a truthy result
console.log("\nsome() short-circuit demonstration:");
[1, 2, 3, 4, 5].some(n => {
    console.log(`  Checking ${n}`);
    return n === 3;
});
// Only checks 1, 2, 3 — stops when it finds 3

// Practical: check if any test failed
const hasFailure = testResults.some(t => t.status === "failed");
console.log("\nAny failures?", hasFailure);

// Check if any element contains a substring
const messages = ["Everything is fine", "Warning: disk space low", "All good"];
const hasWarning = messages.some(msg => msg.includes("Warning"));
console.log("Has warning?", hasWarning);


console.log("\n--- Example 9: every() - All Match ---");

// every() returns true if ALL elements pass the test
const passingScores = [75, 82, 91, 68, 88];
const allPassing = passingScores.every(score => score >= 60);
console.log("All passing (>=60)?", allPassing);  // true

const allExcellent = passingScores.every(score => score >= 80);
console.log("All excellent (>=80)?", allExcellent);  // false

// every() short-circuits: stops as soon as it finds a falsy result
console.log("\nevery() short-circuit demonstration:");
[2, 4, 6, 7, 8].every(n => {
    console.log(`  Checking ${n}`);
    return n % 2 === 0;
});
// Checks 2, 4, 6, 7 — stops at 7 (odd)

// Empty array edge case
console.log("\nEmpty array some():", [].some(x => x > 0));    // false (vacuously)
console.log("Empty array every():", [].every(x => x > 0));  // true  (vacuously)
// This is mathematically correct but can be surprising!

// Practical: validate form data
const formFields = [
    { name: "email", value: "user@example.com", required: true },
    { name: "password", value: "secret123", required: true },
    { name: "nickname", value: "", required: false },
    { name: "name", value: "Alice", required: true },
];

const allRequiredFilled = formFields.every(field =>
    !field.required || field.value.trim().length > 0
);
console.log("All required filled?", allRequiredFilled);


console.log("\n--- Example 10: Combining some/every with Object Arrays ---");

const inventory = [
    { name: "Laptop", price: 999, stock: 5, category: "electronics" },
    { name: "Mouse", price: 25, stock: 0, category: "electronics" },
    { name: "Book", price: 15, stock: 20, category: "books" },
    { name: "Desk", price: 250, stock: 3, category: "furniture" },
    { name: "Pen", price: 2, stock: 100, category: "office" },
];

// Does every item cost more than $1?
console.log("All > $1?", inventory.every(item => item.price > 1));

// Is any item out of stock?
console.log("Any out of stock?", inventory.some(item => item.stock === 0));

// Are all electronics in stock?
const electronicsInStock = inventory
    .filter(item => item.category === "electronics")
    .every(item => item.stock > 0);
console.log("All electronics in stock?", electronicsInStock);

// Does any item cost more than $500?
console.log("Any > $500?", inventory.some(item => item.price > 500));

// Simulating Playwright assertions
console.log("\nPlaywright-style assertions:");

// Simulate: expect all items to be visible
const elementStates = [
    { selector: "#header", visible: true },
    { selector: "#nav", visible: true },
    { selector: "#content", visible: true },
    { selector: "#footer", visible: true },
];

const allVisible = elementStates.every(el => el.visible);
console.log(`  All visible? ${allVisible ? "PASS" : "FAIL"}`);

// Simulate: expect no error messages on page
const pageTexts = ["Welcome back!", "Your dashboard", "3 notifications"];
const hasError = pageTexts.some(text => /error|fail|exception/i.test(text));
console.log(`  No errors on page? ${!hasError ? "PASS" : "FAIL"}`);


console.log("\n--- Example 11: Practical Pattern Comparisons ---");

const data = [
    { name: "Test A", passed: true, duration: 500 },
    { name: "Test B", passed: false, duration: 1200 },
    { name: "Test C", passed: true, duration: 300 },
    { name: "Test D", passed: true, duration: 800 },
    { name: "Test E", passed: false, duration: 2000 },
];

// Which method to use?
// "Did all tests pass?" -> every
console.log("All passed?", data.every(t => t.passed));

// "Did any test fail?" -> some
console.log("Any failed?", data.some(t => !t.passed));

// "What was the first failure?" -> find
console.log("First failure:", data.find(t => !t.passed)?.name);

// "Which tests failed?" -> filter
console.log("Failed tests:", data.filter(t => !t.passed).map(t => t.name));

// "Log each test result" -> forEach
data.forEach(t => {
    // console.log(`  ${t.passed ? "PASS" : "FAIL"}: ${t.name}`);
});

// "Where is Test C?" -> findIndex
console.log("Test C index:", data.findIndex(t => t.name === "Test C"));

// "Get durations of passed tests" -> filter + map
console.log("Passed durations:", data.filter(t => t.passed).map(t => t.duration));

// Summary table
console.log("\n=== METHOD SUMMARY ===");
console.log("forEach(fn)     -> undefined     | Side effects: logging, mutations");
console.log("find(fn)        -> element|undef  | First element matching condition");
console.log("findIndex(fn)   -> number (-1)    | Index of first match");
console.log("findLast(fn)    -> element|undef  | Last element matching condition");
console.log("findLastIndex() -> number (-1)    | Index of last match");
console.log("some(fn)        -> boolean        | Does ANY element pass the test?");
console.log("every(fn)       -> boolean        | Do ALL elements pass the test?");


// === KEY TAKEAWAYS ===
// 1. forEach: for side effects only (logging, mutations). Returns undefined. Cannot break early.
// 2. find: returns FIRST element matching condition, or undefined. Stops after finding.
// 3. findIndex: returns INDEX of first match, or -1. Use when you need the position.
// 4. some: returns true if ANY element passes. Short-circuits on first truthy result.
// 5. every: returns true if ALL elements pass. Short-circuits on first falsy result.
// 6. Empty array: some() returns false, every() returns true (vacuous truth).
// 7. find vs filter: use find for "first match", filter for "all matches".
// 8. forEach vs for...of: use for...of when you need break, continue, or async/await.
