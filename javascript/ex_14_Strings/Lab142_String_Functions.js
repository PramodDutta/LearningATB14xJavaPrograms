// Lab142_String_Functions.js
// Converted from Java: Lab142_String_Functions.java

//        const s1 = "HELLO"; // SCP
//        const s2 = new String("world"); // OA
const str1 = "Hello";
const str2 = "Hello";
const str3 = new String("Hello");

console.log(str1 === str2);           // true (same primitive value)
console.log(str1 === str3.valueOf()); // true (comparing primitive to String object's value)
// NOTE: In Java, str1 == str3 would be false (different references)
console.log(str1 === str3.valueOf()); // true (value comparison)

console.log(str1.concat(str3.valueOf()));
