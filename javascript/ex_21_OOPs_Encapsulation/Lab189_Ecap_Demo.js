// NOTE: JavaScript uses #prefix for private fields (ES2022). No protected/default access in JS.

class VWOLogin {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

class GoodVWOLogin {
    // Instance Variable | Data variable | Attribute | Fields | properties | member variables
    #username;
    #password;

    constructor(username, password) {
        this.#password = password;
        this.#username = username;
    }

    getUsername() {
        return this.#username;
    }

    setUsername(username) {
        this.#username = username;
    }

    getPassword() {
        return this.#password;
    }

    setPassword(password, isGoodAuntyAdmin) {
        if (isGoodAuntyAdmin) {
            this.#password = password;
        } else {
            console.log("No Allowed!");
        }
    }
}

const vwoLogin = new VWOLogin("admin", "pass123");
console.log(vwoLogin.password);
vwoLogin.password = "345";
console.log(vwoLogin.password);

const vwoLogin1 = new GoodVWOLogin("admin", "pwd123");
// console.log(vwoLogin1.password); // Can't access private field
const pass = vwoLogin1.getPassword();
console.log(pass);
vwoLogin1.setPassword("Pramodchild@123", false);
