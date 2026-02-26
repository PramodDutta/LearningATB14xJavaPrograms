// Extra_07_Chaining_Methods.js
// Topic: Method Chaining Pipelines - Part 7 of 7
// Extends: ex_16_Arrays
//
// CONCEPT: Array methods that return arrays (.filter(), .map(), .sort(), .flat(), etc.)
// can be chained together to build data processing pipelines. This functional style reads
// like a description of the transformation: "take this data, filter it, transform it,
// then reduce it to a result." Each step produces a new array for the next step.
// JAVA COMPARISON: Java Streams: list.stream().filter(...).map(...).collect(...).
// JavaScript chaining is more concise and doesn't require stream() or collect().
// PLAYWRIGHT RELEVANCE: Processing test results, transforming scraped page data, building
// test reports, and manipulating collections of element properties.
// ============================================================

console.log("--- Example 1: Basic Chaining ---");

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Filter -> Map -> Reduce pipeline
const sumOfDoubledEvens = numbers
    .filter(n => n % 2 === 0)     // [2, 4, 6, 8, 10]
    .map(n => n * 2)               // [4, 8, 12, 16, 20]
    .reduce((sum, n) => sum + n, 0); // 60

console.log("Sum of doubled evens:", sumOfDoubledEvens);

// Step-by-step breakdown
const step1 = numbers.filter(n => n % 2 === 0);
console.log("Step 1 (filter evens):", step1);

const step2 = step1.map(n => n * 2);
console.log("Step 2 (double):", step2);

const step3 = step2.reduce((sum, n) => sum + n, 0);
console.log("Step 3 (sum):", step3);


console.log("\n--- Example 2: Processing Test Results ---");

const testResults = [
    { name: "Login - valid credentials", suite: "auth", status: "passed", duration: 1200, browser: "chromium" },
    { name: "Login - invalid password", suite: "auth", status: "passed", duration: 800, browser: "chromium" },
    { name: "Login - empty fields", suite: "auth", status: "failed", duration: 500, browser: "chromium" },
    { name: "Add to cart", suite: "cart", status: "passed", duration: 2100, browser: "firefox" },
    { name: "Remove from cart", suite: "cart", status: "passed", duration: 1800, browser: "firefox" },
    { name: "Cart total calculation", suite: "cart", status: "failed", duration: 3400, browser: "firefox" },
    { name: "Search by keyword", suite: "search", status: "passed", duration: 900, browser: "webkit" },
    { name: "Search filters", suite: "search", status: "skipped", duration: 0, browser: "webkit" },
    { name: "Checkout flow", suite: "cart", status: "passed", duration: 5200, browser: "chromium" },
    { name: "User profile update", suite: "profile", status: "passed", duration: 1500, browser: "chromium" },
    { name: "Password change", suite: "profile", status: "failed", duration: 2200, browser: "firefox" },
    { name: "Session timeout", suite: "auth", status: "passed", duration: 4100, browser: "webkit" },
];

// Pipeline 1: Get names of failed tests, sorted alphabetically
const failedTestNames = testResults
    .filter(t => t.status === "failed")
    .map(t => t.name)
    .sort();

console.log("Failed tests:", failedTestNames);

// Pipeline 2: Average duration of passing tests
const avgPassedDuration = testResults
    .filter(t => t.status === "passed")
    .map(t => t.duration)
    .reduce((sum, d, _, arr) => sum + d / arr.length, 0);

console.log("Avg passed duration:", avgPassedDuration.toFixed(0), "ms");

// Pipeline 3: Slowest passing test
const slowestPassing = testResults
    .filter(t => t.status === "passed")
    .sort((a, b) => b.duration - a.duration)
    .map(t => `${t.name} (${t.duration}ms)`)
    [0];  // take first (slowest)

console.log("Slowest passing:", slowestPassing);

// Pipeline 4: Test summary by suite
const suiteReport = testResults
    .filter(t => t.status !== "skipped")
    .reduce((report, t) => {
        if (!report[t.suite]) {
            report[t.suite] = { passed: 0, failed: 0, totalDuration: 0 };
        }
        report[t.suite][t.status]++;
        report[t.suite].totalDuration += t.duration;
        return report;
    }, {});

