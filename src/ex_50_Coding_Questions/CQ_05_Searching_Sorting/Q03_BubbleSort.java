package ex_50_Coding_Questions.CQ_05_Searching_Sorting;

import java.util.Arrays;

/**
 * Q03: Bubble Sort
 * ================
 * DIFFICULTY: Easy
 * ASKED AT: TCS, Infosys, Wipro
 *
 * Problem: Sort array by repeatedly swapping adjacent elements.
 * Time: O(n²), Space: O(1)
 * Stable: Yes
 */
public class Q03_BubbleSort {

    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};

        System.out.println("Original: " + Arrays.toString(arr));
        bubbleSort(arr);
        System.out.println("Sorted: " + Arrays.toString(arr));

        System.out.println("\nOptimized Bubble Sort:");
        int[] arr2 = {64, 34, 25, 12, 22, 11, 90};
        bubbleSortOptimized(arr2);
        System.out.println("Sorted: " + Arrays.toString(arr2));
    }

    // Basic Bubble Sort
    public static void bubbleSort(int[] arr) {
        int n = arr.length;

        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }

    // Optimized Bubble Sort (stops if already sorted)
    public static void bubbleSortOptimized(int[] arr) {
        int n = arr.length;

        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;

            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }

            // If no swapping occurred, array is sorted
            if (!swapped) break;
        }
    }
}

