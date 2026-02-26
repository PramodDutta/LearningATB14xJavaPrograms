// Extra_01_CommonJS_Require.js
// Topic: CommonJS Module System (require/module.exports) - Part 1 of 5
// Extends: ex_32 (ES Modules)
//
// CONCEPT: CommonJS (CJS) is the original module system for Node.js. It uses require()
// to import modules and module.exports or exports to export them. Modules are loaded
// synchronously and cached after first load.
// JAVA COMPARISON: Similar to Java's import statements, but CJS is dynamic (runtime) while
//   Java imports are static (compile-time). Java 9+ has the module system (module-info.java).
// PLAYWRIGHT RELEVANCE: Older Playwright setups and many npm packages use CommonJS.
//   Understanding CJS helps when integrating third-party test utilities.
// ============================================================

console.log("--- Example 1: How require() Works ---");
// require() is a built-in Node.js function for loading modules.

// Built-in Node.js modules (no installation needed):
const path = require('path');
const os = require('os');

console.log(`  path.join('a', 'b', 'c') = "${path.join('a', 'b', 'c')}"`);
console.log(`  os.platform() = "${os.platform()}"`);
console.log(`  os.homedir() = "${os.homedir()}"`);

// require() does three things:
// 1. Resolves the module path (built-in, node_modules, or relative file)
// 2. Loads and executes the module code (only the FIRST time)
// 3. Returns the module.exports object

console.log("\n--- Example 2: module.exports — The Default Export ---");
// Every Node.js file is a module. It has a special object: module.exports
// Whatever you assign to module.exports is what require() returns.

// Simulating what a separate file would look like:
// ---- file: calculator.js ----
function createCalculatorModule() {
    // This function simulates a module file
    const moduleObj = { exports: {} };

    // Module code:
    function add(a, b) { return a + b; }
    function subtract(a, b) { return a - b; }
    function multiply(a, b) { return a * b; }
    function divide(a, b) {
        if (b === 0) throw new Error("Division by zero");
        return a / b;
    }

    // Export a single object:
    moduleObj.exports = {
        add,
        subtract,
        multiply,
        divide
    };

    return moduleObj;
}

// Simulating require():
const calculator = createCalculatorModule().exports;
console.log(`  calculator.add(5, 3) = ${calculator.add(5, 3)}`);
console.log(`  calculator.multiply(4, 7) = ${calculator.multiply(4, 7)}`);

console.log("\n--- Example 3: exports.name — Named Exports ---");
// 'exports' is a shorthand reference to module.exports
// exports.name = value is the same as module.exports.name = value

function createUtilsModule() {
    const moduleObj = { exports: {} };
    const exports = moduleObj.exports; // 'exports' points to module.exports

    // Named exports using exports shorthand:
    exports.formatDate = function(date) {
        return date.toISOString().split('T')[0];
    };

    exports.capitalize = function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    exports.VERSION = "1.0.0";

    return moduleObj;
}

const utils = createUtilsModule().exports;
console.log(`  utils.formatDate(new Date()) = "${utils.formatDate(new Date())}"`);
console.log(`  utils.capitalize("hello") = "${utils.capitalize("hello")}"`);
console.log(`  utils.VERSION = "${utils.VERSION}"`);

console.log("\n--- Example 4: DANGER — Don't Reassign exports ---");
// 'exports' is just a reference. Reassigning it breaks the connection.

function createBrokenModule() {
    const moduleObj = { exports: {} };
    let exports = moduleObj.exports;

    // BAD: This reassigns the local variable, NOT module.exports!
    exports = {
        broken: true,
        message: "This won't be exported!"
    };
    // moduleObj.exports is still {} — empty!

    return moduleObj;
}

const brokenModule = createBrokenModule().exports;
console.log(`  Broken module has keys: [${Object.keys(brokenModule)}]`); // []
console.log("  Reassigning exports = {...} breaks it!");

// CORRECT: Use module.exports = {...} for a complete object:
function createFixedModule() {
    const moduleObj = { exports: {} };

    moduleObj.exports = {
        fixed: true,
        message: "This WILL be exported!"
    };

    return moduleObj;
}

const fixedModule = createFixedModule().exports;
console.log(`  Fixed module: ${fixedModule.message}`);

console.log("\n--- Example 5: Different Export Patterns ---");

// Pattern 1: Export a single function
function createSingleFunctionModule() {
    const mod = { exports: {} };
    mod.exports = function greet(name) {
        return `Hello, ${name}!`;
    };
    return mod;
}
const greet = createSingleFunctionModule().exports;
console.log(`  Single function: ${greet("Alice")}`);

// Pattern 2: Export a class
function createClassModule() {
    const mod = { exports: {} };

    class Logger {
        constructor(prefix) {
            this.prefix = prefix;
        }
        log(message) {
            return `[${this.prefix}] ${message}`;
        }
    }

    mod.exports = Logger;
    return mod;
}
const Logger = createClassModule().exports;
const logger = new Logger("APP");
console.log(`  Class export: ${logger.log("Started")}`);

// Pattern 3: Export a factory function
function createFactoryModule() {
    const mod = { exports: {} };

    mod.exports = function createDatabase(config) {
        return {
            host: config.host,
            connect() { return `Connected to ${this.host}`; },
            query(sql) { return `Executing: ${sql} on ${this.host}`; }
        };
    };

    return mod;
}
const createDB = createFactoryModule().exports;
const db = createDB({ host: "localhost:5432" });
console.log(`  Factory: ${db.connect()}`);
console.log(`  Factory: ${db.query("SELECT * FROM users")}`);

