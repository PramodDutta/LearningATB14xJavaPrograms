// Extra_02_FS_WriteFile.js
// Topic: File System - Writing Files - Part 2 of 6
// Extends: ex_33 (Node.js Built-in Modules)
//
// CONCEPT: Node.js 'fs' module provides writeFileSync for creating/overwriting files and
// appendFileSync for adding content to existing files. These are essential for saving test
// results, logs, and generated data. Writing JSON with JSON.stringify is a common pattern.
// JAVA COMPARISON: Similar to Files.writeString(), FileWriter, BufferedWriter, or PrintWriter.
//   Java's FileWriter(path, true) for append mode maps to Node's appendFileSync.
// PLAYWRIGHT RELEVANCE: Writing test results, creating custom reporter output, saving
//   screenshots/downloads, generating test data files, writing storageState for auth reuse.
// ============================================================

const fs = require("fs");
const path = require("path");
const os = require("os");

// Setup temp directory
const tempDir = path.join(os.tmpdir(), "js_exercise_fs_write");
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

// ============================================================
console.log("--- Example 1: fs.writeFileSync — Write a Text File ---");
// ============================================================
// writeFileSync(path, data, encoding) creates or overwrites a file.
// If the file exists, its contents are completely replaced.

const textFilePath = path.join(tempDir, "output.txt");
fs.writeFileSync(textFilePath, "This is the first line.\nThis is the second line.\n", "utf8");

console.log("File written to:", textFilePath);
console.log("Contents:", fs.readFileSync(textFilePath, "utf8"));

// Overwriting — the old content is gone
fs.writeFileSync(textFilePath, "This line replaced everything.\n", "utf8");
console.log("After overwrite:", fs.readFileSync(textFilePath, "utf8"));
console.log("");

// ============================================================
console.log("--- Example 2: fs.appendFileSync — Append to a File ---");
// ============================================================
// appendFileSync adds content to the end of a file without erasing existing content.
// If the file does not exist, it creates it.

const logFilePath = path.join(tempDir, "test-log.txt");
fs.writeFileSync(logFilePath, "=== Test Run Started ===\n");

fs.appendFileSync(logFilePath, "[PASS] Login test completed\n");
fs.appendFileSync(logFilePath, "[PASS] Dashboard loads correctly\n");
fs.appendFileSync(logFilePath, "[FAIL] Search returns wrong results\n");
fs.appendFileSync(logFilePath, "=== Test Run Ended ===\n");

console.log("Log file contents:");
console.log(fs.readFileSync(logFilePath, "utf8"));

// ============================================================
console.log("--- Example 3: Writing JSON with JSON.stringify ---");
// ============================================================
// JSON.stringify(obj, replacer, spaces) converts an object to a JSON string.
// The third argument (spaces) makes it human-readable (pretty-printed).

const testResults = {
    suite: "Login Tests",
    timestamp: new Date().toISOString(),
    duration: 4523,
    tests: [
        { name: "Valid login", status: "passed", duration: 1200 },
        { name: "Invalid password", status: "passed", duration: 890 },
        { name: "Empty fields", status: "failed", duration: 2433, error: "Timeout waiting for error message" }
    ],
    summary: { total: 3, passed: 2, failed: 1, skipped: 0 }
};

const jsonFilePath = path.join(tempDir, "test-results.json");

// Pretty-printed (2-space indent) — good for human readability
fs.writeFileSync(jsonFilePath, JSON.stringify(testResults, null, 2));
console.log("JSON file written to:", jsonFilePath);
console.log("File size:", fs.statSync(jsonFilePath).size, "bytes");

// Read it back to verify
const readBack = JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));
console.log("Read back - Suite:", readBack.suite);
console.log("Read back - Summary:", readBack.summary);
console.log("");

// Compact JSON (no formatting) — smaller file size
const compactPath = path.join(tempDir, "results-compact.json");
fs.writeFileSync(compactPath, JSON.stringify(testResults));
console.log("Pretty size:", fs.statSync(jsonFilePath).size, "bytes");
console.log("Compact size:", fs.statSync(compactPath).size, "bytes");
console.log("");

// ============================================================
console.log("--- Example 4: Writing with Different Encodings ---");
// ============================================================
// Default encoding is 'utf8'. You can also write binary data using Buffers.

// UTF-8 text (default)
const utf8Path = path.join(tempDir, "utf8-text.txt");
fs.writeFileSync(utf8Path, "Hello, World! Special chars: cafe\u0301, nai\u0308ve, resume\u0301");
console.log("UTF-8 file:", fs.readFileSync(utf8Path, "utf8"));

// Writing a Buffer (binary data)
const bufferPath = path.join(tempDir, "binary-data.bin");
const buffer = Buffer.from([0x48, 0x65, 0x6c, 0x6c, 0x6f]); // "Hello" in ASCII
fs.writeFileSync(bufferPath, buffer);
console.log("Buffer file contents:", fs.readFileSync(bufferPath, "utf8"));
console.log("");

