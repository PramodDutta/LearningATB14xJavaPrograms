package ex_50_Coding_Questions.CQ_02_Array_Problems;

import java.util.Arrays;

/**
 * Q10: Merge Two Sorted Arrays
 * ============================
 * DIFFICULTY: Easy
 * ASKED AT: Amazon, Microsoft, Facebook
 *
 * Problem: Merge two sorted arrays into one sorted array.
 * Input: [1, 3, 5], [2, 4, 6]
 * Output: [1, 2, 3, 4, 5, 6]
 */
public class Q10_MergeSortedArrays {

    public static void main(String[] args) {
        int[] arr1 = {1, 3, 5, 7};
        int[] arr2 = {2, 4, 6, 8};

        System.out.println("Array 1: " + Arrays.toString(arr1));
        System.out.println("Array 2: " + Arrays.toString(arr2));
        System.out.println("\n--- SOLUTIONS ---");

        System.out.println("Method 1 (Two Pointers): " + Arrays.toString(mergeTwoPointers(arr1, arr2)));
        System.out.println("Method 2 (In-place): ");
        mergeInPlace(new int[]{1, 2, 3, 0, 0, 0}, 3, new int[]{2, 5, 6}, 3);
    }

    // ============================================
    // METHOD 1: Two Pointers (New Array)
    // Time: O(m + n), Space: O(m + n)
    // ============================================
    public static int[] mergeTwoPointers(int[] nums1, int[] nums2) {
        int[] result = new int[nums1.length + nums2.length];
        int i = 0, j = 0, k = 0;

        while (i < nums1.length && j < nums2.length) {
            if (nums1[i] <= nums2[j]) {
                result[k++] = nums1[i++];
            } else {
                result[k++] = nums2[j++];
            }
        }

        while (i < nums1.length) {
            result[k++] = nums1[i++];
        }

        while (j < nums2.length) {
            result[k++] = nums2[j++];
        }

        return result;
    }

    // ============================================
    // METHOD 2: In-place (LeetCode style)
    // Time: O(m + n), Space: O(1)
    // nums1 has extra space at end
    // ============================================
    public static void mergeInPlace(int[] nums1, int m, int[] nums2, int n) {
        int i = m - 1;
        int j = n - 1;
        int k = m + n - 1;

        while (j >= 0) {
            if (i >= 0 && nums1[i] > nums2[j]) {
                nums1[k--] = nums1[i--];
            } else {
                nums1[k--] = nums2[j--];
            }
        }

        System.out.println("  Result: " + Arrays.toString(nums1));
    }
}

