// Converted from Java: Lab067_To_Three_Max.java

let n1 = 2;
let n2 = 9;
let n3 = -11;
// LBF
// Logic Building Formula

// Step 1 ->  Find the inputs and outputs data type.
// I/O -> n1,n2,n3 -> int (number in JS)
// O/P -> int (number) - max number or String we can message with max number.


// Step 2 - Rough Logic, Think about it.
//  n1 >  n2 && n1 > n3 ->  n1
//  n2 > n3 && n2 > n1 -> n2
//  n3


// Step 3 - Dry Run - program

let max = (n1 > n2) ? ((n1 > n3) ? n1 : n3) : ((n2 > n3) ? n2 : n3);
console.log(`max is ${max}`);
