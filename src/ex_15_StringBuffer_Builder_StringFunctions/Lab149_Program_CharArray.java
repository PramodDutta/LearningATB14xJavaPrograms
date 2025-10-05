package ex_15_StringBuffer_Builder_StringFunctions;

import java.util.Scanner;

public class Lab149_Program_CharArray {
    public static void main(String[] args) {
        // Write a program to reverse a string without using inbuilt functions.

        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter the input string, i will reverse it");
        String user_input = scanner.next();
        // Pramod


        String reverse_user_input = "";

        char[] arr = user_input.toCharArray();


        for (int i = arr.length - 1; i >= 0; i--) {
            reverse_user_input = reverse_user_input + arr[i];
        }

        System.out.println(reverse_user_input);


    }
}
