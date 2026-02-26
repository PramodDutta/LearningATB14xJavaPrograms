// NOTE: JavaScript only has public and private (#) access. No protected or package-private.

class Cop {
    #iCard;

    constructor(bullet) {
        this.gun = bullet;
    }

    _canIShoot() {
        console.log("Yes you can !!");
    }

    thisDefaultF1() {
        console.log("Hi, Cop!");
    }
}

const jrCop = new Cop(5);
jrCop._canIShoot(); // protected - accessible from same package in Java
