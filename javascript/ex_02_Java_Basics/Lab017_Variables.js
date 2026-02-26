// Converted from Java: Lab017_Variables.java
// Note: Java has a 'byte' type with range -128 to 127, so 128 overflows.
// JavaScript has no such restriction; all numbers are 64-bit floating point.

// let age = 128; // Out of range for Java byte, but fine in JS
let age = 128;
age = age + 1;
age = 76;
console.log(age);
