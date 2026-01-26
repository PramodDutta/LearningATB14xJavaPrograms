package ex_50_Coding_Questions.CQ_01_String_Problems;

/**
 * Q24: Valid Palindrome II (Can delete at most one character)
 * ===========================================================
 * DIFFICULTY: Easy-Medium
 * ASKED AT: Facebook, Amazon
 *
 * Problem: Check if string can become palindrome by removing at most one char.
 * Input: "aba" -> true
 * Input: "abca" -> true (remove 'c' or 'b')
 * Input: "abc" -> false
 */
public class Q24_ValidPalindromeII {

    public static void main(String[] args) {
        String[] testCases = {"aba", "abca", "abc", "raceacar"};

        for (String test : testCases) {
            System.out.println("\"" + test + "\": " + validPalindrome(test));
        }
    }

    // ============================================
    // Two Pointers with One Skip
    // Time: O(n), Space: O(1)
    // ============================================
    public static boolean validPalindrome(String s) {
        int left = 0, right = s.length() - 1;

        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                // Try skipping either left or right character
                return isPalindrome(s, left + 1, right) || isPalindrome(s, left, right - 1);
            }
            left++;
            right--;
        }

        return true;
    }

    private static boolean isPalindrome(String s, int left, int right) {
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}

