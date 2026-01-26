package ex_50_Coding_Questions.CQ_03_Number_Problems;

/**
 * Q10: Sum of Digits
 * ==================
 * DIFFICULTY: Easy
 * ASKED AT: TCS, Infosys, Wipro
 *
 * Problem: Find sum of all digits in a number.
 * Input: 12345 -> 15 (1+2+3+4+5)
 */
public class Q10_SumOfDigits {

    public static void main(String[] args) {
        int[] testCases = {12345, 999, 0, 100};

        System.out.println("--- SUM OF DIGITS ---\n");

        for (int num : testCases) {
            System.out.println(num + " -> Loop: " + sumDigitsLoop(num) +
                    ", Recursive: " + sumDigitsRecursive(num) +
                    ", Stream: " + sumDigitsStream(num));
        }

        System.out.println("\n--- DIGITAL ROOT ---");
        System.out.println("Digital root of 9875: " + digitalRoot(9875));
    }

    // ============================================
    // METHOD 1: Using Loop
    // Time: O(d), Space: O(1)
    // ============================================
    public static int sumDigitsLoop(int n) {
        n = Math.abs(n);
        int sum = 0;

        while (n > 0) {
            sum += n % 10;
            n /= 10;
        }

        return sum;
    }

    // ============================================
    // METHOD 2: Using Recursion
    // Time: O(d), Space: O(d)
    // ============================================
    public static int sumDigitsRecursive(int n) {
        n = Math.abs(n);
        if (n < 10) return n;
        return n % 10 + sumDigitsRecursive(n / 10);
    }

    // ============================================
    // METHOD 3: Using Stream
    // Time: O(d), Space: O(d)
    // ============================================
    public static int sumDigitsStream(int n) {
        return String.valueOf(Math.abs(n))
                .chars()
                .map(c -> c - '0')
                .sum();
    }

    // ============================================
    // BONUS: Digital Root (keep summing until single digit)
    // ============================================
    public static int digitalRoot(int n) {
        while (n >= 10) {
            n = sumDigitsLoop(n);
        }
        return n;
    }
}

