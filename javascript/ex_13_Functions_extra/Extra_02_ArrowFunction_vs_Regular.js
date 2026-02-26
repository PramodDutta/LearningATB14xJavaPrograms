// Extra_02_ArrowFunction_vs_Regular.js
// Topic: Arrow Functions vs Regular Functions - Part 2 of 8
// Extends: ex_13_Functions
//
// CONCEPT: Arrow functions and regular functions differ in critical ways beyond
// syntax. Arrow functions do not have their own `this`, `arguments`, or
// `super` bindings, and cannot be used as constructors with `new`.
// JAVA COMPARISON: Java lambdas also capture the enclosing `this` (like arrows),
// whereas anonymous inner classes have their own `this` reference.
// PLAYWRIGHT RELEVANCE: Understanding `this` is crucial when using page.evaluate()
// where arrow functions capture the Node.js context, and regular functions
// execute in the browser context with their own `this`.
// ============================================================

console.log("--- Example 1: `this` Binding in Regular Functions ---");
// Regular functions get their own `this` based on HOW they are called

// When called as a method, `this` refers to the object
const person = {
    name: "Alice",
    greet: function() {
        return `Hello, I'm ${this.name}`;
    }
};
console.log(person.greet()); // "Hello, I'm Alice"

// When called as a standalone function, `this` is undefined (strict) or global
const detachedGreet = person.greet;
// In Node.js strict mode (modules), this would be undefined
// In regular scripts, this.name would be undefined
try {
    console.log("Detached call:", detachedGreet()); // this.name is undefined
} catch (e) {
    console.log("Detached call error:", e.message);
}


console.log("\n--- Example 2: `this` Binding in Arrow Functions ---");
// Arrow functions inherit `this` from the enclosing lexical scope
// They do NOT get their own `this` - ever

const team = {
    name: "Engineering",
    members: ["Alice", "Bob", "Charlie"],

    // Regular function as method - `this` refers to team object
    listMembersRegular: function() {
        console.log("Team (regular):", this.name);
        // Problem: inner regular function loses `this`
        this.members.forEach(function(member) {
            // `this` here is NOT the team object anymore!
            console.log(`  ${member} in ${this.name}`); // this.name is undefined
        });
    },

    // Regular function as method, arrow as callback - works correctly
    listMembersArrow: function() {
        console.log("Team (arrow callback):", this.name);
        // Arrow function inherits `this` from listMembersArrow
        this.members.forEach((member) => {
            // `this` here IS the team object (inherited from enclosing function)
            console.log(`  ${member} in ${this.name}`);
        });
    }
};

console.log("--- With regular forEach callback (this.name is undefined) ---");
team.listMembersRegular();
console.log("--- With arrow forEach callback (this.name works) ---");
team.listMembersArrow();


console.log("\n--- Example 3: Classic `this` Problem and Solutions ---");
const counter = {
    count: 0,

    // PROBLEM: Regular function in setTimeout loses `this`
    incrementBroken: function() {
        setTimeout(function() {
            this.count++; // `this` is NOT counter here
            console.log("Broken count:", this.count); // NaN
        }, 0);
    },

    // SOLUTION 1: The old `self = this` trick (pre-ES6)
    incrementWithSelf: function() {
        const self = this;
        setTimeout(function() {
            self.count++;
            console.log("Self trick count:", self.count);
        }, 0);
    },

    // SOLUTION 2: Using .bind(this)
    incrementWithBind: function() {
        setTimeout(function() {
            this.count++;
            console.log("Bind count:", this.count);
        }.bind(this), 0);
    },

    // SOLUTION 3 (BEST): Arrow function - inherits `this` naturally
    incrementWithArrow: function() {
        setTimeout(() => {
            this.count++;
            console.log("Arrow count:", this.count);
        }, 0);
    }
};

// Run them sequentially with setTimeout so they don't interfere
counter.count = 0;
counter.incrementBroken();

setTimeout(() => {
    counter.count = 10;
    counter.incrementWithSelf();
}, 50);

setTimeout(() => {
    counter.count = 20;
    counter.incrementWithBind();
}, 100);

setTimeout(() => {
    counter.count = 30;
    counter.incrementWithArrow();
}, 150);


