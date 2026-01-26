package ex_50_Coding_Questions.CQ_03_Number_Problems;

/**
 * Q06: Armstrong Number
 * =====================
 * DIFFICULTY: Easy
 * ASKED AT: TCS, Infosys, Wipro, Cognizant
 *
 * Problem: Check if sum of digits raised to power of digit count equals number.
 * Input: 153 -> true (1³ + 5³ + 3³ = 153)
 * Input: 370 -> true (3³ + 7³ + 0³ = 370)
 */
public class Q06_ArmstrongNumber {

    public static void main(String[] args) {
        int[] testCases = {153, 370, 371, 407, 123, 9474};

        System.out.println("--- ARMSTRONG NUMBER CHECK ---\n");

        for (int num : testCases) {
            System.out.println(num + " -> " + isArmstrong(num));
        }

        System.out.println("\nArmstrong numbers between 1 and 1000:");
        findArmstrongInRange(1, 1000);
    }

    // ============================================
    // Check Armstrong Number
    // Time: O(d) where d = number of digits
    // ============================================
    public static boolean isArmstrong(int n) {
        int original = n;
        int digits = String.valueOf(n).length();
        int sum = 0;

        while (n > 0) {
            int digit = n % 10;
            sum += Math.pow(digit, digits);
            n /= 10;
        }

        return sum == original;
    }

    // ============================================
    // Find Armstrong Numbers in Range
    // ============================================
    public static void findArmstrongInRange(int start, int end) {
        for (int i = start; i <= end; i++) {
            if (isArmstrong(i)) {
                System.out.print(i + " ");
            }
        }
        System.out.println();
    }
}

