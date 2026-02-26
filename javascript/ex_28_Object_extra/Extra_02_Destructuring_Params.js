// Extra_02_Destructuring_Params.js
// Topic: Function Parameter Destructuring - Part 2 of 7
// Extends: ex_28_Object
//
// CONCEPT: Function parameters can be destructured directly in the function signature,
// allowing you to pull out exactly the properties you need from an object argument.
// This eliminates repetitive `options.property` access and makes APIs self-documenting.
// JAVA COMPARISON: Java has no parameter destructuring. You pass an object and call
// getters: `void greet(Person p) { p.getName(); }`. Builder pattern is the closest analog.
// PLAYWRIGHT RELEVANCE: Playwright test functions use this pattern extensively:
// `test('title', async ({ page, context, browser }) => { })` destructures test fixtures.
// ============================================================

console.log("--- Example 1: Basic parameter destructuring ---");

// Without destructuring — verbose
function greetOld(person) {
    console.log(`  Hello, ${person.name}! You are ${person.age} years old.`);
}

// With destructuring — clean and explicit
function greet({ name, age }) {
    console.log(`  Hello, ${name}! You are ${age} years old.`);
}

greet({ name: "Alice", age: 30 });
greet({ name: "Bob", age: 25, email: "bob@test.com" }); // extra props ignored

// Destructuring with remaining properties
function processUser({ name, role, ...metadata }) {
    console.log(`  User: ${name} (${role})`);
    console.log(`  Metadata:`, metadata);
}

processUser({ name: "Charlie", role: "admin", lastLogin: "2024-01-15", loginCount: 42 });

console.log("\n--- Example 2: Default values in parameter destructuring ---");

function createConnection({
    host = "localhost",
    port = 5432,
    database = "testdb",
    ssl = false,
    timeout = 5000,
    poolSize = 10,
} = {}) {   // = {} means the entire parameter defaults to empty object
    console.log(`  Connection: ${host}:${port}/${database}`);
    console.log(`  SSL: ${ssl}, Timeout: ${timeout}ms, Pool: ${poolSize}`);
    return { host, port, database, ssl, timeout, poolSize };
}

// All defaults
console.log("  All defaults:");
createConnection();

// Partial override
console.log("\n  Partial override:");
createConnection({ host: "prod-db.example.com", ssl: true, port: 5433 });

// Full override
console.log("\n  Full override:");
createConnection({
    host: "staging-db.example.com",
    port: 5434,
    database: "staging_app",
    ssl: true,
    timeout: 10000,
    poolSize: 20,
});

console.log("\n--- Example 3: Playwright fixture pattern simulation ---");

// This simulates how Playwright test fixtures work
// test('example', async ({ page, context, browser }) => { ... })

class TestFixtures {
    constructor() {
        this._fixtures = {
            page: {
                goto: (url) => console.log(`    page.goto("${url}")`),
                click: (sel) => console.log(`    page.click("${sel}")`),
                fill: (sel, val) => console.log(`    page.fill("${sel}", "${val}")`),
                title: () => "Test Page Title",
            },
            context: {
                newPage: () => console.log("    context.newPage()"),
                clearCookies: () => console.log("    context.clearCookies()"),
                storageState: () => ({ cookies: [], origins: [] }),
            },
            browser: {
                newContext: () => console.log("    browser.newContext()"),
                close: () => console.log("    browser.close()"),
                version: () => "chromium-120.0",
            },
            request: {
                get: (url) => console.log(`    request.get("${url}")`),
                post: (url, data) => console.log(`    request.post("${url}", ${JSON.stringify(data)})`),
            },
        };
    }

    getFixtures() {
        return this._fixtures;
    }
}

// Simulated test function that destructures fixtures
function test(title, testFn) {
    console.log(`  Test: "${title}"`);
    const fixtures = new TestFixtures().getFixtures();
    testFn(fixtures); // passes the full fixture object; test destructures what it needs
    console.log();
}

// Test using only page
test("should navigate to homepage", ({ page }) => {
    page.goto("https://example.com");
    console.log(`    Title: ${page.title()}`);
});

// Test using page and context
test("should clear cookies and navigate", ({ page, context }) => {
    context.clearCookies();
    page.goto("https://example.com/login");
});

