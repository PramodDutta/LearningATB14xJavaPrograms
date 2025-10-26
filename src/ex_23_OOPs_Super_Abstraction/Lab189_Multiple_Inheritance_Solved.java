package ex_23_OOPs_Super_Abstraction;

public class Lab189_Multiple_Inheritance_Solved {
}

class Child1 implements Father1,Father2{

    @Override
    public void money() {
        System.out.println("Child Money!");
    }
}

interface Father1{
    final int a = 10;
    void money();
}
interface Father2{
    void money();
}