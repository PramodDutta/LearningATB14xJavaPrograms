// Extra_05_Dynamic_Test_Generation.js
// Topic: Data-Driven Testing - Part 5 of 6
// Extends: Extra_01 (Parameterized Tests), Extra_04 (Environment Config)
//
// CONCEPT: Dynamic test generation creates test cases programmatically from data
// at runtime. Instead of hardcoding test names and data, you iterate over arrays
// to generate unique, independent test functions. This allows filtering by tags,
// environment, or priority, and building test names dynamically from the data
// itself. Each generated test runs, reports, and retries independently.
//
// JAVA COMPARISON: Java uses @DataProvider (TestNG) or @MethodSource (JUnit 5) to
// generate parameterized tests. TestNG has groups for filtering. The JavaScript
// approach is more flexible — a simple for loop can generate any number of tests
// with full programmatic control.
//
// PLAYWRIGHT RELEVANCE: Playwright's test() function can be called in loops to
// generate tests dynamically. Combined with test.describe(), tags, and grep
// patterns, this creates powerful, filterable test suites. Playwright supports
// `--grep` and `--grep-invert` for runtime test filtering.
// ============================================================

console.log("=== EXTRA 05: DYNAMIC TEST GENERATION ===\n");

// ---------------------------------------------------------------
// Simulated test framework
// ---------------------------------------------------------------

const testResults = [];

function test(name, fn) {
    try {
        fn();
        testResults.push({ name, status: "PASS" });
        console.log(`    [PASS] ${name}`);
    } catch (e) {
        testResults.push({ name, status: "FAIL", error: e.message });
        console.log(`    [FAIL] ${name}: ${e.message}`);
    }
}

function describe(suiteName, fn) {
    console.log(`  ${suiteName}`);
    fn();
    console.log();
}

function expect(actual) {
    return {
        toBe(expected) {
            if (actual !== expected) throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
        },
        toContain(item) {
            if (typeof actual === "string" && !actual.includes(item)) {
                throw new Error(`"${actual}" does not contain "${item}"`);
            }
            if (Array.isArray(actual) && !actual.includes(item)) {
                throw new Error(`[${actual}] does not contain "${item}"`);
            }
        },
        toBeGreaterThan(n) {
            if (actual <= n) throw new Error(`${actual} is not > ${n}`);
        },
        toBeTruthy() {
            if (!actual) throw new Error(`Expected truthy, got ${actual}`);
        }
    };
}

// ---------------------------------------------------------------
// Example 1: Basic Loop-Based Test Generation
// ---------------------------------------------------------------
console.log("--- Example 1: Loop-Based Test Generation (for...of) ---");

const loginScenarios = [
    { username: "admin",   password: "admin123",   shouldSucceed: true,  role: "Administrator" },
    { username: "editor",  password: "editor456",  shouldSucceed: true,  role: "Editor" },
    { username: "viewer",  password: "viewer789",  shouldSucceed: true,  role: "Viewer" },
    { username: "invalid", password: "wrong",      shouldSucceed: false, role: null },
    { username: "",        password: "something",  shouldSucceed: false, role: null },
];

// Simulated login
function performLogin(username, password) {
    const users = {
        "admin": { password: "admin123", role: "Administrator" },
        "editor": { password: "editor456", role: "Editor" },
        "viewer": { password: "viewer789", role: "Viewer" },
    };
    const user = users[username];
    if (user && user.password === password) {
        return { success: true, role: user.role };
    }
    return { success: false, role: null };
}

// Generate tests with for...of loop
describe("Login Tests (generated from data)", () => {
    for (const scenario of loginScenarios) {
        const testName = scenario.shouldSucceed
            ? `should login successfully as ${scenario.username} (${scenario.role})`
            : `should reject login for "${scenario.username || "(empty)"}"`;

        test(testName, () => {
            const result = performLogin(scenario.username, scenario.password);
            expect(result.success).toBe(scenario.shouldSucceed);
            if (scenario.shouldSucceed) {
                expect(result.role).toBe(scenario.role);
            }
        });
    }
});

// ---------------------------------------------------------------
// Example 2: forEach-Based Generation
// ---------------------------------------------------------------
console.log("--- Example 2: forEach-Based Generation ---");

const validationRules = [
    { field: "email",    value: "",                    expectedError: "Email is required" },
    { field: "email",    value: "not-an-email",        expectedError: "Invalid email format" },
    { field: "email",    value: "valid@example.com",   expectedError: null },
    { field: "password", value: "",                    expectedError: "Password is required" },
    { field: "password", value: "short",               expectedError: "Password must be at least 8 characters" },
    { field: "password", value: "ValidPass123!",       expectedError: null },
    { field: "age",      value: 15,                    expectedError: "Must be at least 18" },
    { field: "age",      value: 25,                    expectedError: null },
];