// Test using page, context, and request
test("should test API and UI together", ({ page, request, browser }) => {
    console.log(`    Browser: ${browser.version()}`);
    request.post("/api/users", { name: "TestUser" });
    page.goto("https://example.com/users");
});

console.log("\n--- Example 4: Nested parameter destructuring ---");

function processOrder({
    orderId,
    customer: { name: customerName, email: customerEmail },
    items,
    shipping: { method = "standard", address: { city, zip } },
}) {
    console.log(`  Order #${orderId} for ${customerName} (${customerEmail})`);
    console.log(`  Shipping: ${method} to ${city} ${zip}`);
    console.log(`  Items: ${items.length} item(s)`);
    for (const { product, qty, price } of items) {
        console.log(`    - ${product} x${qty} @ $${price}`);
    }
}

processOrder({
    orderId: "ORD-2024-001",
    customer: {
        name: "Alice Smith",
        email: "alice@example.com",
    },
    items: [
        { product: "Widget A", qty: 2, price: 29.99 },
        { product: "Widget B", qty: 1, price: 49.99 },
    ],
    shipping: {
        method: "express",
        address: {
            street: "123 Main St",
            city: "Portland",
            zip: "97201",
        },
    },
});

console.log("\n  With defaults for missing nested:");
function createTestConfig({
    browser: { name: browserName = "chromium", headless = true } = {},
    viewport: { width = 1280, height = 720 } = {},
    retry: { count: retryCount = 2, delay: retryDelay = 1000 } = {},
} = {}) {
    console.log(`  Browser: ${browserName} (headless: ${headless})`);
    console.log(`  Viewport: ${width}x${height}`);
    console.log(`  Retry: ${retryCount} attempts, ${retryDelay}ms delay`);
}

createTestConfig();  // all defaults
console.log();
createTestConfig({ browser: { name: "firefox" }, viewport: { width: 1920, height: 1080 } });

console.log("\n--- Example 5: Real-world config and factory patterns ---");

// Pattern: Factory function with config object
function createApiClient({
    baseURL,
    version = "v1",
    timeout = 10000,
    headers = {},
    auth: { type: authType = "none", token = null } = {},
    retry: { maxAttempts = 3, backoffMs = 500 } = {},
} = {}) {
    const client = {
        baseURL: `${baseURL}/${version}`,
        timeout,
        headers: {
            "Content-Type": "application/json",
            ...headers,
            ...(authType === "bearer" && token ? { Authorization: `Bearer ${token}` } : {}),
        },
        retryConfig: { maxAttempts, backoffMs },

        describe() {
            console.log(`  API Client: ${this.baseURL}`);
            console.log(`  Timeout: ${this.timeout}ms`);
            console.log(`  Headers:`, JSON.stringify(this.headers));
            console.log(`  Retry: ${this.retryConfig.maxAttempts} attempts`);
        },
    };

    return client;
}

console.log("  Minimal config:");
createApiClient({ baseURL: "https://api.example.com" }).describe();

console.log("\n  Full config:");
createApiClient({
    baseURL: "https://api.prod.com",
    version: "v2",
    timeout: 30000,
    headers: { "X-Request-ID": "abc-123" },
    auth: { type: "bearer", token: "eyJhbGciOiJIUzI1NiJ9..." },
    retry: { maxAttempts: 5, backoffMs: 1000 },
}).describe();

// Pattern: callback with destructured event
function onTestResult({ testName, status, duration, error = null }) {
    const icon = status === "passed" ? "PASS" : "FAIL";
    console.log(`\n  [${icon}] ${testName} (${duration}ms)`);
    if (error) {
        console.log(`    Error: ${error}`);
    }
}

onTestResult({ testName: "login_test", status: "passed", duration: 1250 });
onTestResult({ testName: "checkout_test", status: "failed", duration: 30500, error: "Timeout" });

// === KEY TAKEAWAYS ===
// 1. function f({ a, b }) — destructures the first parameter as an object
// 2. function f({ a = 1, b = 2 } = {}) — defaults for properties AND the whole param
// 3. The = {} default means calling f() with no arguments won't throw
// 4. Nested: function f({ outer: { inner } }) reaches into nested objects
// 5. Rest: function f({ known, ...rest }) collects remaining props
// 6. Playwright pattern: async ({ page, context }) => { } destructures test fixtures
// 7. Config objects replace long parameter lists — self-documenting and order-independent
// 8. Java equivalent requires a builder pattern or config class with getters
