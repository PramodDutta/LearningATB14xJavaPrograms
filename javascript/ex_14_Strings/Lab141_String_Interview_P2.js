// Lab141_String_Interview_P2.js
// Converted from Java: Lab141_String_Interview_P2.java

// NOTE: In Java, == checks reference equality for objects, and .equals() checks value equality.
// In JavaScript, === checks both type and value for primitives, but reference for objects.
// For String objects created with 'new String()', === compares references, not values.

const s1 = "Hello";
const s4 = "Hello";

const s2 = new String("Hello");
const s3 = new String("Hello");
const s5 = new String("hello");

// === -> Comparison -> String => this checks reference for objects, value for primitives
console.log(s1 === s3.valueOf()); // In Java: s1 == s3 is false (different refs). In JS with valueOf(): true
console.log(s1 === s2.valueOf()); // In Java: s1 == s2 is false. In JS with valueOf(): true
console.log(s2 === s3);           // false (different object references)

console.log(s1 === s4);           // true (same primitive value)
console.log(s3 === s5);           // false (different object references)

// equals (content) -> value
// In JavaScript, use === for primitive string comparison, or .valueOf() for String objects
console.log(s1 === s2.valueOf());           // true
console.log(s1 === s3.valueOf());           // true
console.log(s3.valueOf() === s5.valueOf()); // false (different case)
console.log(s3.valueOf().toLowerCase() === s5.valueOf().toLowerCase()); // true (equalsIgnoreCase)

//  equalsIgnoreCase -> pramod. Pramod, PRAMOD , PraMod . PramoD -> pramod
//  === - checks value and type for primitives, reference for objects
// = assignment the value
