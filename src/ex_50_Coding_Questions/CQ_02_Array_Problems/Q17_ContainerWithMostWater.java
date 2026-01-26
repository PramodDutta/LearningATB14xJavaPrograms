package ex_50_Coding_Questions.CQ_02_Array_Problems;

import java.util.Arrays;

/**
 * Q17: Container With Most Water
 * ==============================
 * DIFFICULTY: Medium
 * ASKED AT: Amazon, Google, Facebook
 *
 * Problem: Find two lines that form container with most water.
 * Input: [1, 8, 6, 2, 5, 4, 8, 3, 7]
 * Output: 49 (between index 1 and 8)
 */
public class Q17_ContainerWithMostWater {

    public static void main(String[] args) {
        int[] height = {1, 8, 6, 2, 5, 4, 8, 3, 7};

        System.out.println("Heights: " + Arrays.toString(height));
        System.out.println("\n--- SOLUTIONS ---");

        System.out.println("Method 1 (Brute Force): " + maxAreaBruteForce(height));
        System.out.println("Method 2 (Two Pointers): " + maxAreaTwoPointers(height));
    }

    // ============================================
    // METHOD 1: Brute Force
    // Time: O(n²), Space: O(1)
    // ============================================
    public static int maxAreaBruteForce(int[] height) {
        int maxArea = 0;

        for (int i = 0; i < height.length; i++) {
            for (int j = i + 1; j < height.length; j++) {
                int area = Math.min(height[i], height[j]) * (j - i);
                maxArea = Math.max(maxArea, area);
            }
        }

        return maxArea;
    }

    // ============================================
    // METHOD 2: Two Pointers (OPTIMAL)
    // Time: O(n), Space: O(1)
    // ============================================
    public static int maxAreaTwoPointers(int[] height) {
        int maxArea = 0;
        int left = 0, right = height.length - 1;

        while (left < right) {
            int area = Math.min(height[left], height[right]) * (right - left);
            maxArea = Math.max(maxArea, area);

            // Move the shorter line
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }

        return maxArea;
    }
}

