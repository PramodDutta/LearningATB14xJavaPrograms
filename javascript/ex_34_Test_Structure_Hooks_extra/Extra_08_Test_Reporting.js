// Extra_08_Test_Reporting.js
// Topic: Test Reporting - Reporters, Traces, Screenshots, Videos - Part 8 of 8
// Extends: ex_34 (Test Structure and Hooks)
//
// CONCEPT: Test reporters format and display test results. Playwright supports multiple
// reporter types: list (terminal), HTML (interactive web report), JSON (machine-readable),
// JUnit XML (CI integration). Traces, screenshots, and videos provide debugging evidence
// when tests fail. These artifacts are the key to diagnosing test failures efficiently.
// JAVA COMPARISON: Maven Surefire reports (XML), Allure reports, ExtentReports, JUnit XML.
//   TestNG generates HTML and XML reports by default. Similar concept, different tools.
// PLAYWRIGHT RELEVANCE: Reporters are configured in playwright.config.ts. The HTML reporter
//   and Trace Viewer are Playwright's most powerful debugging tools.
// ============================================================

const fs = require("fs");
const path = require("path");
const os = require("os");

// ============================================================
console.log("--- Example 1: Built-in Reporter Types ---");
// ============================================================

const reporters = [
    {
        name: "list",
        description: "Prints a line for each test in the terminal",
        config: "'list'",
        bestFor: "Local development — quick visual feedback",
        output: "Terminal only (no files)"
    },
    {
        name: "line",
        description: "Minimal — one line per failure, summary at end",
        config: "'line'",
        bestFor: "CI/CD where you want minimal output",
        output: "Terminal only"
    },
    {
        name: "dot",
        description: "Single dot per test (like RSpec)",
        config: "'dot'",
        bestFor: "Large test suites where list is too verbose",
        output: "Terminal only"
    },
    {
        name: "html",
        description: "Interactive HTML report with screenshots, traces, and filtering",
        config: "['html', { open: 'on-failure' }]",
        bestFor: "Detailed failure analysis with visual evidence",
        output: "playwright-report/ directory"
    },
    {
        name: "json",
        description: "Machine-readable JSON report",
        config: "['json', { outputFile: 'results.json' }]",
        bestFor: "Custom dashboards, data pipelines, trend analysis",
        output: "JSON file"
    },
    {
        name: "junit",
        description: "JUnit XML format for CI/CD integration",
        config: "['junit', { outputFile: 'results/junit.xml' }]",
        bestFor: "Jenkins, Azure DevOps, GitHub Actions test summaries",
        output: "XML file"
    },
    {
        name: "github",
        description: "GitHub Actions annotations (inline test failure markers)",
        config: "'github'",
        bestFor: "GitHub Actions — shows failures directly in PR diffs",
        output: "GitHub annotations (no files)"
    },
    {
        name: "blob",
        description: "Binary format for merging sharded results",
        config: "['blob', { outputDir: 'blob-report' }]",
        bestFor: "Merging results from parallel CI shards",
        output: "Binary blob files"
    }
];

console.log("Playwright Reporter Types:");
console.log("");
reporters.forEach((r) => {
    console.log(`  ${r.name.toUpperCase()}`);
    console.log(`    Description: ${r.description}`);
    console.log(`    Config:      ${r.config}`);
    console.log(`    Best for:    ${r.bestFor}`);
    console.log(`    Output:      ${r.output}`);
    console.log("");
});

// ============================================================
console.log("--- Example 2: Configuring Multiple Reporters ---");
// ============================================================

console.log("You can use multiple reporters simultaneously:");
console.log("");

const reporterConfigs = {
    local: {
        description: "For local development",
        reporter: [
            ["list"],                                    // Terminal output
            ["html", { open: "on-failure" }]             // HTML if something fails
        ]
    },
    ci: {
        description: "For CI/CD pipelines",
        reporter: [
            ["github"],                                  // GitHub annotations
            ["html", { open: "never" }],                 // HTML report (archived as artifact)
            ["junit", { outputFile: "test-results/junit.xml" }],  // For CI test tab
            ["json", { outputFile: "test-results/results.json" }]  // For dashboards
        ]
    },
    ciWithSharding: {
        description: "For sharded CI execution",
        reporter: [
            ["blob", { outputDir: "blob-report" }]      // Merge later with merge-reports
        ]
    }
};

