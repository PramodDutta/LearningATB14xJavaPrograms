package ex_50_Coding_Questions.CQ_02_Array_Problems;

import java.util.Arrays;

/**
 * Q07: Rotate Array
 * =================
 * DIFFICULTY: Medium
 * ASKED AT: Amazon, Microsoft, Google
 *
 * Problem: Rotate array to the right by k steps.
 * Input: [1,2,3,4,5,6,7], k=3
 * Output: [5,6,7,1,2,3,4]
 */
public class Q07_RotateArray {

    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5, 6, 7};
        int k = 3;

        System.out.println("Original: " + Arrays.toString(arr));
        System.out.println("Rotate by: " + k);
        System.out.println("\n--- SOLUTIONS ---");

        System.out.println("Method 1 (Extra Array): " + Arrays.toString(rotateExtraArray(arr.clone(), k)));
        System.out.println("Method 2 (Reverse): " + Arrays.toString(rotateReverse(arr.clone(), k)));
    }

    // ============================================
    // METHOD 1: Using Extra Array
    // Time: O(n), Space: O(n)
    // ============================================
    public static int[] rotateExtraArray(int[] nums, int k) {
        int n = nums.length;
        k = k % n;  // Handle k > n

        int[] result = new int[n];

        for (int i = 0; i < n; i++) {
            result[(i + k) % n] = nums[i];
        }

        System.arraycopy(result, 0, nums, 0, n);
        return nums;
    }

    // ============================================
    // METHOD 2: Reverse Three Times (OPTIMAL)
    // Time: O(n), Space: O(1)
    // ============================================
    public static int[] rotateReverse(int[] nums, int k) {
        int n = nums.length;
        k = k % n;

        // Step 1: Reverse entire array
        reverse(nums, 0, n - 1);

        // Step 2: Reverse first k elements
        reverse(nums, 0, k - 1);

        // Step 3: Reverse remaining elements
        reverse(nums, k, n - 1);

        return nums;
    }

    private static void reverse(int[] nums, int start, int end) {
        while (start < end) {
            int temp = nums[start];
            nums[start] = nums[end];
            nums[end] = temp;
            start++;
            end--;
        }
    }
}

