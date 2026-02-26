// Extra_05_Module_Patterns.js
// Topic: Module Patterns and Migration - Part 5 of 5
// Extends: ex_32 (ES Modules)
//
// CONCEPT: JavaScript module patterns have evolved from global scripts to IIFE to CommonJS
// to ES Modules. Understanding these patterns helps when working with legacy codebases,
// migrating projects, and choosing the right approach for your Playwright test framework.
// JAVA COMPARISON: Java evolved similarly: no modules -> packages -> Java 9 module system.
//   Both ecosystems had to retrofit modular design onto existing code.
// PLAYWRIGHT RELEVANCE: Playwright uses ESM (import { test, expect } from '@playwright/test').
//   But you'll encounter CJS in older utils, npm packages, and config files.
// ============================================================

console.log("--- Example 1: The Evolution of JavaScript Modules ---");
console.log(`
  Era 1: Global Scripts (1995-2009)
    - All code in global scope
    - Name collisions everywhere
    - <script src="a.js"> <script src="b.js">

  Era 2: IIFE Module Pattern (2009-2015)
    - Immediately Invoked Function Expression
    - Creates private scope, exposes public API
    - Used by jQuery, Backbone, etc.

  Era 3: CommonJS / AMD (2009-2020)
    - CommonJS: require/exports (Node.js)
    - AMD: define/require (browsers, RequireJS)
    - UMD: works in both environments

  Era 4: ES Modules (2015-present)
    - import/export (standard JavaScript)
    - Static analysis, tree shaking
    - Works in browsers AND Node.js
    - THE future of JavaScript modules
`);

console.log("--- Example 2: IIFE Module Pattern (Historical) ---");
// The IIFE creates a private scope — variables inside don't leak to global.

const Calculator = (function() {
    // PRIVATE — not accessible outside
    let history = [];

    function logOperation(op, args, result) {
        history.push({ op, args, result, time: new Date().toISOString() });
    }

    // PUBLIC API — returned from the IIFE
    return {
        add(a, b) {
            const result = a + b;
            logOperation('add', [a, b], result);
            return result;
        },
        subtract(a, b) {
            const result = a - b;
            logOperation('subtract', [a, b], result);
            return result;
        },
        multiply(a, b) {
            const result = a * b;
            logOperation('multiply', [a, b], result);
            return result;
        },
        getHistory() {
            return [...history]; // Return copy, not reference
        },
        clearHistory() {
            history = [];
        }
    };
})(); // <-- Immediately invoked!

console.log(`  Calculator.add(5, 3) = ${Calculator.add(5, 3)}`);
console.log(`  Calculator.multiply(4, 7) = ${Calculator.multiply(4, 7)}`);
console.log(`  History: ${JSON.stringify(Calculator.getHistory())}`);
// console.log(history); // ReferenceError — history is private!
console.log("  'history' variable is PRIVATE — encapsulated by the IIFE closure.");

console.log("\n--- Example 3: Revealing Module Pattern ---");
// All functions defined as private, then selectively "revealed" in the return.

const UserManager = (function() {
    // All private
    const users = new Map();
    let nextId = 1;

    function validate(userData) {
        if (!userData.name || userData.name.trim().length === 0) {
            throw new Error("Name is required");
        }
        if (!userData.email || !userData.email.includes("@")) {
            throw new Error("Valid email is required");
        }
        return true;
    }

    function createUser(userData) {
        validate(userData);
        const user = {
            id: nextId++,
            name: userData.name.trim(),
            email: userData.email.toLowerCase(),
            createdAt: new Date().toISOString()
        };
        users.set(user.id, user);
        return { ...user }; // Return copy
    }

    function getUser(id) {
        const user = users.get(id);
        if (!user) throw new Error(`User ${id} not found`);
        return { ...user };
    }

    function getAllUsers() {
        return Array.from(users.values()).map(u => ({ ...u }));
    }

    function deleteUser(id) {
        if (!users.has(id)) throw new Error(`User ${id} not found`);
        users.delete(id);
        return true;
    }

    function getUserCount() {
        return users.size;
    }

    // Reveal ONLY the public API:
    return {
        create: createUser,     // Renamed for cleaner API
        get: getUser,
        getAll: getAllUsers,
        delete: deleteUser,
        count: getUserCount
        // validate is NOT exposed — it's internal only
    };
})();

