// Extra_06_Test_Organization.js
// Topic: Test Organization - Grouping, Tagging, Filtering - Part 6 of 8
// Extends: ex_34 (Test Structure and Hooks)
//
// CONCEPT: Organizing tests effectively is crucial for maintainability. Tests should be grouped
// by feature or page, tagged for selective execution (@smoke, @regression), and structured to
// support both parallel and serial execution. Good organization makes it easy to run subsets.
// JAVA COMPARISON: JUnit 5 @Tag for categorization, @Nested for grouping, Maven Surefire
//   -Dgroups for filtering. TestNG groups and suites XML for organization.
// PLAYWRIGHT RELEVANCE: test.describe for grouping, @tag annotations in test titles, grep
//   patterns for filtering, projects for cross-browser, serial mode for dependent tests.
// ============================================================

// === Simulated Test Framework ===
const allTests = [];
let currentPath = [];
let totalRun = 0;

function describe(name, fn) {
    currentPath.push(name);
    console.log(`${"  ".repeat(currentPath.length - 1)}SUITE: ${name}`);
    fn();
    currentPath.pop();
}

describe.serial = function (name, fn) {
    currentPath.push(`${name} (serial)`);
    console.log(`${"  ".repeat(currentPath.length - 1)}SUITE (serial): ${name}`);
    fn();
    currentPath.pop();
};

function test(name, fn) {
    totalRun++;
    const fullPath = [...currentPath, name].join(" > ");
    const tags = extractTags(name);
    allTests.push({ name, fullPath, tags, fn });

    try {
        fn();
        console.log(`${"  ".repeat(currentPath.length)}  PASS: ${name}`);
    } catch (e) {
        console.log(`${"  ".repeat(currentPath.length)}  FAIL: ${name} — ${e.message}`);
    }
}

test.skip = function (name) {
    const fullPath = [...currentPath, name].join(" > ");
    const tags = extractTags(name);
    allTests.push({ name, fullPath, tags, skipped: true });
    console.log(`${"  ".repeat(currentPath.length)}  SKIP: ${name}`);
};

function extractTags(name) {
    const tagRegex = /@(\w+)/g;
    const tags = [];
    let match;
    while ((match = tagRegex.exec(name)) !== null) {
        tags.push(match[1]);
    }
    return tags;
}

function assert(condition, msg) {
    if (!condition) throw new Error(msg || "Assertion failed");
}

// ============================================================
console.log("--- Example 1: Feature-Based Organization ---");
// ============================================================
// Group tests by application feature or page.

describe("Authentication", () => {

    describe("Login", () => {
        test("displays login form correctly", () => {
            assert(true);
        });
        test("logs in with valid credentials", () => {
            assert(true);
        });
        test("shows error for invalid password", () => {
            assert(true);
        });
        test("locks account after 5 failed attempts", () => {
            assert(true);
        });
    });

    describe("Registration", () => {
        test("creates account with valid data", () => {
            assert(true);
        });
        test("validates email format", () => {
            assert(true);
        });
        test("requires password minimum length", () => {
            assert(true);
        });
    });

    describe("Password Reset", () => {
        test("sends reset email", () => {
            assert(true);
        });
        test("resets password with valid token", () => {
            assert(true);
        });
    });
});

console.log("");

// ============================================================
console.log("--- Example 2: Tagging Tests with @smoke, @regression ---");
// ============================================================
// Tags in test names allow selective execution with grep.

describe("Shopping Cart", () => {
    test("@smoke adds item to cart", () => {
        assert(true);
    });
    test("@smoke removes item from cart", () => {
        assert(true);
    });
    test("@regression updates item quantity", () => {
        assert(true);
    });
    test("@regression applies discount code", () => {
        assert(true);
    });
    test("@regression handles out-of-stock items", () => {
        assert(true);
    });
    test("@smoke @critical proceeds to checkout", () => {
        assert(true);
    });
});

console.log("");

// Show how tags would be used for filtering
const smokeTests = allTests.filter((t) => t.tags.includes("smoke"));
const regressionTests = allTests.filter((t) => t.tags.includes("regression"));
const criticalTests = allTests.filter((t) => t.tags.includes("critical"));

console.log("Tag summary:");
console.log(`  @smoke tests: ${smokeTests.length}`);
console.log(`  @regression tests: ${regressionTests.length}`);
console.log(`  @critical tests: ${criticalTests.length}`);
console.log("");

