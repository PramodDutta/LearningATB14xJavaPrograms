// NOTE: JavaScript supports static methods and fields in ES6+ classes.
// Static blocks (static initializer blocks) are supported in ES2022+.

class A {
    // Static Initializer Block - called only once when the class is loaded
    static {
        console.log("Called only Once when Class is loaded");
        console.log("You can write a code reading a excel, file, , database file");
    }

    static a = 10;

    static m1() {
        console.log("static functionc");
    }
}

// Main
const a = new A();
