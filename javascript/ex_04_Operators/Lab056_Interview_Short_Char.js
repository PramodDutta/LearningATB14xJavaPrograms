// Converted from Java: Lab056_Interview_Short_Char.java
// Note: In Java, adding a short and a char results in an int (10 + 65 = 75).
// In JavaScript, strings don't auto-convert to their char code, so we use charCodeAt().

let s = 10;
let c = 'A'; // ASCII -> 65
console.log(s + c.charCodeAt(0));
