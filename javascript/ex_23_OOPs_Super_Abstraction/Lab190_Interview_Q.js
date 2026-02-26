// NOTE: JavaScript has no interfaces. Using duck typing - objects just need to implement expected methods.
// Interview Questions on Inheritance and Interfaces

// interface I11 {}
// interface I12 {}

class A1 {}
class B1 {}

// class Test2 extends A1, B1 {} // Not allowed - no multiple class inheritance in JS either

class Test3 {
    // Implements I11 (duck typing)
}

class Test4 {
    // Implements I12, I11 (duck typing)
}

class Test5 extends A1 {
    // Implements I11, I12 (duck typing)
}

// class Test5 implements I11 extends A {} // Invalid syntax in Java
// interface I3 extends A1 {} // Invalid in Java - interface can't extend class
