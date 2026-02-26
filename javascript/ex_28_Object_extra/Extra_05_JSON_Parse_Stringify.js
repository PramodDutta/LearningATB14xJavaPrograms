// Extra_05_JSON_Parse_Stringify.js
// Topic: JSON.parse and JSON.stringify - Part 5 of 7
// Extends: ex_28_Object
//
// CONCEPT: JSON (JavaScript Object Notation) is the universal data exchange format.
// JSON.parse() converts JSON strings into JavaScript objects, and JSON.stringify()
// converts objects into JSON strings. Both support transformer functions for custom behavior.
// JAVA COMPARISON: Java uses libraries like Jackson (ObjectMapper.readValue/writeValueAsString)
// or Gson (fromJson/toJson). JavaScript has JSON built into the language — no imports needed.
// PLAYWRIGHT RELEVANCE: API testing uses JSON constantly — response.json() to parse,
// JSON.stringify() for request bodies, and JSON for test data fixtures.
// ============================================================

console.log("--- Example 1: JSON.parse() basics ---");

// Parse a simple JSON string into a JavaScript object
const jsonString = '{"name": "Alice", "age": 30, "active": true}';
const parsed = JSON.parse(jsonString);
console.log("  Parsed object:", parsed);
console.log("  Type:", typeof parsed);           // "object"
console.log("  Access:", parsed.name, parsed.age); // "Alice" 30

// JSON supports: strings, numbers, booleans, null, arrays, objects
const complexJson = `{
    "string": "hello",
    "number": 42,
    "float": 3.14,
    "boolean": true,
    "nullValue": null,
    "array": [1, 2, 3],
    "nested": {"key": "value"}
}`;
const complexParsed = JSON.parse(complexJson);
console.log("\n  Complex parsed:", JSON.stringify(complexParsed));

// Parse arrays
const arrayJson = '[{"id":1,"name":"Alice"},{"id":2,"name":"Bob"}]';
const users = JSON.parse(arrayJson);
console.log("\n  Parsed array:", users);
console.log("  First user:", users[0].name);

// JSON does NOT support: undefined, functions, Date objects, RegExp, Symbol
// These are either omitted or converted to strings
console.log("\n  JSON limitations:");
console.log("  undefined -> omitted in stringify");
console.log("  Functions -> omitted in stringify");
console.log("  Date -> becomes ISO string");

console.log("\n--- Example 2: JSON.stringify() basics and pretty printing ---");

const user = {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    roles: ["admin", "user"],
    address: {
        city: "Portland",
        state: "OR",
        zip: "97201",
    },
};

// Compact (default)
const compact = JSON.stringify(user);
console.log("  Compact:", compact);

// Pretty printed with 2-space indent
const pretty = JSON.stringify(user, null, 2);
console.log("\n  Pretty (2 spaces):");
console.log(pretty);

// Pretty with 4-space indent
console.log("\n  Pretty (4 spaces):");
console.log(JSON.stringify(user, null, 4));

// Tab indent
console.log("\n  Pretty (tab indent):");
console.log(JSON.stringify({ a: 1, b: { c: 2 } }, null, "\t"));

// Stringify primitives
console.log("\n  Primitives:");
console.log("  string:", JSON.stringify("hello"));     // '"hello"'
console.log("  number:", JSON.stringify(42));           // '42'
console.log("  boolean:", JSON.stringify(true));        // 'true'
console.log("  null:", JSON.stringify(null));           // 'null'
console.log("  array:", JSON.stringify([1, 2, 3]));    // '[1,2,3]'

console.log("\n--- Example 3: JSON.stringify() with replacer function ---");

// Replacer function: controls which properties are included and how
const sensitiveData = {
    id: 1,
    username: "alice",
    password: "secret123",
    ssn: "123-45-6789",
    email: "alice@example.com",
    apiKey: "sk_live_abc123",
    role: "admin",
};

// Replacer to exclude sensitive fields
function sanitize(key, value) {
    const sensitiveFields = ["password", "ssn", "apiKey"];
    if (sensitiveFields.includes(key)) {
        return undefined; // returning undefined removes the property
    }
    return value;
}

console.log("  Sanitized JSON:");
console.log(JSON.stringify(sensitiveData, sanitize, 2));

// Replacer to mask sensitive fields instead of removing
function mask(key, value) {
    if (key === "password") return "***";
    if (key === "ssn") return "XXX-XX-" + value.slice(-4);
    if (key === "apiKey") return value.slice(0, 7) + "...";
    if (key === "email") {
        const [local, domain] = value.split("@");
        return local[0] + "***@" + domain;
    }
    return value;
}

console.log("\n  Masked JSON:");
console.log(JSON.stringify(sensitiveData, mask, 2));

// Replacer as array — include only specified keys
const publicFields = ["id", "username", "role"];
console.log("\n  Array replacer (whitelist):");
console.log(JSON.stringify(sensitiveData, publicFields, 2));

