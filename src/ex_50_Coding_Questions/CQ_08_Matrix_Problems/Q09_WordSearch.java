package ex_50_Coding_Questions.CQ_08_Matrix_Problems;

/**
 * Q09: Word Search in Matrix
 * ==========================
 * DIFFICULTY: Medium
 * ASKED AT: Amazon, Microsoft, Google, Facebook
 *
 * Problem: Check if word exists in grid (horizontal/vertical adjacent).
 */
public class Q09_WordSearch {

    public static void main(String[] args) {
        char[][] board = {
                {'A', 'B', 'C', 'E'},
                {'S', 'F', 'C', 'S'},
                {'A', 'D', 'E', 'E'}
        };

        System.out.println("Board:");
        for (char[] row : board) {
            System.out.println(java.util.Arrays.toString(row));
        }

        System.out.println("\n'ABCCED' exists: " + exist(board, "ABCCED"));
        System.out.println("'SEE' exists: " + exist(board, "SEE"));
        System.out.println("'ABCB' exists: " + exist(board, "ABCB"));
    }

    // ============================================
    // Backtracking DFS
    // Time: O(m * n * 4^L), Space: O(L)
    // ============================================
    public static boolean exist(char[][] board, String word) {
        int m = board.length;
        int n = board[0].length;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (dfs(board, word, i, j, 0)) {
                    return true;
                }
            }
        }

        return false;
    }

    private static boolean dfs(char[][] board, String word, int i, int j, int index) {
        // Found complete word
        if (index == word.length()) return true;

        // Out of bounds or character mismatch
        if (i < 0 || i >= board.length || j < 0 || j >= board[0].length ||
                board[i][j] != word.charAt(index)) {
            return false;
        }

        // Mark as visited
        char temp = board[i][j];
        board[i][j] = '#';

        // Explore all 4 directions
        boolean found = dfs(board, word, i + 1, j, index + 1) ||
                dfs(board, word, i - 1, j, index + 1) ||
                dfs(board, word, i, j + 1, index + 1) ||
                dfs(board, word, i, j - 1, index + 1);

        // Restore
        board[i][j] = temp;

        return found;
    }
}

