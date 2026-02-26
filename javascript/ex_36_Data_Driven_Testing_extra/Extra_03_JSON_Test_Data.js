// Extra_03_JSON_Test_Data.js
// Topic: Data-Driven Testing - Part 3 of 6
// Extends: Extra_01 (Parameterized Tests), Extra_02 (CSV Test Data)
//
// CONCEPT: JSON is the most natural data format for JavaScript test data. Unlike
// CSV, JSON supports nested objects, arrays, booleans, numbers, and nulls natively.
// Test data is defined as JavaScript objects (or loaded from .json files) and used
// directly in tests. JSON excels at representing complex test scenarios with
// multiple fields, nested structures, and environment-specific configurations.
//
// JAVA COMPARISON: Java reads JSON using libraries like Jackson or Gson. In JavaScript,
// JSON.parse() is built-in, and require('./data.json') works directly in Node.js.
// No additional libraries needed — JSON is JavaScript's native data format.
//
// PLAYWRIGHT RELEVANCE: Playwright projects commonly use `require('./testdata/users.json')`
// to load test data. JSON is the recommended format for complex test scenarios,
// user profiles, API payloads, and environment configuration.
// ============================================================

console.log("=== EXTRA 03: JSON TEST DATA ===\n");

// ---------------------------------------------------------------
// Example 1: Inline JSON Test Data
// ---------------------------------------------------------------
console.log("--- Example 1: Inline JSON Test Data ---");

// This is what your testdata/users.json file would contain
const usersTestData = [
    {
        id: "USER-001",
        description: "Admin user with full permissions",
        credentials: {
            username: "admin",
            password: "admin123"
        },
        profile: {
            displayName: "Admin User",
            email: "admin@example.com",
            role: "Administrator"
        },
        permissions: ["read", "write", "delete", "admin"],
        expectedBehavior: {
            canAccessDashboard: true,
            canAccessAdmin: true,
            canDeleteUsers: true,
            welcomeMessage: "Welcome back, Admin User!"
        }
    },
    {
        id: "USER-002",
        description: "Editor with limited permissions",
        credentials: {
            username: "editor",
            password: "editor456"
        },
        profile: {
            displayName: "Jane Editor",
            email: "jane@example.com",
            role: "Editor"
        },
        permissions: ["read", "write"],
        expectedBehavior: {
            canAccessDashboard: true,
            canAccessAdmin: false,
            canDeleteUsers: false,
            welcomeMessage: "Welcome back, Jane Editor!"
        }
    },
    {
        id: "USER-003",
        description: "Read-only viewer",
        credentials: {
            username: "viewer",
            password: "viewer789"
        },
        profile: {
            displayName: "Bob Viewer",
            email: "bob@example.com",
            role: "Viewer"
        },
        permissions: ["read"],
        expectedBehavior: {
            canAccessDashboard: true,
            canAccessAdmin: false,
            canDeleteUsers: false,
            welcomeMessage: "Welcome back, Bob Viewer!"
        }
    }
];

console.log(`  Loaded ${usersTestData.length} user test data entries:`);
usersTestData.forEach(user => {
    console.log(`    [${user.id}] ${user.description}`);
    console.log(`      Username: ${user.credentials.username}, Role: ${user.profile.role}`);
    console.log(`      Permissions: [${user.permissions.join(", ")}]`);
});
console.log();

// ---------------------------------------------------------------
// Example 2: Running Tests with JSON Data
// ---------------------------------------------------------------
console.log("--- Example 2: Running Tests with JSON Data ---");

// Simulated application
class SimulatedApp {
    constructor() {
        this.users = {
            "admin":  { password: "admin123", name: "Admin User",  role: "Administrator", perms: ["read", "write", "delete", "admin"] },
            "editor": { password: "editor456", name: "Jane Editor", role: "Editor", perms: ["read", "write"] },
            "viewer": { password: "viewer789", name: "Bob Viewer",  role: "Viewer", perms: ["read"] },
        };
    }

    login(username, password) {
        const user = this.users[username];
        if (user && user.password === password) {
            return { success: true, user: { ...user } };
        }
        return { success: false, error: "Invalid credentials" };
    }

