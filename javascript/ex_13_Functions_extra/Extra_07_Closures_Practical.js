// Extra_07_Closures_Practical.js
// Topic: Closures - Practical Patterns - Part 7 of 8
// Extends: ex_13_Functions
//
// CONCEPT: Closures enable powerful patterns: data privacy (encapsulation without
// classes), factory functions with private state, and configuration-remembering
// helper functions. These patterns are foundational to JavaScript module systems.
// JAVA COMPARISON: Similar to Java private fields with getter/setter methods,
// but achieved through function scope rather than access modifiers.
// PLAYWRIGHT RELEVANCE: Playwright test helpers and fixtures use closures to
// "remember" configuration (browser type, base URL, timeout values) and share
// state between beforeEach and test blocks.
// ============================================================

console.log("--- Example 1: Data Privacy with Closures ---");

// In JavaScript, closures provide TRUE data privacy
// Variables inside the closure cannot be accessed from outside

function createBankAccount(ownerName, initialBalance) {
    // These variables are PRIVATE - no outside access
    let balance = initialBalance;
    const transactionLog = [];
    const owner = ownerName;

    function logTransaction(type, amount) {
        transactionLog.push({
            type,
            amount,
            balance,
            timestamp: new Date().toISOString()
        });
    }

    // Only the returned methods can access the private state
    return {
        deposit(amount) {
            if (amount <= 0) throw new Error("Deposit must be positive");
            balance += amount;
            logTransaction("deposit", amount);
            return `Deposited $${amount}. Balance: $${balance}`;
        },
        withdraw(amount) {
            if (amount <= 0) throw new Error("Withdrawal must be positive");
            if (amount > balance) throw new Error("Insufficient funds");
            balance -= amount;
            logTransaction("withdrawal", amount);
            return `Withdrew $${amount}. Balance: $${balance}`;
        },
        getBalance() {
            return balance;
        },
        getOwner() {
            return owner;
        },
        getStatement() {
            return {
                owner,
                balance,
                transactions: [...transactionLog] // return copy, not reference
            };
        }
    };
}

const account = createBankAccount("Alice", 1000);
console.log(account.deposit(500));
console.log(account.withdraw(200));
console.log(account.deposit(100));
console.log("Balance:", account.getBalance());
console.log("Statement:", JSON.stringify(account.getStatement(), null, 2));

// PRIVACY: Cannot access internals directly
console.log("account.balance:", account.balance);           // undefined
console.log("account.transactionLog:", account.transactionLog); // undefined
// The only way to interact is through the public methods


console.log("\n--- Example 2: Module Pattern (Pre-ES6 Modules) ---");

// The module pattern uses an IIFE + closure to create a self-contained module
// This was THE way to create modules before ES6 import/export

const Calculator = (function() {
    // Private state
    let memory = 0;
    let history = [];

    // Private function
    function addToHistory(operation, args, result) {
        history.push({ operation, args, result });
    }

    // Public API (revealed through the returned object)
    return {
        add(a, b) {
            const result = a + b;
            addToHistory("add", [a, b], result);
            return result;
        },
        subtract(a, b) {
            const result = a - b;
            addToHistory("subtract", [a, b], result);
            return result;
        },
        multiply(a, b) {
            const result = a * b;
            addToHistory("multiply", [a, b], result);
            return result;
        },
        divide(a, b) {
            if (b === 0) throw new Error("Division by zero");
            const result = a / b;
            addToHistory("divide", [a, b], result);
            return result;
        },
        storeInMemory(value) {
            memory = value;
        },
        recallMemory() {
            return memory;
        },
        getHistory() {
            return [...history];
        },
        clearHistory() {
            history = [];
        }
    };
})(); // Immediately invoked!

console.log("5 + 3 =", Calculator.add(5, 3));
console.log("10 - 4 =", Calculator.subtract(10, 4));
console.log("6 * 7 =", Calculator.multiply(6, 7));
console.log("20 / 4 =", Calculator.divide(20, 4));

Calculator.storeInMemory(42);
console.log("Memory:", Calculator.recallMemory());
console.log("History:", Calculator.getHistory());

