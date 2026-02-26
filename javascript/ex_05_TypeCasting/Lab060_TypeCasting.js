// Converted from Java: Lab060_TypeCasting.java
// Note: In Java, casting long to short truncates to 16 bits.
// JavaScript does not have a short type. To simulate Java's (short) cast,
// we use bitwise shift to sign-extend from 16 bits.

let phone_no = 9876543210;
//        let s = phone_no; // Narrowing - implicit (not allowed in Java)
let s = (phone_no << 16) >> 16; // Narrowing - Explicit (simulates Java's (short) cast)
console.log(s);
