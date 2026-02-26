// Extra_07_POM_Complete_Example.js
// Topic: Page Object Model (POM) - Part 7 of 7
// Extends: Extra_01 through Extra_06 (Complete POM Series)
//
// CONCEPT: This file brings together everything from the POM series into one
// complete end-to-end simulation. It includes BasePage, LoginPage, DashboardPage,
// and ProfilePage classes forming a full class hierarchy, plus a simulated "test
// suite" that exercises the complete flow: navigate, login, dashboard, profile,
// verify. Both a runnable simulation and actual Playwright code are provided.
//
// JAVA COMPARISON: This mirrors a complete Java Selenium POM project structure
// with BasePage, page objects per page, and test classes using TestNG/JUnit.
// The architecture is identical; only the language syntax differs.
//
// PLAYWRIGHT RELEVANCE: This is exactly how real Playwright projects are
// structured. The Playwright documentation recommends this full POM approach
// for any project beyond a handful of tests.
// ============================================================

console.log("=== EXTRA 07: POM — COMPLETE END-TO-END EXAMPLE ===\n");

// =============================================================
// SECTION 1: SIMULATED BROWSER ENGINE
// (This replaces Playwright for the runnable demo)
// =============================================================

class SimulatedBrowser {
    constructor() {
        this._url = "";
        this._title = "";
        this._elements = {};
        this._log = [];
        this._users = {
            "admin": { password: "admin123", name: "Admin User", email: "admin@example.com", role: "Administrator" },
            "john": { password: "john456", name: "John Doe", email: "john@example.com", role: "Editor" },
        };
        this._loggedInUser = null;
    }

    async goto(url) {
        this._url = url;
        this._log.push(`navigate -> ${url}`);
        this._simulatePageLoad(url);
    }

    _simulatePageLoad(url) {
        if (url.includes("/login")) {
            this._title = "Login | MyApp";
            this._elements = {
                "[label=Username]": "",
                "[label=Password]": "",
                "[btn=Log in]": "Log in",
                ".error-message": "",
                "[link=Forgot password?]": "Forgot password?",
            };
        } else if (url.includes("/dashboard")) {
            this._title = "Dashboard | MyApp";
            const user = this._loggedInUser;
            this._elements = {
                ".welcome-banner": user ? `Welcome back, ${user.name}!` : "",
                ".user-role": user ? user.role : "",
                ".stats-total-users": "1,247",
                ".stats-active-sessions": "89",
                ".stats-revenue": "$45,230",
                "[link=Profile]": "Profile",
                "[link=Settings]": "Settings",
                "[btn=Logout]": "Logout",
                ".recent-activity": "3 new users registered today",
            };
        } else if (url.includes("/profile")) {
            this._title = "Profile | MyApp";
            const user = this._loggedInUser;
            this._elements = {
                "[label=Display Name]": user ? user.name : "",
                "[label=Email]": user ? user.email : "",
                "[label=Bio]": "Test automation enthusiast",
                "[label=Role]": user ? user.role : "",
                "[btn=Save Changes]": "Save Changes",
                ".success-message": "",
                "[link=Back to Dashboard]": "Back to Dashboard",
            };
        }
    }

    locator(selector) {
        return new SimulatedLocator(selector, this);
    }

    getByLabel(label) {
        return new SimulatedLocator(`[label=${label}]`, this);
    }

    getByRole(role, options = {}) {
        const name = options.name || "";
        const key = role === "button" ? `[btn=${name}]` : `[link=${name}]`;
        return new SimulatedLocator(key, this);
    }

    url() { return this._url; }
    async title() { return this._title; }

    async waitForURL(pattern) {
        this._log.push(`waitForURL('${pattern}')`);
    }

    async waitForLoadState(state) {
        this._log.push(`waitForLoadState('${state}')`);
    }

    async waitForSelector(selector, options = {}) {
        this._log.push(`waitForSelector('${selector}')`);
    }

