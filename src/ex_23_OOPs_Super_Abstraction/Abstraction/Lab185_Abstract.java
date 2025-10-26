package ex_23_OOPs_Super_Abstraction.Abstraction;

public class Lab185_Abstract {
    public static void main(String[] args) {
        Son s1 = new Son();
        s1.loan50K();
        s1.loan10K();
    }




}















abstract class AmitFather{
    abstract void loan50K();
    void loan10K(){
        System.out.println("Given");
    }
}

class Son extends AmitFather {

    @Override
    void loan50K() {
        System.out.println("Ok, I am Amit, I will give the Father Loan of 50k");
    }
}