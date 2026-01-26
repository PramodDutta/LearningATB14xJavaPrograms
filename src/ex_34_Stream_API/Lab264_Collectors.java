package ex_34_Stream_API;

import java.util.*;
import java.util.stream.Collectors;

/**
 * LAB 264: Collectors - Collecting Stream Results
 * ================================================
 * Topics: toList, toSet, toMap, groupingBy, joining, summarizing
 */
public class Lab264_Collectors {

    public static void main(String[] args) {

        List<TestResult> results = Arrays.asList(
                new TestResult("TC001", "Login", "PASSED", 2.5, "Smoke"),
                new TestResult("TC002", "Search", "PASSED", 1.8, "Regression"),
                new TestResult("TC003", "Checkout", "FAILED", 5.2, "Smoke"),
                new TestResult("TC004", "Payment", "PASSED", 3.1, "Smoke"),
                new TestResult("TC005", "Profile", "FAILED", 2.0, "Regression"),
                new TestResult("TC006", "Logout", "PASSED", 1.0, "Smoke")
        );

        // ============================================
        // 1. toList(), toSet()
        // ============================================
        System.out.println("===== 1. toList(), toSet() =====");

        List<String> testNames = results.stream()
                .map(TestResult::getName)
                .collect(Collectors.toList());
        System.out.println("Test names (List): " + testNames);

        Set<String> statuses = results.stream()
                .map(TestResult::getStatus)
                .collect(Collectors.toSet());
        System.out.println("Unique statuses (Set): " + statuses);

        // ============================================
        // 2. toMap()
        // ============================================
        System.out.println("\n===== 2. toMap() =====");

        // Map of testId -> status
        Map<String, String> idToStatus = results.stream()
                .collect(Collectors.toMap(
                        TestResult::getId,
                        TestResult::getStatus
                ));
        System.out.println("ID to Status: " + idToStatus);

        // Map of testId -> TestResult object
        Map<String, TestResult> idToResult = results.stream()
                .collect(Collectors.toMap(
                        TestResult::getId,
                        r -> r  // or Function.identity()
                ));
        System.out.println("TC001 duration: " + idToResult.get("TC001").getDuration());

        // ============================================
        // 3. groupingBy() - VERY USEFUL!
        // ============================================
        System.out.println("\n===== 3. groupingBy() =====");

        // Group by status
        Map<String, List<TestResult>> byStatus = results.stream()
                .collect(Collectors.groupingBy(TestResult::getStatus));

        System.out.println("Grouped by Status:");
        byStatus.forEach((status, tests) -> {
            System.out.println("  " + status + ": " + tests.size() + " tests");
        });

        // Group by suite
        Map<String, List<TestResult>> bySuite = results.stream()
                .collect(Collectors.groupingBy(TestResult::getSuite));

        System.out.println("\nGrouped by Suite:");
        bySuite.forEach((suite, tests) -> {
            System.out.println("  " + suite + ": " +
                    tests.stream().map(TestResult::getName).collect(Collectors.toList()));
        });

        // Count by status
        Map<String, Long> countByStatus = results.stream()
                .collect(Collectors.groupingBy(
                        TestResult::getStatus,
                        Collectors.counting()
                ));
        System.out.println("\nCount by Status: " + countByStatus);

        // ============================================
        // 4. joining()
        // ============================================
        System.out.println("\n===== 4. joining() =====");

        String allNames = results.stream()
                .map(TestResult::getName)
                .collect(Collectors.joining(", "));
        System.out.println("All tests: " + allNames);

        String formatted = results.stream()
                .map(TestResult::getName)
                .collect(Collectors.joining(" | ", "[", "]"));
        System.out.println("Formatted: " + formatted);

        // ============================================
        // 5. summarizing, averaging, summing
        // ============================================
        System.out.println("\n===== 5. Statistics =====");

        DoubleSummaryStatistics stats = results.stream()
                .collect(Collectors.summarizingDouble(TestResult::getDuration));

        System.out.println("Duration Statistics:");
        System.out.println("  Count: " + stats.getCount());
        System.out.println("  Sum: " + stats.getSum() + "s");
        System.out.println("  Min: " + stats.getMin() + "s");
        System.out.println("  Max: " + stats.getMax() + "s");
        System.out.println("  Avg: " + String.format("%.2f", stats.getAverage()) + "s");

        // Average duration
        double avgDuration = results.stream()
                .collect(Collectors.averagingDouble(TestResult::getDuration));
        System.out.println("\nAverage duration: " + avgDuration + "s");

        // ============================================
        // 6. partitioningBy() - Split into two groups
        // ============================================
        System.out.println("\n===== 6. partitioningBy() =====");

        Map<Boolean, List<TestResult>> passedPartition = results.stream()
                .collect(Collectors.partitioningBy(
                        r -> r.getStatus().equals("PASSED")
                ));

        System.out.println("Passed: " + passedPartition.get(true).size());
        System.out.println("Failed: " + passedPartition.get(false).size());
    }
}

class TestResult {
    private String id, name, status, suite;
    private double duration;

    public TestResult(String id, String name, String status, double duration, String suite) {
        this.id = id; this.name = name; this.status = status;
        this.duration = duration; this.suite = suite;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public String getStatus() { return status; }
    public double getDuration() { return duration; }
    public String getSuite() { return suite; }
}

