package ex_50_Coding_Questions.CQ_07_Recursion_Problems;

import java.util.*;

/**
 * Q10: Generate All Permutations
 * ==============================
 * DIFFICULTY: Medium
 * ASKED AT: Amazon, Google, Facebook, Microsoft
 *
 * Problem: Generate all permutations of an array.
 * Input: [1, 2, 3]
 * Output: [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]
 */
public class Q10_Permutations {

    public static void main(String[] args) {
        int[] nums = {1, 2, 3};

        System.out.println("Array: " + Arrays.toString(nums));
        System.out.println("Permutations: " + permute(nums));
    }

    // ============================================
    // Backtracking Approach
    // Time: O(n!), Space: O(n)
    // ============================================
    public static List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        boolean[] used = new boolean[nums.length];
        backtrack(nums, new ArrayList<>(), used, result);
        return result;
    }

    private static void backtrack(int[] nums, List<Integer> current, boolean[] used, List<List<Integer>> result) {
        // Base case: permutation complete
        if (current.size() == nums.length) {
            result.add(new ArrayList<>(current));
            return;
        }

        // Try each unused element
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) continue;

            current.add(nums[i]);
            used[i] = true;

            backtrack(nums, current, used, result);

            // Backtrack
            current.remove(current.size() - 1);
            used[i] = false;
        }
    }
}