    async screenshot(options = {}) {
        const path = options.path || "screenshot.png";
        this._log.push(`screenshot -> ${path}`);
        return "mock-image-data";
    }

    _performLogin(username, password) {
        const user = this._users[username];
        if (user && user.password === password) {
            this._loggedInUser = user;
            this._url = "https://myapp.com/dashboard";
            this._simulatePageLoad(this._url);
            return true;
        }
        this._elements[".error-message"] = "Invalid username or password";
        return false;
    }

    _performSaveProfile(updates) {
        if (this._loggedInUser) {
            Object.assign(this._loggedInUser, updates);
            this._elements[".success-message"] = "Profile updated successfully!";
            if (updates.name) this._elements["[label=Display Name]"] = updates.name;
            if (updates.email) this._elements["[label=Email]"] = updates.email;
            return true;
        }
        return false;
    }

    getLog() { return [...this._log]; }
    clearLog() { this._log = []; }
}

class SimulatedLocator {
    constructor(selector, browser) {
        this.selector = selector;
        this._browser = browser;
    }

    async fill(value) {
        this._browser._elements[this.selector] = value;
        this._browser._log.push(`fill('${this.selector}', '${value}')`);
    }

    async click() {
        this._browser._log.push(`click('${this.selector}')`);
        // Simulate login button click
        if (this.selector === "[btn=Log in]") {
            const username = this._browser._elements["[label=Username]"] || "";
            const password = this._browser._elements["[label=Password]"] || "";
            this._browser._performLogin(username, password);
        }
        // Simulate save profile click
        if (this.selector === "[btn=Save Changes]") {
            this._browser._performSaveProfile({
                name: this._browser._elements["[label=Display Name]"],
                email: this._browser._elements["[label=Email]"],
            });
        }
        // Simulate navigation clicks
        if (this.selector === "[link=Profile]") {
            this._browser._url = "https://myapp.com/profile";
            this._browser._simulatePageLoad(this._browser._url);
        }
        if (this.selector === "[link=Back to Dashboard]") {
            this._browser._url = "https://myapp.com/dashboard";
            this._browser._simulatePageLoad(this._browser._url);
        }
        if (this.selector === "[btn=Logout]") {
            this._browser._loggedInUser = null;
            this._browser._url = "https://myapp.com/login";
            this._browser._simulatePageLoad(this._browser._url);
        }
    }

    async textContent() {
        return this._browser._elements[this.selector] || "";
    }

    async isVisible() {
        const val = this._browser._elements[this.selector];
        return val !== undefined && val !== "";
    }

    async inputValue() {
        return this._browser._elements[this.selector] || "";
    }
}

// =============================================================
// SECTION 2: PAGE OBJECT CLASSES (The Real POM Code)
// =============================================================

console.log("--- Building Page Object Classes ---\n");

// --- BasePage ---
class BasePage {
    constructor(page) {
        this.page = page;
    }

    async getTitle() {
        return await this.page.title();
    }

    getURL() {
        return this.page.url();
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState("networkidle");
    }

    async screenshot(name) {
        const path = `./screenshots/${name || this.constructor.name}.png`;
        await this.page.screenshot({ path });
        return path;
    }

    // Shared navigation bar
    get navProfileLink() { return this.page.getByRole("link", { name: "Profile" }); }
    get navLogoutButton() { return this.page.getByRole("button", { name: "Logout" }); }

    async navigateToProfile() {
        await this.navProfileLink.click();
        await this.page.waitForURL("**/profile");
        return new ProfilePage(this.page);
    }

    async performLogout() {
        await this.navLogoutButton.click();
        await this.page.waitForURL("**/login");
        return new LoginPage(this.page);
    }
}

