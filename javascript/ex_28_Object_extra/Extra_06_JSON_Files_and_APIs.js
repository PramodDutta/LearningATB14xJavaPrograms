// Extra_06_JSON_Files_and_APIs.js
// Topic: JSON with Files and APIs - Part 6 of 7
// Extends: ex_28_Object
//
// CONCEPT: JSON is the standard format for configuration files, API communication,
// and data storage. In Node.js, you can read JSON with require() (CommonJS) or
// parse file contents. API responses are parsed with response.json() in Playwright.
// JAVA COMPARISON: Java reads JSON files with Jackson's ObjectMapper.readTree(new File(...))
// or Gson's JsonParser. Java has no built-in JSON support — always needs a library.
// PLAYWRIGHT RELEVANCE: await response.json() parses API responses, JSON.stringify()
// builds request bodies, and JSON files store test fixtures and environment configs.
// ============================================================

console.log("--- Example 1: Reading JSON with require() (CommonJS) ---");

// In Node.js CommonJS, require() can directly load JSON files:
// const config = require('./config.json');
// This is synchronous and cached after first load.

// Since we can't rely on external files, we'll simulate:
const simulatedJsonFile = JSON.stringify({
    appName: "TestApp",
    version: "2.1.0",
    features: {
        darkMode: true,
        notifications: true,
        betaFeatures: false,
    },
    supportedBrowsers: ["chromium", "firefox", "webkit"],
});

// Simulating require('./config.json') behavior
const config = JSON.parse(simulatedJsonFile);
console.log("  App:", config.appName, "v" + config.version);
console.log("  Browsers:", config.supportedBrowsers.join(", "));
console.log("  Dark mode:", config.features.darkMode);

// Pattern: loading environment-specific config
function loadConfig(environment) {
    // In real code: const config = require(`./config.${environment}.json`);
    const configs = {
        dev: { baseURL: "http://localhost:3000", debug: true, timeout: 60000 },
        staging: { baseURL: "https://staging.example.com", debug: true, timeout: 30000 },
        prod: { baseURL: "https://api.example.com", debug: false, timeout: 15000 },
    };
    return configs[environment] || configs.dev;
}

for (const env of ["dev", "staging", "prod"]) {
    const envConfig = loadConfig(env);
    console.log(`\n  [${env}] URL: ${envConfig.baseURL}, timeout: ${envConfig.timeout}ms`);
}

console.log("\n--- Example 2: Writing JSON to console / preparing output ---");

// Pretty-print for debugging
const testResults = {
    suite: "Login Tests",
    timestamp: new Date().toISOString(),
    results: [
        { name: "valid_login", status: "passed", duration: 1250 },
        { name: "invalid_password", status: "passed", duration: 890 },
        { name: "locked_account", status: "failed", duration: 2100, error: "Timeout" },
    ],
    summary: { total: 3, passed: 2, failed: 1 },
};

console.log("  Test Results (pretty JSON):");
console.log(JSON.stringify(testResults, null, 2));

// Compact for logging
console.log("\n  Compact (for log files):");
console.log(JSON.stringify(testResults));

// In real code, you'd write to a file:
// const fs = require('fs');
// fs.writeFileSync('results.json', JSON.stringify(testResults, null, 2));
console.log("\n  File write pattern:");
console.log("  fs.writeFileSync('results.json', JSON.stringify(data, null, 2));");

console.log("\n--- Example 3: Simulating API response parsing ---");

// Simulate what an API response looks like and how to parse it
function simulateApiResponse(endpoint) {
    const responses = {
        "/api/users": {
            status: 200,
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                data: [
                    { id: 1, name: "Alice", email: "alice@example.com" },
                    { id: 2, name: "Bob", email: "bob@example.com" },
                ],
                pagination: { page: 1, perPage: 10, total: 2 },
            }),
        },
        "/api/users/999": {
            status: 404,
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                error: { code: "NOT_FOUND", message: "User not found" },
            }),
        },
        "/api/health": {
            status: 200,
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ status: "healthy", uptime: 86400 }),
        },
    };
    return responses[endpoint] || { status: 500, body: '{"error":"Unknown endpoint"}' };
}

// Parse responses like Playwright's response.json()
async function fetchAndParse(endpoint) {
    const response = simulateApiResponse(endpoint);

    // This is what Playwright does with: const data = await response.json();
    const data = JSON.parse(response.body);

    console.log(`  ${endpoint} (${response.status}):`);

    if (response.status === 200) {
        console.log("  Data:", JSON.stringify(data, null, 4));
    } else {
        console.log("  Error:", data.error.message || data.error);
    }

    return { status: response.status, data };
}

fetchAndParse("/api/users");
fetchAndParse("/api/users/999");
fetchAndParse("/api/health");

