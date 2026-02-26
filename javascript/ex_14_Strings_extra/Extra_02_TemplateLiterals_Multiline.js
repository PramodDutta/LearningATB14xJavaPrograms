// Extra_02_TemplateLiterals_Multiline.js
// Topic: Template Literals Multiline - Part 2 of 6
// Extends: ex_14_Strings
//
// CONCEPT: Template literals preserve line breaks naturally — no need for \n escape
// characters or string concatenation across lines. Indentation and whitespace within
// the backticks is preserved exactly as written, which is powerful but requires awareness.
// JAVA COMPARISON: Java 15+ has text blocks (""" ... """) for multiline. Before that,
// Java used \n or StringBuilder. JS template literals are more flexible.
// PLAYWRIGHT RELEVANCE: Building dynamic selectors like `[data-testid="${id}"]`,
// constructing dynamic URLs, multi-line scripts for page.evaluate(), and HTML content.
// ============================================================

console.log("--- Example 1: Multiline Without \\n ---");

// Old way: using \n for line breaks
const oldWay = "Line 1\nLine 2\nLine 3";
console.log("Old way:");
console.log(oldWay);

// New way: template literals preserve line breaks
const newWay = `Line 1
Line 2
Line 3`;
console.log("\nNew way:");
console.log(newWay);

console.log("\nSame output?", oldWay === newWay);


console.log("\n--- Example 2: Preserving Indentation ---");

// IMPORTANT: Whitespace is preserved exactly as-is
const html1 = `
<div class="container">
    <h1>Welcome</h1>
    <p>Hello World</p>
</div>
`;
console.log("HTML (indented from column 0):");
console.log(html1);

// If you indent the template literal to match your code indentation,
// that indentation becomes part of the string
function generateHTML() {
    const title = "My Page";
    // This has extra leading spaces because of code indentation
    const html2 = `
        <div>
            <h1>${title}</h1>
        </div>
    `;
    console.log("HTML with code indentation (notice extra spaces):");
    console.log(JSON.stringify(html2));
    console.log(html2);
}
generateHTML();


console.log("--- Example 3: Trimming Unwanted Whitespace ---");

// Strategy 1: Start content on the same line as the backtick
const clean1 = `<div>
    <p>Content</p>
</div>`;
console.log("Strategy 1 (start on backtick line):");
console.log(clean1);

// Strategy 2: Use .trim() to remove leading/trailing newlines
function makeCard(title, body) {
    return `
        <div class="card">
            <h2>${title}</h2>
            <p>${body}</p>
        </div>
    `.trim();
}
console.log("\nStrategy 2 (.trim()):");
console.log(makeCard("Test Card", "Some content here"));

// Strategy 3: Use .replace() to remove leading spaces from each line
function dedent(str) {
    const lines = str.split("\n");
    // Find minimum indentation (ignoring empty lines)
    const minIndent = lines
        .filter(line => line.trim().length > 0)
        .reduce((min, line) => {
            const indent = line.match(/^(\s*)/)[1].length;
            return Math.min(min, indent);
        }, Infinity);
    return lines.map(line => line.slice(minIndent)).join("\n").trim();
}

const html3 = dedent(`
        <div>
            <h1>Title</h1>
            <p>Paragraph</p>
        </div>
    `);
console.log("\nStrategy 3 (dedent helper):");
console.log(html3);


console.log("\n--- Example 4: Building Dynamic Selectors (Playwright Pattern) ---");

// In Playwright, you frequently build selectors dynamically
const testId = "submit-button";
const selector1 = `[data-testid="${testId}"]`;
console.log("Selector 1:", selector1);

const role = "button";
const name = "Submit";
const selector2 = `${role}:has-text("${name}")`;
console.log("Selector 2:", selector2);

// Complex selectors with multiple attributes
const type = "email";
const placeholder = "Enter email";
const selector3 = `input[type="${type}"][placeholder="${placeholder}"]`;
console.log("Selector 3:", selector3);

// CSS selector with nth-child
const rowIndex = 3;
const selector4 = `table >> tr:nth-child(${rowIndex}) >> td:first-child`;
console.log("Selector 4:", selector4);

// XPath selector
const linkText = "Sign In";
const selector5 = `//a[contains(text(), "${linkText}")]`;
console.log("Selector 5:", selector5);

