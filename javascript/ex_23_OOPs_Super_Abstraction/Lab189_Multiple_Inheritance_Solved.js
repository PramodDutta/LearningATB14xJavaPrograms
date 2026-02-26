// NOTE: JavaScript has no interfaces. Using duck typing - objects just need to implement expected methods.
// Multiple inheritance solved via interfaces in Java, duck typing in JS.

// interface Father1 { a = 10 (final), money() }
// interface Father2 { money() }

const FATHER1_A = 10; // final int a = 10 from Father1 interface

class Child1 {
    // Implements Father1, Father2 interfaces (duck typing)

    money() {
        console.log("Child Money!");
    }
}
