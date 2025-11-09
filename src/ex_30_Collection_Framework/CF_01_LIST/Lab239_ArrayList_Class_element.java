package ex_30_Collection_Framework.CF_01_LIST;

import java.util.ArrayList;
import java.util.List;

public class Lab239_ArrayList_Class_element {
    public static void main(String[] args) {
        Student s1 = new Student("Amit","1");
        Student s2 = new Student("Ritwik","2");
        Student s3 = new Student("Shubham","3");

        List<Student> myStudents =new ArrayList<>();
        myStudents.add(s1);
        myStudents.add(s2);
        myStudents.add(s3);

        s1.printDetails();
        s2.printDetails();
        s3.printDetails();

    }
}

class Student{
    private String name;
    private String rollNo;

    public Student(String rollNo, String name) {
        this.rollNo = rollNo;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRollNo() {
        return rollNo;
    }

    public void setRollNo(String rollNo) {
        this.rollNo = rollNo;
    }



    public void printDetails(){
        System.out.println("Student Name : " + this.name);
        System.out.println("Student Roll No: " + this.rollNo);
    }
}
