package ex_50_Coding_Questions.CQ_02_Array_Problems;

import java.util.Arrays;

/**
 * Q01: Find Maximum and Minimum in Array
 * ======================================
 * DIFFICULTY: Easy
 * ASKED AT: TCS, Infosys, Wipro, Cognizant
 *
 * Problem: Find the maximum and minimum elements in an array.
 * Input: [3, 5, 1, 8, 2]
 * Output: Max=8, Min=1
 */
public class Q01_FindMaxMin {

    public static void main(String[] args) {
        int[] arr = {3, 5, 1, 8, 2, 9, 4};

        System.out.println("Array: " + Arrays.toString(arr));
        System.out.println("\n--- SOLUTIONS ---");

        findMaxMinLoop(arr);
        findMaxMinStream(arr);
        findMaxMinSinglePass(arr);
    }

    // ============================================
    // METHOD 1: Using Loop
    // Time: O(n), Space: O(1)
    // ============================================
    public static void findMaxMinLoop(int[] arr) {
        int max = arr[0], min = arr[0];

        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > max) max = arr[i];
            if (arr[i] < min) min = arr[i];
        }

        System.out.println("Method 1 (Loop): Max=" + max + ", Min=" + min);
    }

    // ============================================
    // METHOD 2: Using Stream API
    // Time: O(n), Space: O(1)
    // ============================================
    public static void findMaxMinStream(int[] arr) {
        int max = Arrays.stream(arr).max().orElse(Integer.MIN_VALUE);
        int min = Arrays.stream(arr).min().orElse(Integer.MAX_VALUE);

        System.out.println("Method 2 (Stream): Max=" + max + ", Min=" + min);
    }

    // ============================================
    // METHOD 3: Single Pass with Pair Comparison
    // Time: O(n), Space: O(1) - Fewer comparisons
    // ============================================
    public static void findMaxMinSinglePass(int[] arr) {
        int max, min;
        int i;

        // Initialize based on array length
        if (arr.length % 2 == 0) {
            if (arr[0] > arr[1]) {
                max = arr[0];
                min = arr[1];
            } else {
                max = arr[1];
                min = arr[0];
            }
            i = 2;
        } else {
            max = min = arr[0];
            i = 1;
        }

        // Process pairs
        while (i < arr.length - 1) {
            if (arr[i] > arr[i + 1]) {
                if (arr[i] > max) max = arr[i];
                if (arr[i + 1] < min) min = arr[i + 1];
            } else {
                if (arr[i + 1] > max) max = arr[i + 1];
                if (arr[i] < min) min = arr[i];
            }
            i += 2;
        }

        System.out.println("Method 3 (Pairs): Max=" + max + ", Min=" + min);
    }
}

