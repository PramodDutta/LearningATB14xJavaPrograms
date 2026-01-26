package ex_50_Coding_Questions.CQ_02_Array_Problems;

import java.util.*;

/**
 * Q13: Contains Duplicate
 * =======================
 * DIFFICULTY: Easy
 * ASKED AT: Amazon, Google, Apple
 *
 * Problem: Check if array contains any duplicates.
 * Input: [1, 2, 3, 1] -> true
 * Input: [1, 2, 3, 4] -> false
 */
public class Q13_ContainsDuplicate {

    public static void main(String[] args) {
        int[][] testCases = {
                {1, 2, 3, 1},
                {1, 2, 3, 4},
                {1, 1, 1, 3, 3, 4, 3, 2, 4, 2}
        };

        for (int[] arr : testCases) {
            System.out.println("Array: " + Arrays.toString(arr));
            System.out.println("  Method 1 (HashSet): " + containsDuplicateSet(arr));
            System.out.println("  Method 2 (Sorting): " + containsDuplicateSorting(arr.clone()));
            System.out.println();
        }
    }

    // ============================================
    // METHOD 1: Using HashSet (OPTIMAL)
    // Time: O(n), Space: O(n)
    // ============================================
    public static boolean containsDuplicateSet(int[] nums) {
        Set<Integer> seen = new HashSet<>();

        for (int num : nums) {
            if (!seen.add(num)) {  // add returns false if already exists
                return true;
            }
        }

        return false;
    }

    // ============================================
    // METHOD 2: Using Sorting
    // Time: O(n log n), Space: O(1)
    // ============================================
    public static boolean containsDuplicateSorting(int[] nums) {
        Arrays.sort(nums);

        for (int i = 1; i < nums.length; i++) {
            if (nums[i] == nums[i - 1]) {
                return true;
            }
        }

        return false;
    }
}

