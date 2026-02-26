// Extra_03_ArrowFunction_Callbacks.js
// Topic: Arrow Functions as Callbacks - Part 3 of 8
// Extends: ex_13_Functions
//
// CONCEPT: Arrow functions shine brightest as callbacks - short functions passed
// to other functions. They make array methods, timers, and event-style patterns
// concise and readable while preserving the expected `this` binding.
// JAVA COMPARISON: Similar to Java streams API: list.stream().map(x -> x * 2),
// but JS arrow callbacks are used even more pervasively across the language.
// PLAYWRIGHT RELEVANCE: Nearly every Playwright API uses arrow callbacks:
// page.evaluate(() => document.title), test('name', async ({ page }) => {}),
// expect(locator).toHaveText(), and page.waitForResponse(resp => resp.ok()).
// ============================================================

console.log("--- Example 1: Arrow Callbacks with setTimeout ---");

// setTimeout takes a callback function and a delay in milliseconds
// Arrow functions are the cleanest way to write these

// Simple delayed message
setTimeout(() => console.log("  [50ms] Hello from setTimeout!"), 50);

// With a variable from outer scope (closure + arrow)
const username = "Alice";
setTimeout(() => console.log(`  [100ms] Welcome, ${username}!`), 100);

// Multi-line callback with block body
setTimeout(() => {
    const now = new Date().toISOString();
    console.log(`  [150ms] Timestamp: ${now}`);
    console.log("  [150ms] This runs after 150ms");
}, 150);

// Compare: regular function callback (more verbose)
setTimeout(function() {
    console.log("  [200ms] Regular function callback (works but verbose)");
}, 200);

console.log("  [0ms] This runs first (synchronous)");


console.log("\n--- Example 2: Arrow Callbacks with setInterval ---");
// setInterval repeats a callback at a fixed interval
let countdown = 5;
const intervalId = setInterval(() => {
    if (countdown > 0) {
        // Using process.stdout.write to stay on same concept
        console.log(`  Countdown: ${countdown}`);
        countdown--;
    } else {
        console.log("  Countdown: DONE!");
        clearInterval(intervalId); // Stop the interval
    }
}, 30); // Fast interval for demo purposes


console.log("\n--- Example 3: Arrows in Array .map() ---");
// .map() transforms each element using the callback
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(x => x * 2);
console.log("Original:", numbers);
console.log("Doubled:", doubled);

const squared = numbers.map(x => x ** 2);
console.log("Squared:", squared);

const asStrings = numbers.map(x => `Item #${x}`);
console.log("As strings:", asStrings);

// Map with index parameter
const withIndex = numbers.map((value, index) => `[${index}] = ${value}`);
console.log("With index:", withIndex);

// Map objects to extract specific fields
const users = [
    { name: "Alice", age: 30, role: "admin" },
    { name: "Bob", age: 25, role: "editor" },
    { name: "Charlie", age: 35, role: "viewer" }
];
const names = users.map(u => u.name);
console.log("Names:", names);

const summaries = users.map(u => `${u.name} (${u.role})`);
console.log("Summaries:", summaries);


console.log("\n--- Example 4: Arrows in Array .filter() ---");
// .filter() keeps elements where the callback returns true
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evens = nums.filter(n => n % 2 === 0);
console.log("Evens:", evens);

const bigNums = nums.filter(n => n > 5);
console.log("Greater than 5:", bigNums);

// Filter objects
const adults = users.filter(u => u.age >= 30);
console.log("Adults (30+):", adults.map(u => u.name));

const nonAdmins = users.filter(u => u.role !== "admin");
console.log("Non-admins:", nonAdmins.map(u => u.name));

// Chaining filter + map
const adultNames = users
    .filter(u => u.age >= 30)
    .map(u => u.name.toUpperCase());
console.log("Adult names (uppercase):", adultNames);


console.log("\n--- Example 5: Arrows in Array .reduce() ---");
// .reduce() accumulates a single value from all elements
const prices = [29.99, 9.99, 49.99, 14.99, 5.00];