    canAccess(user, feature) {
        switch (feature) {
            case "dashboard": return true; // All logged-in users
            case "admin": return user.perms.includes("admin");
            case "deleteUsers": return user.perms.includes("delete");
            default: return false;
        }
    }

    getWelcomeMessage(user) {
        return `Welcome back, ${user.name}!`;
    }
}

const app = new SimulatedApp();
let passed = 0;
let total = 0;

usersTestData.forEach(testUser => {
    console.log(`\n  Testing: [${testUser.id}] ${testUser.description}`);

    // Test login
    const loginResult = app.login(testUser.credentials.username, testUser.credentials.password);
    total++;
    if (loginResult.success) {
        passed++;
        console.log(`    Login: PASS`);
    } else {
        console.log(`    Login: FAIL`);
        return;
    }

    const user = loginResult.user;

    // Test permissions
    const checks = [
        { feature: "dashboard", expected: testUser.expectedBehavior.canAccessDashboard },
        { feature: "admin", expected: testUser.expectedBehavior.canAccessAdmin },
        { feature: "deleteUsers", expected: testUser.expectedBehavior.canDeleteUsers },
    ];

    checks.forEach(check => {
        total++;
        const actual = app.canAccess(user, check.feature);
        const pass = actual === check.expected;
        if (pass) passed++;
        console.log(`    canAccess(${check.feature.padEnd(12)}): expected=${check.expected}, actual=${actual} -> ${pass ? "PASS" : "FAIL"}`);
    });

    // Test welcome message
    total++;
    const welcome = app.getWelcomeMessage(user);
    const welcomePass = welcome === testUser.expectedBehavior.welcomeMessage;
    if (welcomePass) passed++;
    console.log(`    Welcome message: "${welcome}" -> ${welcomePass ? "PASS" : "FAIL"}`);
});

console.log(`\n  Results: ${passed}/${total} checks passed\n`);

// ---------------------------------------------------------------
// Example 3: Complex Nested Test Scenarios
// ---------------------------------------------------------------
console.log("--- Example 3: Complex Test Scenarios in JSON ---");

const checkoutScenarios = [
    {
        scenario: "Standard checkout with credit card",
        cart: {
            items: [
                { name: "Laptop", price: 999.99, quantity: 1 },
                { name: "Mouse", price: 29.99, quantity: 2 }
            ],
            coupon: null
        },
        payment: {
            method: "credit_card",
            cardNumber: "4111111111111111",
            expiry: "12/28"
        },
        shipping: {
            method: "standard",
            address: { city: "San Francisco", state: "CA", zip: "94102" }
        },
        expected: {
            subtotal: 1059.97,
            tax: 91.70,
            shipping: 5.99,
            total: 1157.66,
            success: true
        }
    },
    {
        scenario: "Checkout with discount coupon",
        cart: {
            items: [
                { name: "Keyboard", price: 79.99, quantity: 1 }
            ],
            coupon: "SAVE20"
        },
        payment: {
            method: "credit_card",
            cardNumber: "4111111111111111",
            expiry: "12/28"
        },
        shipping: {
            method: "express",
            address: { city: "New York", state: "NY", zip: "10001" }
        },
        expected: {
            subtotal: 79.99,
            discount: 16.00,
            tax: 5.53,
            shipping: 14.99,
            total: 84.51,
            success: true
        }
    },
    {
        scenario: "Free shipping over $100",
        cart: {
            items: [
                { name: "Monitor", price: 349.99, quantity: 1 }
            ],
            coupon: null
        },
        payment: {
            method: "paypal",
            email: "user@example.com"
        },
        shipping: {
            method: "standard",
            address: { city: "Chicago", state: "IL", zip: "60601" }
        },
        expected: {
            subtotal: 349.99,
            tax: 30.28,
            shipping: 0,
            total: 380.27,
            success: true
        }
    }
];

