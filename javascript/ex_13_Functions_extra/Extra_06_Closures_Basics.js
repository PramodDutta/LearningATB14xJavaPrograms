// Extra_06_Closures_Basics.js
// Topic: Closures Basics - Part 6 of 8
// Extends: ex_13_Functions
//
// CONCEPT: A closure is formed when an inner function retains access to variables
// from its outer (enclosing) function's scope, even after the outer function has
// returned. This is possible because JS uses lexical scoping.
// JAVA COMPARISON: Similar to Java inner classes or lambdas that capture "effectively
// final" variables from the enclosing scope, but JS closures can capture mutable state.
// PLAYWRIGHT RELEVANCE: Closures are everywhere in Playwright - test fixtures capture
// shared state, page.evaluate closures, beforeEach/afterEach sharing variables.
// ============================================================

console.log("--- Example 1: Lexical Scope Basics ---");

// Lexical scope means variables are resolved based on WHERE they are defined,
// not where they are called

const globalVar = "I'm global";

function outerFunction() {
    const outerVar = "I'm from outer";

    function innerFunction() {
        const innerVar = "I'm from inner";
        // Inner can access its own scope, outer scope, and global scope
        console.log("  innerVar:", innerVar);
        console.log("  outerVar:", outerVar);
        console.log("  globalVar:", globalVar);
    }

    innerFunction();
    // outerFunction can access its own scope and global, but NOT inner's
    console.log("  outerVar:", outerVar);
    console.log("  globalVar:", globalVar);
    // console.log(innerVar); // ERROR: innerVar is not defined
}

outerFunction();


console.log("\n--- Example 2: Nested Scopes (Scope Chain) ---");

function level1() {
    const a = "Level 1";

    function level2() {
        const b = "Level 2";

        function level3() {
            const c = "Level 3";

            function level4() {
                const d = "Level 4";
                // Level 4 can see everything above it
                console.log("  From level4:", a, "|", b, "|", c, "|", d);
            }

            level4();
            // Level 3 can see a, b, c but NOT d
            console.log("  From level3:", a, "|", b, "|", c);
        }

        level3();
        console.log("  From level2:", a, "|", b);
    }

    level2();
    console.log("  From level1:", a);
}

level1();


console.log("\n--- Example 3: Creating a Closure ---");

// A closure is created when a function is returned from another function
// and the returned function still references variables from the outer function

function createGreeter(greeting) {
    // `greeting` is an outer variable
    return function(name) {
        // This inner function forms a CLOSURE over `greeting`
        // It "closes over" the variable, keeping it alive
        return `${greeting}, ${name}!`;
    };
}

const helloGreeter = createGreeter("Hello");
const holaGreeter = createGreeter("Hola");
const bonjourGreeter = createGreeter("Bonjour");

// Even though createGreeter has returned, the inner function still has
// access to the `greeting` variable from when it was created
console.log(helloGreeter("Alice"));    // "Hello, Alice!"
console.log(holaGreeter("Bob"));       // "Hola, Bob!"
console.log(bonjourGreeter("Charlie")); // "Bonjour, Charlie!"

// Each closure has its OWN copy of the enclosed variable
console.log(helloGreeter("Diana"));    // Still uses "Hello"
console.log(holaGreeter("Eve"));       // Still uses "Hola"


console.log("\n--- Example 4: Simple Counter with Closure ---");

function createCounter(startAt = 0) {
    let count = startAt; // This variable is "closed over"

    return {
        increment() { return ++count; },
        decrement() { return --count; },
        getCount()  { return count; },
        reset()     { count = startAt; return count; }
    };
}

const counter = createCounter(0);
console.log("Initial:", counter.getCount());  // 0
console.log("Increment:", counter.increment()); // 1
console.log("Increment:", counter.increment()); // 2
console.log("Increment:", counter.increment()); // 3
console.log("Decrement:", counter.decrement()); // 2
console.log("Current:", counter.getCount());    // 2
console.log("Reset:", counter.reset());         // 0

// A second counter is completely independent (its own closure)
const counter2 = createCounter(100);
console.log("\nCounter2 start:", counter2.getCount());  // 100
console.log("Counter2 inc:", counter2.increment());     // 101
console.log("Counter1 still:", counter.getCount());     // 0 (unaffected!)


console.log("\n--- Example 5: Closure Over Mutable Variables ---");

// Unlike Java (which requires effectively final), JS closures can
// capture AND MODIFY outer variables

function createAccumulator() {
    let total = 0;
    const history = [];

    return function(amount) {
        total += amount;
        history.push({ amount, total });
        return { total, history: [...history] }; // return copy of history
    };
}

const accumulate = createAccumulator();
console.log(accumulate(10));   // { total: 10, history: [...] }
console.log(accumulate(20));   // { total: 30, history: [...] }
console.log(accumulate(-5));   // { total: 25, history: [...] }
console.log(accumulate(15));   // { total: 40, history: [...] }


console.log("\n--- Example 6: Closures 'Remember' Their Environment ---");

function makeAdder(x) {
    // `x` is captured by the returned function
    return function(y) {
        return x + y;
    };
}

const add5 = makeAdder(5);
const add10 = makeAdder(10);
const add100 = makeAdder(100);

console.log("add5(3):", add5(3));     // 8
console.log("add5(7):", add5(7));     // 12
console.log("add10(3):", add10(3));   // 13
console.log("add100(3):", add100(3)); // 103

