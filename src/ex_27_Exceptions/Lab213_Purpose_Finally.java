package ex_27_Exceptions;

import java.util.Scanner;

public class Lab213_Purpose_Finally {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        try {
            int v = sc.nextInt();
            int a = 10/v;
        } catch (ArithmeticException e) {
            System.out.println(e.getMessage());
        }finally {
            sc.close();
            // db, json , ...close
        }

    }
}
