// Converted from: ex_16_Arrays/Lab149_Arrays.java

let a = 10;
let marks = [91, 90, 51, 100, 91, 92, 89];

let is_married_people = [true, true, false];

console.log(marks.length);
console.log(marks[0]);
console.log(marks[4]);

// console.log(marks[-1]); // In JS, this returns undefined (not an error like Java's ArrayIndexOutOfBoundsException)

let name = "pramod";
let name_each_element_char = name.split("");
// ["p","r","a","m","o","d"]
for (const s of name_each_element_char) {
    console.log(s);
}
