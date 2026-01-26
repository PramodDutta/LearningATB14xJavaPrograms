package ex_50_Coding_Questions.CQ_02_Array_Problems;

import java.util.*;

/**
 * Q22: Subarray Sum Equals K
 * ==========================
 * DIFFICULTY: Medium
 * ASKED AT: Google, Facebook, Amazon
 *
 * Problem: Count subarrays with sum equal to k.
 * Input: nums=[1,1,1], k=2
 * Output: 2 ([1,1] at index 0-1 and 1-2)
 */
public class Q22_SubarraySumEqualsK {

    public static void main(String[] args) {
        int[] nums = {1, 1, 1};
        int k = 2;

        System.out.println("Array: " + Arrays.toString(nums));
        System.out.println("K: " + k);
        System.out.println("\n--- SOLUTIONS ---");

        System.out.println("Method 1 (Brute Force): " + subarraySumBruteForce(nums, k));
        System.out.println("Method 2 (Prefix Sum): " + subarraySumPrefixSum(nums, k));
    }

    // ============================================
    // METHOD 1: Brute Force
    // Time: O(n²), Space: O(1)
    // ============================================
    public static int subarraySumBruteForce(int[] nums, int k) {
        int count = 0;

        for (int i = 0; i < nums.length; i++) {
            int sum = 0;
            for (int j = i; j < nums.length; j++) {
                sum += nums[j];
                if (sum == k) count++;
            }
        }

        return count;
    }

    // ============================================
    // METHOD 2: Prefix Sum with HashMap (OPTIMAL)
    // Time: O(n), Space: O(n)
    // ============================================
    public static int subarraySumPrefixSum(int[] nums, int k) {
        Map<Integer, Integer> prefixCount = new HashMap<>();
        prefixCount.put(0, 1);  // Empty subarray

        int count = 0;
        int prefixSum = 0;

        for (int num : nums) {
            prefixSum += num;

            // If (prefixSum - k) exists, we found subarrays
            if (prefixCount.containsKey(prefixSum - k)) {
                count += prefixCount.get(prefixSum - k);
            }

            prefixCount.put(prefixSum, prefixCount.getOrDefault(prefixSum, 0) + 1);
        }

        return count;
    }
}

