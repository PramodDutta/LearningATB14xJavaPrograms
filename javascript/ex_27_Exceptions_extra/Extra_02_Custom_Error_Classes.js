// Extra_02_Custom_Error_Classes.js
// Topic: Custom Error Classes - Part 2 of 4
// Extends: ex_27_Exceptions
//
// CONCEPT: JavaScript lets you create custom error classes by extending the built-in
// Error class. Custom errors carry domain-specific properties (field names, error codes,
// HTTP statuses) making catch blocks much more precise and informative.
// JAVA COMPARISON: Identical to creating `class ValidationException extends Exception`
// with custom fields — Java custom exceptions follow the exact same inheritance pattern.
// PLAYWRIGHT RELEVANCE: Playwright defines its own TimeoutError extending Error.
// In test frameworks you create custom assertion errors and test-specific exceptions.
// ============================================================

console.log("--- Example 1: Basic Custom Error — ValidationError ---");

class ValidationError extends Error {
    constructor(field, message) {
        super(message);                    // call Error constructor with message
        this.name = "ValidationError";     // override default "Error" name
        this.field = field;                // custom property: which field failed
    }
}

// Using the custom error
try {
    const email = "not-an-email";
    if (!email.includes("@")) {
        throw new ValidationError("email", `Invalid email format: "${email}"`);
    }
} catch (e) {
    if (e instanceof ValidationError) {
        console.log(`Validation failed on field: ${e.field}`);
        console.log(`Message: ${e.message}`);
        console.log(`Name: ${e.name}`);
        console.log(`Is ValidationError: ${e instanceof ValidationError}`);
        console.log(`Is Error: ${e instanceof Error}`);
    }
}

// Multiple validation checks
function validateUser(user) {
    if (!user.name || user.name.trim() === "") {
        throw new ValidationError("name", "Name is required");
    }
    if (!user.age || user.age < 0 || user.age > 150) {
        throw new ValidationError("age", `Age must be between 0 and 150, got: ${user.age}`);
    }
    if (!user.email || !user.email.includes("@")) {
        throw new ValidationError("email", "Valid email is required");
    }
    return true;
}

const testUsers = [
    { name: "", age: 25, email: "a@b.com" },
    { name: "Alice", age: -5, email: "a@b.com" },
    { name: "Bob", age: 30, email: "invalid" },
    { name: "Charlie", age: 28, email: "c@d.com" },
];

for (const user of testUsers) {
    try {
        validateUser(user);
        console.log(`\nUser "${user.name}" is valid.`);
    } catch (e) {
        if (e instanceof ValidationError) {
            console.log(`\nUser "${user.name || "(empty)"}": INVALID — [${e.field}] ${e.message}`);
        }
    }
}

console.log("\n--- Example 2: TimeoutError with duration tracking ---");

class TimeoutError extends Error {
    constructor(operation, durationMs, maxMs) {
        super(`Operation "${operation}" timed out after ${durationMs}ms (max: ${maxMs}ms)`);
        this.name = "TimeoutError";
        this.operation = operation;
        this.durationMs = durationMs;
        this.maxMs = maxMs;
    }
}

function simulateSlowOperation(name, actualMs, maxMs) {
    // Simulate: if actual > max, it would have timed out
    if (actualMs > maxMs) {
        throw new TimeoutError(name, actualMs, maxMs);
    }
    return `${name} completed in ${actualMs}ms`;
}

const operations = [
    { name: "page.load", actual: 2500, max: 5000 },
    { name: "locator.click", actual: 35000, max: 30000 },
    { name: "api.request", actual: 12000, max: 10000 },
    { name: "element.waitFor", actual: 800, max: 5000 },
];

for (const op of operations) {
    try {
        const result = simulateSlowOperation(op.name, op.actual, op.max);
        console.log(`  OK: ${result}`);
    } catch (e) {
        if (e instanceof TimeoutError) {
            console.log(`  TIMEOUT: ${e.operation} — exceeded ${e.maxMs}ms limit by ${e.durationMs - e.maxMs}ms`);
        }
    }
}

console.log("\n--- Example 3: NetworkError with status codes ---");

class NetworkError extends Error {
    constructor(url, statusCode, statusText) {
        super(`Request to ${url} failed: ${statusCode} ${statusText}`);
        this.name = "NetworkError";
        this.url = url;
        this.statusCode = statusCode;
        this.statusText = statusText;
    }

    get isClientError() {
        return this.statusCode >= 400 && this.statusCode < 500;
    }

    get isServerError() {
        return this.statusCode >= 500;
    }
}

function simulateApiCall(url, status, text) {
    if (status >= 400) {
        throw new NetworkError(url, status, text);
    }
    return { url, status, data: "success" };
}

const apiCalls = [
    { url: "/api/users", status: 200, text: "OK" },
    { url: "/api/admin", status: 403, text: "Forbidden" },
    { url: "/api/missing", status: 404, text: "Not Found" },
    { url: "/api/data", status: 500, text: "Internal Server Error" },
    { url: "/api/timeout", status: 503, text: "Service Unavailable" },
];

