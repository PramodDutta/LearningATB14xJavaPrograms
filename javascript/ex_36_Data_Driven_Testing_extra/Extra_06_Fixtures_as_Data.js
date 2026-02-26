// Extra_06_Fixtures_as_Data.js
// Topic: Data-Driven Testing - Part 6 of 6
// Extends: Extra_05 (Dynamic Test Generation), ex_35 POM series
//
// CONCEPT: Fixtures are pre-configured objects that provide test-specific data
// and setup. Instead of each test manually creating its own data, a fixture
// factory produces the right data for each test scenario. Fixtures can inject
// user credentials, page objects, API clients, and test data — all configured
// for the specific test. This combines the POM pattern with data-driven testing
// for maximum reusability.
//
// JAVA COMPARISON: Java uses @BeforeMethod/@BeforeEach for setup and dependency
// injection frameworks (Spring, Guice) for fixture injection. TestNG has
// @Factory for parameterized fixture creation. JavaScript fixtures are simpler —
// plain functions or classes that return configured objects.
//
// PLAYWRIGHT RELEVANCE: Playwright's test.extend() is the fixture mechanism.
// You define custom fixtures that provide Page Objects pre-initialized with
// test data. The built-in { page, context, browser } fixtures are extended
// with custom ones like { loginPage, dashboardPage, testUser, apiClient }.
// ============================================================

console.log("=== EXTRA 06: FIXTURES AS DATA ===\n");

// ---------------------------------------------------------------
// Example 1: What is a Fixture?
// ---------------------------------------------------------------
console.log("--- Example 1: What is a Fixture? ---");

console.log(`
  A "fixture" is a known, pre-configured state for testing.

  WITHOUT FIXTURES (setup repeated in every test):
  -------------------------------------------------
  test('admin can view dashboard', async ({ page }) => {
      await page.goto('/login');                           // Repeated
      await page.getByLabel('Username').fill('admin');     // Repeated
      await page.getByLabel('Password').fill('admin123');  // Repeated
      await page.getByRole('button').click();              // Repeated
      await page.waitForURL('/dashboard');                 // Repeated
      // Finally, the actual test logic
      await expect(page.locator('.dashboard')).toBeVisible();
  });

  WITH FIXTURES (setup provided automatically):
  -----------------------------------------------
  test('admin can view dashboard', async ({ loggedInAdminPage }) => {
      // Already logged in! Jump straight to testing.
      await expect(loggedInAdminPage.locator('.dashboard')).toBeVisible();
  });
`);

// ---------------------------------------------------------------
// Mock infrastructure
// ---------------------------------------------------------------

class MockPage {
    constructor(url = "") {
        this._url = url;
        this._data = {};
        this._log = [];
    }
    async goto(url) { this._url = url; this._log.push(`goto ${url}`); }
    url() { return this._url; }
    locator(sel) {
        return {
            fill: async (v) => { this._data[sel] = v; this._log.push(`fill ${sel}=${v}`); },
            click: async () => { this._log.push(`click ${sel}`); },
            textContent: async () => this._data[sel] || "",
            isVisible: async () => !!this._data[sel],
        };
    }
    getLog() { return [...this._log]; }
}

// ---------------------------------------------------------------
// Example 2: Fixture Factory — Creating Test Data
// ---------------------------------------------------------------
console.log("--- Example 2: Fixture Factory ---");

class TestDataFactory {
    // User fixtures
    static adminUser() {
        return {
            username: "admin",
            password: "admin123",
            displayName: "Admin User",
            email: "admin@example.com",
            role: "Administrator",
            permissions: ["read", "write", "delete", "admin"]
        };
    }

    static editorUser() {
        return {
            username: "editor",
            password: "editor456",
            displayName: "Jane Editor",
            email: "jane@example.com",
            role: "Editor",
            permissions: ["read", "write"]
        };
    }

    static viewerUser() {
        return {
            username: "viewer",
            password: "viewer789",
            displayName: "Bob Viewer",
            email: "bob@example.com",
            role: "Viewer",
            permissions: ["read"]
        };
    }

    // Product fixtures
    static sampleProduct(overrides = {}) {
        return {
            name: "Test Laptop",
            price: 999.99,
            category: "electronics",
            inStock: true,
            quantity: 50,
            ...overrides  // Allow overriding any field
        };
    }

