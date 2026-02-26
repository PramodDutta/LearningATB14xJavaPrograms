// NOTE: JavaScript Map maintains insertion order (like LinkedHashMap).

const map = new Map();
map.set("id", 1);
map.set("id2", 2);
map.set("id3", 34);
map.set("id4", null);
map.set("id5", null);
map.set(null, 100);

console.log(map);
console.log(map.size);

for (const [key, value] of map) {
    console.log(key + " -> " + value);
}