// --- LoginPage ---
class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.pageURL = "https://myapp.com/login";
    }

    get usernameInput() { return this.page.getByLabel("Username"); }
    get passwordInput() { return this.page.getByLabel("Password"); }
    get loginButton() { return this.page.getByRole("button", { name: "Log in" }); }
    get errorMessage() { return this.page.locator(".error-message"); }

    async goto() {
        await this.page.goto(this.pageURL);
        await this.waitForPageLoad();
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        // If login succeeds, we end up on dashboard
        if (this.page.url().includes("/dashboard")) {
            return new DashboardPage(this.page);
        }
        return null; // Login failed, still on login page
    }

    async getErrorText() {
        return await this.errorMessage.textContent();
    }

    async isErrorVisible() {
        return await this.errorMessage.isVisible();
    }
}

// --- DashboardPage ---
class DashboardPage extends BasePage {
    constructor(page) {
        super(page);
    }

    get welcomeBanner() { return this.page.locator(".welcome-banner"); }
    get userRole() { return this.page.locator(".user-role"); }
    get totalUsers() { return this.page.locator(".stats-total-users"); }
    get activeSessions() { return this.page.locator(".stats-active-sessions"); }
    get revenue() { return this.page.locator(".stats-revenue"); }
    get recentActivity() { return this.page.locator(".recent-activity"); }

    async getWelcomeText() {
        return await this.welcomeBanner.textContent();
    }

    async getUserRole() {
        return await this.userRole.textContent();
    }

    async getStats() {
        return {
            totalUsers: await this.totalUsers.textContent(),
            activeSessions: await this.activeSessions.textContent(),
            revenue: await this.revenue.textContent(),
        };
    }

    async getRecentActivity() {
        return await this.recentActivity.textContent();
    }

    isLoaded() {
        return this.getURL().includes("/dashboard");
    }

    async goToProfile() {
        return await this.navigateToProfile(); // Uses BasePage method
    }

    async logout() {
        return await this.performLogout(); // Uses BasePage method
    }
}

// --- ProfilePage ---
class ProfilePage extends BasePage {
    constructor(page) {
        super(page);
    }

    get displayNameInput() { return this.page.getByLabel("Display Name"); }
    get emailInput() { return this.page.getByLabel("Email"); }
    get bioInput() { return this.page.getByLabel("Bio"); }
    get roleDisplay() { return this.page.getByLabel("Role"); }
    get saveButton() { return this.page.getByRole("button", { name: "Save Changes" }); }
    get successMessage() { return this.page.locator(".success-message"); }
    get backToDashboardLink() { return this.page.getByRole("link", { name: "Back to Dashboard" }); }

    async getDisplayName() {
        return await this.displayNameInput.inputValue();
    }

    async getEmail() {
        return await this.emailInput.inputValue();
    }

    async getBio() {
        return await this.bioInput.inputValue();
    }

    async getRole() {
        return await this.roleDisplay.inputValue();
    }

    async updateDisplayName(newName) {
        await this.displayNameInput.fill(newName);
        await this.saveButton.click();
    }

    async updateEmail(newEmail) {
        await this.emailInput.fill(newEmail);
        await this.saveButton.click();
    }

    async getSuccessText() {
        return await this.successMessage.textContent();
    }

    async isSuccessVisible() {
        return await this.successMessage.isVisible();
    }

    async goBackToDashboard() {
        await this.backToDashboardLink.click();
        await this.page.waitForURL("**/dashboard");
        return new DashboardPage(this.page);
    }

    isLoaded() {
        return this.getURL().includes("/profile");
    }
}

console.log("  Page Object classes created:");
console.log("    BasePage         -> shared: getTitle, getURL, waitForPageLoad, screenshot, nav");
console.log("    LoginPage        -> goto, login, getErrorText, isErrorVisible");
console.log("    DashboardPage    -> getWelcomeText, getUserRole, getStats, goToProfile, logout");
console.log("    ProfilePage      -> getDisplayName, updateDisplayName, updateEmail, goBackToDashboard");
console.log();

// =============================================================
// SECTION 3: SIMULATED TEST SUITE
// =============================================================

// --- Assertion helper ---
let totalTests = 0;
let passedTests = 0;

