// NOTE: JavaScript has no checked exceptions. All exceptions are unchecked. try/catch/finally works the same.
// NOTE: JavaScript has no finalize() method. There is no equivalent to Java's finalize().
// JavaScript uses automatic garbage collection without any finalization hooks.
// The closest concept would be WeakRef and FinalizationRegistry (ES2021), but they are not guaranteed to run.

class LabFinalize {
    // NOTE: No finalize() equivalent in JavaScript.
    // In Java, finalize() was called before garbage collection.
    // In JS, garbage collection is entirely automatic with no hooks.
}

let labFinalize = new LabFinalize();
labFinalize = null;
// NOTE: JavaScript has no System.gc() equivalent.
// You cannot explicitly trigger garbage collection in standard JS.
// In Node.js, you can use --expose-gc flag and call global.gc(), but it's not recommended.
console.log("main method done");

// NOTE: In Java, the finalize() method would print "Finalize method called before GC"
// before the object is garbage collected. JavaScript has no such mechanism.
