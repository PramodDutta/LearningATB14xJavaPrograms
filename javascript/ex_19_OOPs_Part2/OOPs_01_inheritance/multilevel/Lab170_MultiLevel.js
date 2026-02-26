// Converted from: ex_19_OOPs_Part2/OOPs_01_inheritance/multilevel/Lab170_MultiLevel.java

const Son = require('./Son');
const Father = require('./Father');
const GrandFather = require('./GrandFather');

// main
const pramod = new Son();
pramod.home();
pramod.bhk3();
pramod.gf();
pramod.extra();

const f = new Father();
f.gf();
f.home();
f.extra();

const gf = new GrandFather();
gf.gf();
gf.home();

// Dynamic Dispatch
// In JavaScript, there is no strict type checking for variable declarations,
// so dynamic dispatch works differently than in Java.
// Any variable can hold any object type.
const g1 = new Son();
const f1 = new Son();
// const s1 = new GrandFather(); // Cannot assign parent to child type in Java
// const s2 = new Father(); // Cannot assign parent to child type in Java
