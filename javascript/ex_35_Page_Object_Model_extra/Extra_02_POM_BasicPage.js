// Extra_02_POM_BasicPage.js
// Topic: Page Object Model (POM) - Part 2 of 7
// Extends: Extra_01 (POM Concept)
//
// CONCEPT: A basic Page Object class encapsulates a single page's locators and
// actions. The constructor receives a "page" reference, locators are defined as
// getters or properties, and actions are async methods that perform user
// interactions like fill, click, and navigation.
//
// JAVA COMPARISON: In Java Selenium, you use @FindBy annotations and
// PageFactory.initElements(). In Playwright JS, you define locators as getters
// that call this.page.locator(). No annotation magic — just clean JavaScript.
//
// PLAYWRIGHT RELEVANCE: Every Playwright project creates Page Object classes
// exactly like this. The Playwright docs show this pattern as the canonical way
// to organize test code. The `page` fixture is passed to Page Object constructors.
// ============================================================

console.log("=== EXTRA 02: POM — BASIC PAGE CLASS ===\n");

// ---------------------------------------------------------------
// First, our mock infrastructure (simulates Playwright's page)
// ---------------------------------------------------------------

class MockLocator {
    constructor(selector, mockPage) {
        this.selector = selector;
        this.mockPage = mockPage;
    }

    async fill(value) {
        this.mockPage._store[this.selector] = value;
        this.mockPage._log.push(`fill('${this.selector}', '${value}')`);
    }

    async click() {
        this.mockPage._log.push(`click('${this.selector}')`);
        // Simulate login behavior
        if (this.selector === '[data-testid="login-submit"]') {
            const user = this.mockPage._store["#username"] || "";
            const pass = this.mockPage._store["#password"] || "";
            if (user === "admin" && pass === "secret") {
                this.mockPage._currentURL = "https://example.com/dashboard";
                this.mockPage._store[".error-message"] = "";
            } else if (!user || !pass) {
                this.mockPage._store[".error-message"] = "Username and password are required";
            } else {
                this.mockPage._store[".error-message"] = "Invalid username or password";
            }
        }
    }

    async textContent() {
        return this.mockPage._store[this.selector] || "";
    }

    async isVisible() {
        const text = this.mockPage._store[this.selector];
        return text !== undefined && text !== "";
    }
}

class MockPage {
    constructor() {
        this._currentURL = "";
        this._store = {};
        this._log = [];
    }

    async goto(url) {
        this._currentURL = url;
        this._log.push(`goto('${url}')`);
    }

    locator(selector) {
        return new MockLocator(selector, this);
    }

    url() {
        return this._currentURL;
    }

    getLog() {
        return [...this._log];
    }
}

// ---------------------------------------------------------------
// Example 1: LoginPage Class — The Core Structure
// ---------------------------------------------------------------
console.log("--- Example 1: LoginPage Class Definition ---");

class LoginPage {
    // The constructor receives the Playwright page object
    constructor(page) {
        this.page = page;
        this.url = "https://example.com/login";
    }

    // ---- LOCATORS as getters ----
    // Using getters means locators are evaluated fresh each time.
    // This is important because Playwright locators are lazy —
    // they find elements at interaction time, not definition time.

    get usernameInput() {
        return this.page.locator("#username");
    }

    get passwordInput() {
        return this.page.locator("#password");
    }

    get loginButton() {
        return this.page.locator('[data-testid="login-submit"]');
    }

    get errorMessage() {
        return this.page.locator(".error-message");
    }

    get rememberMeCheckbox() {
        return this.page.locator("#remember-me");
    }

    // ---- ACTION METHODS ----
    // These are async because Playwright operations return Promises

