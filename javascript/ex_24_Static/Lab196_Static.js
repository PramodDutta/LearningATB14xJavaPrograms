// NOTE: JavaScript supports static methods and fields in ES6+ classes.

class Automation {
    static driver = "Chrome";
    static driver2 = undefined;
}

// Main
const t1 = new Automation();
console.log(Automation.driver);   // In JS, static fields are accessed via the class
console.log(Automation.driver);
Automation.driver = "Firefox";
console.log(Automation.driver);
console.log(Automation.driver2);
