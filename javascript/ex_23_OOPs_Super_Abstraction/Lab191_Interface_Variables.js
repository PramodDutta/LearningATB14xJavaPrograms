// NOTE: JavaScript has no interfaces. Using duck typing - objects just need to implement expected methods.

// interface Pramod { a = 10 (final), display() }
const PRAMOD_A = 10; // final int a = 10 from Pramod interface

class Dutta {
    // Implements Pramod interface (duck typing)
    aa = 10;

    display() {
        // console.log(super.a); // not applicable in JS
        console.log(PRAMOD_A); // accessing interface constant
        console.log(this.aa);
    }
}

// interface TTA { practice() }

class Somya {
    // Implements TTA (duck typing)
    practice() {
        // implementation
    }
}

class Pramod1 {
    // Implements TTA (duck typing)
    practice() {
        // implementation
    }
}

// interface TTA_Mentor { teach() }

class Pramod_Mentor {
    // Implements TTA_Mentor (duck typing)
    teach() {
        // implementation
    }
}

class Dipak {
    // Implements TTA_Mentor (duck typing)
    teach() {
        // implementation
    }
}
