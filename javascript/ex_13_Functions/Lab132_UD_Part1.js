// Lab132_UD_Part1.js
// Converted from Java: Lab132_UD_Part1.java

// User Defined Functions.

// 1.Without Parameters and Without Return Type
// 2.Without Parameters but With Return Type
// 3.With Parameters and Without Return Type
// 4.With Parameters and With Return Type

// 1. Without Parameters and Without Return Type. (Declare) /Define
function wop_wor_greet() {
    console.log("Hi, Type 1 Function!");
    console.log("Hi,there!!");
}

//  2. Without Parameters but With Return Type
function wop_wr_greet_2() {
    console.log("Hi, Type 2 Function!");
    return "Mansoor";
}

//  3. With Parameters and Without Return Type ( 90%)
function greet_with_details(name, age, salary) {
    console.log("Your name is ->" + name + "\nYour age is " + age + "\nYour salary is " + salary);
}

//  4. With Parameters and With Return Type
function sum_of_two_numbers(a, b) {
    return a + b;
}

function sum_of_three_numbers(a, b, c) {
    return a + b + c;
}

function sum_of_three_numbers_float(a, b, c) {
    return a + b + c;
}

// Main logic

// 1.Without Argument / Parameters and Without Return Type.
wop_wor_greet();

//  2. Without Parameters but With Return Type
const msg = wop_wr_greet_2();
console.log(msg);

//  3. With Parameters and Without Return Type ( 90%)
greet_with_details("Pramod", 65, 100);
greet_with_details("Ankit", 100, 120);

//  4. With Parameters and With Return Type
const sum = sum_of_two_numbers(3, 4);
const sum2 = sum_of_two_numbers(190, 900);
const sum3 = sum_of_two_numbers(2345, 5432);
const sum4 = sum_of_three_numbers(2345, 5432, 5432);

console.log(sum);
console.log(sum2);
console.log(sum3);
console.log(sum4);
