package ex_50_Coding_Questions.CQ_09_Real_World_SDET;

import java.util.regex.*;

/**
 * Q02: Email Validation
 * =====================
 * DIFFICULTY: Easy
 * ASKED AT: SDET Interviews (Very Common)
 *
 * Problem: Validate email addresses using regex.
 * Real Use: Form validation, data validation in tests.
 */
public class Q02_ValidateEmail {

    // Standard email regex pattern
    private static final String EMAIL_REGEX =
            "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";

    private static final Pattern EMAIL_PATTERN = Pattern.compile(EMAIL_REGEX);

    public static void main(String[] args) {
        String[] testEmails = {
                "test@example.com",
                "user.name@domain.co.in",
                "invalid-email",
                "missing@domain",
                "@nodomain.com",
                "spaces in@email.com",
                "valid123@test.org"
        };

        System.out.println("=== Email Validation ===\n");

        for (String email : testEmails) {
            boolean isValid = isValidEmail(email);
            System.out.printf("%-25s : %s%n", email, isValid ? "✓ Valid" : "✗ Invalid");
        }
    }

    // ============================================
    // Validate Email using Regex
    // ============================================
    public static boolean isValidEmail(String email) {
        if (email == null || email.isEmpty()) {
            return false;
        }
        return EMAIL_PATTERN.matcher(email).matches();
    }

    // ============================================
    // Validate without Regex (Manual)
    // ============================================
    public static boolean isValidEmailManual(String email) {
        if (email == null || email.isEmpty()) return false;

        // Must contain exactly one @
        int atIndex = email.indexOf('@');
        if (atIndex == -1 || atIndex != email.lastIndexOf('@')) return false;

        // Must have characters before @
        if (atIndex == 0) return false;

        // Must have domain after @
        String domain = email.substring(atIndex + 1);
        if (domain.isEmpty()) return false;

        // Domain must contain at least one dot
        int dotIndex = domain.lastIndexOf('.');
        if (dotIndex == -1 || dotIndex == 0 || dotIndex == domain.length() - 1) return false;

        // No spaces allowed
        if (email.contains(" ")) return false;

        return true;
    }
}

