// Extra_01_Parameterized_Tests.js
// Topic: Data-Driven Testing - Part 1 of 6
// Extends: New Topic
//
// CONCEPT: Parameterized (data-driven) tests run the same test logic with
// different sets of input data. Instead of writing 10 separate test functions
// that differ only in their data, you define an array of test data objects and
// loop through them, calling a single test function for each. This dramatically
// reduces code duplication and makes it easy to add new test cases.
//
// JAVA COMPARISON: In Java TestNG, you use @DataProvider to supply test data.
// In JUnit 5, you use @ParameterizedTest with @ValueSource, @CsvSource, or
// @MethodSource. The concept is identical — only the mechanism differs.
//
// PLAYWRIGHT RELEVANCE: Playwright supports data-driven tests by iterating over
// arrays and calling test() for each data set. The pattern is:
// `for (const data of testData) { test(data.name, async ({page}) => { ... }); }`
// ============================================================

console.log("=== EXTRA 01: PARAMETERIZED / DATA-DRIVEN TESTS ===\n");

// ---------------------------------------------------------------
// Example 1: The Problem — Repetitive Test Functions
// ---------------------------------------------------------------
console.log("--- Example 1: The Problem — Duplicated Test Logic ---");

// Without data-driven approach: each test is nearly identical
function testLoginValidAdmin() {
    const user = "admin", pass = "admin123", expectedRole = "Administrator";
    // ... same login logic ...
    return { user, pass, expectedRole, result: "PASS" };
}

function testLoginValidEditor() {
    const user = "editor", pass = "editor456", expectedRole = "Editor";
    // ... same login logic (copy-pasted!) ...
    return { user, pass, expectedRole, result: "PASS" };
}

function testLoginValidViewer() {
    const user = "viewer", pass = "viewer789", expectedRole = "Viewer";
    // ... same login logic (copy-pasted again!) ...
    return { user, pass, expectedRole, result: "PASS" };
}

console.log("  Without data-driven testing:");
console.log("    testLoginValidAdmin()  -> duplicate logic");
console.log("    testLoginValidEditor() -> duplicate logic");
console.log("    testLoginValidViewer() -> duplicate logic");
console.log("  3 functions with IDENTICAL logic, only data differs!");
console.log("  10 test cases = 10 functions. Bug fix = update all 10.\n");

// ---------------------------------------------------------------
// Example 2: The Solution — Array of Test Data
// ---------------------------------------------------------------
console.log("--- Example 2: The Solution — Test Data Array + Loop ---");

const loginTestData = [
    { username: "admin",    password: "admin123",   expectedRole: "Administrator", shouldPass: true },
    { username: "editor",   password: "editor456",  expectedRole: "Editor",        shouldPass: true },
    { username: "viewer",   password: "viewer789",  expectedRole: "Viewer",        shouldPass: true },
    { username: "guest",    password: "guest000",   expectedRole: "Guest",         shouldPass: true },
    { username: "invalid",  password: "wrong",      expectedRole: null,            shouldPass: false },
    { username: "",         password: "",            expectedRole: null,            shouldPass: false },
    { username: "admin",    password: "wrongpass",   expectedRole: null,            shouldPass: false },
];

// Simulated login function
function simulateLogin(username, password) {
    const validUsers = {
        "admin": { role: "Administrator" },
        "editor": { role: "Editor" },
        "viewer": { role: "Viewer" },
        "guest": { role: "Guest" },
    };
    if (validUsers[username] && password === username + (username === "admin" ? "123" : username === "editor" ? "456" : username === "viewer" ? "789" : "000")) {
        return { success: true, role: validUsers[username].role };
    }
    return { success: false, role: null };
}

// ONE test function, called for EACH data set
function testLogin(data) {
    const result = simulateLogin(data.username, data.password);
    const passed = result.success === data.shouldPass &&
                   (data.shouldPass ? result.role === data.expectedRole : true);
    return passed;
}

