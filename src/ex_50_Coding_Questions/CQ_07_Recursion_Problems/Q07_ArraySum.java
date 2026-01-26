package ex_50_Coding_Questions.CQ_07_Recursion_Problems;

import java.util.Arrays;

/**
 * Q07: Sum of Array using Recursion
 * =================================
 * DIFFICULTY: Easy
 * ASKED AT: TCS, Infosys
 *
 * Problem: Find sum of array elements using recursion.
 * Input: [1, 2, 3, 4, 5]
 * Output: 15
 */
public class Q07_ArraySum {

    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};

        System.out.println("Array: " + Arrays.toString(arr));
        System.out.println("Sum: " + arraySum(arr, arr.length - 1));
        System.out.println("Max: " + arrayMax(arr, arr.length - 1));
    }

    // ============================================
    // Recursive Array Sum
    // Time: O(n), Space: O(n)
    // ============================================
    public static int arraySum(int[] arr, int index) {
        // Base case
        if (index < 0) return 0;

        // Recursive case
        return arr[index] + arraySum(arr, index - 1);
    }

    // ============================================
    // Recursive Array Max
    // ============================================
    public static int arrayMax(int[] arr, int index) {
        // Base case
        if (index == 0) return arr[0];

        // Recursive case
        return Math.max(arr[index], arrayMax(arr, index - 1));
    }
}

