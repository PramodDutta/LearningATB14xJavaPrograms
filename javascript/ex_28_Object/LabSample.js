// NOTE: JavaScript objects don't have hashCode(). Use toString(), constructor.name, and === for equivalents.

// In Java: public class LabSample extends Object
// In JS, all classes implicitly extend Object, so no need to explicitly extend it.
class LabSample {
    constructor() {
        // In Java: super(); -- JS classes implicitly call Object constructor
    }

    // NOTE: JavaScript has no finalize() method. Garbage collection is automatic.
    // In Java: protected void finalize() throws Throwable { super.finalize(); }

    // Override toString() -- works the same in JS as in Java
    toString() {
        return super.toString(); // Returns "[object Object]" by default
    }

    // In Java: protected Object clone() throws CloneNotSupportedException
    // NOTE: JS has no built-in clone(). Use spread operator {...obj} or Object.assign({}, obj).
    clone() {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }

    // In Java: public boolean equals(Object obj)
    // NOTE: JS uses === for reference equality. Custom equals() must be implemented manually.
    equals(obj) {
        return this === obj; // Reference equality, same as Java's default Object.equals()
    }

    // In Java: public int hashCode()
    // NOTE: JavaScript has no hashCode() equivalent. There is no built-in way to get a hash code for an object.
    hashCode() {
        // No equivalent in JavaScript -- returning a placeholder
        return 0;
    }
}

// Demonstrate usage
let sample = new LabSample();
console.log(sample.toString());
console.log(sample.equals(sample)); // true
console.log(sample.constructor.name); // "LabSample" (equivalent of getClass().getName())
