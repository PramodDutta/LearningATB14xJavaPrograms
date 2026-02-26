// Lab130_Simple_Method.js
// Converted from Java: Lab130_Simple_Method.java

function non_return_type_function() {
    console.log("Hi,there, No Return function!");
}

// Return Type - which return a data type (number, string, boolean, etc.)
function return_string_type_function() {
    console.log("Hi, there, I will return something.");
    return "dutta";
}

function return_boolean() {
    return true;
}

function return_float_pi_value() {
    return 3.14;
}

function return_byte() {
    return 100;
}

function return_long() {
    return 10;
}

// Main logic
non_return_type_function();

const name = return_string_type_function();
console.log(name);
