package ex_50_Coding_Questions.CQ_04_Pattern_Programs;

/**
 * Q02: Pyramid Pattern
 * ====================
 * DIFFICULTY: Easy
 * ASKED AT: TCS, Infosys, Wipro
 *
 * Pattern:
 *     *
 *    ***
 *   *****
 *  *******
 * *********
 */
public class Q02_Pyramid {

    public static void main(String[] args) {
        int n = 5;

        System.out.println("--- PYRAMID PATTERNS ---\n");

        System.out.println("1. Star Pyramid:");
        starPyramid(n);

        System.out.println("\n2. Number Pyramid:");
        numberPyramid(n);

        System.out.println("\n3. Inverted Pyramid:");
        invertedPyramid(n);
    }

    // Star Pyramid
    public static void starPyramid(int n) {
        for (int i = 1; i <= n; i++) {
            // Print spaces
            for (int j = 1; j <= n - i; j++) {
                System.out.print(" ");
            }
            // Print stars
            for (int j = 1; j <= 2 * i - 1; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }

    // Number Pyramid
    public static void numberPyramid(int n) {
        for (int i = 1; i <= n; i++) {
            // Print spaces
            for (int j = 1; j <= n - i; j++) {
                System.out.print(" ");
            }
            // Print numbers
            for (int j = 1; j <= i; j++) {
                System.out.print(j + " ");
            }
            System.out.println();
        }
    }

    // Inverted Pyramid
    public static void invertedPyramid(int n) {
        for (int i = n; i >= 1; i--) {
            // Print spaces
            for (int j = 1; j <= n - i; j++) {
                System.out.print(" ");
            }
            // Print stars
            for (int j = 1; j <= 2 * i - 1; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}

