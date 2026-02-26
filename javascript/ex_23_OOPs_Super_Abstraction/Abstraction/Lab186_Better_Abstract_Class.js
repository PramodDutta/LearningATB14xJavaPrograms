// NOTE: JavaScript has no abstract classes. Simulating by throwing Error in base class methods.
// NOTE: JavaScript has no interfaces. Using duck typing - objects just need to implement expected methods.

// Interfaces simulated as documentation/contracts
// interface Tyre { rubberTyre(), blackColorDoToTyre() }
// interface Gear { changeGear() }
// interface Engine { startEngine() }

class Car1 {
    constructor() {
        if (new.target === Car1) {
            throw new Error("Cannot instantiate abstract class Car1");
        }
    }

    startCar() {
        throw new Error("Abstract method startCar() must be implemented by subclass");
    }

    stopCar() {
        throw new Error("Abstract method stopCar() must be implemented by subclass");
    }
}

class Alto extends Car1 {
    // Implements Tyre, Gear, Engine interfaces (duck typing)

    drive() {
        this.rubberTyre();
        this.blackColorDoToTyre();
        this.startCar();
        this.startEngine();
        this.changeGear();
        this.stopCar();
    }

    startCar() {
        console.log("Starting the car");
    }

    stopCar() {
        console.log("Stop the car");
    }

    changeGear() {
        console.log("changeGear the car");
    }

    rubberTyre() {
        console.log("rubberTyre the car");
    }

    blackColorDoToTyre() {
        console.log("blackColorDoToTyre the car");
    }

    startEngine() {
        console.log("Staring engine");
    }
}

// abstract class A -- empty abstract class
class A {
    constructor() {
        if (new.target === A) {
            throw new Error("Cannot instantiate abstract class A");
        }
    }
}

const a = new Alto();
a.drive();
// const c = new Car1(); // Cannot instantiate abstract class
