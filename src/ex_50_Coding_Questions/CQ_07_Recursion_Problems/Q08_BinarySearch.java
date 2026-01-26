package ex_50_Coding_Questions.CQ_07_Recursion_Problems;

import java.util.Arrays;

/**
 * Q08: Binary Search using Recursion
 * ==================================
 * DIFFICULTY: Easy
 * ASKED AT: Amazon, Google, Microsoft
 *
 * Problem: Search in sorted array using recursive binary search.
 * Input: [1, 2, 3, 4, 5, 6, 7], target=5
 * Output: 4 (index)
 */
public class Q08_BinarySearch {

    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5, 6, 7};
        int target = 5;

        System.out.println("Array: " + Arrays.toString(arr));
        System.out.println("Target: " + target);
        System.out.println("Found at index: " + binarySearch(arr, target, 0, arr.length - 1));
    }

    // ============================================
    // Recursive Binary Search
    // Time: O(log n), Space: O(log n)
    // ============================================
    public static int binarySearch(int[] arr, int target, int left, int right) {
        // Base case: not found
        if (left > right) return -1;

        int mid = left + (right - left) / 2;

        // Found
        if (arr[mid] == target) {
            return mid;
        }

        // Search left or right half
        if (arr[mid] > target) {
            return binarySearch(arr, target, left, mid - 1);
        } else {
            return binarySearch(arr, target, mid + 1, right);
        }
    }
}

