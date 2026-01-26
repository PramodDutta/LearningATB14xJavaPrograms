package ex_50_Coding_Questions.CQ_01_String_Problems;

import java.util.ArrayList;
import java.util.List;

/**
 * Q20: ZigZag Conversion
 * ======================
 * DIFFICULTY: Medium
 * ASKED AT: Amazon, Microsoft
 *
 * Problem: Write string in zigzag pattern and read row by row.
 * Input: "PAYPALISHIRING", numRows=3
 * P   A   H   N
 * A P L S I I G
 * Y   I   R
 * Output: "PAHNAPLSIIGYIR"
 */
public class Q20_ZigZagConversion {

    public static void main(String[] args) {
        String s = "PAYPALISHIRING";

        System.out.println("Input: \"" + s + "\"");
        System.out.println("3 rows: \"" + convert(s, 3) + "\"");
        System.out.println("4 rows: \"" + convert(s, 4) + "\"");
    }

    // ============================================
    // Using List of StringBuilders
    // Time: O(n), Space: O(n)
    // ============================================
    public static String convert(String s, int numRows) {
        if (numRows == 1 || numRows >= s.length()) return s;

        List<StringBuilder> rows = new ArrayList<>();
        for (int i = 0; i < numRows; i++) {
            rows.add(new StringBuilder());
        }

        int currentRow = 0;
        boolean goingDown = false;

        for (char ch : s.toCharArray()) {
            rows.get(currentRow).append(ch);

            // Change direction at top or bottom
            if (currentRow == 0 || currentRow == numRows - 1) {
                goingDown = !goingDown;
            }

            currentRow += goingDown ? 1 : -1;
        }

        StringBuilder result = new StringBuilder();
        for (StringBuilder row : rows) {
            result.append(row);
        }

        return result.toString();
    }
}

