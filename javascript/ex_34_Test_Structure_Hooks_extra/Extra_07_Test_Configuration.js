// Extra_07_Test_Configuration.js
// Topic: Playwright Configuration - playwright.config.js - Part 7 of 8
// Extends: ex_34 (Test Structure and Hooks)
//
// CONCEPT: playwright.config.js (or .ts) is the central configuration file for a Playwright
// project. It defines which browsers to test, timeouts, retries, base URL, reporter settings,
// and project-specific overrides. Understanding this file is essential for setting up and
// maintaining a test framework.
// JAVA COMPARISON: Similar to pom.xml (Maven) or build.gradle (Gradle) for test configuration.
//   JUnit's junit-platform.properties. TestNG's testng.xml for suite configuration.
// PLAYWRIGHT RELEVANCE: This IS the Playwright config file. Every Playwright project has one.
//   It controls all aspects of test execution.
// ============================================================

// NOTE: This file demonstrates the config structure as a JavaScript object.
// In a real project, this would be playwright.config.ts exported with defineConfig().

// ============================================================
console.log("--- Example 1: Minimal Configuration ---");
// ============================================================

const minimalConfig = {
    testDir: "./tests",
    use: {
        baseURL: "http://localhost:3000",
    }
};

console.log("Minimal config:");
console.log(JSON.stringify(minimalConfig, null, 2));
console.log("");

// ============================================================
console.log("--- Example 2: Full Production Configuration ---");
// ============================================================

const fullConfig = {
    // ── Test Discovery ──────────────────────────────────────
    testDir: "./tests",                    // Directory containing test files
    testMatch: "**/*.spec.{ts,js}",        // Pattern to find test files
    testIgnore: "**/helpers/**",           // Ignore these patterns

    // ── Execution ───────────────────────────────────────────
    fullyParallel: true,                   // Run tests in files in parallel
    workers: process.env.CI ? 2 : undefined, // Number of parallel workers
    // workers: '50%',                     // Alternative: use 50% of CPU cores
    retries: process.env.CI ? 2 : 0,      // Retry failed tests (useful in CI)
    maxFailures: process.env.CI ? 10 : 0,  // Stop after N failures (0 = no limit)

    // ── Timeouts ────────────────────────────────────────────
    timeout: 30000,                        // Per-test timeout (30 seconds)
    expect: {
        timeout: 5000,                     // Assertion timeout (5 seconds)
    },
    globalTimeout: 600000,                 // Total run timeout (10 minutes)

    // ── Output ──────────────────────────────────────────────
    outputDir: "./test-results",           // Test artifacts output directory
    snapshotDir: "./snapshots",            // Visual comparison snapshots

    // ── Reporter ────────────────────────────────────────────
    reporter: process.env.CI
        ? [
            ["github"],                     // GitHub Actions annotations
            ["html", { open: "never" }],    // HTML report (don't auto-open in CI)
            ["junit", { outputFile: "results/junit.xml" }]  // JUnit XML for CI
        ]
        : [
            ["list"],                       // Simple list in terminal
            ["html", { open: "on-failure" }] // HTML report, open if tests fail
        ],

    // ── Shared Settings (applied to all projects) ───────────
    use: {
        // Navigation
        baseURL: process.env.BASE_URL || "http://localhost:3000",

        // Browser behavior
        headless: process.env.CI ? true : false,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,

        // Artifacts on failure
        screenshot: "only-on-failure",      // Capture screenshot when test fails
        video: "retain-on-failure",         // Keep video only for failed tests
        trace: "on-first-retry",            // Capture trace on first retry

        // Timeouts
        actionTimeout: 10000,              // Timeout for each action (click, fill, etc.)
        navigationTimeout: 15000,          // Timeout for page.goto()

        // Other
        locale: "en-US",
        timezoneId: "America/New_York",
        geolocation: { longitude: -73.935242, latitude: 40.730610 },
        permissions: ["geolocation"],
    },

    // ── Projects (Browser Matrix) ───────────────────────────
    projects: [
        {
            name: "setup",
            testMatch: /.*\.setup\.ts/,
        },
        {
            name: "chromium",
            dependencies: ["setup"],
            use: {
                browserName: "chromium",
                storageState: "auth/user.json",
            }
        },
        {
            name: "firefox",
            dependencies: ["setup"],
            use: {
                browserName: "firefox",
                storageState: "auth/user.json",
            }
        },
        {
            name: "webkit",
            dependencies: ["setup"],
            use: {
                browserName: "webkit",
                storageState: "auth/user.json",
            }
        },
        {
            name: "mobile-chrome",
            dependencies: ["setup"],
            use: {
                browserName: "chromium",
                // Playwright has built-in device descriptors
                // ...devices['Pixel 7'],
                viewport: { width: 412, height: 915 },
                userAgent: "Mozilla/5.0 (Linux; Android 13; Pixel 7)",
                isMobile: true,
                hasTouch: true,
                storageState: "auth/user.json",
            }
        }
    ],

    // ── Web Server ──────────────────────────────────────────
    webServer: {
        command: "npm run start",            // Command to start your app
        url: "http://localhost:3000",        // URL to wait for
        reuseExistingServer: !process.env.CI, // Reuse if already running (local dev)
        timeout: 120000,                     // Max wait for server to start
    }
};

