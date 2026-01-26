package ex_50_Coding_Questions.CQ_07_Recursion_Problems;

/**
 * Q05: Reverse String using Recursion
 * ===================================
 * DIFFICULTY: Easy
 * ASKED AT: TCS, Infosys
 *
 * Problem: Reverse a string using recursion.
 * Input: "hello"
 * Output: "olleh"
 */
public class Q05_StringReverse {

    public static void main(String[] args) {
        String str = "hello";

        System.out.println("Original: " + str);
        System.out.println("Reversed: " + reverseString(str));
        System.out.println("Reversed (char array): " + reverseStringArray(str.toCharArray(), 0, str.length() - 1));
    }

    // ============================================
    // Recursive String Reverse
    // Time: O(n), Space: O(n)
    // ============================================
    public static String reverseString(String str) {
        // Base case
        if (str.isEmpty()) return str;

        // Recursive case: last char + reverse of rest
        return str.charAt(str.length() - 1) + reverseString(str.substring(0, str.length() - 1));
    }

    // ============================================
    // Using Char Array (In-place style)
    // ============================================
    public static String reverseStringArray(char[] chars, int left, int right) {
        if (left >= right) {
            return new String(chars);
        }

        // Swap
        char temp = chars[left];
        chars[left] = chars[right];
        chars[right] = temp;

        return reverseStringArray(chars, left + 1, right - 1);
    }
}