console.log("  Test data array (7 test cases):");
console.log(`  ${"#".padEnd(4)} ${"Username".padEnd(12)} ${"Password".padEnd(14)} ${"Expected Role".padEnd(18)} ${"Should Pass".padEnd(13)} Result`);
console.log("  " + "-".repeat(75));

loginTestData.forEach((data, index) => {
    const passed = testLogin(data);
    const status = passed ? "PASS" : "FAIL";
    console.log(`  ${String(index + 1).padEnd(4)} ${(data.username || "(empty)").padEnd(12)} ${(data.password || "(empty)").padEnd(14)} ${String(data.expectedRole || "N/A").padEnd(18)} ${String(data.shouldPass).padEnd(13)} ${status}`);
});
console.log();

// ---------------------------------------------------------------
// Example 3: Different Input Types, Different Outputs
// ---------------------------------------------------------------
console.log("--- Example 3: Multiple Input/Output Combinations ---");

const calculatorTestData = [
    { a: 10,   b: 5,    operation: "add",      expected: 15 },
    { a: 10,   b: 5,    operation: "subtract",  expected: 5 },
    { a: 10,   b: 5,    operation: "multiply",  expected: 50 },
    { a: 10,   b: 5,    operation: "divide",    expected: 2 },
    { a: 0,    b: 5,    operation: "add",       expected: 5 },
    { a: -3,   b: 7,    operation: "add",       expected: 4 },
    { a: 100,  b: 0,    operation: "divide",    expected: "Error" },
    { a: 2.5,  b: 1.5,  operation: "add",       expected: 4 },
];

function calculate(a, b, operation) {
    switch (operation) {
        case "add":       return a + b;
        case "subtract":  return a - b;
        case "multiply":  return a * b;
        case "divide":    return b === 0 ? "Error" : a / b;
        default:          return "Unknown operation";
    }
}

function testCalculation(data) {
    const result = calculate(data.a, data.b, data.operation);
    const passed = result === data.expected;
    return { result, passed };
}

console.log(`  ${"a".padEnd(8)} ${"b".padEnd(8)} ${"Operation".padEnd(12)} ${"Expected".padEnd(10)} ${"Actual".padEnd(10)} Result`);
console.log("  " + "-".repeat(60));

calculatorTestData.forEach(data => {
    const { result, passed } = testCalculation(data);
    console.log(`  ${String(data.a).padEnd(8)} ${String(data.b).padEnd(8)} ${data.operation.padEnd(12)} ${String(data.expected).padEnd(10)} ${String(result).padEnd(10)} ${passed ? "PASS" : "FAIL"}`);
});
console.log();

// ---------------------------------------------------------------
// Example 4: Form Validation Test Data
// ---------------------------------------------------------------
console.log("--- Example 4: Form Validation — Data-Driven ---");

const formValidationData = [
    {
        name: "Valid registration",
        input: { email: "user@example.com", password: "Str0ng!Pass", age: 25 },
        expected: { valid: true, errors: [] }
    },
    {
        name: "Invalid email format",
        input: { email: "not-an-email", password: "Str0ng!Pass", age: 25 },
        expected: { valid: false, errors: ["Invalid email format"] }
    },
    {
        name: "Password too short",
        input: { email: "user@example.com", password: "abc", age: 25 },
        expected: { valid: false, errors: ["Password must be at least 8 characters"] }
    },
    {
        name: "Underage user",
        input: { email: "kid@example.com", password: "Str0ng!Pass", age: 12 },
        expected: { valid: false, errors: ["Must be at least 18 years old"] }
    },
    {
        name: "Multiple errors",
        input: { email: "bad", password: "ab", age: 10 },
        expected: { valid: false, errors: ["Invalid email format", "Password must be at least 8 characters", "Must be at least 18 years old"] }
    },
    {
        name: "Empty fields",
        input: { email: "", password: "", age: 0 },
        expected: { valid: false, errors: ["Email is required", "Password is required", "Age is required"] }
    },
];

