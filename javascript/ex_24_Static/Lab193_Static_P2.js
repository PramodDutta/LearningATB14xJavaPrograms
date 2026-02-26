// NOTE: JavaScript supports static methods and fields in ES6+ classes.

class ATB {
    static course_name = "ATB";

    constructor() {
        this.phone_np = undefined;
        this.name = undefined;
    }

    static markAttendance() {
        console.log("Mark Attendance");
        // console.log(this.phone_np); // Static method can't access non-static variables
    }

    display() {
        console.log(this.phone_np + this.name + ATB.course_name);
    }
}
