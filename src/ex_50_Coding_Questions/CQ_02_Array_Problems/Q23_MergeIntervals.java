package ex_50_Coding_Questions.CQ_02_Array_Problems;

import java.util.*;

/**
 * Q23: Merge Intervals
 * ====================
 * DIFFICULTY: Medium
 * ASKED AT: Google, Facebook, Amazon, Microsoft
 *
 * Problem: Merge overlapping intervals.
 * Input: [[1,3],[2,6],[8,10],[15,18]]
 * Output: [[1,6],[8,10],[15,18]]
 */
public class Q23_MergeIntervals {

    public static void main(String[] args) {
        int[][] intervals = {{1, 3}, {2, 6}, {8, 10}, {15, 18}};

        System.out.println("Input: " + Arrays.deepToString(intervals));
        System.out.println("Output: " + Arrays.deepToString(merge(intervals)));
    }

    // ============================================
    // Sort and Merge
    // Time: O(n log n), Space: O(n)
    // ============================================
    public static int[][] merge(int[][] intervals) {
        if (intervals.length <= 1) return intervals;

        // Sort by start time
        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);

        List<int[]> result = new ArrayList<>();
        int[] current = intervals[0];
        result.add(current);

        for (int[] interval : intervals) {
            if (interval[0] <= current[1]) {
                // Overlapping - merge
                current[1] = Math.max(current[1], interval[1]);
            } else {
                // Non-overlapping - add new
                current = interval;
                result.add(current);
            }
        }

        return result.toArray(new int[result.size()][]);
    }
}

