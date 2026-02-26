// Extra_05_OptionalChaining.js
// Topic: Optional Chaining (?.) Operator - Part 5 of 6
// Extends: ex_04_Operators
//
// CONCEPT: Optional chaining (?.) lets you safely access deeply nested
// properties without checking each level for null/undefined. If any part
// of the chain is null or undefined, the entire expression short-circuits
// and returns undefined instead of throwing a TypeError.
// JAVA COMPARISON: Java has no direct equivalent. You either write verbose
// null checks (if obj != null && obj.field != null) or use Optional<T>.
// PLAYWRIGHT RELEVANCE: Test results, page objects, and element properties
// can have missing/optional nested values. ?. prevents runtime crashes.
// ============================================================

console.log("--- Example 1: Basic Property Access ---");

const user = {
  name: "Alice",
  address: {
    street: "123 Main St",
    city: "Portland",
    state: "OR"
  }
};

const userNoAddress = {
  name: "Bob"
  // no address property
};

// Safe access with ?.
console.log("Alice's city:", user?.address?.city);           // "Portland"
console.log("Bob's city:  ", userNoAddress?.address?.city);  // undefined (no crash!)

// Without ?. this would throw: TypeError: Cannot read properties of undefined
// console.log(userNoAddress.address.city);  // WOULD CRASH

// Works on null too
const userNullAddress = { name: "Charlie", address: null };
console.log("Charlie's city:", userNullAddress?.address?.city); // undefined

// Deeper nesting
const config = {
  database: {
    primary: {
      host: "db.example.com",
      port: 5432
    }
  }
};

console.log("\nDB host:", config?.database?.primary?.host);          // "db.example.com"
console.log("Replica host:", config?.database?.replica?.host);       // undefined
console.log("Cache host:", config?.cache?.redis?.host);              // undefined

console.log("\n--- Example 2: Optional Method Calls ---");

const api = {
  getUser: () => ({ name: "Alice", id: 1 }),
  // no deleteUser method
};

console.log("getUser:", api.getUser?.());       // { name: "Alice", id: 1 }
console.log("deleteUser:", api.deleteUser?.());  // undefined (no crash)

// Useful with array methods that might not exist
const maybeArray = [1, 2, 3];
const notArray = null;

console.log("\nFilter array:", maybeArray?.filter?.(x => x > 1));  // [2, 3]
console.log("Filter null: ", notArray?.filter?.(x => x > 1));     // undefined

// Calling methods on results
const text = "Hello, World!";
const emptyText = null;

console.log("Uppercase:", text?.toUpperCase?.());       // "HELLO, WORLD!"
console.log("Null uppercase:", emptyText?.toUpperCase?.()); // undefined

console.log("\n--- Example 3: Bracket Notation & Dynamic Keys ---");

const testResults = {
  "login-test": { status: "passed", duration: 1200 },
  "checkout-test": { status: "failed", duration: 5400 }
};

const testName1 = "login-test";
const testName2 = "search-test";

// ?. with bracket notation
console.log(`${testName1} status:`, testResults?.[testName1]?.status);  // "passed"
console.log(`${testName2} status:`, testResults?.[testName2]?.status);  // undefined

// Accessing array elements safely
const data = {
  results: [
    { name: "Test 1", score: 95 },
    { name: "Test 2", score: 87 }
  ]
};

const emptyData = { results: null };
const noData = {};

console.log("\nFirst result:", data?.results?.[0]?.name);       // "Test 1"
console.log("Third result:", data?.results?.[2]?.name);         // undefined
console.log("Null results:", emptyData?.results?.[0]?.name);    // undefined
console.log("No results:", noData?.results?.[0]?.name);         // undefined

console.log("\n--- Example 4: Practical Patterns ---");

// Pattern 1: Safe property access with fallback
function getDisplayName(user) {
  return user?.profile?.displayName ?? user?.name ?? "Anonymous";
}

console.log(getDisplayName({ profile: { displayName: "Alice_QA" }, name: "Alice" })); // Alice_QA
console.log(getDisplayName({ name: "Bob" }));                                          // Bob
console.log(getDisplayName({}));                                                        // Anonymous
console.log(getDisplayName(null));                                                      // Anonymous