console.log("Full config structure:");
console.log(JSON.stringify(fullConfig, null, 2));
console.log("");

// ============================================================
console.log("--- Example 3: Explaining Each Configuration Section ---");
// ============================================================

const configExplanations = {
    testDir: {
        type: "string",
        description: "Root directory to scan for test files",
        default: "current directory",
        example: "'./tests' or './e2e'"
    },
    fullyParallel: {
        type: "boolean",
        description: "Run tests within files in parallel (not just across files)",
        default: "false",
        example: "true for maximum speed"
    },
    workers: {
        type: "number | string",
        description: "Max parallel worker processes",
        default: "50% of CPU cores",
        example: "2 (CI), '50%', undefined (auto)"
    },
    retries: {
        type: "number",
        description: "Retry count for failed tests",
        default: "0",
        example: "2 in CI to handle flaky tests"
    },
    timeout: {
        type: "number (ms)",
        description: "Maximum time for a single test",
        default: "30000 (30 seconds)",
        example: "60000 for slow pages"
    },
    "expect.timeout": {
        type: "number (ms)",
        description: "How long expect() auto-retries before failing",
        default: "5000 (5 seconds)",
        example: "10000 for slow-rendering pages"
    },
    "use.baseURL": {
        type: "string",
        description: "Base URL for page.goto('/path') calls",
        default: "none",
        example: "'http://localhost:3000'"
    },
    "use.screenshot": {
        type: "string",
        description: "When to capture screenshots",
        default: "'off'",
        example: "'only-on-failure', 'on', 'off'"
    },
    "use.video": {
        type: "string",
        description: "When to record video",
        default: "'off'",
        example: "'retain-on-failure', 'on', 'off'"
    },
    "use.trace": {
        type: "string",
        description: "When to record traces (for Trace Viewer)",
        default: "'off'",
        example: "'on-first-retry', 'on', 'off', 'retain-on-failure'"
    }
};

console.log("Configuration options explained:");
Object.entries(configExplanations).forEach(([key, info]) => {
    console.log(`\n  ${key}:`);
    console.log(`    Type: ${info.type}`);
    console.log(`    Description: ${info.description}`);
    console.log(`    Default: ${info.default}`);
    console.log(`    Example: ${info.example}`);
});
console.log("");

// ============================================================
console.log("--- Example 4: Environment-Based Configuration ---");
// ============================================================

function createConfig(environment) {
    const envDefaults = {
        local: {
            baseURL: "http://localhost:3000",
            headless: false,
            retries: 0,
            workers: undefined, // auto-detect
            reporter: [["list"]]
        },
        staging: {
            baseURL: "https://staging.example.com",
            headless: true,
            retries: 1,
            workers: 4,
            reporter: [["list"], ["html"]]
        },
        production: {
            baseURL: "https://www.example.com",
            headless: true,
            retries: 2,
            workers: 2,
            reporter: [["github"], ["html"], ["junit", { outputFile: "junit.xml" }]]
        }
    };

    const env = envDefaults[environment] || envDefaults.local;

    return {
        testDir: "./tests",
        fullyParallel: true,
        retries: env.retries,
        workers: env.workers,
        reporter: env.reporter,
        use: {
            baseURL: env.baseURL,
            headless: env.headless,
            screenshot: "only-on-failure",
            trace: environment === "local" ? "off" : "on-first-retry"
        }
    };
}

console.log("Config for 'local':", JSON.stringify(createConfig("local"), null, 2));
console.log("\nConfig for 'staging':", JSON.stringify(createConfig("staging"), null, 2));
console.log("");

// ============================================================
console.log("--- Example 5: Projects — The Browser Matrix ---");
// ============================================================

