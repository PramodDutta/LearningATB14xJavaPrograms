// NOTE: JavaScript has no wrapper classes. Primitives are auto-boxed when methods are called on them.
// In JavaScript, there is no distinction between primitive types and their wrapper classes.
// All numbers are of type 'number', strings are 'string', booleans are 'boolean'.

class ATB1 {
    constructor() {
        this.name = null;      // String
        this.phone = null;     // Long -> number in JS
        this.salary = null;    // Integer -> number in JS
        this.GST = null;       // Float -> number in JS
        this.isMarried = null; // Boolean -> boolean in JS
    }
}