Object.entries(reporterConfigs).forEach(([env, config]) => {
    console.log(`  ${env} (${config.description}):`);
    console.log(`    reporter: ${JSON.stringify(config.reporter, null, 6).replace(/\n/g, "\n    ")}`);
    console.log("");
});

// ============================================================
console.log("--- Example 3: Screenshot Configuration ---");
// ============================================================

const screenshotOptions = {
    "off": "Never capture screenshots (default)",
    "on": "Capture screenshot after EVERY test (increases storage)",
    "only-on-failure": "Capture screenshot ONLY when a test fails (RECOMMENDED)"
};

console.log("Screenshot options (use.screenshot):");
Object.entries(screenshotOptions).forEach(([value, desc]) => {
    console.log(`  '${value}' — ${desc}`);
});
console.log("");

console.log(`
  Configuration:
    use: {
        screenshot: 'only-on-failure',
    }

  Manual screenshot in a test:
    await page.screenshot({ path: 'screenshots/my-test.png' });
    await page.screenshot({ path: 'full-page.png', fullPage: true });

  Attach screenshot to test report:
    const screenshot = await page.screenshot();
    await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
`);

// ============================================================
console.log("--- Example 4: Video Recording ---");
// ============================================================

const videoOptions = {
    "off": "No video recording (default)",
    "on": "Record video for every test (high storage cost)",
    "retain-on-failure": "Record always but KEEP only for failed tests (RECOMMENDED)",
    "on-first-retry": "Record only on first retry attempt"
};

console.log("Video options (use.video):");
Object.entries(videoOptions).forEach(([value, desc]) => {
    console.log(`  '${value}' — ${desc}`);
});
console.log("");

console.log(`
  Configuration:
    use: {
        video: 'retain-on-failure',
        // Video size (optional):
        video: { mode: 'retain-on-failure', size: { width: 1280, height: 720 } }
    }

  Videos are saved to the test-results/ directory.
  They appear in the HTML report attached to the failed test.
`);

// ============================================================
console.log("--- Example 5: Trace Viewer — Playwright's Power Tool ---");
// ============================================================

const traceOptions = {
    "off": "No traces (default)",
    "on": "Record trace for every test (large files, ~1-5MB each)",
    "retain-on-failure": "Record always but keep only for failed tests",
    "on-first-retry": "Record trace ONLY on the first retry (RECOMMENDED for CI)"
};

console.log("Trace options (use.trace):");
Object.entries(traceOptions).forEach(([value, desc]) => {
    console.log(`  '${value}' — ${desc}`);
});
console.log("");

console.log(`
  Configuration:
    use: {
        trace: 'on-first-retry',
    }

  What the Trace Viewer shows:
    - Every action Playwright performed (click, fill, navigate, etc.)
    - Screenshots at each step (like a filmstrip)
    - Network requests and responses
    - Console messages and errors
    - DOM snapshots you can inspect
    - Source code location for each action

  How to view traces:
    npx playwright show-trace test-results/trace.zip

  Or open the HTML report — traces are embedded and viewable inline.

  The Trace Viewer is often THE most useful tool for debugging failed tests.
  It lets you see exactly what happened, step by step, without re-running the test.
`);

// ============================================================
console.log("--- Example 6: HTML Report — Interactive Report ---");
// ============================================================

console.log(`
  The HTML reporter creates an interactive web report:

  Configuration:
    reporter: [['html', {
        open: 'on-failure',     // 'always', 'never', 'on-failure'
        outputFolder: 'playwright-report',  // default location
    }]]

  View the report:
    npx playwright show-report

  HTML report features:
    +-- Suite overview (pass/fail/skip counts, duration)
    +-- Filterable test list (by status, browser, tag)
    +-- Each test shows:
    |   +-- Test steps with timing
    |   +-- Screenshots (inline)
    |   +-- Video playback (embedded)
    |   +-- Trace viewer (embedded)
    |   +-- Error messages with stack traces
    |   +-- Retry history
    +-- Diff view for visual comparison tests
`);

// ============================================================
console.log("--- Example 7: Simulating a Test Report ---");
// ============================================================
// Build a simple report to show what reporter output looks like.

class SimpleReporter {
    constructor() {
        this.suites = [];
        this.currentSuite = null;
        this.startTime = Date.now();
    }

    beginSuite(name) {
        this.currentSuite = { name, tests: [], startTime: Date.now() };
        this.suites.push(this.currentSuite);
    }

