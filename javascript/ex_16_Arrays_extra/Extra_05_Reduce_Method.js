// Extra_05_Reduce_Method.js
// Topic: Array .reduce() Method - Part 5 of 7
// Extends: ex_16_Arrays
//
// CONCEPT: The .reduce() method executes a reducer function on each element, accumulating
// a single result value. It is the most powerful array method — any array transformation
// can be expressed with reduce. The callback receives (accumulator, currentValue, index, array)
// and an optional initial value as the second argument to reduce().
// JAVA COMPARISON: Java Streams: list.stream().reduce(0, (acc, x) -> acc + x) or
// list.stream().collect(Collectors.groupingBy(...)). JavaScript's reduce is more flexible.
// PLAYWRIGHT RELEVANCE: Aggregating test results, calculating statistics from page data,
// building objects from arrays, processing scraped data into structured formats.
// ============================================================

console.log("--- Example 1: Sum and Basic Accumulation ---");

const numbers = [1, 2, 3, 4, 5];

// Sum with initial value (recommended)
const sum = numbers.reduce((accumulator, current) => accumulator + current, 0);
console.log("Sum:", sum);  // 15

// Sum without initial value (uses first element as initial)
const sum2 = numbers.reduce((acc, cur) => acc + cur);
console.log("Sum (no init):", sum2);  // 15

// IMPORTANT: Always provide initial value to avoid errors on empty arrays
try {
    const emptySum = [].reduce((acc, cur) => acc + cur);  // TypeError!
} catch (e) {
    console.log("Empty array error:", e.message);
}
const safeSum = [].reduce((acc, cur) => acc + cur, 0);  // 0 (safe!)
console.log("Safe empty sum:", safeSum);

// Product
const product = numbers.reduce((acc, cur) => acc * cur, 1);
console.log("Product:", product);  // 120

// Step-by-step trace of reduce
console.log("\nStep-by-step sum [1,2,3,4,5]:");
numbers.reduce((acc, cur, idx) => {
    const result = acc + cur;
    console.log(`  Step ${idx}: acc=${acc} + cur=${cur} = ${result}`);
    return result;
}, 0);


console.log("\n--- Example 2: Finding Max and Min ---");

const scores = [78, 95, 42, 88, 67, 91, 55];

// Max value
const max = scores.reduce((max, val) => val > max ? val : max, -Infinity);
console.log("Max:", max);

// Min value
const min = scores.reduce((min, val) => val < min ? val : min, Infinity);
console.log("Min:", min);

// Max with Math.max comparison
const max2 = scores.reduce((max, val) => Math.max(max, val), -Infinity);
console.log("Max (Math.max):", max2);

// Find object with max value
const students = [
    { name: "Alice", score: 95 },
    { name: "Bob", score: 88 },
    { name: "Charlie", score: 92 },
    { name: "Diana", score: 78 },
];

const topStudent = students.reduce((top, student) =>
    student.score > top.score ? student : top
);
console.log("Top student:", topStudent);


console.log("\n--- Example 3: Counting Occurrences ---");

const fruits = ["apple", "banana", "apple", "cherry", "banana", "apple", "date"];

const fruitCount = fruits.reduce((counts, fruit) => {
    counts[fruit] = (counts[fruit] || 0) + 1;
    return counts;
}, {});
console.log("Fruit counts:", fruitCount);

// Count characters in a string
const charCount = "hello world".split("").reduce((counts, char) => {
    counts[char] = (counts[char] || 0) + 1;
    return counts;
}, {});
console.log("Char counts:", charCount);

// Count by property
const testResults = [
    { name: "Test 1", status: "passed" },
    { name: "Test 2", status: "failed" },
    { name: "Test 3", status: "passed" },
    { name: "Test 4", status: "skipped" },
    { name: "Test 5", status: "passed" },
    { name: "Test 6", status: "failed" },
];

const statusCounts = testResults.reduce((counts, test) => {
    counts[test.status] = (counts[test.status] || 0) + 1;
    return counts;
}, {});
console.log("Status counts:", statusCounts);


console.log("\n--- Example 4: Grouping into Object ---");

const people = [
    { name: "Alice", department: "Engineering" },
    { name: "Bob", department: "Marketing" },
    { name: "Charlie", department: "Engineering" },
    { name: "Diana", department: "Marketing" },
    { name: "Eve", department: "Design" },
    { name: "Frank", department: "Engineering" },
];

