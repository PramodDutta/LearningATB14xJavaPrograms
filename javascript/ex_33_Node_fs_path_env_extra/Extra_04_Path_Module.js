// Extra_04_Path_Module.js
// Topic: Path Module - Platform-Safe File Paths - Part 4 of 6
// Extends: ex_33 (Node.js Built-in Modules)
//
// CONCEPT: The 'path' module provides utilities for working with file and directory paths
// in a platform-independent way. On Windows, paths use backslashes (\); on macOS/Linux,
// forward slashes (/). The path module handles this automatically, making your code portable.
// JAVA COMPARISON: Similar to java.nio.file.Path, Paths.get(), Path.resolve(), Path.getFileName(),
//   Path.getParent(). Java's Path.of("a", "b", "c") maps to path.join("a", "b", "c").
// PLAYWRIGHT RELEVANCE: Building cross-platform paths for screenshots, downloads, config files.
//   Playwright tests must work on Windows CI, macOS dev machines, and Linux Docker containers.
// ============================================================

const path = require("path");

// ============================================================
console.log("--- Example 1: path.join() — Combine Path Segments ---");
// ============================================================
// path.join() concatenates segments using the platform's separator.
// It also normalizes the result (removes redundant separators, resolves '..' and '.').

const screenshotPath = path.join("test-results", "screenshots", "login", "step1.png");
console.log("Joined path:", screenshotPath);
// macOS/Linux: test-results/screenshots/login/step1.png
// Windows:     test-results\screenshots\login\step1.png

// join normalizes redundant separators and dots
console.log("Normalized:", path.join("test-results", ".", "screenshots", "..", "videos", "test.mp4"));
// Result: test-results/videos/test.mp4  (the '..' cancels out 'screenshots')

// Multiple segments
console.log("Multi-segment:", path.join("project", "tests", "e2e", "login.spec.js"));

// WRONG way (hard-coded separator — breaks on Windows):
//   const bad = "test-results" + "/" + "screenshots";  // DON'T DO THIS
// RIGHT way:
//   const good = path.join("test-results", "screenshots");  // DO THIS
console.log("");

// ============================================================
console.log("--- Example 2: path.resolve() — Get Absolute Path ---");
// ============================================================
// path.resolve() converts a relative path to an absolute path.
// It resolves from right to left, treating each segment as a cd command.
// If no absolute path is encountered, it prepends the current working directory.

console.log("Resolve relative:", path.resolve("test-results", "report.html"));
// Output: /full/path/to/cwd/test-results/report.html

console.log("Resolve absolute:", path.resolve("/tmp", "tests", "data.json"));
// Output: /tmp/tests/data.json  (starts from /tmp since it is absolute)

console.log("Resolve mixed:", path.resolve("/tmp", "tests", "../config", "settings.json"));
// Output: /tmp/config/settings.json  (.. goes up from tests)

// resolve() with no arguments returns the current working directory
console.log("Resolve cwd:", path.resolve());
console.log("");

// ============================================================
console.log("--- Example 3: path.basename() — Get Filename ---");
// ============================================================
// basename() extracts the last portion of a path (the filename).
// Optional second argument removes the file extension.

console.log("Basename:", path.basename("/home/user/tests/login.spec.js"));
// Output: login.spec.js

console.log("Without ext:", path.basename("/home/user/tests/login.spec.js", ".js"));
// Output: login.spec

console.log("Basename of dir:", path.basename("/home/user/tests/"));
// Output: tests

// Practical: extract test name from file path
const testFile = "/project/tests/e2e/checkout.spec.ts";
const testName = path.basename(testFile, ".spec.ts");
console.log("Test name from path:", testName);  // "checkout"
console.log("");

// ============================================================
console.log("--- Example 4: path.dirname() — Get Parent Directory ---");
// ============================================================
// dirname() returns everything except the last segment (the parent directory).

console.log("Dirname:", path.dirname("/home/user/tests/login.spec.js"));
// Output: /home/user/tests

console.log("Dirname of dir:", path.dirname("/home/user/tests/"));
// Output: /home/user

// Practical: find the directory containing a test file
const specFile = "/project/tests/e2e/login.spec.ts";
const testDir = path.dirname(specFile);
const screenshotDir = path.join(testDir, "screenshots");
console.log("Test dir:", testDir);
console.log("Screenshot dir:", screenshotDir);
console.log("");

// ============================================================
console.log("--- Example 5: path.extname() — Get File Extension ---");
// ============================================================
// extname() returns the extension including the dot.

console.log("Extension of .js:", path.extname("test.spec.js"));         // .js
console.log("Extension of .ts:", path.extname("login.spec.ts"));        // .ts
console.log("Extension of .json:", path.extname("config.json"));        // .json
console.log("Extension of .png:", path.extname("screenshot.png"));      // .png
console.log("No extension:", path.extname("Makefile"));                 // '' (empty string)
console.log("Dotfile:", path.extname(".env"));                          // '' (empty string)
console.log("Double ext:", path.extname("archive.tar.gz"));             // .gz

// Practical: filter files by type
const files = ["test1.spec.js", "test2.spec.ts", "data.json", "screenshot.png", "README.md"];
const testFiles = files.filter((f) => [".js", ".ts"].includes(path.extname(f)));
console.log("Test files only:", testFiles);
console.log("");

// ============================================================
console.log("--- Example 6: path.parse() — Decompose a Path ---");
// ============================================================
// parse() breaks a path into an object with root, dir, base, ext, and name.

