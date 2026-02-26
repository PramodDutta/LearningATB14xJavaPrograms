// NOTE: JavaScript Array replaces Java's ArrayList. No type enforcement.

const list = [];
list.push("bread");   // 0
list.push("milk");    // 1
list.push("butter");  // 2
list.push("paneer");  // 3
list.push("jam");     // 4
list.push("cheeze");  // 5
list.push(123);       // 6
list.push(true);      // 7

console.log(list);
console.log(list.length);
console.log(list.includes("1"));

console.log(" ---");

for (const o of list) {
    console.log(o);
}

// Iterator equivalent using for...of
for (const item of list) {
    console.log(item);
}