// Pattern 4: Export a singleton (instance)
function createSingletonModule() {
    const mod = { exports: {} };

    class Config {
        constructor() {
            this.settings = {};
        }
        set(key, value) { this.settings[key] = value; }
        get(key) { return this.settings[key]; }
    }

    // Export an INSTANCE, not the class
    mod.exports = new Config();
    return mod;
}
const config = createSingletonModule().exports;
config.set("env", "test");
console.log(`  Singleton: env = "${config.get("env")}"`);

console.log("\n--- Example 6: Module Resolution Order ---");
// When you call require('something'), Node.js looks in this order:
console.log(`  1. Core modules: require('path'), require('fs'), require('os')
     -> Built into Node.js, always available

  2. File modules (starting with ./ or ../):
     require('./myModule')
     -> Tries: ./myModule.js, ./myModule.json, ./myModule.node
     -> Then: ./myModule/index.js, ./myModule/index.json

  3. node_modules (no path prefix):
     require('express')
     -> Searches up directory tree:
        ./node_modules/express
        ../node_modules/express
        ../../node_modules/express
        ... up to root`);

console.log("\n--- Example 7: require() Caching ---");
// Modules are cached after the first load. Subsequent require() returns the SAME object.

function demonstrateCaching() {
    // Simulate module cache
    const moduleCache = {};

    function simulateRequire(name) {
        if (moduleCache[name]) {
            console.log(`    require('${name}') -> CACHED`);
            return moduleCache[name];
        }

        console.log(`    require('${name}') -> LOADING (first time)`);
        const moduleExports = { name, loadedAt: Date.now(), counter: 0 };
        moduleCache[name] = moduleExports;
        return moduleExports;
    }

    const first = simulateRequire("myModule");
    first.counter = 42;

    const second = simulateRequire("myModule"); // Same reference!
    console.log(`    Same object? ${first === second}`); // true
    console.log(`    second.counter = ${second.counter}`); // 42 (set by first)
}

console.log("  Module caching behavior:");
demonstrateCaching();

console.log("\n--- Example 8: Destructuring require() ---");

// With named exports, you can destructure:
const { join, resolve, basename } = require('path');
console.log(`  Destructured path.join: ${join('a', 'b')}`);
console.log(`  Destructured path.resolve: ${resolve('.')}`);
console.log(`  Destructured path.basename: ${basename('/foo/bar/file.txt')}`);

console.log("\n--- Example 9: Conditional and Dynamic require() ---");
// Unlike ESM import, require() can be used ANYWHERE — conditionally, in loops, etc.

// Conditional require:
const platform = os.platform();
console.log(`  Platform: ${platform}`);

// In real code, you might do:
// if (platform === 'win32') {
//     const winUtils = require('./windows-utils');
// } else {
//     const unixUtils = require('./unix-utils');
// }

// Dynamic require (computed path):
const modules = ['path', 'os'];
modules.forEach(modName => {
    const mod = require(modName);
    console.log(`  Dynamic require('${modName}'): ${typeof mod}`);
});

// Inside a function (lazy loading):
function getHeavyModule() {
    // Module only loaded when function is called
    const crypto = require('crypto');
    return crypto.randomBytes(8).toString('hex');
}
console.log(`  Lazy-loaded crypto: ${getHeavyModule()}`);

console.log("\n--- Example 10: JSON require() ---");
// Node.js can require JSON files directly — parsed into an object.

// require('./config.json') would return the parsed JSON object.
// This is a convenient way to load configuration.

// Simulating:
const jsonString = '{"host": "localhost", "port": 3000, "debug": true}';
const jsonConfig = JSON.parse(jsonString); // Like require('./config.json')
console.log(`  JSON config: host=${jsonConfig.host}, port=${jsonConfig.port}`);

console.log("\n--- Example 11: Real-World CJS Module Structure ---");
console.log(`
  // ---- project structure ----
  // src/
  //   pages/
  //     LoginPage.js      -> module.exports = class LoginPage {...}
  //     DashboardPage.js   -> module.exports = class DashboardPage {...}
  //     index.js           -> module.exports = { LoginPage, DashboardPage }
  //   utils/
  //     helpers.js         -> exports.retry = function() {...}
  //     config.js          -> module.exports = { baseUrl, timeout }
  //   tests/
  //     login.spec.js      -> const { LoginPage } = require('../pages');
  //
  // Usage in test file:
  //   const { LoginPage } = require('../pages');
  //   const { retry } = require('../utils/helpers');
  //   const config = require('../utils/config');
`);

console.log("--- Example 12: CommonJS vs ESM Quick Reference ---");
console.log(`
  CommonJS (CJS)                    |  ES Modules (ESM)
  ----------------------------------|----------------------------------
  require('module')                 |  import x from 'module'
  module.exports = value            |  export default value
  exports.name = value              |  export const name = value
  Dynamic (runtime)                 |  Static (parse-time)
  Synchronous loading               |  Asynchronous loading
  .js extension (default in Node)   |  .mjs or "type": "module"
  Can require conditionally         |  import() for dynamic
  Cached after first load           |  Also cached (singleton)
`);

// === KEY TAKEAWAYS ===
// 1. CommonJS uses require() to import and module.exports to export.
// 2. 'exports' is a shorthand for module.exports — don't reassign it!
// 3. module.exports can be a function, class, object, or any value.
// 4. require() is SYNCHRONOUS — module loads and executes immediately.
// 5. Modules are CACHED — require() same path twice returns the same object.
// 6. Node.js resolves: core modules -> file paths -> node_modules.
// 7. require() is DYNAMIC — can be used in if/else, loops, functions.
// 8. require() can load .js, .json, and .node files.
// 9. Destructure require for named exports: const { a, b } = require('./mod').
// 10. CJS is still widely used but ESM (import/export) is the future.
