// NOTE: JavaScript only has public and private (#) access. No protected or package-private.

// In Java, Thief is in a different package than Cop
// import equivalent
// const { Cop } = require('../police/Cop');

class Cop {
    #iCard; // private

    constructor(bullet) {
        this.gun = bullet; // public
    }

    // protected in Java -> using _ convention in JS
    _canIShoot() {
        console.log("Yes you can !!");
    }

    // default (package-private) in Java -> no equivalent in JS
    thisDefaultF1() {
        console.log("Hi, Cop!");
    }
}

const thief = new Cop(100);
// thief._canIShoot(); // protected - not accessible from different package in Java
// thief.thisDefaultF1(); // default - not accessible from different package in Java