console.log("\nSuite report:");
Object.entries(suiteReport).forEach(([suite, stats]) => {
    const total = stats.passed + stats.failed;
    const passRate = ((stats.passed / total) * 100).toFixed(0);
    console.log(`  ${suite}: ${stats.passed}/${total} passed (${passRate}%) - ${stats.totalDuration}ms total`);
});


console.log("\n--- Example 3: E-commerce Data Pipeline ---");

const orders = [
    { id: 1, customer: "Alice", items: [{ name: "Laptop", price: 999, qty: 1 }, { name: "Mouse", price: 25, qty: 2 }], date: "2024-01-15", status: "completed" },
    { id: 2, customer: "Bob", items: [{ name: "Keyboard", price: 75, qty: 1 }], date: "2024-01-16", status: "completed" },
    { id: 3, customer: "Alice", items: [{ name: "Monitor", price: 350, qty: 2 }, { name: "Cable", price: 10, qty: 3 }], date: "2024-01-17", status: "completed" },
    { id: 4, customer: "Charlie", items: [{ name: "Headphones", price: 150, qty: 1 }], date: "2024-01-17", status: "cancelled" },
    { id: 5, customer: "Bob", items: [{ name: "Laptop", price: 999, qty: 1 }, { name: "Case", price: 45, qty: 1 }], date: "2024-01-18", status: "completed" },
    { id: 6, customer: "Diana", items: [{ name: "Mouse", price: 25, qty: 3 }], date: "2024-01-18", status: "pending" },
];

// Pipeline: Revenue from completed orders
const revenue = orders
    .filter(o => o.status === "completed")
    .flatMap(o => o.items)
    .reduce((total, item) => total + (item.price * item.qty), 0);

console.log("Revenue (completed):", `$${revenue.toFixed(2)}`);

// Pipeline: Top spending customers
const customerSpending = orders
    .filter(o => o.status === "completed")
    .map(o => ({
        customer: o.customer,
        total: o.items.reduce((sum, item) => sum + item.price * item.qty, 0),
    }))
    .reduce((acc, o) => {
        acc[o.customer] = (acc[o.customer] || 0) + o.total;
        return acc;
    }, {});

const topCustomers = Object.entries(customerSpending)
    .sort((a, b) => b[1] - a[1])
    .map(([name, total]) => `${name}: $${total.toFixed(2)}`);

console.log("Top customers:", topCustomers);

// Pipeline: Most popular products (by quantity sold)
const productPopularity = orders
    .filter(o => o.status === "completed")
    .flatMap(o => o.items)
    .reduce((acc, item) => {
        acc[item.name] = (acc[item.name] || 0) + item.qty;
        return acc;
    }, {});

const rankedProducts = Object.entries(productPopularity)
    .sort((a, b) => b[1] - a[1])
    .map(([name, qty]) => `${name} (${qty} sold)`);

console.log("Product ranking:", rankedProducts);


console.log("\n--- Example 4: String Processing Pipeline ---");

const rawCSV = `
Name, Age, City, Score
  Alice Johnson , 28, New York, 95
  Bob Smith , 35,  Los Angeles , 87
  Charlie Brown , 22,Chicago, 72
  Diana Prince , 31, Houston , 91
  Eve Wilson , 27, Phoenix, 68
`;

// Parse CSV into structured data
const parsedData = rawCSV
    .trim()
    .split("\n")
    .map(line => line.split(",").map(cell => cell.trim()))
    .filter(row => row.length === 4 && row[0] !== "Name")  // skip header and malformed
    .map(([name, age, city, score]) => ({
        name,
        age: parseInt(age),
        city,
        score: parseInt(score),
    }));

console.log("Parsed CSV:");
parsedData.forEach(d => console.log(`  ${d.name} (${d.age}) from ${d.city}: ${d.score}`));

