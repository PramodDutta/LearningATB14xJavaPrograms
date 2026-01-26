package ex_50_Coding_Questions.CQ_08_Matrix_Problems;

/**
 * Q10: Number of Islands
 * ======================
 * DIFFICULTY: Medium
 * ASKED AT: Amazon, Microsoft, Google, Facebook
 *
 * Problem: Count number of islands (connected 1s).
 * Input: [["1","1","0"],["1","1","0"],["0","0","1"]]
 * Output: 2
 */
public class Q10_IslandCount {

    public static void main(String[] args) {
        char[][] grid = {
                {'1', '1', '0', '0', '0'},
                {'1', '1', '0', '0', '0'},
                {'0', '0', '1', '0', '0'},
                {'0', '0', '0', '1', '1'}
        };

        System.out.println("Grid:");
        for (char[] row : grid) {
            System.out.println(java.util.Arrays.toString(row));
        }

        System.out.println("\nNumber of Islands: " + numIslands(grid));
    }

    // ============================================
    // DFS Approach
    // Time: O(m * n), Space: O(m * n)
    // ============================================
    public static int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) return 0;

        int count = 0;
        int m = grid.length;
        int n = grid[0].length;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == '1') {
                    count++;
                    dfs(grid, i, j);
                }
            }
        }

        return count;
    }

    private static void dfs(char[][] grid, int i, int j) {
        // Out of bounds or water
        if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length ||
                grid[i][j] == '0') {
            return;
        }

        // Mark as visited
        grid[i][j] = '0';

        // Explore all 4 directions
        dfs(grid, i + 1, j);
        dfs(grid, i - 1, j);
        dfs(grid, i, j + 1);
        dfs(grid, i, j - 1);
    }
}

