// Extra_05_Environment_Variables.js
// Topic: Environment Variables and Configuration - Part 5 of 6
// Extends: ex_33 (Node.js Built-in Modules)
//
// CONCEPT: Environment variables are key-value pairs set outside your code that configure
// application behavior without changing source code. In Node.js, they are accessed through
// process.env. They are essential for managing different environments (dev, staging, prod).
// JAVA COMPARISON: System.getenv("VARIABLE_NAME") returns the value of an environment variable.
//   Java also uses system properties via System.getProperty(). Node has only process.env.
// PLAYWRIGHT RELEVANCE: BASE_URL for different environments, HEADLESS mode toggle, BROWSER
//   selection, CI detection, authentication credentials, feature flags for test behavior.
// ============================================================

// ============================================================
console.log("--- Example 1: Reading Environment Variables with process.env ---");
// ============================================================
// process.env is an object containing all environment variables.
// Values are ALWAYS strings (even numbers come as strings).

console.log("HOME directory:", process.env.HOME || process.env.USERPROFILE);
console.log("Current PATH (first 80 chars):", (process.env.PATH || "").substring(0, 80) + "...");
console.log("Shell:", process.env.SHELL || process.env.ComSpec || "unknown");
console.log("Username:", process.env.USER || process.env.USERNAME || "unknown");

// Undefined variables return undefined (not an error)
console.log("MY_CUSTOM_VAR:", process.env.MY_CUSTOM_VAR);  // undefined
console.log("Type of undefined var:", typeof process.env.MY_CUSTOM_VAR);  // "undefined"
console.log("");

// ============================================================
console.log("--- Example 2: Setting Default Values with ?? and || ---");
// ============================================================
// Since missing env vars are undefined, we need defaults.

// ?? (nullish coalescing) — uses default when value is null or undefined
const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";
console.log("BASE_URL:", baseUrl);

// || (logical OR) — uses default when value is falsy (undefined, null, '', 0, false)
const timeout = process.env.TEST_TIMEOUT || "30000";
console.log("TEST_TIMEOUT:", timeout);

// Important difference:
//   process.env.VAR = '';  // empty string
//   '' ?? 'default'  => ''        (empty string is NOT null/undefined)
//   '' || 'default'  => 'default' (empty string IS falsy)

// Practical defaults for Playwright
const config = {
    baseURL: process.env.BASE_URL ?? "http://localhost:3000",
    headless: process.env.HEADLESS !== "false",  // default true, set HEADLESS=false to disable
    browser: process.env.BROWSER ?? "chromium",
    retries: parseInt(process.env.RETRIES ?? "0", 10),
    workers: parseInt(process.env.WORKERS ?? "4", 10),
    timeout: parseInt(process.env.TIMEOUT ?? "30000", 10)
};
console.log("Resolved config:", config);
console.log("");

// ============================================================
console.log("--- Example 3: Checking If an Environment Variable Exists ---");
// ============================================================

// Method 1: Check for undefined
if (process.env.CI === undefined) {
    console.log("CI variable is NOT set (not running in CI)");
} else {
    console.log("CI variable IS set:", process.env.CI);
}

// Method 2: 'in' operator
console.log("'HOME' in process.env:", "HOME" in process.env);
console.log("'NONEXISTENT' in process.env:", "NONEXISTENT" in process.env);

// Method 3: Check with Boolean() or truthy
const isCI = Boolean(process.env.CI);
console.log("Is CI environment?", isCI);

// List all available environment variable NAMES
const envKeys = Object.keys(process.env);
console.log("Total environment variables:", envKeys.length);
console.log("First 5 variable names:", envKeys.slice(0, 5));
console.log("");

// ============================================================
console.log("--- Example 4: Setting Environment Variables at Runtime ---");
// ============================================================
// You can set process.env values in your code. They are strings.

process.env.MY_APP_MODE = "testing";
process.env.MY_APP_DEBUG = "true";
process.env.MY_APP_PORT = "8080";

