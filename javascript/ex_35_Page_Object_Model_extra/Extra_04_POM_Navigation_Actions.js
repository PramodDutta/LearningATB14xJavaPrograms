// Extra_04_POM_Navigation_Actions.js
// Topic: Page Object Model (POM) - Part 4 of 7
// Extends: Extra_02 (POM Basic Page), Extra_03 (Locator Strategies)
//
// CONCEPT: Page Objects encapsulate page actions (goto, fill, click, check, select)
// and waiting strategies (waitForURL, waitForSelector, waitForLoadState). A critical
// POM pattern is returning new Page Object instances from navigation actions — when
// clicking "Login" takes you to DashboardPage, the login() method returns a new
// DashboardPage object.
//
// JAVA COMPARISON: In Java Selenium POM, methods that navigate also return new page
// objects: `public DashboardPage login(String u, String p) { ... return new DashboardPage(driver); }`
// The pattern is identical in Playwright JS, just with async/await.
//
// PLAYWRIGHT RELEVANCE: Playwright's auto-waiting reduces explicit waits, but you
// still need waitForURL, waitForLoadState, and waitForSelector in specific scenarios.
// Returning page objects from navigation actions is the standard Playwright POM pattern.
// ============================================================

console.log("=== EXTRA 04: POM — NAVIGATION & ACTIONS ===\n");

// ---------------------------------------------------------------
// Mock infrastructure
// ---------------------------------------------------------------

class MockLocator {
    constructor(selector, mockPage) {
        this.selector = selector;
        this._page = mockPage;
    }

    async fill(value) {
        this._page._log.push(`  fill('${this.selector}', '${value}')`);
        this._page._store[this.selector] = value;
    }

    async click() {
        this._page._log.push(`  click('${this.selector}')`);
    }

    async check() {
        this._page._log.push(`  check('${this.selector}')`);
        this._page._store[this.selector + "_checked"] = true;
    }

    async uncheck() {
        this._page._log.push(`  uncheck('${this.selector}')`);
        this._page._store[this.selector + "_checked"] = false;
    }

    async selectOption(value) {
        this._page._log.push(`  selectOption('${this.selector}', '${value}')`);
        this._page._store[this.selector] = value;
    }

    async textContent() {
        return this._page._store[this.selector] || "";
    }

    async isVisible() {
        return this._page._store[this.selector] !== undefined;
    }

    async isChecked() {
        return this._page._store[this.selector + "_checked"] === true;
    }
}

class MockPage {
    constructor() {
        this._currentURL = "";
        this._store = {};
        this._log = [];
        this._loadState = "domcontentloaded";
    }

    async goto(url) {
        this._currentURL = url;
        this._log.push(`  goto('${url}')`);
        this._loadState = "load";
    }

    locator(selector) {
        return new MockLocator(selector, this);
    }

    getByRole(role, options = {}) {
        const name = options.name ? `[role=${role}][name=${options.name}]` : `[role=${role}]`;
        return new MockLocator(name, this);
    }

    getByLabel(label) {
        return new MockLocator(`[label=${label}]`, this);
    }

    getByText(text) {
        return new MockLocator(`[text=${text}]`, this);
    }

    url() {
        return this._currentURL;
    }

    async waitForURL(urlPattern) {
        this._log.push(`  waitForURL('${urlPattern}')`);
        if (typeof urlPattern === "string" && !this._currentURL.includes("error")) {
            this._currentURL = urlPattern.replace("**", "");
        }
    }

    async waitForSelector(selector, options = {}) {
        const state = options.state || "visible";
        this._log.push(`  waitForSelector('${selector}', { state: '${state}' })`);
    }

    async waitForLoadState(state = "load") {
        this._log.push(`  waitForLoadState('${state}')`);
        this._loadState = state;
    }

    async waitForTimeout(ms) {
        this._log.push(`  waitForTimeout(${ms}) [AVOID - use proper waits]`);
    }

    printLog() {
        this._log.forEach(entry => console.log(entry));
        this._log = [];
    }
}

// ---------------------------------------------------------------
// Example 1: Common Page Actions
// ---------------------------------------------------------------
console.log("--- Example 1: Common Page Actions ---");

class RegistrationPage {
    constructor(page) {
        this.page = page;
        this.url = "https://example.com/register";
    }

