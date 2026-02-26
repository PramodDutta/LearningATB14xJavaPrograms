// Converted from: ex_16_Arrays/Lab162_2D_Array_Iterate_For_Loop.java
// Note: JavaScript's console.log() always adds a newline. To print without a newline
// (like Java's System.out.print), we use process.stdout.write().

let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// 3x3
// R -> 3
// C -> 3

for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
        process.stdout.write(matrix[i][j] + " | ");
        // process.stdout.write("*");
    }
    process.stdout.write("\n");
    // console.log();
}
