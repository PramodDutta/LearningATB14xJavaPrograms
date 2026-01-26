package ex_50_Coding_Questions.CQ_01_String_Problems;

import java.util.Stack;
import java.util.Map;

/**
 * Q12: Valid Parentheses
 * ======================
 * DIFFICULTY: Easy-Medium
 * ASKED AT: Amazon, Google, Facebook, Microsoft (VERY COMMON)
 *
 * Problem: Check if brackets are balanced and properly nested.
 * Input: "()[]{}" -> true
 * Input: "([)]" -> false
 * Input: "{[]}" -> true
 */
public class Q12_ValidParentheses {

    public static void main(String[] args) {
        String[] testCases = {"()", "()[]{}", "(]", "([)]", "{[]}", "((()))", ""};

        for (String test : testCases) {
            System.out.println("Input: \"" + test + "\"");
            System.out.println("  Method 1 (Stack): " + isValidStack(test));
            System.out.println("  Method 2 (Map): " + isValidMap(test));
            System.out.println();
        }
    }

    // ============================================
    // METHOD 1: Using Stack
    // Time: O(n), Space: O(n)
    // ============================================
    public static boolean isValidStack(String s) {
        Stack<Character> stack = new Stack<>();

        for (char ch : s.toCharArray()) {
            if (ch == '(' || ch == '[' || ch == '{') {
                stack.push(ch);
            } else {
                if (stack.isEmpty()) return false;

                char top = stack.pop();
                if (ch == ')' && top != '(') return false;
                if (ch == ']' && top != '[') return false;
                if (ch == '}' && top != '{') return false;
            }
        }

        return stack.isEmpty();
    }

    // ============================================
    // METHOD 2: Using Map for Matching
    // Time: O(n), Space: O(n)
    // ============================================
    public static boolean isValidMap(String s) {
        Stack<Character> stack = new Stack<>();
        Map<Character, Character> pairs = Map.of(
                ')', '(',
                ']', '[',
                '}', '{'
        );

        for (char ch : s.toCharArray()) {
            if (pairs.containsValue(ch)) {
                // Opening bracket
                stack.push(ch);
            } else if (pairs.containsKey(ch)) {
                // Closing bracket
                if (stack.isEmpty() || stack.pop() != pairs.get(ch)) {
                    return false;
                }
            }
        }

        return stack.isEmpty();
    }
}

