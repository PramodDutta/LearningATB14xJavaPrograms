// NOTE: JavaScript supports static methods and fields in ES6+ classes.
// JavaScript does not have Instance Initializer Blocks (IIB) like Java.
// The constructor serves a similar purpose.

class ATB14x {
    // Static Initializer Block
    static {
        console.log("Load the class?, I will execute");
    }

    static courseName = "ATB14x";

    constructor() {
        // IIB equivalent - this code runs when an object is created
        console.log("IIB - this is called when Object is created!");
        // What is the purpose? -
        // Here you can write code related to
        // start a website or anything before starting the
        // web automation or api automation

        this._name = undefined; // non static
        this._phone = undefined;
    }

    getName() {
        return this._name;
    }

    setName(name) {
        this._name = name;
    }

    getPhone() {
        return this._phone;
    }

    setPhone(phone) {
        this._phone = phone;
    }

    readDocuments() {
        console.log("Non Static Method");
        console.log(ATB14x.courseName);
    }

    static doAssignment() {
        // console.log(phone); // Static method can't access the non static variables
        console.log("Do Assignment");
    }
}
