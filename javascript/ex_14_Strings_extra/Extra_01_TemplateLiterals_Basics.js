// Extra_01_TemplateLiterals_Basics.js
// Topic: Template Literals - Part 1 of 6
// Extends: ex_14_Strings
//
// CONCEPT: Template literals use backticks (`) instead of quotes and allow embedded
// expressions via ${expression} syntax. Any valid JavaScript expression can go inside
// the ${} placeholder — variables, math, ternary operators, and even function calls.
// JAVA COMPARISON: Java has no direct equivalent. Java uses + concatenation or
// String.format("%s is %d years old", name, age). Template literals are far cleaner.
// PLAYWRIGHT RELEVANCE: Used everywhere — building selectors, log messages, assertion
// messages, constructing URLs, and formatting test descriptions dynamically.
// ============================================================

console.log("--- Example 1: Basic Interpolation vs Concatenation ---");

const firstName = "Alice";
const lastName = "Johnson";
const age = 28;

// Old way: string concatenation (like Java)
const oldWay = "Hello, " + firstName + " " + lastName + "! You are " + age + " years old.";
console.log("Concatenation:", oldWay);

// New way: template literals
const newWay = `Hello, ${firstName} ${lastName}! You are ${age} years old.`;
console.log("Template lit: ", newWay);

// Both produce the same result
console.log("Same result? ", oldWay === newWay);


console.log("\n--- Example 2: Expressions Inside ${} ---");

const price = 49.99;
const quantity = 3;
const taxRate = 0.08;

// Math expressions
console.log(`Subtotal: $${(price * quantity).toFixed(2)}`);
console.log(`Tax: $${(price * quantity * taxRate).toFixed(2)}`);
console.log(`Total: $${(price * quantity * (1 + taxRate)).toFixed(2)}`);

// Arithmetic operations
const a = 10;
const b = 3;
console.log(`${a} + ${b} = ${a + b}`);
console.log(`${a} - ${b} = ${a - b}`);
console.log(`${a} * ${b} = ${a * b}`);
console.log(`${a} / ${b} = ${(a / b).toFixed(2)}`);
console.log(`${a} % ${b} = ${a % b}`);


console.log("\n--- Example 3: Ternary Expressions Inside ${} ---");

const score = 85;
const isLoggedIn = true;
const userRole = "admin";
const itemCount = 0;

console.log(`Grade: ${score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F"}`);
console.log(`Status: ${isLoggedIn ? "Welcome back!" : "Please log in"}`);
console.log(`Access: ${userRole === "admin" ? "Full access granted" : "Limited access"}`);
console.log(`Cart: ${itemCount === 0 ? "Your cart is empty" : `${itemCount} item(s) in cart`}`);

// Nested template literal inside a ternary inside a template literal
const user = { name: "Bob", premium: true };
console.log(`Hello ${user.name}, ${user.premium ? `enjoy your premium benefits` : `consider upgrading`}!`);


console.log("\n--- Example 4: Function Calls Inside ${} ---");

function getGreeting(hour) {
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
}

function formatCurrency(amount) {
    return `$${amount.toFixed(2)}`;
}

function getInitials(first, last) {
    return `${first[0]}${last[0]}`.toUpperCase();
}

const currentHour = 14;
console.log(`${getGreeting(currentHour)}, ${firstName}!`);
console.log(`Your total is ${formatCurrency(price * quantity)}`);
console.log(`User initials: ${getInitials(firstName, lastName)}`);

// Built-in method calls
const sentence = "  Hello World  ";
console.log(`Trimmed: "${sentence.trim()}"`);
console.log(`Upper: "${firstName.toUpperCase()}"`);
console.log(`Repeat: "${firstName.repeat(3)}"`);
console.log(`Slice: "${firstName.slice(0, 3)}"`);


console.log("\n--- Example 5: Object Property Access Inside ${} ---");

const testResult = {
    testName: "Login Test",
    status: "passed",
    duration: 1234,
    browser: "chromium",
    retries: 0,
};

console.log(`Test: ${testResult.testName}`);
console.log(`Status: ${testResult.status.toUpperCase()}`);
console.log(`Duration: ${testResult.duration}ms (${(testResult.duration / 1000).toFixed(1)}s)`);
console.log(`Browser: ${testResult.browser}`);
console.log(`Retries: ${testResult.retries === 0 ? "None needed" : testResult.retries + " retries"}`);


console.log("\n--- Example 6: Array Access Inside ${} ---");

const browsers = ["chromium", "firefox", "webkit"];
const scores2 = [95, 87, 72, 91, 68];

console.log(`First browser: ${browsers[0]}`);
console.log(`Last browser: ${browsers[browsers.length - 1]}`);
console.log(`All browsers: ${browsers.join(", ")}`);
console.log(`Top score: ${Math.max(...scores2)}`);
console.log(`Average: ${(scores2.reduce((sum, s) => sum + s, 0) / scores2.length).toFixed(1)}`);


console.log("\n--- Example 7: Escaping Backticks and Dollar Signs ---");

// To include a literal backtick inside a template literal, escape it
console.log(`This has a backtick: \``);
console.log(`Code example: \`const x = 5;\``);

// To include a literal ${, escape the dollar sign
console.log(`Template syntax uses \${expression}`);
console.log(`Price is \$${price} (the first \$ is literal, second is interpolation)`);


console.log("\n--- Example 8: Comparing with Java's String.format ---");

// Java: String.format("User %s has %d points (%.1f%%)", name, points, percentage)
// JavaScript template literal equivalent:
const userName = "Charlie";
const points = 1500;
const percentage = 87.5;

console.log(`User ${userName} has ${points} points (${percentage}%)`);

// Java: String.format("%-20s | %5d | %6.2f", name, id, score)
// JavaScript equivalent with padding:
const id = 42;
const scoreVal = 95.5;
console.log(`${userName.padEnd(20)} | ${String(id).padStart(5)} | ${scoreVal.toFixed(2).padStart(6)}`);

// Formatting a simple table
const data = [
    { name: "Alice", id: 1, score: 95.5 },
    { name: "Bob", id: 2, score: 87.3 },
    { name: "Charlie", id: 13, score: 91.8 },
];

console.log(`${"Name".padEnd(10)} | ${"ID".padStart(4)} | ${"Score".padStart(6)}`);
console.log("-".repeat(26));
data.forEach(d => {
    console.log(`${d.name.padEnd(10)} | ${String(d.id).padStart(4)} | ${d.score.toFixed(1).padStart(6)}`);
});


// === KEY TAKEAWAYS ===
// 1. Template literals use backticks (`) — NOT single or double quotes
// 2. ${expression} can contain ANY valid JS expression: variables, math, ternary, function calls
// 3. They replace messy string concatenation (+ operator) and are far cleaner than Java's String.format
// 4. You can nest template literals inside ${} for complex expressions
// 5. Escape backticks with \` and dollar signs with \$ when needed
// 6. In Playwright: used for dynamic selectors, URLs, assertion messages, and test descriptions
