// Extra_03_POM_Locator_Strategies.js
// Topic: Page Object Model (POM) - Part 3 of 7
// Extends: Extra_02 (POM Basic Page)
//
// CONCEPT: Playwright supports multiple locator strategies: CSS selectors, XPath,
// text-based selectors, and semantic selectors (getByRole, getByLabel, getByTestId).
// Choosing the RIGHT locator strategy makes tests resilient to UI changes. Playwright
// strongly recommends user-facing selectors over implementation-detail selectors.
//
// JAVA COMPARISON: Java Selenium uses By.id(), By.cssSelector(), By.xpath(), By.name().
// Playwright JS adds getByRole(), getByLabel(), getByText(), getByTestId() which have
// no direct Selenium equivalent — these are Playwright's "user-first" approach.
//
// PLAYWRIGHT RELEVANCE: Playwright's built-in locator strategies (getByRole, getByLabel,
// getByTestId) are the recommended way to find elements. The codegen tool generates
// these by default. They make tests more resilient and accessible-first.
// ============================================================

console.log("=== EXTRA 03: POM — LOCATOR STRATEGIES ===\n");

// ---------------------------------------------------------------
// Mock infrastructure for demonstrating locator concepts
// ---------------------------------------------------------------

class MockLocator {
    constructor(strategy, value, description) {
        this.strategy = strategy;
        this.value = value;
        this.description = description || `${strategy}: ${value}`;
    }

    toString() {
        return `Locator(${this.strategy}, '${this.value}')`;
    }

    async fill(text) {
        return `[${this.description}].fill('${text}')`;
    }

    async click() {
        return `[${this.description}].click()`;
    }
}

class MockPlaywrightPage {
    locator(selector) {
        if (selector.startsWith("//") || selector.startsWith("xpath=")) {
            return new MockLocator("xpath", selector, `xpath: ${selector}`);
        }
        return new MockLocator("css", selector, `css: ${selector}`);
    }

    getByRole(role, options = {}) {
        const desc = options.name ? `${role} "${options.name}"` : role;
        return new MockLocator("role", desc, `role: ${desc}`);
    }

    getByLabel(label) {
        return new MockLocator("label", label, `label: "${label}"`);
    }

    getByText(text, options = {}) {
        const exact = options.exact ? " (exact)" : "";
        return new MockLocator("text", text, `text: "${text}"${exact}`);
    }

    getByTestId(testId) {
        return new MockLocator("testid", testId, `testid: "${testId}"`);
    }

    getByPlaceholder(placeholder) {
        return new MockLocator("placeholder", placeholder, `placeholder: "${placeholder}"`);
    }

    getByAltText(altText) {
        return new MockLocator("alt", altText, `alt: "${altText}"`);
    }

    getByTitle(title) {
        return new MockLocator("title", title, `title: "${title}"`);
    }
}

// ---------------------------------------------------------------
// Example 1: CSS Selectors
// ---------------------------------------------------------------
console.log("--- Example 1: CSS Selectors ---");

const page = new MockPlaywrightPage();

const cssExamples = [
    { selector: "#username",                   desc: "By ID" },
    { selector: ".login-form",                 desc: "By class" },
    { selector: "button",                      desc: "By tag" },
    { selector: "input[type='email']",         desc: "By attribute" },
    { selector: "[data-testid='submit-btn']",  desc: "By data attribute" },
    { selector: ".form-group input",           desc: "Descendant" },
    { selector: ".nav > li",                   desc: "Direct child" },
    { selector: "input:first-child",           desc: "Pseudo-class" },
    { selector: "button:has-text('Submit')",   desc: "Playwright text filter" },
    { selector: ".card >> nth=0",              desc: "Playwright nth selector" },
];

cssExamples.forEach(ex => {
    const locator = page.locator(ex.selector);
    console.log(`  ${ex.desc.padEnd(25)} page.locator('${ex.selector}')`);
});

console.log(`
  Pros: Familiar, widely used, fast
  Cons: Tightly coupled to implementation (class names, IDs can change)
  Use when: No better semantic alternative exists
`);

