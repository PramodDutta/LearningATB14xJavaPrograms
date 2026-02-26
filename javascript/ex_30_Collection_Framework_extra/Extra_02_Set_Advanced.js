// Extra_02_Set_Advanced.js
// Topic: Advanced Set Usage - Part 2 of 6
// Extends: ex_30_Collection_Framework
//
// CONCEPT: Set stores unique values of any type. It supports mathematical set operations
// like union, intersection, and difference through array conversion and filtering.
// WeakSet holds objects weakly for tracking without preventing garbage collection.
// JAVA COMPARISON: Directly maps to java.util.HashSet. Set operations are similar to
// Java's addAll (union), retainAll (intersection), removeAll (difference).
// PLAYWRIGHT RELEVANCE: Sets are useful for deduplicating test data, tracking visited URLs,
// collecting unique selectors, and ensuring no duplicate test names in a suite.
// ============================================================

console.log("--- Example 1: Set operations — union, intersection, difference ---");

const frontendTeam = new Set(["Alice", "Bob", "Charlie", "Diana"]);
const backendTeam = new Set(["Charlie", "Diana", "Eve", "Frank"]);

// Union: all members from both sets
const union = new Set([...frontendTeam, ...backendTeam]);
console.log("  Frontend:", [...frontendTeam]);
console.log("  Backend:", [...backendTeam]);
console.log("  Union (all):", [...union]);

// Intersection: members in both sets
const intersection = new Set(
    [...frontendTeam].filter(member => backendTeam.has(member))
);
console.log("  Intersection (both):", [...intersection]);

// Difference: in A but not in B
const frontendOnly = new Set(
    [...frontendTeam].filter(member => !backendTeam.has(member))
);
console.log("  Frontend only:", [...frontendOnly]);

const backendOnly = new Set(
    [...backendTeam].filter(member => !frontendTeam.has(member))
);
console.log("  Backend only:", [...backendOnly]);

// Symmetric difference: in either but not both
const symmetricDiff = new Set(
    [...frontendTeam, ...backendTeam].filter(
        member => !(frontendTeam.has(member) && backendTeam.has(member))
    )
);
console.log("  Symmetric diff:", [...symmetricDiff]);

// Superset check
function isSuperset(set, subset) {
    for (const item of subset) {
        if (!set.has(item)) return false;
    }
    return true;
}
console.log("\n  Union is superset of frontend?", isSuperset(union, frontendTeam)); // true
console.log("  Frontend is superset of backend?", isSuperset(frontendTeam, backendTeam)); // false

console.log("\n--- Example 2: Reusable set operation utilities ---");

class SetOps {
    static union(...sets) {
        return new Set(sets.flatMap(s => [...s]));
    }

    static intersection(a, b) {
        return new Set([...a].filter(x => b.has(x)));
    }

    static difference(a, b) {
        return new Set([...a].filter(x => !b.has(x)));
    }

    static symmetricDifference(a, b) {
        return SetOps.union(SetOps.difference(a, b), SetOps.difference(b, a));
    }

    static isSubset(set, subset) {
        return [...subset].every(x => set.has(x));
    }

    static isEqual(a, b) {
        return a.size === b.size && [...a].every(x => b.has(x));
    }
}

const set1 = new Set([1, 2, 3, 4, 5]);
const set2 = new Set([3, 4, 5, 6, 7]);
const set3 = new Set([3, 4]);

console.log("  set1:", [...set1]);
console.log("  set2:", [...set2]);
console.log("  set3:", [...set3]);
console.log("  union(1,2):", [...SetOps.union(set1, set2)]);
console.log("  intersection(1,2):", [...SetOps.intersection(set1, set2)]);
console.log("  difference(1,2):", [...SetOps.difference(set1, set2)]);
console.log("  symmetricDiff(1,2):", [...SetOps.symmetricDifference(set1, set2)]);
console.log("  set3 subset of set1?", SetOps.isSubset(set1, set3));
console.log("  set1 equals set2?", SetOps.isEqual(set1, set2));

// Union of multiple sets
const a = new Set([1, 2]);
const b = new Set([2, 3]);
const c = new Set([3, 4]);
console.log("\n  Union of 3 sets:", [...SetOps.union(a, b, c)]);

console.log("\n--- Example 3: Using Set for deduplication ---");

// Deduplicate an array
const rawTags = ["javascript", "testing", "playwright", "javascript", "automation",
    "testing", "qa", "playwright", "javascript"];
const uniqueTags = [...new Set(rawTags)];
console.log("  Raw tags:", rawTags.length, "items");
console.log("  Unique tags:", uniqueTags.length, "items ->", uniqueTags);

// Deduplicate objects by a key
const rawResults = [
    { testId: "TC001", status: "passed" },
    { testId: "TC002", status: "failed" },
    { testId: "TC001", status: "passed" },  // duplicate
    { testId: "TC003", status: "passed" },
    { testId: "TC002", status: "failed" },  // duplicate
];

