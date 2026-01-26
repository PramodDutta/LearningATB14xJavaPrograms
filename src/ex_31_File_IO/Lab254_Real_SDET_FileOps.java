package ex_31_File_IO;

import java.io.*;
import java.nio.file.*;
import java.util.*;

/**
 * LAB 254: Real-World SDET File Operations
 * ========================================
 * Practical scenarios you'll encounter as SDET:
 * 1. Reading test data from files
 * 2. Writing test results
 * 3. Processing configuration files
 * 4. Log file analysis
 */
public class Lab254_Real_SDET_FileOps {

    public static void main(String[] args) {

        // ============================================
        // SCENARIO 1: Read Test Data from File
        // ============================================
        System.out.println("===== SCENARIO 1: Test Data Reader =====");

        // Create sample test data file first
        createTestDataFile();

        // Read and use test data
        List<String[]> testData = readTestData("src/ex_31_File_IO/login_testdata.csv");
        System.out.println("Test Data loaded: " + testData.size() + " test cases");

        for (String[] data : testData) {
            System.out.println("  Username: " + data[0] + ", Password: " + data[1] +
                    ", Expected: " + data[2]);
        }

        // ============================================
        // SCENARIO 2: Write Test Results
        // ============================================
        System.out.println("\n===== SCENARIO 2: Test Results Writer =====");

        List<TestResult> results = Arrays.asList(
                new TestResult("TC001", "Login Test", "PASSED", 2.5),
                new TestResult("TC002", "Search Test", "PASSED", 1.8),
                new TestResult("TC003", "Checkout Test", "FAILED", 5.2),
                new TestResult("TC004", "Payment Test", "PASSED", 3.1)
        );

        writeTestResults(results, "src/ex_31_File_IO/test_results.txt");

        // ============================================
        // SCENARIO 3: Properties File Reader
        // ============================================
        System.out.println("\n===== SCENARIO 3: Config Reader =====");

        createConfigFile();
        Map<String, String> config = readConfigFile("src/ex_31_File_IO/config.properties");

        System.out.println("Configuration loaded:");
        config.forEach((key, value) -> System.out.println("  " + key + " = " + value));

        // ============================================
        // SCENARIO 4: Log File Analyzer
        // ============================================
        System.out.println("\n===== SCENARIO 4: Log Analyzer =====");

        createSampleLogFile();
        analyzeLogFile("src/ex_31_File_IO/application.log");
    }

    // Helper method to create test data file
    static void createTestDataFile() {
        try {
            List<String> data = List.of(
                    "username,password,expected",
                    "admin,admin123,success",
                    "user1,pass123,success",
                    "invalid,wrong,failure",
                    "admin,wrongpass,failure"
            );
            Files.write(Paths.get("src/ex_31_File_IO/login_testdata.csv"), data);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Read CSV test data
    static List<String[]> readTestData(String filePath) {
        List<String[]> testData = new ArrayList<>();
        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;
            boolean isHeader = true;
            while ((line = reader.readLine()) != null) {
                if (isHeader) { isHeader = false; continue; }
                testData.add(line.split(","));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return testData;
    }

    // Write test results
    static void writeTestResults(List<TestResult> results, String filePath) {
        try (PrintWriter writer = new PrintWriter(new FileWriter(filePath))) {
            writer.println("========== TEST EXECUTION REPORT ==========");
            writer.println("Generated: " + new Date());
            writer.println("============================================\n");

            int passed = 0, failed = 0;
            for (TestResult r : results) {
                writer.printf("%s | %s | %s | %.2fs%n", r.id, r.name, r.status, r.duration);
                if (r.status.equals("PASSED")) passed++; else failed++;
            }
            writer.println("\n============================================");
            writer.printf("TOTAL: %d | PASSED: %d | FAILED: %d%n", results.size(), passed, failed);

            System.out.println("Test results written to: " + filePath);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Create config file
    static void createConfigFile() {
        try {
            List<String> config = List.of(
                    "browser=chrome", "baseUrl=https://example.com",
                    "timeout=30", "headless=false"
            );
            Files.write(Paths.get("src/ex_31_File_IO/config.properties"), config);
        } catch (IOException e) { e.printStackTrace(); }
    }

    // Read config file
    static Map<String, String> readConfigFile(String filePath) {
        Map<String, String> config = new HashMap<>();
        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = reader.readLine()) != null) {
                if (line.contains("=")) {
                    String[] parts = line.split("=", 2);
                    config.put(parts[0].trim(), parts[1].trim());
                }
            }
        } catch (IOException e) { e.printStackTrace(); }
        return config;
    }

    // Create sample log file
    static void createSampleLogFile() {
        try {
            List<String> logs = List.of(
                    "INFO: Application started", "INFO: User logged in",
                    "ERROR: Database connection failed", "WARN: Slow response time",
                    "INFO: Test executed", "ERROR: Element not found",
                    "INFO: Test completed"
            );
            Files.write(Paths.get("src/ex_31_File_IO/application.log"), logs);
        } catch (IOException e) { e.printStackTrace(); }
    }

    // Analyze log file
    static void analyzeLogFile(String filePath) {
        try {
            List<String> lines = Files.readAllLines(Paths.get(filePath));
            long errors = lines.stream().filter(l -> l.contains("ERROR")).count();
            long warnings = lines.stream().filter(l -> l.contains("WARN")).count();
            System.out.println("Log Analysis - Total: " + lines.size() +
                    ", Errors: " + errors + ", Warnings: " + warnings);
        } catch (IOException e) { e.printStackTrace(); }
    }

    // Inner class for test results
    static class TestResult {
        String id, name, status;
        double duration;
        TestResult(String id, String name, String status, double duration) {
            this.id = id; this.name = name; this.status = status; this.duration = duration;
        }
    }
}

