package ex_50_Coding_Questions.CQ_03_Number_Problems;

import java.util.HashMap;
import java.util.Map;

/**
 * Q03: Fibonacci Series
 * =====================
 * DIFFICULTY: Easy
 * ASKED AT: Amazon, Google, TCS, Infosys (VERY COMMON)
 *
 * Problem: Generate Fibonacci series or find nth Fibonacci number.
 * Series: 0, 1, 1, 2, 3, 5, 8, 13, 21...
 */
public class Q03_Fibonacci {

    public static void main(String[] args) {
        int n = 10;

        System.out.println("Fibonacci Series (first " + n + " numbers):");
        fibonacciSeries(n);

        System.out.println("\n\nNth Fibonacci Number:");
        System.out.println("Method 1 (Loop): " + fibLoop(n));
        System.out.println("Method 2 (Recursion): " + fibRecursion(n));
        System.out.println("Method 3 (Memoization): " + fibMemo(n, new HashMap<>()));
    }

    // ============================================
    // Print Fibonacci Series
    // ============================================
    public static void fibonacciSeries(int n) {
        int a = 0, b = 1;

        for (int i = 0; i < n; i++) {
            System.out.print(a + " ");
            int next = a + b;
            a = b;
            b = next;
        }
    }

    // ============================================
    // METHOD 1: Using Loop
    // Time: O(n), Space: O(1)
    // ============================================
    public static int fibLoop(int n) {
        if (n <= 1) return n;

        int a = 0, b = 1;
        for (int i = 2; i <= n; i++) {
            int next = a + b;
            a = b;
            b = next;
        }

        return b;
    }

    // ============================================
    // METHOD 2: Using Recursion (Inefficient)
    // Time: O(2^n), Space: O(n)
    // ============================================
    public static int fibRecursion(int n) {
        if (n <= 1) return n;
        return fibRecursion(n - 1) + fibRecursion(n - 2);
    }

    // ============================================
    // METHOD 3: Using Memoization (OPTIMAL)
    // Time: O(n), Space: O(n)
    // ============================================
    public static int fibMemo(int n, Map<Integer, Integer> memo) {
        if (n <= 1) return n;

        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        int result = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
        memo.put(n, result);

        return result;
    }
}

