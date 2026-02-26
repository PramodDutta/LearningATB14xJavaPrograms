// NOTE: JavaScript Array replaces Java's ArrayList. No type enforcement.

const list = [];
list.push("1"); // 0
list.push("2"); // 1
list.push("3"); // 2
list.push("3"); // 3
list.push(4);
list.push(true);

console.log(list.length);
console.log(list.length === 0);
console.log(list.includes("1"));
console.log(list.includes(1));
console.log(list.indexOf("3"));
console.log(list.lastIndexOf("3"));

console.log(list);

console.log(" --- ");
for (let i = 0; i < list.length; i++) {
    console.log(list[i]);
}

console.log(" --- ");
for (const o of list) {
    console.log(o);
}

console.log(" ----- ");
// Iterator equivalent using for...of
for (const item of list) {
    console.log(item);
}
