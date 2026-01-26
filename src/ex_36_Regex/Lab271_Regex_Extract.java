package ex_36_Regex;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * LAB 271: Regex for Data Extraction - SDET Essential
 * ====================================================
 * Extracting data from strings, logs, API responses
 */
public class Lab271_Regex_Extract {

    public static void main(String[] args) {

        // ============================================
        // 1. Extract All Emails from Text
        // ============================================
        System.out.println("===== 1. Extract Emails =====");

        String text1 = "Contact us at support@example.com or sales@company.org for help.";
        List<String> emails = extractAll(text1, "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}");
        System.out.println("Emails found: " + emails);

        // ============================================
        // 2. Extract Numbers from String
        // ============================================
        System.out.println("\n===== 2. Extract Numbers =====");

        String text2 = "Order #12345 contains 3 items totaling $99.99";
        List<String> numbers = extractAll(text2, "\\d+\\.?\\d*");
        System.out.println("Numbers found: " + numbers);

        // ============================================
        // 3. Extract URLs from Text
        // ============================================
        System.out.println("\n===== 3. Extract URLs =====");

        String text3 = "Visit https://www.google.com or http://example.org for more info.";
        List<String> urls = extractAll(text3, "https?://[\\w.-]+\\.[a-z]{2,}[/\\w.-]*");
        System.out.println("URLs found: " + urls);

        // ============================================
        // 4. Extract Data from Log Entry
        // ============================================
        System.out.println("\n===== 4. Parse Log Entry =====");

        String logEntry = "[2024-06-15 14:30:45] ERROR: User 'john_doe' failed login from IP 192.168.1.100";

        // Extract timestamp
        String timestamp = extractFirst(logEntry, "\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}");
        System.out.println("Timestamp: " + timestamp);

        // Extract log level
        String level = extractFirst(logEntry, "\\b(ERROR|WARN|INFO|DEBUG)\\b");
        System.out.println("Level: " + level);

        // Extract username
        String username = extractFirst(logEntry, "'([^']+)'");
        System.out.println("Username: " + username);

        // Extract IP
        String ip = extractFirst(logEntry, "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}");
        System.out.println("IP: " + ip);

        // ============================================
        // 5. Extract from API Response (JSON-like)
        // ============================================
        System.out.println("\n===== 5. Extract from Response =====");

        String response = "{\"id\": 12345, \"name\": \"John Doe\", \"email\": \"john@test.com\", \"status\": \"active\"}";

        String id = extractFirst(response, "\"id\":\\s*(\\d+)");
        String name = extractFirst(response, "\"name\":\\s*\"([^\"]+)\"");
        String email = extractFirst(response, "\"email\":\\s*\"([^\"]+)\"");

        System.out.println("ID: " + id);
        System.out.println("Name: " + name);
        System.out.println("Email: " + email);

        // ============================================
        // 6. Extract with Named Groups
        // ============================================
        System.out.println("\n===== 6. Named Groups =====");

        String orderText = "Order ID: ORD-2024-001, Customer: John Smith, Amount: $150.00";

        Pattern orderPattern = Pattern.compile(
                "Order ID: (?<orderId>[\\w-]+), Customer: (?<customer>[\\w ]+), Amount: \\$(?<amount>[\\d.]+)"
        );
        Matcher orderMatcher = orderPattern.matcher(orderText);

        if (orderMatcher.find()) {
            System.out.println("Order ID: " + orderMatcher.group("orderId"));
            System.out.println("Customer: " + orderMatcher.group("customer"));
            System.out.println("Amount: $" + orderMatcher.group("amount"));
        }

        // ============================================
        // 7. Replace with Regex
        // ============================================
        System.out.println("\n===== 7. Replace with Regex =====");

        // Mask credit card number
        String ccText = "Card: 1234-5678-9012-3456";
        String masked = ccText.replaceAll("\\d{4}-\\d{4}-\\d{4}-(\\d{4})", "****-****-****-$1");
        System.out.println("Masked: " + masked);

        // Remove extra spaces
        String spacey = "Hello    World   Java";
        String cleaned = spacey.replaceAll("\\s+", " ");
        System.out.println("Cleaned: " + cleaned);

        // Format phone number
        String phone = "1234567890";
        String formatted = phone.replaceAll("(\\d{3})(\\d{3})(\\d{4})", "($1) $2-$3");
        System.out.println("Formatted phone: " + formatted);

        // ============================================
        // 8. Split with Regex
        // ============================================
        System.out.println("\n===== 8. Split with Regex =====");

        String csv = "apple,banana;orange|grape";
        String[] fruits = csv.split("[,;|]");
        System.out.println("Fruits:");
        for (String fruit : fruits) {
            System.out.println("  - " + fruit);
        }
    }

    // Helper: Extract all matches
    static List<String> extractAll(String text, String regex) {
        List<String> matches = new ArrayList<>();
        Matcher matcher = Pattern.compile(regex).matcher(text);
        while (matcher.find()) {
            matches.add(matcher.group(matcher.groupCount() > 0 ? 1 : 0));
        }
        return matches;
    }

    // Helper: Extract first match (group 1 if exists, else group 0)
    static String extractFirst(String text, String regex) {
        Matcher matcher = Pattern.compile(regex).matcher(text);
        if (matcher.find()) {
            return matcher.groupCount() > 0 ? matcher.group(1) : matcher.group(0);
        }
        return null;
    }
}