// Cannot access private internals
console.log("Calculator.memory:", Calculator.memory);   // undefined
console.log("Calculator.history:", Calculator.history);  // undefined


console.log("\n--- Example 3: Factory Functions with Private State ---");

function createLogger(prefix, level = "info") {
    // Private state
    let logCount = 0;
    const logs = [];
    const levels = { debug: 0, info: 1, warn: 2, error: 3 };
    let currentLevel = levels[level] || 1;

    function shouldLog(msgLevel) {
        return (levels[msgLevel] || 0) >= currentLevel;
    }

    function formatMessage(msgLevel, message) {
        logCount++;
        const entry = `[${prefix}] [${msgLevel.toUpperCase()}] #${logCount}: ${message}`;
        logs.push(entry);
        return entry;
    }

    return {
        debug(msg) {
            if (shouldLog("debug")) {
                console.log("  " + formatMessage("debug", msg));
            }
        },
        info(msg) {
            if (shouldLog("info")) {
                console.log("  " + formatMessage("info", msg));
            }
        },
        warn(msg) {
            if (shouldLog("warn")) {
                console.log("  " + formatMessage("warn", msg));
            }
        },
        error(msg) {
            if (shouldLog("error")) {
                console.log("  " + formatMessage("error", msg));
            }
        },
        setLevel(newLevel) {
            currentLevel = levels[newLevel] || 1;
        },
        getLogCount() {
            return logCount;
        },
        getLogs() {
            return [...logs];
        }
    };
}

const appLogger = createLogger("APP", "info");
const dbLogger = createLogger("DB", "warn");

appLogger.debug("This won't show (below info level)");
appLogger.info("Application started");
appLogger.warn("Low memory");
appLogger.error("Crash!");

dbLogger.info("This won't show (below warn level)");
dbLogger.warn("Slow query detected");
dbLogger.error("Connection lost");

console.log("App logs:", appLogger.getLogCount());
console.log("DB logs:", dbLogger.getLogCount());


console.log("\n--- Example 4: Closures in Loops - The Classic Problem ---");

// THE PROBLEM: Using var in a loop with closures
console.log("Problem with var:");
const buttons = [];
for (var i = 0; i < 5; i++) {
    buttons.push({
        id: `btn-${i}`,
        onClick: function() {
            return `Button ${i} clicked`; // `i` is shared - will be 5 for all!
        }
    });
}
buttons.forEach(btn => console.log(`  ${btn.id}:`, btn.onClick()));
// All say "Button 5 clicked"!

// FIX 1: Use `let` (creates new binding per iteration)
console.log("\nFix with let:");
const buttonsFixed1 = [];
for (let j = 0; j < 5; j++) {
    buttonsFixed1.push({
        id: `btn-${j}`,
        onClick: function() {
            return `Button ${j} clicked`; // Each `j` is a new variable
        }
    });
}
buttonsFixed1.forEach(btn => console.log(`  ${btn.id}:`, btn.onClick()));

// FIX 2: Use a closure-creating function
console.log("\nFix with closure factory:");
function createClickHandler(buttonIndex) {
    return function() {
        return `Button ${buttonIndex} clicked`;
    };
}

const buttonsFixed2 = [];
for (var k = 0; k < 5; k++) {
    buttonsFixed2.push({
        id: `btn-${k}`,
        onClick: createClickHandler(k) // k is captured by value at each iteration
    });
}
buttonsFixed2.forEach(btn => console.log(`  ${btn.id}:`, btn.onClick()));

// FIX 3: Use IIFE (Immediately Invoked Function Expression)
console.log("\nFix with IIFE:");
const buttonsFixed3 = [];
for (var m = 0; m < 5; m++) {
    buttonsFixed3.push({
        id: `btn-${m}`,
        onClick: (function(captured) {
            return function() {
                return `Button ${captured} clicked`;
            };
        })(m)
    });
}
buttonsFixed3.forEach(btn => console.log(`  ${btn.id}:`, btn.onClick()));


console.log("\n--- Example 5: Configuration-Remembering Helpers ---");

// Closures are perfect for creating configured utility functions

