package ex_50_Coding_Questions.CQ_04_Pattern_Programs;

/**
 * Q05: Floyd's Triangle
 * =====================
 * DIFFICULTY: Easy
 * ASKED AT: TCS, Infosys
 *
 * Pattern:
 * 1
 * 2 3
 * 4 5 6
 * 7 8 9 10
 * 11 12 13 14 15
 */
public class Q05_FloydTriangle {

    public static void main(String[] args) {
        int n = 5;

        System.out.println("--- FLOYD'S TRIANGLE ---\n");

        System.out.println("Number Pattern:");
        floydTriangle(n);

        System.out.println("\nAlphabet Pattern:");
        floydTriangleAlphabet(n);
    }

    // Floyd's Triangle with Numbers
    public static void floydTriangle(int n) {
        int num = 1;

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(num++ + " ");
            }
            System.out.println();
        }
    }

    // Floyd's Triangle with Alphabets
    public static void floydTriangleAlphabet(int n) {
        char ch = 'A';

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(ch++ + " ");
                if (ch > 'Z') ch = 'A';
            }
            System.out.println();
        }
    }
}

