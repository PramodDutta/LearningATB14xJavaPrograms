// Extra_02_Destructuring_Nested.js
// Topic: Nested Destructuring and Swapping - Part 2 of 7
// Extends: ex_16_Arrays
//
// CONCEPT: Destructuring can be nested to extract values from arrays within arrays.
// A particularly elegant use is swapping variables without a temp variable. Destructuring
// also works in function parameters to directly unpack arguments passed to functions.
// JAVA COMPARISON: Java requires temporary variables for swapping (temp = a; a = b; b = temp).
// Nested array access in Java: int val = matrix[row][col] — more verbose than destructuring.
// PLAYWRIGHT RELEVANCE: Destructuring function returns (e.g., extracting page and context
// from browser.newContext/newPage), handling nested test data structures.
// ============================================================

console.log("--- Example 1: Nested Array Destructuring ---");

// Array within an array
const matrix = [[1, 2], [3, 4], [5, 6]];

// Extract first row
const [firstRow] = matrix;
console.log("First row:", firstRow);

// Extract elements from nested arrays
const [[a, b], [c, d], [e, f]] = matrix;
console.log("All elements:", a, b, c, d, e, f);

// Partial nested destructuring
const [[topLeft], , [, bottomRight]] = matrix;
console.log("Top-left:", topLeft, "Bottom-right:", bottomRight);

// Deeper nesting
const nested = [1, [2, [3, [4, 5]]]];
const [n1, [n2, [n3, [n4, n5]]]] = nested;
console.log("Deep nested:", n1, n2, n3, n4, n5);

// Mix of nesting levels
const data = ["Alice", [85, 92, 78], ["Math", "Science"]];
const [name, [score1, score2, score3], [subject1, subject2]] = data;
console.log(`${name}: ${subject1}=${score1}, ${subject2}=${score2}, Extra=${score3}`);


console.log("\n--- Example 2: Nested with Defaults and Rest ---");

// Defaults in nested destructuring
const partialMatrix = [[1, 2], [3]];
const [[p1, p2 = 0], [p3, p4 = 0]] = partialMatrix;
console.log("With defaults:", p1, p2, p3, p4);

// Rest in nested destructuring
const rows = [[1, 2, 3, 4], [5, 6, 7, 8]];
const [[firstVal, ...restVals], secondRow] = rows;
console.log("First val:", firstVal, "Rest:", restVals);
console.log("Second row:", secondRow);

// Complex: skip, default, rest combined
const complex = [["header1", "header2", "header3"], [10, 20], [30, 40, 50, 60]];
const [[, h2], [v1, v2 = 0, v3 = 0], [, ...tail]] = complex;
console.log("Header 2:", h2);
console.log("Values with defaults:", v1, v2, v3);
console.log("Tail of third row:", tail);


console.log("\n--- Example 3: Variable Swapping ---");

// Traditional swap (Java way) - needs temp variable
let x = "first";
let y = "second";
console.log("Before swap:", x, y);

let temp = x;
x = y;
y = temp;
console.log("After swap (temp):", x, y);

// Destructuring swap - no temp variable needed!
let a1 = "hello";
let b1 = "world";
console.log("\nBefore swap:", a1, b1);
[a1, b1] = [b1, a1];
console.log("After swap (destructuring):", a1, b1);

// Swap three variables in a rotation
let r = 1, s = 2, t = 3;
console.log("\nBefore rotation:", r, s, t);
[r, s, t] = [s, t, r];
console.log("After rotation:", r, s, t);

// Swap two array elements
const arr = [10, 20, 30, 40, 50];
console.log("\nBefore element swap:", arr);
[arr[1], arr[3]] = [arr[3], arr[1]];
console.log("After swapping [1] and [3]:", arr);

