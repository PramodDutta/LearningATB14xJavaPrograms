// Extra_04_Iterables_and_Spread.js
// Topic: Iterables and Spread Operator - Part 4 of 6
// Extends: ex_30_Collection_Framework
//
// CONCEPT: The spread operator (...) expands any iterable into individual elements.
// Maps, Sets, strings, and arrays are all iterable. Spread enables elegant collection
// manipulation: merging, copying, converting between types, and combining collections.
// JAVA COMPARISON: Java has no spread operator. You use addAll(), Stream.concat(),
// or Collections utility methods to achieve similar merging and conversion operations.
// PLAYWRIGHT RELEVANCE: Spread is used to combine locator results, merge config objects,
// convert fixture data, and build composite test data from multiple sources.
// ============================================================

console.log("--- Example 1: Spreading Sets ---");

const primaryColors = new Set(["red", "blue", "yellow"]);
const warmColors = new Set(["red", "orange", "yellow"]);
const coolColors = new Set(["blue", "green", "purple"]);

// Spread Set into an array
const primaryArray = [...primaryColors];
console.log("  Set -> Array:", primaryArray);

// Merge Sets (union via spread)
const allColors = new Set([...primaryColors, ...warmColors, ...coolColors]);
console.log("  All colors (union):", [...allColors]);

// Spread Set into function arguments
console.log("  Max of Set:", Math.max(...new Set([42, 17, 93, 5, 68])));
console.log("  Min of Set:", Math.min(...new Set([42, 17, 93, 5, 68])));

// Spread Set in template literals via join
const tags = new Set(["javascript", "playwright", "testing"]);
console.log("  Tags:", [...tags].join(", "));

// Copy a Set
const originalSet = new Set([1, 2, 3]);
const copiedSet = new Set([...originalSet]);
copiedSet.add(4);
console.log("\n  Original:", [...originalSet]);  // [1, 2, 3]
console.log("  Copy:", [...copiedSet]);          // [1, 2, 3, 4]

console.log("\n--- Example 2: Spreading Maps ---");

const configDefaults = new Map([
    ["timeout", 30000],
    ["retries", 3],
    ["headless", true],
    ["browser", "chromium"],
]);

const configOverrides = new Map([
    ["timeout", 60000],
    ["headless", false],
    ["workers", 4],
]);

// Spread Map into array of entries
console.log("  Default entries:", [...configDefaults]);

// Merge Maps — later entries win for duplicate keys
const mergedConfig = new Map([...configDefaults, ...configOverrides]);
console.log("\n  Merged config:");
for (const [key, value] of mergedConfig) {
    console.log(`    ${key}: ${value}`);
}

// Destructuring from Map entries
console.log("\n  Destructured Map entries:");
for (const [setting, value] of configDefaults) {
    console.log(`    ${setting} = ${value}`);
}

// Spread Map keys/values into arrays
const settingNames = [...mergedConfig.keys()];
const settingValues = [...mergedConfig.values()];
console.log("\n  Setting names:", settingNames);
console.log("  Setting values:", settingValues);

// Convert Map to Object via spread + Object.fromEntries
const configObject = Object.fromEntries([...mergedConfig]);
console.log("  As object:", configObject);

console.log("\n--- Example 3: Combining different collection types ---");

// Array + Set combination
const arrayData = [1, 2, 3, 4, 5];
const setData = new Set([4, 5, 6, 7, 8]);

// Union: unique values from both
const combined = [...new Set([...arrayData, ...setData])];
console.log("  Array + Set union:", combined);

// Intersection
const common = arrayData.filter(x => setData.has(x));
console.log("  Array intersect Set:", common);

// Map entries to Object to JSON
const metadata = new Map([
    ["testSuite", "Login Tests"],
    ["runDate", "2024-06-15"],
    ["totalTests", 25],
]);
const jsonString = JSON.stringify(Object.fromEntries([...metadata]), null, 2);
console.log("\n  Map -> JSON:\n" + jsonString);

// Object to Map to filtered Map to Object
const rawConfig = {
    baseURL: "https://example.com",
    timeout: 30000,
    _internal: "debug",
    _secret: "hidden",
    retries: 3,
};

const publicConfig = Object.fromEntries(
    [...new Map(Object.entries(rawConfig))]
        .filter(([key]) => !key.startsWith("_"))
);
console.log("\n  Filtered config (no _ prefix):", publicConfig);

