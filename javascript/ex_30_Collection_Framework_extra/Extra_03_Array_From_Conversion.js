// Extra_03_Array_From_Conversion.js
// Topic: Array.from and Array Conversion - Part 3 of 6
// Extends: ex_30_Collection_Framework
//
// CONCEPT: Array.from() creates arrays from any iterable or array-like object, with an
// optional mapping function. Array.of() creates arrays from arguments. These methods
// bridge the gap between different collection types and enable powerful data generation.
// JAVA COMPARISON: Similar to Java's List.of(), Arrays.asList(), or stream().toList().
// Array.from with mapper is like Java streams: IntStream.range(0,5).mapToObj(...).toList().
// PLAYWRIGHT RELEVANCE: Array.from is used to convert NodeList-like locator results into
// arrays, generate test data ranges, and transform query results for assertions.
// ============================================================

console.log("--- Example 1: Array.from(iterable) basics ---");

// From a string — each character becomes an element
const chars = Array.from("Hello");
console.log("  String -> Array:", chars);  // ["H", "e", "l", "l", "o"]

// From a Set
const uniqueSet = new Set([3, 1, 4, 1, 5, 9, 2, 6]);
const fromSet = Array.from(uniqueSet);
console.log("  Set -> Array:", fromSet);   // [3, 1, 4, 5, 9, 2, 6]

// From a Map
const myMap = new Map([["a", 1], ["b", 2], ["c", 3]]);
const fromMap = Array.from(myMap);
console.log("  Map -> Array:", fromMap);   // [["a",1], ["b",2], ["c",3]]

// From Map keys and values separately
const mapKeys = Array.from(myMap.keys());
const mapValues = Array.from(myMap.values());
console.log("  Map keys:", mapKeys);       // ["a", "b", "c"]
console.log("  Map values:", mapValues);   // [1, 2, 3]

// From a generator function result
function* fibonacci(n) {
    let a = 0, b = 1;
    for (let i = 0; i < n; i++) {
        yield a;
        [a, b] = [b, a + b];
    }
}
const fibs = Array.from(fibonacci(10));
console.log("  Fibonacci:", fibs);

console.log("\n--- Example 2: Array.from with mapping function ---");

// Array.from({length: N}, mapperFn) — generate arrays
// The mapper receives (element, index) — element is undefined for length-based

// Generate a range [0, 1, 2, 3, 4]
const range5 = Array.from({ length: 5 }, (_, i) => i);
console.log("  Range 0-4:", range5);

// Generate a range [1, 2, 3, ..., 10]
const range1to10 = Array.from({ length: 10 }, (_, i) => i + 1);
console.log("  Range 1-10:", range1to10);

// Custom range function
function range(start, end, step = 1) {
    const length = Math.ceil((end - start) / step);
    return Array.from({ length }, (_, i) => start + i * step);
}

console.log("  range(5, 15):", range(5, 15));
console.log("  range(0, 50, 10):", range(0, 50, 10));
console.log("  range(1, 10, 2):", range(1, 10, 2));

// Generate objects
const testUsers = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    name: `User_${i + 1}`,
    email: `user${i + 1}@test.com`,
    active: i % 2 === 0,
}));
console.log("\n  Generated users:");
for (const user of testUsers) {
    console.log(`    ${user.id}: ${user.name} (${user.email}) active=${user.active}`);
}

// Generate random data
const randomScores = Array.from({ length: 8 }, () =>
    Math.floor(Math.random() * 100) + 1
);
console.log("\n  Random scores:", randomScores);

// Transform while converting
const names = Array.from(["alice", "bob", "charlie"], name =>
    name.charAt(0).toUpperCase() + name.slice(1)
);
console.log("  Capitalized:", names);

console.log("\n--- Example 3: Array.of() and edge cases ---");

// Array.of() — creates array from arguments (fixes Array constructor oddity)
console.log("  Array(3):", Array(3));           // [ <3 empty items> ] — creates holes!
console.log("  Array.of(3):", Array.of(3));     // [3] — creates array with value 3

console.log("  Array(1,2,3):", Array(1, 2, 3));       // [1, 2, 3]
console.log("  Array.of(1,2,3):", Array.of(1, 2, 3)); // [1, 2, 3]

// Array.of is useful when you don't know if the argument is a number
function ensureArray(value) {
    if (Array.isArray(value)) return value;
    return Array.of(value);
}
console.log("\n  ensureArray(5):", ensureArray(5));           // [5]
console.log("  ensureArray([1,2]):", ensureArray([1, 2]));   // [1, 2]
console.log("  ensureArray('hello'):", ensureArray("hello")); // ["hello"]

