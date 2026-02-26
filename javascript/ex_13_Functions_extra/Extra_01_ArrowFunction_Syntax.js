// Extra_01_ArrowFunction_Syntax.js
// Topic: Arrow Function Syntax - Part 1 of 8
// Extends: ex_13_Functions
//
// CONCEPT: Arrow functions (=>) provide a concise syntax for writing function
// expressions in JavaScript. They differ from traditional functions in both
// syntax and behavior, offering implicit returns for single expressions.
// JAVA COMPARISON: Similar to Java lambdas like (x) -> x * 2, but JS arrows
// are more versatile since JS functions are first-class objects everywhere.
// PLAYWRIGHT RELEVANCE: Arrow functions are used extensively in Playwright for
// page.evaluate(() => ...), test callbacks test('name', async () => {}), and
// locator filters like locator.filter({ hasText: /pattern/ }).
// ============================================================

console.log("--- Example 1: No Parameters Arrow ---");
// When there are no parameters, use empty parentheses ()
const greet = () => "Hello, World!";
console.log(greet());

const getTimestamp = () => Date.now();
console.log("Timestamp:", getTimestamp());

const getRandomNumber = () => Math.floor(Math.random() * 100);
console.log("Random number:", getRandomNumber());

// Multi-statement with no params requires braces and explicit return
const greetVerbose = () => {
    const message = "Hello from verbose arrow!";
    return message;
};
console.log(greetVerbose());


console.log("\n--- Example 2: Single Parameter Arrow ---");
// With exactly one parameter, parentheses are optional
const double = x => x * 2;
console.log("double(5):", double(5));

const isEven = n => n % 2 === 0;
console.log("isEven(4):", isEven(4));
console.log("isEven(7):", isEven(7));

const toUpper = str => str.toUpperCase();
console.log("toUpper('hello'):", toUpper("hello"));

// You CAN still use parentheses with a single param (some style guides prefer this)
const triple = (x) => x * 3;
console.log("triple(5):", triple(5));


console.log("\n--- Example 3: Multiple Parameters Arrow ---");
// Two or more parameters REQUIRE parentheses
const add = (a, b) => a + b;
console.log("add(3, 7):", add(3, 7));

const multiply = (a, b) => a * b;
console.log("multiply(4, 5):", multiply(4, 5));

const fullName = (first, last) => `${first} ${last}`;
console.log("fullName('John', 'Doe'):", fullName("John", "Doe"));

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
console.log("clamp(15, 0, 10):", clamp(15, 0, 10));
console.log("clamp(-5, 0, 10):", clamp(-5, 0, 10));
console.log("clamp(5, 0, 10):", clamp(5, 0, 10));


console.log("\n--- Example 4: Implicit Return (Single Expression) ---");
// When the body is a single expression, the result is returned automatically
// No curly braces, no return keyword needed
const square = x => x * x;
console.log("square(6):", square(6));

// Implicit return works with any expression
const ternaryExample = x => x >= 0 ? "positive" : "negative";
console.log("ternaryExample(5):", ternaryExample(5));
console.log("ternaryExample(-3):", ternaryExample(-3));

// Implicit return with template literals
const greetPerson = name => `Hello, ${name}! Welcome aboard.`;
console.log(greetPerson("Alice"));

// IMPORTANT: To implicitly return an object literal, wrap in parentheses
// Without parens, JS thinks {} is a block body, not an object
const makePerson = (name, age) => ({ name: name, age: age });
console.log("makePerson:", makePerson("Bob", 30));

// Shorthand property names work too
const makePoint = (x, y) => ({ x, y });
console.log("makePoint(3, 4):", makePoint(3, 4));