    // Locators
    get firstNameInput() { return this.page.getByLabel("First Name"); }
    get lastNameInput() { return this.page.getByLabel("Last Name"); }
    get emailInput() { return this.page.getByLabel("Email"); }
    get passwordInput() { return this.page.getByLabel("Password"); }
    get countrySelect() { return this.page.locator("#country-select"); }
    get termsCheckbox() { return this.page.locator("#accept-terms"); }
    get newsletterCheckbox() { return this.page.locator("#subscribe-newsletter"); }
    get submitButton() { return this.page.getByRole("button", { name: "Register" }); }

    // Navigation action
    async goto() {
        await this.page.goto(this.url);
    }

    // fill() — Enter text into input fields
    async fillPersonalInfo(firstName, lastName, email) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
    }

    // fill() — Password field
    async setPassword(password) {
        await this.passwordInput.fill(password);
    }

    // selectOption() — Dropdown selection
    async selectCountry(country) {
        await this.countrySelect.selectOption(country);
    }

    // check() / uncheck() — Checkboxes
    async acceptTerms() {
        await this.termsCheckbox.check();
    }

    async subscribeNewsletter(subscribe = true) {
        if (subscribe) {
            await this.newsletterCheckbox.check();
        } else {
            await this.newsletterCheckbox.uncheck();
        }
    }

    // click() — Submit form
    async submit() {
        await this.submitButton.click();
    }

    // Complete registration — combines all actions
    async register(data) {
        await this.fillPersonalInfo(data.firstName, data.lastName, data.email);
        await this.setPassword(data.password);
        await this.selectCountry(data.country);
        await this.acceptTerms();
        if (data.newsletter) {
            await this.subscribeNewsletter(true);
        }
        await this.submit();
    }
}

async function demoActions() {
    const page = new MockPage();
    const regPage = new RegistrationPage(page);

    await regPage.goto();
    await regPage.register({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: "SecurePass123!",
        country: "US",
        newsletter: true
    });

    console.log("  Registration page actions performed:");
    page.printLog();
    console.log();
}

// ---------------------------------------------------------------
// Example 2: Waiting Strategies
// ---------------------------------------------------------------
console.log("--- Example 2: Waiting Strategies ---");

class SlowLoadingPage {
    constructor(page) {
        this.page = page;
    }

    get spinner() { return this.page.locator(".loading-spinner"); }
    get content() { return this.page.locator("#main-content"); }
    get dataTable() { return this.page.locator("table.data-table"); }

    // Wait for URL to change after navigation
    async waitForNavigation(expectedPath) {
        await this.page.waitForURL(`**${expectedPath}`);
    }

    // Wait for page to fully load
    async waitForPageLoad() {
        await this.page.waitForLoadState("networkidle");
    }

    // Wait for specific element to appear
    async waitForContentLoaded() {
        await this.page.waitForSelector("#main-content", { state: "visible" });
    }

    // Wait for loading spinner to disappear
    async waitForSpinnerGone() {
        await this.page.waitForSelector(".loading-spinner", { state: "hidden" });
    }

    // Wait for data table to be populated
    async waitForDataTable() {
        await this.page.waitForSelector("table.data-table", { state: "visible" });
    }

    // Combined wait: spinner gone + content visible
    async waitForReady() {
        await this.waitForSpinnerGone();
        await this.waitForContentLoaded();
    }
}

async function demoWaiting() {
    const page = new MockPage();
    const slowPage = new SlowLoadingPage(page);

    console.log("  Waiting strategy demos:");
    await slowPage.waitForNavigation("/dashboard");
    await slowPage.waitForPageLoad();
    await slowPage.waitForContentLoaded();
    await slowPage.waitForSpinnerGone();
    page.printLog();

    console.log(`
  PLAYWRIGHT AUTO-WAITING:
  Playwright automatically waits for elements before actions.
  You do NOT need explicit waits for most operations:
    await page.locator('#btn').click()  // Auto-waits for #btn to be visible and stable

  USE EXPLICIT WAITS ONLY FOR:
  - URL changes after navigation:    waitForURL()
  - Full page load completion:       waitForLoadState('networkidle')
  - Elements that appear after AJAX: waitForSelector()
  - Loading spinners to disappear:   waitForSelector('.spinner', { state: 'hidden' })

  AVOID:
  - waitForTimeout(5000) — This is a hard sleep! Use proper waits instead.
`);
}

