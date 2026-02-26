// Converted from Java: Lab059_TypeCasting_Narrowing.java
// Note: In Java, casting int to byte truncates to 8 bits, which can cause data loss.
// JavaScript does not have byte type. To simulate Java's (byte) cast behavior,
// we use bitwise AND with 0xFF and then handle sign extension for byte range (-128 to 127).

let val = 300;
//     **0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 1 0 1 1 0 0**


// let b = val; // Narrowing - Implicit Casting - Valid ? No (in Java)
let b = (val << 24) >> 24; // Narrowing - Explicit Casting - Simulates Java's (byte) cast
console.log(b);
//  **0 0 1 0 1 1 0 0**
// Value is
//
// 0 + 0 + 32 + 0 + 8 + 4 + 0 + 0 = **44.**
//
//**(00101100)2 = (0 x 2^7) + (0 x 2^6) + (1 x 2^5) + (0 x 2^4) + (1 x 2^3) + (1 x 2^2) + (0 x 2^1) + (0 x 2^0) = (44)10**
