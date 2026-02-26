// Lab093_JDK13Above

// in JDK > 13 (arrow syntax in switch)
// Note: JavaScript does not have arrow-case syntax in switch.
// Converting to standard switch with break statements.
let itemCode = 2; // 002 octal in Java = 2
switch (itemCode) {
    case 1: // 001 octal in Java = 1
        console.log("001");
        break;
    case 2: // 002 octal in Java = 2
        console.log("002");
        break;
    case 3: // 003 octal in Java = 3
        console.log("003");
        break;
    default:
        console.log("Default");
        break;
}
