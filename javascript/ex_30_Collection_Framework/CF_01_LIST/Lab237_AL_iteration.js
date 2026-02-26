// NOTE: JavaScript Array replaces Java's ArrayList. No type enforcement.

const mylist = [];
mylist.push("Pramod");
mylist.push("Amit");
mylist.push("Dutta");

console.log(" - To Print Arraylist - 1 ");

for (const str of mylist) {
    console.log(str);
}

console.log(" - To Print Arraylist - 2 ");

// Iterator equivalent using for...of
for (const item of mylist) {
    console.log(item);
}

console.log(" - To Print Arraylist - 3 ");

for (let i = 0; i < mylist.length; i++) {
    console.log(mylist[i]);
}
