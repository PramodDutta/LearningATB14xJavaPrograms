// Extra_05_Object_as_Dictionary.js
// Topic: Objects as Dictionary/Key-Value Stores - Part 5 of 6
// Extends: ex_30_Collection_Framework
//
// CONCEPT: Plain JavaScript objects are commonly used as dictionaries (key-value stores)
// with string keys. Object.fromEntries() creates objects from arrays of entries,
// enabling powerful transformations between Maps, arrays, and objects.
// JAVA COMPARISON: Similar to java.util.HashMap<String, Object> but with literal syntax.
// Object.fromEntries() is like Java's Map.ofEntries(Map.entry("a",1), ...).
// PLAYWRIGHT RELEVANCE: Objects-as-dictionaries are used for headers, query params,
// environment variables, locator mappings, and test data indexing.
// ============================================================

console.log("--- Example 1: Objects as key-value stores ---");

// Basic dictionary pattern
const httpStatusCodes = {
    200: "OK",
    201: "Created",
    204: "No Content",
    301: "Moved Permanently",
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    500: "Internal Server Error",
    503: "Service Unavailable",
};

console.log("  Status 200:", httpStatusCodes[200]);
console.log("  Status 404:", httpStatusCodes[404]);
console.log("  Status 999:", httpStatusCodes[999] || "Unknown");

// Dynamic lookup
function getStatusMessage(code) {
    return httpStatusCodes[code] || `Unknown status: ${code}`;
}
console.log("  Lookup 201:", getStatusMessage(201));
console.log("  Lookup 418:", getStatusMessage(418));

// Selector dictionary for page objects
const selectors = {
    loginEmail: "#email-input",
    loginPassword: "#password-input",
    loginButton: "button[type='submit']",
    errorMessage: ".error-alert",
    welcomeBanner: ".welcome-message",
    logoutLink: "a[href='/logout']",
};

console.log("\n  Selector dictionary:");
for (const [name, selector] of Object.entries(selectors)) {
    console.log(`    ${name}: "${selector}"`);
}

// Dynamic access with bracket notation
const fieldName = "loginEmail";
console.log(`\n  Dynamic access [${fieldName}]:`, selectors[fieldName]);

console.log("\n--- Example 2: Object.fromEntries() ---");

// From array of pairs
const pairs = [["name", "Alice"], ["age", 30], ["role", "admin"]];
const fromPairs = Object.fromEntries(pairs);
console.log("  From pairs:", fromPairs);

// From Map
const configMap = new Map([
    ["baseURL", "https://api.example.com"],
    ["timeout", 30000],
    ["retries", 3],
]);
const configObj = Object.fromEntries(configMap);
console.log("  From Map:", configObj);

// From filtered entries
const allSettings = { debug: true, verbose: false, timeout: 5000, retries: 3, _internal: "x" };
const publicSettings = Object.fromEntries(
    Object.entries(allSettings).filter(([key]) => !key.startsWith("_"))
);
console.log("\n  Filtered entries:", publicSettings);

// Transform values with entries/fromEntries round-trip
const prices = { widget: 10, gadget: 25.5, gizmo: 15.75 };
const formattedPrices = Object.fromEntries(
    Object.entries(prices).map(([item, price]) => [item, `$${price.toFixed(2)}`])
);
console.log("  Formatted prices:", formattedPrices);

// Swap keys and values
const colorCodes = { red: "#FF0000", green: "#00FF00", blue: "#0000FF" };
const codeToColor = Object.fromEntries(
    Object.entries(colorCodes).map(([name, code]) => [code, name])
);
console.log("\n  Swapped:", codeToColor);

// From URLSearchParams (browser/Node.js)
const searchParams = new URLSearchParams("q=playwright&page=1&lang=en");
const queryObj = Object.fromEntries(searchParams);
console.log("  From URLSearchParams:", queryObj);

console.log("\n--- Example 3: Converting between Maps and Objects ---");

// Object -> Map -> transform -> Object
const userData = {
    firstName: "Alice",
    lastName: "Smith",
    email: "alice@example.com",
    age: 30,
};

// Convert to Map for manipulation
const userMap = new Map(Object.entries(userData));
console.log("  User as Map, size:", userMap.size);

// Add computed entries
userMap.set("fullName", `${userMap.get("firstName")} ${userMap.get("lastName")}`);
userMap.set("isAdult", userMap.get("age") >= 18);

// Convert back to Object
const enrichedUser = Object.fromEntries(userMap);
console.log("  Enriched user:", enrichedUser);

// Pattern: merge objects via Map (explicit control over conflicts)
function mergeWithStrategy(base, override, strategy = "override") {
    const merged = new Map(Object.entries(base));

    for (const [key, value] of Object.entries(override)) {
        if (merged.has(key)) {
            switch (strategy) {
                case "override":
                    merged.set(key, value);
                    break;
                case "keep":
                    // keep base value — do nothing
                    break;
                case "concat":
                    merged.set(key, `${merged.get(key)}, ${value}`);
                    break;
                case "array":
                    const existing = merged.get(key);
                    merged.set(key, Array.isArray(existing) ? [...existing, value] : [existing, value]);
                    break;
            }
        } else {
            merged.set(key, value);
        }
    }

    return Object.fromEntries(merged);
}

