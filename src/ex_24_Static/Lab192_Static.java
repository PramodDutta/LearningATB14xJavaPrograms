package ex_24_Static;

public class Lab192_Static {
    public static void main(String[] args) {
        Student s1 = new Student(23);
        Student s2 = new Student(33);

        System.out.println(s1.age);
        System.out.println(s2.age);

        System.out.println(Student.course_name);

        System.out.println(s1.course_name);
        System.out.println(s2.course_name);

        Student.m1();

    }
}

class Student{
    int age;// Non Static or Instance Variable , Attribute,
    static String course_name = "ATB";


    public Student(int age_c){
        this.age = age_c;
    }

    static void m1(){
        System.out.println("I am static Method");
    }
}