// Extra_02_Test_Assertions.js
// Topic: Test Assertions - expect() Matchers - Part 2 of 8
// Extends: ex_34 (Test Structure and Hooks)
//
// CONCEPT: Assertions verify that actual values match expected values. The expect() function
// wraps a value and provides matcher methods like toBe(), toEqual(), toContain(). If an
// assertion fails, it throws an error with a descriptive message, causing the test to fail.
// JAVA COMPARISON: JUnit's assertEquals(), assertTrue(), assertNotNull(), assertThrows().
//   AssertJ fluent assertions: assertThat(value).isEqualTo(expected). Hamcrest matchers.
// PLAYWRIGHT RELEVANCE: Playwright extends expect with web-specific matchers: toHaveText(),
//   toBeVisible(), toHaveURL(), toHaveAttribute(), toHaveCount(). Auto-retrying assertions.
// ============================================================

// === Build a Simple expect() Matcher System ===
// This simulates how Playwright/Jest expect() works internally.

let assertionCount = 0;
let passCount = 0;
let failCount = 0;

function expect(actual) {
    return {
        // === Strict equality (===) ===
        toBe(expected) {
            assertionCount++;
            if (actual === expected) {
                passCount++;
                return true;
            }
            failCount++;
            throw new Error(`Expected ${JSON.stringify(actual)} to be ${JSON.stringify(expected)}`);
        },

        // === Deep equality (works for objects and arrays) ===
        toEqual(expected) {
            assertionCount++;
            const actualStr = JSON.stringify(actual);
            const expectedStr = JSON.stringify(expected);
            if (actualStr === expectedStr) {
                passCount++;
                return true;
            }
            failCount++;
            throw new Error(`Expected ${actualStr} to equal ${expectedStr}`);
        },

        // === Truthy check ===
        toBeTruthy() {
            assertionCount++;
            if (actual) {
                passCount++;
                return true;
            }
            failCount++;
            throw new Error(`Expected ${JSON.stringify(actual)} to be truthy`);
        },

        // === Falsy check ===
        toBeFalsy() {
            assertionCount++;
            if (!actual) {
                passCount++;
                return true;
            }
            failCount++;
            throw new Error(`Expected ${JSON.stringify(actual)} to be falsy`);
        },

        // === Null check ===
        toBeNull() {
            assertionCount++;
            if (actual === null) {
                passCount++;
                return true;
            }
            failCount++;
            throw new Error(`Expected ${JSON.stringify(actual)} to be null`);
        },

        // === Undefined check ===
        toBeUndefined() {
            assertionCount++;
            if (actual === undefined) {
                passCount++;
                return true;
            }
            failCount++;
            throw new Error(`Expected ${JSON.stringify(actual)} to be undefined`);
        },

        // === Defined check (not undefined) ===
        toBeDefined() {
            assertionCount++;
            if (actual !== undefined) {
                passCount++;
                return true;
            }
            failCount++;
            throw new Error(`Expected value to be defined but got undefined`);
        },

        // === Contains check (strings and arrays) ===
        toContain(item) {
            assertionCount++;
            if (typeof actual === "string" && actual.includes(item)) {
                passCount++;
                return true;
            }
            if (Array.isArray(actual) && actual.includes(item)) {
                passCount++;
                return true;
            }
            failCount++;
            throw new Error(`Expected ${JSON.stringify(actual)} to contain ${JSON.stringify(item)}`);
        },

        // === Length check ===
        toHaveLength(expected) {
            assertionCount++;
            if (actual.length === expected) {
                passCount++;
                return true;
            }
            failCount++;
            throw new Error(`Expected length ${expected} but got ${actual.length}`);
        },

        // === Greater than ===
        toBeGreaterThan(expected) {
            assertionCount++;
            if (actual > expected) {
                passCount++;
                return true;
            }
            failCount++;
            throw new Error(`Expected ${actual} to be greater than ${expected}`);
        },

        // === Less than ===
        toBeLessThan(expected) {
            assertionCount++;
            if (actual < expected) {
                passCount++;
                return true;
            }
            failCount++;
            throw new Error(`Expected ${actual} to be less than ${expected}`);
        },

        // === Regex match ===
        toMatch(regex) {
            assertionCount++;
            const re = typeof regex === "string" ? new RegExp(regex) : regex;
            if (re.test(actual)) {
                passCount++;
                return true;
            }
            failCount++;
            throw new Error(`Expected "${actual}" to match ${regex}`);
        },

        // === Type check ===
        toBeInstanceOf(constructor) {
            assertionCount++;
            if (actual instanceof constructor) {
                passCount++;
                return true;
            }
            failCount++;
            throw new Error(`Expected instance of ${constructor.name}`);
        },

        // === NOT modifier (negation) ===
        not: {
            toBe(expected) {
                assertionCount++;
                if (actual !== expected) {
                    passCount++;
                    return true;
                }
                failCount++;
                throw new Error(`Expected ${JSON.stringify(actual)} NOT to be ${JSON.stringify(expected)}`);
            },
            toContain(item) {
                assertionCount++;
                const contains = typeof actual === "string"
                    ? actual.includes(item)
                    : Array.isArray(actual) && actual.includes(item);
                if (!contains) {
                    passCount++;
                    return true;
                }
                failCount++;
                throw new Error(`Expected ${JSON.stringify(actual)} NOT to contain ${JSON.stringify(item)}`);
            },
            toEqual(expected) {
                assertionCount++;
                if (JSON.stringify(actual) !== JSON.stringify(expected)) {
                    passCount++;
                    return true;
                }
                failCount++;
                throw new Error(`Expected values NOT to be equal`);
            }
        }
    };
}

