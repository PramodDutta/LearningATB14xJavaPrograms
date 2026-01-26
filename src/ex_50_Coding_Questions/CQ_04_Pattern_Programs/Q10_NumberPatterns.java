package ex_50_Coding_Questions.CQ_04_Pattern_Programs;

/**
 * Q10: Various Number Patterns
 * ============================
 * DIFFICULTY: Easy to Medium
 * ASKED AT: TCS, Infosys, Wipro
 */
public class Q10_NumberPatterns {

    public static void main(String[] args) {
        int n = 5;

        System.out.println("--- NUMBER PATTERNS ---\n");

        System.out.println("1. Increasing Pattern:");
        increasingPattern(n);

        System.out.println("\n2. Same Number Pattern:");
        sameNumberPattern(n);

        System.out.println("\n3. Binary Pattern:");
        binaryPattern(n);

        System.out.println("\n4. Palindrome Number Pattern:");
        palindromeNumberPattern(n);
    }

    // 1, 12, 123, 1234, 12345
    public static void increasingPattern(int n) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(j);
            }
            System.out.println();
        }
    }

    // 1, 22, 333, 4444, 55555
    public static void sameNumberPattern(int n) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(i);
            }
            System.out.println();
        }
    }

    // 1, 01, 101, 0101, 10101
    public static void binaryPattern(int n) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print((i + j) % 2);
            }
            System.out.println();
        }
    }

    // 1, 121, 12321, 1234321
    public static void palindromeNumberPattern(int n) {
        for (int i = 1; i <= n; i++) {
            // Spaces
            for (int j = 1; j <= n - i; j++) {
                System.out.print(" ");
            }
            // Increasing
            for (int j = 1; j <= i; j++) {
                System.out.print(j);
            }
            // Decreasing
            for (int j = i - 1; j >= 1; j--) {
                System.out.print(j);
            }
            System.out.println();
        }
    }
}

