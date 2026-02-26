// NOTE: JavaScript Array replaces Java's ArrayList. No type enforcement.

const marks = [];
marks.push(91);
marks.push(95);
marks.push(56);
marks.push(89);

console.log(marks);
marks.sort((a, b) => a - b);
console.log(marks);
marks.sort((a, b) => b - a);
console.log(marks);
