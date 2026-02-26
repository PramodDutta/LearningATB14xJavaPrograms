// Extra_04_Environment_Config.js
// Topic: Data-Driven Testing - Part 4 of 6
// Extends: Extra_03 (JSON Test Data)
//
// CONCEPT: Real test suites run against multiple environments: dev, staging,
// production. Each environment has different URLs, credentials, feature flags,
// and timeouts. Environment configuration uses process.env to select which
// config to load at runtime. This lets the same test code run against any
// environment just by setting an environment variable.
//
// JAVA COMPARISON: Java uses .properties files or .yaml with Spring profiles.
// System.getProperty("env") or System.getenv("ENV") selects the configuration.
// Maven profiles switch between environment configs. Same concept, different files.
//
// PLAYWRIGHT RELEVANCE: Playwright's config supports `use: { baseURL }` and
// environment variables. Common pattern: `process.env.BASE_URL` or creating
// separate playwright.config files per environment. The `--project` flag can
// also switch environments.
// ============================================================

console.log("=== EXTRA 04: ENVIRONMENT CONFIGURATION ===\n");

// ---------------------------------------------------------------
// Example 1: Basic Environment Selection
// ---------------------------------------------------------------
console.log("--- Example 1: Basic Environment Selection ---");

// process.env.ENV is set externally: ENV=staging npx playwright test
const currentEnv = process.env.ENV || "dev";

console.log(`  Current ENV: "${currentEnv}" (from process.env.ENV || 'dev')`);
console.log(`  To change: ENV=staging node Extra_04_Environment_Config.js`);
console.log(`  Or: ENV=prod node Extra_04_Environment_Config.js\n`);

// ---------------------------------------------------------------
// Example 2: Complete Config Objects Per Environment
// ---------------------------------------------------------------
console.log("--- Example 2: Configuration Objects ---");

const configs = {
    dev: {
        name: "Development",
        baseURL: "http://localhost:3000",
        apiURL: "http://localhost:3001/api",
        credentials: {
            admin: { username: "dev_admin", password: "devpass123" },
            standard: { username: "dev_user", password: "devpass456" },
            readonly: { username: "dev_viewer", password: "devpass789" }
        },
        timeouts: {
            navigation: 30000,
            action: 10000,
            expect: 5000
        },
        features: {
            darkMode: true,
            betaFeatures: true,
            debugPanel: true,
            analytics: false,
            twoFactorAuth: false
        },
        database: {
            host: "localhost",
            name: "myapp_dev",
            seedData: true
        },
        retries: 0,
        workers: 1,
        headless: false
    },
    staging: {
        name: "Staging",
        baseURL: "https://staging.myapp.com",
        apiURL: "https://staging-api.myapp.com/api",
        credentials: {
            admin: { username: "stg_admin", password: "StgSecure!123" },
            standard: { username: "stg_user", password: "StgSecure!456" },
            readonly: { username: "stg_viewer", password: "StgSecure!789" }
        },
        timeouts: {
            navigation: 45000,
            action: 15000,
            expect: 10000
        },
        features: {
            darkMode: true,
            betaFeatures: false,
            debugPanel: false,
            analytics: true,
            twoFactorAuth: true
        },
        database: {
            host: "staging-db.myapp.com",
            name: "myapp_staging",
            seedData: false
        },
        retries: 1,
        workers: 4,
        headless: true
    },
    prod: {
        name: "Production",
        baseURL: "https://www.myapp.com",
        apiURL: "https://api.myapp.com/api",
        credentials: {
            admin: { username: "prod_admin", password: "ProdUltraSecure!123" },
            standard: { username: "prod_user", password: "ProdUltraSecure!456" },
            readonly: { username: "prod_viewer", password: "ProdUltraSecure!789" }
        },
        timeouts: {
            navigation: 60000,
            action: 20000,
            expect: 15000
        },
        features: {
            darkMode: true,
            betaFeatures: false,
            debugPanel: false,
            analytics: true,
            twoFactorAuth: true
        },
        database: {
            host: "prod-db.myapp.com",
            name: "myapp_production",
            seedData: false
        },
        retries: 2,
        workers: 8,
        headless: true
    }
};

