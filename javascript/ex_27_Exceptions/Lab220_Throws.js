// NOTE: JavaScript has no checked exceptions. All exceptions are unchecked. try/catch/finally works the same.

const fs = require('fs');

try {
    // In Java: FileInputStream fileInputStream = new FileInputStream("C://a.log");
    // NOTE: fs.readFileSync() throws Error with code 'ENOENT' if file not found
    let data = fs.readFileSync("C://a.log", 'utf8');
} catch (e) {
    // In Java: catch (FileNotFoundException e)
    console.log(e.message);
} finally {
    console.log("yes");
}
