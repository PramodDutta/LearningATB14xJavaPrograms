package ex_50_Coding_Questions.CQ_01_String_Problems;

/**
 * Q02: Check if String is Palindrome
 * ==================================
 * DIFFICULTY: Easy
 * ASKED AT: Amazon, Facebook, Goldman Sachs, Wipro
 *
 * Problem: Check if a string reads the same forwards and backwards.
 * Input: "madam" -> true
 * Input: "hello" -> false
 */
public class Q02_Palindrome {

    public static void main(String[] args) {
        String[] testCases = {"madam", "racecar", "hello", "A man a plan a canal Panama", "12321"};

        for (String test : testCases) {
            System.out.println("\"" + test + "\"");
            System.out.println("  Method 1 (StringBuilder): " + isPalindromeStringBuilder(test));
            System.out.println("  Method 2 (Two Pointers): " + isPalindromeTwoPointers(test));
            System.out.println("  Method 3 (Ignore case/spaces): " + isPalindromeIgnoreCase(test));
            System.out.println();
        }
    }

    // ============================================
    // METHOD 1: Using StringBuilder
    // Time: O(n), Space: O(n)
    // ============================================
    public static boolean isPalindromeStringBuilder(String str) {
        String reversed = new StringBuilder(str).reverse().toString();
        return str.equals(reversed);
    }

    // ============================================
    // METHOD 2: Two Pointers (OPTIMAL)
    // Time: O(n), Space: O(1)
    // ============================================
    public static boolean isPalindromeTwoPointers(String str) {
        int left = 0;
        int right = str.length() - 1;

        while (left < right) {
            if (str.charAt(left) != str.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    // ============================================
    // METHOD 3: Ignore Case and Non-Alphanumeric
    // Time: O(n), Space: O(1)
    // ============================================
    public static boolean isPalindromeIgnoreCase(String str) {
        int left = 0;
        int right = str.length() - 1;

        while (left < right) {
            // Skip non-alphanumeric characters
            while (left < right && !Character.isLetterOrDigit(str.charAt(left))) {
                left++;
            }
            while (left < right && !Character.isLetterOrDigit(str.charAt(right))) {
                right--;
            }

            // Compare ignoring case
            if (Character.toLowerCase(str.charAt(left)) != Character.toLowerCase(str.charAt(right))) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}

