// Extra_05_POM_Assertions_in_Tests.js
// Topic: Page Object Model (POM) - Part 5 of 7
// Extends: Extra_02 (POM Basic Page), Extra_04 (Navigation Actions)
//
// CONCEPT: A fundamental POM principle is that assertions belong in TEST files,
// NOT in page objects. Page objects expose data (getText, getCount, isVisible),
// and tests use that data to make assertions. Putting assertions inside page
// objects leads to rigid, hard-to-reuse code where one test's expectations
// contaminate another test's logic.
//
// JAVA COMPARISON: Same principle in Java — page objects use methods like
// `public String getErrorMessage()` and tests call `assertEquals(expected, page.getErrorMessage())`.
// The TestNG/JUnit assertion lives in the @Test method, never in the page class.
//
// PLAYWRIGHT RELEVANCE: Playwright's expect() API is used in test files. Page
// objects return locators or text, and tests wrap them with expect(). The Playwright
// docs explicitly recommend this separation.
// ============================================================

console.log("=== EXTRA 05: POM — ASSERTIONS BELONG IN TESTS ===\n");

// ---------------------------------------------------------------
// Mock infrastructure
// ---------------------------------------------------------------

class MockLocator {
    constructor(selector, data) {
        this.selector = selector;
        this._data = data;
    }

    async textContent() {
        return this._data[this.selector] || "";
    }

    async isVisible() {
        return this._data[this.selector] !== undefined && this._data[this.selector] !== "";
    }

    async count() {
        const val = this._data[this.selector + "_count"];
        return val !== undefined ? val : 0;
    }
}

class MockPage {
    constructor(data = {}) {
        this._data = data;
        this._url = data._url || "";
    }

    locator(selector) {
        return new MockLocator(selector, this._data);
    }

    url() {
        return this._url;
    }
}

// Simple assertion helper (simulating expect())
function assert(actual, expected, message) {
    const pass = actual === expected;
    const status = pass ? "PASS" : "FAIL";
    console.log(`    [${status}] ${message}`);
    if (!pass) {
        console.log(`      Expected: ${JSON.stringify(expected)}`);
        console.log(`      Actual:   ${JSON.stringify(actual)}`);
    }
    return pass;
}

function assertTrue(actual, message) {
    return assert(actual, true, message);
}

// ---------------------------------------------------------------
// Example 1: THE ANTI-PATTERN — Assertions Inside Page Objects
// ---------------------------------------------------------------
console.log("--- Example 1: ANTI-PATTERN — Assertions Inside Page Objects ---");

class LoginPageBad {
    constructor(page) {
        this.page = page;
    }

    get errorMessage() { return this.page.locator(".error-msg"); }
    get welcomeMessage() { return this.page.locator(".welcome"); }

    // BAD: Assertion is INSIDE the page object
    async verifyLoginSuccess() {
        const welcomeText = await this.welcomeMessage.textContent();
        if (!welcomeText.includes("Welcome")) {
            throw new Error("Login failed! Expected welcome message.");
        }
        console.log("    [LoginPageBad] verified login success internally");
        return true;
    }

    // BAD: Hardcoded expected value inside page object
    async verifyErrorMessage() {
        const errorText = await this.errorMessage.textContent();
        if (errorText !== "Invalid credentials") {
            throw new Error(`Expected 'Invalid credentials' but got '${errorText}'`);
        }
        console.log("    [LoginPageBad] verified error message internally");
        return true;
    }

    // BAD: Asserting URL inside page object
    async verifyRedirectedToDashboard() {
        const url = this.page.url();
        if (!url.includes("/dashboard")) {
            throw new Error("Not redirected to dashboard!");
        }
        console.log("    [LoginPageBad] verified URL redirect internally");
        return true;
    }
}

console.log("  Problems with assertions in page objects:\n");

// Problem 1: Test A wants "Invalid credentials", Test B wants "Account locked"
const pageDataA = { ".error-msg": "Invalid credentials", _url: "/login" };
const pageDataB = { ".error-msg": "Account locked after 3 attempts", _url: "/login" };

