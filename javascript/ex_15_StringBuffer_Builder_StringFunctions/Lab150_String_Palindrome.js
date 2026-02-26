// Lab150_String_Palindrome.js
// Converted from Java: Lab150_String_Palindrome.java

// madam -> reverse -> madam
// naman -> naman
// user_input == reverse(user_input)
const input = "Pramod";
let reversed = "";

for (let i = input.length - 1; i >= 0; i--) {
    reversed = reversed + input.charAt(i);
}

if (reversed.toLowerCase() === input.toLowerCase()) {
    console.log("Palindrome");
} else {
    console.log("Not a Palindrome");
}
