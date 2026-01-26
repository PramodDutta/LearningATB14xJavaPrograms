package ex_50_Coding_Questions.CQ_01_String_Problems;

import java.util.Arrays;

/**
 * Q13: Longest Common Prefix
 * ==========================
 * DIFFICULTY: Easy
 * ASKED AT: Amazon, Google, Apple
 *
 * Problem: Find longest common prefix among array of strings.
 * Input: ["flower", "flow", "flight"] -> "fl"
 * Input: ["dog", "racecar", "car"] -> ""
 */
public class Q13_LongestCommonPrefix {

    public static void main(String[] args) {
        String[][] testCases = {
                {"flower", "flow", "flight"},
                {"dog", "racecar", "car"},
                {"interspecies", "interstellar", "interstate"},
                {"a"},
                {}
        };

        for (String[] test : testCases) {
            System.out.println("Input: " + Arrays.toString(test));
            System.out.println("  Method 1 (Horizontal): \"" + longestCommonPrefixHorizontal(test) + "\"");
            System.out.println("  Method 2 (Vertical): \"" + longestCommonPrefixVertical(test) + "\"");
            System.out.println("  Method 3 (Sorting): \"" + longestCommonPrefixSorting(test) + "\"");
            System.out.println();
        }
    }

    // ============================================
    // METHOD 1: Horizontal Scanning
    // Time: O(S) where S = sum of all characters
    // ============================================
    public static String longestCommonPrefixHorizontal(String[] strs) {
        if (strs == null || strs.length == 0) return "";

        String prefix = strs[0];

        for (int i = 1; i < strs.length; i++) {
            while (strs[i].indexOf(prefix) != 0) {
                prefix = prefix.substring(0, prefix.length() - 1);
                if (prefix.isEmpty()) return "";
            }
        }

        return prefix;
    }

    // ============================================
    // METHOD 2: Vertical Scanning
    // Time: O(S), Space: O(1)
    // ============================================
    public static String longestCommonPrefixVertical(String[] strs) {
        if (strs == null || strs.length == 0) return "";

        for (int i = 0; i < strs[0].length(); i++) {
            char ch = strs[0].charAt(i);

            for (int j = 1; j < strs.length; j++) {
                if (i >= strs[j].length() || strs[j].charAt(i) != ch) {
                    return strs[0].substring(0, i);
                }
            }
        }

        return strs[0];
    }

    // ============================================
    // METHOD 3: Using Sorting
    // Time: O(n log n * m), Space: O(1)
    // ============================================
    public static String longestCommonPrefixSorting(String[] strs) {
        if (strs == null || strs.length == 0) return "";

        Arrays.sort(strs);

        // Compare only first and last after sorting
        String first = strs[0];
        String last = strs[strs.length - 1];

        int i = 0;
        while (i < first.length() && i < last.length() && first.charAt(i) == last.charAt(i)) {
            i++;
        }

        return first.substring(0, i);
    }
}

