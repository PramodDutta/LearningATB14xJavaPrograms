// Method Overriding - Runtime Polymorphism

class Father {
    home() {
        console.log("2BHK");
    }
}

class Pramod extends Father {
    home() {
        console.log("3BHK");
    }
}

// Runtime Polymorphism.

// const p1 = new Pramod();
// p1.home();

// const f1 = new Father();
// f1.home();

const f2 = new Pramod(); // Dynamic Dispatch
f2.home();

// const p1 = new Father();
// When father is getting born, child reference cannot be given to.
