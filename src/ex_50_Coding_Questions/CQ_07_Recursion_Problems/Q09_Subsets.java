package ex_50_Coding_Questions.CQ_07_Recursion_Problems;

import java.util.*;

/**
 * Q09: Generate All Subsets
 * =========================
 * DIFFICULTY: Medium
 * ASKED AT: Amazon, Google, Facebook
 *
 * Problem: Generate all subsets of an array.
 * Input: [1, 2, 3]
 * Output: [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]
 */
public class Q09_Subsets {

    public static void main(String[] args) {
        int[] nums = {1, 2, 3};

        System.out.println("Array: " + Arrays.toString(nums));
        System.out.println("Subsets: " + subsets(nums));
    }

    // ============================================
    // Backtracking Approach
    // Time: O(2^n), Space: O(n)
    // ============================================
    public static List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(nums, 0, new ArrayList<>(), result);
        return result;
    }

    private static void backtrack(int[] nums, int start, List<Integer> current, List<List<Integer>> result) {
        // Add current subset
        result.add(new ArrayList<>(current));

        // Try adding each remaining element
        for (int i = start; i < nums.length; i++) {
            current.add(nums[i]);
            backtrack(nums, i + 1, current, result);
            current.remove(current.size() - 1);  // Backtrack
        }
    }
}