// ---------------------------------------------------------------
// Example 2: XPath Selectors
// ---------------------------------------------------------------
console.log("--- Example 2: XPath Selectors ---");

const xpathExamples = [
    { selector: "//button[@id='submit']",                     desc: "By ID" },
    { selector: "//input[@name='email']",                     desc: "By name attribute" },
    { selector: "//div[@class='container']//input",           desc: "Descendant" },
    { selector: "//button[text()='Login']",                   desc: "By exact text" },
    { selector: "//button[contains(text(), 'Log')]",          desc: "By partial text" },
    { selector: "//div[contains(@class, 'error')]",           desc: "Partial class match" },
    { selector: "//input[@type='text'][1]",                   desc: "Index-based" },
    { selector: "//label[text()='Email']/../input",           desc: "Parent traversal" },
];

xpathExamples.forEach(ex => {
    console.log(`  ${ex.desc.padEnd(25)} page.locator("${ex.selector}")`);
});

console.log(`
  Pros: Powerful, can traverse up (parent), handles complex DOM
  Cons: Verbose, fragile (DOM structure changes break paths), slower
  Use when: CSS cannot express what you need (rare in Playwright)
  Note: Playwright discourages XPath. Prefer CSS or semantic locators.
`);

// ---------------------------------------------------------------
// Example 3: Playwright's Semantic Locators (RECOMMENDED)
// ---------------------------------------------------------------
console.log("--- Example 3: Playwright Semantic Locators (RECOMMENDED) ---");

console.log("\n  getByRole() — Find by ARIA role:");
const roleExamples = [
    page.getByRole("button", { name: "Submit" }),
    page.getByRole("textbox", { name: "Email" }),
    page.getByRole("checkbox", { name: "Remember me" }),
    page.getByRole("link", { name: "Sign up" }),
    page.getByRole("heading", { name: "Welcome" }),
    page.getByRole("navigation"),
    page.getByRole("dialog"),
];
roleExamples.forEach(loc => console.log(`    ${loc.description}`));

console.log("\n  getByLabel() — Find by associated label:");
const labelExamples = [
    page.getByLabel("Email"),
    page.getByLabel("Password"),
    page.getByLabel("Remember me"),
];
labelExamples.forEach(loc => console.log(`    ${loc.description}`));

console.log("\n  getByText() — Find by visible text:");
const textExamples = [
    page.getByText("Welcome to our site"),
    page.getByText("Login", { exact: true }),
    page.getByText("Error"),
];
textExamples.forEach(loc => console.log(`    ${loc.description}`));

console.log("\n  getByTestId() — Find by data-testid attribute:");
const testIdExamples = [
    page.getByTestId("login-form"),
    page.getByTestId("submit-button"),
    page.getByTestId("error-message"),
];
testIdExamples.forEach(loc => console.log(`    ${loc.description}`));

console.log("\n  getByPlaceholder() — Find by placeholder text:");
const placeholderExamples = [
    page.getByPlaceholder("Enter your email"),
    page.getByPlaceholder("Password"),
];
placeholderExamples.forEach(loc => console.log(`    ${loc.description}`));

console.log("\n  getByAltText() — Find by alt text (images):");
console.log(`    ${page.getByAltText("Company Logo").description}`);

console.log("\n  getByTitle() — Find by title attribute:");
console.log(`    ${page.getByTitle("Close dialog").description}`);

console.log();

// ---------------------------------------------------------------
// Example 4: Playwright's Recommended Priority Order
// ---------------------------------------------------------------
console.log("--- Example 4: Playwright's Recommended Priority Order ---");

console.log(`
  PRIORITY  LOCATOR          REASON
  ========  ===============  ==========================================
  1 (BEST)  getByRole()      Matches how users & assistive tech see the page
  2         getByLabel()     Great for form fields
  3         getByPlaceholder() When label is not available
  4         getByText()      For non-interactive elements with text
  5         getByTestId()    When no user-facing selector works
  6         CSS Selector     When nothing else fits
  7 (LAST)  XPath            Only as a last resort

  WHY THIS ORDER?
  - Levels 1-4 are "user-facing" — they match what the user sees
  - If the UI text/role changes, your tests SHOULD break (it's a real change)
  - CSS/XPath are "implementation-facing" — tied to HTML structure
  - HTML structure can change without affecting user experience
  - Tests using CSS/XPath break on irrelevant refactors
`);

