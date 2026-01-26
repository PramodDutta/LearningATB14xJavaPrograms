package ex_50_Coding_Questions.CQ_02_Array_Problems;

import java.util.Arrays;

/**
 * Q03: Find Second Largest Element
 * ================================
 * DIFFICULTY: Easy
 * ASKED AT: Amazon, Microsoft, TCS, Infosys
 *
 * Problem: Find the second largest element in an array.
 * Input: [12, 35, 1, 10, 34, 1]
 * Output: 34
 */
public class Q03_SecondLargest {

    public static void main(String[] args) {
        int[] arr = {12, 35, 1, 10, 34, 1};

        System.out.println("Array: " + Arrays.toString(arr));
        System.out.println("\n--- SOLUTIONS ---");

        System.out.println("Method 1 (Sorting): " + secondLargestSorting(arr.clone()));
        System.out.println("Method 2 (Two Pass): " + secondLargestTwoPass(arr));
        System.out.println("Method 3 (Single Pass): " + secondLargestSinglePass(arr));
    }

    // ============================================
    // METHOD 1: Using Sorting
    // Time: O(n log n), Space: O(1)
    // ============================================
    public static int secondLargestSorting(int[] arr) {
        Arrays.sort(arr);

        // Find second distinct largest
        for (int i = arr.length - 2; i >= 0; i--) {
            if (arr[i] != arr[arr.length - 1]) {
                return arr[i];
            }
        }

        return -1;  // No second largest
    }

    // ============================================
    // METHOD 2: Two Pass
    // Time: O(n), Space: O(1)
    // ============================================
    public static int secondLargestTwoPass(int[] arr) {
        // First pass: find largest
        int largest = Integer.MIN_VALUE;
        for (int num : arr) {
            if (num > largest) largest = num;
        }

        // Second pass: find second largest
        int secondLargest = Integer.MIN_VALUE;
        for (int num : arr) {
            if (num > secondLargest && num < largest) {
                secondLargest = num;
            }
        }

        return secondLargest == Integer.MIN_VALUE ? -1 : secondLargest;
    }

    // ============================================
    // METHOD 3: Single Pass (OPTIMAL)
    // Time: O(n), Space: O(1)
    // ============================================
    public static int secondLargestSinglePass(int[] arr) {
        int largest = Integer.MIN_VALUE;
        int secondLargest = Integer.MIN_VALUE;

        for (int num : arr) {
            if (num > largest) {
                secondLargest = largest;
                largest = num;
            } else if (num > secondLargest && num != largest) {
                secondLargest = num;
            }
        }

        return secondLargest == Integer.MIN_VALUE ? -1 : secondLargest;
    }
}

