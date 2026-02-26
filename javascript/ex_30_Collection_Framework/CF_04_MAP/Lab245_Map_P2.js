// NOTE: JavaScript Map maintains insertion order (like LinkedHashMap).

const map = new Map();
map.set("id", 1);
map.set("id", 2);    // overwrites previous value for "id"
map.set("id2", 100);
map.set("id4", null);
map.set(null, 102);
console.log(map);

console.log(map.size);
console.log(map.size === 0);
console.log(map.has("id2"));
console.log([...map.values()].includes(99));

console.log([...map.keys()]);
console.log([...map.values()]);

console.log(map.get("id2"));
