// Extra_08_Scope_and_Hoisting.js
// Topic: Scope and Hoisting - Part 8 of 8
// Extends: ex_13_Functions
//
// CONCEPT: JavaScript has three variable declaration keywords - var, let, const -
// each with different scoping rules. `var` is function-scoped and hoisted;
// `let` and `const` are block-scoped with a Temporal Dead Zone (TDZ).
// JAVA COMPARISON: Java variables are always block-scoped (similar to let/const).
// Java has no equivalent to var's function-scoping or hoisting behavior.
// PLAYWRIGHT RELEVANCE: Modern Playwright tests exclusively use const and let.
// Understanding scope prevents bugs in test fixtures, loops, and async callbacks.
// ============================================================

console.log("--- Example 1: var - Function Scope ---");

// `var` is scoped to the nearest FUNCTION (or global if no function)
function varScopeDemo() {
    var x = 10;

    if (true) {
        var y = 20; // Still scoped to varScopeDemo, NOT the if-block!
        var x = 30; // This OVERWRITES the x above (same scope)
    }

    console.log("x:", x); // 30 (overwritten!)
    console.log("y:", y); // 20 (accessible outside the if-block!)
}
varScopeDemo();

// var in a for loop leaks out
function varInLoop() {
    for (var i = 0; i < 3; i++) {
        // i is scoped to varInLoop, not the for block
    }
    console.log("i after loop:", i); // 3 (leaked out of loop!)
}
varInLoop();

// var ignores block scope entirely
function varIgnoresBlocks() {
    {
        var insideBlock = "I escape blocks!";
    }
    console.log("insideBlock:", insideBlock); // Works! var ignores the block
}
varIgnoresBlocks();


console.log("\n--- Example 2: let - Block Scope ---");

// `let` is scoped to the nearest BLOCK (curly braces)
function letScopeDemo() {
    let x = 10;

    if (true) {
        let y = 20; // Scoped to the if-block only
        let x = 30; // This is a NEW variable, separate from outer x
        console.log("Inside if - x:", x); // 30 (inner x)
        console.log("Inside if - y:", y); // 20
    }

    console.log("Outside if - x:", x); // 10 (outer x unchanged!)
    // console.log(y); // ReferenceError: y is not defined
}
letScopeDemo();

// let in a for loop stays in the loop
function letInLoop() {
    for (let i = 0; i < 3; i++) {
        // i is scoped to the for block
    }
    // console.log(i); // ReferenceError: i is not defined
    console.log("i after loop: not accessible (block-scoped)");
}
letInLoop();

// let respects blocks
function letRespectsBlocks() {
    {
        let insideBlock = "I stay in my block!";
        console.log("Inside block:", insideBlock);
    }
    // console.log(insideBlock); // ReferenceError
    console.log("Outside block: insideBlock not accessible");
}
letRespectsBlocks();


console.log("\n--- Example 3: const - Block Scope + No Reassignment ---");

// `const` has the same scoping as `let`, but cannot be reassigned
function constDemo() {
    const PI = 3.14159;
    console.log("PI:", PI);

    // PI = 3.14; // TypeError: Assignment to constant variable

    // const must be initialized at declaration
    // const UNINITIALIZED; // SyntaxError: Missing initializer

    // const is block-scoped (same as let)
    if (true) {
        const innerConst = "block-scoped";
        console.log("Inner const:", innerConst);
    }
    // console.log(innerConst); // ReferenceError
}
constDemo();

// IMPORTANT: const prevents REASSIGNMENT, not MUTATION
function constMutability() {
    const person = { name: "Alice", age: 30 };
    console.log("Original:", person);

    // Cannot reassign the variable
    // person = { name: "Bob" }; // TypeError

    // CAN mutate the object's properties
    person.age = 31;
    person.email = "alice@example.com";
    console.log("Mutated:", person); // Works!

    const numbers = [1, 2, 3];
    // numbers = [4, 5, 6]; // TypeError - cannot reassign
    numbers.push(4);        // Works! Mutation is allowed
    numbers[0] = 99;        // Works!
    console.log("Mutated array:", numbers);
}
constMutability();

// To truly freeze an object, use Object.freeze()
const frozen = Object.freeze({ x: 1, y: 2 });
frozen.x = 99; // Silently fails (or throws in strict mode)
console.log("Frozen object:", frozen); // { x: 1, y: 2 } unchanged


console.log("\n--- Example 4: Hoisting - var Declarations Are Hoisted ---");

// Hoisting: var declarations (NOT values) are moved to the top of their scope
function hoistingDemo() {
    console.log("a before declaration:", a); // undefined (declaration hoisted, value is not)
    var a = 5;
    console.log("a after declaration:", a);  // 5
}
hoistingDemo();

// The above is interpreted by JS engine as:
function hoistingExplained() {
    var a;                                    // Declaration hoisted to top
    console.log("a before assignment:", a);   // undefined
    a = 5;                                    // Assignment stays in place
    console.log("a after assignment:", a);    // 5
}
hoistingExplained();