console.log("MY_APP_MODE:", process.env.MY_APP_MODE);     // "testing"
console.log("MY_APP_DEBUG:", process.env.MY_APP_DEBUG);    // "true" (string!)
console.log("MY_APP_PORT:", process.env.MY_APP_PORT);      // "8080" (string!)

// IMPORTANT: All env values are strings. You must convert them.
const port = parseInt(process.env.MY_APP_PORT, 10);
const debug = process.env.MY_APP_DEBUG === "true";
console.log("Port (number):", port, typeof port);
console.log("Debug (boolean):", debug, typeof debug);

// Clean up (delete env vars)
delete process.env.MY_APP_MODE;
delete process.env.MY_APP_DEBUG;
delete process.env.MY_APP_PORT;
console.log("After delete, MY_APP_MODE:", process.env.MY_APP_MODE);  // undefined
console.log("");

// ============================================================
console.log("--- Example 5: Simulating a .env File Pattern (Manual dotenv) ---");
// ============================================================
// The 'dotenv' package loads variables from a .env file. Here is how it works internally.
// We simulate it without any external dependency.

const fs = require("fs");
const path = require("path");
const os = require("os");

function loadEnvFile(filePath) {
    if (!fs.existsSync(filePath)) {
        console.log(`  .env file not found: ${filePath}`);
        return {};
    }
    const content = fs.readFileSync(filePath, "utf8");
    const vars = {};

    content.split("\n").forEach((line) => {
        // Skip empty lines and comments
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) return;

        // Split on first '=' only
        const eqIndex = trimmed.indexOf("=");
        if (eqIndex === -1) return;

        const key = trimmed.substring(0, eqIndex).trim();
        let value = trimmed.substring(eqIndex + 1).trim();

        // Remove surrounding quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }

        vars[key] = value;

        // Only set if not already set (existing env vars take priority)
        if (process.env[key] === undefined) {
            process.env[key] = value;
        }
    });

    return vars;
}

// Create a fake .env file to demonstrate
const tempDir = path.join(os.tmpdir(), "js_exercise_env");
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}
const envFilePath = path.join(tempDir, ".env");
fs.writeFileSync(envFilePath, `# Application Configuration
BASE_URL=https://staging.example.com
HEADLESS=true
BROWSER=chromium
API_KEY="sk-test-12345"
ADMIN_USER='admin@test.com'
ADMIN_PASS=secretPassword123
CI=false
RETRIES=2
`);

const loaded = loadEnvFile(envFilePath);
console.log("Loaded from .env file:", loaded);
console.log("BASE_URL now:", process.env.BASE_URL);
console.log("API_KEY now:", process.env.API_KEY);

// Cleanup env vars we loaded
Object.keys(loaded).forEach((key) => delete process.env[key]);
console.log("");

// ============================================================
console.log("--- Example 6: Common Playwright Environment Variables ---");
// ============================================================
// These are the most commonly used env vars in Playwright projects.

const playwrightEnvVars = {
    // Test target
    BASE_URL: "The base URL for the application under test",
    API_URL: "API endpoint for backend calls in tests",

    // Browser configuration
    BROWSER: "Which browser to use: chromium, firefox, webkit",
    HEADLESS: "Run in headless mode: true/false",

    // CI/CD
    CI: "Set by CI systems (GitHub Actions, Jenkins, etc.)",
    GITHUB_ACTIONS: "Set to 'true' when running in GitHub Actions",

    // Authentication
    ADMIN_USERNAME: "Admin user for login tests",
    ADMIN_PASSWORD: "Admin password for login tests",
    AUTH_TOKEN: "Pre-authenticated token for API tests",

    // Test execution
    RETRIES: "Number of test retries on failure",
    WORKERS: "Number of parallel workers",
    TIMEOUT: "Global test timeout in milliseconds",
    SHARD: "Shard index for parallel CI execution (e.g., '1/4')"
};

