// NOTE: JavaScript has no Comparable/Comparator interfaces. Use .sort() with a comparison function.

// Example using Comparable (Natural Order)
class Employee {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    toString() {
        return this.id + " - " + this.name;
    }

    printDetails() {
        return this.id + " - " + this.name;
    }

    // compareTo equivalent - used as the default comparison
    compareTo(other) {
        // return this.id - other.id;
        // return this.name - other.name;
        return this.name.localeCompare(other.name);
    }
}

const e1 = new Employee(3, "Amit");
const e2 = new Employee(1, "Pramod");
const e3 = new Employee(5, "Dutta");

const employeeList = [];
employeeList.push(e1);
employeeList.push(e2);
employeeList.push(e3);
console.log(employeeList.map(e => e.toString()));
employeeList.sort((a, b) => a.compareTo(b));
console.log(employeeList.map(e => e.toString()));
