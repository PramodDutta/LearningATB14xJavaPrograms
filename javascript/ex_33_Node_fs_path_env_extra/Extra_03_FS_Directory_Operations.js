// Extra_03_FS_Directory_Operations.js
// Topic: File System - Directory Operations - Part 3 of 6
// Extends: ex_33 (Node.js Built-in Modules)
//
// CONCEPT: Node.js 'fs' module provides methods for creating, reading, inspecting, and
// removing directories. These are essential for organizing test artifacts like screenshots,
// videos, and reports into structured folder hierarchies during test execution.
// JAVA COMPARISON: Similar to Files.createDirectories(), Files.list(), Files.walk(),
//   File.isDirectory(), File.delete(). Java's NIO Path + Files API is the closest match.
// PLAYWRIGHT RELEVANCE: Creating screenshot/video directories, organizing test artifacts
//   by test name, cleaning up old test results, listing downloaded files.
// ============================================================

const fs = require("fs");
const path = require("path");
const os = require("os");

const baseTemp = path.join(os.tmpdir(), "js_exercise_fs_dirs");

// Clean start
if (fs.existsSync(baseTemp)) {
    fs.rmSync(baseTemp, { recursive: true, force: true });
}

// ============================================================
console.log("--- Example 1: fs.mkdirSync — Create Directories ---");
// ============================================================
// mkdirSync(path) creates a single directory.
// mkdirSync(path, { recursive: true }) creates all missing parent directories.

// Single directory
fs.mkdirSync(baseTemp);
console.log("Created base directory:", baseTemp);

// This would FAIL because the parent 'screenshots' does not exist yet:
//   fs.mkdirSync(path.join(baseTemp, 'screenshots', 'login'));  // ERROR!

// With { recursive: true } — creates the entire chain
fs.mkdirSync(path.join(baseTemp, "screenshots", "login"), { recursive: true });
fs.mkdirSync(path.join(baseTemp, "screenshots", "dashboard"), { recursive: true });
fs.mkdirSync(path.join(baseTemp, "videos"), { recursive: true });
fs.mkdirSync(path.join(baseTemp, "reports", "html"), { recursive: true });
fs.mkdirSync(path.join(baseTemp, "reports", "json"), { recursive: true });
fs.mkdirSync(path.join(baseTemp, "downloads"), { recursive: true });

// recursive: true is safe to call even if the directory already exists
fs.mkdirSync(path.join(baseTemp, "screenshots"), { recursive: true }); // no error
console.log("All directories created successfully");
console.log("");

// ============================================================
console.log("--- Example 2: fs.readdirSync — List Directory Contents ---");
// ============================================================
// readdirSync(path) returns an array of filenames (strings) in the directory.

// First, create some files to list
fs.writeFileSync(path.join(baseTemp, "screenshots", "login", "step1.png"), "fake-image-data");
fs.writeFileSync(path.join(baseTemp, "screenshots", "login", "step2.png"), "fake-image-data");
fs.writeFileSync(path.join(baseTemp, "screenshots", "login", "error.png"), "fake-image-data");
fs.writeFileSync(path.join(baseTemp, "reports", "summary.txt"), "Test summary");
fs.writeFileSync(path.join(baseTemp, "reports", "results.json"), '{"passed": 5}');

// List top-level contents
const topLevel = fs.readdirSync(baseTemp);
console.log("Top-level contents:", topLevel);
// Output: [ 'downloads', 'reports', 'screenshots', 'videos' ]

// List screenshots/login
const loginScreenshots = fs.readdirSync(path.join(baseTemp, "screenshots", "login"));
console.log("Login screenshots:", loginScreenshots);
// Output: [ 'error.png', 'step1.png', 'step2.png' ]

// List with withFileTypes option — returns Dirent objects with isFile()/isDirectory()
const reportsContents = fs.readdirSync(path.join(baseTemp, "reports"), { withFileTypes: true });
reportsContents.forEach((entry) => {
    const type = entry.isDirectory() ? "DIR " : "FILE";
    console.log(`  ${type}: ${entry.name}`);
});
console.log("");

