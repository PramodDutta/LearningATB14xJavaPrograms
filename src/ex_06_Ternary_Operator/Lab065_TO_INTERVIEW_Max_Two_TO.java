package ex_06_Ternary_Operator;
//import java.lang.Math;

public class Lab065_TO_INTERVIEW_Max_Two_TO {
    public static void main(String[] args) {
        // Find the maximum number between two numbers.
        int x = 10;
        int y = 20;
//        System.out.println(Math.max(x,y));

        int max = x > y ? x : y;
        System.out.println(max);
    }
}
