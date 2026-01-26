package ex_50_Coding_Questions.CQ_03_Number_Problems;

/**
 * Q09: Count Digits in a Number
 * =============================
 * DIFFICULTY: Easy
 * ASKED AT: TCS, Infosys
 *
 * Problem: Count number of digits in a number.
 * Input: 12345 -> 5
 */
public class Q09_CountDigits {

    public static void main(String[] args) {
        int[] testCases = {12345, 0, 1, 999999, -123};

        System.out.println("--- COUNT DIGITS ---\n");

        for (int num : testCases) {
            System.out.println(num + " -> Loop: " + countDigitsLoop(num) +
                    ", Log: " + countDigitsLog(num) +
                    ", String: " + countDigitsString(num));
        }
    }

    // ============================================
    // METHOD 1: Using Loop
    // Time: O(d), Space: O(1)
    // ============================================
    public static int countDigitsLoop(int n) {
        if (n == 0) return 1;

        n = Math.abs(n);
        int count = 0;

        while (n > 0) {
            count++;
            n /= 10;
        }

        return count;
    }

    // ============================================
    // METHOD 2: Using Logarithm
    // Time: O(1), Space: O(1)
    // ============================================
    public static int countDigitsLog(int n) {
        if (n == 0) return 1;
        return (int) Math.floor(Math.log10(Math.abs(n))) + 1;
    }

    // ============================================
    // METHOD 3: Using String
    // Time: O(d), Space: O(d)
    // ============================================
    public static int countDigitsString(int n) {
        return String.valueOf(Math.abs(n)).length();
    }
}

