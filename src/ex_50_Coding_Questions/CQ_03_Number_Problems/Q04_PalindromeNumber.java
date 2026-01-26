package ex_50_Coding_Questions.CQ_03_Number_Problems;

/**
 * Q04: Palindrome Number
 * ======================
 * DIFFICULTY: Easy
 * ASKED AT: Amazon, Microsoft, TCS
 *
 * Problem: Check if number reads same forwards and backwards.
 * Input: 121 -> true
 * Input: -121 -> false
 */
public class Q04_PalindromeNumber {

    public static void main(String[] args) {
        int[] testCases = {121, -121, 12321, 123, 0, 10};

        System.out.println("--- PALINDROME NUMBER CHECK ---\n");

        for (int num : testCases) {
            System.out.println(num + " -> Reverse: " + isPalindromeReverse(num) +
                    ", Half: " + isPalindromeHalf(num));
        }
    }

    // ============================================
    // METHOD 1: Reverse Entire Number
    // Time: O(log n), Space: O(1)
    // ============================================
    public static boolean isPalindromeReverse(int x) {
        if (x < 0) return false;

        int original = x;
        int reversed = 0;

        while (x > 0) {
            reversed = reversed * 10 + x % 10;
            x /= 10;
        }

        return original == reversed;
    }

    // ============================================
    // METHOD 2: Reverse Half (OPTIMAL)
    // Time: O(log n), Space: O(1)
    // ============================================
    public static boolean isPalindromeHalf(int x) {
        // Negative or ends with 0 (except 0 itself)
        if (x < 0 || (x % 10 == 0 && x != 0)) {
            return false;
        }

        int reversed = 0;

        while (x > reversed) {
            reversed = reversed * 10 + x % 10;
            x /= 10;
        }

        // For odd length, reversed/10 removes middle digit
        return x == reversed || x == reversed / 10;
    }
}