// API client factory
function createApiClient(baseUrl, defaultHeaders = {}) {
    // Configuration is "remembered" by all returned methods
    let requestCount = 0;

    function makeRequest(method, path, options = {}) {
        requestCount++;
        const url = `${baseUrl}${path}`;
        const headers = { ...defaultHeaders, ...options.headers };
        // Simulated request (not actually fetching)
        return {
            requestNumber: requestCount,
            method,
            url,
            headers,
            body: options.body || null
        };
    }

    return {
        get(path, options) { return makeRequest("GET", path, options); },
        post(path, options) { return makeRequest("POST", path, options); },
        put(path, options) { return makeRequest("PUT", path, options); },
        delete(path, options) { return makeRequest("DELETE", path, options); },
        getRequestCount() { return requestCount; }
    };
}

const api = createApiClient("https://api.example.com", {
    "Authorization": "Bearer token123",
    "Content-Type": "application/json"
});

console.log(api.get("/users"));
console.log(api.post("/users", { body: { name: "Alice" } }));
console.log(api.get("/users/1"));
console.log(api.delete("/users/1"));
console.log("Total requests:", api.getRequestCount());

// A different API client with different configuration
const testApi = createApiClient("http://localhost:3000", {
    "X-Test-Mode": "true"
});
console.log(testApi.get("/health"));


console.log("\n--- Example 6: Playwright-Style Fixture Pattern ---");

// Simulating how Playwright fixtures use closures to share state
function createTestContext(config) {
    // Shared state across all hooks and tests
    let browser = null;
    let page = null;
    const screenshots = [];

    return {
        beforeAll() {
            browser = { type: config.browserType, headless: config.headless };
            console.log(`  [beforeAll] Launched ${browser.type} (headless: ${browser.headless})`);
        },

        beforeEach(testName) {
            page = {
                url: config.baseUrl,
                title: testName,
                browser: browser.type
            };
            console.log(`  [beforeEach] Created page for "${testName}" at ${page.url}`);
        },

        test(testName, testFn) {
            console.log(`  [test] Running "${testName}"...`);
            // testFn receives the page object created in beforeEach
            const result = testFn(page);
            console.log(`  [test] Result:`, result);
        },

        afterEach(testName) {
            if (page) {
                const screenshot = `${testName.replace(/\s+/g, "-")}.png`;
                screenshots.push(screenshot);
                console.log(`  [afterEach] Screenshot: ${screenshot}`);
                page = null;
            }
        },

        afterAll() {
            console.log(`  [afterAll] Closing browser. Screenshots: ${screenshots.length}`);
            browser = null;
        }
    };
}

const ctx = createTestContext({
    browserType: "chromium",
    headless: true,
    baseUrl: "https://example.com"
});

// Simulate a test run
ctx.beforeAll();

ctx.beforeEach("login page test");
ctx.test("login page test", (page) => {
    return { pageUrl: page.url, browser: page.browser, status: "passed" };
});
ctx.afterEach("login page test");

ctx.beforeEach("dashboard test");
ctx.test("dashboard test", (page) => {
    return { pageUrl: page.url, browser: page.browser, status: "passed" };
});
ctx.afterEach("dashboard test");

ctx.afterAll();


console.log("\n--- Example 7: Closure-Based State Machine ---");

function createStateMachine(initialState, transitions) {
    let currentState = initialState;
    const history = [initialState];

    return {
        getState() {
            return currentState;
        },

        transition(action) {
            const key = `${currentState}:${action}`;
            const nextState = transitions[key];

            if (!nextState) {
                console.log(`  Invalid: "${action}" from "${currentState}"`);
                return false;
            }

            const prevState = currentState;
            currentState = nextState;
            history.push(currentState);
            console.log(`  ${prevState} --[${action}]--> ${currentState}`);
            return true;
        },

        getHistory() {
            return [...history];
        },

        reset() {
            currentState = initialState;
            history.length = 0;
            history.push(initialState);
        }
    };
}

// A traffic light state machine
const trafficLight = createStateMachine("red", {
    "red:timer": "green",
    "green:timer": "yellow",
    "yellow:timer": "red",
    "red:emergency": "red",
    "green:emergency": "red",
    "yellow:emergency": "red"
});

