package ex_50_Coding_Questions.CQ_02_Array_Problems;

import java.util.*;

/**
 * Q09: Find Duplicate Number
 * ==========================
 * DIFFICULTY: Medium
 * ASKED AT: Amazon, Google, Microsoft
 *
 * Problem: Find the duplicate number in array of n+1 integers (1 to n).
 * Input: [1, 3, 4, 2, 2]
 * Output: 2
 */
public class Q09_FindDuplicate {

    public static void main(String[] args) {
        int[] arr = {1, 3, 4, 2, 2};

        System.out.println("Array: " + Arrays.toString(arr));
        System.out.println("\n--- SOLUTIONS ---");

        System.out.println("Method 1 (HashSet): " + findDuplicateSet(arr));
        System.out.println("Method 2 (Sorting): " + findDuplicateSorting(arr.clone()));
        System.out.println("Method 3 (Floyd's): " + findDuplicateFloyd(arr));
    }

    // ============================================
    // METHOD 1: Using HashSet
    // Time: O(n), Space: O(n)
    // ============================================
    public static int findDuplicateSet(int[] nums) {
        Set<Integer> seen = new HashSet<>();

        for (int num : nums) {
            if (seen.contains(num)) {
                return num;
            }
            seen.add(num);
        }

        return -1;
    }

    // ============================================
    // METHOD 2: Using Sorting
    // Time: O(n log n), Space: O(1)
    // ============================================
    public static int findDuplicateSorting(int[] nums) {
        Arrays.sort(nums);

        for (int i = 1; i < nums.length; i++) {
            if (nums[i] == nums[i - 1]) {
                return nums[i];
            }
        }

        return -1;
    }

    // ============================================
    // METHOD 3: Floyd's Cycle Detection (OPTIMAL)
    // Time: O(n), Space: O(1)
    // ============================================
    public static int findDuplicateFloyd(int[] nums) {
        // Phase 1: Find intersection point
        int slow = nums[0];
        int fast = nums[0];

        do {
            slow = nums[slow];
            fast = nums[nums[fast]];
        } while (slow != fast);

        // Phase 2: Find entrance to cycle
        slow = nums[0];
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }

        return slow;
    }
}