const badPageA = new LoginPageBad(new MockPage(pageDataA));
const badPageB = new LoginPageBad(new MockPage(pageDataB));

try {
    await badPageA.verifyErrorMessage(); // works
} catch (e) {
    console.log(`    Error: ${e.message}`);
}

try {
    await badPageB.verifyErrorMessage(); // FAILS — hardcoded expectation
} catch (e) {
    console.log(`    Error: ${e.message}`);
}

console.log(`
  PROBLEM 1: Hardcoded expectations
  - verifyErrorMessage() checks for "Invalid credentials"
  - But Test B expects "Account locked after 3 attempts"
  - The page object is too rigid — it assumes one specific scenario

  PROBLEM 2: Not reusable
  - What if a test wants to check the error message contains "locked"?
  - Or check error message length? Or check it's not empty?
  - Each variant needs a NEW method in the page object

  PROBLEM 3: Hides test intent
  - When reading the test, you see: await loginPage.verifyErrorMessage()
  - You do NOT see WHAT is being verified
  - The assertion is buried inside another file
`);

// ---------------------------------------------------------------
// Example 2: THE CORRECT PATTERN — Page Objects Return Data
// ---------------------------------------------------------------
console.log("--- Example 2: CORRECT PATTERN — Page Objects Return Data ---");

class LoginPageGood {
    constructor(page) {
        this.page = page;
    }

    // Locators — return locator objects (for Playwright expect())
    get errorMessage() { return this.page.locator(".error-msg"); }
    get welcomeMessage() { return this.page.locator(".welcome"); }
    get usernameInput() { return this.page.locator("#username"); }
    get passwordInput() { return this.page.locator("#password"); }
    get loginButton() { return this.page.locator("#login-btn"); }

    // Actions — perform interactions, return data or page objects
    async goto() {
        // await this.page.goto('/login');
    }

    async login(username, password) {
        await this.usernameInput.textContent(); // simulated fill
        await this.passwordInput.textContent(); // simulated fill
        await this.loginButton.textContent();   // simulated click
    }

    // Data retrieval methods — NO assertions here!
    async getErrorText() {
        return await this.errorMessage.textContent();
    }

    async isErrorVisible() {
        return await this.errorMessage.isVisible();
    }

    async getWelcomeText() {
        return await this.welcomeMessage.textContent();
    }

    async isWelcomeVisible() {
        return await this.welcomeMessage.isVisible();
    }

    getCurrentURL() {
        return this.page.url();
    }
}

console.log("  LoginPageGood methods (NO assertions):");
console.log("    getErrorText()    -> returns the error text string");
console.log("    isErrorVisible()  -> returns true/false");
console.log("    getWelcomeText()  -> returns the welcome text string");
console.log("    isWelcomeVisible()-> returns true/false");
console.log("    getCurrentURL()   -> returns the current URL string\n");

// ---------------------------------------------------------------
// Example 3: Tests Make the Assertions
// ---------------------------------------------------------------
console.log("--- Example 3: Tests Make the Assertions ---");

async function testInvalidLogin() {
    console.log("  Test: Invalid login shows error message");
    const page = new MockPage({ ".error-msg": "Invalid credentials", _url: "/login" });
    const loginPage = new LoginPageGood(page);

    const errorText = await loginPage.getErrorText();
    const errorVisible = await loginPage.isErrorVisible();

    // Assertions are HERE in the test, not in the page object
    assert(errorText, "Invalid credentials", "Error message is correct");
    assertTrue(errorVisible, "Error message is visible");
    console.log();
}

async function testAccountLocked() {
    console.log("  Test: Account locked after failed attempts");
    const page = new MockPage({ ".error-msg": "Account locked after 3 attempts", _url: "/login" });
    const loginPage = new LoginPageGood(page);

    const errorText = await loginPage.getErrorText();

    // SAME page object, DIFFERENT assertion — this is the power of separation!
    assertTrue(errorText.includes("locked"), "Error mentions 'locked'");
    assertTrue(errorText.includes("3 attempts"), "Error mentions '3 attempts'");
    console.log();
}

