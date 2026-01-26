package ex_50_Coding_Questions.CQ_09_Real_World_SDET;

import java.util.*;

/**
 * Q10: String Manipulation Utilities
 * ==================================
 * DIFFICULTY: Easy
 * ASKED AT: SDET Interviews (Very Common)
 *
 * Problem: Common string operations for testing.
 * Real Use: Data transformation, test assertions.
 */
public class Q10_StringManipulation {

    public static void main(String[] args) {
        System.out.println("=== String Utilities ===\n");

        // Camel case conversion
        System.out.println("toCamelCase: " + toCamelCase("hello_world_test"));
        System.out.println("toSnakeCase: " + toSnakeCase("helloWorldTest"));

        // Truncate
        System.out.println("truncate: " + truncate("This is a long string", 10));

        // Mask sensitive data
        System.out.println("maskEmail: " + maskEmail("john.doe@example.com"));
        System.out.println("maskCard: " + maskCreditCard("1234567890123456"));

        // Extract numbers
        System.out.println("extractNumbers: " + extractNumbers("Order #123 - Total: $45.99"));

        // Normalize whitespace
        System.out.println("normalize: '" + normalizeWhitespace("  hello   world  ") + "'");
    }

    // Convert snake_case to camelCase
    public static String toCamelCase(String str) {
        StringBuilder result = new StringBuilder();
        boolean capitalizeNext = false;

        for (char c : str.toCharArray()) {
            if (c == '_' || c == '-') {
                capitalizeNext = true;
            } else if (capitalizeNext) {
                result.append(Character.toUpperCase(c));
                capitalizeNext = false;
            } else {
                result.append(c);
            }
        }

        return result.toString();
    }

    // Convert camelCase to snake_case
    public static String toSnakeCase(String str) {
        StringBuilder result = new StringBuilder();

        for (char c : str.toCharArray()) {
            if (Character.isUpperCase(c)) {
                if (result.length() > 0) {
                    result.append('_');
                }
                result.append(Character.toLowerCase(c));
            } else {
                result.append(c);
            }
        }

        return result.toString();
    }

    // Truncate string with ellipsis
    public static String truncate(String str, int maxLength) {
        if (str == null || str.length() <= maxLength) return str;
        return str.substring(0, maxLength - 3) + "...";
    }

    // Mask email address
    public static String maskEmail(String email) {
        int atIndex = email.indexOf('@');
        if (atIndex <= 1) return email;

        String local = email.substring(0, atIndex);
        String domain = email.substring(atIndex);

        return local.charAt(0) + "***" + local.charAt(local.length() - 1) + domain;
    }

    // Mask credit card number
    public static String maskCreditCard(String cardNumber) {
        if (cardNumber.length() < 4) return cardNumber;
        return "*".repeat(cardNumber.length() - 4) + cardNumber.substring(cardNumber.length() - 4);
    }

    // Extract all numbers from string
    public static List<String> extractNumbers(String str) {
        List<String> numbers = new ArrayList<>();
        StringBuilder current = new StringBuilder();

        for (char c : str.toCharArray()) {
            if (Character.isDigit(c) || c == '.') {
                current.append(c);
            } else if (current.length() > 0) {
                numbers.add(current.toString());
                current = new StringBuilder();
            }
        }

        if (current.length() > 0) {
            numbers.add(current.toString());
        }

        return numbers;
    }

    // Normalize whitespace
    public static String normalizeWhitespace(String str) {
        return str.trim().replaceAll("\\s+", " ");
    }
}

