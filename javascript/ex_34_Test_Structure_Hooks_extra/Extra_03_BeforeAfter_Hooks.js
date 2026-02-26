// Extra_03_BeforeAfter_Hooks.js
// Topic: Test Hooks - beforeAll/beforeEach/afterEach/afterAll - Part 3 of 8
// Extends: ex_34 (Test Structure and Hooks)
//
// CONCEPT: Test hooks run setup and teardown code at specific points during test execution.
// beforeAll runs once before all tests in a suite. beforeEach runs before EACH test.
// afterEach runs after EACH test. afterAll runs once after all tests complete. These ensure
// consistent test state and proper cleanup.
// JAVA COMPARISON: @BeforeAll = beforeAll (static method, runs once). @BeforeEach = beforeEach.
//   @AfterEach = afterEach. @AfterAll = afterAll (static method). JUnit 5 lifecycle callbacks.
// PLAYWRIGHT RELEVANCE: beforeAll for one-time login/data setup. beforeEach for navigating to
//   the page. afterEach for screenshots on failure. afterAll for cleanup (delete test data).
// ============================================================

// === Simulated Test Framework with Hooks ===

function createTestSuite() {
    const hooks = {
        beforeAll: [],
        beforeEach: [],
        afterEach: [],
        afterAll: []
    };
    const tests = [];
    const results = { passed: 0, failed: 0, total: 0 };

    return {
        beforeAll(fn) { hooks.beforeAll.push(fn); },
        beforeEach(fn) { hooks.beforeEach.push(fn); },
        afterEach(fn) { hooks.afterEach.push(fn); },
        afterAll(fn) { hooks.afterAll.push(fn); },
        test(name, fn) { tests.push({ name, fn }); },

        async run(suiteName) {
            console.log(`SUITE: ${suiteName}`);
            console.log("-".repeat(50));

            // Run beforeAll hooks
            for (const hook of hooks.beforeAll) {
                console.log("  [beforeAll] running...");
                await hook();
            }

            // Run each test with beforeEach/afterEach
            for (const t of tests) {
                results.total++;

                // beforeEach
                for (const hook of hooks.beforeEach) {
                    console.log("  [beforeEach] running...");
                    await hook();
                }

                // Test
                try {
                    await t.fn();
                    results.passed++;
                    console.log(`  PASS: ${t.name}`);
                } catch (error) {
                    results.failed++;
                    console.log(`  FAIL: ${t.name} — ${error.message}`);
                }

                // afterEach
                for (const hook of hooks.afterEach) {
                    console.log("  [afterEach] running...");
                    await hook();
                }
            }

            // Run afterAll hooks
            for (const hook of hooks.afterAll) {
                console.log("  [afterAll] running...");
                await hook();
            }

            console.log("-".repeat(50));
            console.log(`  Results: ${results.passed}/${results.total} passed\n`);
            return results;
        }
    };
}

// ============================================================
console.log("--- Example 1: Execution Order of All Four Hooks ---");
// ============================================================

