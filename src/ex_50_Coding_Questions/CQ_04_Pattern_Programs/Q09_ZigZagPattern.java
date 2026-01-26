package ex_50_Coding_Questions.CQ_04_Pattern_Programs;

/**
 * Q09: ZigZag Pattern
 * ===================
 * DIFFICULTY: Medium
 * ASKED AT: TCS, Infosys
 *
 * Pattern:
 *   *   *   *
 *  * * * * * *
 * *   *   *   *
 */
public class Q09_ZigZagPattern {

    public static void main(String[] args) {
        int cols = 15;

        System.out.println("--- ZIGZAG PATTERN ---\n");
        zigzagPattern(cols);
    }

    public static void zigzagPattern(int cols) {
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= cols; j++) {
                if ((i + j) % 4 == 0 || (i == 2 && j % 4 == 0)) {
                    System.out.print("*");
                } else {
                    System.out.print(" ");
                }
            }
            System.out.println();
        }
    }
}

