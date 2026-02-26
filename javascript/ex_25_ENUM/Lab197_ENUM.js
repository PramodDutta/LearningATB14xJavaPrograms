// NOTE: JavaScript has no native enum. Using Object.freeze() to simulate immutable enum-like objects.

const Day2 = Object.freeze({
    SUNDAY: 'SUNDAY',
    MONDAY: 'MONDAY',
    TUESDAY: 'TUESDAY',
    WEDNESDAY: 'WEDNESDAY',
    THURSDAY: 'THURSDAY',
    FRIDAY: 'FRIDAY',
    SATURDAY: 'SATURDAY'
});

// Main
console.log(Day2.SATURDAY);
