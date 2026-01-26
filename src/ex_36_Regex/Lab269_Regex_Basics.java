package ex_36_Regex;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * LAB 269: Regular Expressions Basics
 * ===================================
 * Topics Covered:
 * 1. Pattern and Matcher classes
 * 2. Basic regex syntax
 * 3. Character classes
 * 4. Quantifiers
 *
 * WHY IMPORTANT FOR SDET?
 * - Validating input fields (email, phone, etc.)
 * - Extracting data from strings/responses
 * - Log file parsing
 * - Data validation in tests
 */
public class Lab269_Regex_Basics {

    public static void main(String[] args) {

        // ============================================
        // 1. Basic Pattern Matching
        // ============================================
        System.out.println("===== 1. Basic Pattern Matching =====");

        String text = "The quick brown fox jumps over the lazy dog";

        // Simple match
        Pattern pattern = Pattern.compile("fox");
        Matcher matcher = pattern.matcher(text);

        if (matcher.find()) {
            System.out.println("Found 'fox' at index: " + matcher.start());
        }

        // Using String.matches() - matches ENTIRE string
        boolean matches = "hello".matches("hello");
        System.out.println("'hello' matches 'hello': " + matches);

        // ============================================
        // 2. Character Classes
        // ============================================
        System.out.println("\n===== 2. Character Classes =====");

        // [abc] - matches a, b, or c
        System.out.println("'a' matches [abc]: " + "a".matches("[abc]"));
        System.out.println("'d' matches [abc]: " + "d".matches("[abc]"));

        // [a-z] - matches any lowercase letter
        System.out.println("'m' matches [a-z]: " + "m".matches("[a-z]"));

        // [0-9] - matches any digit
        System.out.println("'5' matches [0-9]: " + "5".matches("[0-9]"));

        // [^abc] - matches anything EXCEPT a, b, c
        System.out.println("'d' matches [^abc]: " + "d".matches("[^abc]"));

        // ============================================
        // 3. Predefined Character Classes
        // ============================================
        System.out.println("\n===== 3. Predefined Classes =====");

        // \\d - digit [0-9]
        System.out.println("'5' matches \\\\d: " + "5".matches("\\d"));

        // \\D - non-digit [^0-9]
        System.out.println("'a' matches \\\\D: " + "a".matches("\\D"));

        // \\w - word character [a-zA-Z0-9_]
        System.out.println("'a' matches \\\\w: " + "a".matches("\\w"));

        // \\s - whitespace
        System.out.println("' ' matches \\\\s: " + " ".matches("\\s"));

        // . - any character (except newline)
        System.out.println("'x' matches .: " + "x".matches("."));

        // ============================================
        // 4. Quantifiers
        // ============================================
        System.out.println("\n===== 4. Quantifiers =====");

        // * - zero or more
        System.out.println("'aaa' matches a*: " + "aaa".matches("a*"));
        System.out.println("'' matches a*: " + "".matches("a*"));

        // + - one or more
        System.out.println("'aaa' matches a+: " + "aaa".matches("a+"));
        System.out.println("'' matches a+: " + "".matches("a+"));

        // ? - zero or one
        System.out.println("'a' matches a?: " + "a".matches("a?"));
        System.out.println("'' matches a?: " + "".matches("a?"));

        // {n} - exactly n times
        System.out.println("'aaa' matches a{3}: " + "aaa".matches("a{3}"));

        // {n,m} - between n and m times
        System.out.println("'aaaa' matches a{2,5}: " + "aaaa".matches("a{2,5}"));

        // ============================================
        // 5. Anchors
        // ============================================
        System.out.println("\n===== 5. Anchors =====");

        // ^ - start of string
        // $ - end of string
        System.out.println("'hello' matches ^hello$: " + "hello".matches("^hello$"));
        System.out.println("'hello world' matches ^hello: " + "hello world".matches("^hello.*"));

        // ============================================
        // 6. Groups and Alternation
        // ============================================
        System.out.println("\n===== 6. Groups =====");

        // | - alternation (OR)
        System.out.println("'cat' matches cat|dog: " + "cat".matches("cat|dog"));
        System.out.println("'dog' matches cat|dog: " + "dog".matches("cat|dog"));

        // () - grouping
        Pattern groupPattern = Pattern.compile("(\\d{3})-(\\d{4})");
        Matcher groupMatcher = groupPattern.matcher("Phone: 123-4567");

        if (groupMatcher.find()) {
            System.out.println("Full match: " + groupMatcher.group(0));
            System.out.println("Group 1: " + groupMatcher.group(1));
            System.out.println("Group 2: " + groupMatcher.group(2));
        }

        // ============================================
        // 7. Find All Matches
        // ============================================
        System.out.println("\n===== 7. Find All Matches =====");

        String numbers = "Order 123, Item 456, Qty 789";
        Pattern numPattern = Pattern.compile("\\d+");
        Matcher numMatcher = numPattern.matcher(numbers);

        System.out.println("Numbers found:");
        while (numMatcher.find()) {
            System.out.println("  " + numMatcher.group() + " at index " + numMatcher.start());
        }
    }
}

