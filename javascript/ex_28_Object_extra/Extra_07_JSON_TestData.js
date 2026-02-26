// Extra_07_JSON_TestData.js
// Topic: JSON as Test Data Source - Part 7 of 7
// Extends: ex_28_Object
//
// CONCEPT: JSON is the ideal format for test data — fixture data, test case parameters,
// environment configs, and expected results. Loading test data from JSON separates data
// from test logic, making tests data-driven and easy to maintain.
// JAVA COMPARISON: Java uses JSON files with Jackson/Gson, or CSV with OpenCSV, or
// Excel with Apache POI for data-driven tests. TestNG @DataProvider is the closest pattern.
// PLAYWRIGHT RELEVANCE: Playwright projects commonly use JSON fixtures for test data,
// environment configs, and API request/response mocking.
// ============================================================

console.log("--- Example 1: Using JSON as test data source ---");

// In real code: const testData = require('./testdata/users.json');
// Here we define the JSON inline to keep the file self-contained
const usersTestData = JSON.parse(JSON.stringify([
    {
        testId: "TC001",
        description: "Valid user login",
        input: { email: "admin@example.com", password: "Admin123!" },
        expected: { success: true, role: "admin", redirectTo: "/dashboard" },
    },
    {
        testId: "TC002",
        description: "Invalid password",
        input: { email: "admin@example.com", password: "wrong" },
        expected: { success: false, error: "Invalid credentials" },
    },
    {
        testId: "TC003",
        description: "Unregistered email",
        input: { email: "nobody@example.com", password: "any" },
        expected: { success: false, error: "User not found" },
    },
    {
        testId: "TC004",
        description: "Empty email",
        input: { email: "", password: "Admin123!" },
        expected: { success: false, error: "Email is required" },
    },
    {
        testId: "TC005",
        description: "SQL injection attempt",
        input: { email: "' OR 1=1 --", password: "test" },
        expected: { success: false, error: "Invalid email format" },
    },
]));

// Simulate login function
function simulateLogin(email, password) {
    if (!email) return { success: false, error: "Email is required" };
    if (!email.includes("@")) return { success: false, error: "Invalid email format" };
    if (email === "admin@example.com" && password === "Admin123!") {
        return { success: true, role: "admin", redirectTo: "/dashboard" };
    }
    if (email === "admin@example.com") return { success: false, error: "Invalid credentials" };
    return { success: false, error: "User not found" };
}

// Data-driven testing pattern
console.log("  Running data-driven login tests:\n");
let passCount = 0;
let failCount = 0;

for (const testCase of usersTestData) {
    const { testId, description, input, expected } = testCase;
    const actual = simulateLogin(input.email, input.password);

    const passed = JSON.stringify(actual) === JSON.stringify(expected);
    if (passed) passCount++;
    else failCount++;

    console.log(`  [${passed ? "PASS" : "FAIL"}] ${testId}: ${description}`);
    if (!passed) {
        console.log(`    Expected: ${JSON.stringify(expected)}`);
        console.log(`    Actual:   ${JSON.stringify(actual)}`);
    }
}
console.log(`\n  Results: ${passCount} passed, ${failCount} failed`);

console.log("\n--- Example 2: Loading fixture data ---");

// Fixture data represents pre-existing state for tests
const fixtureData = {
    users: [
        { id: 1, name: "Alice Admin", email: "alice@test.com", role: "admin" },
        { id: 2, name: "Bob User", email: "bob@test.com", role: "user" },
        { id: 3, name: "Charlie Guest", email: "charlie@test.com", role: "guest" },
    ],
    products: [
        { id: 101, name: "Widget A", price: 29.99, stock: 50 },
        { id: 102, name: "Widget B", price: 49.99, stock: 0 },
        { id: 103, name: "Widget C", price: 19.99, stock: 100 },
    ],
    orders: [
        { id: 1001, userId: 1, productId: 101, quantity: 2, status: "completed" },
        { id: 1002, userId: 2, productId: 103, quantity: 1, status: "pending" },
    ],
};

