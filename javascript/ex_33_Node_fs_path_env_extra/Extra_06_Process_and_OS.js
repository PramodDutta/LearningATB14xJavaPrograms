// Extra_06_Process_and_OS.js
// Topic: Process and OS Modules - Part 6 of 6
// Extends: ex_33 (Node.js Built-in Modules)
//
// CONCEPT: The 'process' global provides information about and control over the current Node.js
// process: command-line arguments, working directory, exit codes, memory usage, and platform info.
// The 'os' module provides operating system-related utility methods: platform, CPU, memory, dirs.
// JAVA COMPARISON: process.argv ~ args[] in main(). process.cwd() ~ System.getProperty("user.dir").
//   process.exit() ~ System.exit(). os.platform() ~ System.getProperty("os.name").
// PLAYWRIGHT RELEVANCE: Platform-specific test behavior (skip tests on Windows), CI detection,
//   parsing command-line arguments for custom test runners, tmpdir for test artifacts.
// ============================================================

const os = require("os");
const path = require("path");

// ============================================================
console.log("--- Example 1: process.argv — Command Line Arguments ---");
// ============================================================
// process.argv is an array:
//   [0] = path to node executable
//   [1] = path to the script being executed
//   [2+] = user-provided arguments

console.log("Full process.argv:");
process.argv.forEach((arg, index) => {
    console.log(`  argv[${index}]: ${arg}`);
});

// Practical: extract user arguments (skip first two)
const userArgs = process.argv.slice(2);
console.log("\nUser arguments:", userArgs);
console.log("Number of user args:", userArgs.length);
console.log("");

// Try running: node Extra_06_Process_and_OS.js --browser firefox --headless true

// ============================================================
console.log("--- Example 2: Parsing Command Line Arguments ---");
// ============================================================
// Simple key-value argument parser (no external packages needed)

function parseArgs(args) {
    const parsed = {};
    for (let i = 0; i < args.length; i++) {
        if (args[i].startsWith("--")) {
            const key = args[i].substring(2);
            // Check if next arg exists and is not another flag
            if (i + 1 < args.length && !args[i + 1].startsWith("--")) {
                parsed[key] = args[i + 1];
                i++; // skip the value
            } else {
                parsed[key] = true; // flag without value
            }
        } else if (args[i].startsWith("-")) {
            const key = args[i].substring(1);
            if (i + 1 < args.length && !args[i + 1].startsWith("-")) {
                parsed[key] = args[i + 1];
                i++;
            } else {
                parsed[key] = true;
            }
        }
    }
    return parsed;
}

// Demo with simulated arguments
const demoArgs = ["--browser", "firefox", "--headless", "--retries", "2", "--grep", "login"];
const parsedArgs = parseArgs(demoArgs);
console.log("Parsed demo args:", parsedArgs);
// { browser: 'firefox', headless: true, retries: '2', grep: 'login' }

// Parse actual command line arguments
if (userArgs.length > 0) {
    console.log("Parsed your arguments:", parseArgs(userArgs));
}

// Node.js 18.3+ has a built-in util.parseArgs:
//   const { parseArgs } = require('node:util');
//   const { values } = parseArgs({ args: process.argv.slice(2), options: { ... } });
console.log("");

// ============================================================
console.log("--- Example 3: process.cwd() — Current Working Directory ---");
// ============================================================
// cwd() returns the directory from which node was invoked.
// This is different from __dirname (which is the script's location).

console.log("Current working directory:", process.cwd());
console.log("Script directory (__dirname):", __dirname);
console.log("Same?", process.cwd() === __dirname);

// Practical difference:
//   $ cd /home/user && node /project/tests/test.js
//   process.cwd() => /home/user          (where you ran the command)
//   __dirname     => /project/tests       (where the script lives)
console.log("");

// ============================================================
console.log("--- Example 4: process.exit() and Exit Codes ---");
// ============================================================
// process.exit(code) terminates the process with an exit code.
//   0 = success, non-zero = failure
// We will NOT actually call it here (it would stop the script), but show the patterns.

console.log("Current exit code (default):", process.exitCode || 0);