// ---------------------------------------------------------------
// Example 5: LocatorExamples Page Object Class
// ---------------------------------------------------------------
console.log("--- Example 5: LocatorExamples — A Page Object Using Best Practices ---");

class SearchPage {
    constructor(page) {
        this.page = page;
    }

    // BEST: getByRole for interactive elements
    get searchInput() {
        return this.page.getByRole("textbox", { name: "Search" });
    }

    get searchButton() {
        return this.page.getByRole("button", { name: "Search" });
    }

    get filterDropdown() {
        return this.page.getByRole("combobox", { name: "Category" });
    }

    // GOOD: getByLabel for form fields
    get minPriceInput() {
        return this.page.getByLabel("Minimum Price");
    }

    get maxPriceInput() {
        return this.page.getByLabel("Maximum Price");
    }

    // GOOD: getByText for static text elements
    get noResultsMessage() {
        return this.page.getByText("No results found");
    }

    get resultCount() {
        return this.page.getByText(/\d+ results/);
    }

    // ACCEPTABLE: getByTestId when no semantic option exists
    get resultsList() {
        return this.page.getByTestId("search-results");
    }

    get loadingSpinner() {
        return this.page.getByTestId("loading-indicator");
    }

    // LESS IDEAL: CSS when forced (e.g., third-party components)
    get thirdPartyWidget() {
        return this.page.locator(".tp-widget-container >> .inner-frame");
    }

    // Actions
    async search(query) {
        await this.searchInput.fill(query);
        await this.searchButton.click();
    }

    async filterByCategory(category) {
        await this.filterDropdown.click();
        // After dropdown opens, select by text
        await this.page.getByRole("option", { name: category }).click();
    }

    async setPriceRange(min, max) {
        await this.minPriceInput.fill(String(min));
        await this.maxPriceInput.fill(String(max));
    }
}

const searchPage = new SearchPage(page);
console.log("  SearchPage locator analysis:");
console.log(`    searchInput:      ${searchPage.searchInput.description}  [getByRole - BEST]`);
console.log(`    searchButton:     ${searchPage.searchButton.description}  [getByRole - BEST]`);
console.log(`    filterDropdown:   ${searchPage.filterDropdown.description}  [getByRole - BEST]`);
console.log(`    minPriceInput:    ${searchPage.minPriceInput.description}  [getByLabel - GOOD]`);
console.log(`    maxPriceInput:    ${searchPage.maxPriceInput.description}  [getByLabel - GOOD]`);
console.log(`    noResultsMessage: ${searchPage.noResultsMessage.description}  [getByText - GOOD]`);
console.log(`    resultsList:      ${searchPage.resultsList.description}  [getByTestId - OK]`);
console.log(`    thirdPartyWidget: ${searchPage.thirdPartyWidget.description}  [CSS - LAST RESORT]`);
console.log();

// ---------------------------------------------------------------
// Example 6: Common Locator Mistakes and Fixes
// ---------------------------------------------------------------
console.log("--- Example 6: Common Locator Mistakes and Fixes ---");

const mistakes = [
    {
        bad:    "page.locator('#login-btn')",
        good:   "page.getByRole('button', { name: 'Log in' })",
        reason: "ID is implementation detail; role+name is user-facing"
    },
    {
        bad:    "page.locator('.input-email')",
        good:   "page.getByLabel('Email')",
        reason: "Class name can change in refactor; label is what user sees"
    },
    {
        bad:    "page.locator('div > ul > li:nth-child(3) > a')",
        good:   "page.getByRole('link', { name: 'Contact Us' })",
        reason: "DOM structure is fragile; link name is meaningful"
    },
    {
        bad:    "page.locator('//div[@class=\"err\"]/span')",
        good:   "page.getByText('Invalid credentials')",
        reason: "XPath tied to DOM; text is what user sees"
    },
    {
        bad:    "page.locator('input').nth(2)",
        good:   "page.getByPlaceholder('Enter password')",
        reason: "Index-based is fragile; placeholder is descriptive"
    },
];