const parsed = path.parse("/home/user/project/tests/login.spec.ts");
console.log("Parsed path:", parsed);
// Output:
// {
//   root: '/',
//   dir: '/home/user/project/tests',
//   base: 'login.spec.ts',
//   ext: '.ts',
//   name: 'login.spec'
// }

console.log("  root:", parsed.root);   // '/'
console.log("  dir:", parsed.dir);     // '/home/user/project/tests'
console.log("  base:", parsed.base);   // 'login.spec.ts'
console.log("  name:", parsed.name);   // 'login.spec'
console.log("  ext:", parsed.ext);     // '.ts'

// path.format() is the reverse — object back to string
const formatted = path.format({
    dir: "/project/tests",
    name: "checkout.spec",
    ext: ".ts"
});
console.log("Formatted:", formatted);  // /project/tests/checkout.spec.ts
console.log("");

// ============================================================
console.log("--- Example 7: __dirname and __filename ---");
// ============================================================
// __filename — absolute path to the current file
// __dirname  — absolute path to the directory containing the current file
// These are available in CommonJS modules (require), NOT in ES modules (import).

console.log("__filename:", __filename);
console.log("__dirname:", __dirname);

// Practical: reference files relative to the script location
// This is critical because process.cwd() depends on WHERE you run node,
// but __dirname always points to the script's actual location.

const dataFile = path.join(__dirname, "testdata", "users.json");
console.log("Data file relative to script:", dataFile);

const configFile = path.join(__dirname, "..", "playwright.config.js");
console.log("Config relative to script:", configFile);
console.log("");

// In ES modules (import/export), __dirname is not available. Use:
//   import { fileURLToPath } from 'url';
//   import { dirname } from 'path';
//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = dirname(__filename);

// ============================================================
console.log("--- Example 8: path.relative() — Relative Path Between Two Points ---");
// ============================================================
// relative(from, to) calculates the relative path from one location to another.

console.log("Relative:", path.relative("/home/user/project/tests", "/home/user/project/data"));
// Output: ../data

console.log("Relative:", path.relative("/home/user/tests", "/home/user/tests/e2e/login.spec.ts"));
// Output: e2e/login.spec.ts

// Practical: show shorter paths in test reports
const projectRoot = "/home/user/my-project";
const fullScreenshotPath = "/home/user/my-project/test-results/screenshots/login.png";
console.log("Short path:", path.relative(projectRoot, fullScreenshotPath));
// Output: test-results/screenshots/login.png
console.log("");

// ============================================================
console.log("--- Example 9: path.sep and path.delimiter ---");
// ============================================================
// path.sep — the platform path separator ('/' on POSIX, '\\' on Windows)
// path.delimiter — the PATH environment variable delimiter (':' on POSIX, ';' on Windows)

console.log("Path separator:", JSON.stringify(path.sep));
console.log("PATH delimiter:", JSON.stringify(path.delimiter));

// Practical: split the system PATH
const systemPath = process.env.PATH || "";
const pathDirs = systemPath.split(path.delimiter);
console.log("Number of directories in PATH:", pathDirs.length);
console.log("First 3 PATH entries:");
pathDirs.slice(0, 3).forEach((dir) => console.log("  ", dir));
console.log("");

// ============================================================
console.log("--- Example 10: path.isAbsolute() ---");
// ============================================================

console.log("Is '/home/user' absolute?", path.isAbsolute("/home/user"));               // true
console.log("Is 'tests/login.spec.js' absolute?", path.isAbsolute("tests/login.spec.js")); // false
console.log("Is './relative' absolute?", path.isAbsolute("./relative"));                // false
console.log("Is '' absolute?", path.isAbsolute(""));                                    // false
console.log("");

// ============================================================
console.log("--- Example 11: Practical Playwright Path Patterns ---");
// ============================================================

// Pattern 1: Screenshot path based on test name
function getScreenshotPath(testName, step) {
    const safeName = testName.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
    return path.join("test-results", "screenshots", safeName, `${step}.png`);
}
console.log("Screenshot:", getScreenshotPath("Login Page Test", "after-click"));

// Pattern 2: Download path
function getDownloadPath(filename) {
    return path.resolve("test-results", "downloads", filename);
}
console.log("Download (absolute):", getDownloadPath("report.pdf"));

// Pattern 3: Config file resolution
function resolveConfig(configName) {
    // Check current dir first, then project root
    const localConfig = path.resolve(configName);
    const rootConfig = path.resolve(__dirname, "..", configName);
    return { local: localConfig, root: rootConfig };
}
const configs = resolveConfig("playwright.config.ts");
console.log("Local config:", configs.local);
console.log("Root config:", configs.root);
console.log("");

// === KEY TAKEAWAYS ===
console.log("=== KEY TAKEAWAYS ===");
console.log("1. path.join('a', 'b', 'c') builds platform-safe paths (use instead of string concat)");
console.log("2. path.resolve() converts relative paths to absolute paths");
console.log("3. path.basename() gets filename, path.dirname() gets parent directory");
console.log("4. path.extname() gets file extension, path.parse() decomposes entire path");
console.log("5. __dirname and __filename give the script's actual location (CommonJS only)");
console.log("6. path.relative(from, to) calculates relative path between two locations");
console.log("7. Java equivalent: Path.of(), Path.resolve(), Path.getFileName(), Path.getParent()");
console.log("8. Always use path.join/resolve in Playwright for cross-platform compatibility");
