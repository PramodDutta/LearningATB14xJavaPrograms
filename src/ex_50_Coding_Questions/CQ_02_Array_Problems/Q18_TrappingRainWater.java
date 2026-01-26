package ex_50_Coding_Questions.CQ_02_Array_Problems;

import java.util.Arrays;

/**
 * Q18: Trapping Rain Water
 * ========================
 * DIFFICULTY: Hard
 * ASKED AT: Amazon, Google, Facebook, Microsoft (CLASSIC)
 *
 * Problem: Calculate how much water can be trapped.
 * Input: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
 * Output: 6
 */
public class Q18_TrappingRainWater {

    public static void main(String[] args) {
        int[] height = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};

        System.out.println("Heights: " + Arrays.toString(height));
        System.out.println("\n--- SOLUTIONS ---");

        System.out.println("Method 1 (Precompute): " + trapPrecompute(height));
        System.out.println("Method 2 (Two Pointers): " + trapTwoPointers(height));
    }

    // ============================================
    // METHOD 1: Precompute Left and Right Max
    // Time: O(n), Space: O(n)
    // ============================================
    public static int trapPrecompute(int[] height) {
        if (height.length == 0) return 0;

        int n = height.length;
        int[] leftMax = new int[n];
        int[] rightMax = new int[n];

        // Compute left max for each position
        leftMax[0] = height[0];
        for (int i = 1; i < n; i++) {
            leftMax[i] = Math.max(leftMax[i - 1], height[i]);
        }

        // Compute right max for each position
        rightMax[n - 1] = height[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            rightMax[i] = Math.max(rightMax[i + 1], height[i]);
        }

        // Calculate water
        int water = 0;
        for (int i = 0; i < n; i++) {
            water += Math.min(leftMax[i], rightMax[i]) - height[i];
        }

        return water;
    }

    // ============================================
    // METHOD 2: Two Pointers (OPTIMAL)
    // Time: O(n), Space: O(1)
    // ============================================
    public static int trapTwoPointers(int[] height) {
        if (height.length == 0) return 0;

        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0;
        int water = 0;

        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) {
                    leftMax = height[left];
                } else {
                    water += leftMax - height[left];
                }
                left++;
            } else {
                if (height[right] >= rightMax) {
                    rightMax = height[right];
                } else {
                    water += rightMax - height[right];
                }
                right--;
            }
        }

        return water;
    }
}

