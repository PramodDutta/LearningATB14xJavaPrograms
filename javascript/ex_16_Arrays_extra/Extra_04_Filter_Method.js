// Extra_04_Filter_Method.js
// Topic: Array .filter() Method - Part 4 of 7
// Extends: ex_16_Arrays
//
// CONCEPT: The .filter() method creates a NEW array containing only the elements that
// pass a test implemented by the callback function. The callback must return a truthy
// or falsy value. Elements where the callback returns truthy are included; falsy are excluded.
// JAVA COMPARISON: Java Streams: list.stream().filter(x -> x > 5).collect(Collectors.toList()).
// Same concept, but JavaScript's syntax is more concise without the stream/collect ceremony.
// PLAYWRIGHT RELEVANCE: Filtering visible elements, enabled buttons, elements matching
// conditions from collections, filtering test results, and processing page data.
// ============================================================

console.log("--- Example 1: Basic .filter() ---");

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Filter even numbers
const evens = numbers.filter(n => n % 2 === 0);
console.log("Original:", numbers);
console.log("Evens:", evens);

// Filter odd numbers
const odds = numbers.filter(n => n % 2 !== 0);
console.log("Odds:", odds);

// Filter greater than 5
const gtFive = numbers.filter(n => n > 5);
console.log("Greater than 5:", gtFive);

// Filter does NOT modify original
console.log("Original unchanged:", numbers);

// Callback signature: (element, index, array)
const firstHalf = numbers.filter((n, index) => index < 5);
console.log("First half (by index):", firstHalf);


console.log("\n--- Example 2: Filtering Strings ---");

const words = ["apple", "banana", "avocado", "blueberry", "cherry", "apricot", "date"];

// Filter by starting letter
const aWords = words.filter(w => w.startsWith("a"));
console.log("Starts with 'a':", aWords);

// Filter by length
const longWords = words.filter(w => w.length > 6);
console.log("Longer than 6:", longWords);

// Filter by containing a substring
const withBerry = words.filter(w => w.includes("berry"));
console.log("Contains 'berry':", withBerry);

// Filter by regex
const twoSyllable = words.filter(w => /^[a-z]{4,5}$/i.test(w));
console.log("4-5 letter words:", twoSyllable);

// Remove empty strings and whitespace-only strings
const messy = ["hello", "", "  ", "world", "", "foo", "   "];
const cleaned = messy.filter(s => s.trim().length > 0);
console.log("Cleaned:", cleaned);


console.log("\n--- Example 3: Filtering Objects ---");

const products = [
    { id: 1, name: "Laptop", price: 999, inStock: true, category: "Electronics" },
    { id: 2, name: "Book", price: 15, inStock: true, category: "Books" },
    { id: 3, name: "Phone", price: 699, inStock: false, category: "Electronics" },
    { id: 4, name: "Desk", price: 250, inStock: true, category: "Furniture" },
    { id: 5, name: "Mouse", price: 25, inStock: true, category: "Electronics" },
    { id: 6, name: "Chair", price: 350, inStock: false, category: "Furniture" },
    { id: 7, name: "Pen", price: 2, inStock: true, category: "Office" },
];

// Filter by boolean property
const available = products.filter(p => p.inStock);
console.log("In stock:", available.map(p => p.name));

// Filter by category
const electronics = products.filter(p => p.category === "Electronics");
console.log("Electronics:", electronics.map(p => `${p.name} ($${p.price})`));

// Filter by price range
const midRange = products.filter(p => p.price >= 20 && p.price <= 500);
console.log("$20-$500:", midRange.map(p => p.name));

// Multiple conditions
const cheapAvailable = products.filter(p => p.inStock && p.price < 100);
console.log("Cheap & available:", cheapAvailable.map(p => `${p.name} ($${p.price})`));

// Filter by multiple categories
const categories = ["Electronics", "Furniture"];
const selected = products.filter(p => categories.includes(p.category));
console.log("Electronics or Furniture:", selected.map(p => p.name));


console.log("\n--- Example 4: Removing Duplicates and Falsy Values ---");

// Remove duplicates (simple values)
const withDupes = [1, 2, 3, 2, 4, 1, 5, 3, 6];
const unique = withDupes.filter((val, index, arr) => arr.indexOf(val) === index);
console.log("With dupes:", withDupes);
console.log("Unique:", unique);

// Better way with Set (but filter shows the concept)
const uniqueSet = [...new Set(withDupes)];
console.log("Unique (Set):", uniqueSet);

// Remove duplicates from objects by a key
const usersWithDupes = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 1, name: "Alice (duplicate)" },
    { id: 3, name: "Charlie" },
    { id: 2, name: "Bob (duplicate)" },
];

const uniqueUsers = usersWithDupes.filter((user, index, arr) =>
    arr.findIndex(u => u.id === user.id) === index
);
console.log("Unique users:", uniqueUsers);

// Remove falsy values (null, undefined, 0, "", false, NaN)
const withFalsy = [0, 1, "", "hello", null, undefined, false, true, NaN, 42];
const truthy = withFalsy.filter(Boolean);
console.log("Truthy values:", truthy);

// Remove only null and undefined (keep 0, "", false)
const noNullish = withFalsy.filter(val => val !== null && val !== undefined);
console.log("No null/undefined:", noNullish);


console.log("\n--- Example 5: Filter with Index (Practical Uses) ---");

const items = ["a", "b", "c", "d", "e", "f", "g", "h"];

// Every other element (even indices)
const evenIndex = items.filter((_, i) => i % 2 === 0);
console.log("Even indices:", evenIndex);

// Odd indices
const oddIndex = items.filter((_, i) => i % 2 !== 0);
console.log("Odd indices:", oddIndex);

