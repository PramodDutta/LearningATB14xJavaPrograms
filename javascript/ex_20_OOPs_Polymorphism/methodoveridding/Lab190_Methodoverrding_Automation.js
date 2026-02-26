// Method Overriding - Automation Example

class CommonToAll {
    openBrowser() {
        console.log("Starting the IE browser.");
    }
}

class ChromeTC extends CommonToAll {
    openBrowser() {
        console.log("Starrting Chrome, Better Browser!!");
    }
}

class FirefoxTc extends CommonToAll {
    openBrowser() {
        console.log("Starrting FirefoxTc, Better Browser!!");
    }
}

const c1 = new ChromeTC();
c1.openBrowser();

const f1 = new FirefoxTc();
f1.openBrowser();

const commonToAll = new CommonToAll();
commonToAll.openBrowser();

// Dynamic Dispatch
const c2 = new ChromeTC();
c2.openBrowser();

const c3 = new FirefoxTc();
c3.openBrowser();

// const cc = new FirefoxTc(); // ChromeTC cc = new FirefoxTc(); -- not valid in Java either
