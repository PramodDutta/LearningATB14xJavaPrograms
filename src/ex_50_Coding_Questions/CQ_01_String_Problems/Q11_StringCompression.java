package ex_50_Coding_Questions.CQ_01_String_Problems;

/**
 * Q11: String Compression (Run Length Encoding)
 * =============================================
 * DIFFICULTY: Medium
 * ASKED AT: Amazon, Microsoft, Apple
 *
 * Problem: Compress string using counts of repeated characters.
 * Input: "aabcccccaaa" -> "a2b1c5a3"
 * Input: "abcd" -> "abcd" (no compression if not shorter)
 */
public class Q11_StringCompression {

    public static void main(String[] args) {
        String[] testCases = {"aabcccccaaa", "abcd", "aabbcc", "aaaa"};

        for (String test : testCases) {
            System.out.println("Input: \"" + test + "\"");
            System.out.println("  Compressed: \"" + compress(test) + "\"");
            System.out.println("  Smart: \"" + compressSmart(test) + "\"");
            System.out.println();
        }
    }

    // ============================================
    // METHOD 1: Basic Compression
    // Time: O(n), Space: O(n)
    // ============================================
    public static String compress(String str) {
        if (str == null || str.isEmpty()) return str;

        StringBuilder compressed = new StringBuilder();
        int count = 1;

        for (int i = 1; i <= str.length(); i++) {
            if (i < str.length() && str.charAt(i) == str.charAt(i - 1)) {
                count++;
            } else {
                compressed.append(str.charAt(i - 1));
                compressed.append(count);
                count = 1;
            }
        }

        return compressed.toString();
    }

    // ============================================
    // METHOD 2: Smart Compression (return original if not shorter)
    // ============================================
    public static String compressSmart(String str) {
        if (str == null || str.length() <= 2) return str;

        StringBuilder compressed = new StringBuilder();
        int count = 1;

        for (int i = 1; i <= str.length(); i++) {
            if (i < str.length() && str.charAt(i) == str.charAt(i - 1)) {
                count++;
            } else {
                compressed.append(str.charAt(i - 1));
                if (count > 1) {
                    compressed.append(count);
                }
                count = 1;
            }
        }

        return compressed.length() < str.length() ? compressed.toString() : str;
    }
}

