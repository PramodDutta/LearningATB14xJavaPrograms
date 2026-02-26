// NOTE: JavaScript does not support method overloading like Java. Using default parameters/type checking as alternative.

class Calc {
    add(...args) {
        if (args.length === 2) {
            return args[0] + args[1];
        } else if (args.length === 3) {
            return args[0] + args[1] + args[2];
        }
    }
}

const c1 = new Calc();
console.log(c1.add(3.14, 3.14));