// Building selector from object properties
const locatorConfig = {
    tag: "button",
    className: "primary",
    text: "Click Me",
};
const selector6 = `${locatorConfig.tag}.${locatorConfig.className}:has-text("${locatorConfig.text}")`;
console.log("Selector 6:", selector6);


console.log("\n--- Example 5: Building Dynamic URLs (Playwright Pattern) ---");

const baseURL = "https://example.com";
const apiVersion = "v2";
const userId = 42;
const page = 3;
const limit = 25;

// Simple URL construction
const url1 = `${baseURL}/api/${apiVersion}/users/${userId}`;
console.log("URL 1:", url1);

// URL with query parameters
const url2 = `${baseURL}/api/${apiVersion}/users?page=${page}&limit=${limit}`;
console.log("URL 2:", url2);

// URL with encoded values
const searchTerm = "hello world";
const url3 = `${baseURL}/search?q=${encodeURIComponent(searchTerm)}&page=${page}`;
console.log("URL 3:", url3);

// URL construction helper function
function buildURL(base, path, params = {}) {
    const queryString = Object.entries(params)
        .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
        .join("&");
    return queryString ? `${base}${path}?${queryString}` : `${base}${path}`;
}

console.log("Built URL:", buildURL(baseURL, "/api/users", { page: 1, sort: "name", order: "asc" }));


console.log("\n--- Example 6: Multiline Scripts for page.evaluate() ---");

// In Playwright, page.evaluate() often needs multi-line JS strings
const elementId = "main-content";
const attribute = "data-loaded";

const evaluateScript = `
    const el = document.getElementById("${elementId}");
    if (el) {
        el.setAttribute("${attribute}", "true");
        return el.textContent;
    }
    return null;
`;
console.log("Evaluate script:");
console.log(evaluateScript.trim());

// Another common pattern: scrolling script
const scrollAmount = 500;
const scrollScript = `
    window.scrollBy({
        top: ${scrollAmount},
        behavior: 'smooth'
    });
`;
console.log("\nScroll script:");
console.log(scrollScript.trim());


console.log("\n--- Example 7: Building HTML Content ---");

const testResults = [
    { name: "Login Test", status: "passed", duration: 1200 },
    { name: "Cart Test", status: "failed", duration: 3400 },
    { name: "Search Test", status: "passed", duration: 890 },
];

function generateReport(results) {
    const rows = results.map(r => `
        <tr class="${r.status}">
            <td>${r.name}</td>
            <td>${r.status.toUpperCase()}</td>
            <td>${r.duration}ms</td>
        </tr>`).join("");

    return `
<!DOCTYPE html>
<html>
<head><title>Test Report</title></head>
<body>
    <h1>Test Results</h1>
    <p>Total: ${results.length} | Passed: ${results.filter(r => r.status === "passed").length}</p>
    <table>
        <thead>
            <tr><th>Test</th><th>Status</th><th>Duration</th></tr>
        </thead>
        <tbody>${rows}
        </tbody>
    </table>
</body>
</html>`.trim();
}

console.log(generateReport(testResults));


console.log("\n--- Example 8: Multiline Error Messages and Logging ---");

function logTestFailure(test, error, screenshot) {
    const timestamp = new Date().toISOString();
    const message = `
========================================
TEST FAILURE REPORT
========================================
Timestamp: ${timestamp}
Test Name: ${test.name}
Browser:   ${test.browser}
Status:    FAILED
----------------------------------------
Error:     ${error.message}
Expected:  ${error.expected}
Received:  ${error.received}
----------------------------------------
Screenshot: ${screenshot || "Not captured"}
========================================`.trim();

    console.log(message);
}

logTestFailure(
    { name: "Checkout Flow", browser: "chromium" },
    { message: "Element not visible", expected: "visible", received: "hidden" },
    "/screenshots/checkout_fail_001.png"
);


// === KEY TAKEAWAYS ===
// 1. Template literals preserve line breaks — no \n needed for multiline strings
// 2. Indentation is preserved exactly as written — be aware of unwanted whitespace
// 3. Use .trim() or dedent helpers to clean up indentation from code formatting
// 4. Playwright patterns: dynamic selectors `[data-testid="${id}"]`, dynamic URLs
// 5. Great for building HTML, constructing page.evaluate() scripts, and error messages
// 6. Combine multiline + interpolation for readable, maintainable dynamic strings