const total = prices.reduce((sum, price) => sum + price, 0);
console.log("Prices:", prices);
console.log("Total:", total.toFixed(2));

const max = prices.reduce((best, price) => price > best ? price : best, 0);
console.log("Max price:", max);

// Reduce to build an object
const fruits = ["apple", "banana", "apple", "cherry", "banana", "apple"];
const fruitCount = fruits.reduce((counts, fruit) => {
    counts[fruit] = (counts[fruit] || 0) + 1;
    return counts;
}, {});
console.log("Fruit counts:", fruitCount);

// Reduce with objects
const totalAge = users.reduce((sum, u) => sum + u.age, 0);
console.log("Total age:", totalAge);
console.log("Average age:", (totalAge / users.length).toFixed(1));


console.log("\n--- Example 6: Arrows in .find(), .some(), .every() ---");
const products = [
    { id: 1, name: "Laptop", price: 999, inStock: true },
    { id: 2, name: "Phone", price: 699, inStock: false },
    { id: 3, name: "Tablet", price: 499, inStock: true },
    { id: 4, name: "Watch", price: 299, inStock: true }
];

// .find() returns the FIRST matching element
const phone = products.find(p => p.name === "Phone");
console.log("Found phone:", phone);

const cheapItem = products.find(p => p.price < 400);
console.log("First cheap item:", cheapItem);

// .some() returns true if ANY element matches
const hasExpensive = products.some(p => p.price > 900);
console.log("Has expensive item:", hasExpensive);

const allOutOfStock = products.some(p => !p.inStock);
console.log("Some out of stock:", allOutOfStock);

// .every() returns true if ALL elements match
const allInStock = products.every(p => p.inStock);
console.log("All in stock:", allInStock);

const allUnder2000 = products.every(p => p.price < 2000);
console.log("All under $2000:", allUnder2000);

// .findIndex() returns the index of first match
const tabletIndex = products.findIndex(p => p.name === "Tablet");
console.log("Tablet index:", tabletIndex);


console.log("\n--- Example 7: Arrows in .sort() ---");
const unsorted = [3, 1, 4, 1, 5, 9, 2, 6];

// Sort ascending (arrow as comparator)
const ascending = [...unsorted].sort((a, b) => a - b);
console.log("Ascending:", ascending);

// Sort descending
const descending = [...unsorted].sort((a, b) => b - a);
console.log("Descending:", descending);

// Sort objects by property
const byPrice = [...products].sort((a, b) => a.price - b.price);
console.log("By price:", byPrice.map(p => `${p.name}: $${p.price}`));

// Sort strings alphabetically
const words = ["banana", "Apple", "cherry", "date"];
const sorted = [...words].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
console.log("Sorted words:", sorted);


console.log("\n--- Example 8: Chaining Multiple Array Methods ---");
const orders = [
    { customer: "Alice", amount: 120, status: "completed" },
    { customer: "Bob", amount: 85, status: "pending" },
    { customer: "Charlie", amount: 200, status: "completed" },
    { customer: "Diana", amount: 50, status: "cancelled" },
    { customer: "Eve", amount: 175, status: "completed" },
    { customer: "Frank", amount: 95, status: "pending" }
];

// Chain: filter -> map -> sort -> reduce
const completedTotal = orders
    .filter(o => o.status === "completed")               // only completed
    .map(o => ({ customer: o.customer, amount: o.amount })) // extract fields
    .sort((a, b) => b.amount - a.amount)                 // sort by amount desc
    .reduce((sum, o) => {
        console.log(`  ${o.customer}: $${o.amount}`);
        return sum + o.amount;
    }, 0);                                                // sum up

console.log("Completed orders total: $" + completedTotal);

// Another chain: group pending customers
const pendingCustomers = orders
    .filter(o => o.status === "pending")
    .map(o => o.customer)
    .join(", ");
console.log("Pending customers:", pendingCustomers);


console.log("\n--- Example 9: Event-Handler-Style Patterns ---");
// Simulating event handler patterns (like Playwright or DOM events)

