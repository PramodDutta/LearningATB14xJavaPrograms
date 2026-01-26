package ex_50_Coding_Questions.CQ_07_Recursion_Problems;

/**
 * Q03: Power Function using Recursion
 * ===================================
 * DIFFICULTY: Easy
 * ASKED AT: Amazon, Microsoft
 *
 * Problem: Calculate x^n using recursion.
 * Input: x=2, n=10
 * Output: 1024
 */
public class Q03_PowerFunction {

    public static void main(String[] args) {
        double x = 2;
        int n = 10;

        System.out.println(x + "^" + n + " = " + power(x, n));
        System.out.println(x + "^" + n + " (optimized) = " + powerOptimized(x, n));
    }

    // ============================================
    // Basic Recursion
    // Time: O(n), Space: O(n)
    // ============================================
    public static double power(double x, int n) {
        if (n == 0) return 1;
        if (n < 0) return 1 / power(x, -n);

        return x * power(x, n - 1);
    }

    // ============================================
    // Optimized (Binary Exponentiation)
    // Time: O(log n), Space: O(log n)
    // ============================================
    public static double powerOptimized(double x, int n) {
        if (n == 0) return 1;
        if (n < 0) {
            x = 1 / x;
            n = -n;
        }

        if (n % 2 == 0) {
            double half = powerOptimized(x, n / 2);
            return half * half;
        } else {
            return x * powerOptimized(x, n - 1);
        }
    }
}

