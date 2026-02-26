// Extra_04_Callbacks_Basics.js
// Topic: Callback Basics - Part 4 of 8
// Extends: ex_13_Functions
//
// CONCEPT: In JavaScript, functions are first-class values - they can be stored
// in variables, passed as arguments, and returned from other functions. A callback
// is simply a function passed to another function to be called later.
// JAVA COMPARISON: Similar to Java functional interfaces (Predicate, Function,
// Consumer, Supplier) used with lambdas, but JS does not need interface declarations.
// PLAYWRIGHT RELEVANCE: Playwright's entire API is callback-driven: test functions,
// page actions, assertions, hooks (beforeEach, afterEach) all accept callbacks.
// ============================================================

console.log("--- Example 1: Functions as First-Class Values ---");

// Functions can be assigned to variables
const sayHello = function() {
    return "Hello!";
};
console.log("Function in variable:", sayHello());

// Functions can be stored in arrays
const operations = [
    (a, b) => a + b,
    (a, b) => a - b,
    (a, b) => a * b,
    (a, b) => a / b
];
const opNames = ["add", "subtract", "multiply", "divide"];

operations.forEach((op, i) => {
    console.log(`  ${opNames[i]}(10, 3) = ${op(10, 3)}`);
});

// Functions can be stored in objects (this is how methods work)
const mathUtils = {
    square: x => x * x,
    cube: x => x * x * x,
    sqrt: x => Math.sqrt(x)
};
console.log("square(5):", mathUtils.square(5));
console.log("cube(3):", mathUtils.cube(3));
console.log("sqrt(16):", mathUtils.sqrt(16));

// Functions can be compared by reference
const fn1 = sayHello;
const fn2 = sayHello;
console.log("Same reference?", fn1 === fn2); // true


console.log("\n--- Example 2: Passing Functions as Arguments (Basic Callbacks) ---");

// A callback is a function passed to another function
function doSomething(callback) {
    console.log("  Before callback");
    const result = callback();
    console.log("  Callback returned:", result);
    console.log("  After callback");
}

doSomething(() => "I was called back!");

// Passing different callbacks to the same function
function processNumber(num, operation) {
    return operation(num);
}

console.log("Double 5:", processNumber(5, x => x * 2));
console.log("Square 5:", processNumber(5, x => x * x));
console.log("Negate 5:", processNumber(5, x => -x));
console.log("Stringify 5:", processNumber(5, x => `Number: ${x}`));


console.log("\n--- Example 3: Implementing Custom forEach ---");

// Building our own forEach to understand how callbacks work internally
function myForEach(array, callback) {
    for (let i = 0; i < array.length; i++) {
        callback(array[i], i, array);
    }
}

const fruits = ["apple", "banana", "cherry", "date"];

console.log("Custom forEach output:");
myForEach(fruits, (fruit, index) => {
    console.log(`  [${index}] ${fruit}`);
});

// The callback receives element, index, and the entire array
console.log("With array reference:");
myForEach(fruits, (fruit, index, arr) => {
    const isLast = index === arr.length - 1;
    console.log(`  ${fruit}${isLast ? " (last!)" : ""}`);
});


console.log("\n--- Example 4: Implementing Custom filter ---");

function myFilter(array, predicate) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        if (predicate(array[i], i, array)) {
            result.push(array[i]);
        }
    }
    return result;
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evens = myFilter(numbers, n => n % 2 === 0);
console.log("Evens:", evens);

const bigNumbers = myFilter(numbers, n => n > 5);
console.log("Greater than 5:", bigNumbers);

// Filter with index
const evenIndexed = myFilter(numbers, (_, index) => index % 2 === 0);
console.log("Even-indexed elements:", evenIndexed);


console.log("\n--- Example 5: Implementing Custom map ---");

function myMap(array, transform) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(transform(array[i], i, array));
    }
    return result;
}

const doubled = myMap(numbers, n => n * 2);
console.log("Doubled:", doubled);