console.log("Traffic light:");
console.log("  Current:", trafficLight.getState());
trafficLight.transition("timer");     // red -> green
trafficLight.transition("timer");     // green -> yellow
trafficLight.transition("timer");     // yellow -> red
trafficLight.transition("timer");     // red -> green
trafficLight.transition("emergency"); // green -> red
console.log("  History:", trafficLight.getHistory());

// Order state machine
const orderMachine = createStateMachine("created", {
    "created:submit": "pending",
    "pending:approve": "approved",
    "pending:reject": "rejected",
    "approved:ship": "shipped",
    "shipped:deliver": "delivered",
    "created:cancel": "cancelled",
    "pending:cancel": "cancelled"
});

console.log("\nOrder lifecycle:");
orderMachine.transition("submit");
orderMachine.transition("approve");
orderMachine.transition("ship");
orderMachine.transition("deliver");
orderMachine.transition("cancel"); // Invalid: can't cancel a delivered order
console.log("  History:", orderMachine.getHistory());


console.log("\n--- Example 8: Partial Application with Closures ---");

// Partial application: pre-fill some arguments, return a function expecting the rest

function partial(fn, ...presetArgs) {
    return function(...laterArgs) {
        return fn(...presetArgs, ...laterArgs);
    };
}

function formatPrice(currency, decimals, amount) {
    return `${currency}${amount.toFixed(decimals)}`;
}

// Create specialized versions
const formatUSD = partial(formatPrice, "$", 2);
const formatEUR = partial(formatPrice, "\u20AC", 2);
const formatJPY = partial(formatPrice, "\u00A5", 0);

console.log(formatUSD(29.99));    // $29.99
console.log(formatUSD(1234.5));   // $1234.50
console.log(formatEUR(49.99));    // EUR49.99
console.log(formatJPY(1500));     // JPY1500

// Practical: logging with pre-set prefix
function log(level, category, message) {
    console.log(`  [${level}] [${category}] ${message}`);
}

const errorLog = partial(log, "ERROR");
const debugAuth = partial(log, "DEBUG", "AUTH");

errorLog("DB", "Connection failed");
errorLog("API", "Timeout");
debugAuth("User logged in");
debugAuth("Token refreshed");


console.log("\n--- Example 9: Closure-Based Event System ---");

function createEventBus() {
    // Private state: event handlers map
    const handlers = {};

    return {
        on(event, handler) {
            if (!handlers[event]) handlers[event] = [];
            handlers[event].push(handler);
            // Return an unsubscribe function (itself a closure!)
            return () => {
                handlers[event] = handlers[event].filter(h => h !== handler);
                console.log(`  Unsubscribed from "${event}"`);
            };
        },

        emit(event, ...args) {
            const eventHandlers = handlers[event] || [];
            console.log(`  Emitting "${event}" to ${eventHandlers.length} handler(s)`);
            eventHandlers.forEach(handler => handler(...args));
        },

        listenerCount(event) {
            return (handlers[event] || []).length;
        }
    };
}

const bus = createEventBus();

// Subscribe
const unsub1 = bus.on("message", (msg) => console.log(`    Handler 1: ${msg}`));
const unsub2 = bus.on("message", (msg) => console.log(`    Handler 2: ${msg}`));
bus.on("error", (err) => console.log(`    Error handler: ${err}`));

console.log("Listeners for 'message':", bus.listenerCount("message"));
bus.emit("message", "Hello everyone!");

// Unsubscribe handler 1 using the returned closure
unsub1();
console.log("After unsubscribe, listeners:", bus.listenerCount("message"));
bus.emit("message", "Only handler 2 receives this");


// === KEY TAKEAWAYS ===
// 1. Closures provide TRUE data privacy - variables are inaccessible from outside
// 2. The Module Pattern (IIFE + closure) was the standard pre-ES6 module system
// 3. Factory functions create objects with private state via closures
// 4. The classic loop problem: var shares one variable; let creates new one per iteration
// 5. Configuration-remembering helpers: create API clients, loggers, formatters
// 6. Playwright fixtures use closures to share state between hooks and tests
// 7. State machines, event systems, and partial application all rely on closures
// 8. Java uses private fields + getters; JS achieves the same with closures
// 9. Unsubscribe functions (returned closures) are a common and elegant pattern
