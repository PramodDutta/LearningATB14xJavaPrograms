// Extra_03_ReExport_Barrel.js
// Topic: Re-exports and Barrel Files - Part 3 of 5
// Extends: ex_32 (ES Modules)
//
// CONCEPT: A barrel file (typically index.js) re-exports from multiple modules,
// providing a single import point. This organizes code so consumers import from
// one place instead of knowing every file path. Used extensively in Page Object Model.
// JAVA COMPARISON: Similar to Java package-level access — importing from a package
//   without knowing individual class file locations.
// PLAYWRIGHT RELEVANCE: Organizing page objects, fixtures, and helpers into clean
//   import paths: const { LoginPage, DashboardPage } = require('./pages');
// ============================================================
// NOTE: This file demonstrates patterns with working code simulations.
// The actual import/export syntax is shown in comments since we're in a single file.
// ============================================================

console.log("--- Example 1: The Problem — Many Import Paths ---");
console.log(`
  // WITHOUT barrel files, imports are messy:
  const LoginPage = require('./pages/LoginPage');
  const DashboardPage = require('./pages/DashboardPage');
  const ProfilePage = require('./pages/ProfilePage');
  const SearchPage = require('./pages/SearchPage');
  const SettingsPage = require('./pages/SettingsPage');

  // Every test file repeats these 5 lines!
  // And if you reorganize files, every import breaks.
`);

console.log("--- Example 2: The Solution — Barrel File (index.js) ---");
console.log(`
  // ---- pages/index.js (barrel file) ----
  const LoginPage = require('./LoginPage');
  const DashboardPage = require('./DashboardPage');
  const ProfilePage = require('./ProfilePage');
  const SearchPage = require('./SearchPage');
  const SettingsPage = require('./SettingsPage');

  module.exports = {
      LoginPage,
      DashboardPage,
      ProfilePage,
      SearchPage,
      SettingsPage
  };

  // ---- In your test file (clean single import!) ----
  const { LoginPage, DashboardPage, ProfilePage } = require('./pages');
  // Node.js automatically looks for ./pages/index.js
`);

console.log("--- Example 3: Working Simulation — Page Object Barrel ---");

// Simulate individual page object modules:
class LoginPage {
    constructor(page) { this.page = page; this.name = "LoginPage"; }
    async login(user, pass) {
        console.log(`      ${this.name}: login(${user}, ***)`);
        return true;
    }
    async getErrorMessage() {
        return "Invalid credentials";
    }
}

class DashboardPage {
    constructor(page) { this.page = page; this.name = "DashboardPage"; }
    async getTitle() {
        return "Dashboard";
    }
    async getWidgets() {
        return ["Sales", "Users", "Revenue"];
    }
}

class ProfilePage {
    constructor(page) { this.page = page; this.name = "ProfilePage"; }
    async getName() {
        return "Alice Johnson";
    }
    async updateBio(bio) {
        console.log(`      ${this.name}: updateBio("${bio}")`);
        return true;
    }
}

class SearchPage {
    constructor(page) { this.page = page; this.name = "SearchPage"; }
    async search(query) {
        console.log(`      ${this.name}: search("${query}")`);
        return ["Result 1", "Result 2", "Result 3"];
    }
}

class SettingsPage {
    constructor(page) { this.page = page; this.name = "SettingsPage"; }
    async toggleDarkMode() {
        console.log(`      ${this.name}: toggleDarkMode()`);
        return true;
    }
}

// This is what the barrel file (pages/index.js) would export:
const Pages = {
    LoginPage,
    DashboardPage,
    ProfilePage,
    SearchPage,
    SettingsPage
};

// Using the barrel import pattern:
const { LoginPage: LP, DashboardPage: DP, SearchPage: SP } = Pages;

async function testWithBarrelImports() {
    const mockPage = {};

    const loginPage = new LP(mockPage);
    const dashboardPage = new DP(mockPage);
    const searchPage = new SP(mockPage);

    await loginPage.login("alice", "secret");
    const title = await dashboardPage.getTitle();
    const widgets = await dashboardPage.getWidgets();
    const results = await searchPage.search("Playwright");

    console.log(`    Dashboard: ${title}`);
    console.log(`    Widgets: ${widgets.join(", ")}`);
    console.log(`    Search results: ${results.length} found`);
}

testWithBarrelImports();

console.log("\n--- Example 4: Barrel File with ESM Re-exports ---");
console.log(`
  // ---- ESM barrel file: pages/index.mjs ----

  // Re-export named exports from each module:
  export { LoginPage } from './LoginPage.mjs';
  export { DashboardPage } from './DashboardPage.mjs';
  export { ProfilePage } from './ProfilePage.mjs';

  // Re-export default as named:
  export { default as SearchPage } from './SearchPage.mjs';

  // Re-export everything from a module:
  export * from './shared-utils.mjs';

  // ---- Usage ----
  import { LoginPage, DashboardPage, ProfilePage } from './pages/index.mjs';
  // Or simply (Node resolves index.mjs):
  import { LoginPage, DashboardPage } from './pages';
`);

