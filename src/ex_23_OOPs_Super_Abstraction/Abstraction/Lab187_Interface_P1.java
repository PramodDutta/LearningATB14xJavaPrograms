package ex_23_OOPs_Super_Abstraction.Abstraction;

public class Lab187_Interface_P1 {

    public static void main(String[] args) {
        Car2 car2 = new Car2();
        car2.drive();

//        Brakes i = new Brakes();
    }
}


class Car2 implements Brakes, Engine1 {

    void drive() {
        startEngine();
        applyBreak();
        stopEngine();
    }

    @Override
    public void testEngine() {
        System.out.println("Override by the Car 1");
    }

    @Override
    public void applyBreak() {
        System.out.println("Apply Break");
    }

    @Override
    public void startEngine() {
        System.out.println("Start Engine");

    }

    @Override
    public void stopEngine() {
        System.out.println("Stop Engine");
    }
}

interface Brakes {
    void applyBreak();
}

interface Engine1 {
    void startEngine();

    void stopEngine();


    default void testEngine() {
        System.out.println("concrete complete");
    }

    default void testEngine1() {
        System.out.println("concrete complete");
    }

}