console.log("\n--- Example 4: Converting array-like objects ---");

// Array-like objects have .length and numeric indices but aren't arrays
const arrayLike = {
    0: "first",
    1: "second",
    2: "third",
    length: 3,
};

console.log("  Is array?", Array.isArray(arrayLike));  // false
const converted = Array.from(arrayLike);
console.log("  Converted:", converted);
console.log("  Is array now?", Array.isArray(converted)); // true

// Simulating NodeList conversion (Playwright context)
// In browsers: const elements = document.querySelectorAll('.item');
// elements is a NodeList (array-like) — must convert to use .map(), .filter()
const simulatedNodeList = {
    0: { textContent: "Item 1", className: "item active" },
    1: { textContent: "Item 2", className: "item" },
    2: { textContent: "Item 3", className: "item active" },
    3: { textContent: "Item 4", className: "item" },
    length: 4,
};

const elements = Array.from(simulatedNodeList);
console.log("\n  Simulated NodeList conversion:");
console.log("  All items:", elements.map(el => el.textContent));
console.log("  Active items:", elements
    .filter(el => el.className.includes("active"))
    .map(el => el.textContent)
);

// Converting arguments object (old pattern — rest params preferred now)
function oldStyleSum() {
    const args = Array.from(arguments); // arguments is array-like
    return args.reduce((sum, n) => sum + n, 0);
}
console.log("\n  Sum from arguments:", oldStyleSum(1, 2, 3, 4, 5));

// Modern equivalent with rest params
const modernSum = (...nums) => nums.reduce((sum, n) => sum + n, 0);
console.log("  Sum from rest params:", modernSum(1, 2, 3, 4, 5));

console.log("\n--- Example 5: Practical generation patterns ---");

// Generate a 2D grid
const grid = Array.from({ length: 3 }, (_, row) =>
    Array.from({ length: 4 }, (_, col) => `${row},${col}`)
);
console.log("  3x4 Grid:");
for (const row of grid) {
    console.log(`    [${row.join("  ")}]`);
}

// Generate alphabet
const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
);
console.log("\n  Alphabet:", alphabet.join(" "));

// Generate date range
function dateRange(startStr, days) {
    const start = new Date(startStr);
    return Array.from({ length: days }, (_, i) => {
        const d = new Date(start);
        d.setDate(d.getDate() + i);
        return d.toISOString().split("T")[0];
    });
}
console.log("\n  Date range:", dateRange("2024-01-01", 7));

// Generate test matrix
const browsers = ["chromium", "firefox", "webkit"];
const viewports = ["desktop", "mobile"];
const testMatrix = Array.from(
    { length: browsers.length * viewports.length },
    (_, i) => ({
        browser: browsers[Math.floor(i / viewports.length)],
        viewport: viewports[i % viewports.length],
        id: `test_${i + 1}`,
    })
);
console.log("\n  Test matrix:");
for (const combo of testMatrix) {
    console.log(`    ${combo.id}: ${combo.browser} @ ${combo.viewport}`);
}

// Generate mock API pages
function generatePaginatedData(total, pageSize) {
    const pages = Math.ceil(total / pageSize);
    return Array.from({ length: pages }, (_, pageIdx) => ({
        page: pageIdx + 1,
        data: Array.from(
            { length: Math.min(pageSize, total - pageIdx * pageSize) },
            (_, itemIdx) => ({
                id: pageIdx * pageSize + itemIdx + 1,
                name: `Item ${pageIdx * pageSize + itemIdx + 1}`,
            })
        ),
        hasNext: pageIdx < pages - 1,
    }));
}

const paginated = generatePaginatedData(7, 3);
console.log("\n  Paginated data:");
for (const page of paginated) {
    console.log(`    Page ${page.page}: [${page.data.map(d => d.name).join(", ")}] hasNext=${page.hasNext}`);
}

// === KEY TAKEAWAYS ===
// 1. Array.from(iterable) converts Set, Map, string, generator to array
// 2. Array.from({length: N}, (_, i) => ...) generates arrays — the i is the index
// 3. Array.of(1,2,3) creates [1,2,3] — safer than Array constructor for single numbers
// 4. Array.from(arrayLike) converts objects with .length property to real arrays
// 5. Use Array.from for NodeList conversion in browser/Playwright context
// 6. Combine with mapping function for one-step convert-and-transform
// 7. Perfect for generating test data: ranges, grids, date ranges, test matrices
// 8. Java equivalent: IntStream.range().mapToObj().toList() or List.of()
