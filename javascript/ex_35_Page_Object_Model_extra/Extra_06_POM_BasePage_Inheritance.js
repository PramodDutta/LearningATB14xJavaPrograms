// Extra_06_POM_BasePage_Inheritance.js
// Topic: Page Object Model (POM) - Part 6 of 7
// Extends: Extra_02 (POM Basic Page), Extra_04 (Navigation Actions)
//
// CONCEPT: A BasePage class contains shared methods that ALL page objects need:
// navigation helpers, wait utilities, screenshot capture, common header/footer
// interactions. Child page classes (LoginPage, DashboardPage, ProfilePage)
// extend BasePage and inherit all shared functionality. This eliminates code
// duplication across page objects.
//
// JAVA COMPARISON: This is identical to Java's inheritance pattern for POM.
// In Java: `public class LoginPage extends BasePage { ... }` with `super(driver)`
// in the constructor. In JS: `class LoginPage extends BasePage { ... }` with
// `super(page)` in the constructor. The concept maps 1:1.
//
// PLAYWRIGHT RELEVANCE: Most Playwright projects use a BasePage. It typically
// contains waitForPageLoad(), getTitle(), screenshot(), getURL(), and interactions
// with shared components (navigation bar, footer, etc.).
// ============================================================

console.log("=== EXTRA 06: POM — BASEPAGE & INHERITANCE ===\n");

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

    async textContent() {
        return this._page._store[this.selector] || "";
    }

    async isVisible() {
        return (this._page._store[this.selector] || "") !== "";
    }
}

class MockPage {
    constructor(pageTitle = "Default Page", pageURL = "https://example.com") {
        this._store = { "_title": pageTitle };
        this._log = [];
        this._currentURL = pageURL;
        this._screenshots = [];
    }

    locator(selector) {
        return new MockLocator(selector, this);
    }

    getByRole(role, options = {}) {
        const name = options.name || "";
        return new MockLocator(`[role=${role}][name=${name}]`, this);
    }

    getByLabel(label) {
        return new MockLocator(`[label=${label}]`, this);
    }

    async goto(url) {
        this._currentURL = url;
        this._log.push(`  goto('${url}')`);
    }

    url() {
        return this._currentURL;
    }

    async title() {
        return this._store["_title"];
    }

    async waitForLoadState(state) {
        this._log.push(`  waitForLoadState('${state}')`);
    }

    async waitForURL(pattern) {
        this._log.push(`  waitForURL('${pattern}')`);
    }

    async waitForSelector(selector, options = {}) {
        this._log.push(`  waitForSelector('${selector}', ${JSON.stringify(options)})`);
    }

    async screenshot(options = {}) {
        const path = options.path || `screenshot_${Date.now()}.png`;
        this._screenshots.push(path);
        this._log.push(`  screenshot({ path: '${path}' })`);
        return Buffer.from ? Buffer.from("mock-image") : "mock-image";
    }

    printLog() {
        this._log.forEach(entry => console.log(entry));
        this._log = [];
    }
}

// ---------------------------------------------------------------
// Example 1: BasePage Class
// ---------------------------------------------------------------
console.log("--- Example 1: BasePage Class Definition ---");

class BasePage {
    constructor(page) {
        this.page = page;
    }

    // --- NAVIGATION ---

    async navigate(url) {
        await this.page.goto(url);
    }

    getURL() {
        return this.page.url();
    }

    async getTitle() {
        return await this.page.title();
    }

    // --- WAITING ---

    async waitForPageLoad() {
        await this.page.waitForLoadState("networkidle");
    }

    async waitForElement(selector, state = "visible") {
        await this.page.waitForSelector(selector, { state });
    }

    async waitForURLContains(text) {
        // In real Playwright: await this.page.waitForURL(`**${text}**`);
        await this.page.waitForURL(`**${text}**`);
    }

    // --- SCREENSHOT ---

    async screenshot(fileName) {
        const path = `./screenshots/${fileName || "screenshot"}.png`;
        await this.page.screenshot({ path });
        return path;
    }

    async screenshotFullPage(fileName) {
        const path = `./screenshots/${fileName || "fullpage"}.png`;
        await this.page.screenshot({ path, fullPage: true });
        return path;
    }

    // --- COMMON HEADER/FOOTER (shared across all pages) ---

    get navBar() {
        return this.page.locator("nav.main-nav");
    }

