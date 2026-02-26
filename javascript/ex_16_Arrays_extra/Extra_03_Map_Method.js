// Extra_03_Map_Method.js
// Topic: Array .map() Method - Part 3 of 7
// Extends: ex_16_Arrays
//
// CONCEPT: The .map() method creates a NEW array by applying a transformation function
// to every element of the original array. It does NOT modify the original array. The
// callback receives (element, index, array) and must return the transformed value.
// JAVA COMPARISON: Java Streams: list.stream().map(x -> x * 2).collect(Collectors.toList()).
// JavaScript's .map() is more concise and doesn't require stream/collect boilerplate.
// PLAYWRIGHT RELEVANCE: Processing results from allTextContents(), allInnerTexts(),
// transforming locator results, preparing test data, and formatting assertion messages.
// ============================================================

console.log("--- Example 1: Basic .map() ---");

// Transform each element
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2);
console.log("Original:", numbers);
console.log("Doubled:", doubled);

const squared = numbers.map(n => n ** 2);
console.log("Squared:", squared);

// Map does NOT modify the original
console.log("Original unchanged:", numbers);

// Full callback signature: (element, index, array)
const indexed = numbers.map((num, index) => `[${index}]: ${num}`);
console.log("With index:", indexed);


console.log("\n--- Example 2: Transforming Strings ---");

const names = ["alice johnson", "bob smith", "charlie brown", "diana prince"];

// Capitalize first letter of each name
const capitalized = names.map(name =>
    name.split(" ").map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ")
);
console.log("Capitalized:", capitalized);

// Get initials
const initials = names.map(name =>
    name.split(" ").map(word => word[0].toUpperCase()).join("")
);
console.log("Initials:", initials);

// Get first names only
const firstNames = names.map(name => name.split(" ")[0]);
console.log("First names:", firstNames);

// Uppercase everything
const upper = names.map(name => name.toUpperCase());
console.log("Uppercase:", upper);

// String lengths
const lengths = names.map(name => name.length);
console.log("Lengths:", lengths);


console.log("\n--- Example 3: Transforming Objects ---");

const users = [
    { id: 1, firstName: "Alice", lastName: "Johnson", age: 28, active: true },
    { id: 2, firstName: "Bob", lastName: "Smith", age: 35, active: false },
    { id: 3, firstName: "Charlie", lastName: "Brown", age: 22, active: true },
    { id: 4, firstName: "Diana", lastName: "Prince", age: 31, active: true },
];

// Extract specific properties (projection)
const nameList = users.map(user => `${user.firstName} ${user.lastName}`);
console.log("Name list:", nameList);

// Create new objects with computed properties
const userCards = users.map(user => ({
    fullName: `${user.firstName} ${user.lastName}`,
    status: user.active ? "Active" : "Inactive",
    ageGroup: user.age < 25 ? "Young" : user.age < 35 ? "Mid" : "Senior",
}));
console.log("User cards:", JSON.stringify(userCards, null, 2));

// Add computed properties to existing objects
const enriched = users.map(user => ({
    ...user,
    fullName: `${user.firstName} ${user.lastName}`,
    email: `${user.firstName.toLowerCase()}.${user.lastName.toLowerCase()}@company.com`,
}));
console.log("Enriched (first):", enriched[0]);

// Extract just IDs
const ids = users.map(user => user.id);
console.log("IDs:", ids);


console.log("\n--- Example 4: Map with Index (Practical Uses) ---");

const items = ["apple", "banana", "cherry", "date"];

// Add numbering
const numbered = items.map((item, i) => `${i + 1}. ${item}`);
console.log("Numbered:", numbered);

// Create option elements (HTML-like)
const options = items.map((item, i) => `<option value="${i}">${item}</option>`);
console.log("Options:", options);

// Alternate styling (odd/even)
const styled = items.map((item, i) =>
    `<li class="${i % 2 === 0 ? "even" : "odd"}">${item}</li>`
);
console.log("Styled:", styled);

// Generate test IDs
const testIds = items.map((item, i) => `item-${item.toLowerCase()}-${i}`);
console.log("Test IDs:", testIds);


console.log("\n--- Example 5: Map for Type Conversion ---");

// String to Number
const stringNums = ["10", "20", "30", "40", "50"];
const nums = stringNums.map(Number);
console.log("String to Number:", nums);

// Number to String
const numArr = [1, 2, 3, 4, 5];
const strArr = numArr.map(String);
console.log("Number to String:", strArr);

// Parse integers from mixed strings
const mixed = ["10px", "20em", "30%", "40rem"];
const parsed = mixed.map(s => parseInt(s, 10));
console.log("Parsed ints:", parsed);

// Boolean conversion
const values = [0, 1, "", "hello", null, undefined, false, true, [], {}];
const booleans = values.map(Boolean);
console.log("Booleans:", booleans);

// JSON parse
const jsonStrings = ['{"a":1}', '{"b":2}', '{"c":3}'];
const objects = jsonStrings.map(s => JSON.parse(s));
console.log("Parsed JSON:", objects);


console.log("\n--- Example 6: Simulating Playwright allTextContents() Processing ---");

// Simulating: const texts = await page.locator('.price').allTextContents();
function simulateAllTextContents() {
    return ["$29.99", "$49.50", "$12.00", "$99.99", "$5.75"];
}

