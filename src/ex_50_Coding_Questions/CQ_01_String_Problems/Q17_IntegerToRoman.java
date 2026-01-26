package ex_50_Coding_Questions.CQ_01_String_Problems;

/**
 * Q17: Integer to Roman
 * =====================
 * DIFFICULTY: Medium
 * ASKED AT: Amazon, Microsoft, Facebook
 *
 * Problem: Convert integer to Roman numeral.
 * Input: 3 -> "III"
 * Input: 1994 -> "MCMXCIV"
 */
public class Q17_IntegerToRoman {

    public static void main(String[] args) {
        int[] testCases = {3, 4, 9, 58, 1994, 3999};

        for (int test : testCases) {
            System.out.println(test + " -> \"" + intToRoman(test) + "\"");
        }
    }

    // ============================================
    // Using Arrays
    // Time: O(1), Space: O(1)
    // ============================================
    public static String intToRoman(int num) {
        int[] values = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
        String[] symbols = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};

        StringBuilder result = new StringBuilder();

        for (int i = 0; i < values.length && num > 0; i++) {
            while (num >= values[i]) {
                result.append(symbols[i]);
                num -= values[i];
            }
        }

        return result.toString();
    }
}