    get navHomeLink() {
        return this.page.getByRole("link", { name: "Home" });
    }

    get navProfileLink() {
        return this.page.getByRole("link", { name: "Profile" });
    }

    get navLogoutButton() {
        return this.page.getByRole("button", { name: "Logout" });
    }

    get footer() {
        return this.page.locator("footer");
    }

    get footerCopyright() {
        return this.page.locator("footer .copyright");
    }

    async goHome() {
        await this.navHomeLink.click();
    }

    async goToProfile() {
        await this.navProfileLink.click();
    }

    async logout() {
        await this.navLogoutButton.click();
    }

    // --- UTILITY ---

    async getPageInfo() {
        return {
            title: await this.getTitle(),
            url: this.getURL()
        };
    }

    toString() {
        return `${this.constructor.name} [${this.getURL()}]`;
    }
}

console.log("  BasePage provides:");
console.log("    Navigation:  navigate(), getURL(), getTitle()");
console.log("    Waiting:     waitForPageLoad(), waitForElement(), waitForURLContains()");
console.log("    Screenshot:  screenshot(), screenshotFullPage()");
console.log("    Shared UI:   navBar, navHomeLink, navProfileLink, navLogoutButton, footer");
console.log("    Actions:     goHome(), goToProfile(), logout()");
console.log("    Utility:     getPageInfo(), toString()");
console.log();

// ---------------------------------------------------------------
// Example 2: LoginPage extends BasePage
// ---------------------------------------------------------------
console.log("--- Example 2: LoginPage extends BasePage ---");

class LoginPage extends BasePage {
    constructor(page) {
        super(page); // Pass page to BasePage constructor
        this.pageURL = "/login";
    }

    // LoginPage-specific locators
    get usernameInput() {
        return this.page.getByLabel("Username");
    }

    get passwordInput() {
        return this.page.getByLabel("Password");
    }

    get loginButton() {
        return this.page.getByRole("button", { name: "Log in" });
    }

    get errorMessage() {
        return this.page.locator(".error-message");
    }

    get forgotPasswordLink() {
        return this.page.getByRole("link", { name: "Forgot password?" });
    }

    // LoginPage-specific actions
    async goto() {
        await this.navigate(this.pageURL); // Uses BasePage.navigate()
        await this.waitForPageLoad();       // Uses BasePage.waitForPageLoad()
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async getErrorText() {
        return await this.errorMessage.textContent();
    }

    async isErrorVisible() {
        return await this.errorMessage.isVisible();
    }
}

// ---------------------------------------------------------------
// Example 3: DashboardPage extends BasePage
// ---------------------------------------------------------------
console.log("--- Example 3: DashboardPage extends BasePage ---");

class DashboardPage extends BasePage {
    constructor(page) {
        super(page);
        this.pageURL = "/dashboard";
    }

    // DashboardPage-specific locators
    get welcomeBanner() {
        return this.page.locator(".welcome-banner");
    }

    get statsWidget() {
        return this.page.locator(".stats-widget");
    }

    get recentActivityList() {
        return this.page.locator(".recent-activity li");
    }

    get quickActionButtons() {
        return this.page.locator(".quick-actions button");
    }

    // DashboardPage-specific actions
    async goto() {
        await this.navigate(this.pageURL);
        await this.waitForPageLoad();
    }

    async getWelcomeText() {
        return await this.welcomeBanner.textContent();
    }

    async isLoaded() {
        const url = this.getURL();
        return url.includes("/dashboard");
    }
}

// ---------------------------------------------------------------
// Example 4: ProfilePage extends BasePage
// ---------------------------------------------------------------
console.log("--- Example 4: ProfilePage extends BasePage ---");

class ProfilePage extends BasePage {
    constructor(page) {
        super(page);
        this.pageURL = "/profile";
    }

    // ProfilePage-specific locators
    get displayNameInput() {
        return this.page.getByLabel("Display Name");
    }

    get emailInput() {
        return this.page.getByLabel("Email");
    }

    get bioTextarea() {
        return this.page.getByLabel("Bio");
    }

    get saveButton() {
        return this.page.getByRole("button", { name: "Save Changes" });
    }

    get successMessage() {
        return this.page.locator(".success-message");
    }

    // ProfilePage-specific actions
    async goto() {
        await this.navigate(this.pageURL);
        await this.waitForPageLoad();
    }

