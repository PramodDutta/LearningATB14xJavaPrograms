package ex_50_Coding_Questions.CQ_03_Number_Problems;

/**
 * Q08: Power of Two
 * =================
 * DIFFICULTY: Easy
 * ASKED AT: Amazon, Microsoft, Google
 *
 * Problem: Check if number is power of 2.
 * Input: 16 -> true (2^4)
 * Input: 18 -> false
 */
public class Q08_PowerOfTwo {

    public static void main(String[] args) {
        int[] testCases = {1, 2, 4, 8, 16, 18, 32, 0, -16};

        System.out.println("--- POWER OF TWO CHECK ---\n");

        for (int num : testCases) {
            System.out.println(num + " -> Loop: " + isPowerOfTwoLoop(num) +
                    ", Bit: " + isPowerOfTwoBit(num));
        }
    }

    // ============================================
    // METHOD 1: Using Loop
    // Time: O(log n), Space: O(1)
    // ============================================
    public static boolean isPowerOfTwoLoop(int n) {
        if (n <= 0) return false;

        while (n > 1) {
            if (n % 2 != 0) return false;
            n /= 2;
        }

        return true;
    }

    // ============================================
    // METHOD 2: Using Bit Manipulation (OPTIMAL)
    // Time: O(1), Space: O(1)
    // Power of 2 has only one bit set
    // n & (n-1) removes the lowest set bit
    // ============================================
    public static boolean isPowerOfTwoBit(int n) {
        return n > 0 && (n & (n - 1)) == 0;
    }
}

