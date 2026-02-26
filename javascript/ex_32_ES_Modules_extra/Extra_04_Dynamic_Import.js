// Extra_04_Dynamic_Import.js
// Topic: Dynamic Imports - Part 4 of 5
// Extends: ex_32 (ES Modules)
//
// CONCEPT: Dynamic import() is a function that returns a Promise resolving to a module.
// Unlike static import/require, it can be used anywhere — in conditions, loops, and
// functions. It enables lazy loading, code splitting, and conditional module loading.
// JAVA COMPARISON: Similar to Class.forName() and reflection-based class loading — loading
//   classes at runtime rather than compile time.
// PLAYWRIGHT RELEVANCE: Loading test helpers conditionally, importing page objects based on
//   environment, and lazy-loading heavy test utilities only when needed.
// ============================================================

console.log("--- Example 1: Basic Dynamic import() ---");
// import() returns a Promise that resolves to the module's namespace object.

// Dynamic import of a built-in Node.js module:
(async () => {
    const osModule = await import('os');
    console.log(`  Dynamic import os: platform = "${osModule.platform()}"`);
    console.log(`  Dynamic import os: cpus = ${osModule.cpus().length} cores`);

    const pathModule = await import('path');
    console.log(`  Dynamic import path: sep = "${pathModule.sep}"`);
    console.log(`  Dynamic import path: join = "${pathModule.join('a', 'b', 'c')}"`);
})();

console.log("\n--- Example 2: Dynamic import() with Async IIFE ---");
// For CommonJS (.js) files, wrap dynamic import in an async IIFE:

(async () => {
    // This pattern works in .js files (CommonJS) where top-level await isn't available.
    const { hostname, userInfo } = await import('os');
    console.log(`  hostname: "${hostname()}"`);
    console.log(`  user: "${userInfo().username}"`);
})();

console.log("\n--- Example 3: Conditional Import ---");
// Load different modules based on a condition.

async function loadLogger(environment) {
    // In production, use a real logger; in dev, use console
    if (environment === "production") {
        // In real code: const logger = await import('./ProductionLogger.js');
        console.log("    Would load ProductionLogger (file-based, structured)");
        return {
            log: (msg) => console.log(`    [PROD] ${new Date().toISOString()} ${msg}`),
            error: (msg) => console.error(`    [PROD ERROR] ${msg}`)
        };
    } else {
        // In real code: const logger = await import('./DevLogger.js');
        console.log("    Would load DevLogger (console-based, verbose)");
        return {
            log: (msg) => console.log(`    [DEV] ${msg}`),
            error: (msg) => console.error(`    [DEV ERROR] ${msg}`)
        };
    }
}

(async () => {
    console.log("  Loading production logger:");
    const prodLogger = await loadLogger("production");
    prodLogger.log("Application started");

    console.log("  Loading development logger:");
    const devLogger = await loadLogger("development");
    devLogger.log("Debug mode enabled");
})();

console.log("\n--- Example 4: Lazy Loading (On-Demand) ---");
// Only load heavy modules when they're actually needed.

class TestRunner {
    constructor() {
        this._reportGenerator = null;
        this._screenshotTool = null;
    }

    // Lazy load: only import when first needed
    async getReportGenerator() {
        if (!this._reportGenerator) {
            console.log("    Loading report generator (heavy module)...");
            // const module = await import('./ReportGenerator.js');
            // this._reportGenerator = module.default;
            this._reportGenerator = {
                generate: (results) => ({
                    summary: `${results.length} tests`,
                    passed: results.filter(r => r.passed).length,
                    failed: results.filter(r => !r.passed).length
                })
            };
        }
        return this._reportGenerator;
    }

    async getScreenshotTool() {
        if (!this._screenshotTool) {
            console.log("    Loading screenshot tool (heavy module)...");
            // const module = await import('./ScreenshotTool.js');
            // this._screenshotTool = module.default;
            this._screenshotTool = {
                capture: (name) => `screenshots/${name}.png`
            };
        }
        return this._screenshotTool;
    }

    async runTests(tests) {
        const results = [];
        for (const test of tests) {
            console.log(`    Running: ${test.name}`);
            results.push({ name: test.name, passed: test.shouldPass });
        }

        // Only load report generator if there are results
        if (results.length > 0) {
            const reporter = await this.getReportGenerator();
            const report = reporter.generate(results);
            console.log(`    Report: ${JSON.stringify(report)}`);
        }

        // Only load screenshot tool if there are failures
        const failures = results.filter(r => !r.passed);
        if (failures.length > 0) {
            const screenshotTool = await this.getScreenshotTool();
            for (const failure of failures) {
                const path = screenshotTool.capture(failure.name);
                console.log(`    Screenshot: ${path}`);
            }
        }

        return results;
    }
}