function expect(actual) {
    return {
        toBe(expected) {
            totalTests++;
            if (actual === expected) {
                passedTests++;
                return true;
            }
            console.log(`      FAIL: Expected "${expected}" but got "${actual}"`);
            return false;
        },
        toContain(substring) {
            totalTests++;
            if (typeof actual === "string" && actual.includes(substring)) {
                passedTests++;
                return true;
            }
            console.log(`      FAIL: "${actual}" does not contain "${substring}"`);
            return false;
        },
        toBeTruthy() {
            totalTests++;
            if (actual) {
                passedTests++;
                return true;
            }
            console.log(`      FAIL: Expected truthy but got "${actual}"`);
            return false;
        },
        toBeFalsy() {
            totalTests++;
            if (!actual) {
                passedTests++;
                return true;
            }
            console.log(`      FAIL: Expected falsy but got "${actual}"`);
            return false;
        }
    };
}

// --- Test 1: Complete Login Flow ---
async function testCompleteLoginFlow() {
    console.log("  TEST 1: Complete Login -> Dashboard -> Profile -> Verify Flow");
    console.log("  " + "-".repeat(60));

    const page = new SimulatedBrowser();
    const loginPage = new LoginPage(page);

    // Step 1: Navigate to login
    await loginPage.goto();
    const loginTitle = await loginPage.getTitle();
    expect(loginTitle).toContain("Login");
    console.log(`    Step 1: Navigated to login page (title: "${loginTitle}")`);

    // Step 2: Login with valid credentials
    const dashboard = await loginPage.login("admin", "admin123");
    expect(dashboard).toBeTruthy();
    expect(dashboard.isLoaded()).toBe(true);
    console.log(`    Step 2: Logged in successfully, on dashboard: ${dashboard.isLoaded()}`);

    // Step 3: Verify dashboard content
    const welcomeText = await dashboard.getWelcomeText();
    expect(welcomeText).toContain("Admin User");
    console.log(`    Step 3: Welcome message: "${welcomeText}"`);

    const role = await dashboard.getUserRole();
    expect(role).toBe("Administrator");
    console.log(`    Step 4: User role: "${role}"`);

    const stats = await dashboard.getStats();
    expect(stats.totalUsers).toBe("1,247");
    console.log(`    Step 5: Stats: ${JSON.stringify(stats)}`);

    // Step 4: Navigate to profile
    const profile = await dashboard.goToProfile();
    expect(profile.isLoaded()).toBe(true);
    console.log(`    Step 6: Navigated to profile page: ${profile.isLoaded()}`);

    // Step 5: Verify profile data
    const displayName = await profile.getDisplayName();
    expect(displayName).toBe("Admin User");
    console.log(`    Step 7: Display name: "${displayName}"`);

    const email = await profile.getEmail();
    expect(email).toBe("admin@example.com");
    console.log(`    Step 8: Email: "${email}"`);

    // Step 6: Update profile
    await profile.updateDisplayName("Admin Pro");
    const successMsg = await profile.getSuccessText();
    expect(successMsg).toContain("updated successfully");
    console.log(`    Step 9: Updated name, success: "${successMsg}"`);

    // Step 7: Go back to dashboard
    const dashAgain = await profile.goBackToDashboard();
    expect(dashAgain.isLoaded()).toBe(true);
    const updatedWelcome = await dashAgain.getWelcomeText();
    expect(updatedWelcome).toContain("Admin Pro");
    console.log(`    Step 10: Back on dashboard, welcome: "${updatedWelcome}"`);

    // Step 8: Logout
    const loginAgain = await dashAgain.logout();
    expect(loginAgain.getURL()).toContain("/login");
    console.log(`    Step 11: Logged out, back on: ${loginAgain.getURL()}`);

    console.log();
}

