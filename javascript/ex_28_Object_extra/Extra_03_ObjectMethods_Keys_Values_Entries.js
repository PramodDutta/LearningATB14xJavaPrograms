// Extra_03_ObjectMethods_Keys_Values_Entries.js
// Topic: Object Static Methods — keys, values, entries - Part 3 of 7
// Extends: ex_28_Object
//
// CONCEPT: Object.keys(), Object.values(), and Object.entries() convert object properties
// into arrays for easy iteration, filtering, and transformation. Object.assign() merges
// objects, while Object.freeze() and Object.seal() control mutability.
// JAVA COMPARISON: Similar to Map's keySet(), values(), entrySet() methods. Object.freeze()
// is like Collections.unmodifiableMap(). Object.assign() is like Map.putAll().
// PLAYWRIGHT RELEVANCE: These methods are used for processing config objects, response
// headers, query parameters, and converting API response data.
// ============================================================

console.log("--- Example 1: Object.keys(), Object.values(), Object.entries() ---");

const testResult = {
    testName: "Login Flow",
    status: "passed",
    duration: 1250,
    browser: "chromium",
    retries: 0,
};

// Object.keys() — returns array of property names
const keys = Object.keys(testResult);
console.log("  Keys:", keys);
// ["testName", "status", "duration", "browser", "retries"]

// Object.values() — returns array of property values
const values = Object.values(testResult);
console.log("  Values:", values);
// ["Login Flow", "passed", 1250, "chromium", 0]

// Object.entries() — returns array of [key, value] pairs
const entries = Object.entries(testResult);
console.log("  Entries:", entries);
// [["testName","Login Flow"], ["status","passed"], ...]

// Practical: count properties
console.log("  Property count:", Object.keys(testResult).length);

// Check if object is empty
const emptyObj = {};
console.log("  Is empty?", Object.keys(emptyObj).length === 0);

console.log("\n--- Example 2: Iterating with Object methods ---");

const scores = {
    Alice: 95,
    Bob: 82,
    Charlie: 91,
    Diana: 88,
    Eve: 97,
};

// Iterate keys
console.log("  Students:");
for (const name of Object.keys(scores)) {
    console.log(`    - ${name}`);
}

// Iterate values — find average
const allScores = Object.values(scores);
const average = allScores.reduce((sum, s) => sum + s, 0) / allScores.length;
console.log(`\n  Average score: ${average}`);

// Iterate entries — formatted output
console.log("\n  Score report:");
for (const [name, score] of Object.entries(scores)) {
    const grade = score >= 90 ? "A" : score >= 80 ? "B" : "C";
    console.log(`    ${name}: ${score} (${grade})`);
}

// Filter using entries
const topStudents = Object.entries(scores)
    .filter(([, score]) => score >= 90)
    .map(([name, score]) => ({ name, score }));
console.log("\n  Top students (90+):", topStudents);

// Transform using entries + Object.fromEntries
const curved = Object.fromEntries(
    Object.entries(scores).map(([name, score]) => [name, Math.min(100, score + 5)])
);
console.log("  Curved scores:", curved);

console.log("\n--- Example 3: Object.assign() — merging objects ---");

// Basic merge: target is mutated
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };
const result = Object.assign(target, source);
console.log("  target after assign:", target);  // { a: 1, b: 3, c: 4 }
console.log("  result === target:", result === target); // true — same reference!

// Non-mutating merge: use empty object as target
const defaults = { timeout: 5000, retries: 3, headless: true };
const userConfig = { timeout: 30000, headless: false };
const finalConfig = Object.assign({}, defaults, userConfig);
console.log("\n  Merged config:", finalConfig);
console.log("  defaults unchanged:", defaults);

// Multiple sources — later sources override earlier ones
const base = { a: 1 };
const override1 = { a: 2, b: 2 };
const override2 = { a: 3, c: 3 };
const merged = Object.assign({}, base, override1, override2);
console.log("\n  Multi-merge:", merged); // { a: 3, b: 2, c: 3 }

// Modern alternative: spread operator (creates new object)
const spreadMerge = { ...defaults, ...userConfig };
console.log("  Spread merge:", spreadMerge);

// Shallow copy
const original = { name: "Alice", address: { city: "Portland" } };
const copy = Object.assign({}, original);
copy.name = "Bob";                    // does not affect original
copy.address.city = "Seattle";        // DOES affect original (shallow!)
console.log("\n  Shallow copy gotcha:");
console.log("  original.name:", original.name);         // "Alice" — independent
console.log("  original.address.city:", original.address.city); // "Seattle" — shared!

console.log("\n--- Example 4: Object.freeze() and Object.seal() ---");

// Object.freeze() — no modifications at all
const frozenConfig = Object.freeze({
    baseURL: "https://api.example.com",
    version: "v1",
    timeout: 30000,
});

