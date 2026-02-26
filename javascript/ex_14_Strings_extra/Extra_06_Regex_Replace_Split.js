// Extra_06_Regex_Replace_Split.js
// Topic: Regex Replace and Split - Part 6 of 6
// Extends: ex_14_Strings
//
// CONCEPT: Beyond matching, regex powers string transformation through replace() and
// split(). replace() can use regex patterns, backreferences, and callback functions for
// sophisticated text manipulation. split() with regex handles complex delimiter patterns.
// Named capture groups (?<name>pattern) make patterns self-documenting.
// JAVA COMPARISON: Java has String.replaceAll(regex, replacement) and String.split(regex).
// Java uses $1 for backreferences (same as JS). Java lacks JS's function callback in replace.
// PLAYWRIGHT RELEVANCE: Cleaning scraped text, normalizing whitespace, parsing structured
// page content, transforming test data, and formatting assertion messages.
// ============================================================

console.log("--- Example 1: replace() with Regex ---");

const text = "Hello World! Hello JavaScript! Hello Regex!";

// String replace: only replaces FIRST occurrence
console.log("String replace:", text.replace("Hello", "Hi"));

// Regex without g: also only replaces first
console.log("Regex no /g:  ", text.replace(/Hello/, "Hi"));

// Regex with g: replaces ALL occurrences
console.log("Regex with /g:", text.replace(/Hello/g, "Hi"));

// Case insensitive replace
const mixed = "Apple apple APPLE aPpLe";
console.log("Case-insensitive:", mixed.replace(/apple/gi, "orange"));

// Replace with special replacement patterns
const name = "John Smith";
// $& - the matched substring
console.log("Wrap match ($&):", name.replace(/\w+/g, "[$&]"));


console.log("\n--- Example 2: Backreferences in replace() ---");

// $1, $2 etc. refer to capture groups
const fullName = "Smith, John";
const reversed = fullName.replace(/(\w+), (\w+)/, "$2 $1");
console.log("Name reversed:", reversed);

// Reformat dates: MM/DD/YYYY -> YYYY-MM-DD
const usDate = "01/15/2024";
const isoDate = usDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$1-$2");
console.log("Date reformatted:", isoDate);

// Duplicate words
const doubled = "hello".replace(/(\w+)/, "$1 $1");
console.log("Doubled:", doubled);

// Swap two words
const swapped = "foo bar".replace(/(\w+) (\w+)/, "$2 $1");
console.log("Swapped:", swapped);

// Wrap in HTML tags using backreference
const words = "bold italic underline";
const htmlWrapped = words.replace(/(\w+)/g, "<strong>$1</strong>");
console.log("HTML wrapped:", htmlWrapped);


console.log("\n--- Example 3: replace() with Function Callback ---");

// The callback receives: (match, p1, p2, ..., offset, string)
const prices = "Items cost $5 and $10 and $25";
const inflated = prices.replace(/\$(\d+)/g, (match, amount) => {
    return "$" + (parseInt(amount) * 1.2).toFixed(2);
});
console.log("20% markup:", inflated);

// Convert temperatures
const temps = "Today: 72F, Tomorrow: 85F, Next week: 65F";
const celsius = temps.replace(/(\d+)F/g, (match, temp) => {
    const c = ((parseInt(temp) - 32) * 5 / 9).toFixed(1);
    return `${c}C`;
});
console.log("To Celsius:", celsius);

// Capitalize first letter of each word
const sentence = "the quick brown fox jumps over the lazy dog";
const titleCase = sentence.replace(/\b\w/g, char => char.toUpperCase());
console.log("Title case:", titleCase);

// Mask sensitive data
const creditCard = "Card: 4532-1234-5678-9012";
const masked = creditCard.replace(/(\d{4})-(\d{4})-(\d{4})-(\d{4})/, (m, g1, g2, g3, g4) => {
    return `****-****-****-${g4}`;
});
console.log("Masked:", masked);

// Replace with logic based on match
const status = "Tests: PASS, FAIL, PASS, SKIP, FAIL, PASS";
const emojiFree = status.replace(/PASS|FAIL|SKIP/g, (match) => {
    const map = { PASS: "PASSED (ok)", FAIL: "FAILED (!!)", SKIP: "SKIPPED (--)" };
    return map[match];
});
console.log("Status mapped:", emojiFree);


console.log("\n--- Example 4: replaceAll() ---");

// replaceAll with string (replaces all literal occurrences)
const str1 = "foo.bar.baz";
console.log("replaceAll string:", str1.replaceAll(".", "-"));
// Note: replace(".", "-") only replaces the first one

