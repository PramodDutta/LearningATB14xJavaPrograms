package ex_50_Coding_Questions.CQ_08_Matrix_Problems;

import java.util.Arrays;

/**
 * Q05: Diagonal Traversal
 * =======================
 * DIFFICULTY: Easy
 * ASKED AT: Amazon, Microsoft
 *
 * Problem: Print matrix diagonals.
 */
public class Q05_DiagonalTraversal {

    public static void main(String[] args) {
        int[][] matrix = {
                {1, 2, 3},
                {4, 5, 6},
                {7, 8, 9}
        };

        System.out.println("Matrix:");
        for (int[] row : matrix) {
            System.out.println(Arrays.toString(row));
        }

        System.out.println("\nPrimary Diagonal:");
        primaryDiagonal(matrix);

        System.out.println("\nSecondary Diagonal:");
        secondaryDiagonal(matrix);

        System.out.println("\nSum of Diagonals: " + diagonalSum(matrix));
    }

    // Primary Diagonal (top-left to bottom-right)
    public static void primaryDiagonal(int[][] matrix) {
        for (int i = 0; i < matrix.length; i++) {
            System.out.print(matrix[i][i] + " ");
        }
        System.out.println();
    }

    // Secondary Diagonal (top-right to bottom-left)
    public static void secondaryDiagonal(int[][] matrix) {
        int n = matrix.length;
        for (int i = 0; i < n; i++) {
            System.out.print(matrix[i][n - 1 - i] + " ");
        }
        System.out.println();
    }

    // Sum of both diagonals (avoid counting center twice)
    public static int diagonalSum(int[][] matrix) {
        int n = matrix.length;
        int sum = 0;

        for (int i = 0; i < n; i++) {
            sum += matrix[i][i];  // Primary
            sum += matrix[i][n - 1 - i];  // Secondary
        }

        // If odd size, subtract center (counted twice)
        if (n % 2 == 1) {
            sum -= matrix[n / 2][n / 2];
        }

        return sum;
    }
}