async function testSuccessfulLogin() {
    console.log("  Test: Successful login shows welcome message");
    const page = new MockPage({
        ".welcome": "Welcome back, Admin!",
        ".error-msg": "",
        _url: "/dashboard"
    });
    const loginPage = new LoginPageGood(page);

    const welcomeText = await loginPage.getWelcomeText();
    const errorVisible = await loginPage.isErrorVisible();
    const currentURL = loginPage.getCurrentURL();

    // Different assertions using the SAME page object
    assertTrue(welcomeText.includes("Welcome"), "Welcome message shown");
    assertTrue(!errorVisible, "Error message is NOT visible");
    assertTrue(currentURL.includes("/dashboard"), "Redirected to dashboard");
    console.log();
}

async function testEmptyError() {
    console.log("  Test: Empty fields show required message");
    const page = new MockPage({ ".error-msg": "Username and password are required", _url: "/login" });
    const loginPage = new LoginPageGood(page);

    const errorText = await loginPage.getErrorText();

    // Yet another different assertion with the same page object!
    assertTrue(errorText.includes("required"), "Error mentions 'required'");
    assertTrue(errorText.length > 0, "Error message is not empty");
    console.log();
}

// ---------------------------------------------------------------
// Example 4: Side-by-Side Comparison
// ---------------------------------------------------------------
console.log("--- Example 4: Side-by-Side — Anti-Pattern vs Correct ---");

console.log(`
  ANTI-PATTERN (assertions in page object):     CORRECT (assertions in test):
  ==========================================     ================================

  // LoginPage.js                                // LoginPage.js
  class LoginPage {                              class LoginPage {
      async verifyError(expected) {                  async getErrorText() {
          const text = await this.error              return await this.error
              .textContent();                            .textContent();
          expect(text).toBe(expected);  // BAD       }
      }                                          }
      async verifyLoginSuccess() {
          await expect(this.welcome)                 // login.spec.js
              .toBeVisible();             // BAD     test('shows error', async () => {
      }                                                  const text = await
  }                                                          loginPage.getErrorText();
                                                         expect(text).toBe('Invalid');
  // login.spec.js                                   });
  test('shows error', async () => {
      await loginPage.verifyError('Invalid');        test('shows welcome', async () => {
  });  // Looks clean but hides the assertion            await expect(loginPage.welcome)
                                                             .toBeVisible();
  test('account locked', async () => {               });
      await loginPage.verifyError('Locked');
      // Wait, verifyError only checks exact         test('account locked', async () => {
      // match... need another method!                   const text = await
  });                                                        loginPage.getErrorText();
                                                         expect(text).toContain('locked');
                                                     });  // Flexible! Any assertion works
`);

// ---------------------------------------------------------------
// Example 5: What About Helper Methods in Page Objects?
// ---------------------------------------------------------------
console.log("--- Example 5: The Gray Area — Helper Methods ---");

console.log(`
  Q: Can page objects have ANY verification-like methods?
  A: YES, but they should return BOOLEAN or DATA, not throw errors.

  ACCEPTABLE (returns data, no assertion):
  ----------------------------------------
  class DashboardPage {
      async isLoaded() {
          // Returns a boolean — the TEST decides what to do with it
          const url = this.page.url();
          return url.includes('/dashboard');
      }

      async getItemCount() {
          // Returns a number — the TEST asserts on it
          return await this.page.locator('.item').count();
      }

      async getNotificationTexts() {
          // Returns an array — the TEST checks contents
          const notifications = this.page.locator('.notification');
          const count = await notifications.count();
          const texts = [];
          for (let i = 0; i < count; i++) {
              texts.push(await notifications.nth(i).textContent());
          }
          return texts;
      }
  }

  NOT ACCEPTABLE (contains assertion logic):
  -------------------------------------------
  class DashboardPage {
      async verifyIsLoaded() {
          const url = this.page.url();
          if (!url.includes('/dashboard')) {
              throw new Error('Dashboard not loaded!');  // BAD
          }
      }

      async verifyItemCount(expected) {
          const count = await this.page.locator('.item').count();
          expect(count).toBe(expected);  // BAD — assertion in page object
      }
  }
`);

