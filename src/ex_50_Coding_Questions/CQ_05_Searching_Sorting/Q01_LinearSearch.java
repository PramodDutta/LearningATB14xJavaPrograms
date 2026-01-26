package ex_50_Coding_Questions.CQ_05_Searching_Sorting;

import java.util.Arrays;

/**
 * Q01: Linear Search
 * ==================
 * DIFFICULTY: Easy
 * ASKED AT: TCS, Infosys
 *
 * Problem: Find element in unsorted array.
 * Time: O(n), Space: O(1)
 */
public class Q01_LinearSearch {

    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        int target = 22;

        System.out.println("Array: " + Arrays.toString(arr));
        System.out.println("Target: " + target);

        int index = linearSearch(arr, target);
        System.out.println("Found at index: " + index);

        System.out.println("\nAll occurrences of 22:");
        findAllOccurrences(new int[]{1, 22, 3, 22, 5, 22}, 22);
    }

    // Basic Linear Search
    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;
            }
        }
        return -1;
    }

    // Find All Occurrences
    public static void findAllOccurrences(int[] arr, int target) {
        System.out.print("Indices: ");
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                System.out.print(i + " ");
            }
        }
        System.out.println();
    }
}

