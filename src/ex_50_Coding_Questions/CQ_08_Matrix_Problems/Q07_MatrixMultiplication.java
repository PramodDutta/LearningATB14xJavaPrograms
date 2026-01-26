package ex_50_Coding_Questions.CQ_08_Matrix_Problems;

import java.util.Arrays;

/**
 * Q07: Matrix Multiplication
 * ==========================
 * DIFFICULTY: Easy
 * ASKED AT: TCS, Infosys
 *
 * Problem: Multiply two matrices.
 * Condition: Columns of A = Rows of B
 */
public class Q07_MatrixMultiplication {

    public static void main(String[] args) {
        int[][] A = {
                {1, 2},
                {3, 4}
        };

        int[][] B = {
                {5, 6},
                {7, 8}
        };

        System.out.println("Matrix A:");
        printMatrix(A);

        System.out.println("\nMatrix B:");
        printMatrix(B);

        System.out.println("\nA x B:");
        int[][] result = multiply(A, B);
        printMatrix(result);
    }

    // ============================================
    // Matrix Multiplication
    // Time: O(n³), Space: O(n²)
    // ============================================
    public static int[][] multiply(int[][] A, int[][] B) {
        int m = A.length;
        int n = A[0].length;
        int p = B[0].length;

        int[][] result = new int[m][p];

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < p; j++) {
                for (int k = 0; k < n; k++) {
                    result[i][j] += A[i][k] * B[k][j];
                }
            }
        }

        return result;
    }

    public static void printMatrix(int[][] matrix) {
        for (int[] row : matrix) {
            System.out.println(Arrays.toString(row));
        }
    }
}

