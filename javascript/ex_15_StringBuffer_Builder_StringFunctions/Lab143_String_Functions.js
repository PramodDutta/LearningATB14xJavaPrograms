// Lab143_String_Functions.js
// Converted from Java: Lab143_String_Functions.java
// NOTE: Java's StringBuffer/StringBuilder has no direct JS equivalent. JS strings are immutable.
// Using array join or string concatenation as alternative.

const name = "Sonal";

console.log(name.length);
console.log(name.charAt(3));
//        console.log(name.charAt(10)); // RangeError or undefined in JS

// 2. concat()
console.log(name.concat(" Patel"));

// 3. contains() -> includes()
console.log(name.includes("om"));

// 4. equals() -> ===
console.log(name === "Sonal");

// 5. equalsIgnoreCase() -> toLowerCase comparison
console.log(name.toLowerCase() === "sonal".toLowerCase());

// 6. indexOf() //  sonal -> ? o
console.log(name.indexOf('o'));

const s1 = "madam";
// Returns the index within this string of the
// first occurrence of the specified substring.
console.log(s1.indexOf("m"));

// 7. length
console.log(name.length);

// 8. replace( , )
console.log(name.replace('n', 'N'));

// 10. substring( , )
console.log(name.substring(1, 3));

// 11. toLowerCase()
console.log("SONAL".toLowerCase());

// 12. toUpperCase()
console.log("sonal".toUpperCase());

// 14. startsWith()
console.log(name.startsWith("S"));

// 15. endsWith()
console.log(name.endsWith("a"));

// 16. trim()
const name3 = "    Sonal Harish     ";
console.log(name3.trim());

// 17. compareTo() -> localeCompare or manual comparison
// NOTE: Java's compareTo returns 0 when strings are equal
console.log(name === "Sonal" ? 0 : name > "Sonal" ? 1 : -1);

// --------------
// StringBuilder equivalent using string operations
let stringBuilder = "Sonal";
console.log(stringBuilder);

stringBuilder = stringBuilder.split('').reverse().join('');
console.log(stringBuilder);

let sb = "Hi";
console.log(sb.toString());
