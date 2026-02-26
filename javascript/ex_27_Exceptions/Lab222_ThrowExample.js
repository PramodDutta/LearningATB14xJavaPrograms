// NOTE: JavaScript has no checked exceptions. All exceptions are unchecked. try/catch/finally works the same.

const readline = require('readline');

// NOTE: JavaScript has no 'throws' keyword. In Java: static void validate_age_for_club(int age) throws Exception
function validate_age_for_club(age) {
    if (age < 25) {
        throw new Error("Age can't be less than 25");
    } else {
        console.log("Enjoying clubbing");
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Enter your age\n");
rl.question('', (input) => {
    let user_age = parseInt(input);
    validate_age_for_club(user_age);
    rl.close();
});
