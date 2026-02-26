// NOTE: JavaScript has no checked exceptions. All exceptions are unchecked. try/catch/finally works the same.

const fs = require('fs');

// In Java: FileInputStream fileInputStream = new FileInputStream("C://log.txt");
// NOTE: In JS, fs.readFileSync() throws an Error with code 'ENOENT' if the file is not found.
// Unlike Java, there is no compile-time check for this -- all exceptions in JS are unchecked.

// const data = fs.readFileSync("C://log.txt");
// Checked - JVM
// JVM knows about it, During Compilation - JVM is saying that
// there can be case when this file is not found.
//
// NOTE: JavaScript has no concept of checked exceptions.
// In Java, the compiler forces you to handle FileNotFoundException.
// In JS, you must voluntarily use try/catch.
