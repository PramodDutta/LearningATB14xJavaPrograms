// Extra_03_TaggedTemplates.js
// Topic: Tagged Templates - Part 3 of 6
// Extends: ex_14_Strings
//
// CONCEPT: Tagged templates let you process a template literal with a function. The tag
// function receives an array of string pieces and the interpolated values as separate
// arguments. This enables custom string processing like escaping HTML, building SQL
// queries safely, or creating DSLs (domain-specific languages).
// JAVA COMPARISON: No equivalent in Java. This is a unique JavaScript feature. The
// closest Java concept might be custom annotation processors, but that's compile-time.
// PLAYWRIGHT RELEVANCE: Libraries may use tagged templates for CSS selectors or
// locator builders. Understanding them helps read advanced Playwright helper utilities.
// ============================================================

console.log("--- Example 1: How Tagged Templates Work ---");

// A tagged template is: tagFunction`template string with ${values}`
// The tag function receives:
//   - strings: array of static string pieces
//   - ...values: the interpolated expression results

function inspect(strings, ...values) {
    console.log("strings array:", strings);
    console.log("strings.raw:", strings.raw);  // raw versions (no escape processing)
    console.log("values:", values);
    console.log("Number of string parts:", strings.length);
    console.log("Number of values:", values.length);
    // strings.length is ALWAYS values.length + 1
    return "inspect done";
}

const name = "Alice";
const age = 30;
const result = inspect`Hello ${name}, you are ${age} years old!`;
console.log("Return value:", result);


console.log("\n--- Example 2: Rebuilding the String Manually ---");

function rebuild(strings, ...values) {
    let result = "";
    strings.forEach((str, i) => {
        result += str;
        if (i < values.length) {
            result += values[i];
        }
    });
    return result;
}

const greeting = rebuild`Hello ${name}, you are ${age} years old!`;
console.log("Rebuilt:", greeting);

// Using reduce (more concise)
function rebuildReduce(strings, ...values) {
    return strings.reduce((acc, str, i) => {
        return acc + str + (values[i] !== undefined ? values[i] : "");
    }, "");
}

console.log("Rebuilt (reduce):", rebuildReduce`Hi ${name}, age ${age}!`);


console.log("\n--- Example 3: HTML Escaping Tag ---");