    async goto() {
        await this.page.goto(this.url);
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async loginWithRememberMe(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.rememberMeCheckbox.click();
        await this.loginButton.click();
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }

    async isErrorVisible() {
        return await this.errorMessage.isVisible();
    }

    async getCurrentURL() {
        return this.page.url();
    }
}

// Display the class structure
console.log("  LoginPage class created with:");
console.log("    Constructor: stores page reference and URL");
console.log("    Locator getters: usernameInput, passwordInput, loginButton, errorMessage");
console.log("    Action methods: goto(), login(), loginWithRememberMe()");
console.log("    Data methods: getErrorMessage(), isErrorVisible(), getCurrentURL()");
console.log();

// ---------------------------------------------------------------
// Example 2: Using the LoginPage (Simulated Test)
// ---------------------------------------------------------------
console.log("--- Example 2: Using LoginPage — Successful Login ---");

async function testSuccessfulLogin() {
    const page = new MockPage();
    const loginPage = new LoginPage(page);

    // Step 1: Navigate to login page
    await loginPage.goto();
    console.log(`  Navigated to: ${loginPage.url}`);

    // Step 2: Perform login
    await loginPage.login("admin", "secret");
    console.log("  Performed login with valid credentials");

    // Step 3: Verify (in a real test, you'd use expect())
    const currentURL = await loginPage.getCurrentURL();
    const redirected = currentURL.includes("/dashboard");
    console.log(`  Current URL: ${currentURL}`);
    console.log(`  Redirected to dashboard: ${redirected}`);

    // Show the action log
    console.log("  Action log:");
    page.getLog().forEach(action => console.log(`    -> ${action}`));
    console.log(`  Test result: ${redirected ? "PASS" : "FAIL"}\n`);
}

async function testInvalidLogin() {
    const page = new MockPage();
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login("wronguser", "wrongpass");

    const errorMsg = await loginPage.getErrorMessage();
    const hasError = await loginPage.isErrorVisible();

    console.log("--- Example 3: Using LoginPage — Invalid Login ---");
    console.log(`  Error visible: ${hasError}`);
    console.log(`  Error message: "${errorMsg}"`);
    console.log("  Action log:");
    page.getLog().forEach(action => console.log(`    -> ${action}`));
    console.log(`  Test result: ${hasError && errorMsg.includes("Invalid") ? "PASS" : "FAIL"}\n`);
}

async function testEmptyFields() {
    const page = new MockPage();
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login("", "");

    const errorMsg = await loginPage.getErrorMessage();
    const hasError = await loginPage.isErrorVisible();

    console.log("--- Example 4: Using LoginPage — Empty Fields ---");
    console.log(`  Error visible: ${hasError}`);
    console.log(`  Error message: "${errorMsg}"`);
    console.log(`  Test result: ${hasError && errorMsg.includes("required") ? "PASS" : "FAIL"}\n`);
}

// ---------------------------------------------------------------
// Example 5: Locators as Properties vs Getters
// ---------------------------------------------------------------
console.log("--- Example 5: Locators — Properties vs Getters ---");

class LoginPageWithProperties {
    constructor(page) {
        this.page = page;
        // APPROACH 1: Locators as properties (created once in constructor)
        this.usernameInput = page.locator("#username");
        this.passwordInput = page.locator("#password");
        this.loginButton = page.locator('[data-testid="login-submit"]');
    }
}

class LoginPageWithGetters {
    constructor(page) {
        this.page = page;
    }

