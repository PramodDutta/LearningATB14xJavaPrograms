package ex_50_Coding_Questions.CQ_01_String_Problems;

import java.util.ArrayList;
import java.util.List;

/**
 * Q09: Print All Permutations of a String
 * =======================================
 * DIFFICULTY: Medium-Hard
 * ASKED AT: Amazon, Google, Microsoft, Facebook
 *
 * Problem: Generate all possible arrangements of characters.
 * Input: "ABC"
 * Output: ABC, ACB, BAC, BCA, CAB, CBA
 */
public class Q09_StringPermutations {

    public static void main(String[] args) {
        String input = "ABC";

        System.out.println("Input: \"" + input + "\"");
        System.out.println("Total permutations: " + factorial(input.length()));
        System.out.println("\n--- SOLUTIONS ---");

        System.out.println("\nMethod 1 (Recursion with Swap):");
        permute1(input.toCharArray(), 0);

        System.out.println("\nMethod 2 (Recursion with String):");
        permute2("", input);

        System.out.println("\nMethod 3 (Return List):");
        List<String> result = getPermutations(input);
        System.out.println(result);
    }

    // ============================================
    // METHOD 1: Recursion with Swap
    // Time: O(n!), Space: O(n)
    // ============================================
    public static void permute1(char[] arr, int index) {
        if (index == arr.length - 1) {
            System.out.println(new String(arr));
            return;
        }

        for (int i = index; i < arr.length; i++) {
            swap(arr, index, i);
            permute1(arr, index + 1);
            swap(arr, index, i);  // Backtrack
        }
    }

    private static void swap(char[] arr, int i, int j) {
        char temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    // ============================================
    // METHOD 2: Recursion with String Building
    // Time: O(n!), Space: O(n)
    // ============================================
    public static void permute2(String prefix, String remaining) {
        if (remaining.isEmpty()) {
            System.out.println(prefix);
            return;
        }

        for (int i = 0; i < remaining.length(); i++) {
            String newPrefix = prefix + remaining.charAt(i);
            String newRemaining = remaining.substring(0, i) + remaining.substring(i + 1);
            permute2(newPrefix, newRemaining);
        }
    }

    // ============================================
    // METHOD 3: Return List of Permutations
    // ============================================
    public static List<String> getPermutations(String str) {
        List<String> result = new ArrayList<>();
        generatePermutations("", str, result);
        return result;
    }

    private static void generatePermutations(String prefix, String remaining, List<String> result) {
        if (remaining.isEmpty()) {
            result.add(prefix);
            return;
        }

        for (int i = 0; i < remaining.length(); i++) {
            generatePermutations(
                    prefix + remaining.charAt(i),
                    remaining.substring(0, i) + remaining.substring(i + 1),
                    result
            );
        }
    }

    private static int factorial(int n) {
        return n <= 1 ? 1 : n * factorial(n - 1);
    }
}

