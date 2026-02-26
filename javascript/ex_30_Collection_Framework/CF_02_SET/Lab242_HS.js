// NOTE: JavaScript Set maintains insertion order (like LinkedHashSet). No TreeSet equivalent.

const set = new Set();
set.add(9);
set.add(3);
set.add(1);
// Sort when displaying to simulate TreeSet behavior
const sortedSet = [...set].sort((a, b) => a - b);
console.log("Set elements: " + JSON.stringify(sortedSet));

// Iterator equivalent using for...of
for (const item of sortedSet) {
    console.log(item);
}