// Pipeline on parsed data: passing students from large cities
const passingFromBigCities = parsedData
    .filter(d => d.score >= 70)
    .filter(d => ["New York", "Los Angeles", "Chicago", "Houston"].includes(d.city))
    .map(d => `${d.name} (${d.city}): ${d.score}`)
    .sort();

console.log("Passing, big city:", passingFromBigCities);


console.log("\n--- Example 5: Chaining with sort() ---");

const employees = [
    { name: "Alice", dept: "Engineering", salary: 95000 },
    { name: "Bob", dept: "Marketing", salary: 72000 },
    { name: "Charlie", dept: "Engineering", salary: 88000 },
    { name: "Diana", dept: "Marketing", salary: 68000 },
    { name: "Eve", dept: "Engineering", salary: 105000 },
    { name: "Frank", dept: "Sales", salary: 62000 },
    { name: "Grace", dept: "Sales", salary: 71000 },
    { name: "Henry", dept: "Engineering", salary: 92000 },
];

// Top 3 earners in Engineering
const topEngineers = employees
    .filter(e => e.dept === "Engineering")
    .sort((a, b) => b.salary - a.salary)
    .slice(0, 3)
    .map(e => `${e.name}: $${e.salary.toLocaleString()}`);

console.log("Top 3 Engineers:", topEngineers);

// Average salary by department
const deptSalaries = employees
    .reduce((acc, e) => {
        if (!acc[e.dept]) acc[e.dept] = { total: 0, count: 0 };
        acc[e.dept].total += e.salary;
        acc[e.dept].count++;
        return acc;
    }, {});

const avgSalaries = Object.entries(deptSalaries)
    .map(([dept, { total, count }]) => ({ dept, avg: total / count }))
    .sort((a, b) => b.avg - a.avg)
    .map(d => `${d.dept}: $${d.avg.toLocaleString(undefined, { maximumFractionDigits: 0 })}`);

console.log("Avg salary by dept:", avgSalaries);

// IMPORTANT: sort() modifies the array in place!
// Use .slice() or spread [...arr] before sort to avoid mutating
const original = [3, 1, 4, 1, 5, 9];
const sorted = [...original].sort((a, b) => a - b);  // spread to copy first
console.log("Original (unchanged):", original);
console.log("Sorted copy:", sorted);


console.log("\n--- Example 6: Building a Test Report Pipeline ---");

// Simulate Playwright test run data
const allTests = [
    { file: "auth.spec.js", name: "login success", status: "passed", duration: 1200, retries: 0 },
    { file: "auth.spec.js", name: "login failure", status: "passed", duration: 800, retries: 0 },
    { file: "auth.spec.js", name: "session expired", status: "failed", duration: 3000, retries: 2 },
    { file: "cart.spec.js", name: "add item", status: "passed", duration: 1500, retries: 0 },
    { file: "cart.spec.js", name: "remove item", status: "passed", duration: 1100, retries: 1 },
    { file: "cart.spec.js", name: "update qty", status: "failed", duration: 4500, retries: 2 },
    { file: "search.spec.js", name: "basic search", status: "passed", duration: 900, retries: 0 },
    { file: "search.spec.js", name: "filter results", status: "skipped", duration: 0, retries: 0 },
    { file: "checkout.spec.js", name: "complete purchase", status: "passed", duration: 5200, retries: 0 },
    { file: "checkout.spec.js", name: "payment error", status: "flaky", duration: 3800, retries: 3 },
];