// Helper: run a test and report result
function test(name, fn) {
    try {
        fn();
        console.log(`  PASS: ${name}`);
    } catch (error) {
        console.log(`  FAIL: ${name}`);
        console.log(`        ${error.message}`);
    }
}

// ============================================================
console.log("--- Example 1: toBe() — Strict Equality ---");
// ============================================================
// toBe uses === (strict equality). Checks same value AND same type.
// Use for primitives: numbers, strings, booleans, null, undefined.

test("numbers are strictly equal", () => {
    expect(5).toBe(5);
});

test("strings are strictly equal", () => {
    expect("hello").toBe("hello");
});

test("booleans are strictly equal", () => {
    expect(true).toBe(true);
});

test("null is null", () => {
    expect(null).toBe(null);
});

// toBe does NOT work for object comparison (different references)
test("two objects with same content are NOT toBe equal", () => {
    const a = { name: "Alice" };
    const b = { name: "Alice" };
    expect(a).not.toBe(b);  // Different references!
});

console.log("");

// ============================================================
console.log("--- Example 2: toEqual() — Deep Equality ---");
// ============================================================
// toEqual compares the contents/structure of objects and arrays.
// Use for objects, arrays, and nested structures.

test("objects with same content are equal", () => {
    expect({ name: "Alice", age: 30 }).toEqual({ name: "Alice", age: 30 });
});

test("arrays with same content are equal", () => {
    expect([1, 2, 3]).toEqual([1, 2, 3]);
});

test("nested objects are deeply equal", () => {
    const user = {
        name: "Alice",
        address: { city: "NYC", zip: "10001" }
    };
    expect(user).toEqual({
        name: "Alice",
        address: { city: "NYC", zip: "10001" }
    });
});

test("different objects are not equal", () => {
    expect({ a: 1 }).not.toEqual({ a: 2 });
});

console.log("");

// ============================================================
console.log("--- Example 3: toBeTruthy() and toBeFalsy() ---");
// ============================================================
// Truthy: any value that converts to true in a boolean context
// Falsy: false, 0, '', null, undefined, NaN

test("non-empty string is truthy", () => {
    expect("hello").toBeTruthy();
});

test("number 1 is truthy", () => {
    expect(1).toBeTruthy();
});

test("object is truthy", () => {
    expect({}).toBeTruthy();
});

test("empty array is truthy (surprise!)", () => {
    expect([]).toBeTruthy();  // arrays are objects, always truthy
});

test("empty string is falsy", () => {
    expect("").toBeFalsy();
});

test("0 is falsy", () => {
    expect(0).toBeFalsy();
});

test("null is falsy", () => {
    expect(null).toBeFalsy();
});

test("undefined is falsy", () => {
    expect(undefined).toBeFalsy();
});

console.log("");

// ============================================================
console.log("--- Example 4: toContain() — Substring and Array Contains ---");
// ============================================================

test("string contains substring", () => {
    expect("Playwright is awesome").toContain("awesome");
});

test("array contains element", () => {
    expect(["chromium", "firefox", "webkit"]).toContain("firefox");
});

test("URL contains expected path", () => {
    const url = "https://example.com/dashboard?user=admin";
    expect(url).toContain("/dashboard");
    expect(url).toContain("user=admin");
});

test("string does not contain unexpected text", () => {
    expect("Success message").not.toContain("Error");
});

console.log("");

// ============================================================
console.log("--- Example 5: toHaveLength() ---");
// ============================================================

test("array has correct length", () => {
    expect([1, 2, 3]).toHaveLength(3);
});

test("string has correct length", () => {
    expect("hello").toHaveLength(5);
});

test("empty array has length 0", () => {
    expect([]).toHaveLength(0);
});

console.log("");

// ============================================================
console.log("--- Example 6: Comparison Matchers ---");
// ============================================================

test("value is greater than threshold", () => {
    const responseTime = 250;
    expect(responseTime).toBeLessThan(1000); // under 1 second
});

test("items count is greater than zero", () => {
    const items = [1, 2, 3];
    expect(items.length).toBeGreaterThan(0);
});

test("page load under 3 seconds", () => {
    const loadTimeMs = 1500;
    expect(loadTimeMs).toBeLessThan(3000);
});

console.log("");