function validateField(field, value) {
    if (field === "email") {
        if (!value) return "Email is required";
        if (!value.includes("@") || !value.includes(".")) return "Invalid email format";
        return null;
    }
    if (field === "password") {
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        return null;
    }
    if (field === "age") {
        if (value < 18) return "Must be at least 18";
        return null;
    }
    return null;
}

describe("Form Validation (generated with forEach)", () => {
    validationRules.forEach(({ field, value, expectedError }) => {
        const displayValue = value === "" ? "(empty)" : value;
        const testName = expectedError
            ? `${field}="${displayValue}" should show: "${expectedError}"`
            : `${field}="${displayValue}" should be valid`;

        test(testName, () => {
            const error = validateField(field, value);
            expect(error).toBe(expectedError);
        });
    });
});

// ---------------------------------------------------------------
// Example 3: Dynamic Test Names from Data
// ---------------------------------------------------------------
console.log("--- Example 3: Dynamic Test Names ---");

const apiEndpoints = [
    { method: "GET",    path: "/api/users",      expectedStatus: 200, description: "list users" },
    { method: "GET",    path: "/api/users/1",    expectedStatus: 200, description: "get user by ID" },
    { method: "POST",   path: "/api/users",      expectedStatus: 201, description: "create user" },
    { method: "PUT",    path: "/api/users/1",    expectedStatus: 200, description: "update user" },
    { method: "DELETE", path: "/api/users/1",    expectedStatus: 204, description: "delete user" },
    { method: "GET",    path: "/api/users/9999", expectedStatus: 404, description: "nonexistent user" },
];

function simulateAPICall(method, path) {
    const statusMap = {
        "GET /api/users": 200,
        "GET /api/users/1": 200,
        "POST /api/users": 201,
        "PUT /api/users/1": 200,
        "DELETE /api/users/1": 204,
        "GET /api/users/9999": 404,
    };
    return statusMap[`${method} ${path}`] || 500;
}

describe("API Endpoint Tests (dynamic names)", () => {
    apiEndpoints.forEach(endpoint => {
        // Build descriptive test name from data
        const testName = `${endpoint.method} ${endpoint.path} -> ${endpoint.expectedStatus} (${endpoint.description})`;

        test(testName, () => {
            const status = simulateAPICall(endpoint.method, endpoint.path);
            expect(status).toBe(endpoint.expectedStatus);
        });
    });
});

// ---------------------------------------------------------------
// Example 4: Filtering Tests by Tags
// ---------------------------------------------------------------
console.log("--- Example 4: Filtering by Tags ---");

const taggedTests = [
    { name: "Login as admin",       tags: ["smoke", "auth", "critical"],  fn: () => true },
    { name: "Login as editor",      tags: ["regression", "auth"],         fn: () => true },
    { name: "Forgot password flow", tags: ["regression", "auth"],         fn: () => true },
    { name: "Dashboard widgets",    tags: ["smoke", "dashboard"],         fn: () => true },
    { name: "Export to CSV",        tags: ["regression", "export"],       fn: () => true },
    { name: "Dark mode toggle",     tags: ["regression", "ui", "beta"],   fn: () => true },
    { name: "Admin panel access",   tags: ["smoke", "admin", "critical"], fn: () => true },
    { name: "Bulk delete users",    tags: ["regression", "admin", "destructive"], fn: () => true },
];

function generateFilteredTests(allTests, filterTag) {
    const filtered = allTests.filter(t => t.tags.includes(filterTag));
    console.log(`  Filter: "${filterTag}" -> ${filtered.length} of ${allTests.length} tests`);
    filtered.forEach(t => {
        console.log(`    - ${t.name} [${t.tags.join(", ")}]`);
    });
    return filtered;
}

console.log();
generateFilteredTests(taggedTests, "smoke");
console.log();
generateFilteredTests(taggedTests, "critical");
console.log();
generateFilteredTests(taggedTests, "admin");
console.log();

// Exclude destructive tests in production
const currentEnv = process.env.ENV || "dev";
console.log(`  Environment: ${currentEnv}`);
if (currentEnv === "prod") {
    console.log("  PRODUCTION: Excluding 'destructive' tests");
    const safeTests = taggedTests.filter(t => !t.tags.includes("destructive"));
    console.log(`  Running ${safeTests.length} of ${taggedTests.length} tests\n`);
} else {
    console.log(`  NON-PRODUCTION: Running all ${taggedTests.length} tests\n`);
}

// ---------------------------------------------------------------
// Example 5: Environment-Based Test Generation
// ---------------------------------------------------------------
console.log("--- Example 5: Environment-Based Test Generation ---");

const environmentTests = [
    { name: "Homepage loads",            environments: ["dev", "staging", "prod"] },
    { name: "Login works",              environments: ["dev", "staging", "prod"] },
    { name: "Create test data",         environments: ["dev", "staging"] }, // Not in prod!
    { name: "Delete test data",         environments: ["dev", "staging"] }, // Not in prod!
    { name: "Beta feature visible",     environments: ["dev"] },           // Dev only
    { name: "Debug panel accessible",   environments: ["dev"] },           // Dev only
    { name: "Performance under load",   environments: ["staging", "prod"] },
    { name: "SSL certificate valid",    environments: ["staging", "prod"] },
    { name: "CDN response time",        environments: ["prod"] },          // Prod only
];