const alice = UserManager.create({ name: "Alice", email: "alice@test.com" });
const bob = UserManager.create({ name: "Bob", email: "bob@test.com" });
console.log(`  Created: ${alice.name} (ID: ${alice.id}), ${bob.name} (ID: ${bob.id})`);
console.log(`  Total users: ${UserManager.count()}`);
console.log(`  All users: ${UserManager.getAll().map(u => u.name).join(", ")}`);

console.log("\n--- Example 4: CommonJS Module Pattern ---");

// Simulating a CommonJS module for a Playwright Page Object:
function createPageObjectModule() {
    const mod = { exports: {} };

    // ---- LoginPage.js (CommonJS) ----
    class LoginPage {
        constructor(page) {
            this.page = page;
            // Selectors
            this.usernameInput = '#username';
            this.passwordInput = '#password';
            this.loginButton = '#login-btn';
            this.errorMessage = '.error-msg';
        }

        async navigate() {
            // await this.page.goto('/login');
            console.log("      navigate() -> /login");
        }

        async login(username, password) {
            // await this.page.fill(this.usernameInput, username);
            // await this.page.fill(this.passwordInput, password);
            // await this.page.click(this.loginButton);
            console.log(`      login(${username}, ***)`);
        }

        async getError() {
            // return await this.page.textContent(this.errorMessage);
            return "Invalid credentials";
        }
    }

    mod.exports = LoginPage;
    return mod;
}

const LoginPage = createPageObjectModule().exports;
const loginPage = new LoginPage({});
console.log(`  CJS LoginPage created: ${loginPage.constructor.name}`);
loginPage.navigate();
loginPage.login("admin", "secret");

console.log("\n--- Example 5: ESM Module Pattern ---");
console.log(`
  // ---- LoginPage.mjs (ES Module) ----

  // Named exports for selectors (reusable):
  export const SELECTORS = {
      usernameInput: '#username',
      passwordInput: '#password',
      loginButton: '#login-btn',
      errorMessage: '.error-msg'
  };

  // Default export for the page class:
  export default class LoginPage {
      constructor(page) {
          this.page = page;
      }

      async navigate() {
          await this.page.goto('/login');
      }

      async login(username, password) {
          await this.page.fill(SELECTORS.usernameInput, username);
          await this.page.fill(SELECTORS.passwordInput, password);
          await this.page.click(SELECTORS.loginButton);
      }

      async getError() {
          return await this.page.textContent(SELECTORS.errorMessage);
      }
  }

  // ---- In test file ----
  import LoginPage, { SELECTORS } from './LoginPage.mjs';
`);

console.log("--- Example 6: Side-by-Side CJS vs ESM Comparison ---");

console.log("  Exporting:");
console.log(`
  // ---- CommonJS ----                // ---- ES Modules ----
  // Single export:                    // Default export:
  module.exports = MyClass;            export default MyClass;

  // Multiple named exports:           // Named exports:
  exports.add = (a, b) => a + b;      export const add = (a, b) => a + b;
  exports.sub = (a, b) => a - b;      export const sub = (a, b) => a - b;

  // Object export:                    // Grouped export:
  module.exports = { add, sub };       export { add, sub };

  // With rename:                      // With rename:
  module.exports = {                   export { myFn as publicFn };
    publicFn: myFn
  };
`);

console.log("  Importing:");
console.log(`
  // ---- CommonJS ----                // ---- ES Modules ----
  // Default:                          // Default:
  const MyClass = require('./mod');    import MyClass from './mod.mjs';

  // Named:                            // Named:
  const { add } = require('./mod');    import { add } from './mod.mjs';

  // All:                              // All (namespace):
  const mod = require('./mod');        import * as mod from './mod.mjs';

  // Dynamic/conditional:              // Dynamic import:
  if (x) require('./mod');             if (x) await import('./mod.mjs');
`);

console.log("--- Example 7: Singleton Pattern (Both Systems) ---");

