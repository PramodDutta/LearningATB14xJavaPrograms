package ex_50_Coding_Questions.CQ_01_String_Problems;

/**
 * Q21: Implement strStr() / indexOf()
 * ===================================
 * DIFFICULTY: Easy
 * ASKED AT: Amazon, Microsoft, Facebook
 *
 * Problem: Find first occurrence of needle in haystack.
 * Input: haystack="hello", needle="ll" -> 2
 * Input: haystack="aaaaa", needle="bba" -> -1
 */
public class Q21_ImplementStrStr {

    public static void main(String[] args) {
        System.out.println("strStr(\"hello\", \"ll\"): " + strStr("hello", "ll"));
        System.out.println("strStr(\"aaaaa\", \"bba\"): " + strStr("aaaaa", "bba"));
        System.out.println("strStr(\"sadbutsad\", \"sad\"): " + strStr("sadbutsad", "sad"));
    }

    // ============================================
    // Sliding Window Approach
    // Time: O(n * m), Space: O(1)
    // ============================================
    public static int strStr(String haystack, String needle) {
        if (needle.isEmpty()) return 0;
        if (needle.length() > haystack.length()) return -1;

        for (int i = 0; i <= haystack.length() - needle.length(); i++) {
            if (haystack.substring(i, i + needle.length()).equals(needle)) {
                return i;
            }
        }

        return -1;
    }
}

