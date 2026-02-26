// Extra_04_Fixtures_Basics.js
// Topic: Playwright Fixtures - Auto-Managed Test Resources - Part 4 of 8
// Extends: ex_34 (Test Structure and Hooks)
//
// CONCEPT: Fixtures are test resources that are automatically created before a test and
// cleaned up after it. Playwright provides built-in fixtures like { page, browser, context }
// that are passed to each test function. This eliminates manual setup/teardown boilerplate
// and ensures proper cleanup even when tests fail.
// JAVA COMPARISON: Similar to JUnit's @Rule and @ExtendWith. A @Rule automatically creates
//   and tears down resources (like TemporaryFolder). Playwright fixtures are more powerful
//   because they support dependency injection and composition.
// PLAYWRIGHT RELEVANCE: Every test receives { page, browser, context, request } automatically.
//   Custom fixtures extend this with authenticated pages, test data, API clients, etc.
// ============================================================

// === Simulated Fixture System ===
// We build a mini fixture system to demonstrate the concept.

class FixtureManager {
    constructor() {
        this.fixtureFactories = new Map();
        this.results = { passed: 0, failed: 0, total: 0 };
    }

    // Register a fixture with setup and teardown
    defineFixture(name, factory) {
        this.fixtureFactories.set(name, factory);
    }

    // Run a test with automatically managed fixtures
    async runTest(testName, requiredFixtures, testFn) {
        this.results.total++;
        console.log(`  TEST: ${testName}`);

        const fixtures = {};
        const teardowns = [];

        try {
            // Setup: Create all required fixtures
            for (const name of requiredFixtures) {
                const factory = this.fixtureFactories.get(name);
                if (!factory) throw new Error(`Unknown fixture: ${name}`);

                const { value, teardown } = await factory(fixtures);
                fixtures[name] = value;
                if (teardown) teardowns.push({ name, fn: teardown });
                console.log(`    [fixture] ${name} created`);
            }

            // Run the test with fixtures
            await testFn(fixtures);
            this.results.passed++;
            console.log(`    PASS`);

        } catch (error) {
            this.results.failed++;
            console.log(`    FAIL: ${error.message}`);
        } finally {
            // Teardown: Clean up in reverse order (LIFO)
            for (const td of teardowns.reverse()) {
                try {
                    await td.fn();
                    console.log(`    [fixture] ${td.name} cleaned up`);
                } catch (err) {
                    console.log(`    [fixture] ${td.name} cleanup error: ${err.message}`);
                }
            }
        }
        console.log("");
    }
}

// ============================================================
console.log("--- Example 1: Understanding Fixtures — The Problem They Solve ---");
// ============================================================

console.log("WITHOUT fixtures (manual setup/teardown):");
console.log(`
  // You must manually create and clean up resources
  let browser, context, page;

  beforeAll(async () => {
      browser = await chromium.launch();       // manual setup
  });

  beforeEach(async () => {
      context = await browser.newContext();     // manual setup
      page = await context.newPage();           // manual setup
  });

  afterEach(async () => {
      await page.close();                       // manual cleanup
      await context.close();                    // manual cleanup
  });

  afterAll(async () => {
      await browser.close();                    // manual cleanup
  });

  test('login test', async () => {
      await page.goto('/login');                // page from outer scope
  });
`);

console.log("WITH fixtures (automatic):");
console.log(`
  // Playwright creates and cleans up page, context, browser for you!
  test('login test', async ({ page }) => {
      await page.goto('/login');                // page is auto-created
  });
  // After test: page is auto-closed, context auto-closed
`);
console.log("");

// ============================================================
console.log("--- Example 2: Simulating Playwright's Built-in Fixtures ---");
// ============================================================