// ============================================================
console.log("--- Example 3: fs.existsSync — Check If Path Exists ---");
// ============================================================
// Returns true for both files and directories. Does not throw errors.

console.log("screenshots dir exists?", fs.existsSync(path.join(baseTemp, "screenshots")));   // true
console.log("videos dir exists?", fs.existsSync(path.join(baseTemp, "videos")));             // true
console.log("traces dir exists?", fs.existsSync(path.join(baseTemp, "traces")));             // false
console.log("summary.txt exists?", fs.existsSync(path.join(baseTemp, "reports", "summary.txt"))); // true

// Common pattern: create directory only if it does not exist
const traceDir = path.join(baseTemp, "traces");
if (!fs.existsSync(traceDir)) {
    fs.mkdirSync(traceDir, { recursive: true });
    console.log("Created traces directory (it was missing)");
}
console.log("");

// ============================================================
console.log("--- Example 4: fs.statSync — Get File/Directory Info ---");
// ============================================================
// statSync returns an object with metadata: size, dates, type checks

const fileStat = fs.statSync(path.join(baseTemp, "screenshots", "login", "step1.png"));
console.log("File stats for step1.png:");
console.log("  Is file?", fileStat.isFile());           // true
console.log("  Is directory?", fileStat.isDirectory());  // false
console.log("  Size (bytes):", fileStat.size);
console.log("  Created:", fileStat.birthtime.toISOString());
console.log("  Modified:", fileStat.mtime.toISOString());

const dirStat = fs.statSync(path.join(baseTemp, "screenshots"));
console.log("\nDirectory stats for screenshots/:");
console.log("  Is file?", dirStat.isFile());             // false
console.log("  Is directory?", dirStat.isDirectory());    // true
console.log("");

// ============================================================
console.log("--- Example 5: Recursive Directory Listing (Walk) ---");
// ============================================================
// Node.js does not have a built-in 'walk' like Python's os.walk or Java's Files.walk.
// We build one using recursion.

function walkDirectory(dirPath, indent = "") {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
            console.log(`${indent}[DIR]  ${entry.name}/`);
            walkDirectory(fullPath, indent + "  ");
        } else {
            const size = fs.statSync(fullPath).size;
            console.log(`${indent}[FILE] ${entry.name} (${size} bytes)`);
        }
    }
}

console.log("Directory tree of temp folder:");
walkDirectory(baseTemp);
console.log("");

// ============================================================
console.log("--- Example 6: Filtering Files by Extension ---");
// ============================================================
// Common pattern: find all .png files, all .json files, etc.

function findFilesByExtension(dirPath, extension) {
    const results = [];

    function search(currentDir) {
        const entries = fs.readdirSync(currentDir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);
            if (entry.isDirectory()) {
                search(fullPath);
            } else if (entry.name.endsWith(extension)) {
                results.push(fullPath);
            }
        }
    }

    search(dirPath);
    return results;
}

const pngFiles = findFilesByExtension(baseTemp, ".png");
console.log("All .png files found:");
pngFiles.forEach((f) => console.log("  ", path.relative(baseTemp, f)));

const jsonFiles = findFilesByExtension(baseTemp, ".json");
console.log("All .json files found:");
jsonFiles.forEach((f) => console.log("  ", path.relative(baseTemp, f)));
console.log("");

// ============================================================
console.log("--- Example 7: Playwright Artifact Organization Pattern ---");
// ============================================================
// Playwright stores artifacts in a structured directory. Here is a common pattern.

function createTestArtifactDir(testName, baseDir) {
    // Sanitize test name for use as directory name
    const safeName = testName
        .replace(/[^a-zA-Z0-9-_]/g, "-")
        .replace(/-+/g, "-")
        .toLowerCase();

    const artifactDir = path.join(baseDir, safeName);
    fs.mkdirSync(artifactDir, { recursive: true });

    return {
        screenshotDir: path.join(artifactDir, "screenshots"),
        videoDir: path.join(artifactDir, "videos"),
        traceDir: path.join(artifactDir, "traces"),
        init() {
            fs.mkdirSync(this.screenshotDir, { recursive: true });
            fs.mkdirSync(this.videoDir, { recursive: true });
            fs.mkdirSync(this.traceDir, { recursive: true });
            return this;
        }
    };
}

