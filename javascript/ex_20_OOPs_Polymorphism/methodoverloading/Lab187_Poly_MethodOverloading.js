// NOTE: JavaScript does not support method overloading like Java. Using default parameters/type checking as alternative.

class MathOperations {
    // In the same class, When you have a method with same
    // Same name methods but different arguments and different return type.

    add(...args) {
        if (args.length === 2) {
            return args[0] + args[1];
        } else if (args.length === 3) {
            return args[0] + args[1] + args[2];
        }
    }
}

const m1 = new MathOperations();
const r1 = m1.add(3, 4);
const r2 = m1.add(3, 4, 6);
const r3 = m1.add(3.14, 4.56);
const r4 = m1.add("pramod", "dutta");
