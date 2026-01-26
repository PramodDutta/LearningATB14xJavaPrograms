package ex_50_Coding_Questions.CQ_02_Array_Problems;

import java.util.Arrays;

/**
 * Q19: Sort Colors (Dutch National Flag)
 * ======================================
 * DIFFICULTY: Medium
 * ASKED AT: Amazon, Microsoft, Facebook
 *
 * Problem: Sort array with 0s, 1s, and 2s in-place.
 * Input: [2, 0, 2, 1, 1, 0]
 * Output: [0, 0, 1, 1, 2, 2]
 */
public class Q19_SortColors {

    public static void main(String[] args) {
        int[] arr = {2, 0, 2, 1, 1, 0};

        System.out.println("Original: " + Arrays.toString(arr));
        System.out.println("\n--- SOLUTIONS ---");

        System.out.println("Method 1 (Counting): " + Arrays.toString(sortColorsCounting(arr.clone())));
        System.out.println("Method 2 (Dutch Flag): " + Arrays.toString(sortColorsDutchFlag(arr.clone())));
    }

    // ============================================
    // METHOD 1: Counting Sort
    // Time: O(n), Space: O(1) - Two passes
    // ============================================
    public static int[] sortColorsCounting(int[] nums) {
        int count0 = 0, count1 = 0, count2 = 0;

        // Count
        for (int num : nums) {
            if (num == 0) count0++;
            else if (num == 1) count1++;
            else count2++;
        }

        // Fill
        int i = 0;
        while (count0-- > 0) nums[i++] = 0;
        while (count1-- > 0) nums[i++] = 1;
        while (count2-- > 0) nums[i++] = 2;

        return nums;
    }

    // ============================================
    // METHOD 2: Dutch National Flag (OPTIMAL)
    // Time: O(n), Space: O(1) - One pass
    // ============================================
    public static int[] sortColorsDutchFlag(int[] nums) {
        int low = 0, mid = 0, high = nums.length - 1;

        while (mid <= high) {
            if (nums[mid] == 0) {
                swap(nums, low, mid);
                low++;
                mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                swap(nums, mid, high);
                high--;
            }
        }

        return nums;
    }

    private static void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}

