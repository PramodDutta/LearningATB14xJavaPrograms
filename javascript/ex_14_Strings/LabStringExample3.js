// LabStringExample3.js
// Converted from Java: LabStringExample3.java

const s = "Java".substring(2);
console.log(s);

const s1 = "Java".substring(1, 3);
console.log(s1);

const arr = "Java".split(''); // toCharArray() equivalent
console.log(arr); // ['J', 'a', 'v', 'a']

const st = " Java ".trim(); // "Java"
console.log(st);

// NOTE: In JS, isBlank-like behavior can be checked with trim().length === 0
const b = "   ".trim().length === 0;
console.log(b);

const s2 = "ab".repeat(3);
console.log(s2);

const b11 = "Java".toLowerCase() === "java".toLowerCase();
console.log(b11);

// lines().count() equivalent: split by newline and count
const count = "a\nb\nc".split('\n').length;
console.log(count);