// Simulated checkout calculation
function calculateCheckout(scenario) {
    let subtotal = 0;
    scenario.cart.items.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    subtotal = Math.round(subtotal * 100) / 100;

    let discount = 0;
    if (scenario.cart.coupon === "SAVE20") {
        discount = Math.round(subtotal * 0.20 * 100) / 100;
    }

    const afterDiscount = subtotal - discount;
    const taxRate = 0.0865; // ~8.65%
    const tax = Math.round(afterDiscount * taxRate * 100) / 100;

    let shipping = 0;
    if (subtotal < 100) {
        shipping = scenario.shipping.method === "express" ? 14.99 : 5.99;
    }

    const total = Math.round((afterDiscount + tax + shipping) * 100) / 100;

    return { subtotal, discount, tax, shipping, total, success: true };
}

checkoutScenarios.forEach((scenario, i) => {
    console.log(`  Scenario ${i + 1}: ${scenario.scenario}`);
    console.log(`    Items: ${scenario.cart.items.map(item => `${item.name} x${item.quantity}`).join(", ")}`);
    if (scenario.cart.coupon) console.log(`    Coupon: ${scenario.cart.coupon}`);
    console.log(`    Payment: ${scenario.payment.method}`);
    console.log(`    Shipping: ${scenario.shipping.method}`);

    const result = calculateCheckout(scenario);
    console.log(`    Expected total: $${scenario.expected.total} | Actual: $${result.total} -> ${result.total === scenario.expected.total ? "PASS" : "FAIL"}`);
    console.log();
});

// ---------------------------------------------------------------
// Example 4: Environment-Specific Test Data
// ---------------------------------------------------------------
console.log("--- Example 4: Environment-Specific Data ---");

// This pattern: different data for dev/staging/prod
const environmentData = {
    dev: {
        baseURL: "http://localhost:3000",
        users: {
            admin: { username: "dev_admin", password: "devpass123" },
            standard: { username: "dev_user", password: "devpass456" }
        },
        features: {
            darkMode: true,
            betaFeatures: true,
            maxUploadSize: "100MB"
        },
        database: "dev_testdb"
    },
    staging: {
        baseURL: "https://staging.myapp.com",
        users: {
            admin: { username: "stg_admin", password: "stgpass123" },
            standard: { username: "stg_user", password: "stgpass456" }
        },
        features: {
            darkMode: true,
            betaFeatures: false,
            maxUploadSize: "50MB"
        },
        database: "staging_db"
    },
    production: {
        baseURL: "https://myapp.com",
        users: {
            admin: { username: "prod_admin", password: "prodSecure!123" },
            standard: { username: "prod_user", password: "prodSecure!456" }
        },
        features: {
            darkMode: true,
            betaFeatures: false,
            maxUploadSize: "25MB"
        },
        database: "production_db"
    }
};

const currentEnv = process.env.TEST_ENV || "dev";
const config = environmentData[currentEnv] || environmentData.dev;

console.log(`  Current environment: ${currentEnv}`);
console.log(`  Base URL: ${config.baseURL}`);
console.log(`  Admin user: ${config.users.admin.username}`);
console.log(`  Beta features: ${config.features.betaFeatures}`);
console.log(`  Max upload: ${config.features.maxUploadSize}`);
console.log();

// ---------------------------------------------------------------
// Example 5: JSON vs CSV — When to Use Which
// ---------------------------------------------------------------
console.log("--- Example 5: JSON vs CSV Comparison ---");

console.log(`
  +---------------------+---------------------------+---------------------------+
  | CRITERIA            | CSV                       | JSON                      |
  +---------------------+---------------------------+---------------------------+
  | Simple flat data    | Excellent                 | Fine but verbose          |
  | Nested objects      | Not supported             | Excellent                 |
  | Arrays              | Not supported             | Excellent                 |
  | Type safety         | Everything is string      | Numbers, booleans, null   |
  | Readability         | Good (tabular)            | Good (structured)         |
  | Non-dev editing     | Easy (spreadsheets)       | Harder (need JSON editor) |
  | File size           | Smaller                   | Larger (keys repeated)    |
  | Comments            | Not supported             | Not in standard JSON      |
  | Complex scenarios   | Poor                      | Excellent                 |
  +---------------------+---------------------------+---------------------------+

  USE CSV WHEN:
  - Data is flat (rows and columns)
  - Non-developers maintain the data
  - Simple login credentials, form inputs

  USE JSON WHEN:
  - Data has nested structures
  - Multiple data types needed (numbers, booleans)
  - Complex test scenarios with sub-objects
  - Environment configuration
  - API request/response payloads
`);

