package ex_50_Coding_Questions.CQ_09_Real_World_SDET;

import java.util.*;
import java.util.regex.*;

/**
 * Q04: Log File Parser
 * ====================
 * DIFFICULTY: Medium
 * ASKED AT: SDET Interviews
 *
 * Problem: Parse log files and extract information.
 * Real Use: Test failure analysis, debugging.
 */
public class Q04_LogParser {

    public static void main(String[] args) {
        String logs = """
                2024-01-15 10:30:45 INFO  UserService - User login successful: user123
                2024-01-15 10:30:46 ERROR PaymentService - Payment failed: insufficient funds
                2024-01-15 10:30:47 WARN  CacheService - Cache miss for key: product_456
                2024-01-15 10:30:48 INFO  OrderService - Order created: ORD-789
                2024-01-15 10:30:49 ERROR DatabaseService - Connection timeout
                2024-01-15 10:30:50 INFO  UserService - User logout: user123
                """;

        System.out.println("=== Parse Logs ===");
        List<LogEntry> entries = parseLogs(logs);
        entries.forEach(System.out::println);

        System.out.println("\n=== Filter by Level ===");
        List<LogEntry> errors = filterByLevel(entries, "ERROR");
        errors.forEach(System.out::println);

        System.out.println("\n=== Count by Level ===");
        Map<String, Long> counts = countByLevel(entries);
        counts.forEach((level, count) -> System.out.println(level + ": " + count));
    }

    // Log entry class
    static class LogEntry {
        String timestamp;
        String level;
        String service;
        String message;

        @Override
        public String toString() {
            return String.format("[%s] %s - %s: %s", level, timestamp, service, message);
        }
    }

    // Parse log lines
    public static List<LogEntry> parseLogs(String logs) {
        List<LogEntry> entries = new ArrayList<>();
        Pattern pattern = Pattern.compile(
                "(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}) (\\w+)\\s+(\\w+) - (.+)");

        for (String line : logs.trim().split("\n")) {
            Matcher matcher = pattern.matcher(line);
            if (matcher.matches()) {
                LogEntry entry = new LogEntry();
                entry.timestamp = matcher.group(1);
                entry.level = matcher.group(2);
                entry.service = matcher.group(3);
                entry.message = matcher.group(4);
                entries.add(entry);
            }
        }

        return entries;
    }

    // Filter by log level
    public static List<LogEntry> filterByLevel(List<LogEntry> entries, String level) {
        List<LogEntry> filtered = new ArrayList<>();
        for (LogEntry entry : entries) {
            if (entry.level.equalsIgnoreCase(level)) {
                filtered.add(entry);
            }
        }
        return filtered;
    }

    // Count by level
    public static Map<String, Long> countByLevel(List<LogEntry> entries) {
        Map<String, Long> counts = new LinkedHashMap<>();
        for (LogEntry entry : entries) {
            counts.merge(entry.level, 1L, Long::sum);
        }
        return counts;
    }
}