    addResult(testName, status, durationMs, error) {
        this.currentSuite.tests.push({
            name: testName,
            status,
            duration: durationMs,
            error: error || null,
            timestamp: new Date().toISOString()
        });
    }

    // List reporter output (terminal)
    printListReport() {
        console.log("  === LIST REPORTER OUTPUT ===");
        this.suites.forEach((suite) => {
            console.log(`  ${suite.name}`);
            suite.tests.forEach((t) => {
                const icon = t.status === "passed" ? "ok" : t.status === "failed" ? "FAIL" : "skip";
                const timeStr = `${t.duration}ms`;
                console.log(`    [${icon}] ${t.name} (${timeStr})`);
                if (t.error) {
                    console.log(`         Error: ${t.error}`);
                }
            });
        });

        const allTests = this.suites.flatMap((s) => s.tests);
        const passed = allTests.filter((t) => t.status === "passed").length;
        const failed = allTests.filter((t) => t.status === "failed").length;
        const skipped = allTests.filter((t) => t.status === "skipped").length;
        const totalDuration = Date.now() - this.startTime;

        console.log(`\n  ${allTests.length} tests | ${passed} passed | ${failed} failed | ${skipped} skipped`);
        console.log(`  Total time: ${totalDuration}ms`);
        console.log("");
    }

    // JSON reporter output
    toJSON() {
        const allTests = this.suites.flatMap((s) => s.tests);
        return {
            stats: {
                total: allTests.length,
                passed: allTests.filter((t) => t.status === "passed").length,
                failed: allTests.filter((t) => t.status === "failed").length,
                skipped: allTests.filter((t) => t.status === "skipped").length,
                duration: Date.now() - this.startTime
            },
            suites: this.suites
        };
    }

    // JUnit XML reporter output
    toJUnitXML() {
        const allTests = this.suites.flatMap((s) => s.tests);
        const failures = allTests.filter((t) => t.status === "failed").length;

        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += `<testsuites tests="${allTests.length}" failures="${failures}" time="${(Date.now() - this.startTime) / 1000}">\n`;

        this.suites.forEach((suite) => {
            const suiteFailures = suite.tests.filter((t) => t.status === "failed").length;
            xml += `  <testsuite name="${suite.name}" tests="${suite.tests.length}" failures="${suiteFailures}">\n`;

            suite.tests.forEach((t) => {
                xml += `    <testcase name="${t.name}" time="${t.duration / 1000}"`;
                if (t.status === "failed") {
                    xml += `>\n      <failure message="${t.error}"/>\n    </testcase>\n`;
                } else if (t.status === "skipped") {
                    xml += `>\n      <skipped/>\n    </testcase>\n`;
                } else {
                    xml += `/>\n`;
                }
            });

            xml += `  </testsuite>\n`;
        });

        xml += `</testsuites>`;
        return xml;
    }
}

// Populate the reporter with simulated test results
const reporter = new SimpleReporter();

reporter.beginSuite("Authentication Tests");
reporter.addResult("displays login form", "passed", 450);
reporter.addResult("logs in with valid credentials", "passed", 1200);
reporter.addResult("shows error for invalid password", "passed", 890);
reporter.addResult("SSO login integration", "skipped", 0);

reporter.beginSuite("Shopping Cart Tests");
reporter.addResult("adds item to cart", "passed", 650);
reporter.addResult("updates item quantity", "failed", 3000, "Timeout: locator('#quantity-input') not found");
reporter.addResult("removes item from cart", "passed", 500);
reporter.addResult("applies discount code", "failed", 2500, "Expected '15%' but got '10%'");

// Show LIST output
reporter.printListReport();

// Show JSON output
console.log("  === JSON REPORTER OUTPUT (excerpt) ===");
const jsonReport = reporter.toJSON();
console.log("  Stats:", JSON.stringify(jsonReport.stats, null, 2).replace(/\n/g, "\n  "));
console.log("");

// Show JUnit XML output
console.log("  === JUNIT XML REPORTER OUTPUT ===");
console.log(reporter.toJUnitXML().split("\n").map((l) => "  " + l).join("\n"));
console.log("");

// ============================================================
console.log("--- Example 8: CI/CD Reporter Configuration Recipes ---");
// ============================================================

