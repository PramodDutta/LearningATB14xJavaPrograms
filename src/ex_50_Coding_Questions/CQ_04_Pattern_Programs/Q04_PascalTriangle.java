package ex_50_Coding_Questions.CQ_04_Pattern_Programs;

/**
 * Q04: Pascal's Triangle
 * ======================
 * DIFFICULTY: Medium
 * ASKED AT: Amazon, Google, Microsoft
 *
 * Pattern:
 *     1
 *    1 1
 *   1 2 1
 *  1 3 3 1
 * 1 4 6 4 1
 */
public class Q04_PascalTriangle {

    public static void main(String[] args) {
        int n = 6;

        System.out.println("--- PASCAL'S TRIANGLE ---\n");

        System.out.println("Method 1 (Using Formula):");
        pascalTriangleFormula(n);

        System.out.println("\nMethod 2 (Using Array):");
        pascalTriangleArray(n);
    }

    // Using nCr formula
    public static void pascalTriangleFormula(int n) {
        for (int i = 0; i < n; i++) {
            // Print spaces
            for (int j = 0; j < n - i - 1; j++) {
                System.out.print(" ");
            }

            int value = 1;
            for (int j = 0; j <= i; j++) {
                System.out.print(value + " ");
                value = value * (i - j) / (j + 1);
            }
            System.out.println();
        }
    }

    // Using 2D Array
    public static void pascalTriangleArray(int n) {
        int[][] triangle = new int[n][];

        for (int i = 0; i < n; i++) {
            triangle[i] = new int[i + 1];
            triangle[i][0] = triangle[i][i] = 1;

            for (int j = 1; j < i; j++) {
                triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
            }
        }

        // Print
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                System.out.print(" ");
            }
            for (int j = 0; j <= i; j++) {
                System.out.print(triangle[i][j] + " ");
            }
            System.out.println();
        }
    }
}