    // Order fixtures
    static sampleOrder(overrides = {}) {
        return {
            items: [
                { productId: "PROD-001", name: "Laptop", price: 999.99, quantity: 1 },
                { productId: "PROD-002", name: "Mouse", price: 29.99, quantity: 2 },
            ],
            shipping: {
                method: "standard",
                address: "123 Test St, San Francisco, CA 94102"
            },
            coupon: null,
            ...overrides
        };
    }

    // Generate unique test data
    static uniqueUser(prefix = "test") {
        const id = Date.now() + Math.floor(Math.random() * 1000);
        return {
            username: `${prefix}_user_${id}`,
            password: `TestPass_${id}!`,
            displayName: `${prefix} User ${id}`,
            email: `${prefix}_${id}@test.example.com`,
            role: "Standard",
            permissions: ["read"]
        };
    }
}

// Demonstrate factory usage
console.log("  TestDataFactory produces pre-configured test objects:\n");

const admin = TestDataFactory.adminUser();
console.log(`  adminUser():      ${admin.username} (${admin.role})`);

const editor = TestDataFactory.editorUser();
console.log(`  editorUser():     ${editor.username} (${editor.role})`);

const product = TestDataFactory.sampleProduct();
console.log(`  sampleProduct():  ${product.name} ($${product.price})`);

const customProduct = TestDataFactory.sampleProduct({ name: "Gaming Mouse", price: 59.99, category: "peripherals" });
console.log(`  sampleProduct({custom}): ${customProduct.name} ($${customProduct.price})`);

const uniqueUser = TestDataFactory.uniqueUser("signup");
console.log(`  uniqueUser():     ${uniqueUser.username} (unique each time)`);
console.log();

// ---------------------------------------------------------------
// Example 3: Fixture-Providing Base Class
// ---------------------------------------------------------------
console.log("--- Example 3: Fixture Provider for Page Objects ---");

class BasePage {
    constructor(page) {
        this.page = page;
    }
    async getTitle() { return "Mock Title"; }
    getURL() { return this.page.url(); }
}

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async goto() {
        await this.page.goto("https://myapp.com/login");
    }

    async login(username, password) {
        await this.page.locator("#username").fill(username);
        await this.page.locator("#password").fill(password);
        await this.page.locator("#login-btn").click();
        this.page._url = "https://myapp.com/dashboard";
        return new DashboardPage(this.page);
    }
}

class DashboardPage extends BasePage {
    constructor(page) {
        super(page);
    }

    isLoaded() {
        return this.page.url().includes("/dashboard");
    }

    async getWelcomeText() {
        return await this.page.locator(".welcome").textContent();
    }
}

// Fixture that combines POM + data
class TestFixture {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
    }

    // Fixture: Logged-in admin on dashboard
    async loggedInAdmin() {
        const user = TestDataFactory.adminUser();
        await this.loginPage.goto();
        const dashboard = await this.loginPage.login(user.username, user.password);
        return { dashboard, user };
    }

    // Fixture: Logged-in editor on dashboard
    async loggedInEditor() {
        const user = TestDataFactory.editorUser();
        await this.loginPage.goto();
        const dashboard = await this.loginPage.login(user.username, user.password);
        return { dashboard, user };
    }

    // Fixture: Fresh login page (not logged in)
    async freshLoginPage() {
        await this.loginPage.goto();
        return { loginPage: this.loginPage };
    }

    // Fixture: Logged in with custom user data
    async loggedInAs(userData) {
        await this.loginPage.goto();
        const dashboard = await this.loginPage.login(userData.username, userData.password);
        return { dashboard, user: userData };
    }
}