// --- Test 2: Invalid Login ---
async function testInvalidLogin() {
    console.log("  TEST 2: Invalid Login — Error Message Verification");
    console.log("  " + "-".repeat(60));

    const page = new SimulatedBrowser();
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    const result = await loginPage.login("hacker", "wrongpass");

    expect(result).toBeFalsy(); // null = login failed
    console.log(`    Login result: ${result} (null means failure)`);

    const errorVisible = await loginPage.isErrorVisible();
    expect(errorVisible).toBe(true);
    console.log(`    Error visible: ${errorVisible}`);

    const errorText = await loginPage.getErrorText();
    expect(errorText).toContain("Invalid");
    console.log(`    Error text: "${errorText}"`);

    // Still on login page
    expect(loginPage.getURL()).toContain("/login");
    console.log(`    Still on: ${loginPage.getURL()}`);
    console.log();
}

// --- Test 3: Different User Login ---
async function testDifferentUserLogin() {
    console.log("  TEST 3: Different User (John) — Different Dashboard Content");
    console.log("  " + "-".repeat(60));

    const page = new SimulatedBrowser();
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    const dashboard = await loginPage.login("john", "john456");

    expect(dashboard).toBeTruthy();

    const welcomeText = await dashboard.getWelcomeText();
    expect(welcomeText).toContain("John Doe");
    console.log(`    Welcome: "${welcomeText}"`);

    const role = await dashboard.getUserRole();
    expect(role).toBe("Editor");
    console.log(`    Role: "${role}" (different from Admin!)`);

    const profile = await dashboard.goToProfile();
    const email = await profile.getEmail();
    expect(email).toBe("john@example.com");
    console.log(`    Email: "${email}" (John's email, not Admin's)`);

    console.log();
}

// --- Test 4: Screenshot on Failure Pattern ---
async function testScreenshotOnFailure() {
    console.log("  TEST 4: Screenshot on Failure Pattern");
    console.log("  " + "-".repeat(60));

    const page = new SimulatedBrowser();
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    const result = await loginPage.login("bad", "bad");
    if (!result) {
        // Take screenshot on failure (using BasePage method!)
        const screenshotPath = await loginPage.screenshot("login-failure");
        console.log(`    Login failed — screenshot saved to: ${screenshotPath}`);
        console.log(`    (BasePage.screenshot() available on all page objects)`);
    }
    console.log();
}

// =============================================================
// SECTION 4: ACTUAL PLAYWRIGHT CODE (Reference — Comments Only)
// =============================================================

