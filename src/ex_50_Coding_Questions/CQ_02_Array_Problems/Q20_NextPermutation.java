package ex_50_Coding_Questions.CQ_02_Array_Problems;

import java.util.Arrays;

/**
 * Q20: Next Permutation
 * =====================
 * DIFFICULTY: Medium
 * ASKED AT: Amazon, Google, Facebook
 *
 * Problem: Find next lexicographically greater permutation.
 * Input: [1, 2, 3] -> [1, 3, 2]
 * Input: [3, 2, 1] -> [1, 2, 3]
 */
public class Q20_NextPermutation {

    public static void main(String[] args) {
        int[][] testCases = {{1, 2, 3}, {3, 2, 1}, {1, 1, 5}, {1, 3, 2}};

        for (int[] arr : testCases) {
            System.out.print(Arrays.toString(arr) + " -> ");
            nextPermutation(arr);
            System.out.println(Arrays.toString(arr));
        }
    }

    // ============================================
    // Algorithm:
    // 1. Find first decreasing element from right
    // 2. Find element just larger than it
    // 3. Swap them
    // 4. Reverse the suffix
    // Time: O(n), Space: O(1)
    // ============================================
    public static void nextPermutation(int[] nums) {
        int n = nums.length;
        int i = n - 2;

        // Step 1: Find first decreasing element
        while (i >= 0 && nums[i] >= nums[i + 1]) {
            i--;
        }

        if (i >= 0) {
            // Step 2: Find element just larger
            int j = n - 1;
            while (nums[j] <= nums[i]) {
                j--;
            }

            // Step 3: Swap
            swap(nums, i, j);
        }

        // Step 4: Reverse suffix
        reverse(nums, i + 1, n - 1);
    }

    private static void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

    private static void reverse(int[] nums, int start, int end) {
        while (start < end) {
            swap(nums, start++, end--);
        }
    }
}