// More complex example
function complexHoisting() {
    console.log("x:", x); // undefined (hoisted)
    console.log("y:", y); // undefined (hoisted)

    var x = 1;

    if (true) {
        var y = 2; // Still function-scoped, hoisted to function top
    }

    console.log("x:", x); // 1
    console.log("y:", y); // 2
}
complexHoisting();


console.log("\n--- Example 5: Temporal Dead Zone (TDZ) for let and const ---");

// let and const are hoisted but NOT initialized
// Accessing them before declaration causes ReferenceError
// The zone between scope start and declaration is the "Temporal Dead Zone"

function tdzDemo() {
    // TDZ for `letVar` starts here
    // TDZ for `constVar` starts here

    console.log("Entering function...");

    try {
        console.log(letVar); // ReferenceError: Cannot access before initialization
    } catch (e) {
        console.log("letVar TDZ error:", e.message);
    }

    try {
        console.log(constVar); // ReferenceError
    } catch (e) {
        console.log("constVar TDZ error:", e.message);
    }

    let letVar = "now initialized";     // TDZ for letVar ends here
    const constVar = "also initialized"; // TDZ for constVar ends here

    console.log("letVar:", letVar);     // Works!
    console.log("constVar:", constVar); // Works!
}
tdzDemo();

// TDZ in a more subtle case
function subtleTDZ() {
    // This is valid - the function declaration is hoisted fully
    console.log("Hoisted function:", hoistedFn()); // Works!
    function hoistedFn() { return "I'm hoisted!"; }

    // Function EXPRESSIONS with let/const are NOT hoisted
    try {
        notHoisted(); // ReferenceError
    } catch (e) {
        console.log("Expression TDZ:", e.message);
    }
    const notHoisted = () => "I'm not hoisted";
}
subtleTDZ();


console.log("\n--- Example 6: Function Hoisting ---");

// Function DECLARATIONS are fully hoisted (both name and body)
console.log("Called before declaration:", declaredFn()); // Works!
function declaredFn() {
    return "I'm a function declaration - fully hoisted!";
}

// Function EXPRESSIONS are NOT fully hoisted
// var: the variable is hoisted (undefined), but not the function value
try {
    console.log("var expression:", varFnExpr()); // TypeError: not a function
} catch (e) {
    console.log("var expression error:", e.message);
}
var varFnExpr = function() { return "I'm a var function expression"; };
console.log("var expression after:", varFnExpr()); // Works now

// let/const: not accessible at all (TDZ)
try {
    constFnExpr(); // ReferenceError
} catch (e) {
    console.log("const expression error:", e.message);
}
const constFnExpr = () => "I'm a const arrow function";
console.log("const expression after:", constFnExpr()); // Works now


console.log("\n--- Example 7: Block Scope with if/for/while ---");

// if blocks
function ifBlockScope() {
    const condition = true;

    if (condition) {
        let ifLet = "visible only in if";
        const ifConst = "also only in if";
        var ifVar = "escapes to function scope!";
        console.log("  Inside if - let:", ifLet);
        console.log("  Inside if - const:", ifConst);
    }

    console.log("  Outside if - var:", ifVar); // Works (function-scoped)
    // console.log(ifLet);   // ReferenceError
    // console.log(ifConst); // ReferenceError

    // else block has its own scope
    if (!condition) {
        let elseVar = "in else";
    } else {
        let elseVar = "different variable, same name, different scope";
        console.log("  Else block:", elseVar);
    }
}
ifBlockScope();

// for loop blocks
function forBlockScope() {
    console.log("\n  for loop with let:");
    for (let i = 0; i < 3; i++) {
        let squared = i * i;
        console.log(`    i=${i}, squared=${squared}`);
    }
    // i and squared are not accessible here

    console.log("  for loop with var:");
    for (var j = 0; j < 3; j++) {
        var cubed = j * j * j;
    }
    console.log(`    j=${j} (leaked!), cubed=${cubed} (also leaked!)`);
}
forBlockScope();

// while loop blocks
function whileBlockScope() {
    let count = 0;
    while (count < 3) {
        let whileLocal = count * 10; // New variable each iteration
        console.log(`  while iteration: count=${count}, local=${whileLocal}`);
        count++;
    }
    // whileLocal is not accessible here
}
whileBlockScope();

// switch blocks (one scope for the whole switch!)
function switchBlockScope() {
    const action = "create";

    switch (action) {
        case "create": {
            // Use braces to create a block scope per case
            let message = "Creating...";
            console.log("  Switch:", message);
            break;
        }
        case "delete": {
            let message = "Deleting..."; // Same name, different block
            console.log("  Switch:", message);
            break;
        }
    }
}
switchBlockScope();


console.log("\n--- Example 8: Why const Should Be Default ---");

// Rule of thumb:
// 1. Use `const` by default (signals intent: this won't change)
// 2. Use `let` when you need to reassign
// 3. Never use `var` in modern code