const base = { a: 1, b: 2, c: 3 };
const over = { b: 20, c: 30, d: 40 };

console.log("\n  Merge strategies:");
console.log("  override:", mergeWithStrategy(base, over, "override"));
console.log("  keep:", mergeWithStrategy(base, over, "keep"));

const tags1 = { env: "staging", team: "frontend" };
const tags2 = { env: "prod", region: "us-east" };
console.log("  concat:", mergeWithStrategy(tags1, tags2, "concat"));

console.log("\n--- Example 4: Dynamic property access patterns ---");

// Bracket notation for dynamic keys
const testData = {
    login_username: "admin",
    login_password: "pass123",
    register_username: "newuser",
    register_password: "newpass",
    register_email: "new@test.com",
};

// Extract all fields for a given prefix
function getFieldsByPrefix(data, prefix) {
    return Object.fromEntries(
        Object.entries(data)
            .filter(([key]) => key.startsWith(prefix + "_"))
            .map(([key, value]) => [key.replace(prefix + "_", ""), value])
    );
}

console.log("  Login fields:", getFieldsByPrefix(testData, "login"));
console.log("  Register fields:", getFieldsByPrefix(testData, "register"));

// Dynamic property path access
function getNestedValue(obj, path) {
    return path.split(".").reduce((current, key) => current?.[key], obj);
}

const complexData = {
    user: {
        profile: {
            name: "Alice",
            address: { city: "Portland", zip: "97201" },
        },
        settings: { theme: "dark", lang: "en" },
    },
};

console.log("\n  Path access:");
console.log("  user.profile.name:", getNestedValue(complexData, "user.profile.name"));
console.log("  user.profile.address.city:", getNestedValue(complexData, "user.profile.address.city"));
console.log("  user.settings.theme:", getNestedValue(complexData, "user.settings.theme"));
console.log("  user.missing.path:", getNestedValue(complexData, "user.missing.path")); // undefined

// Dynamic property setter
function setNestedValue(obj, path, value) {
    const keys = path.split(".");
    const lastKey = keys.pop();
    const target = keys.reduce((current, key) => {
        if (!current[key]) current[key] = {};
        return current[key];
    }, obj);
    target[lastKey] = value;
    return obj;
}

const config = {};
setNestedValue(config, "database.host", "localhost");
setNestedValue(config, "database.port", 5432);
setNestedValue(config, "app.debug", true);
console.log("\n  Built config:", JSON.stringify(config, null, 2));

console.log("\n--- Example 5: Practical dictionary patterns ---");

// Pattern: Lookup table for test data
const environmentUrls = {
    dev: "http://localhost:3000",
    staging: "https://staging.example.com",
    prod: "https://www.example.com",
};

const env = "staging"; // process.env.TEST_ENV || 'dev'
console.log(`  Environment URL [${env}]:`, environmentUrls[env]);

// Pattern: Mapping test status to display info
const statusDisplay = {
    passed: { label: "PASSED", color: "green" },
    failed: { label: "FAILED", color: "red" },
    skipped: { label: "SKIPPED", color: "yellow" },
    pending: { label: "PENDING", color: "gray" },
};

const results = ["passed", "failed", "passed", "skipped", "passed", "failed"];
console.log("\n  Test results display:");
for (const status of results) {
    const { label, color } = statusDisplay[status];
    console.log(`    [${label}] (${color})`);
}

// Pattern: Building an index from an array
const products = [
    { id: "P001", name: "Widget A", price: 29.99 },
    { id: "P002", name: "Widget B", price: 49.99 },
    { id: "P003", name: "Widget C", price: 19.99 },
];

const productIndex = Object.fromEntries(
    products.map(product => [product.id, product])
);

console.log("\n  Product index lookup:");
console.log("  P002:", productIndex["P002"].name, "$" + productIndex["P002"].price);

// Pattern: Counting with objects
const errorLog = [
    "TimeoutError", "AssertionError", "TimeoutError",
    "NetworkError", "TimeoutError", "AssertionError",
    "TypeError", "NetworkError", "TimeoutError",
];

const errorCounts = errorLog.reduce((counts, error) => {
    counts[error] = (counts[error] || 0) + 1;
    return counts;
}, {});

console.log("\n  Error counts:", errorCounts);

// Sort by count
const sortedErrors = Object.entries(errorCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([error, count]) => `${error}: ${count}`);
console.log("  Sorted:", sortedErrors);

// === KEY TAKEAWAYS ===
// 1. Objects work as dictionaries: obj[key] for dynamic access, obj.key for static
// 2. Object.fromEntries() creates objects from [key, value] pairs — inverse of Object.entries()
// 3. Map <-> Object: Object.entries() to convert to Map, Object.fromEntries() to convert back
// 4. Bracket notation obj[variable] enables dynamic property access by variable
// 5. getNestedValue with path.split('.').reduce() for deep property access
// 6. Use objects for lookup tables, indexes, counts, and configuration dictionaries
// 7. Object.fromEntries(array.map(...)) is the pattern for key-value transformations
// 8. Java equivalent: HashMap for dictionaries, but JS objects have literal syntax advantage