// Select active config
function getConfig(env) {
    const config = configs[env];
    if (!config) {
        console.log(`  WARNING: Unknown environment "${env}", falling back to dev`);
        return configs.dev;
    }
    return config;
}

const activeConfig = getConfig(currentEnv);

console.log(`  Active configuration: ${activeConfig.name}`);
console.log(`    Base URL:    ${activeConfig.baseURL}`);
console.log(`    API URL:     ${activeConfig.apiURL}`);
console.log(`    Admin user:  ${activeConfig.credentials.admin.username}`);
console.log(`    Timeouts:    nav=${activeConfig.timeouts.navigation}ms, action=${activeConfig.timeouts.action}ms`);
console.log(`    Features:    beta=${activeConfig.features.betaFeatures}, 2FA=${activeConfig.features.twoFactorAuth}`);
console.log(`    Retries:     ${activeConfig.retries}`);
console.log(`    Workers:     ${activeConfig.workers}`);
console.log(`    Headless:    ${activeConfig.headless}`);
console.log();

// ---------------------------------------------------------------
// Example 3: Using Config in Tests
// ---------------------------------------------------------------
console.log("--- Example 3: Using Config in Simulated Tests ---");

function simulatedTest(testName, testFn) {
    try {
        const result = testFn();
        console.log(`  [PASS] ${testName}`);
        return { name: testName, passed: true, result };
    } catch (e) {
        console.log(`  [FAIL] ${testName}: ${e.message}`);
        return { name: testName, passed: false, error: e.message };
    }
}

function assertEqual(actual, expected, msg) {
    if (actual !== expected) {
        throw new Error(`${msg}: expected "${expected}" but got "${actual}"`);
    }
}

simulatedTest("Login URL is correct for environment", () => {
    const loginURL = `${activeConfig.baseURL}/login`;
    // In dev, should be localhost
    if (currentEnv === "dev") {
        assertEqual(loginURL.includes("localhost"), true, "Dev should use localhost");
    }
    return loginURL;
});

simulatedTest("API endpoint is accessible", () => {
    const apiEndpoint = `${activeConfig.apiURL}/health`;
    return apiEndpoint;
});

simulatedTest("Admin credentials are set", () => {
    const admin = activeConfig.credentials.admin;
    if (!admin.username || !admin.password) {
        throw new Error("Admin credentials missing");
    }
    return `User: ${admin.username}`;
});

simulatedTest("Beta features match environment", () => {
    if (currentEnv === "dev") {
        assertEqual(activeConfig.features.betaFeatures, true, "Dev should have beta");
    } else {
        assertEqual(activeConfig.features.betaFeatures, false, "Non-dev should not have beta");
    }
});

simulatedTest("Timeouts are appropriate", () => {
    if (currentEnv === "prod") {
        assertEqual(activeConfig.timeouts.navigation >= 60000, true, "Prod needs longer timeouts");
    }
    return `Nav timeout: ${activeConfig.timeouts.navigation}ms`;
});

console.log();

// ---------------------------------------------------------------
// Example 4: Config Helper Class
// ---------------------------------------------------------------
console.log("--- Example 4: Config Helper Class ---");

class TestConfig {
    constructor() {
        this.env = process.env.ENV || process.env.TEST_ENV || "dev";
        this.config = configs[this.env] || configs.dev;
    }

    get baseURL() { return this.config.baseURL; }
    get apiURL() { return this.config.apiURL; }

    getCredentials(role = "standard") {
        return this.config.credentials[role] || this.config.credentials.standard;
    }

    getTimeout(type = "navigation") {
        return this.config.timeouts[type] || 30000;
    }

    isFeatureEnabled(feature) {
        return this.config.features[feature] || false;
    }

    get isProduction() { return this.env === "prod"; }
    get isStaging() { return this.env === "staging"; }
    get isDev() { return this.env === "dev"; }

