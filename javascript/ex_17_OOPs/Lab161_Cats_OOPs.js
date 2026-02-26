// Converted from: ex_17_OOPs/Lab161_Cats_OOPs.java

/**
 * JavaScript does not support constructor overloading like Java.
 * Instead, we use a single constructor with default parameters
 * or conditional logic to handle different argument combinations.
 */

class Cat {
    name; // instance variable

    // JS doesn't support multiple constructors - using default params to simulate DC and PC
    constructor(nameParam = undefined) {
        if (nameParam === undefined) {
            this.name = "Kitty";
        } else {
            this.name = nameParam;
        }
    }

    running() {
        let local_var = 10; // Local variable
        console.log("Who is running -> " + this.name);
    }
}

// main
let c1;
let c2;
const c23 = new Cat();
const c24 = new Cat("Lucy");
const c25 = new Cat("Spicy");
const c26 = new Cat("Mirchi");
/* new Cat(); */

console.log(c24.name);
console.log(c25.name);

// c24.running();
c25.running();
c26.running();
