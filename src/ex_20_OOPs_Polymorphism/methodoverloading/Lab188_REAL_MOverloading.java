package ex_20_OOPs_Polymorphism.methodoverloading;

public class Lab188_REAL_MOverloading {

    public static void main(String[] args) {
        Home h1 = new Home();
        h1.task();
        h1.task("Bathroom");
    }

}

class Home {

    void task() {
        System.out.println("Task Cleaning Fan");
    }

    void task(String whichTask) {
        System.out.println("Task " + whichTask);
    }


}