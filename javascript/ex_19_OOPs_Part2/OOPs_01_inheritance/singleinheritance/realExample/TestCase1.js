// Converted from: ex_19_OOPs_Part2/OOPs_01_inheritance/singleinheritance/realExample/TestCase1.java

const CommonTOAllTest = require('./CommonTOAllTest');

class TestCase1 extends CommonTOAllTest {
    runTC1() {
        this.startBrowser();
        console.log("TC1 is running");
        this.closeBrowser();
    }
}

module.exports = TestCase1;