// CJS Singleton (works because require() caches modules):
const CJSSingleton = (function() {
    let instance = null;

    class Database {
        constructor() {
            if (instance) {
                throw new Error("Use Database.getInstance()");
            }
            this.connections = [];
            this.maxConnections = 10;
        }

        static getInstance() {
            if (!instance) {
                instance = new Database();
            }
            return instance;
        }

        connect(name) {
            if (this.connections.length >= this.maxConnections) {
                throw new Error("Max connections reached");
            }
            this.connections.push(name);
            return `Connected: ${name}`;
        }

        getStatus() {
            return `${this.connections.length}/${this.maxConnections} connections`;
        }
    }

    // In CJS: module.exports = Database.getInstance();
    // Every require('./database') returns the SAME instance.
    return Database.getInstance();
})();

CJSSingleton.connect("test-1");
CJSSingleton.connect("test-2");
console.log(`  Singleton status: ${CJSSingleton.getStatus()}`);

// ESM Singleton (module-level state is per-module, shared across all imports):
console.log(`
  // ---- database.mjs (ESM Singleton) ----
  // Module-level variables are shared across ALL imports (singletons by default!)

  let connectionPool = [];

  export function connect(name) {
      connectionPool.push(name);
      return 'Connected: ' + name;
  }

  export function getPool() {
      return [...connectionPool];
  }

  // Every file that imports from database.mjs shares the SAME connectionPool.
  // ESM modules are singletons by nature!
`);

console.log("\n--- Example 8: Factory Pattern with Modules ---");

// Factory that creates page objects based on page name:
function pageObjectFactory(pageName, pageInstance) {
    // In real code, these would be separate module files
    const pageClasses = {
        login: class LoginPage {
            constructor(page) { this.page = page; this.name = "LoginPage"; }
            async doAction() { return "login action"; }
        },
        dashboard: class DashboardPage {
            constructor(page) { this.page = page; this.name = "DashboardPage"; }
            async doAction() { return "dashboard action"; }
        },
        profile: class ProfilePage {
            constructor(page) { this.page = page; this.name = "ProfilePage"; }
            async doAction() { return "profile action"; }
        }
    };

    const PageClass = pageClasses[pageName];
    if (!PageClass) {
        throw new Error(`Unknown page: ${pageName}`);
    }

    return new PageClass(pageInstance);
}

const pages = ["login", "dashboard", "profile"];
pages.forEach(pageName => {
    const pageObj = pageObjectFactory(pageName, {});
    console.log(`  Created: ${pageObj.name}`);
});

console.log("\n--- Example 9: Migration from CJS to ESM ---");
console.log(`
  STEP-BY-STEP MIGRATION:

  1. Add "type": "module" to package.json
     (This makes ALL .js files use ESM by default)

  2. OR rename files from .js to .mjs (incremental migration)

  3. Replace require() with import:
     BEFORE: const { test, expect } = require('@playwright/test');
     AFTER:  import { test, expect } from '@playwright/test';

  4. Replace module.exports with export:
     BEFORE: module.exports = { LoginPage };
     AFTER:  export { LoginPage };
     OR:     export default LoginPage;

  5. Replace __dirname and __filename (not available in ESM):
     BEFORE: const dir = __dirname;
     AFTER:  import { fileURLToPath } from 'url';
             import { dirname } from 'path';
             const __filename = fileURLToPath(import.meta.url);
             const __dirname = dirname(__filename);

  6. Replace require.resolve():
     BEFORE: const path = require.resolve('./config');
     AFTER:  import.meta.resolve('./config');

  7. Handle JSON imports:
     BEFORE: const config = require('./config.json');
     AFTER:  import config from './config.json' assert { type: 'json' };
     OR:     const config = JSON.parse(readFileSync('./config.json', 'utf8'));

  8. Update package.json scripts:
     No changes needed — node handles .mjs automatically.

  GOTCHAS:
  - ESM cannot require() CJS modules (use import() instead)
  - CJS can use import() to load ESM (but it's async)
  - __dirname, __filename don't exist in ESM
  - require.cache doesn't exist in ESM
  - JSON import syntax may vary by Node.js version
`);

