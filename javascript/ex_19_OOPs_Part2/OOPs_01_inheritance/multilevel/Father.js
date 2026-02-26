// Converted from: ex_19_OOPs_Part2/OOPs_01_inheritance/multilevel/Father.java

const GrandFather = require('./GrandFather');

class Father extends GrandFather {
    extra() {
        console.log("Extra");
    }
}

module.exports = Father;