// const for values that should not be reassigned
const MAX_RETRIES = 3;
const BASE_URL = "https://api.example.com";
const CONFIG = { timeout: 5000, retries: MAX_RETRIES };
const processItem = (item) => item.toUpperCase();

console.log("Constants:", MAX_RETRIES, BASE_URL);

// let for values that need reassignment
let currentRetry = 0;
let isConnected = false;
let errorMessage = null;

while (currentRetry < MAX_RETRIES && !isConnected) {
    currentRetry++;
    console.log(`  Attempt ${currentRetry}/${MAX_RETRIES}`);
    // Simulate connection attempt
    if (currentRetry === 3) {
        isConnected = true;
    }
}
console.log("Connected:", isConnected, "after", currentRetry, "attempts");

// let for accumulators and loop counters
let sum = 0;
const values = [10, 20, 30, 40, 50];
for (const value of values) { // const works here - new binding per iteration
    sum += value;
}
console.log("Sum:", sum);

// const in for...of and for...in (new binding each iteration)
console.log("const in for...of:");
for (const fruit of ["apple", "banana", "cherry"]) {
    console.log(`  ${fruit}`); // Each iteration gets a new const binding
}


console.log("\n--- Example 9: Scope in Nested Functions ---");

function outer() {
    const outerConst = "outer-const";
    let outerLet = "outer-let";

    function middle() {
        const middleConst = "middle-const";
        // Can access outer scope
        console.log("  middle sees outerConst:", outerConst);

        function inner() {
            const innerConst = "inner-const";
            // Can access all ancestor scopes
            console.log("  inner sees outerConst:", outerConst);
            console.log("  inner sees middleConst:", middleConst);
            console.log("  inner sees innerConst:", innerConst);

            // Can modify let variables from outer scopes
            outerLet = "modified-by-inner";
        }

        inner();
        // Cannot access inner's variables
        // console.log(innerConst); // ReferenceError
    }

    middle();
    console.log("  outerLet after inner modified it:", outerLet);
    // Cannot access middle's variables
    // console.log(middleConst); // ReferenceError
}
outer();


console.log("\n--- Example 10: Common Scope Pitfalls and Best Practices ---");

// Pitfall 1: Accidental global variables
function accidentalGlobal() {
    // forgottenVar = "oops"; // Without var/let/const, this creates a global!
    // Always declare variables explicitly
    let properVar = "correct";
    console.log("  Proper declaration:", properVar);
}
accidentalGlobal();

// Pitfall 2: Shadowing
function shadowingExample() {
    const name = "outer";
    console.log("  Outer name:", name);

    if (true) {
        const name = "inner"; // Shadows outer `name` (different variable)
        console.log("  Inner name:", name); // "inner"
    }

    console.log("  Outer name still:", name); // "outer" (unchanged)
}
shadowingExample();

// Pitfall 3: const with reference types
function constRefPitfall() {
    const user = { name: "Alice", scores: [90, 85, 92] };

    // Can mutate!
    user.name = "Bob";
    user.scores.push(88);
    console.log("  Mutated const object:", user);

    // Cannot reassign!
    // user = { name: "Charlie" }; // TypeError
}
constRefPitfall();

// Best practice summary
console.log("\n  BEST PRACTICES:");
console.log("  1. Use const by default");
console.log("  2. Use let only when reassignment is needed");
console.log("  3. Never use var in new code");
console.log("  4. Declare variables as close to usage as possible");
console.log("  5. Use block scope {} to limit variable lifetime");
console.log("  6. Use Object.freeze() for truly immutable objects");
console.log("  7. Be aware of shadowing - same name in nested scopes");


console.log("\n--- Example 11: Comparison Table ---");
console.log("  Feature            | var            | let            | const");
console.log("  -------------------|----------------|----------------|----------------");
console.log("  Scope              | Function       | Block          | Block");
console.log("  Hoisted?           | Yes (undefined)| Yes (TDZ)      | Yes (TDZ)");
console.log("  Re-declarable?     | Yes            | No             | No");
console.log("  Reassignable?      | Yes            | Yes            | No");
console.log("  Must initialize?   | No             | No             | Yes");
console.log("  Global property?   | Yes (window)   | No             | No");
console.log("  Modern usage       | Avoid          | When needed    | Default choice");


// === KEY TAKEAWAYS ===
// 1. var is function-scoped; let and const are block-scoped
// 2. var declarations are hoisted to function top with value undefined
// 3. let/const are hoisted but not initialized - accessing before declaration is TDZ error
// 4. Function declarations are fully hoisted; function expressions follow their keyword rules
// 5. const prevents reassignment but NOT mutation of objects/arrays
// 6. Use const by default, let when reassignment needed, avoid var entirely
// 7. Block scope applies to if, for, while, switch (with braces), and plain {} blocks
// 8. for...of with const works because each iteration creates a new binding
// 9. Java comparison: Java has only block scope (like let/const); no var-like function scope
// 10. In Playwright: always use const for page, locators, config; let for retry counters
