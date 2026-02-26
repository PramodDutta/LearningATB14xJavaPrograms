// super keyword with inheritance, method overriding, and method overloading

// NOTE: JavaScript does not support method overloading like Java. Using default parameters/type checking as alternative.

class Vehicle {
    maxSpeed = 180;

    noTest() {
        console.log("Empty!");
    }

    constructor(...args) {
        if (args.length === 0) {
            console.log("Default Const");
        } else if (args.length === 1) {
            console.log("Param Con");
        } else if (args.length === 2) {
            console.log("Param Con");
        }
    }

    // Method Overloading - Same, same name function with different arguments.
    message(a = undefined) {
        if (a === undefined) {
            console.log("No Return, No Argument");
        } else {
            console.log("PC - arguemnt");
        }
    }

    drive() {
        console.log("Vehicle Parent");
    }
}

class Car extends Vehicle {
    #maxSpeed = 281;

    constructor(...args) {
        if (args.length === 0) {
            super(100);
        } else {
            super();
            console.log("PC Car");
        }
    }

    test() {}

    drive() {
        console.log("Over ridden the Vehicle");
        console.log(super.maxSpeed);
        console.log(this.#maxSpeed);
        super.noTest();
        this.test();
    }
}

// Car
const tesla = new Car(300);
tesla.drive();
