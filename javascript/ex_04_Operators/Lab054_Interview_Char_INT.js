// Converted from Java: Lab054_Interview_Char_INT.java
// Note: In Java, adding two chars returns an int (their ASCII values are summed).
// In JavaScript, adding two single-character strings concatenates them.
// To replicate Java's behavior, use charCodeAt() to get ASCII values.

let a1 = 'A'; //  ASCII -> 65
let a2 = 'B'; //  ASCII -> 66
console.log(a1.charCodeAt(0) + a2.charCodeAt(0)); // AB or 65+66 -> 131 in Java
// char are nothing but int :D
