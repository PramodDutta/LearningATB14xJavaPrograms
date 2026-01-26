package ex_36_Regex;

import java.util.regex.Pattern;

/**
 * LAB 270: Regex for Validation - SDET Essential
 * ===============================================
 * Common validation patterns used in test automation
 */
public class Lab270_Regex_Validation {

    public static void main(String[] args) {

        // ============================================
        // 1. Email Validation
        // ============================================
        System.out.println("===== 1. Email Validation =====");

        String emailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";

        String[] emails = {"test@example.com", "user.name@domain.co.in",
                "invalid", "no@domain", "@nodomain.com"};

        for (String email : emails) {
            boolean valid = email.matches(emailRegex);
            System.out.println(email + " -> " + (valid ? "VALID" : "INVALID"));
        }

        // ============================================
        // 2. Phone Number Validation
        // ============================================
        System.out.println("\n===== 2. Phone Validation =====");

        // US format: (123) 456-7890 or 123-456-7890
        String phoneRegex = "^(\\(\\d{3}\\)|\\d{3})[- ]?\\d{3}[- ]?\\d{4}$";

        String[] phones = {"(123) 456-7890", "123-456-7890", "1234567890",
                "123-45-6789", "12345"};

        for (String phone : phones) {
            boolean valid = phone.matches(phoneRegex);
            System.out.println(phone + " -> " + (valid ? "VALID" : "INVALID"));
        }

        // ============================================
        // 3. Password Validation
        // ============================================
        System.out.println("\n===== 3. Password Validation =====");

        // At least 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char
        String passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";

        String[] passwords = {"Password1!", "weakpass", "NoSpecial1", "Short1!", "ValidPass123!"};

        for (String pwd : passwords) {
            boolean valid = pwd.matches(passwordRegex);
            System.out.println(pwd + " -> " + (valid ? "VALID" : "INVALID"));
        }

        // ============================================
        // 4. Date Validation (DD/MM/YYYY)
        // ============================================
        System.out.println("\n===== 4. Date Validation =====");

        String dateRegex = "^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/\\d{4}$";

        String[] dates = {"15/06/2024", "31/12/2023", "32/01/2024", "15-06-2024", "1/6/2024"};

        for (String date : dates) {
            boolean valid = date.matches(dateRegex);
            System.out.println(date + " -> " + (valid ? "VALID" : "INVALID"));
        }

        // ============================================
        // 5. URL Validation
        // ============================================
        System.out.println("\n===== 5. URL Validation =====");

        String urlRegex = "^(https?://)?([\\w.-]+)\\.([a-z]{2,})(/.*)?$";

        String[] urls = {"https://www.example.com", "http://test.org/path",
                "www.google.com", "invalid", "ftp://wrong.com"};

        for (String url : urls) {
            boolean valid = url.matches(urlRegex);
            System.out.println(url + " -> " + (valid ? "VALID" : "INVALID"));
        }

        // ============================================
        // 6. Credit Card Validation (Basic)
        // ============================================
        System.out.println("\n===== 6. Credit Card Validation =====");

        // 16 digits, optionally with spaces or dashes
        String ccRegex = "^\\d{4}[- ]?\\d{4}[- ]?\\d{4}[- ]?\\d{4}$";

        String[] cards = {"1234567890123456", "1234-5678-9012-3456",
                "1234 5678 9012 3456", "123456789012", "1234-5678-9012"};

        for (String card : cards) {
            boolean valid = card.matches(ccRegex);
            System.out.println(card + " -> " + (valid ? "VALID" : "INVALID"));
        }

        // ============================================
        // 7. ZIP Code Validation
        // ============================================
        System.out.println("\n===== 7. ZIP Code Validation =====");

        // US: 12345 or 12345-6789
        String zipRegex = "^\\d{5}(-\\d{4})?$";

        String[] zips = {"12345", "12345-6789", "1234", "123456", "12345-678"};

        for (String zip : zips) {
            boolean valid = zip.matches(zipRegex);
            System.out.println(zip + " -> " + (valid ? "VALID" : "INVALID"));
        }

        // ============================================
        // 8. Username Validation
        // ============================================
        System.out.println("\n===== 8. Username Validation =====");

        // 3-16 chars, alphanumeric and underscore, must start with letter
        String usernameRegex = "^[a-zA-Z][a-zA-Z0-9_]{2,15}$";

        String[] usernames = {"john_doe", "user123", "ab", "1invalid", "valid_user_name"};

        for (String username : usernames) {
            boolean valid = username.matches(usernameRegex);
            System.out.println(username + " -> " + (valid ? "VALID" : "INVALID"));
        }

        // ============================================
        // 9. IP Address Validation
        // ============================================
        System.out.println("\n===== 9. IP Address Validation =====");

        String ipRegex = "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$";

        String[] ips = {"192.168.1.1", "255.255.255.255", "0.0.0.0", "256.1.1.1", "192.168.1"};

        for (String ip : ips) {
            boolean valid = ip.matches(ipRegex);
            System.out.println(ip + " -> " + (valid ? "VALID" : "INVALID"));
        }
    }
}