// Using fixtures in tests
console.log("  Fixture-based test scenarios:\n");

// Test: Admin can see all users
const adminUser = fixtureData.users.find(u => u.role === "admin");
const allUsers = fixtureData.users;
console.log(`  Admin "${adminUser.name}" sees ${allUsers.length} users: ${allUsers.map(u => u.name).join(", ")}`);

// Test: Out-of-stock product
const outOfStock = fixtureData.products.filter(p => p.stock === 0);
console.log(`  Out of stock products: ${outOfStock.map(p => p.name).join(", ")}`);

// Test: User's orders
const bobOrders = fixtureData.orders.filter(o => o.userId === 2);
console.log(`  Bob's orders: ${bobOrders.length} (IDs: ${bobOrders.map(o => o.id).join(", ")})`);

// Helper: get product name by ID
function getProductName(id) {
    return fixtureData.products.find(p => p.id === id)?.name || "Unknown";
}

// Test: Order details
for (const order of fixtureData.orders) {
    const user = fixtureData.users.find(u => u.id === order.userId);
    const product = getProductName(order.productId);
    console.log(`  Order #${order.id}: ${user.name} bought ${order.quantity}x ${product} [${order.status}]`);
}

console.log("\n--- Example 3: Iterating over test cases from JSON arrays ---");

// Search test scenarios
const searchTestCases = [
    { query: "widget", expectedCount: 3, expectedFirst: "Widget A" },
    { query: "Widget B", expectedCount: 1, expectedFirst: "Widget B" },
    { query: "nonexistent", expectedCount: 0, expectedFirst: null },
    { query: "", expectedCount: 3, expectedFirst: "Widget A" },
    { query: "w", expectedCount: 3, expectedFirst: "Widget A" },
];

function simulateSearch(query, products) {
    if (!query) return products;
    return products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase())
    );
}

console.log("  Search test results:\n");
for (const tc of searchTestCases) {
    const results = simulateSearch(tc.query, fixtureData.products);
    const countMatch = results.length === tc.expectedCount;
    const firstMatch = tc.expectedFirst === null
        ? results.length === 0
        : results[0]?.name === tc.expectedFirst;

    const passed = countMatch && firstMatch;
    console.log(`  [${passed ? "PASS" : "FAIL"}] query="${tc.query}" -> ${results.length} results`);
    if (!passed) {
        console.log(`    Expected: count=${tc.expectedCount}, first="${tc.expectedFirst}"`);
        console.log(`    Actual:   count=${results.length}, first="${results[0]?.name || "none"}"`);
    }
}

console.log("\n--- Example 4: Building test data objects ---");

// Factory functions that build test data
function createUser(overrides = {}) {
    const defaults = {
        id: Math.floor(Math.random() * 10000),
        name: "Test User",
        email: "test@example.com",
        role: "user",
        active: true,
        createdAt: new Date().toISOString(),
    };
    return { ...defaults, ...overrides };
}

function createProduct(overrides = {}) {
    const defaults = {
        id: Math.floor(Math.random() * 10000),
        name: "Test Product",
        price: 9.99,
        stock: 10,
        category: "general",
    };
    return { ...defaults, ...overrides };
}

function createOrder(userId, productId, overrides = {}) {
    const defaults = {
        id: Math.floor(Math.random() * 100000),
        userId,
        productId,
        quantity: 1,
        status: "pending",
        createdAt: new Date().toISOString(),
    };
    return { ...defaults, ...overrides };
}

// Build test scenarios with factories
console.log("  Generated test users:");
const testAdmin = createUser({ name: "Admin Test", role: "admin" });
const testGuest = createUser({ name: "Guest Test", role: "guest", active: false });
console.log("  Admin:", JSON.stringify(testAdmin));
console.log("  Guest:", JSON.stringify(testGuest));

// Build a complete test scenario
const scenario = {
    user: createUser({ name: "Buyer", role: "user" }),
    products: [
        createProduct({ name: "Premium Widget", price: 99.99, stock: 5 }),
        createProduct({ name: "Basic Widget", price: 19.99, stock: 100 }),
    ],
};
scenario.orders = [
    createOrder(scenario.user.id, scenario.products[0].id, { quantity: 2 }),
    createOrder(scenario.user.id, scenario.products[1].id, { quantity: 1 }),
];

