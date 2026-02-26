// NOTE: JavaScript uses #prefix for private fields (ES2022). No protected/default access in JS.

class ICICIBank {
    #name;
    #bal;

    constructor(name, bal) {
        this.#name = name;
        this.#bal = bal;
    }

    getName() {
        return this.#name;
    }

    setName(name) {
        this.#name = name;
    }

    getBal() {
        return this.#bal;
    }

    setBal(bal, isCashier) {
        if (isCashier) {
            this.#bal = bal;
        } else {
            console.log("Not Allowed!!");
        }
    }
}

const amit = new ICICIBank("Amit", 100);
const bal = amit.getBal();
// console.log(amit.bal); // can't possible - private
console.log(bal);

// Cashier
const cashier = new ICICIBank("Cash", 100);
cashier.setBal(200, true);
console.log(cashier.getBal());