// replaceAll with regex REQUIRES the g flag
const str2 = "Hello 123 World 456";
console.log("replaceAll regex:", str2.replaceAll(/\d+/g, "#"));
// Without g flag, replaceAll throws TypeError

// Practical: normalize whitespace
const messy = "  too   many    spaces   here  ";
console.log("Normalized:", messy.replace(/\s+/g, " ").trim());

// Remove HTML tags
const htmlStr = "<p>Hello <strong>World</strong>! <a href='#'>Click</a></p>";
console.log("Strip tags:", htmlStr.replace(/<[^>]*>/g, ""));

// Escape regex special characters in a string
function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
console.log("Escaped:", escapeRegex("Price: $10.00 (USD)"));
console.log("Use in regex:", new RegExp(escapeRegex("$10.00")).test("The price is $10.00"));


console.log("\n--- Example 5: Named Capture Groups ---");

// (?<name>pattern) creates a named group
// Accessed via match.groups.name

const dateStr = "2024-01-15";
const datePattern = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const dateMatch = dateStr.match(datePattern);

if (dateMatch) {
    console.log("Full match:", dateMatch[0]);
    console.log("Named groups:", dateMatch.groups);
    console.log("Year:", dateMatch.groups.year);
    console.log("Month:", dateMatch.groups.month);
    console.log("Day:", dateMatch.groups.day);
}

// Named groups in replace (use $<name>)
const reformatted = dateStr.replace(
    /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/,
    "$<month>/$<day>/$<year>"
);
console.log("Reformatted:", reformatted);

// Complex example: parse a log line
const logLine = "2024-01-15T10:30:45.123Z [ERROR] auth-service: Login failed for user admin@example.com";
const logPattern = /(?<timestamp>\d{4}-\d{2}-\d{2}T[\d:.]+Z)\s+\[(?<level>\w+)\]\s+(?<service>[\w-]+):\s+(?<message>.*)/;
const logMatch = logLine.match(logPattern);

if (logMatch) {
    console.log("\nParsed log entry:");
    console.log("  Timestamp:", logMatch.groups.timestamp);
    console.log("  Level:", logMatch.groups.level);
    console.log("  Service:", logMatch.groups.service);
    console.log("  Message:", logMatch.groups.message);
}

// Named groups with exec() in a loop
const csvLine = "Alice,30,Engineer; Bob,25,Designer; Charlie,35,Manager";
const personPattern = /(?<name>\w+),(?<age>\d+),(?<role>\w+)/g;
let personMatch;
console.log("\nParsed people:");
while ((personMatch = personPattern.exec(csvLine)) !== null) {
    const { name, age, role } = personMatch.groups;
    console.log(`  ${name} (${age}) - ${role}`);
}


console.log("\n--- Example 6: split() with Regex ---");

// Basic split with string
console.log("Comma split:", "a,b,c,d".split(","));

// Split with regex for flexible delimiters
const data = "apple, banana;  cherry|  date ,fig";
console.log("Multi-delimiter:", data.split(/[,;|]\s*/));

// Split on whitespace (any amount)
const spaced = "  hello   world   foo   bar  ";
console.log("Whitespace split:", spaced.trim().split(/\s+/));

// Split keeping the delimiters (use capture group)
const sentence2 = "Hello. How are you? I am fine! Great.";
console.log("Keep delimiters:", sentence2.split(/([.!?])\s*/));

// Split on word boundaries
const camelCase = "thisIsCamelCaseVariable";
console.log("CamelCase split:", camelCase.split(/(?=[A-Z])/));
// (?=...) is a lookahead — splits before uppercase letters without consuming them

// Split with limit
const csv = "a,b,c,d,e,f";
console.log("Split limit 3:", csv.split(",", 3));


console.log("\n--- Example 7: Advanced Replace Patterns ---");

