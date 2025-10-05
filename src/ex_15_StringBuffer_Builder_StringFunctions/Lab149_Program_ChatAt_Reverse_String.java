package ex_15_StringBuffer_Builder_StringFunctions;

import java.util.Scanner;

public class Lab149_Program_ChatAt_Reverse_String {
    public static void main(String[] args) {
        // Write a program to reverse a string without using inbuilt functions.

        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter the input string, i will reverse it");
        String user_input = scanner.next();
        // Pramod

//        StringBuilder stringBuilder = new StringBuilder(user_input);
//        System.out.println(stringBuilder.reverse());

        // Pramod -> user_input.length(), chatAt()
        String reverse_user_input = "";


        for (int i = user_input.length() - 1; i >= 0; i--) {
            reverse_user_input = reverse_user_input + user_input.charAt(i);
        }

        System.out.println(reverse_user_input);


    }
}
