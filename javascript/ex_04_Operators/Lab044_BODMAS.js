// Converted from Java: Lab044_BODMAS.java
// Note: In Java, 9 * 3 / 9 uses integer division. In JavaScript, we use Math.trunc()
// to replicate the integer division behavior for the inner expression.

console.log((Math.trunc(9 * 3 / 9) + 1) * 3);
// BODMAS
// 9x3 -> 27
// 27/9 -> 3
// 3+1 -> 4
// 4x3 -> 12