// Pattern: Set exit code without immediately exiting
process.exitCode = 0; // success

// Common pattern in test runners:
//   if (failedTests > 0) {
//       process.exitCode = 1;  // signal failure to CI
//   }

// process.on('exit') runs just before the process exits
// (This handler will fire when the script naturally ends)
// Commenting out to avoid confusion at the end of this script:
// process.on('exit', (code) => {
//     console.log('Process exiting with code:', code);
// });

console.log("process.exit(0) = success, process.exit(1) = failure");
console.log("CI systems check exit codes to determine pass/fail");
console.log("");

// ============================================================
console.log("--- Example 5: process.platform — OS Detection ---");
// ============================================================
// process.platform returns a string: 'darwin' (macOS), 'linux', 'win32' (Windows)

console.log("Platform:", process.platform);

const platformNames = {
    darwin: "macOS",
    linux: "Linux",
    win32: "Windows",
    freebsd: "FreeBSD"
};
console.log("Friendly name:", platformNames[process.platform] || process.platform);

// Platform-specific logic
if (process.platform === "win32") {
    console.log("Windows-specific: Use backslash paths, different line endings");
} else if (process.platform === "darwin") {
    console.log("macOS-specific: WebKit is the native browser engine");
} else if (process.platform === "linux") {
    console.log("Linux-specific: Common for CI/CD, Docker containers");
}

// Playwright test example for platform-specific behavior:
//   test('copy to clipboard', async ({ page, browserName }) => {
//       const modifier = process.platform === 'darwin' ? 'Meta' : 'Control';
//       await page.keyboard.press(`${modifier}+C`);
//   });
console.log("");

// ============================================================
console.log("--- Example 6: os.platform(), os.arch(), os.type() ---");
// ============================================================
// os.platform() is the same as process.platform
// os.arch() returns CPU architecture: 'x64', 'arm64', etc.

console.log("os.platform():", os.platform());       // 'darwin', 'linux', 'win32'
console.log("os.arch():", os.arch());               // 'x64', 'arm64', 'arm'
console.log("os.type():", os.type());               // 'Darwin', 'Linux', 'Windows_NT'
console.log("os.release():", os.release());          // OS version string
console.log("os.version():", os.version());          // OS version info
console.log("Node version:", process.version);       // e.g., 'v18.17.0'
console.log("V8 version:", process.versions.v8);
console.log("");

// ============================================================
console.log("--- Example 7: os.homedir(), os.tmpdir() ---");
// ============================================================
// Common directories needed for test configuration.

console.log("Home directory:", os.homedir());
// macOS:   /Users/username
// Linux:   /home/username
// Windows: C:\Users\username

console.log("Temp directory:", os.tmpdir());
// macOS:   /var/folders/.../T  or /tmp
// Linux:   /tmp
// Windows: C:\Users\username\AppData\Local\Temp

// Practical: Create temp files for tests
const tempTestDir = path.join(os.tmpdir(), "playwright-tests-" + Date.now());
console.log("Temp test dir would be:", tempTestDir);

// Practical: Browser cache directories
const browserCacheDir = path.join(os.homedir(), ".cache", "ms-playwright");
console.log("Playwright browser cache:", browserCacheDir);
console.log("");

// ============================================================
console.log("--- Example 8: os.cpus() and os.totalmem() ---");
// ============================================================
// Useful for determining how many parallel workers to use.

const cpus = os.cpus();
console.log("CPU cores:", cpus.length);
console.log("CPU model:", cpus[0].model);

const totalMemGB = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2);
const freeMemGB = (os.freemem() / (1024 * 1024 * 1024)).toFixed(2);
console.log("Total memory:", totalMemGB, "GB");
console.log("Free memory:", freeMemGB, "GB");

// Playwright worker calculation based on system resources
const maxWorkers = Math.max(1, Math.floor(cpus.length / 2));
console.log("Recommended Playwright workers:", maxWorkers);
// In playwright.config.js:
//   workers: process.env.CI ? 2 : Math.floor(os.cpus().length / 2)
console.log("");

// ============================================================
console.log("--- Example 9: os.userInfo() and os.hostname() ---");
// ============================================================

