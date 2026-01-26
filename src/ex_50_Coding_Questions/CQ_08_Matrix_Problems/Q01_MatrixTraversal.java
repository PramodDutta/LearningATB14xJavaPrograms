package ex_50_Coding_Questions.CQ_08_Matrix_Problems;

import java.util.Arrays;

/**
 * Q01: Matrix Traversal
 * =====================
 * DIFFICULTY: Easy
 * ASKED AT: TCS, Infosys
 *
 * Problem: Traverse matrix row-wise and column-wise.
 */
public class Q01_MatrixTraversal {

    public static void main(String[] args) {
        int[][] matrix = {
                {1, 2, 3},
                {4, 5, 6},
                {7, 8, 9}
        };

        System.out.println("Matrix:");
        printMatrix(matrix);

        System.out.println("\nRow-wise traversal:");
        rowWise(matrix);

        System.out.println("\nColumn-wise traversal:");
        columnWise(matrix);
    }

    public static void printMatrix(int[][] matrix) {
        for (int[] row : matrix) {
            System.out.println(Arrays.toString(row));
        }
    }

    public static void rowWise(int[][] matrix) {
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[0].length; j++) {
                System.out.print(matrix[i][j] + " ");
            }
        }
        System.out.println();
    }

    public static void columnWise(int[][] matrix) {
        for (int j = 0; j < matrix[0].length; j++) {
            for (int i = 0; i < matrix.length; i++) {
                System.out.print(matrix[i][j] + " ");
            }
        }
        System.out.println();
    }
}

