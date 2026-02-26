// Extra_05_Custom_Fixtures.js
// Topic: Custom Fixtures with test.extend() - Part 5 of 8
// Extends: ex_34 (Test Structure and Hooks)
//
// CONCEPT: Playwright's test.extend() lets you define custom fixtures that are automatically
// set up and torn down for each test. Custom fixtures encapsulate reusable setup logic like
// authenticated user state, test data, page objects, and API clients. They compose with
// built-in fixtures and each other.
// JAVA COMPARISON: Similar to creating custom JUnit 5 extensions with @ExtendWith, or custom
//   @Rule implementations. Spring's @Autowired for dependency injection is conceptually similar.
// PLAYWRIGHT RELEVANCE: Custom fixtures are THE recommended pattern for reusable test setup:
//   authenticated pages, admin vs user contexts, seeded test data, custom API helpers.
// ============================================================

// === Simulated test.extend() System ===
// We build a miniature version of Playwright's test.extend() to demonstrate the concept.

class TestExtender {
    constructor(baseFixtures = {}) {
        this.fixtureDefinitions = { ...baseFixtures };
        this.results = { passed: 0, failed: 0, total: 0 };
    }

    // Simulate test.extend({ fixtureName: [setup, { scope }] })
    extend(newFixtures) {
        const extended = new TestExtender({ ...this.fixtureDefinitions });
        for (const [name, definition] of Object.entries(newFixtures)) {
            extended.fixtureDefinitions[name] = definition;
        }
        return extended;
    }

    // Run a test with automatically managed fixtures
    async test(name, requiredFixtures, testFn) {
        this.results.total++;
        console.log(`  TEST: ${name}`);

        const resolved = {};
        const teardowns = [];

        try {
            // Resolve each requested fixture
            for (const fixtureName of requiredFixtures) {
                const factory = this.fixtureDefinitions[fixtureName];
                if (!factory) throw new Error(`Unknown fixture: ${fixtureName}`);

                // The factory receives (resolved, use) where use() provides the value
                // and returns a promise that resolves when teardown should happen
                await new Promise(async (resolveFixture) => {
                    await factory(resolved, async (value) => {
                        resolved[fixtureName] = value;
                        resolveFixture();
                    });
                });

                // Store teardown if the factory returns one
                if (factory._teardown) {
                    teardowns.push({ name: fixtureName, fn: factory._teardown });
                }
            }

            // Run the test
            await testFn(resolved);
            this.results.passed++;
            console.log(`    PASS`);

        } catch (error) {
            this.results.failed++;
            console.log(`    FAIL: ${error.message}`);
        }
        console.log("");
    }
}

// Simpler approach: fixture as factory function with use() callback
function defineFixture(setupFn) {
    return setupFn;
}

// ============================================================
console.log("--- Example 1: What test.extend() Does ---");
// ============================================================

console.log(`
  test.extend() creates a NEW test object with additional fixtures.

  // Base Playwright test has: { page, context, browser, request }

  // Extend with custom fixtures:
  const test = base.extend({
      // Custom fixture: an authenticated page
      authenticatedPage: async ({ page }, use) => {
          // SETUP: runs before each test that needs this fixture
          await page.goto('/login');
          await page.fill('#user', 'admin');
          await page.fill('#pass', 'admin123');
          await page.click('#submit');
          await page.waitForURL('/dashboard');

          // PROVIDE: the fixture value to the test
          await use(page);

          // TEARDOWN: runs after the test completes (automatic cleanup)
          await page.goto('/logout');
      }
  });

  // Now tests can use the custom fixture:
  test('admin can see dashboard', async ({ authenticatedPage }) => {
      // authenticatedPage is already logged in!
      await expect(authenticatedPage.locator('h1')).toHaveText('Dashboard');
  });
`);
console.log("");

// ============================================================
console.log("--- Example 2: Simulating Custom Fixtures ---");
// ============================================================

