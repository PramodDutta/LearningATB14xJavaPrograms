package ex_50_Coding_Questions.CQ_08_Matrix_Problems;

import java.util.*;

/**
 * Q08: Boundary Traversal
 * =======================
 * DIFFICULTY: Easy
 * ASKED AT: Amazon, Microsoft
 *
 * Problem: Print boundary elements of matrix.
 */
public class Q08_BoundaryTraversal {

    public static void main(String[] args) {
        int[][] matrix = {
                {1, 2, 3, 4},
                {5, 6, 7, 8},
                {9, 10, 11, 12},
                {13, 14, 15, 16}
        };

        System.out.println("Matrix:");
        for (int[] row : matrix) {
            System.out.println(Arrays.toString(row));
        }

        System.out.println("\nBoundary Elements: " + boundaryTraversal(matrix));
    }

    // ============================================
    // Boundary Traversal
    // Time: O(m + n), Space: O(1)
    // ============================================
    public static List<Integer> boundaryTraversal(int[][] matrix) {
        List<Integer> result = new ArrayList<>();
        if (matrix.length == 0) return result;

        int m = matrix.length;
        int n = matrix[0].length;

        // Top row
        for (int j = 0; j < n; j++) {
            result.add(matrix[0][j]);
        }

        // Right column (excluding first element)
        for (int i = 1; i < m; i++) {
            result.add(matrix[i][n - 1]);
        }

        // Bottom row (excluding last element, if more than one row)
        if (m > 1) {
            for (int j = n - 2; j >= 0; j--) {
                result.add(matrix[m - 1][j]);
            }
        }

        // Left column (excluding first and last, if more than one column)
        if (n > 1) {
            for (int i = m - 2; i > 0; i--) {
                result.add(matrix[i][0]);
            }
        }

        return result;
    }
}

