// Extra_01_SpreadOperator_Arrays.js
// Topic: Spread Operator (...) with Arrays - Part 1 of 6
// Extends: ex_04_Operators
//
// CONCEPT: The spread operator (...) "unpacks" an array into individual elements.
// It lets you copy arrays, merge them, and pass array elements as separate function
// arguments — all with a concise, readable syntax.
// JAVA COMPARISON: Java has no spread operator. You would use Arrays.copyOf(),
// Collections.addAll(), or manually loop to achieve similar results.
// PLAYWRIGHT RELEVANCE: When you call `await locator.all()`, you get an array of
// element handles. Spread lets you merge, copy, or transform those results easily.
// ============================================================

console.log("--- Example 1: Copying Arrays with Spread ---");

const originalFruits = ["apple", "banana", "cherry"];
const copiedFruits = [...originalFruits];

console.log("Original:", originalFruits);
console.log("Copy:    ", copiedFruits);

// Prove they are independent — modifying one does NOT affect the other
copiedFruits.push("dragonfruit");
console.log("After pushing to copy:");
console.log("  Original:", originalFruits);  // still 3 items
console.log("  Copy:    ", copiedFruits);    // now 4 items

// Contrast with reference assignment (NO copy — same array!)
const referenceOnly = originalFruits;
referenceOnly.push("elderberry");
console.log("\nAfter pushing via reference assignment:");
console.log("  Original:  ", originalFruits);  // ALSO has elderberry!
console.log("  Reference: ", referenceOnly);   // same object
console.log("  Are they ===?", originalFruits === referenceOnly); // true
console.log("  Is spread copy ===?", originalFruits === copiedFruits); // false

console.log("\n--- Example 2: Merging Arrays ---");

const team1 = ["Alice", "Bob"];
const team2 = ["Charlie", "Diana"];
const team3 = ["Eve"];

// Merge all teams into one
const allMembers = [...team1, ...team2, ...team3];
console.log("All members:", allMembers);

// You can insert extra values in between
const withLeader = ["Zara (Lead)", ...team1, ...team2];
console.log("With leader:", withLeader);

// Prepend and append
const bookended = ["START", ...team1, "END"];
console.log("Bookended:", bookended);

console.log("\n--- Example 3: Spread as Function Arguments ---");

const numbers = [5, 12, 3, 8, 21, 1];

// Math.max expects individual args, not an array
// Math.max([5, 12, 3]) would return NaN
// Spread unpacks the array into: Math.max(5, 12, 3, 8, 21, 1)
const maxVal = Math.max(...numbers);
const minVal = Math.min(...numbers);
console.log("Numbers:", numbers);
console.log("Max:", maxVal);
console.log("Min:", minVal);

// Another example: console.log with spread
const parts = ["Hello", "from", "spread"];
console.log("Spread into console.log:", ...parts);  // prints each as separate arg

function addThree(a, b, c) {
  return a + b + c;
}
const vals = [10, 20, 30];
console.log("Sum of [10,20,30]:", addThree(...vals)); // 60

console.log("\n--- Example 4: Shallow Copy Behavior (Important!) ---");

// Spread only does a SHALLOW copy — nested objects are still shared
const users = [
  { name: "Alice", score: 90 },
  { name: "Bob", score: 85 }
];

const usersCopy = [...users];

// Modify a nested object in the copy
usersCopy[0].score = 100;

console.log("Original users[0].score:", users[0].score);     // 100 — CHANGED!
console.log("Copy users[0].score:", usersCopy[0].score);       // 100
console.log("Nested objects are shared references (shallow copy).");

// But adding/removing from the copy does NOT affect the original array itself
usersCopy.push({ name: "Charlie", score: 70 });
console.log("Original length:", users.length);   // 2
console.log("Copy length:", usersCopy.length);     // 3

console.log("\n--- Example 5: Playwright Connection ---");

// Simulating Playwright's locator.all() pattern
// In real Playwright: const items = await page.locator('.item').all();

// Simulate locator results
const locatorResults = [
  { text: "Login Button", visible: true },
  { text: "Submit Button", visible: true },
  { text: "Cancel Button", visible: false }
];

// Spread into a new array for manipulation without affecting the original
const allButtons = [...locatorResults];
console.log("All buttons found:", allButtons.length);

// Merge results from multiple locators
const navLinks = [
  { text: "Home Link", visible: true },
  { text: "About Link", visible: true }
];

const allElements = [...locatorResults, ...navLinks];
console.log("Combined elements from two locators:", allElements.length);
allElements.forEach((el, i) => {
  console.log(`  [${i}] ${el.text} (visible: ${el.visible})`);
});

// Spread with filter for visible-only elements
const visibleOnly = [...allElements].filter(el => el.visible);
console.log("Visible elements:", visibleOnly.length);

// Deduplication pattern using Set (works with primitives)
const tags = ["smoke", "regression", "smoke", "e2e", "regression"];
const uniqueTags = [...new Set(tags)];
console.log("\nTest tags (raw):", tags);
console.log("Test tags (unique):", uniqueTags);

// === KEY TAKEAWAYS ===
// 1. [...arr] creates a SHALLOW copy — a new array, but nested objects are shared.
// 2. [...a, ...b] merges arrays cleanly — no need for concat() or loops.
// 3. fn(...arr) unpacks array elements as individual function arguments.
// 4. Reference assignment (const b = a) does NOT copy — both variables point to the same array.
// 5. In Playwright, spread is handy for combining and transforming locator.all() results.
