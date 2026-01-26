package ex_50_Coding_Questions.CQ_01_String_Problems;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Q05: Find First Non-Repeating Character
 * =======================================
 * DIFFICULTY: Medium
 * ASKED AT: Amazon, Microsoft, Bloomberg, Goldman Sachs
 *
 * Problem: Find the first character that appears only once.
 * Input: "leetcode" -> 'l'
 * Input: "loveleetcode" -> 'v'
 */
public class Q05_FirstNonRepeatingChar {

    public static void main(String[] args) {
        String[] testCases = {"leetcode", "loveleetcode", "aabb", "aabbc"};

        for (String test : testCases) {
            System.out.println("Input: \"" + test + "\"");
            System.out.println("  Method 1 (HashMap): " + firstNonRepeatingHashMap(test));
            System.out.println("  Method 2 (LinkedHashMap): " + firstNonRepeatingLinkedHashMap(test));
            System.out.println("  Method 3 (Array): " + firstNonRepeatingArray(test));
            System.out.println("  Index: " + firstNonRepeatingIndex(test));
            System.out.println();
        }
    }

    // ============================================
    // METHOD 1: Using HashMap (Two Pass)
    // Time: O(n), Space: O(n)
    // ============================================
    public static char firstNonRepeatingHashMap(String str) {
        Map<Character, Integer> count = new HashMap<>();

        // First pass: count occurrences
        for (char ch : str.toCharArray()) {
            count.put(ch, count.getOrDefault(ch, 0) + 1);
        }

        // Second pass: find first with count 1
        for (char ch : str.toCharArray()) {
            if (count.get(ch) == 1) {
                return ch;
            }
        }

        return '_';  // No non-repeating character
    }

    // ============================================
    // METHOD 2: Using LinkedHashMap (Maintains Order)
    // Time: O(n), Space: O(n)
    // ============================================
    public static char firstNonRepeatingLinkedHashMap(String str) {
        Map<Character, Integer> count = new LinkedHashMap<>();

        for (char ch : str.toCharArray()) {
            count.put(ch, count.getOrDefault(ch, 0) + 1);
        }

        // LinkedHashMap maintains insertion order
        for (Map.Entry<Character, Integer> entry : count.entrySet()) {
            if (entry.getValue() == 1) {
                return entry.getKey();
            }
        }

        return '_';
    }

    // ============================================
    // METHOD 3: Using Array (for lowercase letters)
    // Time: O(n), Space: O(1)
    // ============================================
    public static char firstNonRepeatingArray(String str) {
        int[] count = new int[26];

        // Count occurrences
        for (char ch : str.toCharArray()) {
            count[ch - 'a']++;
        }

        // Find first non-repeating
        for (char ch : str.toCharArray()) {
            if (count[ch - 'a'] == 1) {
                return ch;
            }
        }

        return '_';
    }

    // ============================================
    // Return Index instead of Character
    // ============================================
    public static int firstNonRepeatingIndex(String str) {
        int[] count = new int[26];

        for (char ch : str.toCharArray()) {
            count[ch - 'a']++;
        }

        for (int i = 0; i < str.length(); i++) {
            if (count[str.charAt(i) - 'a'] == 1) {
                return i;
            }
        }

        return -1;
    }
}

