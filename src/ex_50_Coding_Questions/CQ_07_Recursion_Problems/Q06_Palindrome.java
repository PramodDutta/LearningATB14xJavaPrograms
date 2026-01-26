package ex_50_Coding_Questions.CQ_07_Recursion_Problems;

/**
 * Q06: Check Palindrome using Recursion
 * =====================================
 * DIFFICULTY: Easy
 * ASKED AT: TCS, Infosys
 *
 * Problem: Check if string is palindrome using recursion.
 * Input: "radar"
 * Output: true
 */
public class Q06_Palindrome {

    public static void main(String[] args) {
        String[] testCases = {"radar", "hello", "madam", "level", "java"};

        for (String str : testCases) {
            System.out.println(str + " -> " + isPalindrome(str, 0, str.length() - 1));
        }
    }

    // ============================================
    // Recursive Palindrome Check
    // Time: O(n), Space: O(n)
    // ============================================
    public static boolean isPalindrome(String str, int left, int right) {
        // Base case: single char or empty
        if (left >= right) return true;

        // If characters don't match
        if (str.charAt(left) != str.charAt(right)) {
            return false;
        }

        // Check inner substring
        return isPalindrome(str, left + 1, right - 1);
    }
}

