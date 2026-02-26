// LabStringExamples1.js
// Converted from Java: LabStringExamples1.java

const s = "Java";
const c = s.charAt(2);
console.log(c);

// NOTE: Java's compareTo() compares strings lexicographically.
// In JS, we can use localeCompare() which returns -1, 0, or 1,
// or manually compare char codes for a similar numeric result.
const result = "abc" > "ABC" ? 1 : "abc" < "ABC" ? -1 : 0;
// A more precise equivalent using charCodeAt differences:
const compareResult = (() => {
    const a = "abc";
    const b = "ABC";
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
        const diff = a.charCodeAt(i) - b.charCodeAt(i);
        if (diff !== 0) return diff;
    }
    return a.length - b.length;
})();
console.log(compareResult);

const idx = "Java".indexOf("a"); // 1
console.log(idx);

const idx2 = "Java".lastIndexOf("a"); // 3
console.log(idx2);

const b = "".length === 0; // isEmpty() equivalent -> true
console.log(b);

const s11 = ["Java", "Python"].join("*");
console.log(s11);

const s12 = "Java".replace(/a/g, 'o'); // "Jovo"
console.log(s12);

const b1 = "Java".startsWith("Ja"); // true
console.log(b1);

const b2 = "Java".concat("Mava");
console.log(b2);
