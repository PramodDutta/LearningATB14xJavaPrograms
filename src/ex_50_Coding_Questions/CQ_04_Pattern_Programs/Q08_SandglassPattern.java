package ex_50_Coding_Questions.CQ_04_Pattern_Programs;

/**
 * Q08: Sandglass Pattern
 * ======================
 * DIFFICULTY: Medium
 * ASKED AT: TCS, Infosys
 *
 * Pattern:
 * *********
 *  *******
 *   *****
 *    ***
 *     *
 *    ***
 *   *****
 *  *******
 * *********
 */
public class Q08_SandglassPattern {

    public static void main(String[] args) {
        int n = 5;

        System.out.println("--- SANDGLASS PATTERN ---\n");
        sandglassPattern(n);
    }

    public static void sandglassPattern(int n) {
        // Upper half (inverted pyramid)
        for (int i = n; i >= 1; i--) {
            // Spaces
            for (int j = 1; j <= n - i; j++) {
                System.out.print(" ");
            }
            // Stars
            for (int j = 1; j <= 2 * i - 1; j++) {
                System.out.print("*");
            }
            System.out.println();
        }

        // Lower half (pyramid)
        for (int i = 2; i <= n; i++) {
            // Spaces
            for (int j = 1; j <= n - i; j++) {
                System.out.print(" ");
            }
            // Stars
            for (int j = 1; j <= 2 * i - 1; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}