// Build comprehensive report
const report = {
    // Total counts
    total: allTests.length,
    passed: allTests.filter(t => t.status === "passed").length,
    failed: allTests.filter(t => t.status === "failed").length,
    skipped: allTests.filter(t => t.status === "skipped").length,
    flaky: allTests.filter(t => t.status === "flaky").length,

    // Total duration (excluding skipped)
    totalDuration: allTests
        .filter(t => t.status !== "skipped")
        .reduce((sum, t) => sum + t.duration, 0),

    // Tests that needed retries
    retriedTests: allTests
        .filter(t => t.retries > 0)
        .map(t => `${t.name} (${t.retries} retries)`)
        .join(", "),

    // Slowest tests (top 3)
    slowest: allTests
        .filter(t => t.status !== "skipped")
        .sort((a, b) => b.duration - a.duration)
        .slice(0, 3)
        .map(t => `${t.name}: ${t.duration}ms`),

    // By file summary
    byFile: [...new Set(allTests.map(t => t.file))]
        .map(file => {
            const fileTests = allTests.filter(t => t.file === file);
            return {
                file,
                total: fileTests.length,
                passed: fileTests.filter(t => t.status === "passed").length,
                failed: fileTests.filter(t => t.status === "failed" || t.status === "flaky").length,
            };
        }),
};

console.log("Test Report:");
console.log(`  Total: ${report.total} (${report.passed} passed, ${report.failed} failed, ${report.skipped} skipped, ${report.flaky} flaky)`);
console.log(`  Duration: ${(report.totalDuration / 1000).toFixed(1)}s`);
console.log(`  Retried: ${report.retriedTests}`);
console.log(`  Slowest: ${report.slowest.join(" | ")}`);
console.log("  By file:");
report.byFile.forEach(f => {
    const passRate = ((f.passed / f.total) * 100).toFixed(0);
    console.log(`    ${f.file}: ${f.passed}/${f.total} (${passRate}%)`);
});


console.log("\n--- Example 7: Advanced Pipeline Patterns ---");

// Pattern: Debug a pipeline by tapping into each step
function tap(label) {
    return function (arr) {
        console.log(`  [${label}]:`, arr.length, "items");
        return arr;
    };
}

// Using tap helper (wrap in a function that returns the array)
function tapLog(label, arr) {
    console.log(`  [${label}]:`, JSON.stringify(arr.slice(0, 3)), arr.length > 3 ? `... (${arr.length} total)` : "");
    return arr;
}

const debugResult = tapLog("start",
    [5, 3, 8, 1, 9, 2, 7, 4, 6, 10]
);

const pipeline = [5, 3, 8, 1, 9, 2, 7, 4, 6, 10];
console.log("Debug pipeline:");
const debugged = tapLog("filtered",
    tapLog("original", pipeline)
        .filter(n => n > 3)
).map(n => n * 10);
tapLog("mapped", debugged);

// Pattern: Conditional chaining
function processData(data, options = {}) {
    let result = [...data];

    if (options.filterActive) {
        result = result.filter(item => item.active);
    }
    if (options.sortBy) {
        result = result.sort((a, b) =>
            String(a[options.sortBy]).localeCompare(String(b[options.sortBy]))
        );
    }
    if (options.limit) {
        result = result.slice(0, options.limit);
    }
    if (options.fields) {
        result = result.map(item =>
            options.fields.reduce((obj, field) => {
                obj[field] = item[field];
                return obj;
            }, {})
        );
    }

    return result;
}

const userData = [
    { name: "Alice", age: 28, active: true },
    { name: "Bob", age: 35, active: false },
    { name: "Charlie", age: 22, active: true },
    { name: "Diana", age: 31, active: true },
    { name: "Eve", age: 27, active: true },
];

console.log("\nConditional pipeline:");
const processed = processData(userData, {
    filterActive: true,
    sortBy: "name",
    limit: 3,
    fields: ["name", "age"],
});
console.log("Result:", processed);


console.log("\n--- Example 8: Performance Considerations ---");

// Multiple passes vs single pass
const bigArray = Array.from({ length: 1000 }, (_, i) => ({
    value: Math.random() * 100,
    category: ["A", "B", "C"][i % 3],
}));

// Multi-pass (readable but iterates multiple times)
console.time("Multi-pass");
const multiResult = bigArray
    .filter(item => item.category === "A")
    .filter(item => item.value > 50)
    .map(item => item.value)
    .reduce((sum, val) => sum + val, 0);
console.timeEnd("Multi-pass");
console.log("Multi-pass result:", multiResult.toFixed(2));

