// NOTE: JavaScript has no checked exceptions. All exceptions are unchecked. try/catch/finally works the same.
// NOTE: JavaScript has no 'throws' keyword in function signatures.
// In Java: public static void main(String[] args) throws FileNotFoundException

const fs = require('fs');

// In Java: FileReader f = new FileReader(new File("C://abc.txt"));
// This will throw if file not found (Error with code 'ENOENT')
// NOTE: fs.readFileSync() throws Error with code 'ENOENT' if file not found
let data = fs.readFileSync("C://abc.txt", 'utf8');
