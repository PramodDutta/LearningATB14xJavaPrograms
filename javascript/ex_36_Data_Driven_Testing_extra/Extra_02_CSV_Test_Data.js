// Extra_02_CSV_Test_Data.js
// Topic: Data-Driven Testing - Part 2 of 6
// Extends: Extra_01 (Parameterized Tests)
//
// CONCEPT: CSV (Comma-Separated Values) is a common format for storing test data,
// especially when non-developers (QA analysts, business users) maintain the data
// in spreadsheets. Parsing CSV in JavaScript is straightforward: split by newlines
// to get rows, split by commas to get columns. No external libraries needed for
// simple CSV. This approach lets you maintain test data separately from test code.
//
// JAVA COMPARISON: Java reads CSV using libraries like OpenCSV or Apache Commons CSV,
// or with BufferedReader + String.split(). TestNG's @DataProvider can return CSV data.
// JavaScript makes this simpler — no imports needed for basic CSV parsing.
//
// PLAYWRIGHT RELEVANCE: Playwright tests often load test data from CSV files using
// `fs.readFileSync()` or by embedding CSV strings. This pattern is common for
// login credentials, form data, and multi-scenario test suites.
// ============================================================

console.log("=== EXTRA 02: CSV TEST DATA ===\n");

// ---------------------------------------------------------------
// Example 1: A Simple CSV String
// ---------------------------------------------------------------
console.log("--- Example 1: CSV String Representation ---");

const loginCSV = `username,password,expectedResult,expectedMessage
admin,admin123,success,Welcome Admin
editor,editor456,success,Welcome Editor
viewer,viewer789,success,Welcome Viewer
invalid,wrongpass,failure,Invalid credentials
,password123,failure,Username is required
admin,,failure,Password is required
,,failure,Username is required
hacker,<script>alert(1)</script>,failure,Invalid credentials
admin,admin123 ,failure,Invalid credentials
 admin,admin123,failure,Invalid credentials`;

console.log("  Raw CSV content:");
loginCSV.split("\n").forEach((line, i) => {
    console.log(`    ${i === 0 ? "HEADER:" : `Row ${i}:`}  ${line}`);
});
console.log();

// ---------------------------------------------------------------
// Example 2: Basic CSV Parser Function
// ---------------------------------------------------------------
console.log("--- Example 2: parseCSV() Function ---");

function parseCSV(csvString) {
    const lines = csvString.trim().split("\n");

    // First line is the header
    const headers = lines[0].split(",").map(h => h.trim());

    // Remaining lines are data rows
    const data = [];
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",");
        const row = {};
        headers.forEach((header, index) => {
            // Keep the value as-is (including empty strings and whitespace)
            row[header] = values[index] !== undefined ? values[index] : "";
        });
        data.push(row);
    }

    return data;
}

const parsedData = parseCSV(loginCSV);
console.log(`  Parsed ${parsedData.length} rows from CSV`);
console.log("  Headers:", Object.keys(parsedData[0]).join(", "));
console.log("  Sample row:", JSON.stringify(parsedData[0]));
console.log("  All parsed rows:");
parsedData.forEach((row, i) => {
    console.log(`    [${i}] user="${row.username}" pass="${row.password}" expect="${row.expectedResult}" msg="${row.expectedMessage}"`);
});
console.log();

// ---------------------------------------------------------------
// Example 3: Running Tests with Parsed CSV Data
// ---------------------------------------------------------------
console.log("--- Example 3: Running Tests from CSV Data ---");

// Simulated login system
function simulateLogin(username, password) {
    const users = {
        "admin": { password: "admin123", welcomeMsg: "Welcome Admin" },
        "editor": { password: "editor456", welcomeMsg: "Welcome Editor" },
        "viewer": { password: "viewer789", welcomeMsg: "Welcome Viewer" },
    };

    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    if (!username) return { result: "failure", message: "Username is required" };
    if (!password) return { result: "failure", message: "Password is required" };
    if (trimmedUser !== username || trimmedPass !== password) {
        return { result: "failure", message: "Invalid credentials" };
    }

    const user = users[username];
    if (user && user.password === password) {
        return { result: "success", message: user.welcomeMsg };
    }
    return { result: "failure", message: "Invalid credentials" };
}

let csvTestsPassed = 0;
let csvTestsTotal = 0;

console.log(`  ${"#".padEnd(4)} ${"Username".padEnd(12)} ${"Password".padEnd(25)} ${"Expected".padEnd(10)} ${"Actual".padEnd(10)} ${"Msg Match".padEnd(12)} Result`);
console.log("  " + "-".repeat(85));