const labeled = myMap(fruits, (f, i) => `${i + 1}. ${f}`);
console.log("Labeled:", labeled);

const lengths = myMap(fruits, f => f.length);
console.log("Lengths:", lengths);


console.log("\n--- Example 6: Implementing Custom reduce ---");

function myReduce(array, reducer, initialValue) {
    let accumulator = initialValue;
    let startIndex = 0;

    // If no initial value, use first element as accumulator
    if (accumulator === undefined) {
        accumulator = array[0];
        startIndex = 1;
    }

    for (let i = startIndex; i < array.length; i++) {
        accumulator = reducer(accumulator, array[i], i, array);
    }
    return accumulator;
}

const sum = myReduce(numbers, (acc, n) => acc + n, 0);
console.log("Sum:", sum);

const product = myReduce([1, 2, 3, 4, 5], (acc, n) => acc * n, 1);
console.log("Product:", product);

const longest = myReduce(fruits, (longest, fruit) => {
    return fruit.length > longest.length ? fruit : longest;
}, "");
console.log("Longest fruit:", longest);

// Reduce without initial value (uses first element)
const max = myReduce(numbers, (a, b) => a > b ? a : b);
console.log("Max (no init):", max);


console.log("\n--- Example 7: Callback Naming Conventions ---");

// Callbacks are often named by what they DO, not that they ARE callbacks

// Predicate: returns boolean (used in filter, find, some, every)
function removeIf(array, predicate) {
    return array.filter(item => !predicate(item));
}
const noEvens = removeIf(numbers, n => n % 2 === 0);
console.log("Remove evens:", noEvens);

// Transform/Mapper: converts one value to another (used in map)
function transformAll(array, transformer) {
    return array.map(transformer);
}
const uppercased = transformAll(fruits, f => f.toUpperCase());
console.log("Uppercased:", uppercased);

// Comparator: compares two values (used in sort)
function sortBy(array, comparator) {
    return [...array].sort(comparator);
}
const descending = sortBy(numbers, (a, b) => b - a);
console.log("Descending:", descending);

// Consumer: receives a value, returns nothing (used in forEach)
function logEach(array, consumer) {
    array.forEach(consumer);
}
console.log("Consumed:");
logEach(fruits.slice(0, 3), fruit => console.log(`  - ${fruit}`));

// Supplier: takes no arguments, returns a value
function withDefault(value, supplier) {
    return value !== null && value !== undefined ? value : supplier();
}
console.log("With value:", withDefault("hello", () => "default"));
console.log("With null:", withDefault(null, () => "default"));
console.log("With undefined:", withDefault(undefined, () => "generated-" + Date.now()));


console.log("\n--- Example 8: Higher-Order Functions ---");
// A higher-order function either takes a function as argument OR returns a function

// Takes function as argument (we've seen many of these above)
function repeat(times, action) {
    for (let i = 0; i < times; i++) {
        action(i);
    }
}
console.log("Repeat 3 times:");
repeat(3, i => console.log(`  Iteration ${i}`));

// Returns a function
function createMultiplier(factor) {
    return (number) => number * factor;
}
const triple = createMultiplier(3);
const quintuple = createMultiplier(5);
console.log("triple(7):", triple(7));
console.log("quintuple(7):", quintuple(7));

// Both: takes AND returns a function
function negate(predicate) {
    return (...args) => !predicate(...args);
}
const isEven = n => n % 2 === 0;
const isOdd = negate(isEven);
console.log("isEven(4):", isEven(4));
console.log("isOdd(4):", isOdd(4));
console.log("Odd numbers:", numbers.filter(isOdd));

// Compose: combines two functions
function compose(f, g) {
    return (...args) => f(g(...args));
}
const doubleIt = x => x * 2;
const addOne = x => x + 1;
const doubleAndAddOne = compose(addOne, doubleIt);  // addOne(doubleIt(x))
console.log("doubleAndAddOne(5):", doubleAndAddOne(5)); // addOne(10) = 11