console.log("\n--- Example 4: JSON.stringify() for request bodies ---");

// Building request bodies for API calls
function buildRequestBody(method, endpoint, data) {
    const body = JSON.stringify(data);
    console.log(`  ${method} ${endpoint}`);
    console.log(`  Content-Type: application/json`);
    console.log(`  Body: ${body}`);
    console.log(`  Body length: ${body.length} bytes`);
    return body;
}

// POST — create user
console.log("  Creating user:");
buildRequestBody("POST", "/api/users", {
    name: "Charlie",
    email: "charlie@example.com",
    role: "user",
});

// PUT — update user
console.log("\n  Updating user:");
buildRequestBody("PUT", "/api/users/3", {
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
});

// PATCH — partial update
console.log("\n  Partial update:");
buildRequestBody("PATCH", "/api/users/3", {
    role: "admin",
});

// Playwright API request pattern
console.log("\n  Playwright API request pattern:");
console.log(`
  // In Playwright:
  const response = await request.post('/api/users', {
      data: {
          name: 'Charlie',
          email: 'charlie@example.com',
      }
  });
  // Playwright automatically JSON.stringify's the data option

  const responseData = await response.json();
  // Playwright automatically JSON.parse's the response body

  expect(response.status()).toBe(201);
  expect(responseData.id).toBeDefined();
`);

console.log("\n--- Example 5: Complex JSON round-trip patterns ---");

// Deep clone using JSON (quick-and-dirty deep copy)
const original = {
    name: "Config",
    settings: {
        theme: "dark",
        notifications: { email: true, push: false },
    },
    tags: ["production", "v2"],
};

const deepClone = JSON.parse(JSON.stringify(original));
deepClone.settings.theme = "light";
deepClone.tags.push("modified");

console.log("  Original:", JSON.stringify(original.settings));
console.log("  Clone:", JSON.stringify(deepClone.settings));
console.log("  Original tags:", original.tags);   // unchanged
console.log("  Clone tags:", deepClone.tags);      // modified

// Limitations of JSON clone
console.log("\n  JSON clone limitations:");
const problematic = {
    date: new Date(),
    regex: /test/g,
    func: function () { return 42; },
    undef: undefined,
    symbol: Symbol("id"),
    infinity: Infinity,
    nan: NaN,
};
const cloned = JSON.parse(JSON.stringify(problematic));
console.log("  date:", typeof cloned.date, "->", cloned.date);   // string, not Date
console.log("  regex:", cloned.regex);                              // {} empty object
console.log("  func:", cloned.func);                                // undefined (removed)
console.log("  undef:", cloned.undef);                              // undefined (removed)
console.log("  infinity:", cloned.infinity);                        // null
console.log("  nan:", cloned.nan);                                  // null

// Custom toJSON() method
class TestCase {
    constructor(name, steps) {
        this.name = name;
        this.steps = steps;
        this.createdAt = new Date();
        this._internal = "debug-only";
    }

    toJSON() {
        // Controls what JSON.stringify produces for this object
        return {
            testName: this.name,
            stepCount: this.steps.length,
            steps: this.steps,
            created: this.createdAt.toISOString(),
            // _internal is excluded
        };
    }
}

const tc = new TestCase("Login Test", ["open page", "fill email", "fill password", "click submit"]);
console.log("\n  Custom toJSON():");
console.log(JSON.stringify(tc, null, 2));

// JSON validation utility
function isValidJson(str) {
    try {
        JSON.parse(str);
        return true;
    } catch {
        return false;
    }
}

console.log("\n  JSON validation:");
console.log('  \'{"valid": true}\':', isValidJson('{"valid": true}'));
console.log("  '{invalid}':", isValidJson("{invalid}"));
console.log("  '42':", isValidJson("42"));                    // true — numbers are valid JSON
console.log("  '\"hello\"':", isValidJson('"hello"'));         // true — strings are valid JSON
console.log("  'undefined':", isValidJson("undefined"));       // false

// === KEY TAKEAWAYS ===
// 1. require('./file.json') in CommonJS loads and parses JSON synchronously (Node.js)
// 2. JSON.parse(responseBody) is what response.json() does internally in Playwright
// 3. JSON.stringify(data) builds request bodies for POST/PUT/PATCH API calls
// 4. JSON round-trip (stringify then parse) gives quick deep clone, but loses Date/RegExp/functions
// 5. Custom toJSON() method controls serialization output for class instances
// 6. Always validate/try-catch when parsing JSON from external sources
// 7. Pretty print with JSON.stringify(obj, null, 2) for debugging and file output
// 8. Playwright handles JSON automatically: data option auto-stringifies, response.json() auto-parses