console.log("Recipe 1: GitHub Actions");
console.log(`
  reporter: [
      ['github'],                           // Inline failure annotations in PR
      ['html', { open: 'never' }],          // Upload as artifact
  ]
  // .github/workflows/test.yml:
  //   - uses: actions/upload-artifact@v4
  //     if: always()
  //     with:
  //       name: playwright-report
  //       path: playwright-report/
`);

console.log("Recipe 2: Jenkins");
console.log(`
  reporter: [
      ['junit', { outputFile: 'test-results/junit.xml' }],  // Jenkins test tab
      ['html', { open: 'never' }],
  ]
  // Jenkinsfile: junit 'test-results/junit.xml'
`);

console.log("Recipe 3: Sharded CI (parallel machines)");
console.log(`
  // On each shard:
  reporter: [['blob', { outputDir: 'blob-report' }]]

  // After all shards complete, merge:
  npx playwright merge-reports --reporter=html ./all-blob-reports
`);

console.log("Recipe 4: Custom Dashboard Integration");
console.log(`
  reporter: [
      ['json', { outputFile: 'test-results/results.json' }],
      // Post-process the JSON to send to your dashboard API
  ]
`);

// ============================================================
console.log("--- Example 9: Viewing Reports and Traces ---");
// ============================================================

console.log("Commands for viewing reports:");
console.log("");
console.log("  # Open HTML report in browser");
console.log("  npx playwright show-report");
console.log("");
console.log("  # Open a specific trace file");
console.log("  npx playwright show-trace test-results/trace.zip");
console.log("");
console.log("  # Open trace viewer online (upload trace file)");
console.log("  # https://trace.playwright.dev");
console.log("");
console.log("  # View test results directory");
console.log("  ls test-results/");
console.log("  # Typical contents:");
console.log("  #   login-test-chromium/");
console.log("  #     test-failed-1.png       (screenshot)");
console.log("  #     video.webm              (video recording)");
console.log("  #     trace.zip               (trace file)");
console.log("");

// Write a sample report to temp for demonstration
const tempDir = path.join(os.tmpdir(), "js_exercise_reporter");
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

const jsonPath = path.join(tempDir, "results.json");
fs.writeFileSync(jsonPath, JSON.stringify(reporter.toJSON(), null, 2));
console.log("  Sample JSON report written to:", jsonPath);

const xmlPath = path.join(tempDir, "junit.xml");
fs.writeFileSync(xmlPath, reporter.toJUnitXML());
console.log("  Sample JUnit XML written to:", xmlPath);
console.log("");

// Cleanup
fs.rmSync(tempDir, { recursive: true, force: true });

// ============================================================
console.log("--- Example 10: Recommended Configuration Summary ---");
// ============================================================

console.log(`
  RECOMMENDED playwright.config.ts settings for reporting:

  // For a typical project:
  {
      reporter: process.env.CI
          ? [['github'], ['html', { open: 'never' }], ['junit', { outputFile: 'junit.xml' }]]
          : [['list'], ['html', { open: 'on-failure' }]],

      use: {
          screenshot: 'only-on-failure',   // Save disk space, capture what matters
          video: 'retain-on-failure',      // Record but only keep failures
          trace: 'on-first-retry',         // Trace on retry — best balance of info vs cost
      },

      retries: process.env.CI ? 2 : 0,    // Retry in CI with trace on first retry
  }

  This gives you:
    - Fast local development (list reporter, no screenshots/videos/traces)
    - Rich CI reports (GitHub annotations + HTML report + JUnit for test tab)
    - Full debugging info for failures (screenshot + video + trace on retry)
    - Minimal storage overhead (only keep artifacts for failures)
`);

// === KEY TAKEAWAYS ===
console.log("=== KEY TAKEAWAYS ===");
console.log("1. Playwright has 8+ built-in reporters: list, html, json, junit, github, dot, line, blob");
console.log("2. Use multiple reporters simultaneously: reporter: [['list'], ['html'], ['junit', ...]]");
console.log("3. screenshot: 'only-on-failure' is the best default (captures what matters)");
console.log("4. video: 'retain-on-failure' records everything but only keeps failures");
console.log("5. trace: 'on-first-retry' gives full debugging data without excessive overhead");
console.log("6. HTML report + Trace Viewer are the most powerful debugging tools");
console.log("7. JUnit XML format integrates with Jenkins, Azure DevOps, GitHub Actions test tabs");
console.log("8. Java equivalent: Maven Surefire XML, Allure reports, ExtentReports, TestNG HTML");