console.log("Common Playwright environment variables:");
Object.entries(playwrightEnvVars).forEach(([key, desc]) => {
    console.log(`  ${key.padEnd(20)} — ${desc}`);
});
console.log("");

// ============================================================
console.log("--- Example 7: Environment-Based Configuration Pattern ---");
// ============================================================
// Pattern used in playwright.config.js to configure based on environment.

function createPlaywrightConfig() {
    const env = process.env.TEST_ENV ?? "local";

    const envConfigs = {
        local: {
            baseURL: "http://localhost:3000",
            retries: 0,
            workers: 4,
            headless: false
        },
        staging: {
            baseURL: "https://staging.example.com",
            retries: 1,
            workers: 2,
            headless: true
        },
        production: {
            baseURL: "https://www.example.com",
            retries: 2,
            workers: 1,
            headless: true
        }
    };

    const envConfig = envConfigs[env] || envConfigs.local;

    // Environment variables override the defaults
    return {
        baseURL: process.env.BASE_URL ?? envConfig.baseURL,
        retries: parseInt(process.env.RETRIES ?? String(envConfig.retries), 10),
        workers: parseInt(process.env.WORKERS ?? String(envConfig.workers), 10),
        headless: process.env.HEADLESS !== undefined
            ? process.env.HEADLESS !== "false"
            : envConfig.headless,
        environment: env
    };
}

console.log("Config for local (default):");
console.log(createPlaywrightConfig());

process.env.TEST_ENV = "staging";
console.log("\nConfig for staging:");
console.log(createPlaywrightConfig());

process.env.TEST_ENV = "production";
process.env.WORKERS = "3";  // override
console.log("\nConfig for production (with WORKERS override):");
console.log(createPlaywrightConfig());

// Cleanup
delete process.env.TEST_ENV;
delete process.env.WORKERS;
console.log("");

// ============================================================
console.log("--- Example 8: Running with Environment Variables (CLI Examples) ---");
// ============================================================
// You can set env vars on the command line before running your script:
//
//   # Single variable
//   BASE_URL=https://staging.example.com node myscript.js
//
//   # Multiple variables
//   BASE_URL=https://staging.example.com HEADLESS=false BROWSER=firefox npx playwright test
//
//   # Using cross-env (npm package) for Windows compatibility
//   cross-env BASE_URL=https://staging.example.com npx playwright test
//
//   # In package.json scripts:
//   "scripts": {
//     "test:local": "BASE_URL=http://localhost:3000 npx playwright test",
//     "test:staging": "BASE_URL=https://staging.example.com npx playwright test",
//     "test:ci": "CI=true RETRIES=2 npx playwright test"
//   }

console.log("Run this file with custom env vars:");
console.log("  BASE_URL=https://test.com node Extra_05_Environment_Variables.js");
console.log("");

// Show current values if any were passed
if (process.env.BASE_URL) {
    console.log("  You passed BASE_URL:", process.env.BASE_URL);
}
if (process.env.HEADLESS) {
    console.log("  You passed HEADLESS:", process.env.HEADLESS);
}

// Cleanup temp files
fs.rmSync(tempDir, { recursive: true, force: true });
console.log("");

// === KEY TAKEAWAYS ===
console.log("=== KEY TAKEAWAYS ===");
console.log("1. process.env.VARIABLE_NAME reads environment variables (always strings or undefined)");
console.log("2. Use ?? for defaults: process.env.BASE_URL ?? 'http://localhost:3000'");
console.log("3. Convert types explicitly: parseInt() for numbers, === 'true' for booleans");
console.log("4. process.env values set at runtime only affect the current process");
console.log("5. .env files (dotenv pattern) load config without exposing secrets in code");
console.log("6. CI systems set CI=true — use this to adjust test behavior");
console.log("7. Java equivalent: System.getenv('VARIABLE_NAME') returns String or null");
console.log("8. Playwright uses env vars for: BASE_URL, BROWSER, HEADLESS, credentials, CI config");
