// NOTE: JavaScript has no Queue class. Array with push()/shift() provides FIFO behavior.
// NOTE: JavaScript has no LinkedList. Array provides similar functionality.

const queue = [];
queue.push(6);
queue.push(1);
queue.push(8);

// Iterator equivalent using for...of
for (const value of queue) {
    console.log(value);
}
