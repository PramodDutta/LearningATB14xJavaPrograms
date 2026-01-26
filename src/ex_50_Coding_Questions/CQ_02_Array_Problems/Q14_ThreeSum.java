package ex_50_Coding_Questions.CQ_02_Array_Problems;

import java.util.*;

/**
 * Q14: Three Sum
 * ==============
 * DIFFICULTY: Medium
 * ASKED AT: Amazon, Google, Facebook, Microsoft
 *
 * Problem: Find all unique triplets that sum to zero.
 * Input: [-1, 0, 1, 2, -1, -4]
 * Output: [[-1, -1, 2], [-1, 0, 1]]
 */
public class Q14_ThreeSum {

    public static void main(String[] args) {
        int[] arr = {-1, 0, 1, 2, -1, -4};

        System.out.println("Array: " + Arrays.toString(arr));
        System.out.println("\n--- SOLUTION ---");
        System.out.println("Triplets: " + threeSum(arr));
    }

    // ============================================
    // Two Pointers Approach
    // Time: O(n²), Space: O(1) - excluding output
    // ============================================
    public static List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        Arrays.sort(nums);

        for (int i = 0; i < nums.length - 2; i++) {
            // Skip duplicates for first element
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            int left = i + 1;
            int right = nums.length - 1;

            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];

                if (sum == 0) {
                    result.add(Arrays.asList(nums[i], nums[left], nums[right]));

                    // Skip duplicates
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;

                    left++;
                    right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }

        return result;
    }
}