// Simple event emitter pattern
class SimpleEmitter {
    constructor() {
        this.handlers = {};
    }

    on(event, handler) {
        if (!this.handlers[event]) this.handlers[event] = [];
        this.handlers[event].push(handler);
    }

    emit(event, data) {
        const handlers = this.handlers[event] || [];
        handlers.forEach(handler => handler(data));
    }
}

const emitter = new SimpleEmitter();

// Registering handlers with arrow callbacks
emitter.on("login", (user) => console.log(`  User logged in: ${user.name}`));
emitter.on("login", (user) => console.log(`  Setting session for: ${user.name}`));
emitter.on("error", (err) => console.log(`  Error occurred: ${err.message}`));

// Emit events
emitter.emit("login", { name: "Alice", role: "admin" });
emitter.emit("error", { message: "Connection timeout" });


console.log("\n--- Example 10: Playwright-Style Patterns (Simulated) ---");
// These patterns mirror real Playwright API usage

// Simulated page object
const page = {
    title: "Test Page",
    url: "https://example.com",
    content: "<h1>Hello</h1><p>World</p>",
    elements: [
        { tag: "h1", text: "Hello", visible: true },
        { tag: "p", text: "World", visible: true },
        { tag: "span", text: "Hidden", visible: false }
    ],

    // Simulates page.evaluate()
    evaluate(fn) {
        return fn({ title: this.title, url: this.url });
    },

    // Simulates page.waitForResponse()
    waitForResponse(predicate) {
        const mockResponses = [
            { url: "/api/users", status: 200 },
            { url: "/api/data", status: 404 },
            { url: "/api/users", status: 201 }
        ];
        return mockResponses.find(predicate);
    },

    // Simulates locator.filter()
    locatorFilter(predicate) {
        return this.elements.filter(predicate);
    }
};

// Pattern 1: page.evaluate(() => document.title)
const title = page.evaluate((doc) => doc.title);
console.log("Page title:", title);

// Pattern 2: page.waitForResponse(resp => resp.url.includes('/api'))
const apiResponse = page.waitForResponse(resp => resp.url === "/api/users" && resp.status === 200);
console.log("API response:", apiResponse);

// Pattern 3: locator.filter with arrow
const visibleElements = page.locatorFilter(el => el.visible);
console.log("Visible elements:", visibleElements.map(el => el.text));

// Pattern 4: Complex filter + map chain (like finding specific elements)
const headings = page.elements
    .filter(el => el.tag === "h1" && el.visible)
    .map(el => el.text);
console.log("Visible headings:", headings);


console.log("\n--- Example 11: Arrows in .forEach() vs for...of ---");
const items = ["apple", "banana", "cherry"];

// forEach with arrow (functional style)
console.log("forEach with arrow:");
items.forEach((item, i) => console.log(`  ${i}: ${item}`));

// for...of loop (imperative style - no callback needed)
console.log("for...of loop:");
for (const item of items) {
    console.log(`  - ${item}`);
}

// forEach cannot be broken out of; for...of can
console.log("for...of with break:");
for (const item of items) {
    if (item === "banana") {
        console.log(`  Found ${item}, stopping!`);
        break;
    }
    console.log(`  Checking ${item}...`);
}


// === KEY TAKEAWAYS ===
// 1. Arrow callbacks make setTimeout/setInterval clean: setTimeout(() => ..., 100)
// 2. Array methods + arrows = concise data transformations: .map(x => x * 2)
// 3. Chain array methods for complex data processing: .filter().map().sort().reduce()
// 4. .find() returns first match, .some() checks if any match, .every() checks all
// 5. .sort((a, b) => a - b) for ascending, (a, b) => b - a for descending
// 6. Event handler patterns use arrows: emitter.on('event', (data) => {...})
// 7. Playwright uses arrows everywhere: evaluate, waitForResponse, filter, test callbacks
// 8. forEach with arrows is readable but cannot break; use for...of when break is needed
// 9. Java parallel: list.stream().filter(x -> x > 5).map(x -> x * 2) mirrors JS chains