// ============================================================
console.log("--- Example 7: toMatch() — Regular Expression Matching ---");
// ============================================================

test("email matches pattern", () => {
    expect("user@example.com").toMatch(/^[\w.]+@[\w.]+\.\w+$/);
});

test("date matches format", () => {
    expect("2024-01-15").toMatch(/^\d{4}-\d{2}-\d{2}$/);
});

test("URL matches pattern", () => {
    expect("https://example.com/api/v2").toMatch(/\/api\/v\d+/);
});

console.log("");

// ============================================================
console.log("--- Example 8: toBeNull(), toBeUndefined(), toBeDefined() ---");
// ============================================================

test("null is null", () => {
    const result = null;
    expect(result).toBeNull();
});

test("undefined is undefined", () => {
    let notSet;
    expect(notSet).toBeUndefined();
});

test("assigned value is defined", () => {
    const value = "something";
    expect(value).toBeDefined();
});

console.log("");

// ============================================================
console.log("--- Example 9: toBeInstanceOf() — Type Checking ---");
// ============================================================

test("error is instance of Error", () => {
    const err = new TypeError("bad type");
    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(TypeError);
});

test("array is instance of Array", () => {
    expect([1, 2, 3]).toBeInstanceOf(Array);
});

test("date is instance of Date", () => {
    expect(new Date()).toBeInstanceOf(Date);
});

console.log("");

// ============================================================
console.log("--- Example 10: expect().not — Negated Assertions ---");
// ============================================================

test("values are not equal", () => {
    expect(5).not.toBe(10);
});

test("array does not contain item", () => {
    expect(["chrome", "firefox"]).not.toContain("safari");
});

test("objects are not deeply equal", () => {
    expect({ a: 1 }).not.toEqual({ a: 2 });
});

console.log("");

// ============================================================
console.log("--- Example 11: Practical Test Assertion Patterns ---");
// ============================================================

test("API response has expected structure", () => {
    const response = {
        status: 200,
        data: {
            users: [
                { id: 1, name: "Alice" },
                { id: 2, name: "Bob" }
            ]
        }
    };

    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
    expect(response.data.users).toHaveLength(2);
    expect(response.data.users[0].name).toBe("Alice");
});

test("form validation produces expected errors", () => {
    function validateForm(data) {
        const errors = [];
        if (!data.email) errors.push("Email required");
        if (!data.password) errors.push("Password required");
        if (data.password && data.password.length < 8) errors.push("Password too short");
        return errors;
    }

    const errors = validateForm({ email: "", password: "123" });
    expect(errors).toContain("Email required");
    expect(errors).toContain("Password too short");
    expect(errors).toHaveLength(2);
});

console.log("");

// ============================================================
console.log("--- Example 12: Playwright-Specific Assertions (Reference) ---");
// ============================================================
// These are Playwright's web-specific assertions that auto-retry.
// They CANNOT run here but are shown for reference.

console.log(`
  Playwright extends expect() with web-specific matchers:

  // Element visibility
  await expect(page.locator('#submit')).toBeVisible();
  await expect(page.locator('.spinner')).toBeHidden();
  await expect(page.locator('button')).toBeEnabled();
  await expect(page.locator('input')).toBeDisabled();

  // Text content
  await expect(page.locator('h1')).toHaveText('Welcome');
  await expect(page.locator('.message')).toContainText('success');

  // Attributes and values
  await expect(page.locator('input')).toHaveValue('admin');
  await expect(page.locator('a')).toHaveAttribute('href', '/dashboard');
  await expect(page.locator('div')).toHaveClass(/active/);

  // Page-level
  await expect(page).toHaveURL('/dashboard');
  await expect(page).toHaveTitle('Dashboard - My App');

  // Count
  await expect(page.locator('.item')).toHaveCount(5);

  // These are AUTO-RETRYING: Playwright polls until the assertion passes
  // or the timeout is reached (default 5 seconds).
  // This eliminates flaky tests caused by timing issues!
`);

// ============================================================
console.log("--- Assertion Summary ---");
// ============================================================
console.log(`Assertions run: ${assertionCount} | Passed: ${passCount} | Failed: ${failCount}`);
console.log("");

// === KEY TAKEAWAYS ===
console.log("=== KEY TAKEAWAYS ===");
console.log("1. expect(actual).toBe(expected) for strict equality (===) on primitives");
console.log("2. expect(actual).toEqual(expected) for deep equality on objects and arrays");
console.log("3. toBeTruthy()/toBeFalsy() check JavaScript truthiness (not strict boolean)");
console.log("4. toContain() works on both strings (substring) and arrays (element)");
console.log("5. expect().not.toBe() negates any assertion");
console.log("6. Playwright adds toBeVisible(), toHaveText(), toHaveURL() with auto-retry");
console.log("7. Java: assertEquals() = toBe(), assertThat().isEqualTo() = toEqual()");
console.log("8. Auto-retrying assertions are Playwright's killer feature against flaky tests");
