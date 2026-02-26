// Extra_01_Destructuring_Arrays.js
// Topic: Array Destructuring - Part 1 of 7
// Extends: ex_16_Arrays
//
// CONCEPT: Array destructuring lets you unpack values from arrays into distinct
// variables using a concise syntax. The position in the destructuring pattern corresponds
// to the position in the array. It supports skipping elements, default values, and the
// rest pattern (...rest) to collect remaining elements.
// JAVA COMPARISON: Java has no equivalent syntax. In Java, you must access each element
// individually: String first = arr[0]; String second = arr[1]; etc.
// PLAYWRIGHT RELEVANCE: Destructuring is used when working with allTextContents(),
// handling multiple return values from helper functions, and processing test data arrays.
// ============================================================

console.log("--- Example 1: Basic Array Destructuring ---");

// Without destructuring (Java-like approach)
const colors = ["red", "green", "blue"];
const first_old = colors[0];
const second_old = colors[1];
const third_old = colors[2];
console.log("Old way:", first_old, second_old, third_old);

// With destructuring
const [first, second, third] = colors;
console.log("Destructured:", first, second, third);

// Destructuring from any array-producing expression
const [a, b, c] = "hello".split("").slice(0, 3);
console.log("From split:", a, b, c);

const [x, y] = [10, 20];
console.log("From literal:", x, y);

// Destructuring fewer variables than elements
const numbers = [1, 2, 3, 4, 5];
const [n1, n2] = numbers;  // only takes first two
console.log("Partial:", n1, n2);  // 1, 2


console.log("\n--- Example 2: Skipping Elements with Commas ---");

const fullArray = ["January", "February", "March", "April", "May", "June"];

// Skip first element
const [, secondMonth] = fullArray;
console.log("Second month:", secondMonth);

// Skip first two
const [, , thirdMonth] = fullArray;
console.log("Third month:", thirdMonth);

// Skip in the middle
const [jan, , mar, , may] = fullArray;
console.log("Odd months:", jan, mar, may);

// Skip first and third
const [, feb, , apr] = fullArray;
console.log("Even months:", feb, apr);

// Practical: extracting from a CSV row
const csvRow = "Alice,30,Engineer,San Francisco,USA".split(",");
const [name, , job] = csvRow;  // skip age
console.log("Name and job:", name, job);


console.log("\n--- Example 3: Default Values ---");

// When the array doesn't have enough elements, variables get undefined
const short = [1, 2];
const [p, q, r] = short;
console.log("Without default:", p, q, r);  // 1, 2, undefined

// Default values provide fallbacks for missing elements
const [p2, q2, r2 = 0] = short;
console.log("With default:", p2, q2, r2);  // 1, 2, 0

// Multiple defaults
const [w1 = "N/A", w2 = "N/A", w3 = "N/A", w4 = "N/A"] = ["hello", "world"];
console.log("Multiple defaults:", w1, w2, w3, w4);

// Default only applies if value is undefined (NOT null, NOT 0, NOT "")
const [d1 = 10, d2 = 10, d3 = 10, d4 = 10] = [1, 0, null, undefined];
console.log("Default nuance:", d1, d2, d3, d4);
// Output: 1, 0, null, 10
// Only undefined triggers the default!

// Default with function call (only called if needed — lazy evaluation)
function getDefault() {
    console.log("  getDefault() was called!");
    return 42;
}
const [val1, val2 = getDefault()] = [100];
console.log("Lazy default:", val1, val2);
// getDefault() is called because val2 is undefined

const [val3, val4 = getDefault()] = [100, 200];
console.log("Skipped default:", val3, val4);
// getDefault() is NOT called because val4 has a value


console.log("\n--- Example 4: Rest Pattern (...rest) ---");

// Collect remaining elements into a new array
const fruits = ["apple", "banana", "cherry", "date", "elderberry"];

const [firstFruit, ...restFruits] = fruits;
console.log("First:", firstFruit);
console.log("Rest:", restFruits);

// Skip first, take second, collect rest
const [, secondFruit, ...otherFruits] = fruits;
console.log("Second:", secondFruit);
console.log("Others:", otherFruits);

// First two, then rest
const [f1, f2, ...remaining] = fruits;
console.log("First two:", f1, f2);
console.log("Remaining:", remaining);

// Rest must be the LAST element (this would be a syntax error):
// const [...rest, last] = fruits;  // SyntaxError!

// Rest with an empty remaining array
const twoItems = [1, 2];
const [item1, item2, ...empty] = twoItems;
console.log("Items:", item1, item2);
console.log("Empty rest:", empty);  // []
console.log("Is array?", Array.isArray(empty));  // true

// Practical: head and tail pattern (functional programming)
function head(arr) {
    const [first] = arr;
    return first;
}

function tail(arr) {
    const [, ...rest] = arr;
    return rest;
}

const nums = [10, 20, 30, 40, 50];
console.log("Head:", head(nums));  // 10
console.log("Tail:", tail(nums));  // [20, 30, 40, 50]


