// NOTE: JavaScript Set maintains insertion order (like LinkedHashSet). No TreeSet equivalent.

const hs = new Set();
// Hashing mechanism to store the element, no order.
// no duplicates

hs.add("Apple");
hs.add("Orange");
hs.add("WaterMelon");
hs.add("WaterMelon"); // duplicate, won't be added
// hs.add(123);
hs.add(null);
console.log(hs);

console.log(" ---------------------------");
const lhs = new Set();
// LinkedList mechanism to store the element,
// order will maintain, no duplicates

lhs.add("Dpple");
lhs.add("apple");
lhs.add("Orange");
lhs.add("WaterMelon");
lhs.add("WaterMelon"); // duplicate, won't be added
lhs.add(null);
console.log(lhs);
console.log(lhs.size === 0);
console.log(lhs.has("Apple"));
console.log(lhs.size);

console.log(" ---------------------------");

// TreeSet equivalent - using Set then sorting when iterating
const ts = new Set();
// Black and Red Tree mechanism to store the element.
// Natural Sorting order is maintained.

ts.add("Dapple");
ts.add("Apple");
ts.add("Orange");
ts.add("WaterMelon");
ts.add("WaterMelon"); // duplicate, won't be added
// ts.add(123); // In Java: java.lang.ClassCastException
// ts.add(null); // In Java: java.lang.NullPointerException
// Sort when displaying to simulate TreeSet behavior
console.log([...ts].sort());
