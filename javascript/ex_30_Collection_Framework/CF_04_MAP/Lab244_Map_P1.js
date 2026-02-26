// NOTE: JavaScript Map maintains insertion order (like LinkedHashMap).

// Map m1 = new Map();  - cannot instantiate Map interface directly in Java
// Map m1 = new HashMap();
//
// m1.put("name", "pramod");
// m1.put("rollno", "pramod");
// m1.put(true, "pramod");
// m1.put(3.14, "pramod");

const m1 = new Map();

// Map is key - value
// name : pramod,
// rollno : 1
// phone : 9876543210
m1.set("name", "pramod");
m1.set("rollno", 1);
m1.set("phone", 987654321);
console.log(m1);

const m2 = new Map();
m2.set("name", "pramod");
m2.set("rollno", 1);
m2.set("phone", 987654321);
console.log(m2);

// TreeMap equivalent: Map with sorted keys when iterating
const m3 = new Map();
// Map is key - value
// name : pramod,
// rollno : 1
// phone : 9876543210
m3.set("name", "pramod");
m3.set("rollno", 1);
m3.set("phone", 987654321);
// Sort keys to simulate TreeMap behavior
const sortedM3 = new Map([...m3.entries()].sort((a, b) => String(a[0]).localeCompare(String(b[0]))));
console.log(sortedM3);