console.log("\n  Complete test scenario:");
console.log("  User:", scenario.user.name);
console.log("  Products:", scenario.products.map(p => `${p.name} ($${p.price})`).join(", "));
console.log("  Orders:", scenario.orders.length);

// Batch generation
const bulkUsers = Array.from({ length: 5 }, (_, i) =>
    createUser({ name: `User ${i + 1}`, email: `user${i + 1}@test.com` })
);
console.log("\n  Bulk users:", bulkUsers.map(u => u.name).join(", "));

console.log("\n--- Example 5: Environment-specific test data ---");

// Pattern: Different data per environment
const envConfigs = {
    local: {
        baseURL: "http://localhost:3000",
        apiURL: "http://localhost:3001/api",
        credentials: { username: "dev_admin", password: "dev123" },
        timeout: 60000,
        headless: false,
        retries: 0,
    },
    ci: {
        baseURL: "https://staging.example.com",
        apiURL: "https://staging-api.example.com/api",
        credentials: { username: "ci_tester", password: "ci_pass_123" },
        timeout: 30000,
        headless: true,
        retries: 2,
    },
    prod: {
        baseURL: "https://www.example.com",
        apiURL: "https://api.example.com/api",
        credentials: { username: "monitor_user", password: "monitor_pass" },
        timeout: 15000,
        headless: true,
        retries: 3,
    },
};

// Select environment from env var (simulated)
function getTestConfig(envName) {
    // In real code: const env = process.env.TEST_ENV || 'local';
    const env = envName || "local";
    const config = envConfigs[env];

    if (!config) {
        throw new Error(`Unknown environment: ${env}. Valid: ${Object.keys(envConfigs).join(", ")}`);
    }

    console.log(`  Environment: ${env}`);
    console.log(`  Base URL: ${config.baseURL}`);
    console.log(`  API URL: ${config.apiURL}`);
    console.log(`  Headless: ${config.headless}`);
    console.log(`  Timeout: ${config.timeout}ms`);
    console.log(`  Retries: ${config.retries}`);

    return config;
}

for (const env of ["local", "ci", "prod"]) {
    getTestConfig(env);
    console.log();
}

// Pattern: Playwright config using env-specific data
console.log("  Playwright config pattern:");
console.log(`
  // playwright.config.js
  // const env = process.env.TEST_ENV || 'local';
  // const testData = require(\`./data/\${env}.json\`);
  //
  // module.exports = {
  //     use: {
  //         baseURL: testData.baseURL,
  //         headless: testData.headless,
  //         actionTimeout: testData.timeout,
  //     },
  //     retries: testData.retries,
  // };
`);

// Data matrix: run same test across multiple data sets
const browserMatrix = ["chromium", "firefox", "webkit"];
const viewports = [
    { name: "desktop", width: 1280, height: 720 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "mobile", width: 375, height: 667 },
];

console.log("  Test matrix (browser x viewport):");
for (const browser of browserMatrix) {
    for (const viewport of viewports) {
        console.log(`    ${browser} @ ${viewport.name} (${viewport.width}x${viewport.height})`);
    }
}
console.log(`  Total combinations: ${browserMatrix.length * viewports.length}`);

// === KEY TAKEAWAYS ===
// 1. JSON files are the standard way to store test data — separates data from logic
// 2. Data-driven testing: iterate over JSON arrays, each object is a test case
// 3. Fixture data provides pre-existing state (users, products) that tests rely on
// 4. Factory functions (createUser, createProduct) generate test data with customizable overrides
// 5. Environment-specific configs let the same tests run against local, staging, or prod
// 6. JSON.stringify/parse round-trip creates independent copies of test data
// 7. Test matrix: combine JSON arrays for cross-browser/viewport parameterized testing
// 8. Playwright pattern: require(`./data/${env}.json`) for environment-specific configuration