(async () => {
    const fm = new FixtureManager();

    // Define 'browser' fixture — created once, shared across tests
    fm.defineFixture("browser", async () => {
        const browser = {
            name: "chromium",
            version: "120.0",
            connected: true,
            newContext(options = {}) {
                return {
                    options,
                    pages: [],
                    newPage() {
                        const page = {
                            url: "about:blank",
                            title: "",
                            closed: false,
                            goto(url) { this.url = url; this.title = `Page - ${url}`; },
                            close() { this.closed = true; }
                        };
                        this.pages.push(page);
                        return page;
                    },
                    close() { this.pages.forEach((p) => p.close()); }
                };
            },
            close() { this.connected = false; }
        };
        return {
            value: browser,
            teardown: () => { browser.close(); }
        };
    });

    // Define 'context' fixture — depends on browser
    fm.defineFixture("context", async (fixtures) => {
        const context = fixtures.browser.newContext({ viewport: { width: 1280, height: 720 } });
        return {
            value: context,
            teardown: () => { context.close(); }
        };
    });

    // Define 'page' fixture — depends on context
    fm.defineFixture("page", async (fixtures) => {
        const page = fixtures.context.newPage();
        return {
            value: page,
            teardown: () => { page.close(); }
        };
    });

    console.log("Running tests with auto-managed fixtures:\n");

    await fm.runTest(
        "Navigate to homepage",
        ["browser", "context", "page"],
        async ({ page }) => {
            page.goto("https://example.com");
            if (page.url !== "https://example.com") throw new Error("Navigation failed");
            console.log(`    Page URL: ${page.url}`);
        }
    );

    await fm.runTest(
        "Navigate to login page",
        ["browser", "context", "page"],
        async ({ page }) => {
            page.goto("https://example.com/login");
            console.log(`    Page URL: ${page.url}`);
            // Each test gets a FRESH page — no state leaking between tests
        }
    );

    console.log(`Results: ${fm.results.passed}/${fm.results.total} passed\n`);

    // ============================================================
    console.log("--- Example 3: Fixture Dependencies (Chain) ---");
    // ============================================================
    // Fixtures can depend on other fixtures, forming a dependency chain.
    // Playwright resolves these automatically.

    console.log("Fixture dependency chain:");
    console.log("  browser -> context -> page");
    console.log("  Each level wraps the previous one");
    console.log("");

    console.log("  browser  : Launch browser executable (expensive, shared)");
    console.log("  context  : Browser context with cookies, storage (per test)");
    console.log("  page     : A single tab/page in the browser (per test)");
    console.log("");

    console.log("  Teardown happens in reverse order:");
    console.log("  page.close() -> context.close() -> browser.close()");
    console.log("");

    // ============================================================
    console.log("--- Example 4: All Built-in Playwright Fixtures ---");
    // ============================================================

    const builtInFixtures = [
        { name: "page", scope: "test", description: "Isolated page for each test" },
        { name: "context", scope: "test", description: "Browser context (cookies, storage)" },
        { name: "browser", scope: "worker", description: "Shared browser instance" },
        { name: "browserName", scope: "worker", description: "Name: 'chromium', 'firefox', or 'webkit'" },
        { name: "request", scope: "test", description: "API request context for HTTP calls" },
    ];

    console.log("Built-in Playwright fixtures:");
    builtInFixtures.forEach((f) => {
        console.log(`  ${f.name.padEnd(15)} [${f.scope}]  ${f.description}`);
    });
    console.log("");

    console.log("Fixture scopes:");
    console.log("  'test'   — created fresh for EACH test, destroyed after each test");
    console.log("  'worker' — created once per worker process, shared across tests");
    console.log("");

    // ============================================================
    console.log("--- Example 5: Fixture Factory Pattern (Plain JavaScript) ---");
    // ============================================================
    // Even without Playwright, you can use this pattern in your code.

    function createTestFixtures() {
        // Setup
        const db = {
            connected: true,
            data: new Map(),
            insert(key, value) { this.data.set(key, value); },
            get(key) { return this.data.get(key); },
            clear() { this.data.clear(); },
            close() { this.connected = false; }
        };

        const apiClient = {
            baseUrl: "http://localhost:3000",
            authToken: null,
            async login(user, pass) {
                this.authToken = `token-${user}-${Date.now()}`;
                return { token: this.authToken };
            },
            async get(endpoint) {
                return { status: 200, data: `Response from ${endpoint}` };
            }
        };

        const logger = {
            entries: [],
            log(message) { this.entries.push({ time: Date.now(), message }); },
            getEntries() { return [...this.entries]; }
        };

        // Return fixtures with teardown
        return {
            fixtures: { db, apiClient, logger },
            teardown() {
                db.close();
                apiClient.authToken = null;
                logger.entries.length = 0;
                console.log("  All fixtures torn down");
            }
        };
    }

    // Using the factory
    const { fixtures: f, teardown } = createTestFixtures();

    f.db.insert("user1", { name: "Alice", email: "alice@test.com" });
    f.logger.log("Inserted test user");
    console.log("DB get user1:", f.db.get("user1"));
    console.log("Logger entries:", f.logger.getEntries().length);

    await f.apiClient.login("admin", "password");
    console.log("API token:", f.apiClient.authToken);

    teardown();
    console.log("DB connected after teardown:", f.db.connected);
    console.log("");

    // ============================================================
    console.log("--- Example 6: Why Fixtures Are Better Than Global State ---");
    // ============================================================

    console.log("Problems with global state (beforeAll/beforeEach):");
    console.log("  1. Tests can accidentally share state and affect each other");
    console.log("  2. Forgetting cleanup in afterEach causes test pollution");
    console.log("  3. Hard to see what a test depends on (hidden dependencies)");
    console.log("  4. Parallel execution is unsafe with shared mutable state");
    console.log("");

    console.log("Fixtures solve all of these:");
    console.log("  1. Each test gets its own fixture instance (isolated)");
    console.log("  2. Cleanup is automatic — even if the test crashes");
    console.log("  3. Dependencies are explicit: test('name', ({ page, context }) => ...)");
    console.log("  4. Parallel-safe because nothing is shared");
    console.log("");

    // ============================================================
    console.log("--- Example 7: Java JUnit @Rule Comparison ---");
    // ============================================================

    console.log(`
  Java JUnit @Rule is the closest equivalent to Playwright fixtures:

  // Java: TemporaryFolder rule auto-creates and cleans up a temp directory
  public class MyTest {
      @Rule
      public TemporaryFolder tempFolder = new TemporaryFolder();

      @Test
      public void testFileWrite() {
          File file = tempFolder.newFile("test.txt");
          // tempFolder is auto-cleaned up after test
      }
  }

  // Playwright: page fixture auto-creates and cleans up a browser page
  test('my test', async ({ page }) => {
      await page.goto('/home');
      // page is auto-closed after test
  });

  // Both patterns:
  // - Automatic setup before the test
  // - Automatic teardown after the test
  // - Explicit dependency declaration
  // - Works even when tests fail
`);

    // ============================================================
    console.log("--- Example 8: How Playwright Uses Fixtures Internally ---");
    // ============================================================

    console.log(`
  What happens when you write:

    test('my test', async ({ page, context }) => { ... });

  Playwright internally does:
    1. Creates a browser (or reuses one from the worker)
    2. Creates a new BrowserContext (isolated cookies, storage)
    3. Creates a new Page in that context
    4. Passes { page, context } to your test function
    5. Your test runs
    6. page.close() is called automatically
    7. context.close() is called automatically
    8. If the test failed, artifacts (screenshot, trace) are saved

  You only request what you need:
    ({ page })           — gets page (context and browser created implicitly)
    ({ context })        — gets context (no page created, you create pages yourself)
    ({ browser })        — gets browser (you manage contexts and pages)
    ({ request })        — gets API request context (no browser at all!)
`);

    // === KEY TAKEAWAYS ===
    console.log("=== KEY TAKEAWAYS ===");
    console.log("1. Fixtures are auto-managed test resources — setup AND teardown are automatic");
    console.log("2. Playwright's { page, context, browser } are built-in fixtures");
    console.log("3. Each test gets a FRESH page — no state leaks between tests");
    console.log("4. Cleanup happens even when tests fail (unlike manual afterEach)");
    console.log("5. Dependencies are explicit in the function signature: ({ page, request })");
    console.log("6. 'test' scope = per test, 'worker' scope = shared across tests in a worker");
    console.log("7. Java equivalent: @Rule in JUnit 4, @ExtendWith in JUnit 5");
    console.log("8. Fixtures eliminate boilerplate: no beforeAll/afterAll for browser management");

})();
