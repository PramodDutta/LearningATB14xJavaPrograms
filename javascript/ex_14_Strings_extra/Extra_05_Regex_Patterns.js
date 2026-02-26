// Extra_05_Regex_Patterns.js
// Topic: Regex Practical Patterns - Part 5 of 6
// Extends: ex_14_Strings
//
// CONCEPT: This file covers real-world regex patterns you will encounter frequently:
// email validation, phone numbers, URLs, dates, and more. These patterns demonstrate
// how to combine character classes, quantifiers, anchors, and groups effectively.
// JAVA COMPARISON: Same regex syntax works in Java's Pattern.compile(). The patterns
// themselves are identical; only the API differs (Java uses Matcher, JS uses match/test).
// PLAYWRIGHT RELEVANCE: expect(locator).toHaveText(/pattern/), page.waitForURL(/dashboard/),
// page.route(/api\/users/), and filtering/validating scraped page content.
// ============================================================

console.log("--- Example 1: Email Validation ---");

// Simple email pattern (covers most common cases)
const simpleEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const emails = [
    "user@example.com",
    "john.doe@company.co.uk",
    "alice+tag@gmail.com",
    "name_99@test.org",
    "invalid@",
    "@nodomain.com",
    "spaces in@email.com",
    "missing.dot@com",
    "valid@sub.domain.example.com",
    "user@123.456.789.0",
];

console.log("Email validation results:");
emails.forEach(email => {
    const valid = simpleEmail.test(email);
    console.log(`  ${valid ? "PASS" : "FAIL"}: ${email}`);
});

// Extracting emails from text
const textWithEmails = "Contact us at support@example.com or sales@company.org for help.";
const extractedEmails = textWithEmails.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);
console.log("\nExtracted emails:", extractedEmails);


console.log("\n--- Example 2: Phone Number Patterns ---");