// Practical: bubble sort using destructuring swap
function bubbleSort(arr) {
    const sorted = [...arr]; // copy to avoid mutation
    for (let i = 0; i < sorted.length; i++) {
        for (let j = 0; j < sorted.length - i - 1; j++) {
            if (sorted[j] > sorted[j + 1]) {
                [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
            }
        }
    }
    return sorted;
}

const unsorted = [64, 34, 25, 12, 22, 11, 90];
console.log("\nUnsorted:", unsorted);
console.log("Sorted:", bubbleSort(unsorted));


console.log("\n--- Example 4: Destructuring Function Return Values ---");

// Return multiple values as an array, destructure at the call site
function divmod(dividend, divisor) {
    return [Math.floor(dividend / divisor), dividend % divisor];
}

const [quotient, remainder] = divmod(17, 5);
console.log("17 / 5 =", quotient, "remainder", remainder);

// Return coordinates
function getWindowSize() {
    // Simulating browser window dimensions
    return [1920, 1080];
}
const [width, height] = getWindowSize();
console.log("Window:", width, "x", height);

// Return with status
function parseNumber(str) {
    const num = Number(str);
    if (isNaN(num)) return [false, null, `"${str}" is not a number`];
    return [true, num, null];
}

const inputs = ["42", "3.14", "abc", "", "0"];
inputs.forEach(input => {
    const [ok, value, error] = parseNumber(input);
    if (ok) {
        console.log(`  "${input}" -> ${value}`);
    } else {
        console.log(`  "${input}" -> ERROR: ${error}`);
    }
});

// Practical: getting bounding box values (Playwright-like)
function getBoundingBox() {
    // Simulates await element.boundingBox()
    return { x: 100, y: 200, width: 300, height: 50 };
}

// Can mix object and array destructuring concepts
const { x: bx, y: by, width: bw, height: bh } = getBoundingBox();
console.log(`\nBounding box: (${bx}, ${by}) ${bw}x${bh}`);


console.log("\n--- Example 5: Destructuring in Function Parameters ---");

// Array destructuring directly in parameters
function sum([a, b, c]) {
    return a + b + c;
}
console.log("Sum:", sum([10, 20, 30]));

// With defaults in parameters
function greet([firstName = "Guest", lastName = ""] = []) {
    return `Hello, ${firstName} ${lastName}`.trim();
}
console.log("Greet full:", greet(["Alice", "Johnson"]));
console.log("Greet partial:", greet(["Bob"]));
console.log("Greet empty:", greet([]));
console.log("Greet none:", greet());  // uses default = []

// Nested destructuring in parameters
function processPoint([[x1, y1], [x2, y2]]) {
    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    return distance.toFixed(2);
}
console.log("Distance:", processPoint([[0, 0], [3, 4]]));

// Rest in parameters
function firstAndRest([first, ...rest]) {
    console.log(`  First: ${first}, Rest: [${rest}]`);
}
firstAndRest([10, 20, 30, 40]);
firstAndRest([42]);


console.log("\n--- Example 6: Destructuring in for...of Loops ---");

// Destructuring in iteration
const students = [
    ["Alice", 95],
    ["Bob", 87],
    ["Charlie", 92],
    ["Diana", 78],
];

console.log("Student grades:");
for (const [studentName, grade] of students) {
    const letter = grade >= 90 ? "A" : grade >= 80 ? "B" : "C";
    console.log(`  ${studentName}: ${grade} (${letter})`);
}

// Destructuring Map entries
const scores = new Map([
    ["Math", 92],
    ["Science", 88],
    ["English", 95],
]);

console.log("\nSubject scores:");
for (const [subject, score] of scores) {
    console.log(`  ${subject}: ${score}`);
}

// Destructuring with Array.entries() (get index and value)
const colors = ["red", "green", "blue", "yellow"];
console.log("\nColors with index:");
for (const [index, color] of colors.entries()) {
    console.log(`  ${index}: ${color}`);
}

// Nested destructuring in loops
const testResults = [
    ["Login Test", [true, 1200, "chromium"]],
    ["Cart Test", [false, 3400, "firefox"]],
    ["Search Test", [true, 890, "webkit"]],
];

console.log("\nTest results:");
for (const [testName, [passed, duration, browser]] of testResults) {
    console.log(`  ${testName}: ${passed ? "PASS" : "FAIL"} (${duration}ms on ${browser})`);
}


console.log("\n--- Example 7: Practical Patterns ---");

// Pattern: Extracting first/last from an array
const items = [10, 20, 30, 40, 50];
const [firstItem, , , , lastItem] = items;
console.log("First:", firstItem, "Last:", lastItem);

// Better way for last element (with known length)
// or just use items.at(-1)

// Pattern: Splitting a string and destructuring
const dateStr = "2024-01-15";
const [year, month, day] = dateStr.split("-");
console.log(`Year: ${year}, Month: ${month}, Day: ${day}`);

// Pattern: Destructuring regex match
const url = "https://example.com:8080/path";
const urlMatch = url.match(/^(https?):\/\/([^:\/]+)(?::(\d+))?(\/.*)?$/);
if (urlMatch) {
    const [, protocol, host, port = "80", path = "/"] = urlMatch;
    console.log(`Protocol: ${protocol}, Host: ${host}, Port: ${port}, Path: ${path}`);
}

// Pattern: Collecting pairs from flat array
const flat = [1, "a", 2, "b", 3, "c"];
const pairs = [];
for (let i = 0; i < flat.length; i += 2) {
    const [num, letter] = flat.slice(i, i + 2);
    pairs.push({ num, letter });
}
console.log("Pairs:", pairs);

// Pattern: Matrix transpose using destructuring
const original = [
    [1, 2, 3],
    [4, 5, 6],
];

const transposed = original[0].map((_, colIndex) =>
    original.map(row => row[colIndex])
);
console.log("\nOriginal matrix:");
original.forEach(row => console.log(" ", row));
console.log("Transposed:");
transposed.forEach(row => console.log(" ", row));


// === KEY TAKEAWAYS ===
// 1. Nested destructuring matches the shape: [[a, b], [c, d]] = [[1,2], [3,4]]
// 2. Variable swapping: [a, b] = [b, a] — no temp variable needed (impossible in Java)
// 3. Destructure function returns: const [ok, data, err] = myFunction()
// 4. Use in function parameters: function f([a, b, c]) {...} unpacks the array argument
// 5. Works in for...of loops: for (const [key, value] of map) {...}
// 6. Combine with defaults and rest: const [first, ...rest] = arr
// 7. Always guard against null/undefined when the source might be missing
// 8. Great for parsing: split a string, destructure regex matches, process CSV rows