console.log(`  Generating tests for environment: "${currentEnv}"\n`);

describe(`Tests for ${currentEnv}`, () => {
    environmentTests.forEach(testDef => {
        if (testDef.environments.includes(currentEnv)) {
            test(testDef.name, () => {
                // Simulate the test passing
                expect(true).toBeTruthy();
            });
        } else {
            console.log(`    [SKIP] ${testDef.name} (not for ${currentEnv})`);
        }
    });
});

// ---------------------------------------------------------------
// Example 6: Matrix Testing — Multiple Browsers x Data
// ---------------------------------------------------------------
console.log("--- Example 6: Matrix Testing ---");

const browsers = ["chromium", "firefox", "webkit"];
const viewports = [
    { name: "desktop", width: 1920, height: 1080 },
    { name: "tablet",  width: 768,  height: 1024 },
    { name: "mobile",  width: 375,  height: 667 },
];

console.log("  Generated test matrix:\n");
let matrixCount = 0;

describe("Cross-browser responsive tests", () => {
    browsers.forEach(browser => {
        viewports.forEach(viewport => {
            matrixCount++;
            const testName = `[${browser}][${viewport.name} ${viewport.width}x${viewport.height}] Homepage layout`;
            test(testName, () => {
                expect(viewport.width).toBeGreaterThan(0);
            });
        });
    });
});

console.log(`  Total generated: ${matrixCount} tests (${browsers.length} browsers x ${viewports.length} viewports)\n`);

// ---------------------------------------------------------------
// Example 7: Playwright Code Patterns
// ---------------------------------------------------------------
console.log("--- Example 7: Actual Playwright Patterns ---");

console.log(`
  // === Pattern 1: for...of loop ===
  const testData = [
      { name: 'admin', password: 'admin123' },
      { name: 'user', password: 'user456' },
  ];

  for (const data of testData) {
      test(\`login as \${data.name}\`, async ({ page }) => {
          await page.goto('/login');
          await page.getByLabel('Username').fill(data.name);
          await page.getByLabel('Password').fill(data.password);
          await page.getByRole('button', { name: 'Log in' }).click();
          await expect(page).toHaveURL(/dashboard/);
      });
  }

  // === Pattern 2: describe + forEach ===
  test.describe('User roles', () => {
      const roles = ['admin', 'editor', 'viewer'];
      roles.forEach(role => {
          test(\`\${role} can access dashboard\`, async ({ page }) => {
              // ...
          });
      });
  });

  // === Pattern 3: Tagged tests with grep ===
  // npx playwright test --grep @smoke
  // npx playwright test --grep-invert @slow

  test('login @smoke @auth', async ({ page }) => {
      // Runs when: --grep @smoke  OR  --grep @auth
  });

  test('export report @slow @regression', async ({ page }) => {
      // Skipped when: --grep-invert @slow
  });

  // === Pattern 4: Conditional skip ===
  test('beta feature', async ({ page }) => {
      test.skip(process.env.ENV === 'prod', 'Beta not in production');
      // Test body only runs in non-prod
  });

  // === Pattern 5: Projects as environments ===
  // playwright.config.js
  module.exports = defineConfig({
      projects: [
          {
              name: 'dev',
              use: { baseURL: 'http://localhost:3000' },
          },
          {
              name: 'staging',
              use: { baseURL: 'https://staging.myapp.com' },
          },
      ],
  });
  // Run: npx playwright test --project=staging
`);

// ---------------------------------------------------------------
// Summary
// ---------------------------------------------------------------
console.log("--- Test Generation Summary ---");
console.log(`  Total tests generated and run: ${testResults.length}`);
console.log(`  Passed: ${testResults.filter(t => t.status === "PASS").length}`);
console.log(`  Failed: ${testResults.filter(t => t.status === "FAIL").length}`);
console.log();

// === KEY TAKEAWAYS ===
console.log("=== KEY TAKEAWAYS ===");
console.log("1. Generate tests with for...of or .forEach() loops over data arrays");
console.log("2. Build test names dynamically from data: `login as ${data.username}`");
console.log("3. Each generated test is independent — runs, reports, and retries separately");
console.log("4. Filter tests by tags: test.tags.includes('smoke') to select subsets");
console.log("5. Skip tests by environment: exclude destructive tests from production");
console.log("6. Matrix testing: browsers x viewports x data = comprehensive coverage");
console.log("7. Playwright: --grep @tag and --grep-invert @tag for runtime filtering");
console.log("8. Playwright: test.skip(condition, 'reason') for conditional skipping");
console.log("9. Java uses @DataProvider/@MethodSource; JS uses plain loops — more flexible");