// US phone number (multiple formats)
const usPhonePatterns = /^(?:\+?1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;

const phones = [
    "1234567890",
    "123-456-7890",
    "(123) 456-7890",
    "123.456.7890",
    "+1 123-456-7890",
    "1-123-456-7890",
    "12345",            // too short
    "123-456-789012",   // too long
    "abc-def-ghij",     // not digits
];

console.log("Phone validation:");
phones.forEach(phone => {
    const valid = usPhonePatterns.test(phone);
    console.log(`  ${valid ? "PASS" : "FAIL"}: ${phone}`);
});

// Normalizing phone numbers (strip everything except digits)
function normalizePhone(phone) {
    const digits = phone.replace(/\D/g, "");
    if (digits.length === 10) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    if (digits.length === 11 && digits[0] === "1") {
        return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
    }
    return phone; // Return original if unexpected format
}

console.log("\nNormalized phones:");
["1234567890", "123.456.7890", "+1-123-456-7890"].forEach(p => {
    console.log(`  ${p} -> ${normalizePhone(p)}`);
});


console.log("\n--- Example 3: URL Matching ---");

// Basic URL pattern
const urlPattern = /^https?:\/\/[\w.-]+(?::\d+)?(?:\/[\w./?&=%#-]*)?$/;

const urls = [
    "https://example.com",
    "http://localhost:3000",
    "https://api.example.com/v2/users?page=1&limit=10",
    "https://example.com/path/to/page#section",
    "ftp://invalid.com",
    "not-a-url",
    "https://example.com/search?q=hello%20world",
];

console.log("URL validation:");
urls.forEach(url => {
    const valid = urlPattern.test(url);
    console.log(`  ${valid ? "PASS" : "FAIL"}: ${url}`);
});

// Extracting URL parts
const urlParts = /^(https?):\/\/([\w.-]+)(?::(\d+))?(\/[^?#]*)?\??([^#]*)?(#.*)?$/;
const testURL = "https://api.example.com:8080/v2/users?page=1&sort=name#top";
const parts = testURL.match(urlParts);

if (parts) {
    console.log("\nURL breakdown:");
    console.log("  Protocol:", parts[1]);
    console.log("  Host:", parts[2]);
    console.log("  Port:", parts[3] || "default");
    console.log("  Path:", parts[4] || "/");
    console.log("  Query:", parts[5] || "none");
    console.log("  Fragment:", parts[6] || "none");
}


console.log("\n--- Example 4: Date Patterns ---");

// ISO date: YYYY-MM-DD
const isoDate = /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/;

// US date: MM/DD/YYYY
const usDate = /^(?:0[1-9]|1[0-2])\/(?:0[1-9]|[12]\d|3[01])\/\d{4}$/;

// Various date formats
const dateFormats = /^(?:(\d{4})-(\d{2})-(\d{2})|(\d{2})\/(\d{2})\/(\d{4})|(\d{2})\.(\d{2})\.(\d{4}))$/;

const dates = [
    "2024-01-15",
    "2024-13-01",   // invalid month
    "01/15/2024",
    "15.01.2024",
    "2024/01/15",   // wrong separators for pattern
];

console.log("Date validation:");
dates.forEach(date => {
    console.log(`  ISO: ${isoDate.test(date) ? "PASS" : "FAIL"} | US: ${usDate.test(date) ? "PASS" : "FAIL"} | Multi: ${dateFormats.test(date) ? "PASS" : "FAIL"} : ${date}`);
});

// Extract and reformat dates from text
const report = "Started: 2024-01-15, Completed: 2024-03-20, Due: 2024-07-04";
const extractedDates = report.match(/\d{4}-\d{2}-\d{2}/g);
console.log("\nExtracted dates:", extractedDates);


console.log("\n--- Example 5: Password Strength Validation ---");

function validatePassword(password) {
    const checks = {
        minLength: password.length >= 8,
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasDigit: /\d/.test(password),
        hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
        noSpaces: !/\s/.test(password),
    };

    const passedCount = Object.values(checks).filter(Boolean).length;
    const strength = passedCount <= 2 ? "Weak" : passedCount <= 4 ? "Medium" : "Strong";

    return { ...checks, strength, score: `${passedCount}/6` };
}

const passwords = ["abc", "Password1", "P@ssw0rd!", "hello world", "Str0ng!Pass"];
console.log("Password validation:");
passwords.forEach(pw => {
    const result = validatePassword(pw);
    console.log(`  "${pw}" -> ${result.strength} (${result.score})`);
    Object.entries(result).forEach(([key, val]) => {
        if (key !== "strength" && key !== "score") {
            if (!val) console.log(`    Missing: ${key}`);
        }
    });
});


console.log("\n--- Example 6: Playwright-specific Patterns ---");

// Pattern: expect(locator).toHaveText(/pattern/)
function simulateToHaveText(actualText, pattern) {
    const passes = pattern.test(actualText);
    console.log(`  toHaveText(${pattern}): ${passes ? "PASS" : "FAIL"} (actual: "${actualText}")`);
    return passes;
}

console.log("Text assertions:");
simulateToHaveText("Welcome, Alice!", /Welcome, \w+!/);
simulateToHaveText("3 items in your cart", /\d+ items? in your cart/);
simulateToHaveText("$1,234.56", /\$[\d,]+\.\d{2}/);
simulateToHaveText("Order #12345 confirmed", /Order #\d+ confirmed/);
simulateToHaveText("Last updated: Jan 15, 2024", /Last updated: \w+ \d{1,2}, \d{4}/);

// Pattern: page.waitForURL(/pattern/)
console.log("\nURL route matching:");
function simulateWaitForURL(actualURL, pattern) {
    const matches = pattern.test(actualURL);
    console.log(`  waitForURL(${pattern}): ${matches ? "MATCH" : "NO MATCH"} (url: "${actualURL}")`);
    return matches;
}

simulateWaitForURL("https://app.com/dashboard", /\/dashboard$/);
simulateWaitForURL("https://app.com/users/42/profile", /\/users\/\d+\/profile/);
simulateWaitForURL("https://app.com/login?redirect=/home", /\/login/);
simulateWaitForURL("https://app.com/api/v2/data", /\/api\/v\d+\//);

// Pattern: page.route(/pattern/, handler)
console.log("\nRoute interception patterns:");
const routePatterns = [
    { pattern: /\/api\/.*/, name: "All API calls" },
    { pattern: /\.(png|jpg|gif|svg)$/i, name: "Images" },
    { pattern: /google-analytics|tracking/, name: "Analytics" },
    { pattern: /\/api\/users\/\d+$/, name: "Specific user API" },
];

const requestURLs = [
    "https://app.com/api/users/42",
    "https://cdn.com/image.png",
    "https://google-analytics.com/collect",
    "https://app.com/page.html",
];

requestURLs.forEach(url => {
    const matchedRoutes = routePatterns.filter(r => r.pattern.test(url));
    console.log(`  ${url}`);
    if (matchedRoutes.length > 0) {
        matchedRoutes.forEach(r => console.log(`    -> Intercepted by: ${r.name}`));
    } else {
        console.log("    -> Not intercepted");
    }
});


console.log("\n--- Example 7: HTML/CSS Selector Patterns ---");

// Extracting data attributes from HTML-like strings
const htmlContent = `
<div data-testid="header" class="main-header">
<button data-testid="submit-btn" id="submitForm" class="btn primary">
<input data-testid="email-input" type="email" placeholder="Enter email">
<span data-testid="error-msg" class="error hidden">Invalid email</span>
`;

// Extract all data-testid values
const testIds = htmlContent.match(/data-testid="([^"]+)"/g);
console.log("All test IDs:", testIds);

// Extract with capture groups
const testIdPattern = /data-testid="([^"]+)"/g;
let testIdMatch;
console.log("\nExtracted test ID values:");
while ((testIdMatch = testIdPattern.exec(htmlContent)) !== null) {
    console.log(`  data-testid="${testIdMatch[1]}"`);
}

// Validating CSS class names
const validClass = /^-?[_a-zA-Z][_a-zA-Z0-9-]*$/;
const classNames = ["valid-class", "_private", "123invalid", "-webkit-transform", "has spaces", "camelCase"];
console.log("\nCSS class name validation:");
classNames.forEach(cls => {
    console.log(`  ${validClass.test(cls) ? "VALID" : "INVALID"}: "${cls}"`);
});


console.log("\n--- Example 8: Data Extraction Patterns ---");

// Extract numbers from text (common in test assertions)
const pageText = "Showing 1-25 of 1,234 results (page 3 of 50)";

const numbers = pageText.match(/\d[\d,]*/g);
console.log("All numbers:", numbers);

// Parse the specific values
const paginationPattern = /Showing (\d+)-(\d+) of ([\d,]+) results \(page (\d+) of (\d+)\)/;
const paginationMatch = pageText.match(paginationPattern);

if (paginationMatch) {
    console.log("Pagination parsed:");
    console.log("  Start:", parseInt(paginationMatch[1]));
    console.log("  End:", parseInt(paginationMatch[2]));
    console.log("  Total:", parseInt(paginationMatch[3].replace(",", "")));
    console.log("  Current page:", parseInt(paginationMatch[4]));
    console.log("  Total pages:", parseInt(paginationMatch[5]));
}

// Extract currency values
const invoice = "Subtotal: $1,234.56 | Tax: $98.76 | Total: $1,333.32 | Discount: -$50.00";
const currencyPattern = /-?\$[\d,]+\.\d{2}/g;
const amounts = invoice.match(currencyPattern);
console.log("\nCurrency values:", amounts);

// Parse into numbers
const numericAmounts = amounts.map(a => parseFloat(a.replace(/[$,]/g, "")));
console.log("As numbers:", numericAmounts);
console.log("Sum:", numericAmounts.reduce((sum, n) => sum + n, 0).toFixed(2));


// === KEY TAKEAWAYS ===
// 1. Email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ covers most cases
// 2. Phone: strip non-digits with .replace(/\D/g, ""), then validate length
// 3. URL: match protocol, host, optional port, path, query string, and fragment
// 4. Playwright patterns: toHaveText(/regex/), waitForURL(/regex/), route(/regex/)
// 5. Data extraction: use capture groups () to pull specific values from text
// 6. Always handle the null case when using match() — no match returns null
// 7. Combine patterns with validation functions for reusable test helpers
// 8. Regex can extract pagination info, currency values, dates from page content
