package ex_13_Functions;

import java.util.Scanner;

public class Lab131_User_Defined_One {
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter the a");
        int a = scanner.nextInt();
        System.out.println("Enter the b");

        int b = scanner.nextInt();

        int result  = sum_of_two_number(a,b);
        int result2  = sum_of_two_number(10,45);

        int result3 = sum_of_two_number(333,3333);

        System.out.println(result);
        System.out.println(result2);
        System.out.println(result3);
    }

    static int sum_of_two_number(int a,int b){
        return a+b;
    }

    static void sum_of_two_number(){
        System.out.println("Hi,there");
    }
}
