// Extra_04_Regex_Basics.js
// Topic: Regular Expressions Basics - Part 4 of 6
// Extends: ex_14_Strings
//
// CONCEPT: Regular expressions (regex) are patterns for matching text. JavaScript has
// built-in regex support via the /pattern/flags literal syntax and the RegExp constructor.
// They are used for validation, searching, extracting, and replacing text patterns.
// JAVA COMPARISON: Java uses Pattern.compile("regex") and Matcher. JavaScript regex
// literals /pattern/ are more concise. Both share the same core regex syntax.
// PLAYWRIGHT RELEVANCE: Used extensively — expect(locator).toHaveText(/pattern/),
// page.waitForURL(/regex/), route matching, and text content assertions.
// ============================================================

console.log("--- Example 1: Creating Regular Expressions ---");

// Method 1: Regex literal (preferred when pattern is known at compile time)
const regex1 = /hello/;
console.log("Literal regex:", regex1);
console.log("Type:", typeof regex1);
console.log("Is RegExp?", regex1 instanceof RegExp);

// Method 2: RegExp constructor (useful when pattern is dynamic)
const regex2 = new RegExp("hello");
console.log("Constructor regex:", regex2);

// Dynamic pattern from a variable
const searchTerm = "world";
const regex3 = new RegExp(searchTerm);
console.log("Dynamic regex:", regex3);

// They work the same way
console.log("Literal test:", regex1.test("hello world"));
console.log("Constructor test:", regex2.test("hello world"));


console.log("\n--- Example 2: Flags ---");

const text = "Hello hello HELLO hElLo";

// No flags: case-sensitive, first match only
console.log("No flags:", text.match(/hello/));

// i flag: case-insensitive
console.log("i flag:", text.match(/hello/i));

// g flag: global (find all matches)
console.log("g flag:", text.match(/hello/g));

// gi flags: global + case-insensitive
console.log("gi flags:", text.match(/hello/gi));

// m flag: multiline (^ and $ match line starts/ends)
const multiline = "first line\nsecond line\nthird line";
console.log("Without m:", multiline.match(/^second/));       // null (^ only matches start of whole string)
console.log("With m:", multiline.match(/^second/m));          // matches (^ matches start of each line)

// All flags listed
// g - global: find all matches, not just the first
// i - case insensitive
// m - multiline: ^ and $ match line boundaries
// s - dotAll: . matches newline characters too
// u - unicode: enable unicode features
// y - sticky: match from lastIndex position only

// Using flags with RegExp constructor
const regex4 = new RegExp("hello", "gi");
console.log("Constructor with flags:", text.match(regex4));


console.log("\n--- Example 3: test() Method ---");

// regex.test(string) returns true/false
const emailPattern = /\S+@\S+\.\S+/;

console.log("Valid email?", emailPattern.test("user@example.com"));    // true
console.log("Valid email?", emailPattern.test("not-an-email"));        // false
console.log("Valid email?", emailPattern.test("user@domain.co.uk"));   // true

// Common Playwright-like pattern: checking text content
const buttonText = "Submit Order (3 items)";
console.log("Has number?", /\d+/.test(buttonText));
console.log("Has 'Order'?", /Order/i.test(buttonText));
console.log("Matches pattern?", /Submit.*\(\d+ items\)/.test(buttonText));


console.log("\n--- Example 4: match() Method ---");

const str = "My phone is 123-456-7890 and office is 098-765-4321";

// Without g flag: returns first match with details
const firstMatch = str.match(/\d{3}-\d{3}-\d{4}/);
console.log("First match:", firstMatch[0]);
console.log("Index:", firstMatch.index);
console.log("Input:", firstMatch.input.substring(0, 30) + "...");

// With g flag: returns array of all matches (no details)
const allMatches = str.match(/\d{3}-\d{3}-\d{4}/g);
console.log("All matches:", allMatches);

// No match returns null
const noMatch = str.match(/xyz/);
console.log("No match:", noMatch);

// Always check for null before using results!
const result = str.match(/xyz/);
if (result) {
    console.log("Found:", result[0]);
} else {
    console.log("Pattern not found (safely handled)");
}


console.log("\n--- Example 5: exec() Method ---");

// regex.exec(string) returns one match at a time with full details
// Use with g flag and a loop to iterate all matches

const dateStr = "Events: 2024-01-15, 2024-03-20, 2024-07-04";
const dateRegex = /(\d{4})-(\d{2})-(\d{2})/g;

let match;
while ((match = dateRegex.exec(dateStr)) !== null) {
    console.log(`Full match: ${match[0]}`);
    console.log(`  Year: ${match[1]}, Month: ${match[2]}, Day: ${match[3]}`);
    console.log(`  Index: ${match.index}`);
    console.log(`  Next search from: ${dateRegex.lastIndex}`);
}


console.log("\n--- Example 6: Character Classes ---");

const sample = "abc 123 XYZ !@# a1b2 \t\n";

// \d - any digit [0-9]
console.log("Digits (\\d):", sample.match(/\d/g));

// \D - any non-digit
console.log("Non-digits (\\D):", sample.match(/\D/g)?.join("").trim());

// \w - word character [a-zA-Z0-9_]
console.log("Word chars (\\w):", sample.match(/\w/g));

// \W - non-word character
console.log("Non-word (\\W):", sample.match(/\W/g)?.map(c => JSON.stringify(c)));

// \s - whitespace (space, tab, newline, etc.)
console.log("Whitespace (\\s):", sample.match(/\s/g)?.map(c => JSON.stringify(c)));

// \S - non-whitespace
console.log("Non-whitespace (\\S):", sample.match(/\S/g));

// . - any character except newline (unless s flag)
console.log("Dot (.):", "a1!b".match(/./g));