// Single-pass with reduce (more efficient, less readable)
console.time("Single-pass");
const singleResult = bigArray.reduce((sum, item) => {
    if (item.category === "A" && item.value > 50) {
        return sum + item.value;
    }
    return sum;
}, 0);
console.timeEnd("Single-pass");
console.log("Single-pass result:", singleResult.toFixed(2));

// Both produce the same result
console.log("Same result?", multiResult.toFixed(2) === singleResult.toFixed(2));

// RULE OF THUMB:
// - For small-to-medium arrays (< 10,000): prioritize readability with chaining
// - For large arrays or hot paths: consider single-pass reduce
// - For Playwright tests: always prioritize readability (test data is small)


console.log("\n--- Example 9: Real-World Playwright Data Processing ---");

// Simulated scraped page data
const scrapedProducts = [
    { text: "  Wireless Mouse - $25.99  ", href: "/products/1", classes: "product available" },
    { text: "  Gaming Keyboard - $79.99  ", href: "/products/2", classes: "product available featured" },
    { text: "  USB Hub - $12.50  ", href: "/products/3", classes: "product unavailable" },
    { text: "  Webcam HD - $49.99  ", href: "/products/4", classes: "product available" },
    { text: "  Laptop Stand - $35.00  ", href: "/products/5", classes: "product available featured" },
    { text: "  Cable Pack - $8.99  ", href: "/products/6", classes: "product unavailable" },
    { text: "  Monitor Light - $45.00  ", href: "/products/7", classes: "product available" },
];

// Pipeline: Get sorted list of available featured products with parsed prices
const featuredAvailable = scrapedProducts
    .filter(p => p.classes.includes("available"))           // only available
    .filter(p => p.classes.includes("featured"))            // only featured
    .map(p => {
        const text = p.text.trim();
        const match = text.match(/^(.+) - \$(.+)$/);
        return {
            name: match ? match[1] : text,
            price: match ? parseFloat(match[2]) : 0,
            url: `https://example.com${p.href}`,
        };
    })
    .sort((a, b) => a.price - b.price);

console.log("Featured & available:");
featuredAvailable.forEach(p => {
    console.log(`  ${p.name}: $${p.price.toFixed(2)} (${p.url})`);
});

// Pipeline: Price statistics for available products
const availablePrices = scrapedProducts
    .filter(p => p.classes.includes("available"))
    .map(p => {
        const match = p.text.match(/\$(\d+\.?\d*)/);
        return match ? parseFloat(match[1]) : 0;
    })
    .filter(price => price > 0);

const priceStats = {
    count: availablePrices.length,
    min: Math.min(...availablePrices),
    max: Math.max(...availablePrices),
    avg: availablePrices.reduce((sum, p) => sum + p, 0) / availablePrices.length,
    total: availablePrices.reduce((sum, p) => sum + p, 0),
};

console.log("\nPrice statistics (available):");
console.log(`  Count: ${priceStats.count}`);
console.log(`  Range: $${priceStats.min.toFixed(2)} - $${priceStats.max.toFixed(2)}`);
console.log(`  Average: $${priceStats.avg.toFixed(2)}`);
console.log(`  Total: $${priceStats.total.toFixed(2)}`);


// === KEY TAKEAWAYS ===
// 1. Chain .filter().map().reduce() to build readable data processing pipelines
// 2. Each method in the chain receives the array returned by the previous method
// 3. filter -> select elements | map -> transform elements | reduce -> aggregate to single value
// 4. Use .sort() with spread [...arr].sort() to avoid mutating the original array
// 5. Use .slice(0, n) in chains to limit results (like SQL LIMIT)
// 6. Use .flatMap() when you need to flatten and map in one step
// 7. For Playwright: prioritize readability over performance (test data is always small)
// 8. Single-pass reduce is more efficient but less readable — use for large datasets only
// 9. Debug pipelines by inserting tap/log steps to inspect intermediate results
// 10. Chaining is JavaScript's answer to Java Streams — same concept, less ceremony