console.log("--- Example 5: CJS Re-export Patterns ---");

// Pattern A: Simple re-export
function createBarrelA() {
    const mod = { exports: {} };

    // Simulating require of sub-modules
    const LoginPage_ = LoginPage;
    const DashboardPage_ = DashboardPage;

    mod.exports = { LoginPage: LoginPage_, DashboardPage: DashboardPage_ };
    return mod;
}

// Pattern B: Dynamic re-export (load all files in directory)
function createBarrelB() {
    const mod = { exports: {} };

    // In real code, you might use fs.readdirSync to auto-discover:
    // const files = fs.readdirSync(__dirname).filter(f => f !== 'index.js');
    // files.forEach(file => {
    //     const name = path.basename(file, '.js');
    //     mod.exports[name] = require(`./${file}`);
    // });

    // Simulated:
    const pageClasses = { LoginPage, DashboardPage, ProfilePage, SearchPage, SettingsPage };
    Object.assign(mod.exports, pageClasses);

    return mod;
}

const barrel = createBarrelB().exports;
console.log(`  Barrel exports: ${Object.keys(barrel).join(", ")}`);
console.log(`  All are classes: ${Object.values(barrel).every(v => typeof v === 'function')}`);

console.log("\n--- Example 6: Multi-Level Barrel Structure ---");
console.log(`
  // Project structure:
  // src/
  //   pages/
  //     auth/
  //       LoginPage.js
  //       RegisterPage.js
  //       ForgotPasswordPage.js
  //       index.js              <- barrel for auth pages
  //     dashboard/
  //       DashboardPage.js
  //       WidgetPage.js
  //       index.js              <- barrel for dashboard pages
  //     index.js                <- top-level barrel (re-exports from sub-barrels)
  //
  //   utils/
  //     helpers.js
  //     constants.js
  //     index.js                <- barrel for utils
  //
  //   index.js                  <- root barrel (optional)

  // ---- pages/auth/index.js ----
  module.exports = {
      LoginPage: require('./LoginPage'),
      RegisterPage: require('./RegisterPage'),
      ForgotPasswordPage: require('./ForgotPasswordPage'),
  };

  // ---- pages/dashboard/index.js ----
  module.exports = {
      DashboardPage: require('./DashboardPage'),
      WidgetPage: require('./WidgetPage'),
  };

  // ---- pages/index.js (top-level barrel) ----
  module.exports = {
      ...require('./auth'),
      ...require('./dashboard'),
  };

  // ---- In tests: ONE import for all pages! ----
  const { LoginPage, DashboardPage, WidgetPage } = require('../pages');
`);

console.log("--- Example 7: Working Multi-Level Barrel Simulation ---");

// Simulate sub-module barrels
const authPages = {
    LoginPage,
    RegisterPage: class RegisterPage {
        constructor(page) { this.page = page; }
        async register(data) { return { success: true }; }
    },
    ForgotPasswordPage: class ForgotPasswordPage {
        constructor(page) { this.page = page; }
        async requestReset(email) { return { sent: true }; }
    }
};

const dashboardPages = {
    DashboardPage,
    WidgetPage: class WidgetPage {
        constructor(page) { this.page = page; }
        async addWidget(type) { return { type, added: true }; }
    }
};

// Top-level barrel combines them:
const allPages = {
    ...authPages,
    ...dashboardPages
};

console.log(`  Auth pages: ${Object.keys(authPages).join(", ")}`);
console.log(`  Dashboard pages: ${Object.keys(dashboardPages).join(", ")}`);
console.log(`  All pages (combined barrel): ${Object.keys(allPages).join(", ")}`);

// Using the combined barrel:
const { LoginPage: Login, DashboardPage: Dash, RegisterPage: Reg } = allPages;
console.log(`  LoginPage available: ${typeof Login === 'function'}`);
console.log(`  DashboardPage available: ${typeof Dash === 'function'}`);
console.log(`  RegisterPage available: ${typeof Reg === 'function'}`);

console.log("\n--- Example 8: Barrel with Utilities and Constants ---");

