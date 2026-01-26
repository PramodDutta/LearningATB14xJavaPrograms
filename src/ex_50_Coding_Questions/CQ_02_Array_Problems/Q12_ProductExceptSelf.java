package ex_50_Coding_Questions.CQ_02_Array_Problems;

import java.util.Arrays;

/**
 * Q12: Product of Array Except Self
 * =================================
 * DIFFICULTY: Medium
 * ASKED AT: Amazon, Google, Facebook, Microsoft
 *
 * Problem: Return array where each element is product of all others.
 * Input: [1, 2, 3, 4]
 * Output: [24, 12, 8, 6]
 * Note: Cannot use division
 */
public class Q12_ProductExceptSelf {

    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4};

        System.out.println("Array: " + Arrays.toString(arr));
        System.out.println("\n--- SOLUTIONS ---");

        System.out.println("Method 1 (Two Arrays): " + Arrays.toString(productExceptSelfTwoArrays(arr)));
        System.out.println("Method 2 (Optimized): " + Arrays.toString(productExceptSelfOptimized(arr)));
    }

    // ============================================
    // METHOD 1: Using Left and Right Arrays
    // Time: O(n), Space: O(n)
    // ============================================
    public static int[] productExceptSelfTwoArrays(int[] nums) {
        int n = nums.length;
        int[] left = new int[n];
        int[] right = new int[n];
        int[] result = new int[n];

        // Left products
        left[0] = 1;
        for (int i = 1; i < n; i++) {
            left[i] = left[i - 1] * nums[i - 1];
        }

        // Right products
        right[n - 1] = 1;
        for (int i = n - 2; i >= 0; i--) {
            right[i] = right[i + 1] * nums[i + 1];
        }

        // Combine
        for (int i = 0; i < n; i++) {
            result[i] = left[i] * right[i];
        }

        return result;
    }

    // ============================================
    // METHOD 2: Space Optimized
    // Time: O(n), Space: O(1) - excluding output
    // ============================================
    public static int[] productExceptSelfOptimized(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];

        // First pass: left products
        result[0] = 1;
        for (int i = 1; i < n; i++) {
            result[i] = result[i - 1] * nums[i - 1];
        }

        // Second pass: multiply by right products
        int rightProduct = 1;
        for (int i = n - 1; i >= 0; i--) {
            result[i] *= rightProduct;
            rightProduct *= nums[i];
        }

        return result;
    }
}

