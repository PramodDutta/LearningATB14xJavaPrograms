package ex_50_Coding_Questions.CQ_02_Array_Problems;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Q04: Remove Duplicates from Array
 * =================================
 * DIFFICULTY: Easy
 * ASKED AT: Amazon, Microsoft, TCS
 *
 * Problem: Remove duplicate elements from an array.
 * Input: [1, 2, 2, 3, 4, 4, 5]
 * Output: [1, 2, 3, 4, 5]
 */
public class Q04_RemoveDuplicates {

    public static void main(String[] args) {
        int[] arr = {1, 2, 2, 3, 4, 4, 5, 5, 5};

        System.out.println("Original: " + Arrays.toString(arr));
        System.out.println("\n--- SOLUTIONS ---");

        System.out.println("Method 1 (LinkedHashSet): " + removeDuplicatesSet(arr));
        System.out.println("Method 2 (Stream): " + Arrays.toString(removeDuplicatesStream(arr)));
        System.out.println("Method 3 (Sorted In-place): " + removeDuplicatesSorted(arr.clone()));
    }

    // ============================================
    // METHOD 1: Using LinkedHashSet (Maintains Order)
    // Time: O(n), Space: O(n)
    // ============================================
    public static List<Integer> removeDuplicatesSet(int[] arr) {
        Set<Integer> set = new LinkedHashSet<>();
        for (int num : arr) {
            set.add(num);
        }
        return new ArrayList<>(set);
    }

    // ============================================
    // METHOD 2: Using Stream API
    // Time: O(n), Space: O(n)
    // ============================================
    public static int[] removeDuplicatesStream(int[] arr) {
        return Arrays.stream(arr).distinct().toArray();
    }

    // ============================================
    // METHOD 3: In-place for Sorted Array
    // Time: O(n), Space: O(1)
    // Returns new length
    // ============================================
    public static int removeDuplicatesSorted(int[] arr) {
        if (arr.length == 0) return 0;

        Arrays.sort(arr);  // Ensure sorted

        int uniqueIndex = 0;

        for (int i = 1; i < arr.length; i++) {
            if (arr[i] != arr[uniqueIndex]) {
                uniqueIndex++;
                arr[uniqueIndex] = arr[i];
            }
        }

        return uniqueIndex + 1;  // New length
    }
}

