// Extra_01_POM_Concept.js
// Topic: Page Object Model (POM) - Part 1 of 7
// Extends: New Topic
//
// CONCEPT: The Page Object Model is a design pattern that creates an object
// representation of each web page in your application. It separates the page
// structure (locators, actions) from the test logic (assertions, flow), making
// tests dramatically easier to maintain when the UI changes.
//
// JAVA COMPARISON: POM is identical in concept between Java Selenium and JS Playwright.
// In Java you create PageObject classes with @FindBy annotations and PageFactory.
// In JavaScript/Playwright, you use plain classes with locator methods instead.
//
// PLAYWRIGHT RELEVANCE: POM is Playwright's officially recommended pattern.
// The Playwright docs dedicate an entire section to POM. Every serious Playwright
// project uses this pattern to keep test suites manageable at scale.
// ============================================================

console.log("=== EXTRA 01: PAGE OBJECT MODEL - THE CONCEPT ===\n");

// ---------------------------------------------------------------
// Example 1: The Problem — Tests WITHOUT Page Object Model
// ---------------------------------------------------------------
console.log("--- Example 1: Tests WITHOUT POM (The Problem) ---");

// Imagine you have 50 test files, each containing lines like:
//
//   await page.locator('#username').fill('admin');
//   await page.locator('#password').fill('secret');
//   await page.locator('button.login-btn').click();
//
// Now the developer changes:
//   #username  -->  #email
//   button.login-btn  -->  button[data-testid="submit"]
//
// You must find and update ALL 50 files. Miss one? Broken test.

function simulateTestWithoutPOM_1() {
    const actions = [];
    // Test 1: Valid login
    actions.push("page.locator('#username').fill('admin')");
    actions.push("page.locator('#password').fill('secret123')");
    actions.push("page.locator('button.login-btn').click()");
    actions.push("expect(page.locator('.welcome')).toBeVisible()");
    return actions;
}

function simulateTestWithoutPOM_2() {
    const actions = [];
    // Test 2: Invalid login
    actions.push("page.locator('#username').fill('wrong')");
    actions.push("page.locator('#password').fill('bad')");
    actions.push("page.locator('button.login-btn').click()");
    actions.push("expect(page.locator('.error-msg')).toHaveText('Invalid')");
    return actions;
}

function simulateTestWithoutPOM_3() {
    const actions = [];
    // Test 3: Empty fields
    actions.push("page.locator('button.login-btn').click()");
    actions.push("expect(page.locator('.error-msg')).toHaveText('Required')");
    return actions;
}

console.log("Test 1 (valid login):");
simulateTestWithoutPOM_1().forEach(a => console.log("  " + a));
console.log("Test 2 (invalid login):");
simulateTestWithoutPOM_2().forEach(a => console.log("  " + a));
console.log("Test 3 (empty fields):");
simulateTestWithoutPOM_3().forEach(a => console.log("  " + a));

// Count how many times '#username' appears
const allActions = [
    ...simulateTestWithoutPOM_1(),
    ...simulateTestWithoutPOM_2(),
    ...simulateTestWithoutPOM_3()
];
const usernameCount = allActions.filter(a => a.includes("#username")).length;
const buttonCount = allActions.filter(a => a.includes("button.login-btn")).length;

console.log(`\n  PROBLEM: '#username' appears ${usernameCount} times across 3 tests`);
console.log(`  PROBLEM: 'button.login-btn' appears ${buttonCount} times across 3 tests`);
console.log("  If selector changes, you must update EVERY occurrence!\n");

// ---------------------------------------------------------------
// Example 2: The Solution — Tests WITH Page Object Model
// ---------------------------------------------------------------
console.log("--- Example 2: Tests WITH POM (The Solution) ---");

// The Page Object: ONE place for all selectors and actions
class LoginPage {
    constructor(page) {
        this.page = page;
        this.url = "/login";
        // Selectors defined ONCE
        this.usernameSelector = "#username";
        this.passwordSelector = "#password";
        this.loginButtonSelector = "button.login-btn";
        this.errorMessageSelector = ".error-msg";
        this.welcomeSelector = ".welcome";
    }

    goto() {
        return `page.goto('${this.url}')`;
    }

    login(username, password) {
        return [
            `page.locator('${this.usernameSelector}').fill('${username}')`,
            `page.locator('${this.passwordSelector}').fill('${password}')`,
            `page.locator('${this.loginButtonSelector}').click()`
        ];
    }

    getErrorMessage() {
        return `page.locator('${this.errorMessageSelector}')`;
    }

    getWelcomeMessage() {
        return `page.locator('${this.welcomeSelector}')`;
    }
}

const loginPage = new LoginPage("mockPage");

console.log("Test 1 (valid login) — using POM:");
loginPage.login("admin", "secret123").forEach(a => console.log("  " + a));
console.log(`  expect(${loginPage.getWelcomeMessage()}).toBeVisible()`);

console.log("Test 2 (invalid login) — using POM:");
loginPage.login("wrong", "bad").forEach(a => console.log("  " + a));
console.log(`  expect(${loginPage.getErrorMessage()}).toHaveText('Invalid')`);