// Custom character classes with []
console.log("Vowels [aeiou]:", "Hello World".match(/[aeiou]/gi));
console.log("Not vowels [^aeiou]:", "Hello".match(/[^aeiou]/gi));
console.log("Hex chars [0-9a-fA-F]:", "FF00cc 99 xyz GH".match(/[0-9a-fA-F]+/g));

// Ranges in character classes
console.log("Lowercase [a-z]:", "Hello World 123".match(/[a-z]+/g));
console.log("Uppercase [A-Z]:", "Hello World 123".match(/[A-Z]+/g));
console.log("Letters [a-zA-Z]:", "Hello World 123".match(/[a-zA-Z]+/g));


console.log("\n--- Example 7: Quantifiers ---");

const quantSample = "aaa bb c dddd 12 333 4444 55555";

// + : one or more
console.log("\\d+  (one or more digits):", quantSample.match(/\d+/g));
console.log("a+   (one or more a):", quantSample.match(/a+/g));

// * : zero or more
console.log("\\d*  (zero or more digits):", "abc123def".match(/[a-z]*\d*/g)?.filter(Boolean));

// ? : zero or one (optional)
console.log("colou?r:", "color colour".match(/colou?r/g));
console.log("https?:", "http://a https://b".match(/https?/g));

// {n} : exactly n
console.log("\\d{3}:", "12 123 1234 12345".match(/\d{3}/g));

// {n,} : n or more
console.log("\\d{3,}:", "12 123 1234 12345".match(/\d{3,}/g));

// {n,m} : between n and m
console.log("\\d{2,4}:", "1 12 123 1234 12345".match(/\d{2,4}/g));

// Greedy vs Lazy
const htmlStr = "<p>Hello</p><p>World</p>";
console.log("Greedy <.*>:", htmlStr.match(/<.*>/g));     // matches as much as possible
console.log("Lazy <.*?>:", htmlStr.match(/<.*?>/g));     // matches as little as possible


console.log("\n--- Example 8: Anchors and Boundaries ---");

const words = "cat concatenate catalog catch education";

// ^ - start of string (or line with m flag)
console.log("Starts with 'cat':", /^cat/.test("cat is here"));
console.log("Starts with 'cat':", /^cat/.test("the cat is here"));

// $ - end of string (or line with m flag)
console.log("Ends with 'here':", /here$/.test("cat is here"));
console.log("Ends with 'here':", /here$/.test("here is cat"));

// \b - word boundary
console.log("Word 'cat' (\\bcat\\b):", words.match(/\bcat\b/g));        // only whole word "cat"
console.log("Starts with 'cat' (\\bcat):", words.match(/\bcat\w*/g));   // words starting with "cat"

// Combining anchors
console.log("Exact match ^cat$:", /^cat$/.test("cat"));       // true
console.log("Exact match ^cat$:", /^cat$/.test("cats"));      // false


console.log("\n--- Example 9: Grouping and Alternation ---");

// () - grouping
const dateMatch = "2024-01-15".match(/(\d{4})-(\d{2})-(\d{2})/);
if (dateMatch) {
    console.log("Full:", dateMatch[0]);
    console.log("Year:", dateMatch[1]);
    console.log("Month:", dateMatch[2]);
    console.log("Day:", dateMatch[3]);
}

// | - alternation (OR)
console.log("cat|dog:", "I have a cat and a dog".match(/cat|dog/g));
console.log("(red|blue) car:", "red car, blue car, green car".match(/(red|blue) car/g));

// Non-capturing group (?:...)
const ncResult = "red car, blue car".match(/(?:red|blue) car/g);
console.log("Non-capturing:", ncResult);


console.log("\n--- Example 10: Practical Playwright-like Patterns ---");

// Pattern: checking if URL matches expected page
const urls = [
    "https://example.com/dashboard",
    "https://example.com/login",
    "https://example.com/users/42/profile",
    "https://example.com/api/v2/data",
];

const dashboardPattern = /\/dashboard$/;
const userProfilePattern = /\/users\/\d+\/profile$/;
const apiPattern = /\/api\/v\d+\//;

urls.forEach(url => {
    if (dashboardPattern.test(url)) console.log(`  Dashboard: ${url}`);
    if (userProfilePattern.test(url)) console.log(`  User profile: ${url}`);
    if (apiPattern.test(url)) console.log(`  API endpoint: ${url}`);
});

// Pattern: validating text content matches expected format
function assertTextMatches(actual, pattern) {
    const matches = pattern.test(actual);
    console.log(`  "${actual}" matches ${pattern}: ${matches ? "PASS" : "FAIL"}`);
    return matches;
}

console.log("\nText assertions:");
assertTextMatches("Total: $49.99", /Total: \$\d+\.\d{2}/);
assertTextMatches("3 items in cart", /\d+ items? in cart/);
assertTextMatches("Welcome, Alice!", /Welcome, \w+!/);
assertTextMatches("Page 2 of 10", /Page \d+ of \d+/);


// === KEY TAKEAWAYS ===
// 1. Two ways to create regex: /pattern/flags (literal) or new RegExp("pattern", "flags") (dynamic)
// 2. Key flags: g (global/all matches), i (case-insensitive), m (multiline anchors)
// 3. test() returns boolean, match() returns matches array, exec() returns detailed match info
// 4. Character classes: \d (digit), \w (word), \s (space), . (any), [] (custom set)
// 5. Quantifiers: + (1+), * (0+), ? (0-1), {n} (exact), {n,m} (range). Add ? for lazy
// 6. Anchors: ^ (start), $ (end), \b (word boundary)
// 7. Always check match()/exec() results for null before accessing — no match returns null
// 8. Playwright uses regex in toHaveText(), waitForURL(), route(), and other assertion methods
