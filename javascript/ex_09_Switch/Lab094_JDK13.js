// Lab094_JDK13

// JDK > 13

let itemcode = 6; // 006 octal in Java = 6
switch (itemcode) {
    case 1: case 2: case 5: // 001, 002, 005 octal in Java = 1, 2, 5
        console.log("All of the them are Electronic Gadget");
        break;
    case 4: case 6: case 7: // 004, 006, 007 octal in Java = 4, 6, 7
        console.log("This is Mech");
        break;
    default:
        console.log("None");
}