console.log("Test 3 (empty fields) — using POM:");
console.log(`  page.locator('${loginPage.loginButtonSelector}').click()`);
console.log(`  expect(${loginPage.getErrorMessage()}).toHaveText('Required')`);

console.log("\n  SOLUTION: '#username' is defined in ONE place (LoginPage class)");
console.log("  If selector changes, update ONLY the LoginPage class!\n");

// ---------------------------------------------------------------
// Example 3: Side-by-side Comparison
// ---------------------------------------------------------------
console.log("--- Example 3: Side-by-Side Comparison ---");

console.log(`
  +----------------------------------------------+----------------------------------------------+
  |         WITHOUT POM                          |          WITH POM                            |
  +----------------------------------------------+----------------------------------------------+
  | // test-login.spec.js                        | // test-login.spec.js                        |
  | await page.locator('#username').fill('a');    | const loginPage = new LoginPage(page);       |
  | await page.locator('#password').fill('b');    | await loginPage.login('a', 'b');             |
  | await page.locator('button.login').click();   | // That's it! 3 lines become 2              |
  +----------------------------------------------+----------------------------------------------+
  | // test-logout.spec.js                       | // test-logout.spec.js                       |
  | await page.locator('#username').fill('a');    | const loginPage = new LoginPage(page);       |
  | await page.locator('#password').fill('b');    | await loginPage.login('a', 'b');             |
  | await page.locator('button.login').click();   | // Same! Reuses the same page object         |
  +----------------------------------------------+----------------------------------------------+
  | SELECTOR CHANGES?                            | SELECTOR CHANGES?                            |
  | Update EVERY test file. (50+ files!)         | Update ONE file: LoginPage.js                |
  +----------------------------------------------+----------------------------------------------+
`);

// ---------------------------------------------------------------
// Example 4: The Three Core Benefits
// ---------------------------------------------------------------
console.log("--- Example 4: The Three Core Benefits ---");

const benefits = {
    "1. REUSABILITY": {
        description: "Write page interactions once, use everywhere",
        example: "LoginPage.login() used in 50 different test files",
        metric: "Lines of duplicated code: from hundreds to zero"
    },
    "2. MAINTAINABILITY": {
        description: "UI changes require updates in one place only",
        example: "Button selector changes? Update only LoginPage class",
        metric: "Files to change when UI updates: from 50 to 1"
    },
    "3. READABILITY": {
        description: "Tests read like user stories, not CSS selectors",
        example: "loginPage.login('user', 'pass') vs page.locator('#xyz').fill()",
        metric: "Time to understand a test: from minutes to seconds"
    }
};

for (const [benefit, details] of Object.entries(benefits)) {
    console.log(`  ${benefit}`);
    console.log(`    What:    ${details.description}`);
    console.log(`    Example: ${details.example}`);
    console.log(`    Impact:  ${details.metric}`);
    console.log();
}

// ---------------------------------------------------------------
// Example 5: A More Realistic Non-Playwright POM Simulation
// ---------------------------------------------------------------
console.log("--- Example 5: Realistic POM Simulation (No Playwright Needed) ---");

// Simulated browser page
class MockPage {
    constructor() {
        this.currentURL = "";
        this.elements = {
            "#username": { value: "", visible: true },
            "#password": { value: "", visible: true },
            "#login-btn": { value: "Login", visible: true },
            ".error-msg": { value: "", visible: false },
            ".welcome-banner": { value: "", visible: false },
            ".dashboard-title": { value: "Dashboard", visible: false }
        };
        this.log = [];
    }

    goto(url) {
        this.currentURL = url;
        this.log.push(`Navigated to ${url}`);
        if (url.includes("/dashboard")) {
            this.elements[".dashboard-title"].visible = true;
            this.elements[".welcome-banner"].visible = true;
        }
    }

    fill(selector, value) {
        if (this.elements[selector]) {
            this.elements[selector].value = value;
            this.log.push(`Filled '${selector}' with '${value}'`);
        }
    }

    click(selector) {
        this.log.push(`Clicked '${selector}'`);
        // Simulate login logic
        if (selector === "#login-btn") {
            const username = this.elements["#username"].value;
            const password = this.elements["#password"].value;
            if (username === "admin" && password === "password123") {
                this.currentURL = "/dashboard";
                this.elements[".welcome-banner"].value = `Welcome, ${username}!`;
                this.elements[".welcome-banner"].visible = true;
                this.elements[".dashboard-title"].visible = true;
            } else if (!username || !password) {
                this.elements[".error-msg"].value = "All fields are required";
                this.elements[".error-msg"].visible = true;
            } else {
                this.elements[".error-msg"].value = "Invalid credentials";
                this.elements[".error-msg"].visible = true;
            }
        }
    }

    getText(selector) {
        return this.elements[selector] ? this.elements[selector].value : "";
    }

    isVisible(selector) {
        return this.elements[selector] ? this.elements[selector].visible : false;
    }

    url() {
        return this.currentURL;
    }
}

