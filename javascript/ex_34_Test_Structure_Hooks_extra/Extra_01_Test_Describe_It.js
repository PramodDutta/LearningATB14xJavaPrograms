// Extra_01_Test_Describe_It.js
// Topic: Test Structure - describe() and test() - Part 1 of 8
// Extends: ex_34 (Test Structure and Hooks)
//
// CONCEPT: Playwright Test (like Jest and Mocha) organizes tests into describe blocks (suites)
// containing test blocks (individual test cases). describe groups related tests and can be nested.
// test (or it) defines a single test case. This structure makes tests readable and organized.
// JAVA COMPARISON: @Test annotates test methods. @Nested (JUnit 5) groups related tests.
//   Test classes serve as implicit describe blocks. @DisplayName provides readable names.
// PLAYWRIGHT RELEVANCE: test.describe() groups page/feature tests, test() defines each scenario.
//   test.skip() and test.only() control which tests run. test.describe.serial() runs in order.
// ============================================================

// === Simulated Test Framework ===
// We build a mini test framework so this file is runnable with plain `node`.
// The actual Playwright test API works similarly but with async/await and real browser control.

const results = { passed: 0, failed: 0, skipped: 0, total: 0 };
let currentSuite = [];
let indentLevel = 0;

function indent() {
    return "  ".repeat(indentLevel);
}

function describe(name, fn) {
    console.log(`${indent()}SUITE: ${name}`);
    currentSuite.push(name);
    indentLevel++;
    fn();
    indentLevel--;
    currentSuite.pop();
}

function test(name, fn) {
    results.total++;
    const suitePath = currentSuite.length > 0 ? currentSuite.join(" > ") + " > " : "";
    try {
        fn();
        results.passed++;
        console.log(`${indent()}  PASS: ${name}`);
    } catch (error) {
        results.failed++;
        console.log(`${indent()}  FAIL: ${name}`);
        console.log(`${indent()}        Error: ${error.message}`);
    }
}

// test.skip — registers but does not run the test
test.skip = function (name, fn) {
    results.total++;
    results.skipped++;
    console.log(`${indent()}  SKIP: ${name}`);
};

// test.only — in real frameworks, ONLY runs this test. Here we just mark it.
test.only = function (name, fn) {
    results.total++;
    try {
        fn();
        results.passed++;
        console.log(`${indent()}  PASS (only): ${name}`);
    } catch (error) {
        results.failed++;
        console.log(`${indent()}  FAIL (only): ${name}`);
        console.log(`${indent()}        Error: ${error.message}`);
    }
};

// describe.skip — skip an entire suite
describe.skip = function (name, fn) {
    console.log(`${indent()}SUITE (skipped): ${name}`);
};

// Simple assert
function assert(condition, message) {
    if (!condition) throw new Error(message || "Assertion failed");
}

// ============================================================
console.log("--- Example 1: Basic test() Structure ---");
// ============================================================
// Each test() is an independent unit. If one fails, others still run.

test("simple addition works", () => {
    const result = 2 + 3;
    assert(result === 5, `Expected 5 but got ${result}`);
});

test("string concatenation works", () => {
    const greeting = "Hello" + " " + "World";
    assert(greeting === "Hello World", `Expected 'Hello World' but got '${greeting}'`);
});

test("arrays have correct length", () => {
    const arr = [1, 2, 3, 4, 5];
    assert(arr.length === 5, `Expected length 5 but got ${arr.length}`);
});

console.log("");

// ============================================================
console.log("--- Example 2: describe() Groups Related Tests ---");
// ============================================================
// describe creates a named group. Tests inside share a conceptual relationship.

describe("String Operations", () => {
    test("toUpperCase converts to uppercase", () => {
        assert("hello".toUpperCase() === "HELLO");
    });

    test("toLowerCase converts to lowercase", () => {
        assert("WORLD".toLowerCase() === "world");
    });

    test("trim removes whitespace", () => {
        assert("  hello  ".trim() === "hello");
    });

    test("includes checks for substring", () => {
        assert("Playwright is great".includes("great"));
    });
});

console.log("");

// ============================================================
console.log("--- Example 3: Nested describe Blocks ---");
// ============================================================
// describe blocks can be nested for hierarchical organization.
// This is like @Nested in JUnit 5.

describe("User Authentication", () => {

    describe("Login Page", () => {
        test("displays username field", () => {
            const page = { elements: ["username", "password", "submit"] };
            assert(page.elements.includes("username"));
        });

        test("displays password field", () => {
            const page = { elements: ["username", "password", "submit"] };
            assert(page.elements.includes("password"));
        });

        test("submit button is enabled", () => {
            const submitBtn = { enabled: true };
            assert(submitBtn.enabled === true);
        });
    });

    describe("Login Functionality", () => {
        test("valid credentials redirect to dashboard", () => {
            const result = { username: "admin", password: "admin123" };
            const isValid = result.username === "admin" && result.password === "admin123";
            assert(isValid, "Login should succeed with valid credentials");
        });

        test("invalid credentials show error message", () => {
            const errorMessage = "Invalid username or password";
            assert(errorMessage.includes("Invalid"));
        });
    });

    describe("Logout", () => {
        test("logout redirects to login page", () => {
            const currentUrl = "/login";
            assert(currentUrl === "/login");
        });
    });
});