    get retries() { return this.config.retries; }
    get workers() { return this.config.workers; }
    get headless() { return this.config.headless; }

    // Build full URL from path
    url(path) {
        return `${this.baseURL}${path.startsWith("/") ? "" : "/"}${path}`;
    }

    // Build API URL from path
    api(path) {
        return `${this.apiURL}${path.startsWith("/") ? "" : "/"}${path}`;
    }

    toString() {
        return `TestConfig[${this.env}] -> ${this.baseURL}`;
    }
}

const testConfig = new TestConfig();

console.log(`  TestConfig instance:`);
console.log(`    Environment:  ${testConfig.env}`);
console.log(`    isDev:        ${testConfig.isDev}`);
console.log(`    isStaging:    ${testConfig.isStaging}`);
console.log(`    isProduction: ${testConfig.isProduction}`);
console.log(`    url('/login'): ${testConfig.url("/login")}`);
console.log(`    api('/users'): ${testConfig.api("/users")}`);
console.log(`    getCredentials('admin'): ${JSON.stringify(testConfig.getCredentials("admin"))}`);
console.log(`    getTimeout('action'): ${testConfig.getTimeout("action")}ms`);
console.log(`    isFeatureEnabled('betaFeatures'): ${testConfig.isFeatureEnabled("betaFeatures")}`);
console.log(`    toString(): ${testConfig.toString()}`);
console.log();

// ---------------------------------------------------------------
// Example 5: Environment Comparison Table
// ---------------------------------------------------------------
console.log("--- Example 5: All Environments Comparison ---");

console.log(`\n  ${"Property".padEnd(20)} ${"Dev".padEnd(25)} ${"Staging".padEnd(28)} ${"Production".padEnd(25)}`);
console.log("  " + "-".repeat(100));

const props = [
    ["Base URL",      c => c.baseURL],
    ["Admin user",    c => c.credentials.admin.username],
    ["Nav timeout",   c => c.timeouts.navigation + "ms"],
    ["Beta features", c => String(c.features.betaFeatures)],
    ["2FA enabled",   c => String(c.features.twoFactorAuth)],
    ["Debug panel",   c => String(c.features.debugPanel)],
    ["Retries",       c => String(c.retries)],
    ["Workers",       c => String(c.workers)],
    ["Headless",      c => String(c.headless)],
];

props.forEach(([name, getter]) => {
    console.log(`  ${name.padEnd(20)} ${getter(configs.dev).padEnd(25)} ${getter(configs.staging).padEnd(28)} ${getter(configs.prod).padEnd(25)}`);
});
console.log();

// ---------------------------------------------------------------
// Example 6: Conditional Test Logic Based on Environment
// ---------------------------------------------------------------
console.log("--- Example 6: Conditional Test Logic ---");

function runConditionalTests(config) {
    console.log(`  Environment: ${config.env}\n`);

    // Test runs everywhere
    simulatedTest("Homepage loads", () => {
        return `GET ${config.url("/")}`;
    });

    // Test only in non-prod (avoid testing with real data)
    if (!config.isProduction) {
        simulatedTest("Create test user (non-prod only)", () => {
            return `POST ${config.api("/users")} with test data`;
        });
    } else {
        console.log("  [SKIP] Create test user (skipped in production)");
    }

    // Test only when feature is enabled
    if (config.isFeatureEnabled("betaFeatures")) {
        simulatedTest("Beta dashboard widget visible", () => {
            return "Checked beta widget visibility";
        });
    } else {
        console.log("  [SKIP] Beta dashboard widget (feature disabled)");
    }

    // Different assertion based on environment
    simulatedTest("Verify appropriate timeout", () => {
        const timeout = config.getTimeout("navigation");
        if (config.isProduction && timeout < 60000) {
            throw new Error("Prod timeout too low");
        }
        return `Timeout: ${timeout}ms`;
    });
}

runConditionalTests(testConfig);
console.log();

// ---------------------------------------------------------------
// Example 7: Playwright Config Integration
// ---------------------------------------------------------------
console.log("--- Example 7: Playwright Config Integration ---");

