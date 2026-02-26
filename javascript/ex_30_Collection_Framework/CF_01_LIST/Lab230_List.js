// NOTE: JavaScript Array replaces Java's ArrayList. No type enforcement.

const list = [];

list.push("1"); // 0
list.push("2"); // 1
list.push("3"); // 2
list.push("3"); // 3
list.push(4);   // 4
list.push(true); // 5

console.log(list.length);
console.log(list.length === 0);
console.log(list.includes("1"));
console.log(list.includes(1));
console.log(list.indexOf("3")); // find the first occ of element in list
console.log(list.lastIndexOf("3")); // find the last occ of element in list
