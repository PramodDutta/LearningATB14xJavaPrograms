// Extra_04_ObjectMethods_Advanced.js
// Topic: Advanced Object Methods - Part 4 of 7
// Extends: ex_28_Object
//
// CONCEPT: JavaScript objects have advanced creation patterns including Object.create()
// for prototypal inheritance, computed property names for dynamic keys, shorthand syntax
// for concise object literals, and Object.defineProperty() for fine-grained control.
// JAVA COMPARISON: Object.create() is like Java inheritance without classes. Computed
// properties have no Java equivalent. defineProperty() is similar to Java's reflection API.
// PLAYWRIGHT RELEVANCE: Computed properties are used in dynamic test data, shorthand
// in page object methods, and defineProperty for custom matchers and fixture setup.
// ============================================================

console.log("--- Example 1: Object.create() for prototypal inheritance ---");

// Object.create() creates a new object with a specified prototype
const animal = {
    type: "Animal",
    speak() {
        return `${this.name} makes a sound`;
    },
    describe() {
        return `${this.name} is a ${this.type}`;
    },
};

// dog's prototype is animal — dog inherits speak() and describe()
const dog = Object.create(animal);
dog.name = "Rex";
dog.type = "Dog";
dog.fetch = function () {
    return `${this.name} fetches the ball!`;
};

console.log("  dog.speak():", dog.speak());      // Rex makes a sound
console.log("  dog.describe():", dog.describe()); // Rex is a Dog
console.log("  dog.fetch():", dog.fetch());       // Rex fetches the ball!

// Check prototype chain
console.log("  dog has own 'name':", dog.hasOwnProperty("name"));     // true
console.log("  dog has own 'speak':", dog.hasOwnProperty("speak"));   // false (inherited)
console.log("  animal is prototype:", Object.getPrototypeOf(dog) === animal); // true

// Object.create(null) — no prototype at all (no toString, valueOf, etc.)
const pureDict = Object.create(null);
pureDict.key1 = "value1";
pureDict.key2 = "value2";
console.log("\n  Pure dictionary (no prototype):", JSON.stringify(pureDict));
console.log("  Has toString?", "toString" in pureDict);  // false — truly empty

// Object.create() with property descriptors
const point = Object.create(
    { distanceTo(other) { return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2); } },
    {
        x: { value: 0, writable: true, enumerable: true },
        y: { value: 0, writable: true, enumerable: true },
    }
);
point.x = 3;
point.y = 4;
console.log("  Point:", point.x, point.y);
console.log("  Distance to origin:", point.distanceTo({ x: 0, y: 0 }));

console.log("\n--- Example 2: Computed property names ---");

// Dynamic keys using [expression] syntax
const field = "username";
const dynamicObj = {
    [field]: "alice",            // computed from variable
    [`${field}_length`]: 5,      // computed from template literal
    ["is" + "Active"]: true,     // computed from concatenation
};
console.log("  Dynamic object:", dynamicObj);
// { username: "alice", username_length: 5, isActive: true }

// Practical: building objects from dynamic data
function createTestData(fields) {
    const data = {};
    for (const { name, value } of fields) {
        data[name] = value;
    }
    return data;
}

const formData = createTestData([
    { name: "firstName", value: "John" },
    { name: "lastName", value: "Doe" },
    { name: "email", value: "john@example.com" },
]);
console.log("  Test data:", formData);

// Computed keys in array methods
const statuses = ["passed", "failed", "passed", "skipped", "passed", "failed"];
const counts = statuses.reduce((acc, status) => {
    acc[status] = (acc[status] || 0) + 1;
    return acc;
}, {});
console.log("\n  Status counts:", counts);

// Symbol as computed key
const ID = Symbol("id");
const secretObj = {
    [ID]: 42,
    name: "visible",
};
console.log("  Symbol key access:", secretObj[ID]);
console.log("  Object.keys():", Object.keys(secretObj)); // ["name"] — symbol not included

// Dynamic method names
const httpMethods = ["get", "post", "put", "delete"];
const handlers = {};
for (const method of httpMethods) {
    handlers[`handle${method.charAt(0).toUpperCase() + method.slice(1)}`] = function (url) {
        return `${method.toUpperCase()} ${url}`;
    };
}
console.log("\n  Dynamic method:", handlers.handleGet("/api/users"));
console.log("  Dynamic method:", handlers.handlePost("/api/users"));

console.log("\n--- Example 3: Shorthand properties and methods ---");

// Shorthand properties: when variable name matches key name
const name = "Alice";
const age = 30;
const role = "engineer";

// Long form
const longForm = { name: name, age: age, role: role };

// Shorthand — identical result
const shortForm = { name, age, role };
console.log("  Long form:", longForm);
console.log("  Short form:", shortForm);

// Shorthand methods
const calculator = {
    // Long form: add: function(a, b) { return a + b; }
    add(a, b) { return a + b; },
    subtract(a, b) { return a - b; },
    multiply(a, b) { return a * b; },
    divide(a, b) {
        if (b === 0) throw new Error("Division by zero");
        return a / b;
    },
};

console.log("\n  Shorthand methods:");
console.log("  add(5, 3):", calculator.add(5, 3));
console.log("  subtract(10, 4):", calculator.subtract(10, 4));
console.log("  multiply(3, 7):", calculator.multiply(3, 7));

