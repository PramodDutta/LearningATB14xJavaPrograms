// Converted from: ex_16_Arrays/Lab164_2nd_highlest_Array.java

let numbers = [12, 45, 67, 23, 89, 45, 89];
let highest = 0;
let secondHighest = 0;

for (const num of numbers) {
    if (num > highest) {
        secondHighest = highest;
        highest = num;
    } else if (num > secondHighest && num !== highest) {
        secondHighest = num;
    }
}

console.log(secondHighest);
console.log(highest);
