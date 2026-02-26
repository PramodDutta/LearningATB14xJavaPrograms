// NOTE: JavaScript has no Stack class. Array with push()/pop() provides LIFO behavior.

const s1 = [];
// Last In and First Out

const s = [];
s.push("Pramod");
s.push("Dutta");
s.push("Amit");
console.log(s);
console.log(s.length);
console.log(s);
console.log(s[s.length - 1]); // peek
console.log(s);

console.log(s.pop());
console.log(s);

s.push("Snehal");
console.log(true); // push returns the new length in JS, but Java's add returns boolean
console.log(s);
s.push("Chetan");
s.push("Chetan");
s.push("Vijay");
console.log(s);

console.log(s[0]);
console.log(s[1]);