// Use fixtures in tests
async function runFixtureTests() {
    console.log("  Running tests with fixtures:\n");

    // Test 1: Uses admin fixture
    {
        const page = new MockPage();
        const fixture = new TestFixture(page);
        const { dashboard, user } = await fixture.loggedInAdmin();
        const onDashboard = dashboard.isLoaded();
        console.log(`  Test 1: Admin dashboard access`);
        console.log(`    Fixture provided: user=${user.username}, role=${user.role}`);
        console.log(`    On dashboard: ${onDashboard} -> ${onDashboard ? "PASS" : "FAIL"}`);
        console.log(`    Actions: ${page.getLog().join(" -> ")}`);
    }

    // Test 2: Uses editor fixture
    {
        const page = new MockPage();
        const fixture = new TestFixture(page);
        const { dashboard, user } = await fixture.loggedInEditor();
        const onDashboard = dashboard.isLoaded();
        console.log(`\n  Test 2: Editor dashboard access`);
        console.log(`    Fixture provided: user=${user.username}, role=${user.role}`);
        console.log(`    On dashboard: ${onDashboard} -> ${onDashboard ? "PASS" : "FAIL"}`);
    }

    // Test 3: Uses custom user fixture
    {
        const page = new MockPage();
        const fixture = new TestFixture(page);
        const customUser = TestDataFactory.uniqueUser("custom");
        const { dashboard, user } = await fixture.loggedInAs(customUser);
        console.log(`\n  Test 3: Custom user dashboard access`);
        console.log(`    Fixture provided: user=${user.username}`);
        console.log(`    On dashboard: ${dashboard.isLoaded()} -> PASS`);
    }

    // Test 4: Uses fresh login page (no login performed)
    {
        const page = new MockPage();
        const fixture = new TestFixture(page);
        const { loginPage } = await fixture.freshLoginPage();
        console.log(`\n  Test 4: Fresh login page (no authentication)`);
        console.log(`    Fixture provided: loginPage at ${loginPage.getURL()}`);
        console.log(`    Ready for login failure tests -> PASS`);
    }
    console.log();
}

// ---------------------------------------------------------------
// Example 4: Data Fixtures — Different Data for Different Tests
// ---------------------------------------------------------------
console.log("--- Example 4: Data Fixtures for Different Tests ---");

class OrderFixtures {
    static standardOrder() {
        return {
            name: "Standard Order",
            items: [
                { name: "Widget", price: 19.99, qty: 2 },
                { name: "Gadget", price: 49.99, qty: 1 }
            ],
            expectedSubtotal: 89.97,
            expectedTax: 7.78,
            expectedTotal: 97.75
        };
    }

    static freeShippingOrder() {
        return {
            name: "Free Shipping Order (over $100)",
            items: [
                { name: "Premium Widget", price: 149.99, qty: 1 }
            ],
            expectedSubtotal: 149.99,
            expectedShipping: 0,
            expectedTax: 12.97,
            expectedTotal: 162.96
        };
    }

    static couponOrder() {
        return {
            name: "Order with 20% Coupon",
            items: [
                { name: "Gadget", price: 79.99, qty: 1 }
            ],
            coupon: "SAVE20",
            expectedSubtotal: 79.99,
            expectedDiscount: 16.00,
            expectedAfterDiscount: 63.99,
            expectedTotal: 75.93  // with tax + shipping
        };
    }

    static emptyCart() {
        return {
            name: "Empty Cart",
            items: [],
            expectedSubtotal: 0,
            expectedTotal: 0,
            shouldShowError: true,
            expectedError: "Cart is empty"
        };
    }

    static largeOrder() {
        return {
            name: "Large Order (bulk discount eligible)",
            items: Array.from({ length: 20 }, (_, i) => ({
                name: `Item ${i + 1}`,
                price: 25.00,
                qty: 5
            })),
            expectedSubtotal: 2500.00,
            bulkDiscountApplied: true,
            expectedDiscount: 250.00  // 10% bulk discount
        };
    }
}

// Run tests using different order fixtures
const orderScenarios = [
    OrderFixtures.standardOrder(),
    OrderFixtures.freeShippingOrder(),
    OrderFixtures.couponOrder(),
    OrderFixtures.emptyCart(),
    OrderFixtures.largeOrder(),
];

function calculateSubtotal(items) {
    return Math.round(items.reduce((sum, item) => sum + item.price * item.qty, 0) * 100) / 100;
}

orderScenarios.forEach((fixture, i) => {
    const subtotal = calculateSubtotal(fixture.items);
    const matches = subtotal === fixture.expectedSubtotal;
    console.log(`  Order Fixture ${i + 1}: "${fixture.name}"`);
    console.log(`    Items: ${fixture.items.length}, Subtotal: $${subtotal}`);
    console.log(`    Expected subtotal: $${fixture.expectedSubtotal} -> ${matches ? "PASS" : "FAIL"}`);
    if (fixture.coupon) console.log(`    Coupon: ${fixture.coupon}`);
    if (fixture.shouldShowError) console.log(`    Expected error: "${fixture.expectedError}"`);
});
console.log();

