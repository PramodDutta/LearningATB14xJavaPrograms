package ex_50_Coding_Questions.CQ_01_String_Problems;

/**
 * Q22: Reverse Only Letters
 * =========================
 * DIFFICULTY: Easy
 * ASKED AT: Amazon, Google
 *
 * Problem: Reverse only letters, keep other characters in place.
 * Input: "a-bC-dEf-ghIj" -> "j-Ih-gfE-dCba"
 * Input: "Test1ng-Leet=code-Q!" -> "Qedo1teleC-tset=gnit-T!"
 */
public class Q22_ReverseOnlyLetters {

    public static void main(String[] args) {
        String[] testCases = {"a-bC-dEf-ghIj", "Test1ng-Leet=code-Q!", "ab-cd"};

        for (String test : testCases) {
            System.out.println("Input: \"" + test + "\"");
            System.out.println("Output: \"" + reverseOnlyLetters(test) + "\"");
            System.out.println();
        }
    }

    // ============================================
    // Two Pointers
    // Time: O(n), Space: O(n)
    // ============================================
    public static String reverseOnlyLetters(String s) {
        char[] chars = s.toCharArray();
        int left = 0, right = chars.length - 1;

        while (left < right) {
            // Skip non-letters from left
            while (left < right && !Character.isLetter(chars[left])) {
                left++;
            }
            // Skip non-letters from right
            while (left < right && !Character.isLetter(chars[right])) {
                right--;
            }

            // Swap letters
            char temp = chars[left];
            chars[left] = chars[right];
            chars[right] = temp;

            left++;
            right--;
        }

        return new String(chars);
    }
}

