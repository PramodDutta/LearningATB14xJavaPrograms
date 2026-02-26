// Lab148_SB.js
// Converted from Java: Lab148_SB.java
// NOTE: Java's StringBuffer/StringBuilder has no direct JS equivalent. JS strings are immutable.
// Using array join or string concatenation as alternative.

// StringBuffer equivalent
let sb = "Java";
sb += " Programming"; // append equivalent
console.log(sb);

// replace(0, 4, "C++") equivalent: replace substring from index 0 to 4 with "C++"
sb = "C++" + sb.substring(4);
console.log(sb);
