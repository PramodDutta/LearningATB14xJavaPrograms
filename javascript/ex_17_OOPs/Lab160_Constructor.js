// Converted from: ex_17_OOPs/Lab160_Constructor.java

/**
 * JavaScript does not support constructor overloading like Java.
 * Instead, we use a single constructor with default parameters
 * or conditional logic to handle different argument combinations.
 */

class Student {
    name;

    // JS doesn't support multiple constructors - using default params to simulate DC and PC
    constructor(name = undefined) {
        if (name === undefined) {
            // DC
            console.log("DC -> Hi, i am called.");
        } else {
            // PC
            console.log("PC -> Hi," + name);
        }
        this.name = name;
    }

    sleep() {}
    study() {}
    eat() {}
}

// main
const s1 = new Student();
const s2 = new Student("Pramod");
