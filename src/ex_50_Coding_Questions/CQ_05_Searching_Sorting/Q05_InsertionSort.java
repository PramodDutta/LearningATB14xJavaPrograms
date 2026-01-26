package ex_50_Coding_Questions.CQ_05_Searching_Sorting;

import java.util.Arrays;

/**
 * Q05: Insertion Sort
 * ===================
 * DIFFICULTY: Easy
 * ASKED AT: TCS, Infosys
 *
 * Problem: Sort by inserting each element into its correct position.
 * Time: O(n²), Space: O(1)
 * Stable: Yes
 * Best for: Small arrays, nearly sorted arrays
 */
public class Q05_InsertionSort {

    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};

        System.out.println("Original: " + Arrays.toString(arr));
        insertionSort(arr);
        System.out.println("Sorted: " + Arrays.toString(arr));
    }

    public static void insertionSort(int[] arr) {
        int n = arr.length;

        for (int i = 1; i < n; i++) {
            int key = arr[i];
            int j = i - 1;

            // Move elements greater than key one position ahead
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }

            arr[j + 1] = key;
        }
    }
}