console.log("\n--- Example 5: Explicit Return (Block Body) ---");
// When you need multiple statements, use curly braces
// You MUST include an explicit return statement
const factorial = n => {
    if (n <= 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
};
console.log("factorial(5):", factorial(5));
console.log("factorial(0):", factorial(0));

const fizzBuzz = n => {
    if (n % 15 === 0) return "FizzBuzz";
    if (n % 3 === 0) return "Fizz";
    if (n % 5 === 0) return "Buzz";
    return String(n);
};
console.log("fizzBuzz(15):", fizzBuzz(15));
console.log("fizzBuzz(9):", fizzBuzz(9));
console.log("fizzBuzz(10):", fizzBuzz(10));
console.log("fizzBuzz(7):", fizzBuzz(7));

// Common mistake: forgetting return in a block body
const oopsNoReturn = x => { x * 2; };  // returns undefined!
console.log("oopsNoReturn(5):", oopsNoReturn(5), "(undefined because no return!)");


console.log("\n--- Example 6: Converting Regular Functions to Arrows Step by Step ---");

// STEP-BY-STEP CONVERSION
// Start: traditional function declaration
function addTraditional(a, b) {
    return a + b;
}
console.log("Traditional:", addTraditional(2, 3));

// Step 1: Convert to function expression
const addExpression = function(a, b) {
    return a + b;
};
console.log("Expression:", addExpression(2, 3));

// Step 2: Replace 'function' keyword with arrow after params
const addArrowBlock = (a, b) => {
    return a + b;
};
console.log("Arrow (block):", addArrowBlock(2, 3));

// Step 3: Since body is a single return statement, use implicit return
const addArrowConcise = (a, b) => a + b;
console.log("Arrow (concise):", addArrowConcise(2, 3));

console.log("\n--- Another conversion example ---");

// Start: a filtering function
function isAdult(person) {
    return person.age >= 18;
}

// Step 1: function expression
const isAdultExpr = function(person) {
    return person.age >= 18;
};

// Step 2: arrow with block body
const isAdultArrow = (person) => {
    return person.age >= 18;
};

// Step 3: arrow with implicit return + remove optional parens
const isAdultConcise = person => person.age >= 18;

const people = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 15 },
    { name: "Charlie", age: 30 },
    { name: "Diana", age: 12 }
];

console.log("Traditional:", people.filter(isAdult).map(p => p.name));
console.log("Expression:", people.filter(isAdultExpr).map(p => p.name));
console.log("Arrow:", people.filter(isAdultArrow).map(p => p.name));
console.log("Concise:", people.filter(isAdultConcise).map(p => p.name));


console.log("\n--- Example 7: Default Parameters with Arrows ---");
const greetWithDefault = (name = "World") => `Hello, ${name}!`;
console.log(greetWithDefault());
console.log(greetWithDefault("Alice"));

const createUser = (name, role = "viewer", active = true) => ({
    name,
    role,
    active,
    createdAt: new Date().toISOString()
});
console.log("Default user:", createUser("Bob"));
console.log("Admin user:", createUser("Alice", "admin"));
console.log("Inactive editor:", createUser("Charlie", "editor", false));


console.log("\n--- Example 8: Rest Parameters with Arrows ---");
const sum = (...numbers) => numbers.reduce((acc, n) => acc + n, 0);
console.log("sum(1,2,3,4,5):", sum(1, 2, 3, 4, 5));

const first = (head, ...rest) => ({ head, rest });
console.log("first(1,2,3,4):", first(1, 2, 3, 4));

const logAll = (...args) => {
    args.forEach((arg, i) => console.log(`  arg[${i}]:`, arg));
};
console.log("logAll output:");
logAll("apple", 42, true, null);


console.log("\n--- Example 9: Arrows Returning Arrows (Currying) ---");
// An arrow that returns another arrow
const multiplyBy = factor => value => factor * value;

const double2 = multiplyBy(2);
const triple2 = multiplyBy(3);
console.log("double2(5):", double2(5));
console.log("triple2(5):", triple2(5));

// More practical: creating a greeting function factory
const greetIn = language => name => {
    const greetings = {
        english: `Hello, ${name}!`,
        spanish: `Hola, ${name}!`,
        french: `Bonjour, ${name}!`,
        japanese: `Konnichiwa, ${name}!`
    };
    return greetings[language] || `Hi, ${name}!`;
};

const greetEnglish = greetIn("english");
const greetSpanish = greetIn("spanish");
console.log(greetEnglish("Alice"));
console.log(greetSpanish("Bob"));
console.log(greetIn("french")("Charlie"));


// === KEY TAKEAWAYS ===
// 1. Arrow syntax: () => expr, x => expr, (x, y) => expr
// 2. Single expression body = implicit return (no braces, no return keyword)
// 3. Multi-statement body = explicit return (braces + return keyword required)
// 4. To implicitly return an object literal, wrap in parentheses: () => ({ key: value })
// 5. Parentheses around a single parameter are optional: x => x vs (x) => x
// 6. Default parameters and rest parameters work the same as regular functions
// 7. Arrows can return arrows for currying patterns
// 8. Java equivalent: (x) -> x * 2 is similar to x => x * 2
// 9. In Playwright: test('name', async ({ page }) => { ... }) uses arrow syntax everywhere
