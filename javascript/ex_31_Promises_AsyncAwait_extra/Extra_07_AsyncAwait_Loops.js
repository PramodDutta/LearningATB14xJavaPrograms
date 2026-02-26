// Extra_07_AsyncAwait_Loops.js
// Topic: async/await with Loops - Part 7 of 8
// Extends: ex_31 (Promises & Async/Await)
//
// CONCEPT: Combining async/await with loops requires understanding when operations run
// sequentially vs in parallel. for...of with await runs one at a time. Promise.all with
// map runs everything in parallel. forEach with async is a common BUG — it doesn't await.
// JAVA COMPARISON: Java streams with CompletableFuture are complex. JavaScript makes
//   sequential async loops trivial with for...of + await.
// PLAYWRIGHT RELEVANCE: Iterating over elements, processing lists of test data, running
//   assertions on multiple elements — all require async loops.
// ============================================================

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function processItem(item, delayMs = 50) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ item, processed: true, time: delayMs });
        }, delayMs);
    });
}

function fetchPage(pageNum, delayMs = 40) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                page: pageNum,
                items: [`item_${pageNum}a`, `item_${pageNum}b`, `item_${pageNum}c`]
            });
        }, delayMs);
    });
}

console.log("--- Example 1: Sequential — for...of with await ---");
// Items processed ONE AT A TIME, in order.

async function sequentialProcessing() {
    const items = ["apple", "banana", "cherry", "date"];
    const start = Date.now();

    console.log("  Processing items sequentially:");
    const results = [];
    for (const item of items) {
        const result = await processItem(item, 50);
        console.log(`    Processed: ${result.item}`);
        results.push(result);
    }

    const elapsed = Date.now() - start;
    console.log(`  Done in ~${elapsed}ms (sequential: ~200ms for 4 items at 50ms each)`);
    return results;
}

sequentialProcessing();

console.log("\n--- Example 2: Parallel — Promise.all with map ---");
// ALL items processed AT THE SAME TIME.

async function parallelProcessing() {
    const items = ["apple", "banana", "cherry", "date"];
    const start = Date.now();

    console.log("  Processing items in parallel:");
    const results = await Promise.all(
        items.map(async (item) => {
            const result = await processItem(item, 50);
            console.log(`    Processed: ${result.item}`);
            return result;
        })
    );

    const elapsed = Date.now() - start;
    console.log(`  Done in ~${elapsed}ms (parallel: ~50ms for all items)`);
    console.log(`  Results: ${results.map(r => r.item).join(", ")}`);
    return results;
}

parallelProcessing();

console.log("\n--- Example 3: DON'T — forEach with async (BROKEN!) ---");

async function brokenForEach() {
    const items = ["first", "second", "third"];
    const results = [];

    console.log("  Starting forEach (broken)...");

    // WARNING: forEach does NOT await async callbacks!
    items.forEach(async (item) => {
        const result = await processItem(item, 50);
        results.push(result);
        // These run but are NOT awaited by the outer function
    });

    // This runs IMMEDIATELY — before ANY item is processed!
    console.log(`  Results IMMEDIATELY after forEach: ${results.length} items`);
    console.log("  Expected 3 but got 0! forEach doesn't await.");

    // Wait a bit to show they DO complete eventually:
    await delay(200);
    console.log(`  After waiting 200ms: ${results.length} items (they did finish)`);
}

brokenForEach();

console.log("\n--- Example 4: for Loop (Classic) with await ---");

async function classicForLoop() {
    const urls = ["/page/1", "/page/2", "/page/3", "/page/4", "/page/5"];

    console.log("  Classic for loop with await:");
    for (let i = 0; i < urls.length; i++) {
        const result = await processItem(urls[i], 30);
        console.log(`    [${i}] ${result.item} - done`);
    }
    console.log("  All pages fetched sequentially");
}

classicForLoop();

console.log("\n--- Example 5: while Loop with await ---");

async function pollUntilReady() {
    let attempts = 0;
    const maxAttempts = 5;
    let ready = false;

    console.log("  Polling until ready...");

    while (!ready && attempts < maxAttempts) {
        attempts++;
        await delay(40);
        // Simulate: becomes ready on attempt 3
        ready = attempts >= 3;
        console.log(`    Attempt ${attempts}: ready=${ready}`);
    }

    if (ready) {
        console.log(`  Ready after ${attempts} attempts!`);
    } else {
        console.log(`  Gave up after ${maxAttempts} attempts`);
    }
}

pollUntilReady();

console.log("\n--- Example 6: for...of with Index (entries) ---");

async function processWithIndex() {
    const testCases = [
        { name: "Login Test", input: "admin" },
        { name: "Search Test", input: "query" },
        { name: "Logout Test", input: "bye" }
    ];

    console.log("  Processing test cases with index:");
    for (const [index, testCase] of testCases.entries()) {
        const result = await processItem(testCase.name, 30);
        console.log(`    Test ${index + 1}/${testCases.length}: ${result.item}`);
    }
}

processWithIndex();

console.log("\n--- Example 7: Timing Comparison — Sequential vs Parallel ---");

async function timingComparison() {
    const items = Array.from({ length: 5 }, (_, i) => `item_${i + 1}`);
    const perItemDelay = 60;

    // Sequential
    const seqStart = Date.now();
    for (const item of items) {
        await processItem(item, perItemDelay);
    }
    const seqTime = Date.now() - seqStart;

    // Parallel
    const parStart = Date.now();
    await Promise.all(items.map(item => processItem(item, perItemDelay)));
    const parTime = Date.now() - parStart;

    console.log("  Timing comparison (5 items, 60ms each):");
    console.log(`    Sequential: ~${seqTime}ms (expected ~${5 * perItemDelay}ms)`);
    console.log(`    Parallel:   ~${parTime}ms (expected ~${perItemDelay}ms)`);
    console.log(`    Speedup:    ~${(seqTime / parTime).toFixed(1)}x`);
}