// ---------------------------------------------------------------
// Example 6: Playwright-Specific Patterns
// ---------------------------------------------------------------
console.log("--- Example 6: Playwright expect() with Page Objects ---");

console.log(`
  Playwright's expect() can work directly with locators.
  This is incredibly powerful with the POM pattern:

  // Page Object — exposes locators
  class ProductPage {
      constructor(page) { this.page = page; }

      get title()       { return this.page.locator('h1.product-title'); }
      get price()       { return this.page.locator('.price'); }
      get addToCart()    { return this.page.getByRole('button', { name: 'Add to cart' }); }
      get cartCount()   { return this.page.locator('.cart-badge'); }
      get successAlert() { return this.page.locator('.alert-success'); }
  }

  // Test — uses expect() with the LOCATORS from the page object
  test('add product to cart', async ({ page }) => {
      const productPage = new ProductPage(page);

      // Playwright's expect() accepts locators directly:
      await expect(productPage.title).toHaveText('Blue T-Shirt');
      await expect(productPage.price).toContainText('$29.99');

      await productPage.addToCart.click();

      await expect(productPage.successAlert).toBeVisible();
      await expect(productPage.cartCount).toHaveText('1');
  });

  // KEY INSIGHT: Page object exposes the LOCATOR (not the text).
  // The test uses expect(locator) with Playwright's auto-retrying assertions.
  // This is better than: const text = await productPage.getTitle();
  //                       expect(text).toBe('Blue T-Shirt');
  // Because Playwright's locator assertions auto-retry!
`);

// ---------------------------------------------------------------
// Example 7: Java Comparison
// ---------------------------------------------------------------
console.log("--- Example 7: Java Comparison — Same Principle ---");

console.log(`
  JAVA TESTNG/SELENIUM:                         PLAYWRIGHT JS:
  =====================                          ==============

  // LoginPage.java (page object)               // LoginPage.js (page object)
  public class LoginPage {                       class LoginPage {
      public String getErrorMessage() {              async getErrorText() {
          return driver.findElement(                     return await this.errorMsg
              By.css(".error")).getText();                    .textContent();
      }                                              }
  }                                              }

  // LoginTest.java (test class)                 // login.spec.js (test file)
  @Test                                          test('invalid login', async ({page}) => {
  public void testInvalidLogin() {                   const loginPage = new LoginPage(page);
      LoginPage loginPage =                          await loginPage.login('bad', 'bad');
          new LoginPage(driver);
      loginPage.login("bad", "bad");                 // Assertion in TEST
                                                     const error = await
      // Assertion in TEST                               loginPage.getErrorText();
      Assert.assertEquals(                           expect(error).toBe(
          loginPage.getErrorMessage(),                   'Invalid credentials');
          "Invalid credentials"                  });
      );
  }

  IDENTICAL PRINCIPLE:
  - Page object: getErrorMessage() returns data
  - Test: Assert.assertEquals() / expect() makes the assertion
  - The separation is the same in both languages
`);

// ---------------------------------------------------------------
// Run all async tests
// ---------------------------------------------------------------

async function runAll() {
    await testInvalidLogin();
    await testAccountLocked();
    await testSuccessfulLogin();
    await testEmptyError();

    // === KEY TAKEAWAYS ===
    console.log("=== KEY TAKEAWAYS ===");
    console.log("1. ASSERTIONS belong in TEST files, NEVER in page objects");
    console.log("2. Page objects RETURN data (getText, isVisible, getCount, getURL)");
    console.log("3. Tests USE that data with expect() or assert()");
    console.log("4. Anti-pattern: page.verifyErrorMessage() — hides assertion, limits reuse");
    console.log("5. Correct: const text = await page.getErrorText(); expect(text).toBe(...)");
    console.log("6. Page objects CAN have boolean helpers like isLoaded() — they return data, not assert");
    console.log("7. Playwright's expect(locator) is powerful — pass locators from page objects to expect()");
    console.log("8. Same principle in Java: page object returns data, @Test method calls Assert.assertEquals()");
}

runAll();
