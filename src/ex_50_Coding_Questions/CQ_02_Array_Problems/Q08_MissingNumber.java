package ex_50_Coding_Questions.CQ_02_Array_Problems;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

/**
 * Q08: Find Missing Number
 * ========================
 * DIFFICULTY: Easy
 * ASKED AT: Amazon, Microsoft, Google
 *
 * Problem: Find missing number in array containing 0 to n.
 * Input: [3, 0, 1]
 * Output: 2
 */
public class Q08_MissingNumber {

    public static void main(String[] args) {
        int[] arr = {3, 0, 1};

        System.out.println("Array: " + Arrays.toString(arr));
        System.out.println("\n--- SOLUTIONS ---");

        System.out.println("Method 1 (Sum Formula): " + missingNumberSum(arr));
        System.out.println("Method 2 (XOR): " + missingNumberXOR(arr));
        System.out.println("Method 3 (HashSet): " + missingNumberSet(arr));
    }

    // ============================================
    // METHOD 1: Using Sum Formula
    // Time: O(n), Space: O(1)
    // ============================================
    public static int missingNumberSum(int[] nums) {
        int n = nums.length;
        int expectedSum = n * (n + 1) / 2;
        int actualSum = 0;

        for (int num : nums) {
            actualSum += num;
        }

        return expectedSum - actualSum;
    }

    // ============================================
    // METHOD 2: Using XOR (OPTIMAL)
    // Time: O(n), Space: O(1)
    // ============================================
    public static int missingNumberXOR(int[] nums) {
        int xor = nums.length;

        for (int i = 0; i < nums.length; i++) {
            xor ^= i ^ nums[i];
        }

        return xor;
    }

    // ============================================
    // METHOD 3: Using HashSet
    // Time: O(n), Space: O(n)
    // ============================================
    public static int missingNumberSet(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int num : nums) {
            set.add(num);
        }

        for (int i = 0; i <= nums.length; i++) {
            if (!set.contains(i)) {
                return i;
            }
        }

        return -1;
    }
}