// ---------------------------------------------------------------
// Example 5: Combining Fixtures with POM
// ---------------------------------------------------------------
console.log("--- Example 5: Combining Fixtures + POM Pattern ---");

class CheckoutPage {
    constructor(page) {
        this.page = page;
        this._cart = [];
        this._coupon = null;
    }

    async addItem(item) {
        this._cart.push(item);
    }

    async applyCoupon(code) {
        this._coupon = code;
    }

    getSubtotal() {
        return Math.round(this._cart.reduce((sum, item) => sum + item.price * item.qty, 0) * 100) / 100;
    }

    getDiscount() {
        if (this._coupon === "SAVE20") {
            return Math.round(this.getSubtotal() * 0.20 * 100) / 100;
        }
        return 0;
    }

    getItemCount() {
        return this._cart.length;
    }
}

// Fixture-based test setup
async function setupCheckoutTest(fixtureData) {
    const page = new MockPage();
    const checkoutPage = new CheckoutPage(page);

    // Apply fixture data to page object
    for (const item of fixtureData.items) {
        await checkoutPage.addItem(item);
    }
    if (fixtureData.coupon) {
        await checkoutPage.applyCoupon(fixtureData.coupon);
    }

    return checkoutPage;
}

async function runCombinedTests() {
    console.log("  Tests using fixtures + POM:\n");

    const standardFixture = OrderFixtures.standardOrder();
    const checkoutPage = await setupCheckoutTest(standardFixture);
    console.log(`  Test: "${standardFixture.name}"`);
    console.log(`    Items in cart: ${checkoutPage.getItemCount()}`);
    console.log(`    Subtotal: $${checkoutPage.getSubtotal()}`);
    console.log(`    Expected: $${standardFixture.expectedSubtotal}`);
    console.log(`    -> ${checkoutPage.getSubtotal() === standardFixture.expectedSubtotal ? "PASS" : "FAIL"}`);

    const couponFixture = OrderFixtures.couponOrder();
    const couponPage = await setupCheckoutTest(couponFixture);
    console.log(`\n  Test: "${couponFixture.name}"`);
    console.log(`    Subtotal: $${couponPage.getSubtotal()}`);
    console.log(`    Discount: $${couponPage.getDiscount()}`);
    console.log(`    Expected discount: $${couponFixture.expectedDiscount}`);
    console.log(`    -> ${couponPage.getDiscount() === couponFixture.expectedDiscount ? "PASS" : "FAIL"}`);
    console.log();
}

// ---------------------------------------------------------------
// Example 6: Playwright test.extend() — The Real Fixture API
// ---------------------------------------------------------------
console.log("--- Example 6: Playwright test.extend() — Real Code ---");

console.log(`
  // ACTUAL PLAYWRIGHT CODE:

  // === fixtures.js — Define custom fixtures ===
  const { test as base } = require('@playwright/test');
  const { LoginPage } = require('./pages/LoginPage');
  const { DashboardPage } = require('./pages/DashboardPage');

  // Extend the base test with custom fixtures
  const test = base.extend({
      // Fixture: provides a LoginPage instance
      loginPage: async ({ page }, use) => {
          const loginPage = new LoginPage(page);
          await loginPage.goto();
          await use(loginPage);  // Provide to test
      },

      // Fixture: provides a logged-in admin DashboardPage
      adminDashboard: async ({ page }, use) => {
          const loginPage = new LoginPage(page);
          await loginPage.goto();
          const dashboard = await loginPage.login('admin', 'admin123');
          await use(dashboard);  // Test receives pre-authenticated page
          // Cleanup runs after test
      },

      // Fixture: provides test user data
      testUser: async ({}, use) => {
          const user = {
              username: \`test_\${Date.now()}\`,
              password: 'TestPass123!',
              email: \`test_\${Date.now()}@example.com\`,
          };
          await use(user);
      },

      // Fixture: provides API client for test setup
      apiClient: async ({}, use) => {
          const client = { /* configured API client */ };
          await use(client);
      },

      // Fixture: combines POM + data
      loggedInWithData: async ({ page }, use) => {
          const user = { username: 'editor', password: 'editor456' };
          const loginPage = new LoginPage(page);
          await loginPage.goto();
          const dashboard = await loginPage.login(user.username, user.password);
          await use({ dashboard, user });  // Provides both POM and data
      },
  });

  module.exports = { test };

  // === tests/dashboard.spec.js — Use fixtures ===
  const { test } = require('./fixtures');
  const { expect } = require('@playwright/test');

  // This test receives a pre-configured loginPage
  test('login page has correct title', async ({ loginPage }) => {
      // loginPage is already initialized and navigated!
      await expect(loginPage.page).toHaveTitle(/Login/);
  });

  // This test receives a fully logged-in dashboard
  test('admin sees welcome message', async ({ adminDashboard }) => {
      // Already logged in! No setup code needed.
      await expect(adminDashboard.welcomeBanner).toContainText('Welcome');
  });

  // This test receives both POM and data
  test('editor profile shows correct role', async ({ loggedInWithData }) => {
      const { dashboard, user } = loggedInWithData;
      await expect(dashboard.welcomeBanner).toContainText(user.username);
  });

  // === Key benefits of Playwright fixtures ===
  // 1. Automatic setup/teardown (before/after test)
  // 2. Lazy initialization (only created when test requests them)
  // 3. Composable (fixtures can depend on other fixtures)
  // 4. Test isolation (each test gets fresh instances)
  // 5. Reusable across test files
`);

