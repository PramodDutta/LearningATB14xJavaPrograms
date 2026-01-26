package ex_50_Coding_Questions.CQ_03_Number_Problems;

/**
 * Q07: GCD and LCM
 * ================
 * DIFFICULTY: Easy
 * ASKED AT: TCS, Infosys, Wipro
 *
 * Problem: Find GCD (Greatest Common Divisor) and LCM (Least Common Multiple).
 * GCD(12, 18) = 6
 * LCM(12, 18) = 36
 */
public class Q07_GCDandLCM {

    public static void main(String[] args) {
        int a = 12, b = 18;

        System.out.println("Numbers: " + a + ", " + b);
        System.out.println("\n--- GCD ---");
        System.out.println("Method 1 (Loop): " + gcdLoop(a, b));
        System.out.println("Method 2 (Euclidean): " + gcdEuclidean(a, b));
        System.out.println("Method 3 (Recursive): " + gcdRecursive(a, b));

        System.out.println("\n--- LCM ---");
        System.out.println("LCM: " + lcm(a, b));
    }

    // ============================================
    // GCD METHOD 1: Using Loop
    // Time: O(min(a, b)), Space: O(1)
    // ============================================
    public static int gcdLoop(int a, int b) {
        int gcd = 1;

        for (int i = 1; i <= Math.min(a, b); i++) {
            if (a % i == 0 && b % i == 0) {
                gcd = i;
            }
        }

        return gcd;
    }

    // ============================================
    // GCD METHOD 2: Euclidean Algorithm
    // Time: O(log(min(a, b))), Space: O(1)
    // ============================================
    public static int gcdEuclidean(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }

        return a;
    }

    // ============================================
    // GCD METHOD 3: Recursive Euclidean
    // Time: O(log(min(a, b))), Space: O(log(min(a, b)))
    // ============================================
    public static int gcdRecursive(int a, int b) {
        if (b == 0) return a;
        return gcdRecursive(b, a % b);
    }

    // ============================================
    // LCM using GCD
    // LCM(a, b) = (a * b) / GCD(a, b)
    // ============================================
    public static int lcm(int a, int b) {
        return (a * b) / gcdEuclidean(a, b);
    }
}

