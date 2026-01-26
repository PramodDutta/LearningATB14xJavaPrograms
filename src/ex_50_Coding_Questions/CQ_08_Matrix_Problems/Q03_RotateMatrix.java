package ex_50_Coding_Questions.CQ_08_Matrix_Problems;

import java.util.Arrays;

/**
 * Q03: Rotate Matrix 90 Degrees
 * =============================
 * DIFFICULTY: Medium
 * ASKED AT: Amazon, Microsoft, Google
 *
 * Problem: Rotate matrix 90 degrees clockwise.
 * Input: [[1,2,3],[4,5,6],[7,8,9]]
 * Output: [[7,4,1],[8,5,2],[9,6,3]]
 */
public class Q03_RotateMatrix {

    public static void main(String[] args) {
        int[][] matrix = {
                {1, 2, 3},
                {4, 5, 6},
                {7, 8, 9}
        };

        System.out.println("Original:");
        printMatrix(matrix);

        rotate90Clockwise(matrix);

        System.out.println("\nRotated 90° Clockwise:");
        printMatrix(matrix);
    }

    // ============================================
    // Rotate 90° Clockwise
    // Step 1: Transpose
    // Step 2: Reverse each row
    // Time: O(n²), Space: O(1)
    // ============================================
    public static void rotate90Clockwise(int[][] matrix) {
        int n = matrix.length;

        // Transpose
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }

        // Reverse each row
        for (int i = 0; i < n; i++) {
            int left = 0, right = n - 1;
            while (left < right) {
                int temp = matrix[i][left];
                matrix[i][left] = matrix[i][right];
                matrix[i][right] = temp;
                left++;
                right--;
            }
        }
    }

    // ============================================
    // Rotate 90° Counter-Clockwise
    // Step 1: Transpose
    // Step 2: Reverse each column
    // ============================================
    public static void rotate90CounterClockwise(int[][] matrix) {
        int n = matrix.length;

        // Transpose
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }

        // Reverse each column
        for (int j = 0; j < n; j++) {
            int top = 0, bottom = n - 1;
            while (top < bottom) {
                int temp = matrix[top][j];
                matrix[top][j] = matrix[bottom][j];
                matrix[bottom][j] = temp;
                top++;
                bottom--;
            }
        }
    }

    public static void printMatrix(int[][] matrix) {
        for (int[] row : matrix) {
            System.out.println(Arrays.toString(row));
        }
    }
}

