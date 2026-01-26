package ex_50_Coding_Questions.CQ_04_Pattern_Programs;

/**
 * Q07: Butterfly Pattern
 * ======================
 * DIFFICULTY: Medium
 * ASKED AT: TCS, Infosys
 *
 * Pattern:
 * *       *
 * **     **
 * ***   ***
 * **** ****
 * *********
 * **** ****
 * ***   ***
 * **     **
 * *       *
 */
public class Q07_ButterflyPattern {

    public static void main(String[] args) {
        int n = 5;

        System.out.println("--- BUTTERFLY PATTERN ---\n");
        butterflyPattern(n);
    }

    public static void butterflyPattern(int n) {
        // Upper half
        for (int i = 1; i <= n; i++) {
            // Left stars
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }
            // Spaces
            for (int j = 1; j <= 2 * (n - i); j++) {
                System.out.print(" ");
            }
            // Right stars
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }
            System.out.println();
        }

        // Lower half
        for (int i = n - 1; i >= 1; i--) {
            // Left stars
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }
            // Spaces
            for (int j = 1; j <= 2 * (n - i); j++) {
                System.out.print(" ");
            }
            // Right stars
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}

