// Converted from: ex_18_OOPs_Constructors/Car2.java

/**
 * JavaScript does not support constructor overloading or constructor chaining
 * via this() like Java does. In Java, Car2() calls this(), Car2(String) calls this(),
 * and Car2(String, int) calls this("i10").
 * In JS, we simulate this with a single constructor using conditional logic.
 */

class Car2 {
    model;
    year;

    // JS doesn't support multiple constructors - using conditional logic to simulate
    constructor(model_name = undefined, year_created = undefined) {
        if (model_name === undefined && year_created === undefined) {
            // Default constructor: Car2()
            this.model = "XXX";
            this.year = 1900;
            console.log("DC");
        } else if (model_name !== undefined && year_created === undefined) {
            // Parameterized constructor: Car2(String model_name)
            // In Java, this calls this() first, then sets model
            this.model = "XXX";
            this.year = 1900;
            console.log("DC");
            this.model = model_name;
        } else {
            // Parameterized constructor: Car2(String model_name, int year_created)
            // In Java, this calls this("i10") first, then sets model and year
            this.model = "XXX";
            this.year = 1900;
            console.log("DC");
            this.model = "i10"; // from this("i10") call chain
            this.model = model_name;
            this.year = year_created;
        }
    }
}

module.exports = Car2;