// Prevent XSS by escaping interpolated values
function escapeHTML(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function html(strings, ...values) {
    return strings.reduce((acc, str, i) => {
        const val = i < values.length ? escapeHTML(values[i]) : "";
        return acc + str + val;
    }, "");
}

const userInput = '<script>alert("XSS attack!")</script>';
const safeHTML = html`<div class="user-content">${userInput}</div>`;
console.log("Safe HTML:", safeHTML);
// Output: <div class="user-content">&lt;script&gt;alert(&quot;XSS attack!&quot;)&lt;/script&gt;</div>

const userName = "Alice & Bob <friends>";
const message = html`<p>Hello, ${userName}! Welcome to our site.</p>`;
console.log("Safe message:", message);


console.log("\n--- Example 4: CSS Tag Example ---");

// A tag that processes CSS-like template literals
function css(strings, ...values) {
    const rawCSS = strings.reduce((acc, str, i) => {
        return acc + str + (values[i] !== undefined ? values[i] : "");
    }, "");

    // Parse into a simple object (basic implementation)
    const properties = {};
    rawCSS
        .trim()
        .split(";")
        .filter(line => line.trim())
        .forEach(declaration => {
            const [prop, val] = declaration.split(":").map(s => s.trim());
            if (prop && val) {
                properties[prop] = val;
            }
        });

    return {
        raw: rawCSS.trim(),
        properties,
        toString() {
            return this.raw;
        },
    };
}

const primaryColor = "#3498db";
const fontSize = 16;
const padding = 8;

const buttonStyle = css`
    background-color: ${primaryColor};
    font-size: ${fontSize}px;
    padding: ${padding}px ${padding * 2}px;
    border: none;
    border-radius: 4px;
    color: white
`;

console.log("CSS raw:", buttonStyle.raw);
console.log("CSS properties:", buttonStyle.properties);
console.log("Font size:", buttonStyle.properties["font-size"]);


console.log("\n--- Example 5: Highlight Tag (Marking Interpolated Values) ---");

function highlight(strings, ...values) {
    return strings.reduce((acc, str, i) => {
        const val = i < values.length ? `[[ ${values[i]} ]]` : "";
        return acc + str + val;
    }, "");
}

const item = "laptop";
const price = 999.99;
const qty = 2;

console.log(highlight`You ordered ${qty} x ${item} for $${price} each`);
// Output: You ordered [[ 2 ]] x [[ laptop ]] for $[[ 999.99 ]] each


console.log("\n--- Example 6: Uppercase Values Tag ---");

function shout(strings, ...values) {
    return strings.reduce((acc, str, i) => {
        const val = i < values.length ? String(values[i]).toUpperCase() : "";
        return acc + str + val;
    }, "");
}

const action = "click";
const element = "submit button";
console.log(shout`Please ${action} the ${element} to continue`);


console.log("\n--- Example 7: Debug / Log Tag ---");

function debug(strings, ...values) {
    const output = strings.reduce((acc, str, i) => {
        if (i < values.length) {
            const type = typeof values[i];
            const display = type === "object" ? JSON.stringify(values[i]) : values[i];
            return acc + str + `${display} (${type})`;
        }
        return acc + str;
    }, "");
    console.log("[DEBUG]", output);
    return output;
}

const user = { name: "Bob", role: "admin" };
const isActive = true;
const count = 42;

debug`User ${user} is active: ${isActive}, login count: ${count}`;


console.log("\n--- Example 8: SQL-Safe Tag (Parameterized Queries) ---");

// Simulating parameterized queries to prevent SQL injection
function sql(strings, ...values) {
    const params = [];
    const query = strings.reduce((acc, str, i) => {
        if (i < values.length) {
            params.push(values[i]);
            return acc + str + `$${params.length}`; // $1, $2, etc.
        }
        return acc + str;
    }, "");

    return {
        text: query.trim().replace(/\s+/g, " "),
        params,
        toString() {
            return `Query: ${this.text} | Params: [${this.params.join(", ")}]`;
        },
    };
}

const tableName = "users"; // Note: table names shouldn't be parameterized in real SQL
const searchName = "Alice'; DROP TABLE users; --"; // SQL injection attempt
const minAge = 18;

// The interpolated values become safe parameters, not part of the query string
const query = sql`SELECT * FROM users WHERE name = ${searchName} AND age >= ${minAge}`;
console.log("Query text:", query.text);
console.log("Query params:", query.params);
console.log("Full:", query.toString());
// The injection attempt is safely captured as a parameter value


console.log("\n--- Example 9: Conditional Template Tag ---");

function onlyIf(strings, ...values) {
    return strings.reduce((acc, str, i) => {
        if (i < values.length) {
            // If value is falsy (null, undefined, false, 0, ""), omit it AND surrounding text
            if (!values[i] && values[i] !== 0) {
                return acc; // Skip this segment
            }
            return acc + str + values[i];
        }
        return acc + str;
    }, "");
}

const middleName = null;
const suffix = "Jr.";
const nickname = "";

console.log(onlyIf`Name: Alice ${middleName} Johnson ${suffix}`);
console.log(onlyIf`Also known as: ${nickname}`);


console.log("\n--- Example 10: String.raw Built-in Tag ---");

// String.raw is JavaScript's only built-in tagged template
// It returns the raw string without processing escape sequences

console.log(`Normal:    C:\\Users\\name\\docs`);  // backslashes get escape-processed
console.log(String.raw`String.raw: C:\Users\name\docs`);  // backslashes preserved

console.log(`Normal:    Line1\nLine2`);
console.log(String.raw`String.raw: Line1\nLine2`);  // \n is literal, not newline

// Useful for regex patterns and file paths
const rawRegex = String.raw`\d+\.\d+\.\d+`;
console.log("Raw regex pattern:", rawRegex);

const windowsPath = String.raw`C:\Program Files\MyApp\config.json`;
console.log("Windows path:", windowsPath);


console.log("\n--- Example 11: Composing Tags ---");

// You can chain tagged templates by having one tag call another
function trim(strings, ...values) {
    const result = strings.reduce((acc, str, i) => {
        return acc + str + (i < values.length ? values[i] : "");
    }, "");
    return result.trim().replace(/\s+/g, " ");
}

const multiLineResult = trim`
    Hello ${name},
    Welcome to our
    application!
`;
console.log("Trimmed:", multiLineResult);


// === KEY TAKEAWAYS ===
// 1. Tagged templates: tagFunction`string ${value}` — the function processes the template
// 2. Tag function receives (strings[], ...values) — strings has one more element than values
// 3. strings.raw gives unprocessed escape sequences; String.raw is the built-in tag for this
// 4. Common uses: HTML escaping, SQL parameterization, CSS builders, debug logging
// 5. The html tag prevents XSS by escaping interpolated values before inserting them
// 6. The sql tag separates query structure from values (like prepared statements)
// 7. Tagged templates are a powerful metaprogramming feature unique to JavaScript