timingComparison();

console.log("\n--- Example 8: Controlled Concurrency (Batched Parallel) ---");
// Sometimes you want parallel, but limited to N at a time.

async function processBatch(items, batchSize, processor) {
    const results = [];
    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        console.log(`    Batch ${Math.floor(i / batchSize) + 1}: [${batch.join(", ")}]`);
        const batchResults = await Promise.all(
            batch.map(item => processor(item))
        );
        results.push(...batchResults);
    }
    return results;
}

async function batchExample() {
    const items = Array.from({ length: 10 }, (_, i) => `task_${i + 1}`);
    const start = Date.now();

    console.log("  Processing 10 items in batches of 3:");
    const results = await processBatch(items, 3, (item) => processItem(item, 50));

    console.log(`  Completed ${results.length} items in ~${Date.now() - start}ms`);
    console.log("  (4 batches: 3+3+3+1, each batch ~50ms = ~200ms total)");
}

batchExample();

console.log("\n--- Example 9: Pagination — Sequential Page Fetching ---");

async function fetchAllPages() {
    const allItems = [];
    let currentPage = 1;
    const totalPages = 4;

    console.log("  Fetching paginated data:");
    while (currentPage <= totalPages) {
        const pageData = await fetchPage(currentPage, 30);
        console.log(`    Page ${pageData.page}: ${pageData.items.join(", ")}`);
        allItems.push(...pageData.items);
        currentPage++;
    }

    console.log(`  Total items collected: ${allItems.length}`);
    console.log(`  All items: ${allItems.join(", ")}`);
}

fetchAllPages();

console.log("\n--- Example 10: Async Generator (Advanced) ---");
// Async generators combine generators with async/await.

async function* generatePages(totalPages) {
    for (let page = 1; page <= totalPages; page++) {
        const data = await fetchPage(page, 30);
        yield data; // Yield each page as it arrives
    }
}

async function consumeAsyncGenerator() {
    console.log("  Using async generator:");

    // for await...of iterates over async generators
    for await (const pageData of generatePages(3)) {
        console.log(`    Received page ${pageData.page}: ${pageData.items.length} items`);
    }

    console.log("  All pages consumed");
}

consumeAsyncGenerator();

console.log("\n--- Example 11: reduce with async (Sequential Accumulation) ---");

async function asyncReduce() {
    const steps = [
        { name: "init", transform: (val) => val + 10 },
        { name: "double", transform: (val) => val * 2 },
        { name: "add5", transform: (val) => val + 5 },
    ];

    // Sequential reduce with async operations
    const result = await steps.reduce(async (accPromise, step) => {
        const acc = await accPromise; // Await previous step
        await delay(30); // Simulate async work
        const newVal = step.transform(acc);
        console.log(`    ${step.name}: ${acc} -> ${newVal}`);
        return newVal;
    }, Promise.resolve(0)); // Start with Promise.resolve(0)

    console.log(`  Final result: ${result}`); // (0+10)*2+5 = 25
}

asyncReduce();

console.log("\n--- Example 12: Playwright-Style Element Iteration (Simulated) ---");

// Simulated Playwright locator
function createMockLocator(items) {
    return {
        count: async () => {
            await delay(10);
            return items.length;
        },
        nth: (index) => ({
            textContent: async () => {
                await delay(10);
                return items[index];
            },
            click: async () => {
                await delay(10);
                console.log(`      Clicked: "${items[index]}"`);
            }
        }),
        allTextContents: async () => {
            await delay(10);
            return [...items];
        }
    };
}

async function playwrightLoopPatterns() {
    const todoItems = createMockLocator(["Buy milk", "Write tests", "Deploy app", "Review PR"]);

    // Pattern 1: Get all text contents at once (preferred)
    console.log("  Pattern 1: allTextContents()");
    const allTexts = await todoItems.allTextContents();
    allTexts.forEach((text, i) => console.log(`    [${i}] ${text}`));

    // Pattern 2: Loop with count + nth (sequential)
    console.log("  Pattern 2: count() + nth() loop");
    const count = await todoItems.count();
    for (let i = 0; i < count; i++) {
        const text = await todoItems.nth(i).textContent();
        console.log(`    [${i}] ${text}`);
    }

    // Pattern 3: Click each item sequentially
    console.log("  Pattern 3: Click each item");
    for (let i = 0; i < count; i++) {
        await todoItems.nth(i).click();
    }
}

playwrightLoopPatterns();

// === KEY TAKEAWAYS ===
// 1. SEQUENTIAL: for...of + await — processes items ONE AT A TIME.
// 2. PARALLEL: Promise.all(items.map(async ...)) — processes ALL AT ONCE.
// 3. BROKEN: forEach + async — does NOT await! Items fire-and-forget.
// 4. Sequential is ~N times slower than parallel (N = number of items).
// 5. Use sequential when each step depends on the previous one.
// 6. Use parallel when items are independent (e.g., fetching multiple APIs).
// 7. Batched parallel (controlled concurrency) limits load on resources.
// 8. while loops with await are great for polling and pagination.
// 9. Async generators (for await...of) stream async data elegantly.
// 10. In Playwright: use for...of for sequential element interactions.
