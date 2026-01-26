package ex_50_Coding_Questions.CQ_04_Pattern_Programs;

/**
 * Q06: Square Patterns
 * ====================
 * DIFFICULTY: Easy
 * ASKED AT: TCS, Infosys
 *
 * Various square patterns
 */
public class Q06_SquarePatterns {

    public static void main(String[] args) {
        int n = 5;

        System.out.println("--- SQUARE PATTERNS ---\n");

        System.out.println("1. Solid Square:");
        solidSquare(n);

        System.out.println("\n2. Hollow Square:");
        hollowSquare(n);

        System.out.println("\n3. Number Square:");
        numberSquare(n);
    }

    // Solid Square
    public static void solidSquare(int n) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }

    // Hollow Square
    public static void hollowSquare(int n) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (i == 0 || i == n - 1 || j == 0 || j == n - 1) {
                    System.out.print("* ");
                } else {
                    System.out.print("  ");
                }
            }
            System.out.println();
        }
    }

    // Number Square
    public static void numberSquare(int n) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                System.out.print(j + " ");
            }
            System.out.println();
        }
    }
}

