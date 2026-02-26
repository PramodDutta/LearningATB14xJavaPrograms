// NOTE: JavaScript has no Comparable/Comparator interfaces. Use .sort() with a comparison function.

class Employee2 {
    constructor(id, name, salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
    }

    toString() {
        return this.id + " - " + this.name + "- " + this.salary;
    }
}

const list = [];
list.push(new Employee2(3, "John", 100));
list.push(new Employee2(1, "Alice", 134));
list.push(new Employee2(2, "Bob", 234));

// Comparator for sorting by name
const nameComparator = (e1, e2) => e1.name.localeCompare(e2.name);
const idComparator = (e1, e2) => e1.id - e2.id;
const salaryComparator = (e1, e2) => e1.salary - e2.salary;
list.sort(salaryComparator);
console.log(list.map(e => e.toString()));
