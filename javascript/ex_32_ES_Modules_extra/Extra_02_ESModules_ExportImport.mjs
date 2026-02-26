// Extra_02_ESModules_ExportImport.mjs
// Topic: ES Modules (import/export) - Part 2 of 5
// Extends: ex_32 (ES Modules)
//
// CONCEPT: ES Modules (ESM) is the standard module system for JavaScript, supported in
// browsers and Node.js. It uses import/export syntax, is statically analyzable (tree-
// shakeable), and loads asynchronously. The .mjs extension tells Node.js to use ESM.
// JAVA COMPARISON: ESM's named exports are like Java's public classes/methods. Default
//   export is like Java's single public class per file convention.
// PLAYWRIGHT RELEVANCE: Playwright Test uses ESM syntax:
//   import { test, expect } from '@playwright/test';
//   This is THE import style you'll use in every Playwright test file.
// ============================================================
// NOTE: This file uses .mjs extension for ES Module support in Node.js.
// Run with: node Extra_02_ESModules_ExportImport.mjs
// Some import examples are COMMENTED OUT because they need actual module files.
// The focus is on understanding all syntax variations.
// ============================================================

console.log("--- Example 1: Named Exports (Inline) ---");
// In a real module file, you'd export directly:

// export const PI = 3.14159;
// export const E = 2.71828;
// export function circleArea(r) { return PI * r * r; }
// export class Circle { constructor(r) { this.r = r; } }

// Since we're in a single file, we'll demonstrate the concept:
const PI = 3.14159;
const E = 2.71828;
function circleArea(r) { return PI * r * r; }

console.log(`  PI = ${PI}`);
console.log(`  E = ${E}`);
console.log(`  circleArea(5) = ${circleArea(5).toFixed(2)}`);
console.log(`  In a module file, these would be: export const PI = 3.14159;`);

console.log("\n--- Example 2: Named Exports (Grouped at Bottom) ---");
// Alternative style: declare everything first, export at the end.

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
const LIBRARY_VERSION = "2.0.0";

// export { add, subtract, multiply, LIBRARY_VERSION };
console.log(`  add(3, 4) = ${add(3, 4)}`);
console.log(`  Grouped export syntax: export { add, subtract, multiply };`);

console.log("\n--- Example 3: Export with Renaming ---");
// You can rename exports to provide a different public API.

function internalCalculate(x, y) { return x * y + x; }

// export { internalCalculate as calculate };
// Consumers would: import { calculate } from './math.mjs';
console.log(`  internalCalculate(3, 4) = ${internalCalculate(3, 4)}`);
console.log(`  export { internalCalculate as calculate };`);
console.log(`  Consumers see 'calculate', not 'internalCalculate'`);

console.log("\n--- Example 4: Default Export ---");
// Each module can have ONE default export (the "main" thing the module provides).

// Pattern A: export default class
class UserService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    async getUser(id) {
        return { id, name: "User_" + id };
    }
    async createUser(data) {
        return { ...data, id: Date.now() };
    }
}
// export default UserService;

console.log(`  Default export class: export default class UserService {...}`);
console.log(`  Import: import UserService from './UserService.mjs';`);
console.log(`  (No curly braces for default import!)`);

// Pattern B: export default function
function processData(data) {
    return data.map(item => item.toUpperCase());
}
// export default processData;
console.log(`  Default export function: export default function processData() {...}`);

// Pattern C: export default object
const config = {
    baseUrl: "https://api.example.com",
    timeout: 30000,
    retries: 3
};
// export default config;
console.log(`  Default export object: export default { baseUrl, timeout, retries };`);

console.log("\n--- Example 5: All Import Syntax Variations ---");
console.log(`
  // ---- IMPORT SYNTAX REFERENCE ----

  // 1. Named imports (with curly braces):
  import { add, subtract } from './math.mjs';

  // 2. Named import with rename:
  import { add as sum, subtract as minus } from './math.mjs';

  // 3. Default import (NO curly braces):
  import UserService from './UserService.mjs';

  // 4. Default + named together:
  import UserService, { helpers, VERSION } from './UserService.mjs';

  // 5. Import all as namespace:
  import * as math from './math.mjs';
  // Usage: math.add(1, 2), math.subtract(3, 1), math.default

  // 6. Side-effect import (just run the module, import nothing):
  import './setup.mjs';

  // 7. Dynamic import (returns a promise — can be used anywhere):
  const module = await import('./math.mjs');
`);

console.log("--- Example 6: Default + Named Exports Together ---");

// A module can have BOTH default and named exports:
class PageObjectBase {
    constructor(page) {
        this.page = page;
    }
    async navigate(url) {
        console.log(`    Navigating to ${url}`);
    }
}

function createPage(browser) {
    return { browser, type: "page" };
}

const DEFAULT_TIMEOUT = 30000;

// export default PageObjectBase;
// export { createPage, DEFAULT_TIMEOUT };

console.log(`  Module with default + named exports:`);
console.log(`    export default PageObjectBase;`);
console.log(`    export { createPage, DEFAULT_TIMEOUT };`);
console.log(`  Import: import PageObjectBase, { createPage, DEFAULT_TIMEOUT } from './page.mjs';`);

console.log("\n--- Example 7: Importing from Node.js Built-ins ---");

