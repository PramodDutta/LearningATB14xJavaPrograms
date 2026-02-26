// NOTE: JavaScript does not support method overloading like Java. Using default parameters/type checking as alternative.

class Browser {
    startBrowser(browser = undefined) {
        if (browser === undefined) {
            console.log("Default browser is started!");
        } else {
            // Code to start the chrome browser...
            console.log("Starting browser " + browser);
        }
    }
}

const b1 = new Browser();
// b1.startBrowser();
// b1.startBrowser("Chrome");
// b1.startBrowser("Firefox");
