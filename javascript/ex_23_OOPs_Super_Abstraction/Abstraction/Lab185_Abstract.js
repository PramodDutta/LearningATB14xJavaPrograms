// NOTE: JavaScript has no abstract classes. Simulating by throwing Error in base class methods.

class AmitFather {
    constructor() {
        if (new.target === AmitFather) {
            throw new Error("Cannot instantiate abstract class AmitFather");
        }
    }

    loan50K() {
        throw new Error("Abstract method loan50K() must be implemented by subclass");
    }

    loan10K() {
        console.log("Given");
    }
}

class Son extends AmitFather {
    loan50K() {
        console.log("Ok, I am Amit, I will give the Father Loan of 50k");
    }
}

const s1 = new Son();
s1.loan50K();
s1.loan10K();