console.log("");

// ============================================================
console.log("--- Example 4: test.skip() — Skip Tests ---");
// ============================================================
// Use test.skip when a test is not ready, has a known bug, or is platform-specific.

describe("Feature Under Development", () => {
    test("existing working feature", () => {
        assert(true);
    });

    test.skip("new feature not yet implemented", () => {
        // This code is never executed
        assert(false, "Should not run");
    });

    test.skip("known bug - ticket #1234", () => {
        // Skipped until bug is fixed
        assert(false);
    });

    test("another working test", () => {
        assert(1 + 1 === 2);
    });
});

console.log("");

// In actual Playwright:
//   test.skip('not ready', async ({ page }) => { ... });
//   test.skip(browserName === 'webkit', 'Not supported on WebKit');
//   test.skip(process.platform === 'win32', 'Windows-specific issue');

// ============================================================
console.log("--- Example 5: test.only() — Run Only This Test ---");
// ============================================================
// For debugging: only tests marked with .only run. Others are skipped.
// IMPORTANT: Remove .only before committing! It's a debugging tool only.

describe("Debugging Suite", () => {
    test("regular test A", () => {
        assert(true);
    });

    test.only("focused test B (only this would run in real framework)", () => {
        assert(true);
    });

    test("regular test C", () => {
        assert(true);
    });
});

console.log("");

// ============================================================
console.log("--- Example 6: describe.skip() — Skip Entire Suites ---");
// ============================================================

describe.skip("Entire Suite Skipped for Maintenance", () => {
    // None of these tests run
    test("test 1", () => assert(true));
    test("test 2", () => assert(true));
});

describe("Active Suite", () => {
    test("this suite runs normally", () => {
        assert(true);
    });
});

console.log("");

// ============================================================
console.log("--- Example 7: Test Naming Best Practices ---");
// ============================================================
// Good test names describe the BEHAVIOR, not the implementation.

describe("Shopping Cart", () => {
    // Good names: describe behavior from user perspective
    test("adds item to empty cart", () => {
        const cart = [];
        cart.push({ name: "Laptop", price: 999 });
        assert(cart.length === 1);
    });

    test("calculates total for multiple items", () => {
        const cart = [
            { name: "Laptop", price: 999 },
            { name: "Mouse", price: 29 }
        ];
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        assert(total === 1028, `Expected 1028 but got ${total}`);
    });

    test("removes item by name", () => {
        let cart = [
            { name: "Laptop", price: 999 },
            { name: "Mouse", price: 29 }
        ];
        cart = cart.filter((item) => item.name !== "Mouse");
        assert(cart.length === 1);
        assert(cart[0].name === "Laptop");
    });

    test("returns empty total for empty cart", () => {
        const cart = [];
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        assert(total === 0);
    });
});

console.log("");

// ============================================================
console.log("--- Example 8: What Actual Playwright Test Code Looks Like ---");
// ============================================================
// This is how real Playwright tests look (cannot run here, for reference only).

console.log(`
  // Actual Playwright test file: login.spec.ts
  // ============================================
  import { test, expect } from '@playwright/test';

  test.describe('Login Page', () => {

      test('should display login form', async ({ page }) => {
          await page.goto('/login');
          await expect(page.locator('#username')).toBeVisible();
          await expect(page.locator('#password')).toBeVisible();
          await expect(page.locator('button[type="submit"]')).toBeEnabled();
      });

      test('should login with valid credentials', async ({ page }) => {
          await page.goto('/login');
          await page.fill('#username', 'admin');
          await page.fill('#password', 'admin123');
          await page.click('button[type="submit"]');
          await expect(page).toHaveURL('/dashboard');
      });

      test.skip('should handle SSO login', async ({ page }) => {
          // Not yet implemented
      });

      test('should show error for invalid password', async ({ page }) => {
          await page.goto('/login');
          await page.fill('#username', 'admin');
          await page.fill('#password', 'wrong');
          await page.click('button[type="submit"]');
          await expect(page.locator('.error-message')).toHaveText('Invalid credentials');
      });
  });
`);

// ============================================================
console.log("--- Test Results Summary ---");
// ============================================================
console.log(`Total: ${results.total} | Passed: ${results.passed} | Failed: ${results.failed} | Skipped: ${results.skipped}`);
console.log("");

// === KEY TAKEAWAYS ===
console.log("=== KEY TAKEAWAYS ===");
console.log("1. describe('name', fn) groups related tests into a suite");
console.log("2. test('name', fn) defines a single test case (also called 'it' in some frameworks)");
console.log("3. Nested describes create a hierarchy: Feature > Scenario > Test");
console.log("4. test.skip() marks tests to be skipped (not ready, known bug, platform issue)");
console.log("5. test.only() runs ONLY marked tests (debugging tool — remove before commit)");
console.log("6. describe.skip() skips an entire suite of tests");
console.log("7. Java: @Test = test(), @Nested = describe(), @Disabled = test.skip()");
console.log("8. Good test names describe behavior: 'adds item to cart' not 'test array push'");
