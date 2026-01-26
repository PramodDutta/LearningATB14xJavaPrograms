package ex_50_Coding_Questions.CQ_02_Array_Problems;

import java.util.Arrays;

/**
 * Q21: Find Peak Element
 * ======================
 * DIFFICULTY: Medium
 * ASKED AT: Google, Facebook, Microsoft
 *
 * Problem: Find element greater than its neighbors.
 * Input: [1, 2, 3, 1]
 * Output: 2 (index of peak element 3)
 */
public class Q21_FindPeakElement {

    public static void main(String[] args) {
        int[] arr = {1, 2, 1, 3, 5, 6, 4};

        System.out.println("Array: " + Arrays.toString(arr));
        System.out.println("\n--- SOLUTIONS ---");

        System.out.println("Method 1 (Linear): " + findPeakLinear(arr));
        System.out.println("Method 2 (Binary Search): " + findPeakBinarySearch(arr));
    }

    // ============================================
    // METHOD 1: Linear Search
    // Time: O(n), Space: O(1)
    // ============================================
    public static int findPeakLinear(int[] nums) {
        for (int i = 0; i < nums.length - 1; i++) {
            if (nums[i] > nums[i + 1]) {
                return i;
            }
        }
        return nums.length - 1;
    }

    // ============================================
    // METHOD 2: Binary Search (OPTIMAL)
    // Time: O(log n), Space: O(1)
    // ============================================
    public static int findPeakBinarySearch(int[] nums) {
        int left = 0, right = nums.length - 1;

        while (left < right) {
            int mid = left + (right - left) / 2;

            if (nums[mid] > nums[mid + 1]) {
                // Peak is on left side (including mid)
                right = mid;
            } else {
                // Peak is on right side
                left = mid + 1;
            }
        }

        return left;
    }
}

