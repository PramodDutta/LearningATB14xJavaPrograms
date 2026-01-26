package ex_50_Coding_Questions.CQ_02_Array_Problems;

import java.util.*;

/**
 * Q05: Two Sum
 * ============
 * DIFFICULTY: Easy
 * ASKED AT: Amazon, Google, Facebook, Microsoft (MOST COMMON)
 *
 * Problem: Find two numbers that add up to target.
 * Input: nums=[2,7,11,15], target=9
 * Output: [0, 1] (because nums[0] + nums[1] = 9)
 */
public class Q05_TwoSum {

    public static void main(String[] args) {
        int[] nums = {2, 7, 11, 15};
        int target = 9;

        System.out.println("Array: " + Arrays.toString(nums));
        System.out.println("Target: " + target);
        System.out.println("\n--- SOLUTIONS ---");

        System.out.println("Method 1 (Brute Force): " + Arrays.toString(twoSumBruteForce(nums, target)));
        System.out.println("Method 2 (HashMap): " + Arrays.toString(twoSumHashMap(nums, target)));
        System.out.println("Method 3 (Two Pointers - sorted): " + Arrays.toString(twoSumTwoPointers(nums.clone(), target)));
    }

    // ============================================
    // METHOD 1: Brute Force
    // Time: O(n²), Space: O(1)
    // ============================================
    public static int[] twoSumBruteForce(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] + nums[j] == target) {
                    return new int[]{i, j};
                }
            }
        }
        return new int[]{};
    }

    // ============================================
    // METHOD 2: Using HashMap (OPTIMAL)
    // Time: O(n), Space: O(n)
    // ============================================
    public static int[] twoSumHashMap(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];

            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }

            map.put(nums[i], i);
        }

        return new int[]{};
    }

    // ============================================
    // METHOD 3: Two Pointers (for sorted array)
    // Time: O(n log n), Space: O(1)
    // Note: Returns values, not indices
    // ============================================
    public static int[] twoSumTwoPointers(int[] nums, int target) {
        Arrays.sort(nums);

        int left = 0, right = nums.length - 1;

        while (left < right) {
            int sum = nums[left] + nums[right];

            if (sum == target) {
                return new int[]{nums[left], nums[right]};
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }

        return new int[]{};
    }
}

