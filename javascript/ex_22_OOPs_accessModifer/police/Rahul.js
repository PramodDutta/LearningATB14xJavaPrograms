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

class Rahul extends Cop {
    constructor(bullet) {
        super(bullet);
    }
}

const p = new Cop(100);
p.thisDefaultF1();