parsedData.forEach((testCase, index) => {
    csvTestsTotal++;
    const loginResult = simulateLogin(testCase.username, testCase.password);
    const resultMatch = loginResult.result === testCase.expectedResult;
    const msgMatch = loginResult.message === testCase.expectedMessage;
    const passed = resultMatch && msgMatch;
    if (passed) csvTestsPassed++;

    const displayUser = testCase.username || "(empty)";
    const displayPass = testCase.password || "(empty)";
    console.log(`  ${String(index + 1).padEnd(4)} ${displayUser.padEnd(12)} ${displayPass.padEnd(25)} ${testCase.expectedResult.padEnd(10)} ${loginResult.result.padEnd(10)} ${String(msgMatch).padEnd(12)} ${passed ? "PASS" : "FAIL"}`);
});

console.log(`\n  Results: ${csvTestsPassed}/${csvTestsTotal} passed\n`);

// ---------------------------------------------------------------
// Example 4: Enhanced CSV Parser — Handling Edge Cases
// ---------------------------------------------------------------
console.log("--- Example 4: Enhanced CSV Parser ---");

function parseCSVEnhanced(csvString, options = {}) {
    const {
        delimiter = ",",
        trimValues = false,
        skipEmptyRows = true,
        typeConversion = false
    } = options;

    const lines = csvString.trim().split("\n");
    const headers = lines[0].split(delimiter).map(h => h.trim());
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];

        // Skip empty rows if configured
        if (skipEmptyRows && line.trim() === "") continue;

        const values = line.split(delimiter);
        const row = {};

        headers.forEach((header, idx) => {
            let value = values[idx] !== undefined ? values[idx] : "";

            if (trimValues) value = value.trim();

            // Type conversion
            if (typeConversion) {
                if (value === "true") value = true;
                else if (value === "false") value = false;
                else if (value !== "" && !isNaN(value)) value = Number(value);
            }

            row[header] = value;
        });

        data.push(row);
    }

    return data;
}

const productCSV = `name,price,inStock,quantity,category
Laptop,999.99,true,50,electronics
Mouse,29.99,true,200,electronics
Keyboard,79.99,false,0,electronics
Desk Chair,399.99,true,15,furniture
USB Cable,9.99,true,500,electronics`;

const products = parseCSVEnhanced(productCSV, {
    trimValues: true,
    typeConversion: true
});

console.log("  Enhanced parser with type conversion:");
products.forEach(p => {
    const priceType = typeof p.price;
    const stockType = typeof p.inStock;
    const qtyType = typeof p.quantity;
    console.log(`    ${p.name.padEnd(12)} price=${p.price} (${priceType}), inStock=${p.inStock} (${stockType}), qty=${p.quantity} (${qtyType})`);
});
console.log();

// ---------------------------------------------------------------
// Example 5: CSV with Product Search Test Data
// ---------------------------------------------------------------
console.log("--- Example 5: Product Search Tests from CSV ---");

const searchCSV = `searchQuery,category,minResults,maxResults,sortBy
laptop,electronics,5,50,relevance
gaming mouse,electronics,3,30,price
nonexistent_xyz,all,0,0,relevance
,all,0,0,relevance
desk chair,furniture,1,20,relevance
USB,electronics,2,100,name`;

const searchTests = parseCSVEnhanced(searchCSV, { trimValues: true, typeConversion: true });

function simulateSearch(query, category) {
    if (!query) return [];
    const allProducts = [
        { name: "Gaming Laptop Pro", category: "electronics", price: 1299 },
        { name: "Business Laptop", category: "electronics", price: 899 },
        { name: "Budget Laptop", category: "electronics", price: 499 },
        { name: "Laptop Stand", category: "furniture", price: 49 },
        { name: "Gaming Mouse RGB", category: "electronics", price: 59 },
        { name: "Wireless Mouse", category: "electronics", price: 29 },
        { name: "Gaming Mouse Pad", category: "electronics", price: 19 },
        { name: "Desk Chair Ergonomic", category: "furniture", price: 399 },
        { name: "USB-C Hub", category: "electronics", price: 39 },
        { name: "USB Cable Pack", category: "electronics", price: 12 },
        { name: "USB Flash Drive", category: "electronics", price: 15 },
    ];

    let results = allProducts.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase())
    );

    if (category !== "all") {
        results = results.filter(p => p.category === category);
    }

    return results;
}

