// Converted from: ex_16_Arrays/Lab164_RightAlignedTriangle.java
// Note: JavaScript's console.log() always adds a newline. To print without a newline
// (like Java's System.out.print), we use process.stdout.write().

let n = 3;

for (let i = 0; i < n; i++) {
    let row = "";
    for (let j = i; j < n - 1; j++) {
        row += " ";
    }
    for (let k = 0; k <= i; k++) {
        row += "*";
    }
    console.log(row);
}
