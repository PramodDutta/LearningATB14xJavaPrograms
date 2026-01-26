package ex_50_Coding_Questions.CQ_08_Matrix_Problems;

import java.util.Arrays;

/**
 * Q06: Search in 2D Matrix
 * ========================
 * DIFFICULTY: Medium
 * ASKED AT: Amazon, Microsoft, Google
 *
 * Problem: Search for target in sorted matrix.
 * Each row is sorted, first element of each row > last of previous.
 * Time: O(log(m*n))
 */
public class Q06_SearchMatrix {

    public static void main(String[] args) {
        int[][] matrix = {
                {1, 3, 5, 7},
                {10, 11, 16, 20},
                {23, 30, 34, 60}
        };
        int target = 3;

        System.out.println("Matrix:");
        for (int[] row : matrix) {
            System.out.println(Arrays.toString(row));
        }

        System.out.println("\nTarget " + target + " found: " + searchMatrix(matrix, target));
    }

    // ============================================
    // Binary Search (Treat as 1D array)
    // Time: O(log(m*n)), Space: O(1)
    // ============================================
    public static boolean searchMatrix(int[][] matrix, int target) {
        if (matrix.length == 0) return false;

        int m = matrix.length;
        int n = matrix[0].length;
        int left = 0, right = m * n - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            int midValue = matrix[mid / n][mid % n];

            if (midValue == target) {
                return true;
            } else if (midValue < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return false;
    }
}

