// NOTE: Java Vector is thread-safe ArrayList. JS is single-threaded, so regular Array suffices.

const v = []; // Array
v.push("Pramod");
v.push("Amit");
v.push("Lucky");
console.log(v);
const amitIndex = v.indexOf("Amit");
if (amitIndex !== -1) v.splice(amitIndex, 1);
console.log(v);
console.log(v.includes("Lucky"));