    async updateDisplayName(name) {
        await this.displayNameInput.fill(name);
        await this.saveButton.click();
    }

    async updateEmail(email) {
        await this.emailInput.fill(email);
        await this.saveButton.click();
    }

    async getSuccessText() {
        return await this.successMessage.textContent();
    }
}

console.log("  Class hierarchy:");
console.log("    BasePage");
console.log("    +-- LoginPage      (login-specific locators & actions)");
console.log("    +-- DashboardPage  (dashboard-specific locators & actions)");
console.log("    +-- ProfilePage    (profile-specific locators & actions)");
console.log("  All child pages inherit: navigate, waitForPageLoad, screenshot, nav bar, footer\n");

// ---------------------------------------------------------------
// Example 5: Demonstrating Inheritance in Action
// ---------------------------------------------------------------
console.log("--- Example 5: Inheritance in Action ---");

async function demoInheritance() {
    const page = new MockPage("Login | MyApp", "https://myapp.com/login");

    // Create a LoginPage — it has BOTH its own methods AND BasePage methods
    const loginPage = new LoginPage(page);

    console.log("  LoginPage has access to BasePage methods:");

    // BasePage methods
    const title = await loginPage.getTitle();
    console.log(`    getTitle() [from BasePage]:     "${title}"`);

    const url = loginPage.getURL();
    console.log(`    getURL() [from BasePage]:       "${url}"`);

    const info = await loginPage.getPageInfo();
    console.log(`    getPageInfo() [from BasePage]:  ${JSON.stringify(info)}`);

    console.log(`    toString() [from BasePage]:     "${loginPage.toString()}"`);

    // LoginPage methods
    await loginPage.login("admin", "pass123");
    console.log("    login() [from LoginPage]:       executed");

    // BasePage screenshot
    const screenshotPath = await loginPage.screenshot("login-test");
    console.log(`    screenshot() [from BasePage]:   "${screenshotPath}"`);

    // BasePage waiting
    await loginPage.waitForPageLoad();
    console.log("    waitForPageLoad() [from BasePage]: executed");

    console.log("\n  Full action log:");
    page.printLog();
    console.log();
}

// ---------------------------------------------------------------
// Example 6: All Pages Share Navigation Bar Interaction
// ---------------------------------------------------------------

async function demoSharedNavigation() {
    console.log("--- Example 6: Shared Navigation Bar via BasePage ---");

    const page = new MockPage("Dashboard | MyApp", "https://myapp.com/dashboard");

    // Even though we're on DashboardPage, nav bar comes from BasePage
    const dashboard = new DashboardPage(page);

    console.log("  DashboardPage using inherited nav bar methods:");
    await dashboard.goHome();
    console.log("    goHome() [inherited] -> clicked Home link");

    await dashboard.goToProfile();
    console.log("    goToProfile() [inherited] -> clicked Profile link");

    await dashboard.logout();
    console.log("    logout() [inherited] -> clicked Logout button");

    console.log("\n  Action log:");
    page.printLog();

    // Same nav bar works from ProfilePage too
    const page2 = new MockPage("Profile | MyApp", "https://myapp.com/profile");
    const profile = new ProfilePage(page2);

    console.log("\n  ProfilePage using SAME inherited nav bar methods:");
    await profile.goHome();
    await profile.logout();
    console.log("    Both goHome() and logout() work from ProfilePage too!");
    page2.printLog();
    console.log();
}

// ---------------------------------------------------------------
// Example 7: The Complete Hierarchy Visualization
// ---------------------------------------------------------------

function showHierarchy() {
    console.log("--- Example 7: Complete Class Hierarchy ---");

    console.log(`
  +-----------------------------------------------------------+
  |                       BasePage                            |
  +-----------------------------------------------------------+
  | Fields:                                                   |
  |   this.page (Playwright page object)                      |
  |                                                           |
  | Methods:                                                  |
  |   navigate(url), getURL(), getTitle()                     |
  |   waitForPageLoad(), waitForElement(), waitForURLContains()|
  |   screenshot(), screenshotFullPage()                      |
  |   goHome(), goToProfile(), logout()                       |
  |   getPageInfo(), toString()                               |
  |                                                           |
  | Locators:                                                 |
  |   navBar, navHomeLink, navProfileLink, navLogoutButton    |
  |   footer, footerCopyright                                 |
  +-----------------------------------------------------------+
           |                    |                    |
           v                    v                    v
  +-----------------+  +-----------------+  +-----------------+
  |    LoginPage    |  |  DashboardPage  |  |   ProfilePage   |
  +-----------------+  +-----------------+  +-----------------+
  | usernameInput   |  | welcomeBanner   |  | displayNameInput|
  | passwordInput   |  | statsWidget     |  | emailInput      |
  | loginButton     |  | recentActivity  |  | bioTextarea     |
  | errorMessage    |  | quickActions    |  | saveButton      |
  | forgotPassword  |  |                 |  | successMessage  |
  +-----------------+  +-----------------+  +-----------------+
  | goto()          |  | goto()          |  | goto()          |
  | login(u, p)     |  | getWelcomeText()|  | updateName(n)   |
  | getErrorText()  |  | isLoaded()      |  | updateEmail(e)  |
  | isErrorVisible()|  |                 |  | getSuccessText()|
  +-----------------+  +-----------------+  +-----------------+

  Each child class:
  - Calls super(page) in constructor
  - Inherits ALL BasePage methods and locators
  - Defines its OWN page-specific locators and actions
  - Can override BasePage methods if needed
`);
}

// ---------------------------------------------------------------
// Example 8: Java Comparison
// ---------------------------------------------------------------

function showJavaComparison() {
    console.log("--- Example 8: Java Comparison — Identical Pattern ---");

    console.log(`
  JAVA SELENIUM:                                  JAVASCRIPT PLAYWRIGHT:
  ==============                                  ====================

  // BasePage.java                                // BasePage.js
  public abstract class BasePage {                class BasePage {
      protected WebDriver driver;                     constructor(page) {
                                                          this.page = page;
      public BasePage(WebDriver driver) {             }
          this.driver = driver;
      }                                               async getTitle() {
                                                          return await this.page.title();
      public String getTitle() {                      }
          return driver.getTitle();
      }                                               getURL() {
                                                          return this.page.url();
      public String getURL() {                        }
          return driver.getCurrentUrl();
      }                                               async waitForPageLoad() {
                                                          await this.page
      public void waitForPageLoad() {                         .waitForLoadState('networkidle');
          new WebDriverWait(driver, 10)               }
              .until(d -> ((JavascriptExecutor) d)
              .executeScript("return document      }
              .readyState").equals("complete"));
      }                                               // LoginPage.js
  }                                                   class LoginPage extends BasePage {
                                                          constructor(page) {
  // LoginPage.java                                           super(page);  // <-- same!
  public class LoginPage extends BasePage {               }
      @FindBy(id = "username")
      WebElement usernameField;                           get usernameInput() {
                                                              return this.page.getByLabel('Username');
      public LoginPage(WebDriver driver) {                }
          super(driver);  // <-- same!
          PageFactory.initElements(                       async login(user, pass) {
              driver, this);                                  await this.usernameInput.fill(user);
      }                                                       await this.passwordInput.fill(pass);
                                                              await this.loginButton.click();
      public void login(String user,                      }
          String pass) {                              }
          usernameField.sendKeys(user);
          passwordField.sendKeys(pass);
          loginBtn.click();
      }
  }

  KEY SIMILARITIES:
  - Both use class inheritance (extends)
  - Both call super(page/driver) in constructor
  - Both put shared methods in base class
  - Both let child classes add page-specific behavior
  - The pattern is IDENTICAL between Java and JavaScript
`);
}

// ---------------------------------------------------------------
// Run everything
// ---------------------------------------------------------------

async function runAll() {
    await demoInheritance();
    await demoSharedNavigation();
    showHierarchy();
    showJavaComparison();

    // === KEY TAKEAWAYS ===
    console.log("=== KEY TAKEAWAYS ===");
    console.log("1. BasePage holds SHARED methods: getTitle, getURL, waitForPageLoad, screenshot");
    console.log("2. BasePage holds SHARED locators: nav bar, footer, common UI elements");
    console.log("3. Child pages call super(page) to pass the page reference to BasePage");
    console.log("4. Child pages inherit ALL BasePage methods and add their own page-specific ones");
    console.log("5. DRY principle: write shared behavior ONCE in BasePage, not in every page object");
    console.log("6. Java comparison: extends BasePage + super(driver) — identical pattern");
    console.log("7. Keep BasePage focused — only truly shared behavior belongs there");
    console.log("8. If only 2 of 10 pages need a method, it does NOT belong in BasePage");
}

runAll();
