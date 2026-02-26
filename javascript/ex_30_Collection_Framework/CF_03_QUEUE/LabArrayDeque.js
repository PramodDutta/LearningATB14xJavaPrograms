// NOTE: JavaScript has no Queue class. Array with push()/shift() provides FIFO behavior.
// ArrayDeque equivalent: JS Array with push/pop/shift/unshift

const deck = [];
deck.unshift(5); // push adds to the front in Deque (stack behavior)
deck.unshift(1);
console.log(deck);
