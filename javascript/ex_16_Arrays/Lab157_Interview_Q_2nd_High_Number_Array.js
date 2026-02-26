// Converted from: ex_16_Arrays/Lab157_Interview_Q_2nd_High_Number_Array.java

let numbers = [12, 34, 10, 1, 100, 3, 4, 32]; //100,34
numbers.sort((a, b) => a - b);
console.log(numbers[numbers.length - 2]);