console.log("\n--- Example 5: Destructuring with let and Reassignment ---");

// Using let for mutable destructured variables
let [score1, score2, score3] = [85, 92, 78];
console.log("Original scores:", score1, score2, score3);

// Can reassign because we used let
score1 = 90;
console.log("Updated score1:", score1);

// Destructuring into already-declared variables (no let/const)
let alpha, beta, gamma;
[alpha, beta, gamma] = [1, 2, 3];
console.log("Assigned separately:", alpha, beta, gamma);

// IMPORTANT: When destructuring without let/const/var on its own line,
// wrap in parentheses if it starts the line (to avoid being parsed as a block)
let m, n;
([m, n] = [100, 200]);  // parentheses needed if on own line after semicolon
console.log("Parenthesized:", m, n);


console.log("\n--- Example 6: Destructuring Return Values from Functions ---");

// Functions that return arrays
function getMinMax(arr) {
    return [Math.min(...arr), Math.max(...arr)];
}

const [min, max] = getMinMax([3, 1, 4, 1, 5, 9, 2, 6]);
console.log("Min:", min, "Max:", max);

// Function returning status and data (like Go-style returns)
function fetchUser(id) {
    if (id <= 0) return [false, null, "Invalid ID"];
    return [true, { id, name: "Alice" }, null];
}

const [success, user, error] = fetchUser(1);
console.log("Success:", success, "User:", user, "Error:", error);

const [success2, user2, error2] = fetchUser(-1);
console.log("Success:", success2, "User:", user2, "Error:", error2);

// Simulating Playwright's allTextContents() usage
function getAllTextContents() {
    // Simulates await page.locator('.item').allTextContents()
    return ["Item 1 - $10.00", "Item 2 - $20.00", "Item 3 - $30.00"];
}

const [firstItem, secondItem, thirdItem] = getAllTextContents();
console.log("First item text:", firstItem);
console.log("Second item text:", secondItem);


console.log("\n--- Example 7: Destructuring Strings and Iterables ---");

// Strings are iterable, so destructuring works
const [char1, char2, char3, ...restChars] = "Hello";
console.log("String chars:", char1, char2, char3);
console.log("Rest chars:", restChars);

// Any iterable works with destructuring
// Sets
const mySet = new Set([10, 20, 30, 40]);
const [s1, s2] = mySet;
console.log("From Set:", s1, s2);

// Map entries
const myMap = new Map([["a", 1], ["b", 2], ["c", 3]]);
const [entry1, entry2] = myMap;
console.log("From Map:", entry1, entry2);
// Each entry is [key, value], so you can nest destructuring
const [[key1, value1], [key2, value2]] = myMap;
console.log("Map destructured:", key1, value1, key2, value2);

// Generator function
function* range(start, end) {
    for (let i = start; i <= end; i++) yield i;
}
const [r1, r2, r3] = range(10, 15);
console.log("From generator:", r1, r2, r3);


console.log("\n--- Example 8: Common Patterns and Pitfalls ---");

// Pattern: Ignoring a return value
function getCoordinates() {
    return [42.3601, -71.0589, 15]; // lat, lng, altitude
}
const [lat, lng] = getCoordinates(); // ignore altitude
console.log("Coordinates:", lat, lng);

// Pattern: Getting length and first/last
const items = ["a", "b", "c", "d", "e"];
const { length } = items;  // Object destructuring on array (arrays have length property)
const [firstEl] = items;
const lastEl = items[items.length - 1];
console.log(`Array has ${length} items, first: ${firstEl}, last: ${lastEl}`);

// Pitfall: Destructuring null or undefined throws TypeError
try {
    const [bad1, bad2] = null;  // TypeError!
} catch (e) {
    console.log("Null destructuring error:", e.message);
}

try {
    const [bad1, bad2] = undefined;  // TypeError!
} catch (e) {
    console.log("Undefined destructuring error:", e.message);
}

// Safe pattern: use default empty array
function safeDestructure(maybeArray) {
    const [a = "N/A", b = "N/A"] = maybeArray || [];
    return { a, b };
}
console.log("Safe (null):", safeDestructure(null));
console.log("Safe (array):", safeDestructure(["hello"]));
console.log("Safe (full):", safeDestructure(["hello", "world"]));


// === KEY TAKEAWAYS ===
// 1. const [a, b, c] = array — unpack array elements into named variables by position
// 2. Skip elements with commas: [, , third] gets the third element
// 3. Default values: [a = 1, b = 2] — only triggered for undefined values (not null or 0)
// 4. Rest pattern: [first, ...rest] — collects remaining elements into a new array
// 5. Works with any iterable: arrays, strings, Sets, Maps, generators
// 6. Great for function return values: const [min, max] = getMinMax(arr)
// 7. Destructuring null/undefined throws TypeError — use || [] as a safety pattern
// 8. Java has nothing like this — it is a significant JavaScript productivity feature
