// NOTE: JavaScript supports static methods and fields in ES6+ classes.

class Student {
    static course_name = "ATB";

    constructor(age_c) {
        this.age = age_c; // Non Static or Instance Variable, Attribute
    }

    static m1() {
        console.log("I am static Method");
    }
}

// Main
const s1 = new Student(23);
const s2 = new Student(33);

console.log(s1.age);
console.log(s2.age);

console.log(Student.course_name);

console.log(Student.course_name); // In JS, static fields are accessed via the class, not instances
console.log(Student.course_name);

Student.m1();
