package ex_50_Coding_Questions.CQ_02_Array_Problems;

import java.util.Arrays;

/**
 * Q11: Maximum Subarray Sum (Kadane's Algorithm)
 * ==============================================
 * DIFFICULTY: Medium
 * ASKED AT: Amazon, Google, Microsoft, Facebook (VERY COMMON)
 *
 * Problem: Find contiguous subarray with largest sum.
 * Input: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
 * Output: 6 (subarray [4, -1, 2, 1])
 */
public class Q11_MaxSubarraySum {

    public static void main(String[] args) {
        int[] arr = {-2, 1, -3, 4, -1, 2, 1, -5, 4};

        System.out.println("Array: " + Arrays.toString(arr));
        System.out.println("\n--- SOLUTIONS ---");

        System.out.println("Method 1 (Brute Force): " + maxSubarrayBruteForce(arr));
        System.out.println("Method 2 (Kadane's): " + maxSubarrayKadane(arr));
        System.out.println("Method 3 (With Indices): ");
        maxSubarrayWithIndices(arr);
    }

    // ============================================
    // METHOD 1: Brute Force
    // Time: O(n²), Space: O(1)
    // ============================================
    public static int maxSubarrayBruteForce(int[] nums) {
        int maxSum = Integer.MIN_VALUE;

        for (int i = 0; i < nums.length; i++) {
            int currentSum = 0;
            for (int j = i; j < nums.length; j++) {
                currentSum += nums[j];
                maxSum = Math.max(maxSum, currentSum);
            }
        }

        return maxSum;
    }

    // ============================================
    // METHOD 2: Kadane's Algorithm (OPTIMAL)
    // Time: O(n), Space: O(1)
    // ============================================
    public static int maxSubarrayKadane(int[] nums) {
        int maxSum = nums[0];
        int currentSum = nums[0];

        for (int i = 1; i < nums.length; i++) {
            // Either extend current subarray or start new
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSum = Math.max(maxSum, currentSum);
        }

        return maxSum;
    }

    // ============================================
    // METHOD 3: Kadane's with Subarray Indices
    // ============================================
    public static void maxSubarrayWithIndices(int[] nums) {
        int maxSum = nums[0];
        int currentSum = nums[0];
        int start = 0, end = 0, tempStart = 0;

        for (int i = 1; i < nums.length; i++) {
            if (nums[i] > currentSum + nums[i]) {
                currentSum = nums[i];
                tempStart = i;
            } else {
                currentSum += nums[i];
            }

            if (currentSum > maxSum) {
                maxSum = currentSum;
                start = tempStart;
                end = i;
            }
        }

        System.out.println("  Max Sum: " + maxSum);
        System.out.println("  Subarray: " + Arrays.toString(Arrays.copyOfRange(nums, start, end + 1)));
        System.out.println("  Indices: [" + start + ", " + end + "]");
    }
}

