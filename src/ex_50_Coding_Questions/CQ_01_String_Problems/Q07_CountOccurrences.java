package ex_50_Coding_Questions.CQ_01_String_Problems;

import java.util.HashMap;
import java.util.Map;

/**
 * Q07: Count Character Occurrences
 * ================================
 * DIFFICULTY: Easy
 * ASKED AT: TCS, Wipro, Cognizant, Accenture
 *
 * Problem: Count occurrences of each character in a string.
 * Input: "hello"
 * Output: h=1, e=1, l=2, o=1
 */
public class Q07_CountOccurrences {

    public static void main(String[] args) {
        String input = "programming";

        System.out.println("Input: \"" + input + "\"");
        System.out.println("\n--- SOLUTIONS ---");

        countWithHashMap(input);
        countWithArray(input);
        countSpecificChar(input, 'g');
    }

    // ============================================
    // METHOD 1: Using HashMap
    // Time: O(n), Space: O(n)
    // ============================================
    public static void countWithHashMap(String str) {
        Map<Character, Integer> count = new HashMap<>();

        for (char ch : str.toCharArray()) {
            count.put(ch, count.getOrDefault(ch, 0) + 1);
        }

        System.out.println("Method 1 (HashMap): " + count);
    }

    // ============================================
    // METHOD 2: Using Array (for lowercase letters)
    // Time: O(n), Space: O(1)
    // ============================================
    public static void countWithArray(String str) {
        int[] count = new int[26];

        for (char ch : str.toLowerCase().toCharArray()) {
            if (ch >= 'a' && ch <= 'z') {
                count[ch - 'a']++;
            }
        }

        System.out.print("Method 2 (Array): ");
        for (int i = 0; i < 26; i++) {
            if (count[i] > 0) {
                System.out.print((char) ('a' + i) + "=" + count[i] + " ");
            }
        }
        System.out.println();
    }

    // ============================================
    // Count Specific Character
    // ============================================
    public static void countSpecificChar(String str, char target) {
        // Method 1: Loop
        int count1 = 0;
        for (char ch : str.toCharArray()) {
            if (ch == target) count1++;
        }

        // Method 2: Replace and length difference
        int count2 = str.length() - str.replace(String.valueOf(target), "").length();

        // Method 3: Stream
        long count3 = str.chars().filter(ch -> ch == target).count();

        System.out.println("\nCount of '" + target + "': " + count1 + " (all methods agree: " +
                (count1 == count2 && count2 == count3) + ")");
    }
}