// Simulate a utils barrel
const testHelpers = {
    generateId: () => `id_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    randomEmail: () => `user_${Date.now()}@test.com`,
    waitFor: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
};

const constants = {
    BASE_URL: "https://staging.myapp.com",
    DEFAULT_TIMEOUT: 30000,
    RETRY_COUNT: 3,
    TEST_USER: { username: "admin", password: "admin123" }
};

// Utils barrel:
const utils = {
    ...testHelpers,
    ...constants
};

console.log(`  utils.generateId() = "${utils.generateId()}"`);
console.log(`  utils.randomEmail() = "${utils.randomEmail()}"`);
console.log(`  utils.BASE_URL = "${utils.BASE_URL}"`);
console.log(`  utils.TEST_USER = ${JSON.stringify(utils.TEST_USER)}`);

console.log("\n--- Example 9: Selective Re-exports ---");
console.log(`
  // Sometimes you DON'T want to re-export everything:

  // ---- pages/index.js ----
  const { LoginPage } = require('./LoginPage');
  const { DashboardPage } = require('./DashboardPage');
  // NOT exporting InternalHelper — it's private to the pages directory

  module.exports = {
      LoginPage,
      DashboardPage
      // InternalHelper is intentionally excluded
  };

  // ---- ESM version ----
  export { LoginPage } from './LoginPage.mjs';
  export { DashboardPage } from './DashboardPage.mjs';
  // export * from './InternalHelper.mjs';  // EXCLUDED on purpose

  // This controls your module's PUBLIC API.
`);

console.log("--- Example 10: Barrel with Renaming ---");
console.log(`
  // Re-export with different names:

  // ---- CJS ----
  const { Page: LoginPage } = require('./LoginPage');
  const { Page: DashboardPage } = require('./DashboardPage');
  module.exports = { LoginPage, DashboardPage };

  // ---- ESM ----
  export { Page as LoginPage } from './LoginPage.mjs';
  export { Page as DashboardPage } from './DashboardPage.mjs';
  export { default as MainPage } from './MainPage.mjs';
`);

console.log("--- Example 11: Complete Playwright Project Structure ---");

// Simulate a full Playwright project barrel pattern:
const playwrightProject = {
    pages: {
        LoginPage: "class LoginPage { login(), getError() }",
        DashboardPage: "class DashboardPage { getTitle(), getStats() }",
        ProfilePage: "class ProfilePage { getName(), updateBio() }",
        SearchPage: "class SearchPage { search(), getResults() }",
    },
    fixtures: {
        authenticatedPage: "async function -> logged-in page",
        testDatabase: "async function -> seeded database",
    },
    helpers: {
        retry: "function retry(fn, options)",
        screenshot: "function takeScreenshot(page, name)",
        report: "function generateReport(results)",
    }
};

console.log("  Playwright Project Barrel Structure:");
console.log(`    pages/index.js exports: ${Object.keys(playwrightProject.pages).join(", ")}`);
console.log(`    fixtures/index.js exports: ${Object.keys(playwrightProject.fixtures).join(", ")}`);
console.log(`    helpers/index.js exports: ${Object.keys(playwrightProject.helpers).join(", ")}`);
console.log(`
  // In your test file:
  // const { LoginPage, DashboardPage } = require('./pages');
  // const { authenticatedPage } = require('./fixtures');
  // const { retry, screenshot } = require('./helpers');
  //
  // Or with ESM:
  // import { LoginPage, DashboardPage } from './pages/index.mjs';
  // import { authenticatedPage } from './fixtures/index.mjs';
  // import { retry, screenshot } from './helpers/index.mjs';
`);

console.log("--- Example 12: Barrel Anti-patterns ---");
console.log(`
  // ANTI-PATTERN 1: Barrel files that are too large (circular dependencies)
  // If ModuleA imports from barrel, and barrel imports ModuleA -> circular!
  // Solution: Don't import siblings through the barrel within the same directory.

  // ANTI-PATTERN 2: Export * from everything (loses control of public API)
  // export * from './internal-helpers.mjs'; // Exposes everything!
  // Better: export specific items only.

  // ANTI-PATTERN 3: Deep barrel chains (barrel importing from barrel importing barrel)
  // This slows down module loading and makes debugging harder.
  // Keep barrels to 1-2 levels deep.

  // ANTI-PATTERN 4: Side effects in barrel files
  // Don't put initialization code in index.js — only re-exports.
`);

// === KEY TAKEAWAYS ===
// 1. A BARREL file (index.js) re-exports from multiple modules in one place.
// 2. Node.js auto-resolves require('./pages') to require('./pages/index.js').
// 3. Barrel files simplify imports: one line instead of many.
// 4. CJS barrels: module.exports = { ...require('./a'), ...require('./b') };
// 5. ESM barrels: export { X } from './a.mjs'; export { Y } from './b.mjs';
// 6. Multi-level barrels: sub-directory barrels re-exported by parent barrel.
// 7. Selective re-exports control your module's PUBLIC API.
// 8. In Playwright: organize page objects into a pages/ barrel for clean imports.
// 9. Avoid circular dependencies: don't import siblings through the barrel.
// 10. Keep barrels simple — only re-exports, no side effects or logic.
