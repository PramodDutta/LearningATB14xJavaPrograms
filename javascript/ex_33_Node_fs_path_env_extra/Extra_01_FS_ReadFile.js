// Extra_01_FS_ReadFile.js
// Topic: File System - Reading Files - Part 1 of 6
// Extends: ex_33 (Node.js Built-in Modules)
//
// CONCEPT: Node.js provides the 'fs' module for file system operations. Reading files
// is one of the most fundamental operations. There are synchronous methods (block execution
// until complete) and asynchronous methods (non-blocking, use callbacks or promises).
// JAVA COMPARISON: Similar to Java's Files.readString(), BufferedReader, or FileInputStream.
//   Java also has sync I/O by default and async via NIO (java.nio.file).
// PLAYWRIGHT RELEVANCE: Loading test data from JSON/CSV files, reading configuration files,
//   verifying downloaded file contents, loading authentication state from storageState.json.
// ============================================================

const fs = require("fs");
const path = require("path");
const os = require("os");

// We will create temp files in the OS temp directory so this script is self-contained
const tempDir = path.join(os.tmpdir(), "js_exercise_fs_read");

// --- Setup: Create temp files to read ---
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

// Create a plain text file
const textFilePath = path.join(tempDir, "sample.txt");
fs.writeFileSync(textFilePath, "Hello from Node.js!\nThis is line 2.\nThis is line 3.\n");

// Create a JSON file (simulating test data)
const jsonFilePath = path.join(tempDir, "testdata.json");
const testData = {
    users: [
        { username: "admin", password: "admin123", role: "admin" },
        { username: "viewer", password: "view456", role: "readonly" }
    ],
    baseUrl: "https://example.com"
};
fs.writeFileSync(jsonFilePath, JSON.stringify(testData, null, 2));

// Create a CSV file (simulating test data)
const csvFilePath = path.join(tempDir, "users.csv");
fs.writeFileSync(csvFilePath, "name,email,age\nAlice,alice@test.com,30\nBob,bob@test.com,25\nCharlie,charlie@test.com,35\n");

console.log("Temp files created in:", tempDir);
console.log("");

// ============================================================
console.log("--- Example 1: fs.readFileSync — Read Entire Text File ---");
// ============================================================
// readFileSync(path, encoding) reads the entire file into a string.
// The 'utf8' encoding returns a string. Without encoding, you get a Buffer (raw bytes).

const textContent = fs.readFileSync(textFilePath, "utf8");
console.log("File contents:");
console.log(textContent);
// Output:
//   Hello from Node.js!
//   This is line 2.
//   This is line 3.

// Without encoding — returns a Buffer object
const bufferContent = fs.readFileSync(textFilePath);
console.log("Type without encoding:", typeof bufferContent, "->", bufferContent.constructor.name);
console.log("Buffer contents:", bufferContent);
console.log("Buffer to string:", bufferContent.toString("utf8").trim());
console.log("");

// ============================================================
console.log("--- Example 2: Reading and Parsing JSON Files ---");
// ============================================================
// This is the most common pattern in Playwright: loading test data from JSON

const rawJson = fs.readFileSync(jsonFilePath, "utf8");
const parsed = JSON.parse(rawJson);

console.log("Parsed JSON object:", parsed);
console.log("First user:", parsed.users[0].username);
console.log("Base URL:", parsed.baseUrl);
console.log("");

// Practical Playwright pattern: loading test credentials
// In actual Playwright:
//   const testData = JSON.parse(fs.readFileSync('./testdata/users.json', 'utf8'));
//   await page.fill('#username', testData.users[0].username);

// ============================================================
console.log("--- Example 3: Reading a CSV File and Parsing Lines ---");
// ============================================================
// Useful for data-driven testing — read CSV rows as test parameters

const csvRaw = fs.readFileSync(csvFilePath, "utf8");
const lines = csvRaw.trim().split("\n");
const headers = lines[0].split(",");
const rows = lines.slice(1).map((line) => {
    const values = line.split(",");
    const obj = {};
    headers.forEach((header, index) => {
        obj[header] = values[index];
    });
    return obj;
});

console.log("CSV Headers:", headers);
console.log("Parsed rows:", rows);
console.log("First row name:", rows[0].name, "| email:", rows[0].email);
console.log("");

// ============================================================
console.log("--- Example 4: fs.existsSync — Check If a File Exists ---");
// ============================================================
// Always check before reading to avoid crashes. Returns true/false.

