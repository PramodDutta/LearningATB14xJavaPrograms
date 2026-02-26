// NOTE: JavaScript Map maintains insertion order (like LinkedHashMap).
// NOTE: JavaScript Array replaces Java's ArrayList. No type enforcement.

const student1 = new Map();
student1.set("name", "pramod");
student1.set("roll", "1");
student1.set("phone", "96543210");
console.log(student1);

const student2 = new Map();
student2.set("name", "amit");
student2.set("roll", "2");
student2.set("phone", "65432356");
console.log(student2);

const students = [];
students.push(student1);
students.push(student2);
console.log(students);

// List of Map
// [{phone=96543210, name=pramod, roll=1}, {phone=65432356, name=amit, roll=2}]

// JSON
// [{"phone":96543210, "name":"pramod", "roll":"1"}, {"phone":"65432356", "name":"amit", "roll":"2"}]