// First N elements (like .slice(0, n) but with filter)
const firstThree = items.filter((_, i) => i < 3);
console.log("First three:", firstThree);

// Last N elements
const lastThree = items.filter((_, i, arr) => i >= arr.length - 3);
console.log("Last three:", lastThree);

// Exclude specific indices
const excludeIndices = new Set([1, 3, 5]);
const filtered = items.filter((_, i) => !excludeIndices.has(i));
console.log("Exclude [1,3,5]:", filtered);


console.log("\n--- Example 6: Simulating Playwright Element Filtering ---");

// Simulating a collection of elements with properties
const elements = [
    { selector: "#btn-1", text: "Submit", visible: true, enabled: true, tag: "button" },
    { selector: "#btn-2", text: "Cancel", visible: true, enabled: true, tag: "button" },
    { selector: "#btn-3", text: "Delete", visible: false, enabled: true, tag: "button" },
    { selector: "#link-1", text: "Home", visible: true, enabled: true, tag: "a" },
    { selector: "#btn-4", text: "Save", visible: true, enabled: false, tag: "button" },
    { selector: "#input-1", text: "", visible: true, enabled: true, tag: "input" },
];

// Filter visible elements
const visibleElements = elements.filter(el => el.visible);
console.log("Visible:", visibleElements.map(el => el.text || el.selector));

// Filter enabled buttons
const enabledButtons = elements.filter(el =>
    el.tag === "button" && el.enabled && el.visible
);
console.log("Enabled visible buttons:", enabledButtons.map(el => el.text));

// Filter elements with text content
const withText = elements.filter(el => el.text.length > 0);
console.log("With text:", withText.map(el => `${el.selector}: "${el.text}"`));

// Simulate Playwright's locator.filter({ hasText: /pattern/ })
function filterByText(elements, pattern) {
    return elements.filter(el => pattern.test(el.text));
}

const submitLike = filterByText(elements, /submit|save/i);
console.log("Submit/Save buttons:", submitLike.map(el => el.text));


console.log("\n--- Example 7: Chaining filter() with Other Methods ---");

const testResults = [
    { name: "Login Test", status: "passed", duration: 1200, suite: "auth" },
    { name: "Logout Test", status: "passed", duration: 800, suite: "auth" },
    { name: "Cart Add", status: "failed", duration: 3400, suite: "cart" },
    { name: "Cart Remove", status: "passed", duration: 1100, suite: "cart" },
    { name: "Search", status: "passed", duration: 2100, suite: "search" },
    { name: "Search Filter", status: "skipped", duration: 0, suite: "search" },
    { name: "Checkout", status: "failed", duration: 5200, suite: "cart" },
];

// Filter + map: names of failed tests
const failedNames = testResults
    .filter(t => t.status === "failed")
    .map(t => t.name);
console.log("Failed tests:", failedNames);

// Filter + map + join: summary string
const passedSummary = testResults
    .filter(t => t.status === "passed")
    .map(t => `${t.name} (${t.duration}ms)`)
    .join(", ");
console.log("Passed:", passedSummary);

// Multiple filters chained
const slowPassed = testResults
    .filter(t => t.status === "passed")
    .filter(t => t.duration > 1000);
console.log("Slow passed:", slowPassed.map(t => t.name));

// Equivalent single filter (more efficient)
const slowPassed2 = testResults.filter(t => t.status === "passed" && t.duration > 1000);
console.log("Same result:", slowPassed2.map(t => t.name));

// Filter to count
const passCount = testResults.filter(t => t.status === "passed").length;
const failCount = testResults.filter(t => t.status === "failed").length;
const skipCount = testResults.filter(t => t.status === "skipped").length;
console.log(`Results: ${passCount} passed, ${failCount} failed, ${skipCount} skipped`);


console.log("\n--- Example 8: Partition Pattern (Split into Two Groups) ---");

// Split array into two groups based on condition
function partition(arr, predicate) {
    return arr.reduce(([pass, fail], item) => {
        return predicate(item)
            ? [[...pass, item], fail]
            : [pass, [...fail, item]];
    }, [[], []]);
}

const scores = [95, 42, 78, 88, 31, 67, 91, 55];
const [passing, failing] = partition(scores, score => score >= 60);
console.log("Passing:", passing);
console.log("Failing:", failing);

// Partition objects
const [activeUsers, inactiveUsers] = partition(
    [
        { name: "Alice", active: true },
        { name: "Bob", active: false },
        { name: "Charlie", active: true },
        { name: "Diana", active: false },
    ],
    user => user.active
);
console.log("Active:", activeUsers.map(u => u.name));
console.log("Inactive:", inactiveUsers.map(u => u.name));

// Simpler alternative using just filter
const allUsers = [
    { name: "Alice", active: true },
    { name: "Bob", active: false },
    { name: "Charlie", active: true },
];
const active = allUsers.filter(u => u.active);
const inactive = allUsers.filter(u => !u.active);
console.log("Active (filter):", active.map(u => u.name));
console.log("Inactive (filter):", inactive.map(u => u.name));


// === KEY TAKEAWAYS ===
// 1. .filter(callback) creates a NEW array with elements that pass the test (truthy return)
// 2. Callback: (element, index, array) => boolean — return truthy to include, falsy to exclude
// 3. Does NOT modify the original array — always returns a new one
// 4. Remove falsy values: arr.filter(Boolean) — elegant one-liner
// 5. Remove duplicates: arr.filter((v, i, a) => a.indexOf(v) === i) or [...new Set(arr)]
// 6. Chain with .map() for filter-then-transform: arr.filter(condition).map(transform)
// 7. Playwright: filter visible/enabled elements, elements matching text patterns
// 8. Use .filter().length for counting (or better, use .reduce() for efficiency)
