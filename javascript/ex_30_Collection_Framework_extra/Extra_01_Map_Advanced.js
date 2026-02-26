// Extra_01_Map_Advanced.js
// Topic: Advanced Map Usage - Part 1 of 6
// Extends: ex_30_Collection_Framework
//
// CONCEPT: Map is a key-value collection that allows ANY type as keys — not just strings.
// Unlike plain objects, Map preserves insertion order, has a .size property, and provides
// built-in iteration methods. WeakMap holds keys weakly for memory-safe caching.
// JAVA COMPARISON: Directly maps to java.util.HashMap (or LinkedHashMap for order).
// Map.size is like map.size(), Map.get/set like map.get()/map.put().
// PLAYWRIGHT RELEVANCE: Maps are useful for tracking page objects, caching selectors,
// storing test state, and mapping test names to results during parallel execution.
// ============================================================

console.log("--- Example 1: Map with non-string keys ---");

// Objects as keys
const userPermissions = new Map();

const alice = { id: 1, name: "Alice" };
const bob = { id: 2, name: "Bob" };
const charlie = { id: 3, name: "Charlie" };

userPermissions.set(alice, ["read", "write", "admin"]);
userPermissions.set(bob, ["read", "write"]);
userPermissions.set(charlie, ["read"]);

console.log("  Alice's permissions:", userPermissions.get(alice));
console.log("  Bob's permissions:", userPermissions.get(bob));

// Important: object identity matters, not value equality
const aliceCopy = { id: 1, name: "Alice" };
console.log("  aliceCopy lookup:", userPermissions.get(aliceCopy)); // undefined — different object!
console.log("  Same reference works:", userPermissions.get(alice)); // ["read", "write", "admin"]

// Functions as keys
const handlers = new Map();
function onClick() { return "clicked"; }
function onHover() { return "hovered"; }

handlers.set(onClick, { element: "#button", count: 0 });
handlers.set(onHover, { element: "#menu", count: 0 });

console.log("\n  Function key lookup:", handlers.get(onClick));

// Numbers, booleans, null, undefined as keys
const mixedKeys = new Map();
mixedKeys.set(42, "the answer");
mixedKeys.set(true, "truthy");
mixedKeys.set(null, "nothing");
mixedKeys.set(undefined, "void");
mixedKeys.set(NaN, "not a number");  // NaN === NaN is false, but Map handles it!

console.log("\n  Number key:", mixedKeys.get(42));
console.log("  Boolean key:", mixedKeys.get(true));
console.log("  null key:", mixedKeys.get(null));
console.log("  undefined key:", mixedKeys.get(undefined));
console.log("  NaN key:", mixedKeys.get(NaN)); // works correctly in Map!

console.log("\n--- Example 2: Map size and basic operations ---");

const testResults = new Map();
testResults.set("login_test", { status: "passed", duration: 1200 });
testResults.set("search_test", { status: "failed", duration: 3500 });
testResults.set("cart_test", { status: "passed", duration: 2100 });
testResults.set("checkout_test", { status: "skipped", duration: 0 });

console.log("  Size:", testResults.size);                    // 4
console.log("  Has 'login_test':", testResults.has("login_test"));  // true
console.log("  Has 'delete_test':", testResults.has("delete_test")); // false

// Delete
testResults.delete("checkout_test");
console.log("  After delete, size:", testResults.size);      // 3

// Get with default
function mapGetOrDefault(map, key, defaultValue) {
    return map.has(key) ? map.get(key) : defaultValue;
}
console.log("  Existing:", mapGetOrDefault(testResults, "login_test", null));
console.log("  Missing:", mapGetOrDefault(testResults, "unknown", { status: "not_found" }));

// Clear
const tempMap = new Map([["a", 1], ["b", 2]]);
console.log("\n  Before clear:", tempMap.size);
tempMap.clear();
console.log("  After clear:", tempMap.size);

console.log("\n--- Example 3: Iterating Map with for...of ---");

const browserVersions = new Map([
    ["chromium", "120.0.6099.109"],
    ["firefox", "121.0"],
    ["webkit", "17.4"],
    ["edge", "120.0.2210.91"],
]);

// Iterate entries (default)
console.log("  Entries (for...of):");
for (const [browser, version] of browserVersions) {
    console.log(`    ${browser}: v${version}`);
}

// Iterate keys only
console.log("\n  Keys:");
for (const browser of browserVersions.keys()) {
    console.log(`    - ${browser}`);
}

// Iterate values only
console.log("\n  Values:");
for (const version of browserVersions.values()) {
    console.log(`    - ${version}`);
}

// forEach
console.log("\n  forEach:");
browserVersions.forEach((version, browser) => {
    console.log(`    ${browser} -> ${version}`);
});

// Convert to array for array methods
const browserArray = [...browserVersions.entries()];
console.log("\n  As array:", browserArray);