const artifactBase = path.join(baseTemp, "test-results");
const artifact1 = createTestArtifactDir("Login Page - Valid Credentials", artifactBase).init();
const artifact2 = createTestArtifactDir("Search Feature > Filter by Price", artifactBase).init();

console.log("Artifact dir 1:", path.relative(baseTemp, artifact1.screenshotDir));
console.log("Artifact dir 2:", path.relative(baseTemp, artifact2.screenshotDir));

// Simulate saving a screenshot
fs.writeFileSync(path.join(artifact1.screenshotDir, "after-login.png"), "fake-png-data");
console.log("Screenshot saved to artifact directory");
console.log("");

// ============================================================
console.log("--- Example 8: fs.rmSync — Remove Files and Directories ---");
// ============================================================
// rmSync removes files or directories. { recursive: true } for non-empty dirs.
// { force: true } suppresses errors if the path does not exist.

// Remove a single file
const tempFile = path.join(baseTemp, "temp-to-delete.txt");
fs.writeFileSync(tempFile, "delete me");
console.log("File exists before delete?", fs.existsSync(tempFile));  // true
fs.rmSync(tempFile);
console.log("File exists after delete?", fs.existsSync(tempFile));   // false

// Remove a directory with contents (must use recursive)
const dirToDelete = path.join(baseTemp, "downloads");
fs.writeFileSync(path.join(dirToDelete, "file1.pdf"), "data");
fs.writeFileSync(path.join(dirToDelete, "file2.pdf"), "data");
console.log("Dir exists before delete?", fs.existsSync(dirToDelete));  // true
fs.rmSync(dirToDelete, { recursive: true });
console.log("Dir exists after delete?", fs.existsSync(dirToDelete));   // false

// force: true — no error even if path does not exist
fs.rmSync(path.join(baseTemp, "nonexistent-dir"), { recursive: true, force: true });
console.log("No error with force: true on nonexistent path");
console.log("");

// ============================================================
console.log("--- Example 9: Copy and Rename (fs.copyFileSync, fs.renameSync) ---");
// ============================================================

const srcFile = path.join(baseTemp, "source.txt");
const copyFile = path.join(baseTemp, "copy.txt");
const renamedFile = path.join(baseTemp, "renamed.txt");

fs.writeFileSync(srcFile, "Original content for copy test");

// Copy a file
fs.copyFileSync(srcFile, copyFile);
console.log("Copied file contents:", fs.readFileSync(copyFile, "utf8"));

// Rename/move a file
fs.renameSync(copyFile, renamedFile);
console.log("copy.txt exists after rename?", fs.existsSync(copyFile));     // false
console.log("renamed.txt exists?", fs.existsSync(renamedFile));            // true
console.log("renamed.txt contents:", fs.readFileSync(renamedFile, "utf8"));
console.log("");

// --- Full Cleanup ---
fs.rmSync(baseTemp, { recursive: true, force: true });
console.log("All temp directories cleaned up.");
console.log("");

// === KEY TAKEAWAYS ===
console.log("=== KEY TAKEAWAYS ===");
console.log("1. fs.mkdirSync(path, { recursive: true }) creates entire directory chains safely");
console.log("2. fs.readdirSync(path) lists directory contents as string array");
console.log("3. fs.readdirSync(path, { withFileTypes: true }) returns Dirent objects (isFile/isDirectory)");
console.log("4. fs.statSync(path) returns metadata: size, dates, isFile(), isDirectory()");
console.log("5. fs.rmSync(path, { recursive: true, force: true }) safely removes dirs and files");
console.log("6. fs.copyFileSync(src, dest) copies files; fs.renameSync(old, new) moves/renames");
console.log("7. Java equivalent: Files.createDirectories(), Files.list(), Files.walk(), Files.delete()");
console.log("8. Playwright: test-results/ directory structure for screenshots, videos, traces");