// Each function "remembers" its own `x` value
// The variable exists in the closure even though makeAdder() has returned


console.log("\n--- Example 7: Multiple Closures Sharing the Same Scope ---");

function createFamily(familyName) {
    // All returned functions share the same `familyName` AND `members`
    const members = [];

    return {
        addMember(name) {
            members.push(name);
            console.log(`  Added ${name} to the ${familyName} family`);
        },
        getMembers() {
            return [...members]; // return a copy
        },
        getFamilyName() {
            return familyName;
        },
        introduce() {
            if (members.length === 0) {
                return `The ${familyName} family has no members yet.`;
            }
            return `The ${familyName} family: ${members.join(", ")}`;
        }
    };
}

const smiths = createFamily("Smith");
smiths.addMember("John");
smiths.addMember("Jane");
smiths.addMember("Junior");
console.log(smiths.introduce());
console.log("Members:", smiths.getMembers());

const johnsons = createFamily("Johnson");
johnsons.addMember("Bob");
johnsons.addMember("Sue");
console.log(johnsons.introduce());

// Each family has its own closure - completely separate state
console.log("Smiths:", smiths.getMembers().length, "members");
console.log("Johnsons:", johnsons.getMembers().length, "members");


console.log("\n--- Example 8: Closure in Loops (Common Pitfall) ---");

// The classic closure-in-loop problem
console.log("Closure with var (shares single variable - BUG):");
const functionsVar = [];
for (var i = 0; i < 5; i++) {
    functionsVar.push(function() {
        return i; // All closures reference the SAME `i`
    });
}
// By the time we call these, the loop has finished and i === 5
console.log("  Results:", functionsVar.map(fn => fn())); // [5, 5, 5, 5, 5] - all 5!

// Fix 1: Use `let` (creates new binding per iteration)
console.log("\nClosure with let (new variable per iteration - CORRECT):");
const functionsLet = [];
for (let j = 0; j < 5; j++) {
    functionsLet.push(function() {
        return j; // Each closure has its OWN `j`
    });
}
console.log("  Results:", functionsLet.map(fn => fn())); // [0, 1, 2, 3, 4]

// Fix 2: Use IIFE to create new scope (pre-ES6 solution)
console.log("\nClosure with IIFE (pre-ES6 fix):");
const functionsIIFE = [];
for (var k = 0; k < 5; k++) {
    functionsIIFE.push((function(captured) {
        return function() {
            return captured; // Each closure has its own `captured`
        };
    })(k)); // Immediately invoke, passing current `k`
}
console.log("  Results:", functionsIIFE.map(fn => fn())); // [0, 1, 2, 3, 4]


console.log("\n--- Example 9: Practical Closure Examples ---");

// Example A: Function that counts its own calls
function createTracker(name) {
    let callCount = 0;

    return function(...args) {
        callCount++;
        console.log(`  [${name}] Call #${callCount} with args:`, args);
        return callCount;
    };
}

const trackLogin = createTracker("login");
const trackSearch = createTracker("search");

trackLogin("alice");
trackLogin("bob");
trackSearch("playwright tutorial");
trackLogin("charlie");
trackSearch("javascript closures");
console.log("Login calls:", trackLogin("diana"));   // 4
console.log("Search calls:", trackSearch("testing")); // 3


// Example B: Memoization (caching results)
function createMemoizedFn(fn) {
    const cache = {};

    return function(n) {
        if (n in cache) {
            console.log(`  Cache hit for ${n}`);
            return cache[n];
        }
        console.log(`  Computing for ${n}`);
        cache[n] = fn(n);
        return cache[n];
    };
}

const memoizedFactorial = createMemoizedFn(function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
});

console.log("\nMemoized factorial:");
console.log("5! =", memoizedFactorial(5));  // computes
console.log("5! =", memoizedFactorial(5));  // cache hit!
console.log("3! =", memoizedFactorial(3));  // computes
console.log("3! =", memoizedFactorial(3));  // cache hit!


console.log("\n--- Example 10: Java Comparison ---");
console.log("Java inner class capturing outer variable:");
console.log(`
  // Java (must be effectively final)
  void createGreeter(String greeting) {
      // greeting cannot be reassigned!
      Runnable greeter = () -> System.out.println(greeting + ", World!");
      greeter.run();
  }
`);

console.log("JavaScript closure (can capture mutable variables):");
console.log(`
  // JavaScript (full mutable closure)
  function createCounter() {
      let count = 0;  // CAN be mutated by the inner function
      return () => ++count;
  }
  const counter = createCounter();
  counter(); // 1
  counter(); // 2
`);

console.log("Key difference: Java requires 'effectively final' captured variables.");
console.log("JavaScript has no such restriction - closures can freely mutate outer variables.");


// === KEY TAKEAWAYS ===
// 1. Lexical scope: variables resolved by where code is written, not where it runs
// 2. Closure = inner function + reference to outer function's variables
// 3. Closures keep outer variables alive even after outer function returns
// 4. Each closure instance has its own independent copy of the closed-over scope
// 5. Multiple functions from the same scope share the same closed-over variables
// 6. Classic pitfall: closures in loops with `var` share one variable (use `let`!)
// 7. Practical uses: counters, trackers, memoization, factory functions
// 8. Java difference: Java captures must be "effectively final"; JS has no restriction
// 9. In Playwright: test fixtures, beforeEach variables, page.evaluate() all use closures
