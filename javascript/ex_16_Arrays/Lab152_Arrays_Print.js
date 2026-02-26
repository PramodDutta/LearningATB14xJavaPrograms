// Converted from: ex_16_Arrays/Lab152_Arrays_Print.java

let marks = [51, 100, 91, 87, 90];
console.log(marks.length);
console.log(marks[0]);
console.log(marks[1]);
console.log(marks[2]);
console.log(marks[3]);
console.log(marks[4]);

console.log(" ---");

for (let i = 0; i < marks.length; i++) {
    console.log(marks[i]);
}

console.log(" ------ Enhanced For loop ----");

for (const mark of marks) {
    console.log(mark);
}