// In ESM, Node.js built-ins can use the 'node:' prefix (recommended):
import { readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { platform, homedir } from 'node:os';

console.log(`  platform() = "${platform()}"`);
console.log(`  homedir() = "${homedir()}"`);
console.log(`  join('a','b','c') = "${join('a', 'b', 'c')}"`);
console.log(`  resolve('.') = "${resolve('.')}"`);

console.log("\n--- Example 8: Playwright Import Pattern ---");
console.log(`
  // The STANDARD Playwright import:
  import { test, expect } from '@playwright/test';

  // This uses NAMED imports from the Playwright package.
  // 'test' and 'expect' are named exports from '@playwright/test'.

  // A typical Playwright test file:
  import { test, expect } from '@playwright/test';

  test('login test', async ({ page }) => {
      await page.goto('https://myapp.com');
      await page.fill('#username', 'admin');
      await page.fill('#password', 'secret');
      await page.click('#login');
      await expect(page).toHaveTitle('Dashboard');
  });

  // Importing page objects:
  import { LoginPage } from './pages/LoginPage.mjs';
  import { DashboardPage } from './pages/DashboardPage.mjs';
`);

console.log("--- Example 9: Export Variations Summary ---");
console.log(`
  // ---- ALL EXPORT SYNTAX ----

  // Named exports (consumers must use same name with {}):
  export const name = 'value';
  export function fn() {}
  export class MyClass {}
  export { existing1, existing2 };
  export { internal as publicName };

  // Default export (consumers choose their own name, no {}):
  export default function() {}
  export default class {}
  export default expression;
  export { myVar as default };    // less common

  // Re-exports (covered in next file):
  export { name } from './other.mjs';
  export { default } from './other.mjs';
  export * from './other.mjs';
`);

console.log("--- Example 10: Simulating Module Structure ---");

// Let's simulate what a real multi-module project looks like:

// ---- LoginPage.mjs ----
class LoginPage {
    constructor(page) { this.page = page; }
    async login(user, pass) {
        console.log(`    LoginPage: logging in as ${user}`);
        return true;
    }
}

// ---- DashboardPage.mjs ----
class DashboardPage {
    constructor(page) { this.page = page; }
    async getTitle() { return "Dashboard"; }
    async getItems() { return ["Item 1", "Item 2", "Item 3"]; }
}

// ---- TestHelpers.mjs ----
function createTestUser() {
    return { username: "testuser", password: "test123", role: "tester" };
}

function generateRandomEmail() {
    return `test_${Date.now()}@example.com`;
}

// ---- In your test file, you'd import like this: ----
// import { test, expect } from '@playwright/test';
// import { LoginPage } from './pages/LoginPage.mjs';
// import { DashboardPage } from './pages/DashboardPage.mjs';
// import { createTestUser, generateRandomEmail } from './helpers/TestHelpers.mjs';

// Simulating the test:
async function simulatedTest() {
    const mockPage = {};
    const loginPage = new LoginPage(mockPage);
    const dashboardPage = new DashboardPage(mockPage);
    const testUser = createTestUser();

    await loginPage.login(testUser.username, testUser.password);
    const title = await dashboardPage.getTitle();
    const items = await dashboardPage.getItems();

    console.log(`    Dashboard title: ${title}`);
    console.log(`    Items: ${items.join(", ")}`);
    console.log(`    Email: ${generateRandomEmail()}`);
}

simulatedTest();

console.log("\n--- Example 11: Key Differences from CommonJS ---");
console.log(`
  Feature             | CommonJS (CJS)          | ES Modules (ESM)
  --------------------|-------------------------|---------------------------
  Syntax              | require / exports       | import / export
  Loading             | Synchronous             | Asynchronous
  Evaluation          | Dynamic (runtime)       | Static (parse-time)
  Top-level await     | Not supported           | Supported
  this at top level   | module.exports          | undefined
  File extension      | .js (default)           | .mjs or "type":"module"
  Tree shaking        | Not possible            | Supported (static analysis)
  Circular deps       | Partial object          | Live bindings (references)
  Browser support     | No (needs bundler)      | Yes (native)
  Conditional import  | if(x) require('./y')    | Must use import()
`);

console.log("--- Example 12: Top-Level await (ESM Only) ---");
// In ESM (.mjs), you can use await at the top level without an async wrapper!

// This works in .mjs files (not in CommonJS .js files):
const startTime = Date.now();
await new Promise(resolve => setTimeout(resolve, 50));
console.log(`  Top-level await: waited ${Date.now() - startTime}ms`);
console.log("  This only works in ES Modules (.mjs or 'type': 'module')!");

// In CJS, you'd need:
// (async () => { await something; })();

// === KEY TAKEAWAYS ===
// 1. ESM uses import/export — the modern standard for JavaScript modules.
// 2. Named exports: export { name } / import { name } (curly braces required).
// 3. Default export: export default X / import X (no curly braces, any name).
// 4. One default export per module + unlimited named exports.
// 5. import * as namespace — imports everything as an object.
// 6. ESM is STATIC — imports are analyzed at parse time, enabling tree shaking.
// 7. Use .mjs extension or "type": "module" in package.json for Node.js ESM.
// 8. Playwright uses ESM: import { test, expect } from '@playwright/test';
// 9. Node.js built-ins can use 'node:' prefix: import { readFileSync } from 'node:fs';
// 10. Top-level await is supported in ESM but NOT in CommonJS.
