package ex_50_Coding_Questions.CQ_01_String_Problems;

/**
 * Q01: Reverse a String
 * =====================
 * DIFFICULTY: Easy
 * ASKED AT: Amazon, Microsoft, Google, TCS, Infosys
 *
 * Problem: Write a program to reverse a given string.
 * Input: "Hello"
 * Output: "olleH"
 */
public class Q01_ReverseString {

    public static void main(String[] args) {
        String input = "Hello World";

        System.out.println("Input: " + input);
        System.out.println("\n--- SOLUTIONS ---");

        System.out.println("Method 1 (StringBuilder): " + reverseWithStringBuilder(input));
        System.out.println("Method 2 (CharArray): " + reverseWithCharArray(input));
        System.out.println("Method 3 (Loop): " + reverseWithLoop(input));
        System.out.println("Method 4 (Recursion): " + reverseWithRecursion(input));
    }

    // ============================================
    // METHOD 1: Using StringBuilder (RECOMMENDED)
    // Time: O(n), Space: O(n)
    // ============================================
    public static String reverseWithStringBuilder(String str) {
        return new StringBuilder(str).reverse().toString();
    }

    // ============================================
    // METHOD 2: Using Character Array
    // Time: O(n), Space: O(n)
    // ============================================
    public static String reverseWithCharArray(String str) {
        char[] chars = str.toCharArray();
        int left = 0, right = chars.length - 1;

        while (left < right) {
            // Swap characters
            char temp = chars[left];
            chars[left] = chars[right];
            chars[right] = temp;
            left++;
            right--;
        }

        return new String(chars);
    }

    // ============================================
    // METHOD 3: Using Loop (Basic)
    // Time: O(n), Space: O(n)
    // ============================================
    public static String reverseWithLoop(String str) {
        String reversed = "";
        for (int i = str.length() - 1; i >= 0; i--) {
            reversed += str.charAt(i);
        }
        return reversed;
    }

    // ============================================
    // METHOD 4: Using Recursion
    // Time: O(n), Space: O(n) - call stack
    // ============================================
    public static String reverseWithRecursion(String str) {
        if (str.isEmpty()) {
            return str;
        }
        return reverseWithRecursion(str.substring(1)) + str.charAt(0);
    }
}

