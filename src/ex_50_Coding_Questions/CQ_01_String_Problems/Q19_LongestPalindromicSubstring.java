package ex_50_Coding_Questions.CQ_01_String_Problems;

/**
 * Q19: Longest Palindromic Substring
 * ==================================
 * DIFFICULTY: Medium
 * ASKED AT: Amazon, Microsoft, Google (VERY COMMON)
 *
 * Problem: Find the longest palindromic substring.
 * Input: "babad" -> "bab" or "aba"
 * Input: "cbbd" -> "bb"
 */
public class Q19_LongestPalindromicSubstring {

    public static void main(String[] args) {
        String[] testCases = {"babad", "cbbd", "a", "ac", "racecar"};

        for (String test : testCases) {
            System.out.println("Input: \"" + test + "\"");
            System.out.println("  Result: \"" + longestPalindrome(test) + "\"");
            System.out.println();
        }
    }

    // ============================================
    // Expand Around Center
    // Time: O(n²), Space: O(1)
    // ============================================
    public static String longestPalindrome(String s) {
        if (s == null || s.length() < 1) return "";

        int start = 0, end = 0;

        for (int i = 0; i < s.length(); i++) {
            // Odd length palindrome (single center)
            int len1 = expandAroundCenter(s, i, i);
            // Even length palindrome (two centers)
            int len2 = expandAroundCenter(s, i, i + 1);

            int len = Math.max(len1, len2);

            if (len > end - start) {
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }

        return s.substring(start, end + 1);
    }

    private static int expandAroundCenter(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }
        return right - left - 1;
    }
}