function validateForm(input) {
    const errors = [];

    if (!input.email) {
        errors.push("Email is required");
    } else if (!input.email.includes("@") || !input.email.includes(".")) {
        errors.push("Invalid email format");
    }

    if (!input.password) {
        errors.push("Password is required");
    } else if (input.password.length < 8) {
        errors.push("Password must be at least 8 characters");
    }

    if (!input.age) {
        errors.push("Age is required");
    } else if (input.age < 18) {
        errors.push("Must be at least 18 years old");
    }

    return { valid: errors.length === 0, errors };
}

let formTestsPassed = 0;
formValidationData.forEach((testCase, i) => {
    const result = validateForm(testCase.input);
    const validMatch = result.valid === testCase.expected.valid;
    const errorsMatch = JSON.stringify(result.errors) === JSON.stringify(testCase.expected.errors);
    const passed = validMatch && errorsMatch;
    if (passed) formTestsPassed++;

    console.log(`  Test ${i + 1}: ${testCase.name}`);
    console.log(`    Input:    ${JSON.stringify(testCase.input)}`);
    console.log(`    Expected: valid=${testCase.expected.valid}, errors=${JSON.stringify(testCase.expected.errors)}`);
    console.log(`    Actual:   valid=${result.valid}, errors=${JSON.stringify(result.errors)}`);
    console.log(`    Result:   ${passed ? "PASS" : "FAIL"}`);
});
console.log(`\n  Form validation: ${formTestsPassed}/${formValidationData.length} tests passed\n`);

// ---------------------------------------------------------------
// Example 5: Playwright Pattern — test() in a Loop
// ---------------------------------------------------------------
console.log("--- Example 5: Playwright Pattern ---");

console.log(`
  // ACTUAL PLAYWRIGHT CODE:

  const { test, expect } = require('@playwright/test');

  const loginTestData = [
      { username: 'admin', password: 'admin123', expectedTitle: 'Dashboard' },
      { username: 'editor', password: 'editor456', expectedTitle: 'Dashboard' },
      { username: 'invalid', password: 'wrong', expectedTitle: 'Login' },
  ];

  // Generate one test() per data set
  for (const data of loginTestData) {
      test(\`login with \${data.username}\`, async ({ page }) => {
          await page.goto('/login');
          await page.getByLabel('Username').fill(data.username);
          await page.getByLabel('Password').fill(data.password);
          await page.getByRole('button', { name: 'Log in' }).click();
          await expect(page).toHaveTitle(data.expectedTitle);
      });
  }

  // This generates 3 separate tests:
  //   "login with admin"
  //   "login with editor"
  //   "login with invalid"
  // Each runs independently, reports separately, can be retried individually.
`);

// ---------------------------------------------------------------
// Example 6: Java Comparison — @DataProvider and @ParameterizedTest
// ---------------------------------------------------------------
console.log("--- Example 6: Java Comparison ---");

console.log(`
  JAVA TESTNG (@DataProvider):                    JAVASCRIPT PLAYWRIGHT:
  ============================                    ======================

  @DataProvider(name = "loginData")               const loginData = [
  public Object[][] loginData() {                     { user: 'admin', pass: 'a123', ok: true },
      return new Object[][] {                         { user: 'bad', pass: 'wrong', ok: false },
          { "admin", "a123", true },              ];
          { "bad", "wrong", false },
      };                                          for (const data of loginData) {
  }                                                   test(\`login \${data.user}\`, async ({page}) => {
                                                          // test logic using data.user, data.pass
  @Test(dataProvider = "loginData")                   });
  public void testLogin(                          }
      String user, String pass, boolean ok) {
      // test logic using user, pass, ok
  }

  JAVA JUNIT 5 (@ParameterizedTest):
  ===================================

  @ParameterizedTest
  @CsvSource({
      "admin, admin123, true",
      "bad, wrong, false"
  })
  void testLogin(String user, String pass,
      boolean shouldPass) {
      // test logic
  }

  KEY DIFFERENCES:
  - Java uses annotations (@DataProvider, @ParameterizedTest)
  - JavaScript uses plain arrays + for loops
  - Java data is in separate method or annotation
  - JavaScript data is in the same file (or imported from JSON/CSV)
  - The CONCEPT is identical: same logic, different data
`);

