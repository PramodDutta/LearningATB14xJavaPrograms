// NOTE: JavaScript Array replaces Java's ArrayList. No type enforcement.

class Student {
    #name;
    #rollNo;

    constructor(rollNo, name) {
        this.#rollNo = rollNo;
        this.#name = name;
    }

    getName() {
        return this.#name;
    }

    setName(name) {
        this.#name = name;
    }

    getRollNo() {
        return this.#rollNo;
    }

    setRollNo(rollNo) {
        this.#rollNo = rollNo;
    }

    printDetails() {
        console.log("Student Name : " + this.#name);
        console.log("Student Roll No: " + this.#rollNo);
    }
}

const s1 = new Student("Amit", "1");
const s2 = new Student("Ritwik", "2");
const s3 = new Student("Shubham", "3");

const myStudents = [];
myStudents.push(s1);
myStudents.push(s2);
myStudents.push(s3);

s1.printDetails();
s2.printDetails();
s3.printDetails();