(async () => {
    const executionLog = [];

    const suite1 = createTestSuite();

    suite1.beforeAll(() => {
        executionLog.push("1. beforeAll");
        console.log("    -> beforeAll: One-time setup (e.g., start server, create test database)");
    });

    suite1.beforeEach(() => {
        executionLog.push("2. beforeEach");
        console.log("    -> beforeEach: Per-test setup (e.g., navigate to page, reset state)");
    });

    suite1.afterEach(() => {
        executionLog.push("3. afterEach");
        console.log("    -> afterEach: Per-test cleanup (e.g., screenshot on failure, clear data)");
    });

    suite1.afterAll(() => {
        executionLog.push("4. afterAll");
        console.log("    -> afterAll: One-time cleanup (e.g., stop server, delete test database)");
    });

    suite1.test("Test A", () => {
        executionLog.push("   Test A runs");
    });

    suite1.test("Test B", () => {
        executionLog.push("   Test B runs");
    });

    suite1.test("Test C", () => {
        executionLog.push("   Test C runs");
    });

    await suite1.run("Execution Order Demo");

    console.log("Full execution order:");
    executionLog.forEach((entry, i) => console.log(`  ${i + 1}. ${entry}`));
    console.log("");

    // Expected order:
    // 1. beforeAll          (once)
    // 2. beforeEach         (before Test A)
    // 3. Test A runs
    // 4. afterEach          (after Test A)
    // 5. beforeEach         (before Test B)
    // 6. Test B runs
    // 7. afterEach          (after Test B)
    // 8. beforeEach         (before Test C)
    // 9. Test C runs
    // 10. afterEach         (after Test C)
    // 11. afterAll           (once)

    // ============================================================
    console.log("--- Example 2: Practical — Login State with beforeAll ---");
    // ============================================================
    // beforeAll: Log in once, share the auth token across all tests.

    const suite2 = createTestSuite();
    let authToken = null;
    let pageUrl = null;

    suite2.beforeAll(() => {
        // Simulate logging in (expensive operation — do once)
        console.log("    -> Logging in as admin...");
        authToken = "jwt-token-abc123";
        console.log("    -> Auth token acquired:", authToken);
    });

    suite2.beforeEach(() => {
        // Simulate navigating to the starting page
        pageUrl = "/dashboard";
        console.log(`    -> Navigated to ${pageUrl}`);
    });

    suite2.afterEach(() => {
        // Simulate taking a screenshot after each test
        console.log("    -> Screenshot captured for test evidence");
    });

    suite2.afterAll(() => {
        // Simulate cleanup
        authToken = null;
        console.log("    -> Logged out, session cleared");
    });

    suite2.test("Dashboard shows user profile", () => {
        if (!authToken) throw new Error("Not authenticated");
        if (pageUrl !== "/dashboard") throw new Error("Wrong page");
        console.log("    -> Verified: profile widget visible");
    });

    suite2.test("Dashboard shows recent orders", () => {
        if (!authToken) throw new Error("Not authenticated");
        const orders = [{ id: 1 }, { id: 2 }, { id: 3 }];
        if (orders.length === 0) throw new Error("No orders found");
        console.log("    -> Verified: 3 recent orders displayed");
    });

    suite2.test("Dashboard shows notifications", () => {
        if (!authToken) throw new Error("Not authenticated");
        console.log("    -> Verified: notification bell visible");
    });

    await suite2.run("Dashboard Tests (with Auth)");

    // ============================================================
    console.log("--- Example 3: Shared State Between Hooks and Tests ---");
    // ============================================================

    const suite3 = createTestSuite();
    const testContext = {
        browser: null,
        page: null,
        testData: null
    };

    suite3.beforeAll(() => {
        // Simulate: launch browser (expensive, do once)
        testContext.browser = { name: "chromium", version: "120" };
        console.log(`    -> Browser launched: ${testContext.browser.name}`);
    });

    suite3.beforeEach(() => {
        // Simulate: create a new page (fresh state per test)
        testContext.page = {
            url: "about:blank",
            title: "",
            goto(url) { this.url = url; this.title = "Page at " + url; }
        };
        testContext.testData = { timestamp: Date.now() };
        console.log("    -> New page created (fresh context)");
    });

    suite3.afterEach(() => {
        // Simulate: close page
        testContext.page = null;
        testContext.testData = null;
        console.log("    -> Page closed");
    });

    suite3.afterAll(() => {
        // Simulate: close browser
        testContext.browser = null;
        console.log("    -> Browser closed");
    });

    suite3.test("Navigate to homepage", () => {
        testContext.page.goto("https://example.com");
        if (testContext.page.url !== "https://example.com") throw new Error("Navigation failed");
        console.log(`    -> Page URL: ${testContext.page.url}`);
    });

    suite3.test("Navigate to login (fresh page)", () => {
        // This test gets a FRESH page due to beforeEach
        if (testContext.page.url !== "about:blank") throw new Error("Page was not reset!");
        testContext.page.goto("https://example.com/login");
        console.log(`    -> Page URL: ${testContext.page.url} (started from blank)`);
    });

    await suite3.run("Page Lifecycle Demo");

    // ============================================================
    console.log("--- Example 4: afterEach for Screenshot on Failure ---");
    // ============================================================

    const suite4 = createTestSuite();
    const screenshots = [];
    let currentTestName = "";

    suite4.beforeEach(() => {
        // Track current test (simplified — real frameworks pass test info)
    });

    suite4.afterEach(() => {
        // In a real framework, you would check if the test failed
        // Simulating: always capture screenshot for demo
        const screenshotName = `screenshot-${Date.now()}.png`;
        screenshots.push(screenshotName);
        console.log(`    -> Screenshot saved: ${screenshotName}`);
    });

    suite4.test("Passing test", () => {
        // This passes
    });

    suite4.test("Failing test", () => {
        throw new Error("Element not found: #submit-button");
    });

    suite4.test("Another passing test", () => {
        // This passes
    });

    await suite4.run("Screenshot on Failure Pattern");
    console.log("Screenshots collected:", screenshots.length);
    console.log("");

    // ============================================================
    console.log("--- Example 5: Multiple Hooks of the Same Type ---");
    // ============================================================
    // You can register multiple beforeEach hooks. They run in registration order.

    const suite5 = createTestSuite();

    suite5.beforeEach(() => {
        console.log("    -> beforeEach #1: Set up test data");
    });

    suite5.beforeEach(() => {
        console.log("    -> beforeEach #2: Navigate to page");
    });

    suite5.beforeEach(() => {
        console.log("    -> beforeEach #3: Wait for page load");
    });

    suite5.test("test with multiple beforeEach hooks", () => {
        console.log("    -> Test runs after ALL beforeEach hooks");
    });

    await suite5.run("Multiple Hooks Demo");

    // ============================================================
    console.log("--- Example 6: Java JUnit Comparison ---");
    // ============================================================

    console.log(`
  Java JUnit 5 equivalent:

  public class DashboardTest {

      static String authToken;
      WebDriver driver;

      @BeforeAll                              // = beforeAll
      static void globalSetup() {
          authToken = loginAsAdmin();
      }

      @BeforeEach                             // = beforeEach
      void setUp() {
          driver = new ChromeDriver();
          driver.get("https://example.com");
      }

      @AfterEach                              // = afterEach
      void tearDown() {
          if (testFailed) takeScreenshot();
          driver.quit();
      }

      @AfterAll                               // = afterAll
      static void globalCleanup() {
          deleteTestData();
      }

      @Test
      void testDashboardLoads() {
          assertEquals("Dashboard", driver.getTitle());
      }
  }
`);

    // ============================================================
    console.log("--- Example 7: Actual Playwright Hook Patterns (Reference) ---");
    // ============================================================

    console.log(`
  Actual Playwright test with hooks:

  import { test, expect } from '@playwright/test';

  test.describe('E-Commerce Checkout', () => {

      test.beforeAll(async () => {
          // Seed test data via API
          await fetch('/api/test/seed', { method: 'POST' });
      });

      test.beforeEach(async ({ page }) => {
          // Navigate to the shop page before each test
          await page.goto('/shop');
          await expect(page.locator('.products')).toBeVisible();
      });

      test.afterEach(async ({ page }, testInfo) => {
          // Screenshot on failure
          if (testInfo.status !== testInfo.expectedStatus) {
              await page.screenshot({
                  path: \`screenshots/\${testInfo.title}.png\`
              });
          }
      });

      test.afterAll(async () => {
          // Clean up test data
          await fetch('/api/test/cleanup', { method: 'DELETE' });
      });

      test('add item to cart', async ({ page }) => {
          await page.click('.product:first-child .add-to-cart');
          await expect(page.locator('.cart-count')).toHaveText('1');
      });

      test('remove item from cart', async ({ page }) => {
          await page.click('.product:first-child .add-to-cart');
          await page.click('.cart-item .remove');
          await expect(page.locator('.cart-count')).toHaveText('0');
      });
  });
`);

    // === KEY TAKEAWAYS ===
    console.log("=== KEY TAKEAWAYS ===");
    console.log("1. beforeAll runs ONCE before all tests (setup: login, seed data, start server)");
    console.log("2. beforeEach runs before EACH test (setup: navigate, reset state)");
    console.log("3. afterEach runs after EACH test (cleanup: screenshot, clear data)");
    console.log("4. afterAll runs ONCE after all tests (cleanup: logout, delete data, stop server)");
    console.log("5. Execution: beforeAll > (beforeEach > test > afterEach) x N > afterAll");
    console.log("6. Hooks share state via closures or context objects");
    console.log("7. Java: @BeforeAll, @BeforeEach, @AfterEach, @AfterAll (JUnit 5)");
    console.log("8. Playwright: test.beforeEach(async ({ page }) => { }) receives fixtures");

})();
