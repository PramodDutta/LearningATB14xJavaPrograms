package ex_50_Coding_Questions.CQ_01_String_Problems;

/**
 * Q23: Is Subsequence
 * ===================
 * DIFFICULTY: Easy
 * ASKED AT: Google, Amazon
 *
 * Problem: Check if s is subsequence of t.
 * Input: s="abc", t="ahbgdc" -> true
 * Input: s="axc", t="ahbgdc" -> false
 */
public class Q23_IsSubsequence {

    public static void main(String[] args) {
        System.out.println("isSubsequence(\"abc\", \"ahbgdc\"): " + isSubsequence("abc", "ahbgdc"));
        System.out.println("isSubsequence(\"axc\", \"ahbgdc\"): " + isSubsequence("axc", "ahbgdc"));
        System.out.println("isSubsequence(\"\", \"ahbgdc\"): " + isSubsequence("", "ahbgdc"));
    }

    // ============================================
    // Two Pointers
    // Time: O(n), Space: O(1)
    // ============================================
    public static boolean isSubsequence(String s, String t) {
        int sIndex = 0, tIndex = 0;

        while (sIndex < s.length() && tIndex < t.length()) {
            if (s.charAt(sIndex) == t.charAt(tIndex)) {
                sIndex++;
            }
            tIndex++;
        }

        return sIndex == s.length();
    }
}

