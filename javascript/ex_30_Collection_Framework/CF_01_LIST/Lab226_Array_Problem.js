// NOTE: JavaScript Array replaces Java's ArrayList. No type enforcement.

const arr = new Array(10);
arr[0] = 1;

// 1. Fixed Size - In JS, arrays are dynamic, so this is not a problem
// 2. Same data can be stored.
// 3. wastage of memory for the 9 elements - In JS, sparse arrays don't waste as much
// 4. insertion and deletion is heavy operation.
