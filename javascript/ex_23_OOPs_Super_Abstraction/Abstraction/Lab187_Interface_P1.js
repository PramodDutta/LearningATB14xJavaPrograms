// NOTE: JavaScript has no interfaces. Using duck typing - objects just need to implement expected methods.

// interface Brakes { applyBreak() }
// interface Engine1 { startEngine(), stopEngine(), testEngine() (default), testEngine1() (default) }

class Car2 {
    // Implements Brakes, Engine1 interfaces (duck typing)

    drive() {
        this.startEngine();
        this.applyBreak();
        this.stopEngine();
    }

    testEngine() {
        console.log("Override by the Car 1");
    }

    applyBreak() {
        console.log("Apply Break");
    }

    startEngine() {
        console.log("Start Engine");
    }

    stopEngine() {
        console.log("Stop Engine");
    }

    // Default method from Engine1 interface
    testEngine1() {
        console.log("concrete complete");
    }
}

const car2 = new Car2();
car2.drive();

// const i = new Brakes(); // Cannot instantiate interface