    // APPROACH 2: Locators as getters (created fresh each access)
    get usernameInput() { return this.page.locator("#username"); }
    get passwordInput() { return this.page.locator("#password"); }
    get loginButton() { return this.page.locator('[data-testid="login-submit"]'); }
}

console.log(`
  APPROACH 1: Properties (assigned in constructor)
  ------------------------------------------------
  constructor(page) {
      this.usernameInput = page.locator("#username");
  }
  - Locator created ONCE when class is instantiated
  - Slightly more memory efficient
  - Works perfectly fine with Playwright (locators are lazy)

  APPROACH 2: Getters (computed on access)
  ----------------------------------------
  get usernameInput() {
      return this.page.locator("#username");
  }
  - Locator created FRESH each time it's accessed
  - Playwright docs use this style
  - More flexible if page state changes

  RECOMMENDATION: Both work. Playwright docs prefer getters.
  Choose one style and be consistent across your project.
`);

// ---------------------------------------------------------------
// Example 6: Complete LoginPage with Actual Playwright Code
// ---------------------------------------------------------------
console.log("--- Example 6: Actual Playwright Code (Reference) ---");

console.log(`
  // ========== ACTUAL PLAYWRIGHT CODE ==========
  // File: pages/LoginPage.js

  class LoginPage {
      constructor(page) {
          this.page = page;
      }

      // Locators
      get usernameInput() {
          return this.page.locator('#username');
          // OR: return this.page.getByLabel('Username');
          // OR: return this.page.getByRole('textbox', { name: 'Username' });
      }

      get passwordInput() {
          return this.page.locator('#password');
          // OR: return this.page.getByLabel('Password');
      }

      get loginButton() {
          return this.page.getByRole('button', { name: 'Log in' });
      }

      get errorMessage() {
          return this.page.locator('.error-message');
          // OR: return this.page.getByText('Invalid credentials');
      }

      // Actions
      async goto() {
          await this.page.goto('/login');
      }

      async login(username, password) {
          await this.usernameInput.fill(username);
          await this.passwordInput.fill(password);
          await this.loginButton.click();
      }

      async getErrorMessage() {
          return await this.errorMessage.textContent();
      }
  }

  module.exports = { LoginPage };

  // ========== ACTUAL TEST FILE ==========
  // File: tests/login.spec.js

  const { test, expect } = require('@playwright/test');
  const { LoginPage } = require('../pages/LoginPage');

  test('successful login redirects to dashboard', async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.goto();
      await loginPage.login('admin', 'password123');

      await expect(page).toHaveURL(/dashboard/);
  });

  test('invalid login shows error message', async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.goto();
      await loginPage.login('wrong', 'wrong');

      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toHaveText('Invalid credentials');
  });
`);

// ---------------------------------------------------------------
// Example 7: Page Object File Organization
// ---------------------------------------------------------------
console.log("--- Example 7: Project File Organization ---");

console.log(`
  Typical Playwright project structure:

  my-project/
  +-- pages/                      <-- Page Objects live here
  |   +-- LoginPage.js
  |   +-- DashboardPage.js
  |   +-- ProfilePage.js
  |   +-- BasePage.js             <-- Shared base class
  +-- tests/                      <-- Test files live here
  |   +-- login.spec.js
  |   +-- dashboard.spec.js
  |   +-- profile.spec.js
  +-- test-data/                  <-- Test data
  |   +-- users.json
  |   +-- products.json
  +-- playwright.config.js        <-- Configuration
  +-- package.json

  Rules:
  - ONE page object per web page (or major component)
  - Page objects go in pages/ directory
  - Tests go in tests/ directory
  - Page objects NEVER import test files
  - Test files import page objects
`);

// ---------------------------------------------------------------
// Run the async simulated tests
// ---------------------------------------------------------------
async function runAllTests() {
    await testSuccessfulLogin();
    await testInvalidLogin();
    await testEmptyFields();

    // === KEY TAKEAWAYS ===
    console.log("=== KEY TAKEAWAYS ===");
    console.log("1. A Page Object class receives `page` in its constructor");
    console.log("2. Locators are defined as getters: get myElement() { return this.page.locator('...'); }");
    console.log("3. Actions are async methods: async login(user, pass) { await ... }");
    console.log("4. Data retrieval methods return values: async getErrorMessage() { return await ... }");
    console.log("5. Each page in your app gets its own Page Object class");
    console.log("6. Test files create Page Object instances and call their methods");
    console.log("7. Java equivalent: PageFactory + @FindBy annotations (same pattern, different syntax)");
}

runAllTests();