(async () => {
    const runner = new TestRunner();
    await runner.runTests([
        { name: "login-test", shouldPass: true },
        { name: "search-test", shouldPass: false },
        { name: "checkout-test", shouldPass: true }
    ]);
})();

console.log("\n--- Example 5: Dynamic import() vs require() ---");
console.log(`
  Feature               | require()              | import()
  ----------------------|------------------------|-------------------------
  Returns               | Module directly        | Promise<Module>
  Usage                 | Synchronous            | Asynchronous (await)
  Where allowed         | CJS files only         | CJS and ESM files
  Conditional           | Yes (if/else)          | Yes (if/else)
  In loops              | Yes                    | Yes
  Top-level             | Yes                    | Yes (ESM only with await)
  Caching               | Yes                    | Yes
  Module type loaded    | CJS only               | CJS and ESM
`);

console.log("--- Example 6: Environment-Based Configuration ---");

async function loadConfig() {
    const env = process.env.NODE_ENV || "development";
    console.log(`  Environment: ${env}`);

    // In real code:
    // const config = await import(`./config/${env}.js`);
    // return config.default;

    // Simulated configs:
    const configs = {
        development: {
            baseUrl: "http://localhost:3000",
            timeout: 60000,
            headless: false,
            retries: 0
        },
        staging: {
            baseUrl: "https://staging.myapp.com",
            timeout: 30000,
            headless: true,
            retries: 1
        },
        production: {
            baseUrl: "https://myapp.com",
            timeout: 15000,
            headless: true,
            retries: 2
        }
    };

    const config = configs[env] || configs.development;
    console.log(`  Config loaded: ${JSON.stringify(config, null, 4)}`);
    return config;
}

(async () => {
    await loadConfig();
})();

console.log("\n--- Example 7: Plugin System with Dynamic Imports ---");

async function loadPlugin(pluginName) {
    console.log(`    Loading plugin: ${pluginName}`);
    // const plugin = await import(`./plugins/${pluginName}.js`);
    // return plugin.default;

    // Simulated plugins:
    const plugins = {
        "html-reporter": {
            name: "HTML Reporter",
            apply: (results) => `<html><body>${results.length} tests</body></html>`
        },
        "slack-notifier": {
            name: "Slack Notifier",
            apply: (results) => `Slack: ${results.length} tests completed`
        },
        "screenshot-on-fail": {
            name: "Screenshot on Fail",
            apply: (results) => `Screenshots taken: ${results.filter(r => !r.passed).length}`
        }
    };

    if (!plugins[pluginName]) {
        throw new Error(`Plugin "${pluginName}" not found`);
    }

    return plugins[pluginName];
}

async function runWithPlugins() {
    const enabledPlugins = ["html-reporter", "slack-notifier", "screenshot-on-fail"];
    const results = [
        { name: "test1", passed: true },
        { name: "test2", passed: false },
        { name: "test3", passed: true }
    ];

    console.log("  Loading and applying plugins:");
    for (const pluginName of enabledPlugins) {
        try {
            const plugin = await loadPlugin(pluginName);
            const output = plugin.apply(results);
            console.log(`    ${plugin.name}: ${output}`);
        } catch (error) {
            console.log(`    Plugin error: ${error.message}`);
        }
    }
}

(async () => {
    await runWithPlugins();
})();

console.log("\n--- Example 8: import() with Destructuring ---");

(async () => {
    // Destructure named exports from dynamic import:
    const { join, resolve, basename, extname } = await import('path');
    console.log(`  join('src', 'pages'): "${join('src', 'pages')}"`);
    console.log(`  basename('/a/b/file.js'): "${basename('/a/b/file.js')}"`);
    console.log(`  extname('test.spec.ts'): "${extname('test.spec.ts')}"`);

    // Default export is accessed via .default:
    // const { default: MyClass } = await import('./MyClass.js');
    // Or: const module = await import('./MyClass.js'); const MyClass = module.default;
})();

console.log("\n--- Example 9: Parallel Dynamic Imports ---");

(async () => {
    const start = Date.now();

    // Load multiple modules in parallel:
    const [osModule, pathModule, cryptoModule] = await Promise.all([
        import('os'),
        import('path'),
        import('crypto')
    ]);

    console.log(`  Parallel imports completed in ${Date.now() - start}ms`);
    console.log(`    os.arch: ${osModule.arch()}`);
    console.log(`    path.delimiter: "${pathModule.delimiter}"`);
    console.log(`    crypto.randomUUID: "${cryptoModule.randomUUID()}"`);
})();