// ============================================================
console.log("--- Example 3: Serial Mode for Dependent Tests ---");
// ============================================================
// Some tests must run in order (e.g., create -> read -> update -> delete).
// test.describe.serial() ensures sequential execution.

describe.serial("CRUD Operations (must run in order)", () => {
    let createdId = null;

    test("Step 1: CREATE a product", () => {
        createdId = 42;
        console.log(`      Created product with id: ${createdId}`);
        assert(createdId !== null);
    });

    test("Step 2: READ the created product", () => {
        console.log(`      Reading product id: ${createdId}`);
        assert(createdId === 42, "Product should exist from previous test");
    });

    test("Step 3: UPDATE the product", () => {
        console.log(`      Updating product id: ${createdId}`);
        assert(createdId === 42);
    });

    test("Step 4: DELETE the product", () => {
        console.log(`      Deleting product id: ${createdId}`);
        createdId = null;
        assert(createdId === null);
    });
});

console.log("");

// ============================================================
console.log("--- Example 4: Test Filtering with grep ---");
// ============================================================
// Playwright's --grep flag matches against the full test title.

console.log("How to run subsets of tests with grep:");
console.log("");
console.log("  # Run only tests with 'login' in the name");
console.log("  npx playwright test --grep 'login'");
console.log("");
console.log("  # Run only @smoke tagged tests");
console.log("  npx playwright test --grep '@smoke'");
console.log("");
console.log("  # Run only @regression tagged tests");
console.log("  npx playwright test --grep '@regression'");
console.log("");
console.log("  # Exclude @smoke tests (run everything else)");
console.log("  npx playwright test --grep-invert '@smoke'");
console.log("");
console.log("  # Run tests matching a regex");
console.log("  npx playwright test --grep '/cart|checkout/'");
console.log("");
console.log("  # Run a specific test file");
console.log("  npx playwright test tests/login.spec.ts");
console.log("");
console.log("  # Run tests in a specific directory");
console.log("  npx playwright test tests/e2e/");
console.log("");

// Simulate grep filtering
function grepTests(allTests, pattern) {
    const regex = new RegExp(pattern, "i");
    return allTests.filter((t) => regex.test(t.fullPath));
}

console.log("Simulated grep 'login':");
grepTests(allTests, "login").forEach((t) => console.log(`  ${t.fullPath}`));
console.log("");

console.log("Simulated grep '@smoke':");
grepTests(allTests, "@smoke").forEach((t) => console.log(`  ${t.fullPath}`));
console.log("");

// ============================================================
console.log("--- Example 5: Project-Based Organization (Cross-Browser) ---");
// ============================================================
// Playwright 'projects' let you run the same tests across different browsers.

const playwrightProjects = [
    {
        name: "chromium",
        use: { browserName: "chromium", viewport: { width: 1280, height: 720 } }
    },
    {
        name: "firefox",
        use: { browserName: "firefox", viewport: { width: 1280, height: 720 } }
    },
    {
        name: "webkit",
        use: { browserName: "webkit", viewport: { width: 1280, height: 720 } }
    },
    {
        name: "mobile-chrome",
        use: {
            browserName: "chromium",
            viewport: { width: 375, height: 667 },
            userAgent: "Mozilla/5.0 (iPhone) Mobile"
        }
    },
    {
        name: "mobile-safari",
        use: {
            browserName: "webkit",
            viewport: { width: 375, height: 667 },
            userAgent: "Mozilla/5.0 (iPhone) Mobile Safari"
        }
    }
];

console.log("Playwright projects for cross-browser testing:");
playwrightProjects.forEach((p) => {
    console.log(`  ${p.name.padEnd(16)} browser: ${p.use.browserName}, viewport: ${p.use.viewport.width}x${p.use.viewport.height}`);
});
console.log("");

console.log("Run specific projects:");
console.log("  npx playwright test --project=chromium");
console.log("  npx playwright test --project=chromium --project=firefox");
console.log("  npx playwright test --project='mobile-chrome'");
console.log("");

// ============================================================
console.log("--- Example 6: Dependent Projects (Setup Projects) ---");
// ============================================================