const priceTexts = simulateAllTextContents();
console.log("Raw text contents:", priceTexts);

// Extract numeric values
const priceValues = priceTexts.map(text => parseFloat(text.replace("$", "")));
console.log("Numeric prices:", priceValues);

// Format for assertions
const formatted = priceValues.map(price => `$${price.toFixed(2)}`);
console.log("Formatted prices:", formatted);

// Simulating: processing visible items
function simulateItemTexts() {
    return [
        "  Product A - $10.00  ",
        "  Product B - $20.00  ",
        "  Product C - $30.00  ",
    ];
}

const cleanItems = simulateItemTexts().map(text => {
    const trimmed = text.trim();
    const [name, price] = trimmed.split(" - ");
    return { name, price: parseFloat(price.replace("$", "")) };
});
console.log("Parsed items:", cleanItems);

// Simulating: extract href attributes
function simulateHrefs() {
    return [
        "/products/1",
        "/products/2",
        "/products/3",
    ];
}
const fullURLs = simulateHrefs().map(href => `https://example.com${href}`);
console.log("Full URLs:", fullURLs);


console.log("\n--- Example 7: Map vs forEach (Key Difference) ---");

const data = [1, 2, 3, 4, 5];

// .map() returns a NEW array — use when you need the result
const mapResult = data.map(n => n * 10);
console.log("map returns:", mapResult);

// .forEach() returns undefined — use for side effects only
const forEachResult = data.forEach(n => n * 10);
console.log("forEach returns:", forEachResult);  // undefined

// DON'T use map just for side effects (anti-pattern)
// BAD: data.map(n => console.log(n));  // creates useless array of undefineds
// GOOD: data.forEach(n => console.log(n));  // forEach is for side effects

// DON'T use forEach to build a new array (anti-pattern)
// BAD:
const bad = [];
data.forEach(n => bad.push(n * 10));
console.log("forEach push (anti-pattern):", bad);

// GOOD: use map instead
const good = data.map(n => n * 10);
console.log("map (correct):", good);


console.log("\n--- Example 8: Advanced Map Patterns ---");

// Flatten and map (using flatMap)
const sentences = ["Hello World", "Foo Bar Baz", "One Two"];
const allWords = sentences.flatMap(s => s.split(" "));
console.log("flatMap words:", allWords);

// Map with conditional transformation
const scores = [95, 42, 78, 88, 31, 67, 91];
const graded = scores.map(score => ({
    score,
    grade: score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : score >= 60 ? "D" : "F",
    passing: score >= 60,
}));
console.log("Graded:");
graded.forEach(g => console.log(`  ${g.score}: ${g.grade} (${g.passing ? "Pass" : "Fail"})`));

// Map to create lookup object (using reduce is better, but map can help)
const keyValuePairs = users.map(u => [u.id, u.firstName]);
const lookup = Object.fromEntries(keyValuePairs);
console.log("Lookup:", lookup);

// Chained maps (each step is clear)
const result = ["  ALICE  ", "  BOB  ", "  CHARLIE  "]
    .map(s => s.trim())           // remove whitespace
    .map(s => s.toLowerCase())     // lowercase
    .map(s => s[0].toUpperCase() + s.slice(1));  // capitalize first letter
console.log("Chained maps:", result);


console.log("\n--- Example 9: Common Pitfalls ---");

// Pitfall 1: Forgetting to return (arrow function with braces needs explicit return)
const wrong = [1, 2, 3].map(n => { n * 2 });  // missing return!
console.log("Missing return:", wrong);  // [undefined, undefined, undefined]

const right = [1, 2, 3].map(n => { return n * 2; });  // explicit return
console.log("With return:", right);

const rightConcise = [1, 2, 3].map(n => n * 2);  // implicit return (no braces)
console.log("Concise:", rightConcise);

// Pitfall 2: Returning object literal needs parentheses
const wrongObj = [1, 2, 3].map(n => { value: n });  // { value: n } is parsed as a block!
console.log("Wrong object:", wrongObj);  // [undefined, undefined, undefined]

const rightObj = [1, 2, 3].map(n => ({ value: n }));  // wrap in ()
console.log("Right object:", rightObj);

// Pitfall 3: parseInt with map
console.log("parseInt pitfall:", ["1", "2", "3"].map(parseInt));
// Returns [1, NaN, NaN] because parseInt receives (string, index) and index becomes radix!
console.log("parseInt fix:", ["1", "2", "3"].map(s => parseInt(s, 10)));
// Or simply: ["1", "2", "3"].map(Number)


// === KEY TAKEAWAYS ===
// 1. .map(callback) creates a NEW array — never modifies the original
// 2. Callback: (element, index, array) => transformedValue
// 3. Use map when you need a new array from transformation; use forEach for side effects
// 4. Arrow syntax: n => n * 2 (implicit return) or n => { return n * 2; } (explicit)
// 5. Return objects with parentheses: n => ({ key: n }) — otherwise it's parsed as a block
// 6. Playwright: process allTextContents(), transform locator results, prepare test data
// 7. Chain .map() calls for multi-step transformations, or use a single map with complex logic
// 8. Watch out for parseInt pitfall — use .map(Number) or .map(s => parseInt(s, 10))