function showActualPlaywrightCode() {
    console.log("--- ACTUAL PLAYWRIGHT CODE (Full Reference) ---");
    console.log(`
  // =====================================================
  // FILE: pages/BasePage.js
  // =====================================================
  class BasePage {
      constructor(page) {
          this.page = page;
      }

      async getTitle() {
          return await this.page.title();
      }

      getURL() {
          return this.page.url();
      }

      async waitForPageLoad() {
          await this.page.waitForLoadState('networkidle');
      }

      async screenshot(name) {
          await this.page.screenshot({ path: \`./screenshots/\${name}.png\` });
      }

      get navProfileLink() {
          return this.page.getByRole('link', { name: 'Profile' });
      }

      get navLogoutButton() {
          return this.page.getByRole('button', { name: 'Logout' });
      }
  }
  module.exports = { BasePage };

  // =====================================================
  // FILE: pages/LoginPage.js
  // =====================================================
  const { BasePage } = require('./BasePage');
  const { DashboardPage } = require('./DashboardPage');

  class LoginPage extends BasePage {
      constructor(page) {
          super(page);
      }

      get usernameInput() { return this.page.getByLabel('Username'); }
      get passwordInput() { return this.page.getByLabel('Password'); }
      get loginButton()   { return this.page.getByRole('button', { name: 'Log in' }); }
      get errorMessage()  { return this.page.locator('.error-message'); }

      async goto() {
          await this.page.goto('/login');
      }

      async login(username, password) {
          await this.usernameInput.fill(username);
          await this.passwordInput.fill(password);
          await this.loginButton.click();
          await this.page.waitForURL(/dashboard|login/);
          if (this.page.url().includes('/dashboard')) {
              return new DashboardPage(this.page);
          }
          return null;
      }

      async getErrorText() {
          return await this.errorMessage.textContent();
      }
  }
  module.exports = { LoginPage };

  // =====================================================
  // FILE: pages/DashboardPage.js
  // =====================================================
  const { BasePage } = require('./BasePage');
  const { ProfilePage } = require('./ProfilePage');

  class DashboardPage extends BasePage {
      constructor(page) { super(page); }

      get welcomeBanner() { return this.page.locator('.welcome-banner'); }

      async getWelcomeText() {
          return await this.welcomeBanner.textContent();
      }

      async goToProfile() {
          await this.navProfileLink.click();
          await this.page.waitForURL(/profile/);
          return new ProfilePage(this.page);
      }
  }
  module.exports = { DashboardPage };

  // =====================================================
  // FILE: pages/ProfilePage.js
  // =====================================================
  const { BasePage } = require('./BasePage');

  class ProfilePage extends BasePage {
      constructor(page) { super(page); }

      get displayNameInput() { return this.page.getByLabel('Display Name'); }
      get emailInput()       { return this.page.getByLabel('Email'); }
      get saveButton()       { return this.page.getByRole('button', { name: 'Save Changes' }); }
      get successMessage()   { return this.page.locator('.success-message'); }

      async updateDisplayName(name) {
          await this.displayNameInput.fill(name);
          await this.saveButton.click();
      }
  }
  module.exports = { ProfilePage };

  // =====================================================
  // FILE: tests/e2e-flow.spec.js
  // =====================================================
  const { test, expect } = require('@playwright/test');
  const { LoginPage } = require('../pages/LoginPage');

  test('complete login to profile flow', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();

      const dashboard = await loginPage.login('admin', 'admin123');
      await expect(dashboard.welcomeBanner).toContainText('Admin');

      const profile = await dashboard.goToProfile();
      await expect(profile.displayNameInput).toHaveValue('Admin User');

      await profile.updateDisplayName('Admin Pro');
      await expect(profile.successMessage).toBeVisible();
  });

  test('invalid login shows error', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();

      const result = await loginPage.login('bad', 'bad');
      expect(result).toBeNull();
      await expect(loginPage.errorMessage).toHaveText('Invalid username or password');
  });
`);
}

// =============================================================
// SECTION 5: RUN EVERYTHING
// =============================================================

async function runAll() {
    console.log("--- Running Full Test Suite (Simulated) ---\n");

    await testCompleteLoginFlow();
    await testInvalidLogin();
    await testDifferentUserLogin();
    await testScreenshotOnFailure();

    console.log("  " + "=".repeat(60));
    console.log(`  TEST RESULTS: ${passedTests}/${totalTests} assertions passed`);
    console.log("  " + "=".repeat(60));
    console.log();

    showActualPlaywrightCode();

    // === KEY TAKEAWAYS ===
    console.log("=== KEY TAKEAWAYS ===");
    console.log("1. Complete POM structure: BasePage -> LoginPage, DashboardPage, ProfilePage");
    console.log("2. BasePage provides shared methods (screenshot, nav, wait) to ALL pages");
    console.log("3. Each page object encapsulates its locators and actions");
    console.log("4. Navigation methods return NEW page objects: login() -> DashboardPage");
    console.log("5. Tests read like user stories: goto -> login -> verify -> navigate -> update");
    console.log("6. Assertions stay in test files, page objects return data");
    console.log("7. Same page objects support different test scenarios (admin vs john)");
    console.log("8. Architecture is identical between Java Selenium POM and Playwright POM");
    console.log("9. File organization: pages/ directory for POMs, tests/ directory for specs");
    console.log("10. This pattern scales from 5 tests to 500 tests with minimal maintenance");
}

runAll();
