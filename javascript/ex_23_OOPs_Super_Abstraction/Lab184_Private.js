// NOTE: JavaScript only has public and private (#) access. No protected or package-private.

class XYZ {
    constructor() {}
    // protected in Java -> using _ convention in JS
    _my_gold = 10;
}

class CAB extends XYZ {
    display() {
        console.log(this._my_gold); // accessing parent's protected field via super equivalent
    }
}
