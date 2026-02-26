// Converted from Java: Lab034_Char_Literal.java
// Note: JavaScript does not have a 'char' type. Characters are strings of length 1.
// Escape sequences work the same way in JavaScript.

let c1 = 'A'; // A to Z, a-z, !@#$%^&*()_+
//        let c = "A"; // In JS, both '' and "" are strings (no char vs String distinction)

let c2 = 'B';
let c3 = '@';
let c4 = '_';
let c5 = '9';
let c6 = '1';
let c7 = '(';
let c8 = ' '; // blank space

// Escape Sequence
let new_line = '\n';
let tab_line = '\t';
let back_space = '\b';
let carriage_return = '\r';

console.log("PramodDutta");
console.log("Pramod" + new_line + "Dutta");
console.log("Pramod\nDutta");
console.log("Pramod" + tab_line + "Dutta");
console.log("Pramod" + back_space + "Dutta");
console.log(" ----- ");

console.log("Hi, This is a First line" + new_line + "This is second line\n This is Third line");

let c10 = 'A';
//  // ASCII, (limited numbers) - A -> 65

let rupees = '\u20B9'; // Rupee sign
console.log(rupees);

let my_laugh_smiley = '\u1f60'; // :)
console.log(my_laugh_smiley);

let c11 = '\u1F60';