// Pattern 2: Safe array length check
function getItemCount(response) {
  return response?.data?.items?.length ?? 0;
}

console.log("\nItem counts:");
console.log("  Full:", getItemCount({ data: { items: [1, 2, 3] } }));  // 3
console.log("  Empty:", getItemCount({ data: { items: [] } }));         // 0
console.log("  Null:", getItemCount({ data: null }));                   // 0
console.log("  Missing:", getItemCount(null));                          // 0

// Pattern 3: Chained optional calls
const processor = {
  transform: (x) => x * 2,
  // no validate method
};

const result = processor?.transform?.(5);
const validated = processor?.validate?.(result);
console.log("\nTransformed:", result);     // 10
console.log("Validated:", validated);      // undefined

// Pattern 4: Safe callback invocation
function executeAction(action) {
  // Only call onSuccess/onError if they exist
  const result = action?.execute?.();
  action?.onSuccess?.(result);
  action?.onError?.("something went wrong");
  return result;
}

console.log("\nWith callbacks:");
executeAction({
  execute: () => {
    console.log("  Executed!");
    return 42;
  },
  onSuccess: (r) => console.log("  Success! Result:", r)
  // no onError — that is fine, ?. handles it
});

console.log("Without callbacks:");
executeAction({
  execute: () => {
    console.log("  Executed!");
    return 99;
  }
  // no onSuccess, no onError — both safely skipped
});

console.log("\n--- Example 5: Playwright Connection ---");

// Simulating Playwright test result structures with optional chaining

// Test result might have nested optional properties
const testResult = {
  testName: "Login Flow",
  status: "failed",
  error: {
    message: "Timeout waiting for selector '#dashboard'",
    stack: "at login.spec.js:42"
  },
  attachments: [
    { name: "screenshot", path: "/artifacts/login-fail.png" },
    { name: "trace", path: "/artifacts/login-trace.zip" }
  ],
  // retry might not exist
  // video might not exist
};

const passedResult = {
  testName: "Homepage",
  status: "passed"
  // no error, no attachments for passed tests
};

// Safe access patterns for test results
function formatTestResult(result) {
  const name = result?.testName ?? "Unknown Test";
  const status = result?.status ?? "unknown";
  const errorMsg = result?.error?.message ?? "No error";
  const screenshotPath = result?.attachments?.find?.(a => a.name === "screenshot")?.path;
  const tracePath = result?.attachments?.find?.(a => a.name === "trace")?.path;
  const videoPath = result?.video?.path ?? "No video";
  const retryCount = result?.retry?.count ?? 0;

  return {
    summary: `${name}: ${status}`,
    error: errorMsg,
    screenshot: screenshotPath ?? "No screenshot",
    trace: tracePath ?? "No trace",
    video: videoPath,
    retries: retryCount
  };
}

console.log("Failed test result:");
console.log(formatTestResult(testResult));
console.log("\nPassed test result:");
console.log(formatTestResult(passedResult));
console.log("\nNull result:");
console.log(formatTestResult(null));

// Simulating page element inspection
function describeElement(element) {
  return {
    tag: element?.tagName ?? "unknown",
    id: element?.attributes?.id ?? "no-id",
    classes: element?.attributes?.className?.split?.(" ") ?? [],
    text: element?.textContent?.trim?.() ?? "",
    href: element?.attributes?.href ?? null,
    isVisible: element?.computedStyle?.display !== "none"
  };
}

console.log("\nElement inspection:");
console.log(describeElement({
  tagName: "a",
  attributes: { id: "nav-home", className: "nav-link active", href: "/home" },
  textContent: "  Home  ",
  computedStyle: { display: "block" }
}));

console.log(describeElement({
  tagName: "div",
  textContent: "Hello"
  // no attributes, no computedStyle
}));

console.log(describeElement(null));

// === KEY TAKEAWAYS ===
// 1. obj?.prop returns undefined instead of throwing if obj is null/undefined.
// 2. Works with methods (obj?.method?.()), brackets (obj?.[key]), and chaining.
// 3. Short-circuits: if any ?. hits null/undefined, the rest is skipped.
// 4. Combine with ?? for safe defaults: obj?.prop ?? "fallback".
// 5. Eliminates verbose null-checking code that is common in Java (if obj != null).
