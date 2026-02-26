// NOTE: JavaScript has no native enum. Using Object.freeze() to simulate immutable enum-like objects.

class HEX_COLORValue {
    constructor(name, hexCode) {
        this.name = name;
        this.hexCode = hexCode;
    }

    getHexCode() {
        return this.hexCode;
    }

    toString() {
        return this.name;
    }
}

const HEX_COLORs = Object.freeze({
    RED: new HEX_COLORValue('RED', '#FF0000'),
    GREEN: new HEX_COLORValue('GREEN', '#61FF33'),
    BLUE: new HEX_COLORValue('BLUE', '#3377FF'),
    YELLOW: new HEX_COLORValue('YELLOW', '#4477FF')
});

// Main
console.log(HEX_COLORs.RED.getHexCode());