// Page Object using our mock
class SimulatedLoginPage {
    constructor(page) {
        this.page = page;
        this.usernameField = "#username";
        this.passwordField = "#password";
        this.loginButton = "#login-btn";
        this.errorMessage = ".error-msg";
    }

    goto() {
        this.page.goto("https://example.com/login");
    }

    login(username, password) {
        this.page.fill(this.usernameField, username);
        this.page.fill(this.passwordField, password);
        this.page.click(this.loginButton);
    }

    getErrorMessage() {
        return this.page.getText(this.errorMessage);
    }

    isErrorVisible() {
        return this.page.isVisible(this.errorMessage);
    }
}

class SimulatedDashboardPage {
    constructor(page) {
        this.page = page;
        this.welcomeBanner = ".welcome-banner";
        this.title = ".dashboard-title";
    }

    getWelcomeText() {
        return this.page.getText(this.welcomeBanner);
    }

    isLoaded() {
        return this.page.isVisible(this.title);
    }
}

// --- Running simulated tests using POM ---
console.log("\n  Running simulated tests with POM...\n");

// Test 1: Successful login
const page1 = new MockPage();
const loginPom1 = new SimulatedLoginPage(page1);
const dashPom1 = new SimulatedDashboardPage(page1);
loginPom1.goto();
loginPom1.login("admin", "password123");
const test1Pass = dashPom1.isLoaded() && dashPom1.getWelcomeText() === "Welcome, admin!";
console.log(`  Test 1 - Valid Login:     ${test1Pass ? "PASS" : "FAIL"}`);
console.log(`    Welcome text: "${dashPom1.getWelcomeText()}"`);

// Test 2: Invalid credentials
const page2 = new MockPage();
const loginPom2 = new SimulatedLoginPage(page2);
loginPom2.goto();
loginPom2.login("hacker", "wrong");
const test2Pass = loginPom2.isErrorVisible() && loginPom2.getErrorMessage() === "Invalid credentials";
console.log(`  Test 2 - Invalid Login:   ${test2Pass ? "PASS" : "FAIL"}`);
console.log(`    Error message: "${loginPom2.getErrorMessage()}"`);

// Test 3: Empty fields
const page3 = new MockPage();
const loginPom3 = new SimulatedLoginPage(page3);
loginPom3.goto();
loginPom3.login("", "");
const test3Pass = loginPom3.isErrorVisible() && loginPom3.getErrorMessage() === "All fields are required";
console.log(`  Test 3 - Empty Fields:    ${test3Pass ? "PASS" : "FAIL"}`);
console.log(`    Error message: "${loginPom3.getErrorMessage()}"`);

console.log(`\n  All actions were performed through Page Objects.`);
console.log(`  The test code never touched selectors directly!\n`);

// ---------------------------------------------------------------
// Example 6: Java Selenium POM vs JavaScript Playwright POM
// ---------------------------------------------------------------
console.log("--- Example 6: Java Selenium POM vs JavaScript Playwright POM ---");

console.log(`
  JAVA SELENIUM POM:                           JAVASCRIPT PLAYWRIGHT POM:
  ==================                            ==========================

  public class LoginPage {                      class LoginPage {
      WebDriver driver;                             constructor(page) {
                                                        this.page = page;
      @FindBy(id = "username")                      }
      WebElement usernameField;
                                                    // No annotations, just methods
      @FindBy(id = "password")                      get usernameField() {
      WebElement passwordField;                         return this.page.locator('#username');
                                                    }
      @FindBy(css = "button.login")
      WebElement loginBtn;                          get passwordField() {
                                                        return this.page.locator('#password');
      public LoginPage(WebDriver driver) {          }
          this.driver = driver;
          PageFactory.initElements(              get loginButton() {
              driver, this);                            return this.page.locator('button.login');
      }                                             }

      public void login(                            async login(user, pass) {
          String user, String pass) {                   await this.usernameField.fill(user);
          usernameField.sendKeys(user);                 await this.passwordField.fill(pass);
          passwordField.sendKeys(pass);                 await this.loginButton.click();
          loginBtn.click();                         }
      }                                         }
  }

  KEY DIFFERENCES:
  - Java uses @FindBy annotations; JS uses methods/getters
  - Java uses PageFactory.initElements(); JS has no equivalent (not needed)
  - Java uses sendKeys(); Playwright uses fill()
  - Java is synchronous; Playwright is async/await
  - The PATTERN is the same; only the SYNTAX differs
`);

// === KEY TAKEAWAYS ===
console.log("=== KEY TAKEAWAYS ===");
console.log("1. POM separates PAGE STRUCTURE (selectors, actions) from TEST LOGIC (assertions, flow)");
console.log("2. Benefits: Reusability, Maintainability, Readability");
console.log("3. Without POM: selector changes require updating dozens of test files");
console.log("4. With POM: selector changes require updating ONE page class");
console.log("5. The pattern is the SAME in Java Selenium and JavaScript Playwright");
console.log("6. POM is Playwright's officially recommended design pattern");
console.log("7. Page objects contain locators and actions; tests contain assertions and flow");
