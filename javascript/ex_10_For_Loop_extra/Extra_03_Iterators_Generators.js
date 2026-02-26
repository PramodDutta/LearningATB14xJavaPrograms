// Extra_03_Iterators_Generators.js
// Topic: Iterators and Generators - Part 3 of 4
// Extends: ex_10_For_Loop
//
// CONCEPT: The iterator protocol defines how objects produce a sequence of
// values. Any object with a next() method returning {value, done} is an
// iterator. Generator functions (function*) are a convenient way to create
// iterators using the yield keyword, which pauses and resumes execution.
// JAVA COMPARISON: Very similar to Java's Iterator<T> interface with
// hasNext()/next(). Generators have no direct Java equivalent but are
// conceptually like lazy Streams.
// PLAYWRIGHT RELEVANCE: Understanding iterables helps with custom test data
// generators, lazy page result iteration, and retry/polling patterns.
// ============================================================

console.log("--- Example 1: The Iterator Protocol ---");

// An iterator is any object with a next() method that returns {value, done}
function createCounterIterator(start, end) {
  let current = start;
  return {
    next() {
      if (current <= end) {
        return { value: current++, done: false };
      }
      return { value: undefined, done: true };
    }
  };
}

const counter = createCounterIterator(1, 5);
console.log("Manual iteration with next():");
console.log("  ", counter.next()); // { value: 1, done: false }
console.log("  ", counter.next()); // { value: 2, done: false }
console.log("  ", counter.next()); // { value: 3, done: false }
console.log("  ", counter.next()); // { value: 4, done: false }
console.log("  ", counter.next()); // { value: 5, done: false }
console.log("  ", counter.next()); // { value: undefined, done: true }
console.log("  ", counter.next()); // { value: undefined, done: true } (stays done)

// Built-in iterators
const arr = ["a", "b", "c"];
const arrIterator = arr[Symbol.iterator]();
console.log("\nArray iterator:");
console.log("  ", arrIterator.next()); // { value: 'a', done: false }
console.log("  ", arrIterator.next()); // { value: 'b', done: false }
console.log("  ", arrIterator.next()); // { value: 'c', done: false }
console.log("  ", arrIterator.next()); // { value: undefined, done: true }

console.log("\n--- Example 2: Making Objects Iterable with Symbol.iterator ---");

