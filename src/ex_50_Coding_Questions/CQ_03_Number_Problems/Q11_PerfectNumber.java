package ex_50_Coding_Questions.CQ_03_Number_Problems;

/**
 * Q11: Perfect Number
 * ===================
 * DIFFICULTY: Easy
 * ASKED AT: TCS, Infosys
 *
 * Problem: Check if sum of proper divisors equals the number.
 * Input: 28 -> true (1+2+4+7+14 = 28)
 * Input: 6 -> true (1+2+3 = 6)
 */
public class Q11_PerfectNumber {

    public static void main(String[] args) {
        int[] testCases = {6, 28, 496, 12, 100};

        System.out.println("--- PERFECT NUMBER CHECK ---\n");

        for (int num : testCases) {
            System.out.println(num + " -> " + isPerfect(num));
        }

        System.out.println("\nPerfect numbers up to 10000:");
        findPerfectNumbers(10000);
    }

    // ============================================
    // Check Perfect Number
    // Time: O(√n), Space: O(1)
    // ============================================
    public static boolean isPerfect(int n) {
        if (n <= 1) return false;

        int sum = 1;  // 1 is always a divisor

        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) {
                sum += i;
                if (i != n / i) {
                    sum += n / i;
                }
            }
        }

        return sum == n;
    }

    // ============================================
    // Find Perfect Numbers in Range
    // ============================================
    public static void findPerfectNumbers(int limit) {
        for (int i = 2; i <= limit; i++) {
            if (isPerfect(i)) {
                System.out.print(i + " ");
            }
        }
        System.out.println();
    }
}

