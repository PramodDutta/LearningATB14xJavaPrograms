// NOTE: JavaScript Array replaces Java's ArrayList. No type enforcement.

const fruits1 = [];
fruits1.push("orange");
fruits1.push("apple");
fruits1.push("cherry");
// fruits1.push(133);
console.log(fruits1);

const fruits2 = [];
fruits2.push("mango");
fruits2.push("grapes");
fruits2.push("papaya");
console.log(fruits2);

const vegatables = [];
vegatables.push("tamato");
vegatables.push("patato");
vegatables.push("onion");
console.log(vegatables);

const all_fruits_veg = [];
all_fruits_veg.push(fruits1);
all_fruits_veg.push(fruits2);
all_fruits_veg.push(vegatables);

console.log(all_fruits_veg);
console.log(all_fruits_veg.length);
console.log(all_fruits_veg[1]);