console.log("  Running search tests from CSV:\n");
searchTests.forEach((test, i) => {
    const results = simulateSearch(test.searchQuery, test.category);
    const countInRange = results.length >= test.minResults && results.length <= test.maxResults;
    const status = countInRange ? "PASS" : "FAIL";

    console.log(`  Test ${i + 1}: search="${test.searchQuery || "(empty)"}" category="${test.category}"`);
    console.log(`    Expected: ${test.minResults}-${test.maxResults} results`);
    console.log(`    Actual:   ${results.length} results -> ${status}`);
    if (results.length > 0 && results.length <= 5) {
        results.forEach(r => console.log(`      - ${r.name} ($${r.price})`));
    }
});
console.log();

// ---------------------------------------------------------------
// Example 6: Reading CSV from File (Playwright Pattern)
// ---------------------------------------------------------------
console.log("--- Example 6: Reading CSV from File (Playwright Pattern) ---");

console.log(`
  // ACTUAL PLAYWRIGHT CODE — Reading CSV from file:

  const fs = require('fs');
  const path = require('path');

  // Helper function
  function parseCSV(filePath) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.trim().split('\\n');
      const headers = lines[0].split(',').map(h => h.trim());

      return lines.slice(1).map(line => {
          const values = line.split(',');
          const row = {};
          headers.forEach((h, i) => { row[h] = values[i]?.trim() || ''; });
          return row;
      });
  }

  // Load test data
  const testData = parseCSV(path.join(__dirname, 'testdata', 'login-scenarios.csv'));

  // Generate tests
  const { test, expect } = require('@playwright/test');

  for (const data of testData) {
      test(\`login: \${data.username} - \${data.expectedResult}\`, async ({ page }) => {
          await page.goto('/login');
          await page.getByLabel('Username').fill(data.username);
          await page.getByLabel('Password').fill(data.password);
          await page.getByRole('button', { name: 'Log in' }).click();

          if (data.expectedResult === 'success') {
              await expect(page).toHaveURL(/dashboard/);
          } else {
              await expect(page.locator('.error')).toHaveText(data.expectedMessage);
          }
      });
  }

  // File structure:
  // project/
  // +-- testdata/
  // |   +-- login-scenarios.csv
  // +-- tests/
  // |   +-- login.spec.js      <-- reads the CSV
  // +-- playwright.config.js
`);

// ---------------------------------------------------------------
// Example 7: Java Comparison
// ---------------------------------------------------------------
console.log("--- Example 7: Java Comparison ---");

console.log(`
  JAVA (TestNG + CSV):                           JAVASCRIPT (Playwright + CSV):
  ====================                            ==============================

  @DataProvider(name = "csvData")                 const fs = require('fs');
  public Object[][] readCSV()                     function parseCSV(path) {
      throws IOException {                            const lines = fs.readFileSync(path, 'utf-8')
      BufferedReader reader =                             .trim().split('\\n');
          new BufferedReader(                          const headers = lines[0].split(',');
          new FileReader("data.csv"));                 return lines.slice(1).map(line => {
      String line;                                        const vals = line.split(',');
      List<Object[]> data = new ArrayList<>();            const row = {};
      reader.readLine(); // skip header                   headers.forEach((h, i) =>
      while ((line = reader.readLine()) != null) {            row[h.trim()] = vals[i]?.trim());
          String[] parts = line.split(",");               return row;
          data.add(parts);                            });
      }                                           }
      return data.toArray(new Object[0][]);
  }                                               const data = parseCSV('./data.csv');

  @Test(dataProvider = "csvData")                 for (const d of data) {
  public void testLogin(String user,                  test(\`login \${d.user}\`, async ({page}) => {
      String pass, String expected) {                     // test logic
      // test logic                                   });
  }                                               }

  KEY DIFFERENCES:
  - Java needs BufferedReader, IOException handling
  - JavaScript: fs.readFileSync + split — simpler
  - Both split by comma and iterate rows
  - Both skip the header row
`);

// === KEY TAKEAWAYS ===
console.log("=== KEY TAKEAWAYS ===");
console.log("1. CSV is great for test data: easy to edit, works with spreadsheets");
console.log("2. Parse CSV: split('\\n') for rows, split(',') for columns");
console.log("3. First row = headers, remaining rows = data");
console.log("4. No external library needed for simple CSV (no quoted fields)");
console.log("5. Enhanced parser can handle: trim, type conversion, empty row skipping");
console.log("6. Playwright pattern: fs.readFileSync() + parseCSV() + for loop with test()");
console.log("7. Separate test data (CSV files) from test logic (spec files)");
console.log("8. Non-developers can add test cases by editing the CSV in a spreadsheet");