console.log(`
  Projects can depend on other projects for setup:

  // playwright.config.ts
  projects: [
      // Setup project: runs first, logs in and saves auth state
      {
          name: 'setup',
          testMatch: /.*\\.setup\\.ts/,
      },

      // Test projects: depend on setup, use saved auth state
      {
          name: 'chromium',
          dependencies: ['setup'],      // waits for setup to finish
          use: {
              storageState: 'auth/user.json',  // uses saved auth
          },
      },
      {
          name: 'firefox',
          dependencies: ['setup'],
          use: {
              storageState: 'auth/user.json',
          },
      },
  ]

  // auth.setup.ts (the setup project test file)
  import { test } from '@playwright/test';

  test('authenticate', async ({ page }) => {
      await page.goto('/login');
      await page.fill('#username', 'admin');
      await page.fill('#password', 'admin123');
      await page.click('#submit');
      await page.context().storageState({ path: 'auth/user.json' });
  });
`);

// ============================================================
console.log("--- Example 7: File Structure Best Practices ---");
// ============================================================

console.log("Recommended project structure:");
console.log("");
console.log("  project/");
console.log("  +-- playwright.config.ts");
console.log("  +-- package.json");
console.log("  +-- tests/");
console.log("  |   +-- auth/");
console.log("  |   |   +-- login.spec.ts");
console.log("  |   |   +-- register.spec.ts");
console.log("  |   |   +-- password-reset.spec.ts");
console.log("  |   +-- products/");
console.log("  |   |   +-- product-list.spec.ts");
console.log("  |   |   +-- product-detail.spec.ts");
console.log("  |   |   +-- product-search.spec.ts");
console.log("  |   +-- cart/");
console.log("  |   |   +-- add-to-cart.spec.ts");
console.log("  |   |   +-- checkout.spec.ts");
console.log("  |   +-- api/");
console.log("  |   |   +-- users-api.spec.ts");
console.log("  |   |   +-- products-api.spec.ts");
console.log("  |   +-- setup/");
console.log("  |       +-- auth.setup.ts");
console.log("  +-- fixtures/");
console.log("  |   +-- base.ts");
console.log("  |   +-- auth.fixtures.ts");
console.log("  +-- pages/");
console.log("  |   +-- login.page.ts");
console.log("  |   +-- dashboard.page.ts");
console.log("  +-- test-data/");
console.log("  |   +-- users.json");
console.log("  |   +-- products.json");
console.log("  +-- auth/");
console.log("      +-- admin.json          (storageState - gitignored)");
console.log("      +-- user.json           (storageState - gitignored)");
console.log("");

// ============================================================
console.log("--- Example 8: Parallel vs Serial Execution ---");
// ============================================================

console.log("Playwright parallelism modes:");
console.log("");
console.log("  1. FULLY PARALLEL (default):");
console.log("     - Each test file runs in its own worker");
console.log("     - Tests within a file run in parallel");
console.log("     - Fastest execution");
console.log("");
console.log("  2. PARALLEL FILES, SERIAL TESTS:");
console.log("     - Files run in parallel");
console.log("     - Tests within a file run sequentially");
console.log("     fullyParallel: false  // in config");
console.log("");
console.log("  3. test.describe.serial():");
console.log("     - Tests in this block run in strict order");
console.log("     - If one fails, rest are skipped");
console.log("     - Use for CRUD sequences");
console.log("");
console.log("  4. SINGLE WORKER:");
console.log("     - npx playwright test --workers=1");
console.log("     - Everything runs sequentially");
console.log("     - Slowest but simplest");
console.log("");

console.log("  Configuration in playwright.config.ts:");
console.log(`
    {
        fullyParallel: true,     // parallelize within files
        workers: process.env.CI ? 2 : undefined,  // auto-detect locally
        // workers: '50%',       // use 50% of CPU cores
    }
`);

// ============================================================
console.log("--- Overall Test Statistics ---");
// ============================================================
console.log(`Total tests registered: ${allTests.length}`);
console.log(`Tests with tags: ${allTests.filter((t) => t.tags.length > 0).length}`);
console.log(`Skipped tests: ${allTests.filter((t) => t.skipped).length}`);
console.log("");

// === KEY TAKEAWAYS ===
console.log("=== KEY TAKEAWAYS ===");
console.log("1. Group tests by feature/page using nested test.describe() blocks");
console.log("2. Tag tests with @smoke, @regression in the test name for filtering");
console.log("3. Use --grep '@smoke' to run only tagged tests");
console.log("4. test.describe.serial() for tests that must run in order (CRUD)");
console.log("5. Projects enable cross-browser testing: chromium, firefox, webkit");
console.log("6. Setup projects with dependencies handle auth state sharing");
console.log("7. Java: @Tag('smoke') + Maven Surefire -Dgroups='smoke' for filtering");
console.log("8. Default is fully parallel — use serial only when tests truly depend on each other");
