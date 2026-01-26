package ex_50_Coding_Questions.CQ_07_Recursion_Problems;

/**
 * Q02: Sum of Digits using Recursion
 * ==================================
 * DIFFICULTY: Easy
 * ASKED AT: TCS, Infosys
 *
 * Problem: Find sum of digits using recursion.
 * Input: 12345
 * Output: 15
 */
public class Q02_SumOfDigits {

    public static void main(String[] args) {
        int n = 12345;

        System.out.println("Sum of digits of " + n + " = " + sumOfDigits(n));
    }

    // ============================================
    // Recursive Sum of Digits
    // Time: O(d), Space: O(d) where d = number of digits
    // ============================================
    public static int sumOfDigits(int n) {
        // Base case
        if (n == 0) return 0;

        // Recursive case: last digit + sum of remaining
        return (n % 10) + sumOfDigits(n / 10);
    }
}