// Filter Map entries (no built-in filter — convert to array first)
const majorVersions = new Map(
    [...browserVersions].filter(([, version]) => parseInt(version) >= 120)
);
console.log("  Filtered (>= v120):", [...majorVersions.keys()]);

console.log("\n--- Example 4: Converting Map to/from Object ---");

// Object to Map
const configObj = {
    baseURL: "https://example.com",
    timeout: 30000,
    retries: 3,
    headless: true,
};

const configMap = new Map(Object.entries(configObj));
console.log("  Object -> Map:");
console.log("  Size:", configMap.size);
console.log("  baseURL:", configMap.get("baseURL"));
console.log("  timeout:", configMap.get("timeout"));

// Map to Object
const backToObj = Object.fromEntries(configMap);
console.log("\n  Map -> Object:", backToObj);

// When to use Map vs Object
console.log("\n  Map vs Object comparison:");
console.log("  +------------------------+------------------+------------------+");
console.log("  | Feature                | Object           | Map              |");
console.log("  +------------------------+------------------+------------------+");
console.log("  | Key types              | String/Symbol    | Any type         |");
console.log("  | Size                   | Object.keys.len  | .size property   |");
console.log("  | Iteration order        | Not guaranteed*  | Insertion order  |");
console.log("  | Default keys           | Has prototype    | Empty            |");
console.log("  | Performance (add/del)  | Slower for many  | Optimized        |");
console.log("  | JSON serialization     | Direct           | Need conversion  |");
console.log("  | Destructuring          | Yes              | No               |");
console.log("  +------------------------+------------------+------------------+");
console.log("  * Modern engines do preserve insertion order for string keys");

// Practical: counting occurrences with Map
const words = "the quick brown fox jumps over the lazy dog the fox".split(" ");
const wordCount = new Map();
for (const word of words) {
    wordCount.set(word, (wordCount.get(word) || 0) + 1);
}
console.log("\n  Word counts:");
for (const [word, count] of [...wordCount].sort((a, b) => b[1] - a[1])) {
    console.log(`    "${word}": ${count}`);
}

console.log("\n--- Example 5: WeakMap concept ---");

// WeakMap: keys must be objects, and they're held weakly
// When the key object has no other references, it can be garbage collected
const cache = new WeakMap();

function expensiveComputation(obj) {
    if (cache.has(obj)) {
        console.log("    Cache hit!");
        return cache.get(obj);
    }

    console.log("    Computing...");
    const result = { computed: obj.value * 2, timestamp: Date.now() };
    cache.set(obj, result);
    return result;
}

let data = { value: 21 };
console.log("  First call:", expensiveComputation(data));  // Computing...
console.log("  Second call:", expensiveComputation(data)); // Cache hit!

// When data is set to null, the WeakMap entry becomes eligible for GC
// data = null; // WeakMap entry for old data can now be garbage collected

// WeakMap limitations
console.log("\n  WeakMap limitations:");
console.log("  - Keys must be objects (not primitives)");
console.log("  - Not iterable (no .keys(), .values(), .entries(), .forEach())");
console.log("  - No .size property");
console.log("  - No .clear() method");
console.log("  - Use case: private data, caching, metadata for DOM elements");

// Practical: Using WeakMap for private class data
const privateData = new WeakMap();

class SecureUser {
    constructor(name, secret) {
        this.name = name;
        privateData.set(this, { secret, loginAttempts: 0 });
    }

    authenticate(attempt) {
        const priv = privateData.get(this);
        priv.loginAttempts++;
        if (priv.loginAttempts > 3) return "Account locked";
        return attempt === priv.secret ? "Authenticated" : "Failed";
    }

    getAttempts() {
        return privateData.get(this).loginAttempts;
    }
}

const secureUser = new SecureUser("Alice", "password123");
console.log("\n  Private data via WeakMap:");
console.log("  Auth attempt 1:", secureUser.authenticate("wrong"));
console.log("  Auth attempt 2:", secureUser.authenticate("wrong"));
console.log("  Auth attempt 3:", secureUser.authenticate("password123"));
console.log("  Auth attempt 4:", secureUser.authenticate("password123")); // locked
console.log("  Total attempts:", secureUser.getAttempts());
console.log("  Can access secret?", secureUser.secret); // undefined — truly private

// === KEY TAKEAWAYS ===
// 1. Map allows ANY type as keys — objects, functions, numbers, NaN, null
// 2. Map.size gives count directly (vs Object.keys(obj).length)
// 3. Map preserves insertion order and is directly iterable with for...of
// 4. Convert: new Map(Object.entries(obj)) and Object.fromEntries(map)
// 5. Use Map when: keys aren't strings, need .size, need frequent add/delete
// 6. Use Object when: keys are strings, need JSON serialization, need destructuring
// 7. WeakMap: object keys only, no iteration, allows garbage collection — ideal for caching
// 8. Java equivalent: HashMap/LinkedHashMap for Map, WeakHashMap for WeakMap
