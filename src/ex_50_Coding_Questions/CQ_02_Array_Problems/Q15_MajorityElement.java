package ex_50_Coding_Questions.CQ_02_Array_Problems;

import java.util.*;

/**
 * Q15: Majority Element
 * =====================
 * DIFFICULTY: Easy
 * ASKED AT: Amazon, Google, Microsoft
 *
 * Problem: Find element appearing more than n/2 times.
 * Input: [3, 2, 3]
 * Output: 3
 */
public class Q15_MajorityElement {

    public static void main(String[] args) {
        int[] arr = {2, 2, 1, 1, 1, 2, 2};

        System.out.println("Array: " + Arrays.toString(arr));
        System.out.println("\n--- SOLUTIONS ---");

        System.out.println("Method 1 (HashMap): " + majorityElementHashMap(arr));
        System.out.println("Method 2 (Sorting): " + majorityElementSorting(arr.clone()));
        System.out.println("Method 3 (Boyer-Moore): " + majorityElementBoyerMoore(arr));
    }

    // ============================================
    // METHOD 1: Using HashMap
    // Time: O(n), Space: O(n)
    // ============================================
    public static int majorityElementHashMap(int[] nums) {
        Map<Integer, Integer> count = new HashMap<>();

        for (int num : nums) {
            count.put(num, count.getOrDefault(num, 0) + 1);
            if (count.get(num) > nums.length / 2) {
                return num;
            }
        }

        return -1;
    }

    // ============================================
    // METHOD 2: Using Sorting
    // Time: O(n log n), Space: O(1)
    // ============================================
    public static int majorityElementSorting(int[] nums) {
        Arrays.sort(nums);
        return nums[nums.length / 2];
    }

    // ============================================
    // METHOD 3: Boyer-Moore Voting (OPTIMAL)
    // Time: O(n), Space: O(1)
    // ============================================
    public static int majorityElementBoyerMoore(int[] nums) {
        int candidate = nums[0];
        int count = 1;

        for (int i = 1; i < nums.length; i++) {
            if (count == 0) {
                candidate = nums[i];
                count = 1;
            } else if (nums[i] == candidate) {
                count++;
            } else {
                count--;
            }
        }

        return candidate;
    }
}