(async () => {
    // Simulate the base Playwright fixtures
    const baseTest = new TestExtender();

    // Define base 'page' fixture
    baseTest.fixtureDefinitions.page = async (fixtures, use) => {
        const page = {
            url: "about:blank",
            cookies: {},
            localStorage: {},
            goto(url) { this.url = url; },
            fill(selector, value) { console.log(`    [page] fill ${selector} = ${value}`); },
            click(selector) { console.log(`    [page] click ${selector}`); },
            close() { console.log("    [page] closed"); }
        };
        await use(page);
        page.close();
    };

    // Extend with authenticatedPage fixture
    const authTest = baseTest.extend({
        authenticatedPage: async (fixtures, use) => {
            const page = {
                url: "about:blank",
                isAuthenticated: false,
                authToken: null,
                goto(url) { this.url = url; },
                locator(sel) { return { text: `Content at ${sel}` }; }
            };

            // Setup: simulate login
            page.goto("/login");
            page.isAuthenticated = true;
            page.authToken = "jwt-admin-token-123";
            page.goto("/dashboard");
            console.log("    [authenticatedPage] logged in as admin");

            // Provide to test
            await use(page);

            // Teardown: simulate logout
            page.isAuthenticated = false;
            page.authToken = null;
            console.log("    [authenticatedPage] logged out");
        }
    });

    await authTest.test(
        "Admin sees dashboard widgets",
        ["authenticatedPage"],
        async ({ authenticatedPage }) => {
            if (!authenticatedPage.isAuthenticated) throw new Error("Not authenticated!");
            console.log(`    URL: ${authenticatedPage.url}`);
            console.log(`    Token: ${authenticatedPage.authToken}`);
        }
    );

    await authTest.test(
        "Admin can navigate to settings",
        ["authenticatedPage"],
        async ({ authenticatedPage }) => {
            authenticatedPage.goto("/settings");
            console.log(`    Navigated to: ${authenticatedPage.url}`);
        }
    );

    console.log(`Results: ${authTest.results.passed}/${authTest.results.total} passed\n`);

    // ============================================================
    console.log("--- Example 3: Multiple Custom Fixtures ---");
    // ============================================================
    // Real projects typically have several custom fixtures.

    console.log(`
  Actual Playwright code with multiple custom fixtures:

  // fixtures.ts
  import { test as base } from '@playwright/test';

  type MyFixtures = {
      adminPage: Page;
      userPage: Page;
      testData: { username: string; email: string };
      apiClient: APIRequestContext;
  };

  export const test = base.extend<MyFixtures>({

      // Fixture 1: Admin authenticated page
      adminPage: async ({ browser }, use) => {
          const context = await browser.newContext({
              storageState: 'auth/admin.json'
          });
          const page = await context.newPage();
          await use(page);
          await context.close();
      },

      // Fixture 2: Regular user authenticated page
      userPage: async ({ browser }, use) => {
          const context = await browser.newContext({
              storageState: 'auth/user.json'
          });
          const page = await context.newPage();
          await use(page);
          await context.close();
      },

      // Fixture 3: Test data (no browser needed)
      testData: async ({}, use) => {
          const data = {
              username: 'testuser_' + Date.now(),
              email: 'test_' + Date.now() + '@example.com'
          };
          await use(data);
          // Teardown: clean up created test data
          // await api.delete('/users/' + data.username);
      },

      // Fixture 4: API client
      apiClient: async ({ playwright }, use) => {
          const client = await playwright.request.newContext({
              baseURL: 'https://api.example.com',
              extraHTTPHeaders: { 'Authorization': 'Bearer admin-token' }
          });
          await use(client);
          await client.dispose();
      }
  });
`);

    // ============================================================
    console.log("--- Example 4: Fixture Composition (Fixtures Using Fixtures) ---");
    // ============================================================
    // Custom fixtures can depend on other custom fixtures.

    console.log("Fixture dependency graph:");
    console.log("");
    console.log("  browser (built-in)");
    console.log("    |");
    console.log("    +-- adminContext (custom)");
    console.log("    |     |");
    console.log("    |     +-- adminPage (custom)");
    console.log("    |");
    console.log("    +-- userContext (custom)");
    console.log("          |");
    console.log("          +-- userPage (custom)");
    console.log("");

    console.log(`
  // Fixtures can use other fixtures:
  export const test = base.extend({

      // Custom context with admin auth
      adminContext: async ({ browser }, use) => {
          const context = await browser.newContext({
              storageState: 'auth/admin.json'
          });
          await use(context);
          await context.close();
      },

      // Custom page using custom context
      adminPage: async ({ adminContext }, use) => {
          const page = await adminContext.newPage();
          await page.goto('/admin/dashboard');
          await use(page);
          await page.close();
      },

      // Fixture using another custom fixture
      adminDashboard: async ({ adminPage }, use) => {
          // adminPage is already logged in and on the dashboard
          await adminPage.waitForSelector('.dashboard-loaded');
          await use(adminPage);
      }
  });
`);

    // ============================================================
    console.log("--- Example 5: Simulating Fixture Composition in Plain JS ---");
    // ============================================================

    // Demonstrate the pattern without Playwright

    function createFixtureChain() {
        // Level 1: Database connection
        function createDB() {
            const db = {
                connected: true,
                tables: new Map(),
                query(sql) { return `Result of: ${sql}`; },
                close() { this.connected = false; console.log("    [db] closed"); }
            };
            console.log("    [db] connected");
            return db;
        }

        // Level 2: Test data (depends on db)
        function seedTestData(db) {
            const userData = { id: 1, name: "TestUser", email: "test@example.com" };
            db.tables.set("users", [userData]);
            console.log("    [testData] seeded user:", userData.name);
            return {
                user: userData,
                cleanup() {
                    db.tables.delete("users");
                    console.log("    [testData] cleaned up");
                }
            };
        }

        // Level 3: Authenticated API client (depends on testData)
        function createAuthClient(testData) {
            const client = {
                token: `token-for-${testData.user.name}`,
                get(url) { return { status: 200, data: `GET ${url}` }; },
                post(url, body) { return { status: 201, data: body }; }
            };
            console.log("    [apiClient] authenticated as:", testData.user.name);
            return client;
        }

        return { createDB, seedTestData, createAuthClient };
    }

    // Run a "test" with the fixture chain
    console.log("Running test with composed fixtures:\n");
    const chain = createFixtureChain();

    const db = chain.createDB();
    const testData = chain.seedTestData(db);
    const apiClient = chain.createAuthClient(testData);

    // "Test" uses the fixtures
    console.log(`    Test: API token is ${apiClient.token}`);
    console.log(`    Test: User email is ${testData.user.email}`);
    console.log(`    Test: DB query: ${db.query("SELECT * FROM users")}`);

    // Teardown in reverse order
    console.log("\n  Teardown (reverse order):");
    testData.cleanup();
    db.close();
    console.log("");

    // ============================================================
    console.log("--- Example 6: Worker-Scoped Fixtures ---");
    // ============================================================

    console.log(`
  Some fixtures should be created once and shared across tests in a worker.
  Use { scope: 'worker' } for expensive resources.

  export const test = base.extend({
      // Created once per worker, shared across all tests
      sharedDB: [async ({}, use) => {
          const db = await connectToDatabase();
          await use(db);
          await db.close();
      }, { scope: 'worker' }],

      // Created once per worker
      sharedBrowser: [async ({ browser }, use) => {
          // browser is already worker-scoped by default
          await use(browser);
      }, { scope: 'worker' }],

      // Created fresh per test (default)
      freshPage: async ({ browser }, use) => {
          const context = await browser.newContext();
          const page = await context.newPage();
          await use(page);
          await context.close();
      }
  });

  Scope comparison:
    'test'   scope: new instance per test, fresh and isolated
    'worker' scope: shared across tests in one worker, efficient but shared state
`);

    // ============================================================
    console.log("--- Example 7: Automatic vs Manual Fixtures ---");
    // ============================================================

    console.log(`
  Playwright fixtures can be 'auto' — they run even if not requested.
  Useful for global setup like tracing or logging.

  export const test = base.extend({
      // AUTO fixture: always runs, even if test doesn't request it
      autoTrace: [async ({ page }, use) => {
          await page.context().tracing.start({ screenshots: true });
          await use();  // test runs here
          await page.context().tracing.stop({
              path: 'traces/trace.zip'
          });
      }, { auto: true }],

      // Normal fixture: only runs when requested by a test
      adminPage: async ({ page }, use) => {
          await page.goto('/login');
          await page.fill('#user', 'admin');
          await page.click('#submit');
          await use(page);
      }
  });

  // This test gets autoTrace automatically (no need to list it)
  test('homepage loads', async ({ page }) => {
      await page.goto('/');
  });
`);

    // ============================================================
    console.log("--- Example 8: Real-World Fixture File Structure ---");
    // ============================================================

    console.log(`
  Typical project structure:

  tests/
    fixtures/
      base.ts              <- test.extend() with all custom fixtures
      auth.fixtures.ts     <- authenticatedPage, adminPage, userPage
      data.fixtures.ts     <- testData, apiClient
      page-objects.ts      <- loginPage, dashboardPage (POM fixtures)
    specs/
      login.spec.ts        <- import { test } from '../fixtures/base'
      dashboard.spec.ts
      checkout.spec.ts

  // base.ts — combines all fixture files
  import { mergeTests } from '@playwright/test';
  import { test as authTest } from './auth.fixtures';
  import { test as dataTest } from './data.fixtures';

  export const test = mergeTests(authTest, dataTest);

  // login.spec.ts — uses combined fixtures
  import { test } from '../fixtures/base';

  test('admin login', async ({ adminPage, testData }) => {
      // adminPage and testData are both available
  });
`);

    // === KEY TAKEAWAYS ===
    console.log("=== KEY TAKEAWAYS ===");
    console.log("1. test.extend() creates custom fixtures with automatic setup and teardown");
    console.log("2. Pattern: async ({ dependencies }, use) => { setup; await use(value); teardown; }");
    console.log("3. Custom fixtures can depend on other fixtures (built-in or custom)");
    console.log("4. Scope: 'test' = fresh per test (default), 'worker' = shared in worker");
    console.log("5. Auto fixtures ({ auto: true }) run for every test without being requested");
    console.log("6. Fixtures replace most beforeAll/beforeEach/afterEach/afterAll usage");
    console.log("7. Java equivalent: @ExtendWith custom extensions, @Rule, Spring @Autowired");
    console.log("8. Best practice: define fixtures in separate files, compose with mergeTests()");

})();