const userInfo = os.userInfo();
console.log("Username:", userInfo.username);
console.log("Home dir:", userInfo.homedir);
console.log("Shell:", userInfo.shell || "N/A");
console.log("Hostname:", os.hostname());
console.log("");

// ============================================================
console.log("--- Example 10: process.memoryUsage() — Memory Diagnostics ---");
// ============================================================
// Useful for detecting memory leaks in long test suites.

const mem = process.memoryUsage();
console.log("Memory usage:");
console.log("  RSS (Resident Set Size):", (mem.rss / 1024 / 1024).toFixed(2), "MB");
console.log("  Heap Total:", (mem.heapTotal / 1024 / 1024).toFixed(2), "MB");
console.log("  Heap Used:", (mem.heapUsed / 1024 / 1024).toFixed(2), "MB");
console.log("  External:", (mem.external / 1024 / 1024).toFixed(2), "MB");

// PID (Process ID)
console.log("Process ID (PID):", process.pid);
console.log("Parent PID:", process.ppid);
console.log("");

// ============================================================
console.log("--- Example 11: CI Environment Detection ---");
// ============================================================
// Different CI systems set different environment variables.

function detectCI() {
    if (process.env.GITHUB_ACTIONS === "true") return "GitHub Actions";
    if (process.env.JENKINS_URL) return "Jenkins";
    if (process.env.GITLAB_CI === "true") return "GitLab CI";
    if (process.env.CIRCLECI === "true") return "CircleCI";
    if (process.env.TRAVIS === "true") return "Travis CI";
    if (process.env.BUILDKITE === "true") return "Buildkite";
    if (process.env.TF_BUILD === "True") return "Azure DevOps";
    if (process.env.CI === "true" || process.env.CI === "1") return "Generic CI";
    return null;
}

const ciSystem = detectCI();
if (ciSystem) {
    console.log("Running in CI:", ciSystem);
} else {
    console.log("Not running in CI (local development)");
}

// Common CI-aware configuration:
const isCI = Boolean(process.env.CI);
const testConfig = {
    retries: isCI ? 2 : 0,
    workers: isCI ? 2 : Math.max(1, Math.floor(os.cpus().length / 2)),
    reporter: isCI ? [["github"], ["html"]] : [["list"]],
    headless: isCI ? true : false,
    trace: isCI ? "on-first-retry" : "off"
};
console.log("CI-aware test config:", testConfig);
console.log("");

// ============================================================
console.log("--- Example 12: process.hrtime.bigint() — High Resolution Timer ---");
// ============================================================
// More precise than Date.now(). Useful for performance measurements.

const startTime = process.hrtime.bigint();  // nanoseconds

// Simulate some work
let sum = 0;
for (let i = 0; i < 1000000; i++) {
    sum += i;
}

const endTime = process.hrtime.bigint();
const durationNs = endTime - startTime;
const durationMs = Number(durationNs) / 1_000_000;

console.log("Loop result:", sum);
console.log("Duration:", durationMs.toFixed(3), "ms");
console.log("Duration:", durationNs.toString(), "nanoseconds");
console.log("");

// Also available: process.hrtime() which returns [seconds, nanoseconds]
const hrStart = process.hrtime();
// ... some work ...
const hrEnd = process.hrtime(hrStart);
console.log("hrtime format: %d seconds and %d nanoseconds", hrEnd[0], hrEnd[1]);
console.log("");

// === KEY TAKEAWAYS ===
console.log("=== KEY TAKEAWAYS ===");
console.log("1. process.argv contains command-line arguments; slice(2) for user args");
console.log("2. process.cwd() = where node was invoked; __dirname = where script lives");
console.log("3. process.platform returns 'darwin', 'linux', or 'win32'");
console.log("4. process.exit(code) exits with 0=success or non-zero=failure");
console.log("5. os.homedir() and os.tmpdir() for common system directories");
console.log("6. os.cpus().length helps determine optimal parallel worker count");
console.log("7. CI detection uses environment variables (CI, GITHUB_ACTIONS, etc.)");
console.log("8. Java equivalents: System.getProperty('os.name'), Runtime.getRuntime().availableProcessors()");
