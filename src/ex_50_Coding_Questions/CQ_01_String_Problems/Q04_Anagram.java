package ex_50_Coding_Questions.CQ_01_String_Problems;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

/**
 * Q04: Check if Two Strings are Anagrams
 * ======================================
 * DIFFICULTY: Easy-Medium
 * ASKED AT: Amazon, Google, Microsoft, Goldman Sachs
 *
 * Problem: Check if two strings contain the same characters with same frequency.
 * Input: "listen", "silent" -> true
 * Input: "hello", "world" -> false
 */
public class Q04_Anagram {

    public static void main(String[] args) {
        String[][] testCases = {
                {"listen", "silent"},
                {"hello", "world"},
                {"anagram", "nagaram"},
                {"rat", "car"}
        };

        for (String[] test : testCases) {
            System.out.println("\"" + test[0] + "\" and \"" + test[1] + "\"");
            System.out.println("  Method 1 (Sorting): " + isAnagramSorting(test[0], test[1]));
            System.out.println("  Method 2 (HashMap): " + isAnagramHashMap(test[0], test[1]));
            System.out.println("  Method 3 (Array): " + isAnagramArray(test[0], test[1]));
            System.out.println();
        }
    }

    // ============================================
    // METHOD 1: Using Sorting
    // Time: O(n log n), Space: O(n)
    // ============================================
    public static boolean isAnagramSorting(String s1, String s2) {
        if (s1.length() != s2.length()) return false;

        char[] arr1 = s1.toLowerCase().toCharArray();
        char[] arr2 = s2.toLowerCase().toCharArray();

        Arrays.sort(arr1);
        Arrays.sort(arr2);

        return Arrays.equals(arr1, arr2);
    }

    // ============================================
    // METHOD 2: Using HashMap
    // Time: O(n), Space: O(n)
    // ============================================
    public static boolean isAnagramHashMap(String s1, String s2) {
        if (s1.length() != s2.length()) return false;

        Map<Character, Integer> charCount = new HashMap<>();

        // Count characters in first string
        for (char ch : s1.toLowerCase().toCharArray()) {
            charCount.put(ch, charCount.getOrDefault(ch, 0) + 1);
        }

        // Subtract count for second string
        for (char ch : s2.toLowerCase().toCharArray()) {
            if (!charCount.containsKey(ch)) return false;

            charCount.put(ch, charCount.get(ch) - 1);

            if (charCount.get(ch) == 0) {
                charCount.remove(ch);
            }
        }

        return charCount.isEmpty();
    }

    // ============================================
    // METHOD 3: Using Array (for lowercase letters only)
    // Time: O(n), Space: O(1) - fixed 26 size
    // ============================================
    public static boolean isAnagramArray(String s1, String s2) {
        if (s1.length() != s2.length()) return false;

        int[] count = new int[26];

        for (int i = 0; i < s1.length(); i++) {
            count[Character.toLowerCase(s1.charAt(i)) - 'a']++;
            count[Character.toLowerCase(s2.charAt(i)) - 'a']--;
        }

        for (int c : count) {
            if (c != 0) return false;
        }

        return true;
    }
}

