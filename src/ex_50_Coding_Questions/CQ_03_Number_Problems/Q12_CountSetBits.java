package ex_50_Coding_Questions.CQ_03_Number_Problems;

/**
 * Q12: Count Set Bits (Hamming Weight)
 * ====================================
 * DIFFICULTY: Easy
 * ASKED AT: Amazon, Microsoft, Google
 *
 * Problem: Count number of 1s in binary representation.
 * Input: 11 (1011) -> 3
 * Input: 128 (10000000) -> 1
 */
public class Q12_CountSetBits {

    public static void main(String[] args) {
        int[] testCases = {11, 128, 255, 0, 7};

        System.out.println("--- COUNT SET BITS ---\n");

        for (int num : testCases) {
            System.out.println(num + " (binary: " + Integer.toBinaryString(num) + ")");
            System.out.println("  Loop: " + countSetBitsLoop(num));
            System.out.println("  Brian Kernighan: " + countSetBitsBK(num));
            System.out.println("  Built-in: " + Integer.bitCount(num));
            System.out.println();
        }
    }

    // ============================================
    // METHOD 1: Using Loop
    // Time: O(32) = O(1), Space: O(1)
    // ============================================
    public static int countSetBitsLoop(int n) {
        int count = 0;

        while (n > 0) {
            count += n & 1;  // Check last bit
            n >>= 1;         // Right shift
        }

        return count;
    }

    // ============================================
    // METHOD 2: Brian Kernighan's Algorithm
    // Time: O(number of set bits), Space: O(1)
    // n & (n-1) removes the rightmost set bit
    // ============================================
    public static int countSetBitsBK(int n) {
        int count = 0;

        while (n > 0) {
            n = n & (n - 1);
            count++;
        }

        return count;
    }
}

