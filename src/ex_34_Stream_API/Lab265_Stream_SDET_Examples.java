package ex_34_Stream_API;

import java.util.*;
import java.util.stream.Collectors;

/**
 * LAB 265: Real-World Stream API Examples for SDET
 * ================================================
 * Practical scenarios you'll encounter in automation
 */
public class Lab265_Stream_SDET_Examples {

    public static void main(String[] args) {

        // ============================================
        // SCENARIO 1: Filter Failed Tests
        // ============================================
        System.out.println("===== SCENARIO 1: Filter Failed Tests =====");

        List<Map<String, Object>> testResults = new ArrayList<>();
        testResults.add(Map.of("name", "LoginTest", "status", "PASSED", "duration", 2.5));
        testResults.add(Map.of("name", "SearchTest", "status", "FAILED", "duration", 3.1));
        testResults.add(Map.of("name", "CartTest", "status", "PASSED", "duration", 1.8));
        testResults.add(Map.of("name", "PaymentTest", "status", "FAILED", "duration", 4.2));

        List<String> failedTests = testResults.stream()
                .filter(t -> t.get("status").equals("FAILED"))
                .map(t -> (String) t.get("name"))
                .collect(Collectors.toList());

        System.out.println("Failed Tests: " + failedTests);

        // ============================================
        // SCENARIO 2: API Response Processing
        // ============================================
        System.out.println("\n===== SCENARIO 2: API Response Processing =====");

        // Simulating API response - list of users
        List<Map<String, Object>> users = Arrays.asList(
                Map.of("id", 1, "name", "John", "active", true, "role", "admin"),
                Map.of("id", 2, "name", "Alice", "active", false, "role", "user"),
                Map.of("id", 3, "name", "Bob", "active", true, "role", "user"),
                Map.of("id", 4, "name", "Charlie", "active", true, "role", "admin")
        );

        // Get active admin users
        List<String> activeAdmins = users.stream()
                .filter(u -> (Boolean) u.get("active"))
                .filter(u -> u.get("role").equals("admin"))
                .map(u -> (String) u.get("name"))
                .collect(Collectors.toList());

        System.out.println("Active Admins: " + activeAdmins);

        // ============================================
        // SCENARIO 3: Test Data Generation
        // ============================================
        System.out.println("\n===== SCENARIO 3: Test Data Generation =====");

        // Generate 5 unique usernames
        List<String> usernames = java.util.stream.IntStream.rangeClosed(1, 5)
                .mapToObj(i -> "testuser_" + i)
                .collect(Collectors.toList());
        System.out.println("Generated usernames: " + usernames);

        // Generate random emails
        List<String> emails = java.util.stream.IntStream.rangeClosed(1, 3)
                .mapToObj(i -> "test" + (int)(Math.random()*1000) + "@test.com")
                .collect(Collectors.toList());
        System.out.println("Generated emails: " + emails);

        // ============================================
        // SCENARIO 4: Find Element in List
        // ============================================
        System.out.println("\n===== SCENARIO 4: Find Element =====");

        List<String> browsers = Arrays.asList("Chrome", "Firefox", "Safari", "Edge");

        // Find first browser starting with 'S'
        Optional<String> found = browsers.stream()
                .filter(b -> b.startsWith("S"))
                .findFirst();

        System.out.println("Found: " + found.orElse("Not found"));

        // Check if any browser is "Chrome"
        boolean hasChrome = browsers.stream().anyMatch(b -> b.equals("Chrome"));
        System.out.println("Has Chrome: " + hasChrome);

        // ============================================
        // SCENARIO 5: Calculate Test Metrics
        // ============================================
        System.out.println("\n===== SCENARIO 5: Test Metrics =====");

        List<Double> durations = Arrays.asList(2.5, 3.1, 1.8, 4.2, 2.0, 3.5);

        double total = durations.stream().mapToDouble(Double::doubleValue).sum();
        double avg = durations.stream().mapToDouble(Double::doubleValue).average().orElse(0);
        double max = durations.stream().mapToDouble(Double::doubleValue).max().orElse(0);
        double min = durations.stream().mapToDouble(Double::doubleValue).min().orElse(0);

        System.out.printf("Total: %.2fs, Avg: %.2fs, Max: %.2fs, Min: %.2fs%n",
                total, avg, max, min);

        // ============================================
        // SCENARIO 6: Remove Duplicates & Sort
        // ============================================
        System.out.println("\n===== SCENARIO 6: Remove Duplicates =====");

        List<String> tags = Arrays.asList("smoke", "regression", "smoke", "sanity", "regression");

        List<String> uniqueSorted = tags.stream()
                .distinct()
                .sorted()
                .collect(Collectors.toList());

        System.out.println("Unique sorted tags: " + uniqueSorted);

        // ============================================
        // SCENARIO 7: Flatten Nested List
        // ============================================
        System.out.println("\n===== SCENARIO 7: Flatten Nested List =====");

        List<List<String>> nestedTests = Arrays.asList(
                Arrays.asList("Login", "Logout"),
                Arrays.asList("Search", "Filter"),
                Arrays.asList("Cart", "Checkout", "Payment")
        );

        List<String> flatList = nestedTests.stream()
                .flatMap(List::stream)
                .collect(Collectors.toList());

        System.out.println("Flattened: " + flatList);

        // ============================================
        // SCENARIO 8: Create Test Report Summary
        // ============================================
        System.out.println("\n===== SCENARIO 8: Test Report =====");

        Map<String, Long> summary = testResults.stream()
                .collect(Collectors.groupingBy(
                        t -> (String) t.get("status"),
                        Collectors.counting()
                ));

        long totalTests = testResults.size();
        long passed = summary.getOrDefault("PASSED", 0L);
        long failed = summary.getOrDefault("FAILED", 0L);
        double passRate = (passed * 100.0) / totalTests;

        System.out.println("=== TEST REPORT ===");
        System.out.println("Total: " + totalTests);
        System.out.println("Passed: " + passed);
        System.out.println("Failed: " + failed);
        System.out.printf("Pass Rate: %.1f%%%n", passRate);
    }
}