const projectConfigs = [
    {
        name: "Desktop Chrome",
        config: {
            name: "chromium",
            use: { browserName: "chromium", viewport: { width: 1280, height: 720 } }
        }
    },
    {
        name: "Desktop Firefox",
        config: {
            name: "firefox",
            use: { browserName: "firefox", viewport: { width: 1280, height: 720 } }
        }
    },
    {
        name: "Desktop Safari",
        config: {
            name: "webkit",
            use: { browserName: "webkit", viewport: { width: 1280, height: 720 } }
        }
    },
    {
        name: "Mobile Chrome (Pixel 7)",
        config: {
            name: "mobile-chrome",
            use: { browserName: "chromium", viewport: { width: 412, height: 915 }, isMobile: true }
        }
    },
    {
        name: "Mobile Safari (iPhone 14)",
        config: {
            name: "mobile-safari",
            use: { browserName: "webkit", viewport: { width: 390, height: 844 }, isMobile: true }
        }
    },
    {
        name: "API Tests (no browser)",
        config: {
            name: "api",
            testMatch: "**/*.api.spec.ts",
            use: { baseURL: "https://api.example.com" }
        }
    }
];

console.log("Project matrix:");
projectConfigs.forEach((p) => {
    const c = p.config.use;
    console.log(`  ${p.name.padEnd(30)} ${(c.browserName || "none").padEnd(12)} ${c.viewport ? `${c.viewport.width}x${c.viewport.height}` : "N/A"}`);
});
console.log("");

// ============================================================
console.log("--- Example 6: Web Server Configuration ---");
// ============================================================

console.log(`
  The webServer option starts your app automatically before tests:

  webServer: {
      command: 'npm run start',           // or 'npm run dev'
      url: 'http://localhost:3000',       // Wait for this URL to respond
      reuseExistingServer: !process.env.CI, // Skip if server already running
      timeout: 120 * 1000,               // Max wait time (2 minutes)
      stdout: 'pipe',                     // Capture server output
      stderr: 'pipe',
  }

  // Multiple servers:
  webServer: [
      {
          command: 'npm run start:frontend',
          url: 'http://localhost:3000',
      },
      {
          command: 'npm run start:api',
          url: 'http://localhost:8080/health',
      }
  ]
`);

// ============================================================
console.log("--- Example 7: Actual playwright.config.ts Template ---");
// ============================================================

console.log(`
  // playwright.config.ts
  import { defineConfig, devices } from '@playwright/test';

  export default defineConfig({
      testDir: './tests',
      fullyParallel: true,
      forbidOnly: !!process.env.CI,     // Fail CI if test.only is left in
      retries: process.env.CI ? 2 : 0,
      workers: process.env.CI ? 2 : undefined,
      reporter: 'html',

      use: {
          baseURL: 'http://localhost:3000',
          trace: 'on-first-retry',
      },

      projects: [
          { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
          { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
          { name: 'webkit', use: { ...devices['Desktop Safari'] } },
          { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
          { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
      ],

      webServer: {
          command: 'npm run start',
          url: 'http://localhost:3000',
          reuseExistingServer: !process.env.CI,
      },
  });
`);

// ============================================================
console.log("--- Example 8: Common Configuration Patterns ---");
// ============================================================

console.log("Pattern 1: forbidOnly in CI");
console.log("  forbidOnly: !!process.env.CI");
console.log("  Fails the build if test.only() is accidentally committed\n");

console.log("Pattern 2: Retry only in CI");
console.log("  retries: process.env.CI ? 2 : 0");
console.log("  No retries locally (see failures immediately), retry in CI (handle flakiness)\n");

console.log("Pattern 3: Global setup/teardown");
console.log("  globalSetup: './global-setup.ts'");
console.log("  globalTeardown: './global-teardown.ts'");
console.log("  Run once before/after ALL tests (e.g., start Docker, seed database)\n");

console.log("Pattern 4: Test output organization");
console.log("  outputDir: './test-results'");
console.log("  Playwright stores screenshots, videos, and traces here\n");

console.log("Pattern 5: Metadata in config for custom reporters");
console.log("  metadata: { environment: 'staging', buildId: process.env.BUILD_ID }\n");

// === KEY TAKEAWAYS ===
console.log("=== KEY TAKEAWAYS ===");
console.log("1. playwright.config.ts is the central file controlling all test behavior");
console.log("2. 'use' block sets shared defaults: baseURL, headless, screenshot, video, trace");
console.log("3. 'projects' array defines the browser matrix (chromium, firefox, webkit, mobile)");
console.log("4. Environment variables (CI, BASE_URL) customize config for different environments");
console.log("5. retries, workers, timeout are the most commonly adjusted settings");
console.log("6. webServer starts your application automatically before running tests");
console.log("7. forbidOnly: !!process.env.CI prevents accidental test.only() in CI");
console.log("8. Java comparison: similar role to pom.xml/build.gradle + testng.xml combined");
