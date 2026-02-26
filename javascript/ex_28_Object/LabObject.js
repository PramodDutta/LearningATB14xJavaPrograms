// NOTE: JavaScript objects don't have hashCode(). Use toString(), constructor.name, and === for equivalents.

// In Java: Object o = new Object();
// In JS, all objects inherit from Object by default.
let o = new Object();

// Or equivalently:
// let o = {};

console.log(o); // {}
console.log(typeof o); // "object"
console.log(o.constructor.name); // "Object" (equivalent of getClass().getName())
