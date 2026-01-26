package ex_50_Coding_Questions.CQ_03_Number_Problems;

/**
 * Q01: Check Prime Number
 * =======================
 * DIFFICULTY: Easy
 * ASKED AT: TCS, Infosys, Wipro, Cognizant
 *
 * Problem: Check if a number is prime.
 * Input: 17 -> true
 * Input: 15 -> false
 */
public class Q01_PrimeNumber {

    public static void main(String[] args) {
        int[] testCases = {2, 3, 4, 17, 25, 97, 100};

        System.out.println("--- PRIME NUMBER CHECK ---\n");

        for (int num : testCases) {
            System.out.println(num + " -> Basic: " + isPrimeBasic(num) +
                    ", Optimized: " + isPrimeOptimized(num));
        }
    }

    // ============================================
    // METHOD 1: Basic Approach
    // Time: O(n), Space: O(1)
    // ============================================
    public static boolean isPrimeBasic(int n) {
        if (n <= 1) return false;

        for (int i = 2; i < n; i++) {
            if (n % i == 0) return false;
        }

        return true;
    }

    // ============================================
    // METHOD 2: Optimized (Check till sqrt)
    // Time: O(√n), Space: O(1)
    // ============================================
    public static boolean isPrimeOptimized(int n) {
        if (n <= 1) return false;
        if (n <= 3) return true;
        if (n % 2 == 0 || n % 3 == 0) return false;

        // Check 6k ± 1 pattern
        for (int i = 5; i * i <= n; i += 6) {
            if (n % i == 0 || n % (i + 2) == 0) {
                return false;
            }
        }

        return true;
    }
}