// ---------------------------------------------------------------
// Example 3: Returning New Page Objects from Navigation
// ---------------------------------------------------------------
console.log("--- Example 3: Returning New Page Objects from Navigation ---");

class LoginPage {
    constructor(page) {
        this.page = page;
        this.url = "https://example.com/login";
    }

    get usernameInput() { return this.page.getByLabel("Username"); }
    get passwordInput() { return this.page.getByLabel("Password"); }
    get loginButton() { return this.page.getByRole("button", { name: "Log in" }); }
    get forgotPasswordLink() { return this.page.getByRole("link", { name: "Forgot password?" }); }
    get registerLink() { return this.page.getByRole("link", { name: "Create account" }); }

    async goto() {
        await this.page.goto(this.url);
    }

    // LOGIN returns a DashboardPage — the page you land on after login
    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        // Wait for navigation to complete
        await this.page.waitForURL("**/dashboard");
        // Return new page object for the destination page
        return new DashboardPage(this.page);
    }

    // FORGOT PASSWORD returns a ForgotPasswordPage
    async clickForgotPassword() {
        await this.forgotPasswordLink.click();
        await this.page.waitForURL("**/forgot-password");
        return new ForgotPasswordPage(this.page);
    }

    // REGISTER returns a RegistrationPage
    async clickRegister() {
        await this.registerLink.click();
        await this.page.waitForURL("**/register");
        return new RegisterPage(this.page);
    }
}

class DashboardPage {
    constructor(page) {
        this.page = page;
    }

    get welcomeMessage() { return this.page.locator(".welcome-msg"); }
    get profileLink() { return this.page.getByRole("link", { name: "Profile" }); }
    get settingsLink() { return this.page.getByRole("link", { name: "Settings" }); }
    get logoutButton() { return this.page.getByRole("button", { name: "Logout" }); }

    async getWelcomeText() {
        return await this.welcomeMessage.textContent();
    }

    // Navigate to profile — returns ProfilePage
    async goToProfile() {
        await this.profileLink.click();
        await this.page.waitForURL("**/profile");
        return new ProfilePage(this.page);
    }

    // Navigate to settings — returns SettingsPage
    async goToSettings() {
        await this.settingsLink.click();
        await this.page.waitForURL("**/settings");
        return new SettingsPage(this.page);
    }

    // Logout — returns LoginPage (back to login)
    async logout() {
        await this.logoutButton.click();
        await this.page.waitForURL("**/login");
        return new LoginPage(this.page);
    }

    isLoaded() {
        return this.page.url().includes("/dashboard");
    }
}

class ProfilePage {
    constructor(page) {
        this.page = page;
    }

    get displayName() { return this.page.locator("#display-name"); }
    get emailField() { return this.page.getByLabel("Email"); }
    get saveButton() { return this.page.getByRole("button", { name: "Save" }); }
    get backLink() { return this.page.getByRole("link", { name: "Back to Dashboard" }); }

    async updateEmail(newEmail) {
        await this.emailField.fill(newEmail);
        await this.saveButton.click();
    }

    async goBackToDashboard() {
        await this.backLink.click();
        await this.page.waitForURL("**/dashboard");
        return new DashboardPage(this.page);
    }

    isLoaded() {
        return this.page.url().includes("/profile");
    }
}

class SettingsPage {
    constructor(page) {
        this.page = page;
    }

    isLoaded() {
        return this.page.url().includes("/settings");
    }
}

class ForgotPasswordPage {
    constructor(page) {
        this.page = page;
    }

    isLoaded() {
        return this.page.url().includes("/forgot-password");
    }
}

class RegisterPage {
    constructor(page) {
        this.page = page;
    }

    isLoaded() {
        return this.page.url().includes("/register");
    }
}

// ---------------------------------------------------------------
// Example 4: Chaining Navigation Through Multiple Pages
// ---------------------------------------------------------------

