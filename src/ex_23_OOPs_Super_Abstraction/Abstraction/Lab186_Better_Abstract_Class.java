package ex_23_OOPs_Super_Abstraction.Abstraction;

public class Lab186_Better_Abstract_Class {
    public static void main(String[] args) {

        Alto a = new Alto();
        a.drive();
//        Car1 c = new Car1();




    }
}





















class Alto extends Car1 implements Tyre,Gear,Engine{


    void drive(){
        rubberTyre();
        blackColorDoToTyre();
        this.startCar();
        startEngine();
        changeGear();
        this.stopCar();

    }

    @Override
    void startCar() {
        System.out.println("Starting the car");
    }

    @Override
    void stopCar() {
        System.out.println("Stop the car");

    }

    @Override
    public void changeGear() {
        System.out.println("changeGear the car");

    }

    @Override
    public void rubberTyre() {
        System.out.println("rubberTyre the car");

    }

    @Override
    public void blackColorDoToTyre() {
        System.out.println("blackColorDoToTyre the car");
    }

    @Override
    public void startEngine() {
        System.out.println("Staring engine");
    }
}

interface Tyre{
   abstract void rubberTyre();
    void blackColorDoToTyre();
}

interface Gear{
    void changeGear();
}

interface Engine{
    void startEngine();
}

abstract class Car1{

    abstract void startCar();
    abstract void stopCar();
}

abstract class A{

}