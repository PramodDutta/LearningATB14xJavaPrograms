package ex_50_Coding_Questions.CQ_01_String_Problems;

import java.util.StringTokenizer;

/**
 * Q15: Count Words in a String
 * ============================
 * DIFFICULTY: Easy
 * ASKED AT: TCS, Infosys, Wipro, Cognizant
 *
 * Problem: Count the number of words in a string.
 * Input: "Hello World Java" -> 3
 * Input: "  Hello   World  " -> 2
 */
public class Q15_CountWords {

    public static void main(String[] args) {
        String[] testCases = {
                "Hello World Java",
                "  Hello   World  ",
                "",
                "OneWord",
                "   "
        };

        for (String test : testCases) {
            System.out.println("Input: \"" + test + "\"");
            System.out.println("  Method 1 (Split): " + countWordsSplit(test));
            System.out.println("  Method 2 (Loop): " + countWordsLoop(test));
            System.out.println("  Method 3 (StringTokenizer): " + countWordsTokenizer(test));
            System.out.println();
        }
    }

    // ============================================
    // METHOD 1: Using Split
    // Time: O(n), Space: O(n)
    // ============================================
    public static int countWordsSplit(String str) {
        if (str == null || str.trim().isEmpty()) return 0;

        String[] words = str.trim().split("\\s+");
        return words.length;
    }

    // ============================================
    // METHOD 2: Using Loop
    // Time: O(n), Space: O(1)
    // ============================================
    public static int countWordsLoop(String str) {
        if (str == null || str.trim().isEmpty()) return 0;

        int count = 0;
        boolean inWord = false;

        for (char ch : str.toCharArray()) {
            if (Character.isLetterOrDigit(ch)) {
                if (!inWord) {
                    count++;
                    inWord = true;
                }
            } else {
                inWord = false;
            }
        }

        return count;
    }

    // ============================================
    // METHOD 3: Using StringTokenizer
    // Time: O(n), Space: O(n)
    // ============================================
    public static int countWordsTokenizer(String str) {
        if (str == null || str.trim().isEmpty()) return 0;

        StringTokenizer tokenizer = new StringTokenizer(str);
        return tokenizer.countTokens();
    }
}

