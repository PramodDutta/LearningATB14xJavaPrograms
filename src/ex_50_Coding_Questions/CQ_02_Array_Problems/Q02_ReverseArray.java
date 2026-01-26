package ex_50_Coding_Questions.CQ_02_Array_Problems;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Q02: Reverse an Array
 * =====================
 * DIFFICULTY: Easy
 * ASKED AT: TCS, Infosys, Accenture
 *
 * Problem: Reverse the elements of an array.
 * Input: [1, 2, 3, 4, 5]
 * Output: [5, 4, 3, 2, 1]
 */
public class Q02_ReverseArray {

    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};

        System.out.println("Original: " + Arrays.toString(arr));
        System.out.println("\n--- SOLUTIONS ---");

        System.out.println("Method 1 (Two Pointers): " + Arrays.toString(reverseTwoPointers(arr.clone())));
        System.out.println("Method 2 (New Array): " + Arrays.toString(reverseNewArray(arr)));
        System.out.println("Method 3 (Collections): " + reverseWithCollections(arr));
    }

    // ============================================
    // METHOD 1: Two Pointers (In-place)
    // Time: O(n), Space: O(1)
    // ============================================
    public static int[] reverseTwoPointers(int[] arr) {
        int left = 0, right = arr.length - 1;

        while (left < right) {
            // Swap
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;

            left++;
            right--;
        }

        return arr;
    }

    // ============================================
    // METHOD 2: Using New Array
    // Time: O(n), Space: O(n)
    // ============================================
    public static int[] reverseNewArray(int[] arr) {
        int[] reversed = new int[arr.length];

        for (int i = 0; i < arr.length; i++) {
            reversed[i] = arr[arr.length - 1 - i];
        }

        return reversed;
    }

    // ============================================
    // METHOD 3: Using Collections
    // Time: O(n), Space: O(n)
    // ============================================
    public static List<Integer> reverseWithCollections(int[] arr) {
        List<Integer> list = Arrays.stream(arr).boxed().collect(Collectors.toList());
        Collections.reverse(list);
        return list;
    }
}

