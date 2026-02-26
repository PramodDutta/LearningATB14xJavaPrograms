// NOTE: JavaScript only has public and private (#) access. No protected or package-private.

class Cop {
    #iCard; // private

    constructor(bullet) {
        this.gun = bullet; // public
    }

    // Method and / Behav
    // protected in Java -> no true equivalent in JS, using _ convention
    _canIShoot() {
        console.log("Yes you can !!");
    }

    // default (package-private) in Java -> no equivalent in JS
    // NOTE: package-private has no JS equivalent, treating as regular method
    thisDefaultF1() {
        console.log("Hi, Cop!");
    }
}

// Export for use in other files
if (typeof module !== 'undefined') {
    module.exports = { Cop };
}
