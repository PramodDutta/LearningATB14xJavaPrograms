package ex_50_Coding_Questions.CQ_02_Array_Problems;

import java.util.Arrays;

/**
 * Q06: Move Zeroes to End
 * =======================
 * DIFFICULTY: Easy
 * ASKED AT: Facebook, Amazon, Microsoft
 *
 * Problem: Move all zeroes to end while maintaining order of non-zero elements.
 * Input: [0, 1, 0, 3, 12]
 * Output: [1, 3, 12, 0, 0]
 */
public class Q06_MoveZeroes {

    public static void main(String[] args) {
        int[] arr = {0, 1, 0, 3, 12};

        System.out.println("Original: " + Arrays.toString(arr));
        System.out.println("\n--- SOLUTIONS ---");

        System.out.println("Method 1 (Two Pointers): " + Arrays.toString(moveZeroesTwoPointers(arr.clone())));
        System.out.println("Method 2 (Count): " + Arrays.toString(moveZeroesCount(arr.clone())));
    }

    // ============================================
    // METHOD 1: Two Pointers (OPTIMAL)
    // Time: O(n), Space: O(1)
    // ============================================
    public static int[] moveZeroesTwoPointers(int[] nums) {
        int insertPos = 0;

        // Move all non-zero elements to front
        for (int num : nums) {
            if (num != 0) {
                nums[insertPos++] = num;
            }
        }

        // Fill remaining with zeroes
        while (insertPos < nums.length) {
            nums[insertPos++] = 0;
        }

        return nums;
    }

    // ============================================
    // METHOD 2: Using Count
    // Time: O(n), Space: O(1)
    // ============================================
    public static int[] moveZeroesCount(int[] nums) {
        int zeroCount = 0;
        int insertPos = 0;

        for (int num : nums) {
            if (num == 0) {
                zeroCount++;
            } else {
                nums[insertPos++] = num;
            }
        }

        for (int i = 0; i < zeroCount; i++) {
            nums[insertPos++] = 0;
        }

        return nums;
    }
}

