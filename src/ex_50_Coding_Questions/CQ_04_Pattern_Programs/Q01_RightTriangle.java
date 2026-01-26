package ex_50_Coding_Questions.CQ_04_Pattern_Programs;

/**
 * Q01: Right Triangle Star Pattern
 * ================================
 * DIFFICULTY: Easy
 * ASKED AT: TCS, Infosys, Wipro (VERY COMMON)
 *
 * Pattern:
 * *
 * **
 * ***
 * ****
 * *****
 */
public class Q01_RightTriangle {

    public static void main(String[] args) {
        int n = 5;

        System.out.println("--- RIGHT TRIANGLE PATTERNS ---\n");

        System.out.println("1. Star Pattern:");
        rightTriangleStar(n);

        System.out.println("\n2. Number Pattern:");
        rightTriangleNumber(n);

        System.out.println("\n3. Alphabet Pattern:");
        rightTriangleAlphabet(n);

        System.out.println("\n4. Inverted Right Triangle:");
        invertedRightTriangle(n);
    }

    // Star Pattern
    public static void rightTriangleStar(int n) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }

    // Number Pattern (1, 12, 123...)
    public static void rightTriangleNumber(int n) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(j + " ");
            }
            System.out.println();
        }
    }

    // Alphabet Pattern (A, AB, ABC...)
    public static void rightTriangleAlphabet(int n) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print((char) ('A' + j - 1) + " ");
            }
            System.out.println();
        }
    }

    // Inverted Right Triangle
    public static void invertedRightTriangle(int n) {
        for (int i = n; i >= 1; i--) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}

