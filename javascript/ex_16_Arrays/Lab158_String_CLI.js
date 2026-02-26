// Converted from: ex_16_Arrays/Lab158_String_CLI.java
// Note: In Java, command line arguments come via String[] args in main().
// In Node.js, they come via process.argv (first two entries are node path and script path).

const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
    console.log(args[i]);
}
