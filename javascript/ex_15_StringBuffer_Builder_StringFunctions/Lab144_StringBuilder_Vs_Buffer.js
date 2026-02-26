// Lab144_StringBuilder_Vs_Buffer.js
// Converted from Java: Lab144_StringBuilder_Vs_Buffer.java
// NOTE: Java's StringBuffer/StringBuilder has no direct JS equivalent. JS strings are immutable.
// Using array join or string concatenation as alternative.
// In Java, StringBuffer is thread-safe (synchronized) and StringBuilder is not.
// In JavaScript, there is no threading concern with strings.

// String - 90%
const s0 = "Pramod";
const s1 = new String("Pramod");

// less than <10% used.
// StringBuffer and StringBuilder equivalent - just use strings in JS
let stringBuffer = "Pramod";
let stringBuilder = "Pramod";

console.log(stringBuffer);
console.log(stringBuilder);
console.log(stringBuffer.split('').reverse().join(''));
console.log(stringBuilder.split('').reverse().join(''));
