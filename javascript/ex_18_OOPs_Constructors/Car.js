// Converted from: ex_18_OOPs_Constructors/Car.java

class Car {
    name;
    year;
    model;

    // Default Constructor
    constructor() {
        this.name = "Unknown Car";
        this.model = "XXX";
        this.year = 0;
        console.log("DC");
    }
}

module.exports = Car;
