package ex_50_Coding_Questions.CQ_01_String_Problems;

import java.util.Map;

/**
 * Q16: Roman to Integer
 * =====================
 * DIFFICULTY: Easy-Medium
 * ASKED AT: Amazon, Microsoft, Facebook
 *
 * Problem: Convert Roman numeral to integer.
 * I=1, V=5, X=10, L=50, C=100, D=500, M=1000
 * Input: "III" -> 3
 * Input: "MCMXCIV" -> 1994
 */
public class Q16_RomanToInteger {

    public static void main(String[] args) {
        String[] testCases = {"III", "IV", "IX", "LVIII", "MCMXCIV"};

        for (String test : testCases) {
            System.out.println("Input: \"" + test + "\" -> " + romanToInt(test));
        }
    }

    // ============================================
    // Using Map
    // Time: O(n), Space: O(1)
    // ============================================
    public static int romanToInt(String s) {
        Map<Character, Integer> values = Map.of(
                'I', 1, 'V', 5, 'X', 10, 'L', 50,
                'C', 100, 'D', 500, 'M', 1000
        );

        int result = 0;
        int prev = 0;

        // Process from right to left
        for (int i = s.length() - 1; i >= 0; i--) {
            int curr = values.get(s.charAt(i));

            // If current is less than previous, subtract (e.g., IV = 4)
            if (curr < prev) {
                result -= curr;
            } else {
                result += curr;
            }

            prev = curr;
        }

        return result;
    }
}

