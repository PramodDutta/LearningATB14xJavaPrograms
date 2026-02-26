// super keyword - Constructor chaining and method calls

// NOTE: JavaScript does not support method overloading like Java. Using default parameters/type checking as alternative.

class BaseClass {
    #browser;

    constructor(browser = undefined) {
        if (browser !== undefined) {
            this.#browser = browser;
        }
        console.log("DC- Parent");
    }

    getBrowser() {
        return this.#browser;
    }

    setBrowser(browser) {
        this.#browser = browser;
    }

    openBrowser(browserName = undefined) {
        if (browserName === undefined) {
            console.log("Opening Browser!!");
        } else {
            console.log("Open Browser!! -> " + browserName);
        }
    }

    closeBrowser() {
        console.log("Close Browser!!");
    }
}

class TestCase extends BaseClass {
    testC() {}

    constructor() {
        // super(); // DC
        super("Chrome"); // PC
        super.openBrowser(); // Normal - T1
        super.openBrowser("Chrome"); // Type 3
        super.closeBrowser(); // Normal
        console.log(super.getBrowser()); // Get
        super.setBrowser("firefox"); // Set
    }
}
