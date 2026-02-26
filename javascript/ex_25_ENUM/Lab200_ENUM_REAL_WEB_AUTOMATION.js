// NOTE: JavaScript has no native enum. Using Object.freeze() to simulate immutable enum-like objects.

class LocatorValue {
    constructor(name, locator) {
        this.name = name;
        this.locator = locator;
    }

    getLocator() {
        return this.locator;
    }

    toString() {
        return this.name;
    }
}

const Locators = Object.freeze({
    page_input_email: new LocatorValue('page_input_email', '//*[@id="login-username"]'),
    page_input_password: new LocatorValue('page_input_password', '//*[@id="login-password"]'),
    page_button: new LocatorValue('page_button', '#btn')
});

// Main
console.log(Locators.page_input_email.getLocator());