// ---------------------------------------------------------------
// Example 6: Playwright Pattern — Loading JSON
// ---------------------------------------------------------------
console.log("--- Example 6: Playwright Pattern ---");

console.log(`
  // ACTUAL PLAYWRIGHT CODE:

  // === Option 1: require() — Simplest ===
  const users = require('./testdata/users.json');

  for (const user of users) {
      test(\`login as \${user.credentials.username}\`, async ({ page }) => {
          await page.goto('/login');
          await page.getByLabel('Username').fill(user.credentials.username);
          await page.getByLabel('Password').fill(user.credentials.password);
          await page.getByRole('button', { name: 'Log in' }).click();

          if (user.expectedBehavior.canAccessDashboard) {
              await expect(page).toHaveURL(/dashboard/);
              await expect(page.locator('.welcome'))
                  .toHaveText(user.expectedBehavior.welcomeMessage);
          }
      });
  }

  // === Option 2: fs.readFileSync() — More control ===
  const fs = require('fs');
  const path = require('path');

  const rawData = fs.readFileSync(
      path.join(__dirname, 'testdata', 'scenarios.json'), 'utf-8'
  );
  const scenarios = JSON.parse(rawData);

  // === Option 3: Environment-specific data ===
  const env = process.env.TEST_ENV || 'dev';
  const envConfig = require(\`./testdata/\${env}-config.json\`);

  test('uses correct base URL', async ({ page }) => {
      await page.goto(envConfig.baseURL);
      // ...
  });

  // File structure:
  // project/
  // +-- testdata/
  // |   +-- users.json
  // |   +-- scenarios.json
  // |   +-- dev-config.json
  // |   +-- staging-config.json
  // |   +-- prod-config.json
  // +-- tests/
  // |   +-- login.spec.js
  // +-- playwright.config.js
`);

// ---------------------------------------------------------------
// Example 7: Java Comparison
// ---------------------------------------------------------------
console.log("--- Example 7: Java Comparison ---");

console.log(`
  JAVA (Jackson/Gson):                            JAVASCRIPT:
  ====================                            ============

  // Using Jackson                                // Using require (built-in!)
  ObjectMapper mapper =                           const data = require('./data.json');
      new ObjectMapper();                         // That's it. No library needed.
  List<User> users = mapper.readValue(
      new File("data.json"),                      // Or with fs:
      new TypeReference<List<User>>() {}          const fs = require('fs');
  );                                              const data = JSON.parse(
                                                      fs.readFileSync('data.json', 'utf-8')
  // Using Gson                                   );
  Gson gson = new Gson();
  Type type = new TypeToken<                      // Accessing nested data:
      List<User>>(){}.getType();                  const username = data[0].credentials.username;
  List<User> users =                              // No class definition needed!
      gson.fromJson(
          new FileReader("data.json"),            // JavaScript advantage:
          type                                    // - No external library needed
      );                                          // - No class/type definitions needed
                                                  // - JSON.parse() is built-in
  // Accessing data requires a class:             // - Objects are dynamic
  String username =
      users.get(0)
          .getCredentials()
          .getUsername();
  // Requires User, Credentials classes!
`);

// === KEY TAKEAWAYS ===
console.log("=== KEY TAKEAWAYS ===");
console.log("1. JSON is JavaScript's native data format — no libraries needed");
console.log("2. require('./data.json') loads and parses JSON in one step");
console.log("3. JSON supports nested objects, arrays, numbers, booleans — richer than CSV");
console.log("4. Environment-specific data: different JSON files per environment");
console.log("5. Use CSV for flat data, JSON for complex structured data");
console.log("6. Playwright pattern: const data = require('./testdata/users.json')");
console.log("7. Java needs Jackson/Gson + class definitions; JS just needs require()");
console.log("8. JSON test data + for loop + test() = data-driven testing in Playwright");