mistakes.forEach((m, i) => {
    console.log(`  Mistake ${i + 1}:`);
    console.log(`    BAD:    ${m.bad}`);
    console.log(`    GOOD:   ${m.good}`);
    console.log(`    REASON: ${m.reason}`);
    console.log();
});

// ---------------------------------------------------------------
// Example 7: Locator Chaining and Filtering
// ---------------------------------------------------------------
console.log("--- Example 7: Locator Chaining and Filtering ---");

console.log(`
  Playwright locators can be chained and filtered:

  // Chaining: narrow down within a parent
  const productCard = page.locator('.product-card').filter({ hasText: 'Laptop' });
  const addButton = productCard.getByRole('button', { name: 'Add to cart' });

  // Filter by child locator
  const row = page.getByRole('row').filter({
      has: page.getByText('John Doe')
  });
  const editBtn = row.getByRole('button', { name: 'Edit' });

  // Combining multiple filters
  const item = page.locator('.item')
      .filter({ hasText: 'Premium' })
      .filter({ has: page.locator('.in-stock') });

  In Page Objects, this becomes:

  class ProductListPage {
      constructor(page) {
          this.page = page;
      }

      productCard(name) {
          return this.page.locator('.product-card').filter({ hasText: name });
      }

      addToCartButton(productName) {
          return this.productCard(productName).getByRole('button', { name: 'Add to cart' });
      }

      async addToCart(productName) {
          await this.addToCartButton(productName).click();
      }
  }
`);

// ---------------------------------------------------------------
// Example 8: Java Selenium vs Playwright Locator Comparison
// ---------------------------------------------------------------
console.log("--- Example 8: Java Selenium vs Playwright Locators ---");

console.log(`
  +---------------------------+----------------------------------------+-------------------------------------------+
  | STRATEGY                  | JAVA SELENIUM                          | PLAYWRIGHT JS                             |
  +---------------------------+----------------------------------------+-------------------------------------------+
  | By ID                     | By.id("username")                      | page.locator('#username')                 |
  | By Class                  | By.className("btn-primary")            | page.locator('.btn-primary')              |
  | By CSS                    | By.cssSelector("input[type='email']")  | page.locator("input[type='email']")       |
  | By XPath                  | By.xpath("//button[@id='sub']")        | page.locator("//button[@id='sub']")       |
  | By Name                   | By.name("email")                       | page.locator("[name='email']")            |
  | By Link Text              | By.linkText("Click here")              | page.getByRole('link', {name:'Click...'}) |
  | By Partial Link Text      | By.partialLinkText("Click")            | page.getByText('Click')                   |
  | By Role (no equivalent)   | N/A                                    | page.getByRole('button', {name:'Sub'})    |
  | By Label (no equivalent)  | N/A                                    | page.getByLabel('Email')                  |
  | By Test ID (no equiv)     | N/A                                    | page.getByTestId('submit-btn')            |
  | By Placeholder (no equiv) | N/A                                    | page.getByPlaceholder('Enter email')      |
  +---------------------------+----------------------------------------+-------------------------------------------+

  KEY INSIGHT: Playwright has MORE locator options that are user-facing.
  Java Selenium relies heavily on CSS/XPath. Playwright adds semantic locators.
`);

// === KEY TAKEAWAYS ===
console.log("=== KEY TAKEAWAYS ===");
console.log("1. Playwright priority: getByRole > getByLabel > getByPlaceholder > getByText > getByTestId > CSS > XPath");
console.log("2. User-facing locators (role, label, text) are resilient to implementation changes");
console.log("3. CSS and XPath are tied to HTML structure — use only when semantic options fail");
console.log("4. getByTestId is the escape hatch: reliable but requires data-testid in markup");
console.log("5. Locators can be chained and filtered for precision");
console.log("6. In Page Objects, define locators as getters using the best strategy for each element");
console.log("7. Playwright has richer locator options than Java Selenium (getByRole, getByLabel, etc.)");
