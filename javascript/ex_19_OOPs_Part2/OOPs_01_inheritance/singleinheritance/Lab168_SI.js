// Converted from: ex_19_OOPs_Part2/OOPs_01_inheritance/singleinheritance/Lab168_SI.java

const Son = require('./Son');
const Father = require('./Father');

// main
const pramod = new Son();
console.log(pramod.gold_f);
pramod.bhk2();
pramod.bhk3();

const f1 = new Father();
console.log(f1.gold_f);
f1.bhk2();
// f1.bhk3(); // Father does not have bhk3()
