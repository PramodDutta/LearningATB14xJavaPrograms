package ex_23_OOPs_Super_Abstraction.superKeyword;

public class Lab181_Super {
}

class Father{
    Father() {
        System.out.println("DC Father");
    }

    int gold = 10;

    void home() {
        System.out.println("Home Father");
    }

}

class Son extends Father {
    Son(){
        super();
    }
    int gold_c = 100;
    void bike(){}

    void newHome() {
        System.out.println(super.gold);
        super.home();
        this.bike();
        System.out.println(this.gold_c);
    }


}