const byDepartment = people.reduce((groups, person) => {
    const dept = person.department;
    if (!groups[dept]) {
        groups[dept] = [];
    }
    groups[dept].push(person.name);
    return groups;
}, {});
console.log("By department:", JSON.stringify(byDepartment, null, 2));

// Group test results by suite
const tests = [
    { name: "Login", suite: "auth", duration: 1200 },
    { name: "Logout", suite: "auth", duration: 800 },
    { name: "Add to Cart", suite: "cart", duration: 2100 },
    { name: "Search", suite: "search", duration: 900 },
    { name: "Checkout", suite: "cart", duration: 3400 },
];

const bySuite = tests.reduce((groups, test) => {
    if (!groups[test.suite]) {
        groups[test.suite] = { tests: [], totalDuration: 0 };
    }
    groups[test.suite].tests.push(test.name);
    groups[test.suite].totalDuration += test.duration;
    return groups;
}, {});
console.log("By suite:", JSON.stringify(bySuite, null, 2));


console.log("\n--- Example 5: Flattening Arrays ---");

// Flatten one level
const nested = [[1, 2], [3, 4], [5, 6]];
const flat = nested.reduce((acc, arr) => [...acc, ...arr], []);
console.log("Flattened:", flat);

// More efficient with concat
const flat2 = nested.reduce((acc, arr) => acc.concat(arr), []);
console.log("Flattened (concat):", flat2);

// Modern: Array.flat() (but reduce is educational)
console.log("Array.flat():", nested.flat());

// Deep flatten with reduce (recursive)
function deepFlatten(arr) {
    return arr.reduce((acc, val) =>
        Array.isArray(val) ? acc.concat(deepFlatten(val)) : acc.concat(val)
    , []);
}

const deepNested = [1, [2, [3, [4, [5]]]], [6, 7]];
console.log("Deep flatten:", deepFlatten(deepNested));
console.log("Array.flat(Infinity):", deepNested.flat(Infinity));

// Flatten and transform in one step
const orders = [
    { customer: "Alice", items: ["laptop", "mouse"] },
    { customer: "Bob", items: ["keyboard", "monitor", "mouse"] },
    { customer: "Charlie", items: ["laptop"] },
];

const allItems = orders.reduce((acc, order) => {
    const labeled = order.items.map(item => `${order.customer}: ${item}`);
    return acc.concat(labeled);
}, []);
console.log("All order items:", allItems);


console.log("\n--- Example 6: Building New Data Structures ---");

// Array to Object (lookup table)
const users = [
    { id: 1, name: "Alice", role: "admin" },
    { id: 2, name: "Bob", role: "user" },
    { id: 3, name: "Charlie", role: "user" },
    { id: 4, name: "Diana", role: "admin" },
];

const userById = users.reduce((lookup, user) => {
    lookup[user.id] = user;
    return lookup;
}, {});
console.log("User #3:", userById[3]);

// Array to Map
const userMap = users.reduce((map, user) => {
    map.set(user.id, user);
    return map;
}, new Map());
console.log("Map size:", userMap.size);
console.log("Map get(2):", userMap.get(2));

// Array of key-value pairs to object
const pairs = [["name", "Alice"], ["age", 30], ["city", "NYC"]];
const obj = pairs.reduce((acc, [key, val]) => {
    acc[key] = val;
    return acc;
}, {});
console.log("From pairs:", obj);

// Build a frequency-sorted array
const words = ["the", "quick", "brown", "fox", "the", "quick", "the"];
const wordFreq = words.reduce((freq, word) => {
    freq[word] = (freq[word] || 0) + 1;
    return freq;
}, {});
const sortedByFreq = Object.entries(wordFreq).sort((a, b) => b[1] - a[1]);
console.log("Word frequency:", sortedByFreq);


console.log("\n--- Example 7: Composing Functions with Reduce ---");

// Pipeline: apply a sequence of functions
const pipeline = [
    x => x + 1,
    x => x * 2,
    x => x - 3,
    x => x ** 2,
];

const result = pipeline.reduce((value, fn) => fn(value), 5);
console.log("Pipeline result:", result);
// Step by step: 5 -> 6 -> 12 -> 9 -> 81

// String transformation pipeline
const transforms = [
    s => s.trim(),
    s => s.toLowerCase(),
    s => s.replace(/\s+/g, "-"),
    s => s.replace(/[^a-z0-9-]/g, ""),
];

const slug = transforms.reduce((str, fn) => fn(str), "  Hello, World!  This Is A Test!!!  ");
console.log("Slugified:", slug);


