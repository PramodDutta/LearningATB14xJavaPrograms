package ex_50_Coding_Questions.CQ_05_Searching_Sorting;

import java.util.Arrays;

/**
 * Q08: Search in Rotated Sorted Array
 * ===================================
 * DIFFICULTY: Medium
 * ASKED AT: Amazon, Google, Facebook, Microsoft
 *
 * Problem: Search in array that was sorted then rotated.
 * Input: [4,5,6,7,0,1,2], target=0
 * Output: 4
 * Time: O(log n)
 */
public class Q08_SearchRotatedArray {

    public static void main(String[] args) {
        int[] arr = {4, 5, 6, 7, 0, 1, 2};
        int target = 0;

        System.out.println("Array: " + Arrays.toString(arr));
        System.out.println("Target: " + target);
        System.out.println("Found at index: " + search(arr, target));
    }

    public static int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (nums[mid] == target) {
                return mid;
            }

            // Left half is sorted
            if (nums[left] <= nums[mid]) {
                if (target >= nums[left] && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            }
            // Right half is sorted
            else {
                if (target > nums[mid] && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }

        return -1;
    }
}

