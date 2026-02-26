// Converted from: ex_16_Arrays/Lab150_Arrays.java
// Note: In Java, `new int[5]` creates an array of 5 zeros. In JS, we use `new Array(5).fill(0)`.
// In Java, `new String[3]` creates an array of 3 nulls. In JS, we use `new Array(3).fill(null)`.

let marks = [1, 2, 3, 4, 5, 6];

// 2nd way to create the array
let mark2 = new Array(5).fill(0);
let mark3 = new Array(5).fill(0); // Fixed Size

let names = new Array(3).fill(null);
names[0] = "pramod";
names[1] = "Amit";
names[2] = "Yasho";

console.log(marks[0]);
console.log(mark2[0]);
