// Lab079_If

let user_input = process.argv[2];
console.log(user_input);
let age = parseInt(user_input);
console.log(age);

if (age > 18) {
    console.log("Yes you can vote!");
} else {
    console.log("You can't vote!");
}