// Replacer for transforming values
const withDates = {
    name: "Report",
    created: new Date("2024-01-15"),
    modified: new Date("2024-06-20"),
    count: 42,
};

const dateReplacer = (key, value) => {
    if (value instanceof Date) {
        return value.toLocaleDateString("en-US");
    }
    // Note: by the time replacer sees it, Date is already a string
    // So we check the original object
    return value;
};

console.log("\n  Date handling:", JSON.stringify(withDates, null, 2));

console.log("\n--- Example 4: JSON.parse() with reviver function ---");

// Reviver: transforms values during parsing
const dateJson = '{"name":"Meeting","date":"2024-06-15T10:00:00.000Z","duration":60}';

// Without reviver — date stays a string
const withoutReviver = JSON.parse(dateJson);
console.log("  Without reviver:");
console.log("  date type:", typeof withoutReviver.date); // "string"

// With reviver — convert ISO strings to Date objects
const withReviver = JSON.parse(dateJson, (key, value) => {
    // Check if value looks like an ISO date string
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
        return new Date(value);
    }
    return value;
});
console.log("\n  With reviver:");
console.log("  date type:", typeof withReviver.date);              // "object"
console.log("  date instanceof Date:", withReviver.date instanceof Date); // true
console.log("  date value:", withReviver.date.toLocaleDateString());

// Reviver for number precision
const moneyJson = '{"item":"Widget","price":29.99,"tax":2.40,"total":32.39}';
const moneyObj = JSON.parse(moneyJson, (key, value) => {
    if (typeof value === "number" && key !== "") {
        return Math.round(value * 100); // convert to cents for precision
    }
    return value;
});
console.log("\n  Money in cents:", moneyObj);

// Reviver to strip empty strings
const formJson = '{"name":"Alice","middle":"","phone":"555-0100","fax":""}';
const cleanedForm = JSON.parse(formJson, (key, value) => {
    if (value === "" && key !== "") return undefined; // remove empty strings
    return value;
});
console.log("\n  Cleaned form:", cleanedForm);

console.log("\n--- Example 5: Handling parse errors with try/catch ---");

// Safe JSON parsing function
function safeJsonParse(jsonString, fallback = null) {
    try {
        return { success: true, data: JSON.parse(jsonString) };
    } catch (error) {
        return {
            success: false,
            data: fallback,
            error: error.message,
        };
    }
}

// Valid JSON
const valid = safeJsonParse('{"name": "Alice"}');
console.log("  Valid:", valid);

// Invalid JSON — various errors
const testCases = [
    { label: "Missing quotes", input: '{name: "Alice"}' },
    { label: "Trailing comma", input: '{"a": 1, "b": 2,}' },
    { label: "Single quotes", input: "{'name': 'Alice'}" },
    { label: "Empty string", input: "" },
    { label: "Just a word", input: "hello" },
    { label: "Undefined", input: "undefined" },
];

for (const { label, input } of testCases) {
    const result = safeJsonParse(input, {});
    console.log(`\n  ${label}: "${input}"`);
    console.log(`    Success: ${result.success}`);
    if (!result.success) {
        console.log(`    Error: ${result.error}`);
    }
}

// Practical: parse API response with validation
function parseApiResponse(rawBody) {
    let parsed;
    try {
        parsed = JSON.parse(rawBody);
    } catch (e) {
        throw new Error(`Invalid JSON in response: ${e.message}`);
    }

    if (!parsed || typeof parsed !== "object") {
        throw new Error("Response is not a JSON object");
    }

    if (parsed.error) {
        throw new Error(`API error: ${parsed.error.message || parsed.error}`);
    }

    return parsed;
}

console.log("\n\n  API response parsing:");
try {
    const data = parseApiResponse('{"users": [{"id": 1}], "total": 1}');
    console.log("  Parsed API data:", data);
} catch (e) {
    console.log("  Error:", e.message);
}

try {
    parseApiResponse("not json at all");
} catch (e) {
    console.log("  Error:", e.message);
}

try {
    parseApiResponse('{"error": {"message": "Unauthorized"}}');
} catch (e) {
    console.log("  Error:", e.message);
}

// === KEY TAKEAWAYS ===
// 1. JSON.parse(string) converts JSON string -> JavaScript object/array
// 2. JSON.stringify(obj) converts JavaScript object -> JSON string
// 3. JSON.stringify(obj, null, 2) produces pretty-printed output with indentation
// 4. Replacer function/array filters or transforms properties during stringify
// 5. Reviver function transforms values during parse (e.g., string -> Date)
// 6. Always wrap JSON.parse in try/catch — invalid JSON throws SyntaxError
// 7. JSON only supports: string, number, boolean, null, array, object (no functions/undefined)
// 8. Java comparison: built-in JSON vs Jackson/Gson libraries — JS needs no imports
