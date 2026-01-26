package ex_50_Coding_Questions.CQ_01_String_Problems;

/**
 * Q14: String to Integer (atoi)
 * ============================
 * DIFFICULTY: Medium
 * ASKED AT: Amazon, Microsoft, Facebook
 *
 * Problem: Convert string to integer handling edge cases.
 * Input: "42" -> 42
 * Input: "   -42" -> -42
 * Input: "4193 with words" -> 4193
 */
public class Q14_StringToInteger {

    public static void main(String[] args) {
        String[] testCases = {"42", "   -42", "4193 with words", "words and 987", "-91283472332", ""};

        for (String test : testCases) {
            System.out.println("Input: \"" + test + "\"");
            System.out.println("  Result: " + myAtoi(test));
            System.out.println();
        }
    }

    // ============================================
    // Complete Implementation with Edge Cases
    // Time: O(n), Space: O(1)
    // ============================================
    public static int myAtoi(String s) {
        if (s == null || s.isEmpty()) return 0;

        int index = 0;
        int n = s.length();
        int sign = 1;
        long result = 0;

        // Step 1: Skip leading whitespace
        while (index < n && s.charAt(index) == ' ') {
            index++;
        }

        // Step 2: Check for sign
        if (index < n && (s.charAt(index) == '+' || s.charAt(index) == '-')) {
            sign = s.charAt(index) == '-' ? -1 : 1;
            index++;
        }

        // Step 3: Convert digits
        while (index < n && Character.isDigit(s.charAt(index))) {
            int digit = s.charAt(index) - '0';
            result = result * 10 + digit;

            // Step 4: Handle overflow
            if (result * sign > Integer.MAX_VALUE) {
                return Integer.MAX_VALUE;
            }
            if (result * sign < Integer.MIN_VALUE) {
                return Integer.MIN_VALUE;
            }

            index++;
        }

        return (int) (result * sign);
    }

    // ============================================
    // Simple Version (without edge cases)
    // ============================================
    public static int simpleAtoi(String s) {
        try {
            return Integer.parseInt(s.trim());
        } catch (NumberFormatException e) {
            return 0;
        }
    }
}

