// NOTE: JavaScript has no checked exceptions. All exceptions are unchecked. try/catch/finally works the same.

class CustomException extends Error {
    constructor(msg) {
        super(msg);
        this.name = "CustomException";
    }
}

class Bank {
    constructor(currency, amount) {
        this.currency = currency;
        this.amount = amount;
    }

    getCurrency() {
        return this.currency;
    }

    setCurrency(currency) {
        this.currency = currency;
    }

    getAmount() {
        return this.amount;
    }

    setAmount(amount) {
        this.amount = amount;
    }

    // NOTE: JavaScript has no 'throws' keyword. In Java: public Integer add(Bank bankName) throws Exception, FileNotFoundException
    add(bankName) {
        if (bankName.currency.toLowerCase() === "inr") {
            return bankName.amount + this.amount;
        } else {
            try {
                throw new CustomException("Currency Mismatch, Can't Proceed!");
            } catch (e) {
                throw new Error(e.message);
            }
        }
    }
}

// Main
let sbi = new Bank("INR", 100);
let icici = new Bank("INR", 123);
let total_bal = sbi.add(icici);
console.log(total_bal);

let jp_chase = new Bank("USD", 101);
let total_bal_all_countires = sbi.add(jp_chase);
console.log(total_bal_all_countires);