console.log("\n--- Example 10: Error Handling for Dynamic Imports ---");

(async () => {
    // Handle missing module gracefully:
    try {
        const mod = await import('./nonexistent-module.js');
        console.log(`  Module loaded: ${mod}`);
    } catch (error) {
        console.log(`  Import failed (expected): ${error.code || error.message.substring(0, 60)}`);
    }

    // Fallback pattern:
    let database;
    try {
        // Try to load preferred database driver
        database = await import('better-sqlite3').catch(() => null);
        if (!database) {
            // Fall back to built-in alternative
            console.log("  Primary DB driver not found, using fallback");
            database = { default: { open: () => "fallback-db-connection" } };
        }
    } catch (error) {
        console.log(`  All DB drivers failed: ${error.message}`);
    }
    console.log(`  Database driver loaded: ${typeof database.default}`);
})();

console.log("\n--- Example 11: Feature Flags with Dynamic Import ---");

async function loadFeatures(featureFlags) {
    console.log("  Loading features based on flags:");
    const features = {};

    // Only load code for enabled features:
    if (featureFlags.darkMode) {
        // const { DarkModeTheme } = await import('./themes/dark.js');
        features.theme = { name: "Dark Mode", colors: { bg: "#1a1a1a", fg: "#ffffff" } };
        console.log(`    Dark Mode: loaded`);
    }

    if (featureFlags.analytics) {
        // const { Analytics } = await import('./analytics/tracker.js');
        features.analytics = { track: (event) => `Tracked: ${event}` };
        console.log(`    Analytics: loaded`);
    }

    if (featureFlags.betaFeatures) {
        // const beta = await import('./features/beta.js');
        features.beta = { newDashboard: true, aiAssistant: true };
        console.log(`    Beta Features: loaded`);
    }

    const loadedCount = Object.keys(features).length;
    const totalFlags = Object.keys(featureFlags).length;
    console.log(`  Loaded ${loadedCount}/${totalFlags} features (saves loading unused code)`);

    return features;
}

(async () => {
    const features = await loadFeatures({
        darkMode: true,
        analytics: false,
        betaFeatures: true
    });
    console.log(`  Active features: ${Object.keys(features).join(", ")}`);
})();

console.log("\n--- Example 12: Playwright Test Data Loading Pattern ---");

async function loadTestData(testSuite) {
    console.log(`  Loading test data for: ${testSuite}`);

    // In real Playwright project:
    // const testData = await import(`./test-data/${testSuite}.js`);
    // return testData.default;

    // Simulated:
    const testDataSets = {
        login: {
            validUsers: [
                { username: "admin", password: "admin123", expectedRole: "admin" },
                { username: "user1", password: "pass123", expectedRole: "viewer" }
            ],
            invalidUsers: [
                { username: "bad", password: "wrong", expectedError: "Invalid credentials" },
                { username: "", password: "", expectedError: "Username required" }
            ]
        },
        search: {
            queries: [
                { term: "Playwright", expectedMinResults: 5 },
                { term: "xyznonexistent", expectedMinResults: 0 },
                { term: "", expectedError: "Search term required" }
            ]
        }
    };

    const data = testDataSets[testSuite];
    if (!data) {
        throw new Error(`No test data for suite: ${testSuite}`);
    }

    console.log(`  Loaded ${JSON.stringify(data).length} bytes of test data`);
    return data;
}

(async () => {
    const loginData = await loadTestData("login");
    console.log(`    Valid users: ${loginData.validUsers.length}`);
    console.log(`    Invalid users: ${loginData.invalidUsers.length}`);

    const searchData = await loadTestData("search");
    console.log(`    Search queries: ${searchData.queries.length}`);
})();

// === KEY TAKEAWAYS ===
// 1. import() is a FUNCTION that returns a Promise resolving to the module namespace.
// 2. Unlike require(), import() works in BOTH CommonJS and ES Module files.
// 3. Use import() for CONDITIONAL loading — load modules only when needed.
// 4. Use import() for LAZY loading — defer heavy modules until first use.
// 5. In CommonJS files, wrap import() in an async IIFE for top-level usage.
// 6. Destructure named exports: const { x, y } = await import('./mod');
// 7. Default exports: const { default: MyClass } = await import('./mod');
// 8. Use Promise.all() to load multiple dynamic imports IN PARALLEL.
// 9. Always handle import() errors — missing modules throw at runtime.
// 10. In Playwright: use for loading test data, plugins, and env-specific config.
