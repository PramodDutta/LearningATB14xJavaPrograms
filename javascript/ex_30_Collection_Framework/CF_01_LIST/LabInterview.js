// NOTE: JavaScript Array replaces Java's ArrayList. No type enforcement.

const al = [];
al.push(1);
al.push(2);
al.push(3);
al.push(4);
console.log(al);
al.sort((a, b) => b - a); // reverse order

for (const o of al) {
    console.log(6 * o);
}