console.log("\n--- Example 4: Spread with strings and other iterables ---");

// Strings are iterable
const greeting = "Hello!";
const letters = [...greeting];
console.log("  String spread:", letters);

// Useful for string manipulation
const uniqueChars = [...new Set("mississippi")];
console.log("  Unique chars in 'mississippi':", uniqueChars);

// Reverse a string (handles unicode better than split(''))
const reversed = [..."Hello World"].reverse().join("");
console.log("  Reversed:", reversed);

// Spread in array literals for insertion
const beginning = [1, 2, 3];
const middle = [4, 5, 6];
const end = [7, 8, 9];
const fullArray = [...beginning, ...middle, ...end];
console.log("\n  Combined arrays:", fullArray);

// Insert in the middle
const withInsert = [...beginning, 99, ...end];
console.log("  With insert:", withInsert);

// Spread for cloning and extending
const baseTest = { name: "login", timeout: 5000 };
const extendedTest = { ...baseTest, retries: 3, tags: ["smoke"] };
console.log("\n  Extended test:", extendedTest);

// Spread for conditional properties
const isDebug = true;
const testConfig = {
    browser: "chromium",
    headless: true,
    ...(isDebug && { slowMo: 500, devtools: true }),
};
console.log("  Conditional spread:", testConfig);

console.log("\n--- Example 5: Advanced patterns with spread ---");

// Pattern: Merge multiple data sources
const dbUsers = [
    { id: 1, name: "Alice", source: "db" },
    { id: 2, name: "Bob", source: "db" },
];
const apiUsers = [
    { id: 3, name: "Charlie", source: "api" },
    { id: 4, name: "Diana", source: "api" },
];
const localUsers = [
    { id: 5, name: "Eve", source: "local" },
];

const allUsers = [...dbUsers, ...apiUsers, ...localUsers];
console.log("  All users:", allUsers.map(u => `${u.name}(${u.source})`).join(", "));

// Pattern: Flatten one level with spread
const nested = [[1, 2], [3, 4], [5, 6]];
const flattened = [].concat(...nested);
console.log("\n  Flattened:", flattened);

// Modern: .flat() is better
console.log("  .flat():", nested.flat());

// Pattern: Convert Map of Sets to a flat array of unique values
const pageSelectors = new Map([
    ["header", new Set(["#logo", "#nav", "#search"])],
    ["main", new Set(["#content", "#sidebar", "#search"])],
    ["footer", new Set(["#links", "#copyright"])],
]);

const allSelectors = [...new Set(
    [...pageSelectors.values()].flatMap(set => [...set])
)];
console.log("\n  All unique selectors:", allSelectors);

// Pattern: Build test permutations with spread
const browsers = ["chromium", "firefox"];
const modes = ["headed", "headless"];
const locales = ["en-US", "fr-FR"];

const permutations = browsers.flatMap(browser =>
    modes.flatMap(mode =>
        locales.map(locale => ({ browser, mode, locale }))
    )
);

console.log("\n  Test permutations:");
for (const p of permutations) {
    console.log(`    ${p.browser} / ${p.mode} / ${p.locale}`);
}
console.log(`  Total: ${permutations.length} combinations`);

// Pattern: Swap variables
let x = "hello";
let y = "world";
[x, y] = [y, x]; // destructuring + array literal
console.log("\n  Swapped:", x, y);

// Pattern: Remove duplicates from array of objects
const entries = [
    { url: "/login", method: "GET" },
    { url: "/api/users", method: "POST" },
    { url: "/login", method: "GET" },      // dup
    { url: "/api/users", method: "POST" }, // dup
    { url: "/dashboard", method: "GET" },
];

const uniqueEntries = [...new Map(
    entries.map(e => [JSON.stringify(e), e])
).values()];
console.log("\n  Deduplicated entries:", uniqueEntries);

// === KEY TAKEAWAYS ===
// 1. [...set] converts Set to Array — enables .map(), .filter(), .reduce()
// 2. [...map] converts Map to Array of [key, value] pairs
// 3. new Set([...a, ...b]) merges Sets (union) via spread
// 4. new Map([...defaults, ...overrides]) merges Maps (later wins)
// 5. Spread works on any iterable: arrays, sets, maps, strings, generators
// 6. Conditional spread: { ...(condition && { key: val }) } adds props conditionally
// 7. Combine with flatMap for complex transformations across collection types
// 8. Java has no spread — use addAll(), Stream.concat(), or Collections utilities
