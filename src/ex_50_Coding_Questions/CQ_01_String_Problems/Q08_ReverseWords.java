package ex_50_Coding_Questions.CQ_01_String_Problems;

import java.util.Arrays;
import java.util.Collections;

/**
 * Q08: Reverse Words in a String
 * ==============================
 * DIFFICULTY: Medium
 * ASKED AT: Amazon, Microsoft, Facebook, Google
 *
 * Problem: Reverse the order of words in a string.
 * Input: "Hello World Java"
 * Output: "Java World Hello"
 */
public class Q08_ReverseWords {

    public static void main(String[] args) {
        String input = "  Hello   World   Java  ";

        System.out.println("Input: \"" + input + "\"");
        System.out.println("\n--- SOLUTIONS ---");

        System.out.println("Method 1 (Split): \"" + reverseWordsSplit(input) + "\"");
        System.out.println("Method 2 (StringBuilder): \"" + reverseWordsStringBuilder(input) + "\"");
        System.out.println("Method 3 (Collections): \"" + reverseWordsCollections(input) + "\"");
    }

    // ============================================
    // METHOD 1: Using Split and Join
    // Time: O(n), Space: O(n)
    // ============================================
    public static String reverseWordsSplit(String str) {
        // Split by one or more spaces
        String[] words = str.trim().split("\\s+");

        // Reverse array
        int left = 0, right = words.length - 1;
        while (left < right) {
            String temp = words[left];
            words[left] = words[right];
            words[right] = temp;
            left++;
            right--;
        }

        return String.join(" ", words);
    }

    // ============================================
    // METHOD 2: Using StringBuilder
    // Time: O(n), Space: O(n)
    // ============================================
    public static String reverseWordsStringBuilder(String str) {
        String[] words = str.trim().split("\\s+");
        StringBuilder result = new StringBuilder();

        for (int i = words.length - 1; i >= 0; i--) {
            result.append(words[i]);
            if (i > 0) {
                result.append(" ");
            }
        }

        return result.toString();
    }

    // ============================================
    // METHOD 3: Using Collections.reverse
    // Time: O(n), Space: O(n)
    // ============================================
    public static String reverseWordsCollections(String str) {
        var words = Arrays.asList(str.trim().split("\\s+"));
        Collections.reverse(words);
        return String.join(" ", words);
    }
}