// Combining shorthand with computed names
function createPageObject(pageName, baseUrl) {
    const url = `${baseUrl}/${pageName.toLowerCase()}`;
    const title = `${pageName} Page`;

    return {
        url,                        // shorthand property
        title,                      // shorthand property
        navigate() {                // shorthand method
            return `Navigating to ${this.url}`;
        },
        [`verify${pageName}Loaded`]() {  // computed shorthand method
            return `Verified ${this.title} is loaded`;
        },
    };
}

const loginPage = createPageObject("Login", "https://example.com");
console.log("\n  Page object:", loginPage);
console.log("  Navigate:", loginPage.navigate());
console.log("  Verify:", loginPage.verifyLoginLoaded());

console.log("\n--- Example 4: Object.defineProperty() ---");

const user = { firstName: "John", lastName: "Doe" };

// Define a computed property (getter)
Object.defineProperty(user, "fullName", {
    get() {
        return `${this.firstName} ${this.lastName}`;
    },
    set(value) {
        const [first, ...rest] = value.split(" ");
        this.firstName = first;
        this.lastName = rest.join(" ");
    },
    enumerable: true,     // shows up in Object.keys()
    configurable: true,   // can be deleted or reconfigured
});

console.log("  fullName getter:", user.fullName);    // "John Doe"
user.fullName = "Jane Smith";
console.log("  After setter:", user.firstName, user.lastName); // "Jane" "Smith"

// Non-enumerable property — hidden from iteration
Object.defineProperty(user, "_internal", {
    value: "secret-data",
    enumerable: false,     // won't show in Object.keys() or for...in
    writable: true,
});

console.log("\n  Keys (enumerable):", Object.keys(user));    // no _internal
console.log("  _internal value:", user._internal);           // still accessible directly

// Read-only property
Object.defineProperty(user, "id", {
    value: "usr_12345",
    writable: false,       // cannot be changed
    enumerable: true,
    configurable: false,   // cannot be deleted or reconfigured
});

user.id = "hacked";  // silently fails
console.log("  Read-only id:", user.id); // still "usr_12345"

// Object.defineProperties() — define multiple at once
const product = {};
Object.defineProperties(product, {
    name: { value: "Widget", writable: true, enumerable: true, configurable: true },
    price: { value: 29.99, writable: true, enumerable: true, configurable: true },
    sku: { value: "WDG-001", writable: false, enumerable: true, configurable: false },
});
console.log("\n  Product:", product);

// Get property descriptor
const desc = Object.getOwnPropertyDescriptor(product, "sku");
console.log("  SKU descriptor:", desc);
// { value: "WDG-001", writable: false, enumerable: true, configurable: false }

console.log("\n--- Example 5: Getters and setters in object literals ---");

const tempConverter = {
    _celsius: 0,

    get celsius() {
        return this._celsius;
    },
    set celsius(value) {
        if (typeof value !== "number") throw new TypeError("Temperature must be a number");
        this._celsius = value;
    },

    get fahrenheit() {
        return (this._celsius * 9) / 5 + 32;
    },
    set fahrenheit(value) {
        this._celsius = ((value - 32) * 5) / 9;
    },

    get kelvin() {
        return this._celsius + 273.15;
    },
    set kelvin(value) {
        this._celsius = value - 273.15;
    },
};

tempConverter.celsius = 100;
console.log("  100C in F:", tempConverter.fahrenheit);    // 212
console.log("  100C in K:", tempConverter.kelvin);        // 373.15

tempConverter.fahrenheit = 72;
console.log("\n  72F in C:", tempConverter.celsius.toFixed(2));   // 22.22
console.log("  72F in K:", tempConverter.kelvin.toFixed(2));     // 295.37

// Practical: validated property with getter/setter
const formField = {
    _value: "",
    _errors: [],

    get value() {
        return this._value;
    },
    set value(val) {
        this._errors = [];
        if (typeof val !== "string") {
            this._errors.push("Value must be a string");
        } else if (val.length < 3) {
            this._errors.push("Value must be at least 3 characters");
        } else if (val.length > 50) {
            this._errors.push("Value must be at most 50 characters");
        }
        this._value = val;
    },

    get isValid() {
        return this._errors.length === 0;
    },
    get errors() {
        return [...this._errors];
    },
};

console.log("\n  Form validation:");
formField.value = "ab";
console.log(`  "${formField.value}": valid=${formField.isValid}, errors=${formField.errors}`);

formField.value = "valid input";
console.log(`  "${formField.value}": valid=${formField.isValid}, errors=${formField.errors}`);

// === KEY TAKEAWAYS ===
// 1. Object.create(proto) creates objects with explicit prototype — inheritance without classes
// 2. Object.create(null) creates a truly empty object — no inherited methods at all
// 3. Computed properties [expr]: value let you use dynamic keys in object literals
// 4. Shorthand { name } is equivalent to { name: name } when variable matches key
// 5. Shorthand methods { greet() {} } are cleaner than { greet: function() {} }
// 6. Object.defineProperty() gives fine control: writable, enumerable, configurable
// 7. Getters (get prop()) and setters (set prop(val)) enable computed/validated properties
// 8. These patterns appear in Playwright page objects, test utilities, and config factories