console.log("\n--- Example 9: Callback Patterns in Practice ---");

// Pattern 1: Retry logic
function retry(operation, maxAttempts, onSuccess, onFailure) {
    let attempts = 0;
    while (attempts < maxAttempts) {
        attempts++;
        try {
            const result = operation(attempts);
            onSuccess(result, attempts);
            return;
        } catch (e) {
            console.log(`  Attempt ${attempts} failed: ${e.message}`);
            if (attempts >= maxAttempts) {
                onFailure(e, attempts);
            }
        }
    }
}

console.log("Retry pattern:");
retry(
    (attempt) => {
        if (attempt < 3) throw new Error("Not ready yet");
        return "Success!";
    },
    5,
    (result, attempts) => console.log(`  Succeeded after ${attempts} attempts: ${result}`),
    (error, attempts) => console.log(`  Failed after ${attempts} attempts: ${error.message}`)
);

// Pattern 2: Pipeline / chain of transformations
function pipeline(initialValue, ...transforms) {
    return transforms.reduce((value, transform) => transform(value), initialValue);
}

const result = pipeline(
    "  Hello, World!  ",
    s => s.trim(),
    s => s.toLowerCase(),
    s => s.replace(/[!,]/g, ""),
    s => s.split(" "),
    words => words.map(w => w.charAt(0).toUpperCase() + w.slice(1)),
    words => words.join("-")
);
console.log("Pipeline result:", result); // "Hello-World"

// Pattern 3: Middleware-style processing
function processRequest(data, ...middlewares) {
    let processed = { ...data };
    for (const middleware of middlewares) {
        processed = middleware(processed);
    }
    return processed;
}

const request = { path: "/api/users", method: "GET" };
const processed = processRequest(
    request,
    (req) => ({ ...req, timestamp: "2024-01-01T00:00:00Z" }),
    (req) => ({ ...req, path: req.path.toLowerCase() }),
    (req) => ({ ...req, authenticated: true }),
    (req) => ({ ...req, processed: true })
);
console.log("Processed request:", processed);


console.log("\n--- Example 10: Java Functional Interface Comparison ---");
// In Java, you need functional interfaces; in JS, any function works

// Java: Predicate<Integer> isEven = (n) -> n % 2 == 0;
// JS:
const isEvenJS = n => n % 2 === 0;

// Java: Function<String, Integer> length = (s) -> s.length();
// JS:
const lengthJS = s => s.length;

// Java: Consumer<String> printer = (s) -> System.out.println(s);
// JS:
const printerJS = s => console.log(s);

// Java: Supplier<Double> random = () -> Math.random();
// JS:
const randomJS = () => Math.random();

// Java: BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;
// JS:
const addJS = (a, b) => a + b;

console.log("Predicate:", isEvenJS(4));
console.log("Function:", lengthJS("hello"));
printerJS("Consumer output");
console.log("Supplier:", randomJS());
console.log("BiFunction:", addJS(3, 7));

// The big difference: Java needs interface types, JS just uses functions directly
// Java: list.stream().filter(isEven).map(n -> n * 2).collect(Collectors.toList())
// JS:   list.filter(isEven).map(n => n * 2)


// === KEY TAKEAWAYS ===
// 1. Functions are first-class values in JS - store, pass, and return them freely
// 2. A callback is simply a function passed as an argument to another function
// 3. Synchronous callbacks execute immediately (forEach, map, filter, reduce)
// 4. Custom implementations of forEach/filter/map/reduce show callbacks are simple loops
// 5. Naming conventions: predicate (boolean), transform (convert), comparator (order),
//    consumer (void), supplier (no-arg producer)
// 6. Higher-order functions take functions as args and/or return functions
// 7. Common patterns: retry with callbacks, pipelines, middleware chains
// 8. Java needs functional interfaces (Predicate, Function, etc.); JS needs nothing special
// 9. Playwright uses callbacks everywhere: test(), beforeEach(), page.evaluate(), etc.