// ---------------------------------------------------------------
// Example 7: Advanced — Nested Test Data with Metadata
// ---------------------------------------------------------------
console.log("--- Example 7: Advanced Test Data with Metadata ---");

const searchTestData = [
    {
        id: "SRCH-001",
        name: "Basic keyword search",
        priority: "high",
        tags: ["smoke", "regression"],
        input: { query: "laptop", category: "all" },
        expected: { minResults: 10, titleContains: "laptop" }
    },
    {
        id: "SRCH-002",
        name: "Category-filtered search",
        priority: "high",
        tags: ["regression"],
        input: { query: "laptop", category: "electronics" },
        expected: { minResults: 5, titleContains: "laptop" }
    },
    {
        id: "SRCH-003",
        name: "No results search",
        priority: "medium",
        tags: ["regression"],
        input: { query: "xyznonexistent12345", category: "all" },
        expected: { minResults: 0, showNoResults: true }
    },
    {
        id: "SRCH-004",
        name: "Special characters in search",
        priority: "medium",
        tags: ["edge-case"],
        input: { query: '<script>alert("xss")</script>', category: "all" },
        expected: { minResults: 0, noError: true }
    },
    {
        id: "SRCH-005",
        name: "Empty search query",
        priority: "low",
        tags: ["edge-case"],
        input: { query: "", category: "all" },
        expected: { showValidationError: true }
    },
];

// Simulated search function
function simulateSearch(query, category) {
    if (!query) return { results: [], validationError: "Search query required" };
    if (query.includes("<script>")) return { results: [], sanitized: true };
    if (query === "xyznonexistent12345") return { results: [], noResults: true };

    const mockResults = Array.from({ length: 15 }, (_, i) => ({
        title: `${query} product ${i + 1}`,
        category: i % 2 === 0 ? "electronics" : "clothing"
    }));

    const filtered = category === "all" ? mockResults : mockResults.filter(r => r.category === category);
    return { results: filtered };
}

console.log("  Running search tests with metadata:\n");
searchTestData.forEach(test => {
    const { results, validationError, sanitized, noResults } = simulateSearch(test.input.query, test.input.category);

    let passed = true;
    const checks = [];

    if (test.expected.minResults !== undefined) {
        const check = results.length >= test.expected.minResults;
        passed = passed && check;
        checks.push(`results(${results.length}) >= ${test.expected.minResults}: ${check}`);
    }
    if (test.expected.showNoResults) {
        const check = results.length === 0;
        passed = passed && check;
        checks.push(`noResults: ${check}`);
    }
    if (test.expected.showValidationError) {
        const check = !!validationError;
        passed = passed && check;
        checks.push(`validationError: ${check}`);
    }
    if (test.expected.noError) {
        const check = !validationError;
        passed = passed && check;
        checks.push(`noError: ${check}`);
    }

    console.log(`  [${test.id}] ${test.name} (${test.priority}) [${test.tags.join(", ")}]`);
    checks.forEach(c => console.log(`    ${c}`));
    console.log(`    => ${passed ? "PASS" : "FAIL"}`);
});

console.log();

// === KEY TAKEAWAYS ===
console.log("=== KEY TAKEAWAYS ===");
console.log("1. Data-driven tests = same test logic, different data inputs");
console.log("2. Define test data as an array of objects, loop and call test function for each");
console.log("3. Reduces code duplication: 1 test function instead of N copy-pasted functions");
console.log("4. Easy to add new test cases: just add another object to the array");
console.log("5. Playwright pattern: for (const data of testData) { test(`name ${data.x}`, ...) }");
console.log("6. Java uses @DataProvider (TestNG) or @ParameterizedTest (JUnit 5) — same concept");
console.log("7. Test data can include metadata (id, priority, tags) for filtering and reporting");
console.log("8. Each data set generates an independent test that can pass/fail/retry individually");
