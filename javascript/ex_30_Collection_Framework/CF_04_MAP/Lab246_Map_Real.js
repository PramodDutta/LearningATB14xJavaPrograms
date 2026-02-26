// NOTE: JavaScript Map maintains insertion order (like LinkedHashMap).
// NOTE: JavaScript Set maintains insertion order (like LinkedHashSet). No TreeSet equivalent.

const student1 = new Map();
student1.set("name", "Diwakar");
student1.set("phone", "976543210");
student1.set("address", "BLR");
student1.set("home_address", "BTM");

console.log(student1);

const student2 = new Map();
student2.set("name", "Diksha");
student2.set("phone", "976543210");
student2.set("address", "DEL");
student2.set("home_address", "RG");

console.log(student2);

const book_read_items = new Set();
book_read_items.add("Rich dad Poor Dad");
book_read_items.add("Sapaiens");
book_read_items.add("Secret");
book_read_items.add("Atomic Habit");
book_read_items.add("Atomic Habit"); // duplicate, won't be added
book_read_items.add("Eat the Frog");