console.log("Does sample.txt exist?", fs.existsSync(textFilePath));        // true
console.log("Does missing.txt exist?", fs.existsSync(path.join(tempDir, "missing.txt")));  // false

// Guard pattern — read only if file exists
const optionalFile = path.join(tempDir, "optional-config.json");
if (fs.existsSync(optionalFile)) {
    const config = JSON.parse(fs.readFileSync(optionalFile, "utf8"));
    console.log("Optional config loaded:", config);
} else {
    console.log("Optional config file not found — using defaults");
}
console.log("");

// ============================================================
console.log("--- Example 5: Reading Files Line by Line (Sync) ---");
// ============================================================
// Split file contents into an array of lines for processing

const allLines = fs.readFileSync(textFilePath, "utf8").split("\n").filter(Boolean);

allLines.forEach((line, index) => {
    console.log(`  Line ${index + 1}: "${line}"`);
});
console.log("Total non-empty lines:", allLines.length);
console.log("");

// ============================================================
console.log("--- Example 6: Error Handling When Reading Files ---");
// ============================================================
// If a file does not exist or is not readable, readFileSync throws an error.
// Use try/catch to handle gracefully.

try {
    const missing = fs.readFileSync("/nonexistent/path/file.txt", "utf8");
    console.log(missing); // never reached
} catch (error) {
    console.log("Caught error code:", error.code);      // ENOENT = file not found
    console.log("Caught error message:", error.message.substring(0, 80) + "...");
}
console.log("");

// Common error codes:
//   ENOENT  — file or directory not found
//   EACCES  — permission denied
//   EISDIR  — tried to read a directory as a file

// ============================================================
console.log("--- Example 7: fs.promises.readFile (Async — Mentioned) ---");
// ============================================================
// The async version returns a Promise. Preferred in Playwright tests because
// Playwright is async. We demonstrate with an IIFE (immediately invoked function expression).

(async () => {
    const asyncContent = await fs.promises.readFile(textFilePath, "utf8");
    console.log("Async read result (first line):", asyncContent.split("\n")[0]);

    // In actual Playwright test:
    //   const data = await fs.promises.readFile('./testdata/config.json', 'utf8');
    //   const config = JSON.parse(data);
    console.log("");

    // ============================================================
    console.log("--- Example 8: Playwright Practical Pattern — storageState ---");
    // ============================================================
    // Playwright saves login state to a JSON file and reloads it:
    //
    //   // Save after login:
    //   await page.context().storageState({ path: 'auth/admin.json' });
    //
    //   // Load in config:
    //   use: { storageState: 'auth/admin.json' }
    //
    //   // Or read manually:
    //   const state = JSON.parse(fs.readFileSync('auth/admin.json', 'utf8'));

    // Simulate reading a storageState file
    const fakeStorageState = {
        cookies: [
            { name: "session", value: "abc123", domain: "example.com" }
        ],
        origins: [
            {
                origin: "https://example.com",
                localStorage: [{ name: "token", value: "jwt-xyz" }]
            }
        ]
    };
    const storageStatePath = path.join(tempDir, "storageState.json");
    fs.writeFileSync(storageStatePath, JSON.stringify(fakeStorageState, null, 2));

    const loadedState = JSON.parse(fs.readFileSync(storageStatePath, "utf8"));
    console.log("Loaded storageState cookies:", loadedState.cookies);
    console.log("Loaded storageState localStorage:", loadedState.origins[0].localStorage);
    console.log("");

    // --- Cleanup ---
    fs.rmSync(tempDir, { recursive: true, force: true });
    console.log("Temp directory cleaned up.");
    console.log("");

    // === KEY TAKEAWAYS ===
    console.log("=== KEY TAKEAWAYS ===");
    console.log("1. fs.readFileSync(path, 'utf8') reads a file synchronously as a string");
    console.log("2. Without 'utf8', readFileSync returns a Buffer (raw bytes)");
    console.log("3. JSON.parse(fs.readFileSync(...)) is the standard pattern for loading JSON test data");
    console.log("4. fs.existsSync(path) checks if a file exists before reading (returns boolean)");
    console.log("5. Always wrap file reads in try/catch — files may be missing or unreadable");
    console.log("6. fs.promises.readFile is the async version — preferred in Playwright tests");
    console.log("7. Java equivalent: Files.readString(Path.of('file.txt')) or BufferedReader");
    console.log("8. Playwright uses file reads for: test data, storageState, config, downloaded files");
})();