function deduplicateBy(array, keyFn) {
    const seen = new Set();
    return array.filter(item => {
        const key = keyFn(item);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

const uniqueResults = deduplicateBy(rawResults, item => item.testId);
console.log("\n  Raw results:", rawResults.length);
console.log("  Unique results:", uniqueResults.length);
console.log("  Deduplicated:", uniqueResults);

// Deduplicate preserving last occurrence
function deduplicateKeepLast(array, keyFn) {
    const map = new Map();
    for (const item of array) {
        map.set(keyFn(item), item);
    }
    return [...map.values()];
}

const statusUpdates = [
    { testId: "TC001", status: "running" },
    { testId: "TC002", status: "running" },
    { testId: "TC001", status: "passed" },   // updated
    { testId: "TC002", status: "failed" },   // updated
];

const latestStatuses = deduplicateKeepLast(statusUpdates, item => item.testId);
console.log("\n  Latest statuses:", latestStatuses);

console.log("\n--- Example 4: WeakSet concept ---");

// WeakSet: only holds objects, allows garbage collection
const processedRequests = new WeakSet();

function processRequest(request) {
    if (processedRequests.has(request)) {
        console.log(`    Request "${request.id}" already processed — skipping`);
        return false;
    }
    console.log(`    Processing request "${request.id}"...`);
    processedRequests.add(request);
    return true;
}

const req1 = { id: "REQ-001", url: "/api/data" };
const req2 = { id: "REQ-002", url: "/api/users" };

processRequest(req1);  // Processing
processRequest(req2);  // Processing
processRequest(req1);  // Already processed
processRequest(req2);  // Already processed

// WeakSet limitations
console.log("\n  WeakSet characteristics:");
console.log("  - Only objects as values (no primitives)");
console.log("  - Not iterable (no for...of, no .forEach())");
console.log("  - No .size property");
console.log("  - No .clear() method");
console.log("  - Entries are garbage collected when object has no other references");

// Practical: tracking DOM-like elements that have been initialized
const initializedComponents = new WeakSet();

class Component {
    constructor(name) {
        this.name = name;
    }

    initialize() {
        if (initializedComponents.has(this)) {
            console.log(`    ${this.name}: already initialized`);
            return;
        }
        console.log(`    ${this.name}: initializing...`);
        initializedComponents.add(this);
    }
}

console.log("\n  Component initialization tracking:");
const header = new Component("Header");
const footer = new Component("Footer");
header.initialize();  // initializing
footer.initialize();  // initializing
header.initialize();  // already initialized

console.log("\n--- Example 5: Practical Set patterns for testing ---");

// Track visited URLs during a crawl test
const visitedUrls = new Set();

function crawlPage(url) {
    if (visitedUrls.has(url)) {
        return { url, action: "skipped (already visited)" };
    }
    visitedUrls.add(url);
    return { url, action: "crawled" };
}

const urlsToCrawl = [
    "https://example.com",
    "https://example.com/about",
    "https://example.com/contact",
    "https://example.com/about",     // duplicate
    "https://example.com",           // duplicate
    "https://example.com/products",
];

console.log("  URL crawl tracking:");
for (const url of urlsToCrawl) {
    const result = crawlPage(url);
    console.log(`    ${result.action}: ${result.url}`);
}
console.log(`  Total unique URLs visited: ${visitedUrls.size}`);

// Validate no duplicate test names
function validateUniqueTestNames(tests) {
    const names = tests.map(t => t.name);
    const uniqueNames = new Set(names);

    if (names.length !== uniqueNames.size) {
        const duplicates = names.filter((name, i) => names.indexOf(name) !== i);
        return {
            valid: false,
            duplicates: [...new Set(duplicates)],
        };
    }
    return { valid: true, duplicates: [] };
}

const testSuite = [
    { name: "should login successfully" },
    { name: "should show error on invalid password" },
    { name: "should login successfully" },           // duplicate!
    { name: "should redirect after login" },
    { name: "should show error on invalid password" }, // duplicate!
];

console.log("\n  Test name validation:");
const validation = validateUniqueTestNames(testSuite);
console.log("  Valid?", validation.valid);
console.log("  Duplicates:", validation.duplicates);

// Collect unique error types from test results
const testErrors = [
    { test: "test1", error: "TimeoutError" },
    { test: "test2", error: "AssertionError" },
    { test: "test3", error: "TimeoutError" },
    { test: "test4", error: "NetworkError" },
    { test: "test5", error: "AssertionError" },
    { test: "test6", error: "TimeoutError" },
];

const uniqueErrors = new Set(testErrors.map(t => t.error));
console.log("\n  Unique error types:", [...uniqueErrors]);
console.log("  Count:", uniqueErrors.size);

// === KEY TAKEAWAYS ===
// 1. Union: new Set([...a, ...b]) — combine all unique elements
// 2. Intersection: [...a].filter(x => b.has(x)) — elements in both
// 3. Difference: [...a].filter(x => !b.has(x)) — elements in a but not b
// 4. Deduplication: [...new Set(array)] — instant unique array
// 5. WeakSet: object-only, no iteration, allows GC — ideal for tracking/flagging
// 6. Set.has() is O(1) — much faster than Array.includes() for large collections
// 7. Convert with [...set] or Array.from(set) to use array methods
// 8. Java equivalent: HashSet for Set, no direct WeakSet equivalent