console.log("--- Example 10: When to Use Which Module System ---");
console.log(`
  USE CommonJS (require/exports) WHEN:
  - Working with older Node.js projects
  - Using npm packages that only support CJS
  - Writing Node.js CLI tools
  - Config files (webpack.config.js, jest.config.js)

  USE ES Modules (import/export) WHEN:
  - Starting a new project (RECOMMENDED)
  - Writing Playwright tests (import { test, expect })
  - Building browser-compatible code
  - You need tree shaking / code splitting
  - Working with modern frameworks (React, Vue, Angular)

  USE Dynamic import() WHEN:
  - Loading modules conditionally
  - Lazy loading for performance
  - Loading ESM from CJS code
  - Plugin / extension systems
  - Loading user-configurable modules

  PLAYWRIGHT SPECIFICS:
  - playwright.config.ts uses ESM (import/export)
  - Test files use: import { test, expect } from '@playwright/test'
  - Page objects use: export default class LoginPage
  - TypeScript compiler handles module transformation
`);

console.log("\n--- Example 11: Interop — Using CJS and ESM Together ---");

// CJS can use dynamic import() to load ESM:
(async () => {
    // This works in a .js (CJS) file:
    const osModule = await import('os');
    console.log(`  CJS loading ESM via import(): platform=${osModule.platform()}`);
})();

// ESM can import CJS with regular import (Node.js handles it):
// import express from 'express';  // express is CJS, but ESM can import it
console.log(`
  // ESM importing CJS — Node.js wraps CJS module.exports as default export:
  // import express from 'express';          // Works!
  // import { Router } from 'express';       // May NOT work (CJS named exports vary)
  // Better: import express from 'express'; const { Router } = express;
`);

console.log("--- Example 12: Complete Playwright Project — Module Structure ---");

console.log(`
  playwright-project/
  |-- package.json             {"type": "module"}  <-- enables ESM
  |-- playwright.config.ts
  |-- tsconfig.json
  |-- tests/
  |   |-- login.spec.ts        import { test, expect } from '@playwright/test'
  |   |-- search.spec.ts       import { LoginPage } from '../pages'
  |   |-- checkout.spec.ts     import { TestData } from '../test-data'
  |-- pages/
  |   |-- LoginPage.ts         export class LoginPage {...}
  |   |-- DashboardPage.ts     export class DashboardPage {...}
  |   |-- SearchPage.ts        export class SearchPage {...}
  |   |-- BasePage.ts          export abstract class BasePage {...}
  |   |-- index.ts             export { LoginPage } from './LoginPage'
  |                            export { DashboardPage } from './DashboardPage'
  |                            (barrel file!)
  |-- fixtures/
  |   |-- auth.fixture.ts      export const test = baseTest.extend({...})
  |   |-- index.ts             export { test } from './auth.fixture'
  |-- test-data/
  |   |-- users.ts             export const validUsers = [...]
  |   |-- products.ts          export const testProducts = [...]
  |   |-- index.ts             export * from './users'; export * from './products';
  |-- utils/
  |   |-- helpers.ts           export function retry() {...}
  |   |-- constants.ts         export const BASE_URL = '...'
  |   |-- index.ts             export * from './helpers'; export * from './constants';

  KEY POINTS:
  - Every directory has an index.ts barrel file
  - All files use ESM (import/export)
  - TypeScript + ESM is the Playwright standard
  - Page objects are exported as named classes
  - Test data is exported as named constants
  - Fixtures extend the base test with custom setup
`);

// === KEY TAKEAWAYS ===
// 1. JS modules evolved: global -> IIFE -> CJS -> ESM (current standard).
// 2. IIFE pattern creates private scope — historical but still useful for encapsulation.
// 3. Revealing module pattern: define private, selectively expose public API.
// 4. CommonJS (require/exports): synchronous, dynamic, Node.js default.
// 5. ES Modules (import/export): async, static, tree-shakeable, the FUTURE.
// 6. Modules are SINGLETONS — module-level state is shared across all imports.
// 7. CJS -> ESM migration: require -> import, module.exports -> export.
// 8. __dirname and __filename need special handling in ESM (import.meta.url).
// 9. CJS and ESM can interop via dynamic import() (CJS->ESM) or default import (ESM->CJS).
// 10. Playwright projects use ESM + TypeScript: import { test, expect } from '@playwright/test'.
