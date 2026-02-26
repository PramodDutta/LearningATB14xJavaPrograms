// Extra_01_Destructuring_Objects.js
// Topic: Object Destructuring - Part 1 of 7
// Extends: ex_28_Object
//
// CONCEPT: Destructuring assignment extracts values from objects into individual
// variables in a single, concise statement. It supports renaming, default values,
// and nested extraction — replacing verbose multi-line property access.
// JAVA COMPARISON: Java has no destructuring. You must write person.getName(),
// person.getAge() etc. Record patterns in Java 21 preview offer similar extraction.
// PLAYWRIGHT RELEVANCE: Destructuring is used everywhere in Playwright —
// `const { page } = await browser.newContext()`, test fixtures, config objects.
// ============================================================

console.log("--- Example 1: Basic object destructuring ---");

const person = {
    name: "Alice",
    age: 30,
    email: "alice@example.com",
    role: "engineer",
};

// Without destructuring (verbose)
const nameOld = person.name;
const ageOld = person.age;
console.log("  Old way:", nameOld, ageOld);

// With destructuring (concise)
const { name, age, email, role } = person;
console.log("  Destructured:", name, age, email, role);

// You don't have to extract all properties
const { name: justName } = person;
console.log("  Just name:", justName);

// Order doesn't matter — it matches by property name
const { role: r, age: a, name: n } = person;
console.log("  Any order:", n, a, r);

console.log("\n--- Example 2: Renaming with aliases ---");

const apiResponse = {
    user_name: "bob_dev",
    user_id: 42,
    is_active: true,
    created_at: "2024-01-15",
};

// Rename snake_case to camelCase
const {
    user_name: userName,
    user_id: userId,
    is_active: isActive,
    created_at: createdAt,
} = apiResponse;

console.log("  userName:", userName);
console.log("  userId:", userId);
console.log("  isActive:", isActive);
console.log("  createdAt:", createdAt);

// Real-world: renaming to avoid conflicts
const config1 = { timeout: 5000 };
const config2 = { timeout: 10000 };
const { timeout: defaultTimeout } = config1;
const { timeout: extendedTimeout } = config2;
console.log("  Default timeout:", defaultTimeout, "Extended:", extendedTimeout);

console.log("\n--- Example 3: Default values ---");

const partialUser = {
    name: "Charlie",
    email: "charlie@test.com",
};

// 'role' is missing — default kicks in
// 'name' exists — default is ignored
const {
    name: userName3,
    email: userEmail,
    role: userRole = "viewer",        // default: "viewer"
    department = "engineering",       // default: "engineering"
    notifications = true,             // default: true
} = partialUser;

console.log("  name:", userName3);           // "Charlie" (from object)
console.log("  role:", userRole);            // "viewer" (default)
console.log("  department:", department);    // "engineering" (default)
console.log("  notifications:", notifications); // true (default)

// Default only applies when value is undefined, NOT null or 0
const testDefaults = { a: undefined, b: null, c: 0, d: "", e: false };
const {
    a: valA = "default_a",
    b: valB = "default_b",
    c: valC = "default_c",
    d: valD = "default_d",
    e: valE = "default_e",
} = testDefaults;

console.log("\n  Defaults with falsy values:");
console.log("  a (was undefined):", valA);  // "default_a" — default applied
console.log("  b (was null):", valB);       // null — default NOT applied
console.log("  c (was 0):", valC);          // 0 — default NOT applied
console.log("  d (was ''):", valD);         // "" — default NOT applied
console.log("  e (was false):", valE);      // false — default NOT applied

console.log("\n--- Example 4: Nested destructuring ---");

const company = {
    name: "TechCorp",
    address: {
        street: "123 Main St",
        city: "San Francisco",
        state: "CA",
        zip: "94102",
    },
    ceo: {
        name: "Diana Prince",
        contact: {
            email: "diana@techcorp.com",
            phone: "555-0100",
        },
    },
};

// Extract nested properties
const {
    name: companyName,
    address: { city, state, zip },
    ceo: {
        name: ceoName,
        contact: { email: ceoEmail },
    },
} = company;

console.log("  Company:", companyName);
console.log("  Location:", city, state, zip);
console.log("  CEO:", ceoName);
console.log("  CEO email:", ceoEmail);

// Nested with defaults
const serverConfig = {
    host: "localhost",
    database: {
        name: "testdb",
        // port is missing
    },
};

const {
    host,
    database: {
        name: dbName,
        port: dbPort = 5432,           // default for missing nested prop
        ssl: dbSsl = false,
    },
} = serverConfig;

console.log("\n  Server:", host);
console.log("  DB:", dbName, "port:", dbPort, "ssl:", dbSsl);

console.log("\n--- Example 5: Rest pattern and practical combinations ---");

// The rest pattern (...rest) collects remaining properties
const fullConfig = {
    baseURL: "https://api.example.com",
    timeout: 30000,
    retries: 3,
    headers: { "Content-Type": "application/json" },
    verbose: true,
    logLevel: "debug",
};

const { baseURL, timeout, ...remainingConfig } = fullConfig;
console.log("  Extracted — baseURL:", baseURL, "timeout:", timeout);
console.log("  Remaining:", remainingConfig);
// remainingConfig = { retries: 3, headers: {...}, verbose: true, logLevel: "debug" }

// Practical: extracting known fields, forwarding the rest
function createClient({ baseURL, timeout, ...options }) {
    console.log(`\n  Client created: ${baseURL} (timeout: ${timeout}ms)`);
    console.log("  Additional options:", JSON.stringify(options));
    return { baseURL, timeout, options };
}

createClient({
    baseURL: "https://staging.api.com",
    timeout: 5000,
    retries: 2,
    auth: "Bearer token123",
});

// Destructuring in loops
console.log("\n  Destructuring in for...of loop:");
const users = [
    { id: 1, name: "Alice", score: 95 },
    { id: 2, name: "Bob", score: 82 },
    { id: 3, name: "Charlie", score: 91 },
];

for (const { name: studentName, score } of users) {
    const grade = score >= 90 ? "A" : score >= 80 ? "B" : "C";
    console.log(`    ${studentName}: ${score} (${grade})`);
}

// === KEY TAKEAWAYS ===
// 1. const { prop } = obj extracts obj.prop into a local variable called prop
// 2. Rename with { prop: newName } — the LEFT side is the key, RIGHT side is the variable
// 3. Defaults { prop = value } only apply when the property is undefined (not null/0/false)
// 4. Nested destructuring { outer: { inner } } reaches deep into objects
// 5. Rest pattern { known, ...rest } collects everything else into a new object
// 6. Works in for...of loops: for (const { name, age } of array) { }
// 7. Java has no equivalent — you must use getter methods or record patterns (preview)
// 8. Playwright: destructuring is idiomatic — const { page, context, browser } = fixtures
