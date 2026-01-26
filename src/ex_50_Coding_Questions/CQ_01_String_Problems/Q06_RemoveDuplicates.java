package ex_50_Coding_Questions.CQ_01_String_Problems;

import java.util.LinkedHashSet;
import java.util.Set;

/**
 * Q06: Remove Duplicate Characters from String
 * ============================================
 * DIFFICULTY: Easy
 * ASKED AT: Amazon, Microsoft, TCS, Infosys
 *
 * Problem: Remove duplicate characters keeping first occurrence.
 * Input: "programming" -> "progamin"
 */
public class Q06_RemoveDuplicates {

    public static void main(String[] args) {
        String[] testCases = {"programming", "hello", "aabbccdd", "abcdef"};

        for (String test : testCases) {
            System.out.println("Input: \"" + test + "\"");
            System.out.println("  Method 1 (LinkedHashSet): " + removeDuplicatesLinkedHashSet(test));
            System.out.println("  Method 2 (StringBuilder): " + removeDuplicatesStringBuilder(test));
            System.out.println("  Method 3 (Stream): " + removeDuplicatesStream(test));
            System.out.println();
        }
    }

    // ============================================
    // METHOD 1: Using LinkedHashSet (Maintains Order)
    // Time: O(n), Space: O(n)
    // ============================================
    public static String removeDuplicatesLinkedHashSet(String str) {
        Set<Character> seen = new LinkedHashSet<>();

        for (char ch : str.toCharArray()) {
            seen.add(ch);
        }

        StringBuilder result = new StringBuilder();
        for (char ch : seen) {
            result.append(ch);
        }

        return result.toString();
    }

    // ============================================
    // METHOD 2: Using StringBuilder with indexOf
    // Time: O(n²), Space: O(n)
    // ============================================
    public static String removeDuplicatesStringBuilder(String str) {
        StringBuilder result = new StringBuilder();

        for (int i = 0; i < str.length(); i++) {
            char ch = str.charAt(i);
            if (result.indexOf(String.valueOf(ch)) == -1) {
                result.append(ch);
            }
        }

        return result.toString();
    }

    // ============================================
    // METHOD 3: Using Stream API
    // Time: O(n), Space: O(n)
    // ============================================
    public static String removeDuplicatesStream(String str) {
        return str.chars()
                .distinct()
                .collect(StringBuilder::new,
                        StringBuilder::appendCodePoint,
                        StringBuilder::append)
                .toString();
    }
}

