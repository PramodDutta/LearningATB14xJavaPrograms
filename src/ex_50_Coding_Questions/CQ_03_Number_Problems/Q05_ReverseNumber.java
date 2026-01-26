package ex_50_Coding_Questions.CQ_03_Number_Problems;

/**
 * Q05: Reverse a Number
 * =====================
 * DIFFICULTY: Easy
 * ASKED AT: TCS, Infosys, Wipro
 *
 * Problem: Reverse digits of a number.
 * Input: 12345 -> 54321
 * Input: -123 -> -321
 */
public class Q05_ReverseNumber {

    public static void main(String[] args) {
        int[] testCases = {12345, -123, 120, 0, 1534236469};

        System.out.println("--- REVERSE NUMBER ---\n");

        for (int num : testCases) {
            System.out.println(num + " -> " + reverseNumber(num) +
                    " (with overflow check: " + reverseWithOverflow(num) + ")");
        }
    }

    // ============================================
    // METHOD 1: Basic Reverse
    // Time: O(log n), Space: O(1)
    // ============================================
    public static int reverseNumber(int x) {
        int reversed = 0;

        while (x != 0) {
            reversed = reversed * 10 + x % 10;
            x /= 10;
        }

        return reversed;
    }

    // ============================================
    // METHOD 2: With Overflow Check
    // Time: O(log n), Space: O(1)
    // ============================================
    public static int reverseWithOverflow(int x) {
        int reversed = 0;

        while (x != 0) {
            int digit = x % 10;

            // Check overflow before multiplication
            if (reversed > Integer.MAX_VALUE / 10 ||
                    (reversed == Integer.MAX_VALUE / 10 && digit > 7)) {
                return 0;
            }
            if (reversed < Integer.MIN_VALUE / 10 ||
                    (reversed == Integer.MIN_VALUE / 10 && digit < -8)) {
                return 0;
            }

            reversed = reversed * 10 + digit;
            x /= 10;
        }

        return reversed;
    }
}

