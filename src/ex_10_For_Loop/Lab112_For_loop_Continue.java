package ex_10_For_Loop;

public class Lab112_For_loop_Continue {
    public static void main(String[] args) {
        for (int i = 0; i < 50; i++) {
            if(i == 5){
                continue;
            }
            System.out.println(i);  // 0,1,2,3,4
        }
    }
}
