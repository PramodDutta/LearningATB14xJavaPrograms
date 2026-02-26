// Lab147_Sbuilder.js
// Converted from Java: Lab147_Sbuilder.java
// NOTE: Java's StringBuffer/StringBuilder has no direct JS equivalent. JS strings are immutable.
// Using array join or string concatenation as alternative.

// StringBuilder equivalent
let sb = "Hello";
sb += " World"; // Hello World
sb = sb.split('').reverse().join(''); // dlroW olleH
console.log(sb);
