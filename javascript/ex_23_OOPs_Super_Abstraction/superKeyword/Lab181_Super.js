// super keyword - accessing parent class members

class Father {
    constructor() {
        console.log("DC Father");
    }

    gold = 10;

    home() {
        console.log("Home Father");
    }
}

class Son extends Father {
    constructor() {
        super();
    }

    gold_c = 100;

    bike() {}

    newHome() {
        console.log(this.gold); // super.gold equivalent - inherited field
        super.home();
        this.bike();
        console.log(this.gold_c);
    }
}