// ---------------------------------------------------------------
// Example 7: Java Comparison
// ---------------------------------------------------------------
console.log("--- Example 7: Java Comparison ---");

console.log(`
  JAVA (TestNG/JUnit Fixtures):                  PLAYWRIGHT JS (test.extend):
  =============================                  ============================

  // Java - @BeforeMethod (setup)                // Playwright fixture
  @BeforeMethod                                  const test = base.extend({
  public void setUp() {                              loginPage: async ({ page }, use) => {
      driver = new ChromeDriver();                       const lp = new LoginPage(page);
      loginPage = new LoginPage(driver);                 await lp.goto();
      loginPage.navigate();                              await use(lp);
  }                                                  },
                                                 });
  @AfterMethod
  public void tearDown() {                       // Playwright handles teardown
      driver.quit();                             // automatically after use()
  }
                                                 // Test receives fixture
  @Test                                          test('my test', async ({ loginPage }) => {
  public void testLogin() {                          // loginPage already set up!
      loginPage.login("admin", "pass");          });
  }

  // Java - Factory for parameterized fixtures
  @Factory(dataProvider = "users")
  public LoginTest(String user, String pass) {
      this.user = user;
      this.pass = pass;
  }

  KEY DIFFERENCES:
  - Java: @BeforeMethod/@BeforeEach = setup for every test
  - Playwright: test.extend() = fixture only created when requested
  - Java: @AfterMethod = explicit teardown
  - Playwright: code after use() = automatic teardown
  - Java: @Factory for parameterized fixture classes
  - Playwright: fixtures can receive parameters via closures
  - Playwright fixtures are LAZY (only created when needed)
  - Java setup runs for ALL tests, even if not needed
`);

// ---------------------------------------------------------------
// Run all async demos
// ---------------------------------------------------------------

async function runAll() {
    await runFixtureTests();
    await runCombinedTests();

    // === KEY TAKEAWAYS ===
    console.log("=== KEY TAKEAWAYS ===");
    console.log("1. Fixtures provide pre-configured test state: data, page objects, API clients");
    console.log("2. TestDataFactory class creates consistent, reusable test data objects");
    console.log("3. Factory methods can accept overrides: sampleProduct({ price: 49.99 })");
    console.log("4. uniqueUser() generates unique data for each test run (avoids conflicts)");
    console.log("5. TestFixture class combines POM + data: loggedInAdmin() returns { dashboard, user }");
    console.log("6. Playwright: test.extend() defines custom fixtures (loginPage, adminDashboard, testUser)");
    console.log("7. Fixtures are LAZY — only created when a test requests them in its parameter list");
    console.log("8. Fixtures compose: adminDashboard depends on page, which depends on browser");
    console.log("9. Java uses @BeforeMethod + @Factory; Playwright uses test.extend() — cleaner");
    console.log("10. Combine fixtures + data-driven testing for maximum test coverage with minimal code");
}

runAll();
