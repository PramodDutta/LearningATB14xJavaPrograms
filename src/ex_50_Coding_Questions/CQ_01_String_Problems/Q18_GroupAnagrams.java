package ex_50_Coding_Questions.CQ_01_String_Problems;

import java.util.*;

/**
 * Q18: Group Anagrams
 * ===================
 * DIFFICULTY: Medium
 * ASKED AT: Amazon, Google, Facebook
 *
 * Problem: Group strings that are anagrams of each other.
 * Input: ["eat","tea","tan","ate","nat","bat"]
 * Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
 */
public class Q18_GroupAnagrams {

    public static void main(String[] args) {
        String[] input = {"eat", "tea", "tan", "ate", "nat", "bat"};

        System.out.println("Input: " + Arrays.toString(input));
        System.out.println("\nMethod 1 (Sorting): " + groupAnagramsSorting(input));
        System.out.println("Method 2 (Counting): " + groupAnagramsCounting(input));
    }

    // ============================================
    // METHOD 1: Using Sorting as Key
    // Time: O(n * k log k), Space: O(n * k)
    // ============================================
    public static List<List<String>> groupAnagramsSorting(String[] strs) {
        Map<String, List<String>> groups = new HashMap<>();

        for (String str : strs) {
            char[] chars = str.toCharArray();
            Arrays.sort(chars);
            String key = new String(chars);

            groups.computeIfAbsent(key, k -> new ArrayList<>()).add(str);
        }

        return new ArrayList<>(groups.values());
    }

    // ============================================
    // METHOD 2: Using Character Count as Key
    // Time: O(n * k), Space: O(n * k)
    // ============================================
    public static List<List<String>> groupAnagramsCounting(String[] strs) {
        Map<String, List<String>> groups = new HashMap<>();

        for (String str : strs) {
            int[] count = new int[26];
            for (char ch : str.toCharArray()) {
                count[ch - 'a']++;
            }

            // Create key from count array
            StringBuilder keyBuilder = new StringBuilder();
            for (int c : count) {
                keyBuilder.append('#').append(c);
            }
            String key = keyBuilder.toString();

            groups.computeIfAbsent(key, k -> new ArrayList<>()).add(str);
        }

        return new ArrayList<>(groups.values());
    }
}

