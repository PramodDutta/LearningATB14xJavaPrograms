package ex_50_Coding_Questions.CQ_09_Real_World_SDET;

import java.io.*;
import java.util.*;

/**
 * Q01: Parse CSV File
 * ===================
 * DIFFICULTY: Easy
 * ASKED AT: SDET Interviews (Very Common)
 *
 * Problem: Read and parse CSV file, extract specific columns.
 * Real Use: Test data management, data-driven testing.
 */
public class Q01_ParseCSV {

    public static void main(String[] args) {
        // Sample CSV content
        String csvContent = """
                name,email,age,city
                John,john@test.com,25,New York
                Jane,jane@test.com,30,Los Angeles
                Bob,bob@test.com,35,Chicago
                """;

        System.out.println("=== Parse CSV ===");
        List<Map<String, String>> data = parseCSV(csvContent);
        data.forEach(System.out::println);

        System.out.println("\n=== Extract Column ===");
        List<String> emails = extractColumn(data, "email");
        System.out.println("Emails: " + emails);

        System.out.println("\n=== Filter by Condition ===");
        List<Map<String, String>> filtered = filterByAge(data, 28);
        filtered.forEach(System.out::println);
    }

    // Parse CSV string to List of Maps
    public static List<Map<String, String>> parseCSV(String csvContent) {
        List<Map<String, String>> result = new ArrayList<>();
        String[] lines = csvContent.trim().split("\n");

        if (lines.length < 2) return result;

        String[] headers = lines[0].split(",");

        for (int i = 1; i < lines.length; i++) {
            String[] values = lines[i].split(",");
            Map<String, String> row = new LinkedHashMap<>();

            for (int j = 0; j < headers.length && j < values.length; j++) {
                row.put(headers[j].trim(), values[j].trim());
            }

            result.add(row);
        }

        return result;
    }

    // Extract specific column
    public static List<String> extractColumn(List<Map<String, String>> data, String column) {
        List<String> values = new ArrayList<>();
        for (Map<String, String> row : data) {
            if (row.containsKey(column)) {
                values.add(row.get(column));
            }
        }
        return values;
    }

    // Filter rows by age condition
    public static List<Map<String, String>> filterByAge(List<Map<String, String>> data, int minAge) {
        List<Map<String, String>> filtered = new ArrayList<>();
        for (Map<String, String> row : data) {
            int age = Integer.parseInt(row.getOrDefault("age", "0"));
            if (age >= minAge) {
                filtered.add(row);
            }
        }
        return filtered;
    }
}

