package ex_50_Coding_Questions.CQ_05_Searching_Sorting;

import java.util.Arrays;

/**
 * Q02: Binary Search
 * ==================
 * DIFFICULTY: Easy
 * ASKED AT: Amazon, Google, Microsoft (VERY COMMON)
 *
 * Problem: Find element in sorted array.
 * Time: O(log n), Space: O(1) iterative, O(log n) recursive
 */
public class Q02_BinarySearch {

    public static void main(String[] args) {
        int[] arr = {11, 12, 22, 25, 34, 64, 90};
        int target = 25;

        System.out.println("Array: " + Arrays.toString(arr));
        System.out.println("Target: " + target);

        System.out.println("\nIterative: " + binarySearchIterative(arr, target));
        System.out.println("Recursive: " + binarySearchRecursive(arr, target, 0, arr.length - 1));
    }

    // Iterative Binary Search
    public static int binarySearchIterative(int[] arr, int target) {
        int left = 0, right = arr.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;  // Avoid overflow

            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return -1;
    }

    // Recursive Binary Search
    public static int binarySearchRecursive(int[] arr, int target, int left, int right) {
        if (left > right) return -1;

        int mid = left + (right - left) / 2;

        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            return binarySearchRecursive(arr, target, mid + 1, right);
        } else {
            return binarySearchRecursive(arr, target, left, mid - 1);
        }
    }
}