// CamelCase to kebab-case
function toKebabCase(str) {
    return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
console.log("camelToKebab:", toKebabCase("backgroundColor"));
console.log("camelToKebab:", toKebabCase("getElementByTestId"));
console.log("camelToKebab:", toKebabCase("XMLHttpRequest"));

// kebab-case to camelCase
function toCamelCase(str) {
    return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
}
console.log("kebabToCamel:", toCamelCase("background-color"));
console.log("kebabToCamel:", toCamelCase("data-test-id"));

// Snake_case to camelCase
function snakeToCamel(str) {
    return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
}
console.log("snakeToCamel:", snakeToCamel("user_first_name"));

// Slugify a string
function slugify(str) {
    return str
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")     // remove special chars
        .replace(/\s+/g, "-")          // spaces to hyphens
        .replace(/-+/g, "-")           // collapse multiple hyphens
        .replace(/^-|-$/g, "");        // trim hyphens
}
console.log("Slugify:", slugify("  Hello, World! This is a Test...  "));
console.log("Slugify:", slugify("JavaScript: The Good Parts (2024)"));


console.log("\n--- Example 8: Practical Test Data Transformations ---");

// Clean up scraped text from a web page
function cleanScrapedText(text) {
    return text
        .replace(/\s+/g, " ")              // normalize whitespace
        .replace(/^\s+|\s+$/g, "")          // trim
        .replace(/\u00A0/g, " ")            // replace non-breaking spaces
        .replace(/[""\u201C\u201D]/g, '"')  // normalize quotes
        .replace(/['\u2018\u2019]/g, "'")   // normalize apostrophes
        .replace(/\u2026/g, "...")           // normalize ellipsis
        .replace(/[\u2013\u2014]/g, "-");   // normalize dashes
}

const scraped = "  Hello\u00A0World   \u201CSmart quotes\u201D   and\u2026 more\u2014stuff  ";
console.log("Cleaned:", cleanScrapedText(scraped));

// Parse a table row from text
function parseTableRow(text, delimiter = /\s{2,}|\t/) {
    return text.trim().split(delimiter).map(cell => cell.trim());
}

const tableRow = "Alice Johnson    28    Engineer    San Francisco";
console.log("Parsed row:", parseTableRow(tableRow));

// Extract test IDs from a page source
const pageSource = `
<div data-testid="login-form">
    <input data-testid="email-input" />
    <input data-testid="password-input" />
    <button data-testid="submit-btn">Login</button>
</div>`;

const testIdPattern = /data-testid="([^"]+)"/g;
const testIds = [];
let idMatch;
while ((idMatch = testIdPattern.exec(pageSource)) !== null) {
    testIds.push(idMatch[1]);
}
console.log("\nExtracted test IDs:", testIds);

// Generate selector suggestions
testIds.forEach(id => {
    console.log(`  page.locator('[data-testid="${id}"]')`);
});


console.log("\n--- Example 9: Lookahead and Lookbehind ---");

// Positive lookahead (?=...) : match followed by pattern
const prices2 = "100 200USD 300EUR 400USD";
console.log("Before USD (?=USD):", prices2.match(/\d+(?=USD)/g));

// Negative lookahead (?!...) : match NOT followed by pattern
console.log("Not before USD (?!USD):", prices2.match(/\d+(?!USD|EUR|\d)/g));

// Positive lookbehind (?<=...) : match preceded by pattern
const amounts = "Price: $100, Cost: $200, Tax: $30";
console.log("After $ (?<=\\$):", amounts.match(/(?<=\$)\d+/g));

// Negative lookbehind (?<!...) : match NOT preceded by pattern
const numbers = "a1 $2 b3 $4 c5";
console.log("Not after $ (?<!\\$):", numbers.match(/(?<!\$)\b\d+/g));

// Practical: add commas to numbers
function addCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
console.log("With commas:", addCommas(1234567));
console.log("With commas:", addCommas(1234567890));


console.log("\n--- Example 10: matchAll() (Modern ES2020) ---");

// matchAll returns an iterator of all matches with full details
const text2 = "Call 123-456-7890 or 098-765-4321 for info";
const phoneRegex = /(\d{3})-(\d{3})-(\d{4})/g;

const allMatches = [...text2.matchAll(phoneRegex)];
console.log("matchAll results:");
allMatches.forEach((match, i) => {
    console.log(`  Match ${i + 1}: ${match[0]} at index ${match.index}`);
    console.log(`    Area: ${match[1]}, Prefix: ${match[2]}, Line: ${match[3]}`);
});

// matchAll with named groups
const text3 = "Alice is 30, Bob is 25, Charlie is 35";
const nameAge = /(?<personName>\w+) is (?<personAge>\d+)/g;

console.log("\nPeople (matchAll with named groups):");
for (const match of text3.matchAll(nameAge)) {
    console.log(`  ${match.groups.personName}: ${match.groups.personAge} years old`);
}


// === KEY TAKEAWAYS ===
// 1. replace() with /g flag replaces all occurrences; without g, only the first
// 2. Backreferences $1, $2 in replacement strings refer to captured groups
// 3. Replace callback function: replace(/pattern/g, (match, g1, g2, offset, str) => {...})
// 4. Named groups: (?<name>pattern) accessed via match.groups.name or $<name> in replace
// 5. split() with regex handles flexible/multiple delimiters elegantly
// 6. Lookahead (?=) and lookbehind (?<=) match positions without consuming characters
// 7. matchAll() (ES2020) returns iterator of all matches with full details — cleaner than exec() loop
// 8. Common transforms: camelCase/kebab-case conversion, slugify, text cleanup, data extraction
