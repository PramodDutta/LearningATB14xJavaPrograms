package ex_50_Coding_Questions.CQ_01_String_Problems;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * Q10: Longest Substring Without Repeating Characters
 * ===================================================
 * DIFFICULTY: Medium
 * ASKED AT: Amazon, Google, Facebook, Microsoft (VERY COMMON)
 *
 * Problem: Find length of longest substring without repeating characters.
 * Input: "abcabcbb" -> 3 ("abc")
 * Input: "bbbbb" -> 1 ("b")
 */
public class Q10_LongestSubstringWithoutRepeat {

    public static void main(String[] args) {
        String[] testCases = {"abcabcbb", "bbbbb", "pwwkew", "abcdef", ""};

        for (String test : testCases) {
            System.out.println("Input: \"" + test + "\"");
            System.out.println("  Method 1 (HashSet): " + lengthOfLongestSubstringSet(test));
            System.out.println("  Method 2 (HashMap): " + lengthOfLongestSubstringMap(test));
            System.out.println("  Substring: \"" + longestSubstring(test) + "\"");
            System.out.println();
        }
    }

    // ============================================
    // METHOD 1: Sliding Window with HashSet
    // Time: O(n), Space: O(min(n, m)) where m = charset size
    // ============================================
    public static int lengthOfLongestSubstringSet(String s) {
        Set<Character> seen = new HashSet<>();
        int maxLength = 0;
        int left = 0;

        for (int right = 0; right < s.length(); right++) {
            char ch = s.charAt(right);

            // Shrink window until no duplicate
            while (seen.contains(ch)) {
                seen.remove(s.charAt(left));
                left++;
            }

            seen.add(ch);
            maxLength = Math.max(maxLength, right - left + 1);
        }

        return maxLength;
    }

    // ============================================
    // METHOD 2: Sliding Window with HashMap (Optimized)
    // Time: O(n), Space: O(min(n, m))
    // ============================================
    public static int lengthOfLongestSubstringMap(String s) {
        Map<Character, Integer> lastIndex = new HashMap<>();
        int maxLength = 0;
        int left = 0;

        for (int right = 0; right < s.length(); right++) {
            char ch = s.charAt(right);

            // If character seen and within current window
            if (lastIndex.containsKey(ch) && lastIndex.get(ch) >= left) {
                left = lastIndex.get(ch) + 1;
            }

            lastIndex.put(ch, right);
            maxLength = Math.max(maxLength, right - left + 1);
        }

        return maxLength;
    }

    // ============================================
    // Return the actual substring
    // ============================================
    public static String longestSubstring(String s) {
        if (s.isEmpty()) return "";

        Map<Character, Integer> lastIndex = new HashMap<>();
        int maxLength = 0, maxStart = 0;
        int left = 0;

        for (int right = 0; right < s.length(); right++) {
            char ch = s.charAt(right);

            if (lastIndex.containsKey(ch) && lastIndex.get(ch) >= left) {
                left = lastIndex.get(ch) + 1;
            }

            lastIndex.put(ch, right);

            if (right - left + 1 > maxLength) {
                maxLength = right - left + 1;
                maxStart = left;
            }
        }

        return s.substring(maxStart, maxStart + maxLength);
    }
}