console.log("\n--- Example 8: Calculating Statistics ---");

const dataset = [23, 45, 67, 12, 89, 34, 56, 78, 90, 11];

const stats = dataset.reduce((acc, val, idx, arr) => {
    acc.sum += val;
    acc.count++;
    acc.min = Math.min(acc.min, val);
    acc.max = Math.max(acc.max, val);

    // Calculate average on last iteration
    if (idx === arr.length - 1) {
        acc.avg = acc.sum / acc.count;
        // Calculate standard deviation
        const variance = arr.reduce((sum, v) => sum + (v - acc.avg) ** 2, 0) / acc.count;
        acc.stdDev = Math.sqrt(variance);
    }

    return acc;
}, { sum: 0, count: 0, min: Infinity, max: -Infinity, avg: 0, stdDev: 0 });

console.log("Statistics:");
console.log(`  Count: ${stats.count}`);
console.log(`  Sum: ${stats.sum}`);
console.log(`  Min: ${stats.min}`);
console.log(`  Max: ${stats.max}`);
console.log(`  Avg: ${stats.avg.toFixed(2)}`);
console.log(`  StdDev: ${stats.stdDev.toFixed(2)}`);

// Test result statistics
const durations = [1200, 800, 3400, 1100, 2100, 500, 5200, 900, 1800, 2500];
const testStats = durations.reduce((acc, d) => {
    acc.total += d;
    acc.count++;
    acc.min = Math.min(acc.min, d);
    acc.max = Math.max(acc.max, d);
    acc.avg = acc.total / acc.count;
    if (d > 3000) acc.slow++;
    return acc;
}, { total: 0, count: 0, min: Infinity, max: -Infinity, avg: 0, slow: 0 });

console.log("\nTest duration stats:");
console.log(`  Total: ${testStats.total}ms (${(testStats.total / 1000).toFixed(1)}s)`);
console.log(`  Avg: ${testStats.avg.toFixed(0)}ms`);
console.log(`  Min: ${testStats.min}ms, Max: ${testStats.max}ms`);
console.log(`  Slow tests (>3s): ${testStats.slow}`);


console.log("\n--- Example 9: Reduce vs Other Methods ---");

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// These can all be done with reduce, but specialized methods are clearer:
// map: cleaner for transformation
const mapped = data.reduce((acc, n) => [...acc, n * 2], []);  // works but use .map()
console.log("Reduce as map:", mapped);

// filter: cleaner for filtering
const filtered = data.reduce((acc, n) => n > 5 ? [...acc, n] : acc, []);  // works but use .filter()
console.log("Reduce as filter:", filtered);

// find: cleaner for finding first match
const found = data.reduce((result, n) => result !== null ? result : (n > 5 ? n : null), null);
console.log("Reduce as find:", found);

// RULE: Use reduce when you need to transform an array into a different shape
// (object, number, nested structure). Use map/filter/find when they fit.


console.log("\n--- Example 10: reduceRight() ---");

// reduceRight processes from right to left
const str = ["a", "b", "c", "d", "e"];

const leftToRight = str.reduce((acc, char) => acc + char, "");
console.log("Left to right:", leftToRight);  // "abcde"

const rightToLeft = str.reduceRight((acc, char) => acc + char, "");
console.log("Right to left:", rightToLeft);  // "edcba"

// Practical: compose functions (right to left, like math composition)
const compose = (...fns) => x => fns.reduceRight((val, fn) => fn(val), x);

const add1 = x => x + 1;
const double = x => x * 2;
const square = x => x ** 2;

const composed = compose(square, double, add1);  // square(double(add1(x)))
console.log("compose(square, double, add1)(3):", composed(3));
// 3 -> add1 -> 4 -> double -> 8 -> square -> 64


// === KEY TAKEAWAYS ===
// 1. .reduce((acc, cur, idx, arr) => newAcc, initialValue) — accumulates to a single result
// 2. ALWAYS provide initial value to avoid TypeError on empty arrays
// 3. Sum: arr.reduce((sum, n) => sum + n, 0)
// 4. Count occurrences: reduce into an object { item: count }
// 5. Group by: reduce into { groupKey: [items] }
// 6. Flatten: reduce with concat or spread
// 7. Build objects: reduce array into lookup tables, Maps, or other structures
// 8. Use map/filter/find when they fit; use reduce for everything else
// 9. reduceRight() processes from the last element to the first
// 10. Reduce is the most powerful array method — any transformation is possible
