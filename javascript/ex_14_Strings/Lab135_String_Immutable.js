// Lab135_String_Immutable.js
// Converted from Java: Lab135_String_Immutable.java

// NOTE: In both Java and JavaScript, strings are immutable.
// Calling toUpperCase() does not modify the original string;
// it returns a new string. The original 'name' remains unchanged.

let name = "Pramod";
name.toUpperCase(); // "PRAMOD" - but result is not stored
console.log(name); // Pramod (unchanged, because strings are immutable)
