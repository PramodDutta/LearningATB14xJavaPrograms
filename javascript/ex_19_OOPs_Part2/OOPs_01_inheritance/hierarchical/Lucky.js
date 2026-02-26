// Converted from: ex_19_OOPs_Part2/OOPs_01_inheritance/hierarchical/Lucky.java

const Father = require('./Father');

class Lucky extends Father {
    l2() {
        console.log("Lucky");
    }
}

module.exports = Lucky;