frozenConfig.baseURL = "https://hack.com"; // silently fails (no strict mode)
frozenConfig.newProp = "nope";             // silently fails
console.log("  Frozen config:", frozenConfig);
console.log("  Is frozen?", Object.isFrozen(frozenConfig));

// In strict mode or with explicit check
try {
    "use strict";
    const strict = Object.freeze({ x: 1 });
    // Attempting to modify in strict context
    Object.defineProperty(strict, "x", { value: 2 });
} catch (e) {
    console.log("  Freeze violation caught:", e.message);
}

// Object.seal() — can modify existing, but cannot add/delete
const sealedUser = Object.seal({
    name: "Alice",
    role: "admin",
});

sealedUser.name = "Bob";          // OK — modifying existing
sealedUser.newProp = "nope";      // silently fails
delete sealedUser.role;           // silently fails
console.log("\n  Sealed user:", sealedUser); // { name: "Bob", role: "admin" }
console.log("  Is sealed?", Object.isSealed(sealedUser));

// freeze vs seal comparison
console.log("\n  Freeze vs Seal:");
console.log("  +-----------------+--------+--------+");
console.log("  | Operation       | freeze | seal   |");
console.log("  +-----------------+--------+--------+");
console.log("  | Read            | Yes    | Yes    |");
console.log("  | Modify existing | No     | Yes    |");
console.log("  | Add new         | No     | No     |");
console.log("  | Delete          | No     | No     |");
console.log("  +-----------------+--------+--------+");

// NOTE: freeze is shallow!
const shallowFreeze = Object.freeze({
    name: "Config",
    nested: { mutable: true },
});
shallowFreeze.nested.mutable = false; // THIS WORKS — nested object not frozen
console.log("\n  Shallow freeze — nested changed:", shallowFreeze.nested.mutable);

// Deep freeze utility
function deepFreeze(obj) {
    Object.freeze(obj);
    for (const value of Object.values(obj)) {
        if (value && typeof value === "object" && !Object.isFrozen(value)) {
            deepFreeze(value);
        }
    }
    return obj;
}

const deepFrozen = deepFreeze({ name: "Config", nested: { mutable: true } });
deepFrozen.nested.mutable = false; // silently fails now
console.log("  Deep frozen — nested unchanged:", deepFrozen.nested.mutable); // still true

console.log("\n--- Example 5: Practical patterns combining Object methods ---");

// Pattern: Convert object to query string
function toQueryString(params) {
    return Object.entries(params)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join("&");
}

const searchParams = { q: "playwright testing", page: 1, lang: "en", filter: null };
console.log("  Query string:", toQueryString(searchParams));
// q=playwright%20testing&page=1&lang=en

// Pattern: Pick specific properties
function pick(obj, keys) {
    return Object.fromEntries(
        Object.entries(obj).filter(([key]) => keys.includes(key))
    );
}

const fullUser = { id: 1, name: "Alice", password: "secret", email: "a@b.com", ssn: "123" };
const safeUser = pick(fullUser, ["id", "name", "email"]);
console.log("\n  Picked (safe) user:", safeUser);

// Pattern: Omit specific properties
function omit(obj, keys) {
    return Object.fromEntries(
        Object.entries(obj).filter(([key]) => !keys.includes(key))
    );
}

const publicUser = omit(fullUser, ["password", "ssn"]);
console.log("  Omitted (public) user:", publicUser);

// Pattern: Map over object values
function mapValues(obj, fn) {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, fn(value, key)])
    );
}

const prices = { widget: 10, gadget: 25, gizmo: 15 };
const withTax = mapValues(prices, (price) => +(price * 1.08).toFixed(2));
console.log("\n  Prices with tax:", withTax);

// Pattern: Group by a property
const testResults = [
    { name: "test1", status: "passed" },
    { name: "test2", status: "failed" },
    { name: "test3", status: "passed" },
    { name: "test4", status: "skipped" },
    { name: "test5", status: "failed" },
];

const grouped = {};
for (const { name, status } of testResults) {
    if (!grouped[status]) grouped[status] = [];
    grouped[status].push(name);
}
console.log("\n  Grouped results:", grouped);
console.log("  Passed count:", (grouped.passed || []).length);
console.log("  Failed tests:", (grouped.failed || []).join(", "));

// === KEY TAKEAWAYS ===
// 1. Object.keys(obj) -> ["key1", "key2"] — array of property names
// 2. Object.values(obj) -> [val1, val2] — array of property values
// 3. Object.entries(obj) -> [["key1", val1], ...] — array of [key, value] pairs
// 4. Object.fromEntries(entries) — inverse of entries(), creates object from pairs
// 5. Object.assign(target, ...sources) — merges objects (mutates target, shallow)
// 6. Spread { ...a, ...b } — modern alternative to assign, always creates new object
// 7. Object.freeze() — immutable (shallow), Object.seal() — no add/delete but can modify
// 8. Combine entries/fromEntries for pick, omit, mapValues, and other transformations
