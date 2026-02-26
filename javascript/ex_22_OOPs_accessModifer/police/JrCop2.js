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

const j2 = new Cop(100);
j2.thisDefaultF1(); // default (package-private) - accessible from same package in Java