// Give time for all setTimeouts to complete before continuing
setTimeout(() => {

console.log("\n--- Example 4: Arrow Functions as Object Methods (Caution!) ---");
// Do NOT use arrow functions as object methods - `this` will be wrong!

const user = {
    name: "Bob",

    // GOOD: Regular function as method
    greetRegular: function() {
        return `Hi, I'm ${this.name}`;
    },

    // GOOD: Shorthand method syntax (recommended)
    greetShorthand() {
        return `Hi, I'm ${this.name}`;
    },

    // BAD: Arrow function as method - `this` is the outer scope, NOT user
    greetArrow: () => {
        return `Hi, I'm ${typeof this === 'undefined' ? 'undefined' : this.name}`;
    }
};

console.log("Regular method:", user.greetRegular());   // "Hi, I'm Bob"
console.log("Shorthand method:", user.greetShorthand()); // "Hi, I'm Bob"
console.log("Arrow method:", user.greetArrow());  // `this` is NOT user!


console.log("\n--- Example 5: No `arguments` Object in Arrow Functions ---");
// Regular functions have a built-in `arguments` object
function regularSum() {
    console.log("arguments object:", Array.from(arguments));
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}
console.log("Regular sum(1,2,3):", regularSum(1, 2, 3));

// Arrow functions do NOT have `arguments`
// Use rest parameters (...args) instead
const arrowSum = (...args) => {
    console.log("rest args:", args);
    return args.reduce((sum, n) => sum + n, 0);
};
console.log("Arrow sum(1,2,3):", arrowSum(1, 2, 3));

// Arrows can access outer function's `arguments` (if nested inside one)
function outerFunction() {
    const innerArrow = () => {
        // This accesses outerFunction's arguments, not its own
        console.log("Outer arguments from arrow:", Array.from(arguments));
    };
    innerArrow();
}
outerFunction("a", "b", "c");


console.log("\n--- Example 6: Cannot Use Arrow Functions as Constructors ---");
// Regular functions can be used with `new` as constructors
function PersonRegular(name, age) {
    this.name = name;
    this.age = age;
}
const p1 = new PersonRegular("Alice", 30);
console.log("Regular constructor:", p1);
console.log("Instance check:", p1 instanceof PersonRegular);

// Arrow functions CANNOT be used with `new`
const PersonArrow = (name, age) => {
    this.name = name;
    this.age = age;
};

try {
    const p2 = new PersonArrow("Bob", 25);
} catch (e) {
    console.log("Arrow constructor error:", e.message);
    // "PersonArrow is not a constructor"
}


console.log("\n--- Example 7: No prototype Property on Arrows ---");
function RegularFunc() {}
const ArrowFunc = () => {};

console.log("Regular has prototype:", RegularFunc.prototype !== undefined); // true
console.log("Arrow has prototype:", ArrowFunc.prototype !== undefined);     // false

// This is why arrows can't be constructors - no prototype to assign


console.log("\n--- Example 8: Arrow vs Regular in Nested Scenarios ---");
const eventSimulator = {
    events: [],
    name: "EventBus",

    // Method using regular function
    on(eventName, callback) {
        this.events.push({ eventName, callback });
        console.log(`[${this.name}] Registered: ${eventName}`);
    },

    // Emit uses arrow in forEach to keep `this`
    emit(eventName, data) {
        // Arrow here correctly references `this.events` and `this.name`
        this.events
            .filter(e => e.eventName === eventName)
            .forEach(e => {
                console.log(`[${this.name}] Emitting: ${eventName}`);
                e.callback(data);
            });
    }
};

eventSimulator.on("click", (data) => console.log("  Click handler:", data));
eventSimulator.on("hover", (data) => console.log("  Hover handler:", data));
eventSimulator.on("click", (data) => console.log("  Another click:", data));
eventSimulator.emit("click", { x: 100, y: 200 });
eventSimulator.emit("hover", { element: "button" });


console.log("\n--- Example 9: Practical Decision Guide ---");
// When to use ARROW functions:
const examples = {
    // 1. Callbacks and inline functions
    doubled: [1, 2, 3].map(x => x * 2),

    // 2. Short utility functions
    isPositive: null, // defined below

    // 3. Inside methods when you need parent `this`
    // (see setTimeout examples above)
};
const isPositive = n => n > 0;
examples.isPositive = [3, -1, 5, -2].filter(isPositive);

console.log("Doubled:", examples.doubled);
console.log("Positive:", examples.isPositive);

// When to use REGULAR functions:
// 1. Object methods (use shorthand syntax)
// 2. Constructors (use class or function)
// 3. When you need `arguments` object
// 4. When you need `this` to be dynamically bound

const guidelines = {
    arrow: ["callbacks", "array methods", "short utils", "preserving this"],
    regular: ["object methods", "constructors", "dynamic this", "arguments object"]
};
console.log("\nUse ARROW for:", guidelines.arrow.join(", "));
console.log("Use REGULAR for:", guidelines.regular.join(", "));


// === KEY TAKEAWAYS ===
// 1. Arrow functions do NOT have their own `this` - they inherit from enclosing scope
// 2. Regular functions get `this` based on HOW they are called (method, standalone, new)
// 3. Do NOT use arrows as object methods - `this` will not refer to the object
// 4. Arrow functions do NOT have an `arguments` object - use rest params (...args)
// 5. Arrow functions CANNOT be used as constructors (no `new`)
// 6. Arrow functions have no `prototype` property
// 7. Use arrows for callbacks and inline functions where you want lexical `this`
// 8. Use regular functions (or shorthand methods) for object methods
// 9. Java parallel: Java lambdas capture enclosing `this` (like arrows),
//    anonymous inner classes have their own `this` (like regular functions)

}, 200); // end of setTimeout wrapper for async examples