console.log(`
  // ACTUAL PLAYWRIGHT CONFIG:

  // === playwright.config.js ===
  const { defineConfig } = require('@playwright/test');

  // Read environment
  const env = process.env.ENV || 'dev';
  const configs = require('./config/environments.json');
  const config = configs[env];

  module.exports = defineConfig({
      timeout: config.timeouts.navigation,
      retries: config.retries,
      workers: config.workers,

      use: {
          baseURL: config.baseURL,
          headless: config.headless,
          actionTimeout: config.timeouts.action,
          navigationTimeout: config.timeouts.navigation,

          // Screenshot on failure
          screenshot: 'only-on-failure',
          trace: 'retain-on-failure',
      },

      projects: [
          {
              name: 'chromium',
              use: { ...devices['Desktop Chrome'] },
          },
      ],
  });

  // === Running with different environments ===
  // ENV=dev npx playwright test
  // ENV=staging npx playwright test
  // ENV=prod npx playwright test --project=chromium

  // === In test files, access config ===
  const { test, expect } = require('@playwright/test');
  const config = require('../config/test-config');

  test('login page loads', async ({ page, baseURL }) => {
      // baseURL comes from playwright.config.js -> use.baseURL
      await page.goto('/login');  // Resolves to baseURL + '/login'
      await expect(page).toHaveURL(/login/);
  });
`);

// ---------------------------------------------------------------
// Example 8: Java Comparison
// ---------------------------------------------------------------
console.log("--- Example 8: Java Comparison ---");

console.log(`
  JAVA (Properties files):                       JAVASCRIPT (Environment config):
  ========================                        ================================

  // config-dev.properties                        // config/environments.json
  base.url=http://localhost:8080                  {
  admin.username=dev_admin                            "dev": {
  admin.password=devpass123                               "baseURL": "http://localhost:3000",
  timeout.navigation=30000                                "credentials": {
                                                              "admin": {
  // config-staging.properties                                    "username": "dev_admin",
  base.url=https://staging.myapp.com                              "password": "devpass123"
  admin.username=stg_admin                                    }
  ...                                                     },
                                                          "timeouts": { "navigation": 30000 }
  // ConfigReader.java                                },
  public class ConfigReader {                         "staging": { ... },
      private Properties props;                       "prod": { ... }
                                                  }
      public ConfigReader() {
          String env = System.getenv("ENV");      // JavaScript:
          String file = "config-" +               const env = process.env.ENV || 'dev';
              (env != null ? env : "dev")          const configs = require('./environments.json');
              + ".properties";                    const config = configs[env];
          props = new Properties();               // Done! No class needed.
          props.load(new FileInputStream(file));
      }

      public String getBaseURL() {
          return props.getProperty("base.url");
      }

      public String getAdminUsername() {
          return props.getProperty(
              "admin.username");
      }
  }

  KEY DIFFERENCES:
  - Java uses .properties files (flat key=value) or .yaml
  - JavaScript uses JSON (supports nesting natively)
  - Java needs ConfigReader class with getters
  - JavaScript: require + object access (no class needed)
  - Both use environment variables (System.getenv vs process.env)
  - Maven profiles add another layer; Node.js keeps it simple
`);

// === KEY TAKEAWAYS ===
console.log("=== KEY TAKEAWAYS ===");
console.log("1. Use process.env.ENV (or similar) to select environment at runtime");
console.log("2. Define config objects for dev, staging, prod with URLs, credentials, timeouts");
console.log("3. Pattern: const config = configs[process.env.ENV || 'dev']");
console.log("4. Config helper class provides getters: url(), api(), getCredentials(), isFeatureEnabled()");
console.log("5. Conditional test logic: skip tests in prod, enable beta tests in dev");
console.log("6. Playwright: use.baseURL in config, page.goto('/path') auto-resolves");
console.log("7. Run command: ENV=staging npx playwright test");
console.log("8. Java uses .properties + ConfigReader class; JS uses JSON + direct access");