// To use for...of, an object needs a [Symbol.iterator] method
const testSuite = {
  name: "Login Tests",
  tests: [
    { name: "Valid login", status: "passed" },
    { name: "Invalid password", status: "passed" },
    { name: "Locked account", status: "failed" },
    { name: "Empty fields", status: "passed" }
  ],
  // Make this object iterable — for...of will iterate over tests
  [Symbol.iterator]() {
    let index = 0;
    const tests = this.tests;
    return {
      next() {
        if (index < tests.length) {
          return { value: tests[index++], done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
};

console.log(`Suite: ${testSuite.name}`);
for (const test of testSuite) {
  const icon = test.status === "passed" ? "PASS" : "FAIL";
  console.log(`  [${icon}] ${test.name}`);
}

// Spread also works on iterables!
const allTests = [...testSuite];
console.log("Spread into array:", allTests.map(t => t.name));

// Destructuring works too
const [first, second] = testSuite;
console.log("First test:", first.name);
console.log("Second test:", second.name);

console.log("\n--- Example 3: Generator Functions (function*) ---");

// Generators are a simpler way to create iterators
// yield pauses the function and returns a value; calling next() resumes it

function* countUp(start, end) {
  for (let i = start; i <= end; i++) {
    console.log(`  (generator is at i=${i}, about to yield)`);
    yield i;
    console.log(`  (generator resumed after yielding ${i})`);
  }
  console.log("  (generator finished)");
}

console.log("Generator with countUp(1, 3):");
const gen = countUp(1, 3);
console.log("Call next():", gen.next());
console.log("Call next():", gen.next());
console.log("Call next():", gen.next());
console.log("Call next():", gen.next()); // done: true

// Generators are iterable — use with for...of
console.log("\nfor...of with generator:");
for (const n of countUp(10, 13)) {
  process.stdout.write(`${n} `);
}
console.log();

// Practical generator: Fibonacci sequence (infinite!)
function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

// Take first 10 Fibonacci numbers
console.log("\nFirst 10 Fibonacci numbers:");
const fib = fibonacci();
const fibNumbers = [];
for (let i = 0; i < 10; i++) {
  fibNumbers.push(fib.next().value);
}
console.log("  ", fibNumbers);

// Helper: take N values from any generator
function* take(n, iterable) {
  let count = 0;
  for (const value of iterable) {
    if (count >= n) return;
    yield value;
    count++;
  }
}

console.log("Take 8 from Fibonacci:", [...take(8, fibonacci())]);

console.log("\n--- Example 4: Practical Generator Patterns ---");

// Pattern 1: ID generator
function* idGenerator(prefix = "id") {
  let counter = 1;
  while (true) {
    yield `${prefix}_${String(counter++).padStart(4, "0")}`;
  }
}

const testId = idGenerator("TEST");
const userId = idGenerator("USER");
console.log("Generated IDs:");
console.log("  ", testId.next().value); // TEST_0001
console.log("  ", testId.next().value); // TEST_0002
console.log("  ", userId.next().value); // USER_0001
console.log("  ", testId.next().value); // TEST_0003
console.log("  ", userId.next().value); // USER_0002

// Pattern 2: Cycle through values (round-robin)
function* cycle(items) {
  while (true) {
    for (const item of items) {
      yield item;
    }
  }
}

const browserCycle = cycle(["chromium", "firefox", "webkit"]);
console.log("\nRound-robin browser assignment:");
for (let i = 0; i < 7; i++) {
  console.log(`  Test ${i + 1}: ${browserCycle.next().value}`);
}

// Pattern 3: Range generator with yield*
function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}

// yield* delegates to another iterable/generator
function* testDataSequence() {
  yield* range(1, 4);       // yields 1, 2, 3
  yield "separator";
  yield* range(10, 13);     // yields 10, 11, 12
  yield "end";
}

console.log("\nyield* delegation:", [...testDataSequence()]);

// Pattern 4: Paginated data generator
function* paginateArray(items, pageSize) {
  for (let i = 0; i < items.length; i += pageSize) {
    yield {
      page: Math.floor(i / pageSize) + 1,
      items: items.slice(i, i + pageSize),
      hasMore: i + pageSize < items.length
    };
  }
}

const allItems = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
console.log("\nPaginated (page size 3):");
for (const page of paginateArray(allItems, 3)) {
  console.log(`  Page ${page.page}: [${page.items.join(", ")}] (hasMore: ${page.hasMore})`);
}

console.log("\n--- Example 5: Playwright Connection ---");

// Pattern 1: Test data generator for parameterized tests
function* loginCredentials() {
  yield { username: "admin", password: "admin123", shouldPass: true };
  yield { username: "user", password: "user123", shouldPass: true };
  yield { username: "admin", password: "wrong", shouldPass: false };
  yield { username: "", password: "", shouldPass: false };
  yield { username: "locked_user", password: "locked123", shouldPass: false };
}

console.log("Login test data:");
for (const cred of loginCredentials()) {
  const expected = cred.shouldPass ? "SUCCESS" : "FAILURE";
  console.log(`  [${expected}] user="${cred.username}" pass="${cred.password}"`);
}

// Pattern 2: Retry simulator using a generator
function* retryAttempts(maxRetries, delays = [1000, 2000, 4000]) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const delay = delays[Math.min(attempt - 1, delays.length - 1)];
    yield { attempt, delay, isLastAttempt: attempt === maxRetries };
  }
}

console.log("\nRetry sequence (max 4 attempts):");
for (const { attempt, delay, isLastAttempt } of retryAttempts(4)) {
  console.log(`  Attempt ${attempt}: wait ${delay}ms${isLastAttempt ? " (FINAL)" : ""}`);
}

// Pattern 3: Simulated lazy element collection
function* simulateLocatorAll(selector, totalElements) {
  console.log(`  Querying "${selector}"...`);
  for (let i = 0; i < totalElements; i++) {
    // In real Playwright, each element would be lazily resolved
    yield {
      index: i,
      selector: `${selector} >> nth=${i}`,
      getText: () => `Item ${i + 1}`,
      isVisible: () => i < totalElements - 1  // last one is hidden
    };
  }
}

console.log("\nLazy element iteration:");
for (const element of simulateLocatorAll(".list-item", 5)) {
  if (!element.isVisible()) {
    console.log(`  [HIDDEN] ${element.getText()} — skipping`);
    continue;
  }
  console.log(`  [VISIBLE] ${element.getText()} at ${element.selector}`);
}

// === KEY TAKEAWAYS ===
// 1. An iterator is an object with next() returning {value, done}.
// 2. Symbol.iterator makes any object work with for...of, spread, and destructuring.
// 3. Generators (function*) are the easy way to create iterators — yield pauses execution.
// 4. Generators can be infinite (Fibonacci, IDs) — just control how many values you take.
// 5. In testing: generators are great for test data, retry sequences, and paginated results.