async function demoNavigationChaining() {
    console.log("--- Example 4: Chaining Navigation Through Multiple Pages ---");

    const page = new MockPage();
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Login returns DashboardPage
    const dashboard = await loginPage.login("admin", "secret");
    console.log(`  After login -> on dashboard: ${dashboard.isLoaded()}`);

    // Dashboard.goToProfile returns ProfilePage
    const profile = await dashboard.goToProfile();
    console.log(`  After clicking Profile -> on profile: ${profile.isLoaded()}`);

    // Profile.goBackToDashboard returns DashboardPage
    const dashAgain = await profile.goBackToDashboard();
    console.log(`  After going back -> on dashboard: ${dashAgain.isLoaded()}`);

    // Dashboard.logout returns LoginPage
    const loginAgain = await dashAgain.logout();
    console.log(`  After logout -> back to login`);

    console.log("\n  Full navigation log:");
    page.printLog();
    console.log();
}

// ---------------------------------------------------------------
// Example 5: The Pattern — Return Type as Documentation
// ---------------------------------------------------------------
console.log("--- Example 5: Return Types as Documentation ---");

console.log(`
  // The return type tells you WHERE an action takes you:

  class LoginPage {
      async login(user, pass)        { ... return new DashboardPage(this.page);     }
      async clickForgotPassword()    { ... return new ForgotPasswordPage(this.page); }
      async clickRegister()          { ... return new RegisterPage(this.page);       }
  }

  class DashboardPage {
      async goToProfile()            { ... return new ProfilePage(this.page);        }
      async goToSettings()           { ... return new SettingsPage(this.page);       }
      async logout()                 { ... return new LoginPage(this.page);          }
  }

  // READING THE CODE tells you the application flow:
  //   LoginPage --login()--> DashboardPage
  //   LoginPage --clickForgotPassword()--> ForgotPasswordPage
  //   DashboardPage --goToProfile()--> ProfilePage
  //   DashboardPage --logout()--> LoginPage

  // In a test, the chain is clear:
  //   const dashboard = await loginPage.login('admin', 'pass');
  //   const profile = await dashboard.goToProfile();
  //   await profile.updateEmail('new@email.com');
  //   const dashAgain = await profile.goBackToDashboard();
`);

// ---------------------------------------------------------------
// Example 6: Java Comparison — Same Pattern
// ---------------------------------------------------------------
console.log("--- Example 6: Java Comparison — Returning Page Objects ---");

console.log(`
  JAVA SELENIUM:                                  PLAYWRIGHT JS:
  ==============                                  ==============

  public class LoginPage {                        class LoginPage {
      WebDriver driver;                               constructor(page) {
                                                          this.page = page;
      public LoginPage(WebDriver driver) {            }
          this.driver = driver;
      }                                               async login(user, pass) {
                                                          await this.usernameInput.fill(user);
      // Returns DashboardPage                            await this.passwordInput.fill(pass);
      public DashboardPage login(                         await this.loginButton.click();
          String user, String pass) {                     await this.page.waitForURL('**/dashboard');
          driver.findElement(By.id("user"))               return new DashboardPage(this.page);
              .sendKeys(user);                        }
          driver.findElement(By.id("pass"))       }
              .sendKeys(pass);
          driver.findElement(By.id("btn"))
              .click();
          return new DashboardPage(driver);
      }
  }

  // The PATTERN is identical:
  // 1. Perform actions on current page
  // 2. Return new page object for destination page
  // 3. Test code chains: dashboard = loginPage.login("a", "b");
`);

// ---------------------------------------------------------------
// Run async demos
// ---------------------------------------------------------------

async function runAll() {
    await demoActions();
    await demoWaiting();
    await demoNavigationChaining();

    // === KEY TAKEAWAYS ===
    console.log("=== KEY TAKEAWAYS ===");
    console.log("1. Page actions: goto(), fill(), click(), check(), selectOption() — all are async");
    console.log("2. Playwright auto-waits for most actions, but explicit waits are needed for:");
    console.log("   - URL changes (waitForURL), full load (waitForLoadState), AJAX (waitForSelector)");
    console.log("3. AVOID waitForTimeout() — it's a hard sleep. Use proper waiting strategies.");
    console.log("4. Navigation actions should RETURN the new Page Object for the destination page");
    console.log("5. The return type documents the application flow: login() -> DashboardPage");
    console.log("6. Test code chains naturally: const dash = await loginPage.login('user', 'pass');");
    console.log("7. This pattern is identical in Java Selenium POM — only syntax differs");
}

runAll();
