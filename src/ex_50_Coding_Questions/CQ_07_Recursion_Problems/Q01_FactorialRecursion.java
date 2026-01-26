package ex_50_Coding_Questions.CQ_07_Recursion_Problems;

/**
 * Q01: Factorial using Recursion
 * ==============================
 * DIFFICULTY: Easy
 * ASKED AT: TCS, Infosys, Wipro
 *
 * Problem: Calculate n! using recursion.
 * Input: 5
 * Output: 120
 */
public class Q01_FactorialRecursion {

    public static void main(String[] args) {
        int n = 5;

        System.out.println("Factorial of " + n + " = " + factorial(n));
        System.out.println("Tail Recursive: " + factorialTail(n, 1));
    }

    // ============================================
    // Basic Recursion
    // Time: O(n), Space: O(n)
    // ============================================
    public static long factorial(int n) {
        // Base case
        if (n <= 1) return 1;

        // Recursive case
        return n * factorial(n - 1);
    }

    // ============================================
    // Tail Recursion (Optimized)
    // ============================================
    public static long factorialTail(int n, long accumulator) {
        if (n <= 1) return accumulator;
        return factorialTail(n - 1, n * accumulator);
    }
}

