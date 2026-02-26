// NOTE: JavaScript has no Queue class. Array with push()/shift() provides FIFO behavior.

// Queue -> 0.001% in Automation
// FIFO

// PriorityQueue equivalent: using array with sort for priority ordering
const q = [];
q.push("Pramod");
q.push("Dutta");
q.sort(); // natural sorting to simulate PriorityQueue
console.log(q);

console.log(q[0]); // peek - view front element without removing
console.log(q);
console.log(q.shift()); // poll - remove and return front element
console.log(q);
