// NOTE: JavaScript does not support method overloading like Java. Using default parameters/type checking as alternative.

class Home {
    task(whichTask = undefined) {
        if (whichTask === undefined) {
            console.log("Task Cleaning Fan");
        } else {
            console.log("Task " + whichTask);
        }
    }
}

const h1 = new Home();
h1.task();
h1.task("Bathroom");
