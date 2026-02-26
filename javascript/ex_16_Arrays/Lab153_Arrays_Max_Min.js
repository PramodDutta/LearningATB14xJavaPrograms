// Converted from: ex_16_Arrays/Lab153_Arrays_Max_Min.java

let array = [25, 14, 56, 15, 36, 56, 77, 18, 29, 49];
// logic

// array.sort((a, b) => a - b);
// console.log(array[array.length - 1]);

// let max = array[0];
// for (let i = 0; i < array.length; i++) {
//     if (array[i] > max) {
//         max = array[i];
//     }
// }
//
// console.log(max);

let min = array[0];

for (let i = 0; i < array.length; i++) {
    if (array[i] < min) {
        min = array[i];
    }
}

console.log(min);