for (const call of apiCalls) {
    try {
        const result = simulateApiCall(call.url, call.status, call.text);
        console.log(`  SUCCESS: ${result.url} -> ${result.status}`);
    } catch (e) {
        if (e instanceof NetworkError) {
            const errorType = e.isClientError ? "CLIENT" : e.isServerError ? "SERVER" : "UNKNOWN";
            console.log(`  ${errorType} ERROR: ${e.url} -> ${e.statusCode} ${e.statusText}`);
        }
    }
}

console.log("\n--- Example 4: Error hierarchy — multiple custom types ---");

// Base application error
class AppError extends Error {
    constructor(message, code) {
        super(message);
        this.name = "AppError";
        this.code = code;
        this.timestamp = new Date().toISOString();
    }
}

// Specific subtypes
class AuthenticationError extends AppError {
    constructor(message) {
        super(message, "AUTH_FAILED");
        this.name = "AuthenticationError";
    }
}

class AuthorizationError extends AppError {
    constructor(resource, action) {
        super(`Not authorized to ${action} on ${resource}`, "FORBIDDEN");
        this.name = "AuthorizationError";
        this.resource = resource;
        this.action = action;
    }
}

class NotFoundError extends AppError {
    constructor(entity, id) {
        super(`${entity} with id "${id}" not found`, "NOT_FOUND");
        this.name = "NotFoundError";
        this.entity = entity;
        this.entityId = id;
    }
}

// Simulate operations that throw different custom errors
function processRequest(action) {
    switch (action) {
        case "login_bad":
            throw new AuthenticationError("Invalid credentials");
        case "delete_admin":
            throw new AuthorizationError("admin_panel", "delete");
        case "find_user":
            throw new NotFoundError("User", "usr_99999");
        case "success":
            return "Operation completed";
    }
}

const actions = ["login_bad", "delete_admin", "find_user", "success"];

for (const action of actions) {
    try {
        const result = processRequest(action);
        console.log(`  OK: ${result}`);
    } catch (e) {
        // Check from most specific to least specific
        if (e instanceof AuthenticationError) {
            console.log(`  AUTH: ${e.message} [code: ${e.code}]`);
        } else if (e instanceof AuthorizationError) {
            console.log(`  AUTHZ: Cannot ${e.action} on ${e.resource} [code: ${e.code}]`);
        } else if (e instanceof NotFoundError) {
            console.log(`  NOT FOUND: ${e.entity} #${e.entityId} [code: ${e.code}]`);
        } else if (e instanceof AppError) {
            console.log(`  APP ERROR: ${e.message} [code: ${e.code}]`);
        }
        // All custom errors have a timestamp
        if (e instanceof AppError) {
            console.log(`    -> timestamp: ${e.timestamp}`);
        }
    }
}

// Hierarchy check
const authErr = new AuthenticationError("test");
console.log("\nHierarchy verification:");
console.log("  AuthenticationError instanceof AuthenticationError:", authErr instanceof AuthenticationError);
console.log("  AuthenticationError instanceof AppError:", authErr instanceof AppError);
console.log("  AuthenticationError instanceof Error:", authErr instanceof Error);

console.log("\n--- Example 5: Preserving stack trace and wrapping errors ---");

class DatabaseError extends Error {
    constructor(query, originalError) {
        super(`Database query failed: ${query}`);
        this.name = "DatabaseError";
        this.query = query;
        this.originalError = originalError;

        // In Node.js, Error.captureStackTrace preserves the correct call site
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DatabaseError);
        }
    }
}

function executeQuery(sql) {
    // Simulate a low-level error
    try {
        if (sql.includes("DROP")) {
            throw new TypeError("Cannot execute destructive queries in read-only mode");
        }
        if (sql.includes("INVALID_TABLE")) {
            throw new ReferenceError("Table INVALID_TABLE does not exist");
        }
        return [{ id: 1, name: "result" }];
    } catch (originalError) {
        // Wrap the original error with context
        throw new DatabaseError(sql, originalError);
    }
}

const queries = [
    "SELECT * FROM users",
    "DROP TABLE sessions",
    "SELECT * FROM INVALID_TABLE",
];

for (const sql of queries) {
    try {
        const rows = executeQuery(sql);
        console.log(`  Query OK: "${sql}" -> ${rows.length} row(s)`);
    } catch (e) {
        if (e instanceof DatabaseError) {
            console.log(`  DB ERROR: ${e.message}`);
            console.log(`    -> Original: [${e.originalError.name}] ${e.originalError.message}`);
        }
    }
}

// === KEY TAKEAWAYS ===
// 1. Extend Error with `class MyError extends Error` — always call super(message)
// 2. Set this.name to your class name so console/logs show the correct error type
// 3. Add custom properties (field, statusCode, operation) for richer error context
// 4. Build error hierarchies: AppError -> AuthError, NotFoundError, etc.
// 5. Use instanceof from most specific to least specific in catch blocks
// 6. Wrap lower-level errors by storing the originalError for debugging
// 7. Java parallel: identical pattern — `class CustomException extends Exception`
// 8. Playwright parallel: TimeoutError extends Error with timeout-specific properties