// ============================================================
console.log("--- Example 5: Building a Simple Test Results Writer ---");
// ============================================================
// Pattern: Accumulate results, then write a summary file

class TestResultsWriter {
    constructor(outputPath) {
        this.outputPath = outputPath;
        this.results = [];
        this.startTime = Date.now();
    }

    addResult(testName, status, durationMs, errorMessage) {
        this.results.push({
            test: testName,
            status: status,
            duration: durationMs,
            error: errorMessage || null,
            timestamp: new Date().toISOString()
        });
    }

    writeReport() {
        const report = {
            runDate: new Date().toISOString(),
            totalDuration: Date.now() - this.startTime,
            summary: {
                total: this.results.length,
                passed: this.results.filter((r) => r.status === "passed").length,
                failed: this.results.filter((r) => r.status === "failed").length,
                skipped: this.results.filter((r) => r.status === "skipped").length
            },
            tests: this.results
        };

        fs.writeFileSync(this.outputPath, JSON.stringify(report, null, 2));
        return report;
    }
}

const writer = new TestResultsWriter(path.join(tempDir, "full-report.json"));
writer.addResult("Homepage loads", "passed", 520);
writer.addResult("Login with valid creds", "passed", 1100);
writer.addResult("Add to cart", "failed", 3000, "Element not found: #add-btn");
writer.addResult("Checkout flow", "skipped", 0);

const report = writer.writeReport();
console.log("Report summary:", report.summary);
console.log("Report written to:", writer.outputPath);
console.log("");

// ============================================================
console.log("--- Example 6: Appending to a CSV File (Data Logging) ---");
// ============================================================
// Pattern: Write CSV header once, then append rows as tests complete

const csvPath = path.join(tempDir, "performance-log.csv");

// Write header
fs.writeFileSync(csvPath, "timestamp,page,loadTimeMs,status\n");

// Append rows (simulating multiple test runs)
const performanceData = [
    { page: "/home", loadTime: 450, status: "ok" },
    { page: "/products", loadTime: 1200, status: "ok" },
    { page: "/checkout", loadTime: 3500, status: "slow" },
    { page: "/profile", loadTime: 800, status: "ok" }
];

performanceData.forEach((entry) => {
    const row = `${new Date().toISOString()},${entry.page},${entry.loadTime},${entry.status}\n`;
    fs.appendFileSync(csvPath, row);
});

console.log("CSV contents:");
console.log(fs.readFileSync(csvPath, "utf8"));

// ============================================================
console.log("--- Example 7: Safe Write — Check Before Overwriting ---");
// ============================================================
// Sometimes you do not want to overwrite an existing file accidentally.

function safeWriteFile(filePath, content, overwrite = false) {
    if (fs.existsSync(filePath) && !overwrite) {
        console.log(`  File already exists (not overwriting): ${path.basename(filePath)}`);
        return false;
    }
    fs.writeFileSync(filePath, content);
    console.log(`  File written: ${path.basename(filePath)}`);
    return true;
}

const safePath = path.join(tempDir, "important-data.txt");
safeWriteFile(safePath, "Original content");          // writes
safeWriteFile(safePath, "New content");               // skipped — file exists
safeWriteFile(safePath, "New content", true);         // overwrites because overwrite=true
console.log("Final content:", fs.readFileSync(safePath, "utf8"));
console.log("");

// ============================================================
console.log("--- Example 8: Error Handling for Write Operations ---");
// ============================================================

// Trying to write to a nonexistent directory
try {
    fs.writeFileSync("/nonexistent/deep/path/file.txt", "data");
} catch (error) {
    console.log("Write error code:", error.code);   // ENOENT — parent directory missing
    console.log("Write error (short):", error.message.substring(0, 70) + "...");
}

// Trying to write to a directory path (not a file)
try {
    fs.writeFileSync(tempDir, "data");  // tempDir is a directory, not a file
} catch (error) {
    console.log("Write-to-dir error code:", error.code);  // EISDIR
    console.log("Write-to-dir error (short):", error.message.substring(0, 70) + "...");
}
console.log("");

// --- Cleanup ---
fs.rmSync(tempDir, { recursive: true, force: true });
console.log("Temp directory cleaned up.");
console.log("");

// === KEY TAKEAWAYS ===
console.log("=== KEY TAKEAWAYS ===");
console.log("1. fs.writeFileSync(path, data) creates or OVERWRITES a file");
console.log("2. fs.appendFileSync(path, data) adds to the end without erasing");
console.log("3. JSON.stringify(obj, null, 2) creates pretty-printed JSON for files");
console.log("4. JSON.stringify(obj) creates compact JSON (smaller file size)");
console.log("5. Always check fs.existsSync() if you want to avoid accidental overwrites");
console.log("6. Parent directories must exist — use mkdirSync with { recursive: true } first");
console.log("7. Java equivalent: Files.writeString(path, content) or new FileWriter(path)");
console.log("8. Playwright uses writes for: test results, screenshots, storageState, custom reporters");
