package ex_50_Coding_Questions.CQ_03_Number_Problems;

import java.math.BigInteger;

/**
 * Q02: Factorial of a Number
 * ==========================
 * DIFFICULTY: Easy
 * ASKED AT: TCS, Infosys, Wipro
 *
 * Problem: Calculate factorial of n (n!)
 * Input: 5 -> 120 (5*4*3*2*1)
 */
public class Q02_Factorial {

    public static void main(String[] args) {
        int n = 5;

        System.out.println("Factorial of " + n);
        System.out.println("Method 1 (Loop): " + factorialLoop(n));
        System.out.println("Method 2 (Recursion): " + factorialRecursion(n));
        System.out.println("Method 3 (BigInteger): " + factorialBigInteger(20));
    }

    // ============================================
    // METHOD 1: Using Loop
    // Time: O(n), Space: O(1)
    // ============================================
    public static long factorialLoop(int n) {
        long result = 1;

        for (int i = 2; i <= n; i++) {
            result *= i;
        }

        return result;
    }

    // ============================================
    // METHOD 2: Using Recursion
    // Time: O(n), Space: O(n) - call stack
    // ============================================
    public static long factorialRecursion(int n) {
        if (n <= 1) return 1;
        return n * factorialRecursion(n - 1);
    }

    // ============================================
    // METHOD 3: Using BigInteger (for large numbers)
    // Time: O(n), Space: O(1)
    // ============================================
    public static BigInteger factorialBigInteger(int n) {
        BigInteger result = BigInteger.ONE;

        for (int i = 2; i <= n; i++) {
            result = result.multiply(BigInteger.valueOf(i));
        }

        return result;
    }
}

