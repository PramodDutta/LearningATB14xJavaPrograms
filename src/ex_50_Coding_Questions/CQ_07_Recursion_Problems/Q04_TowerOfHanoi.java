package ex_50_Coding_Questions.CQ_07_Recursion_Problems;

/**
 * Q04: Tower of Hanoi
 * ===================
 * DIFFICULTY: Medium
 * ASKED AT: Amazon, Google, Microsoft
 *
 * Problem: Move n disks from source to destination using auxiliary.
 * Rules:
 * 1. Only one disk can be moved at a time
 * 2. Larger disk cannot be placed on smaller disk
 */
public class Q04_TowerOfHanoi {

    public static void main(String[] args) {
        int n = 3;

        System.out.println("Tower of Hanoi with " + n + " disks:");
        System.out.println("Total moves: " + (int) (Math.pow(2, n) - 1));
        System.out.println();

        towerOfHanoi(n, 'A', 'C', 'B');
    }

    // ============================================
    // Recursive Solution
    // Time: O(2^n), Space: O(n)
    // ============================================
    public static void towerOfHanoi(int n, char source, char destination, char auxiliary) {
        // Base case
        if (n == 1) {
            System.out.println("Move disk 1 from " + source + " to " + destination);
            return;
        }

        // Move n-1 disks from source to auxiliary
        towerOfHanoi(n - 1, source, auxiliary, destination);

        // Move nth disk from source to destination
        System.out.println("Move disk " + n + " from " + source + " to " + destination);

        // Move n-1 disks from auxiliary to destination
        towerOfHanoi(n - 1, auxiliary, destination, source);
    }
}

