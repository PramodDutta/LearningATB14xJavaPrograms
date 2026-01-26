package ex_50_Coding_Questions.CQ_03_Number_Problems;

import java.util.HashSet;
import java.util.Set;

/**
 * Q15: Happy Number
 * =================
 * DIFFICULTY: Easy
 * ASKED AT: Amazon, Google, Apple
 *
 * Problem: A happy number eventually reaches 1 when replaced by sum of squares of digits.
 * Input: 19 -> true
 *   1² + 9² = 82
 *   8² + 2² = 68
 *   6² + 8² = 100
 *   1² + 0² + 0² = 1 ✓
 */
public class Q15_HappyNumber {

    public static void main(String[] args) {
        int[] testCases = {19, 2, 7, 100, 1};

        System.out.println("--- HAPPY NUMBER CHECK ---\n");

        for (int num : testCases) {
            System.out.println(num + " -> HashSet: " + isHappySet(num) +
                    ", Floyd: " + isHappyFloyd(num));
        }
    }

    // ============================================
    // METHOD 1: Using HashSet
    // Time: O(log n), Space: O(log n)
    // ============================================
    public static boolean isHappySet(int n) {
        Set<Integer> seen = new HashSet<>();

        while (n != 1 && !seen.contains(n)) {
            seen.add(n);
            n = sumOfSquares(n);
        }

        return n == 1;
    }

    // ============================================
    // METHOD 2: Floyd's Cycle Detection
    // Time: O(log n), Space: O(1)
    // ============================================
    public static boolean isHappyFloyd(int n) {
        int slow = n;
        int fast = sumOfSquares(n);

        while (fast != 1 && slow != fast) {
            slow = sumOfSquares(slow);
            fast = sumOfSquares(sumOfSquares(fast));
        }

        return fast == 1;
    }

    // Helper: Sum of squares of digits
    private static int sumOfSquares(int n) {
        int sum = 0;

        while (n > 0) {
            int digit = n % 10;
            sum += digit * digit;
            n /= 10;
        }

        return sum;
    }
}

