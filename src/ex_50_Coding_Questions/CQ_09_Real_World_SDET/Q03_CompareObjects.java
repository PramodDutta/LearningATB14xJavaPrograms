package ex_50_Coding_Questions.CQ_09_Real_World_SDET;

import java.util.*;

/**
 * Q03: Compare Two Objects/Maps
 * =============================
 * DIFFICULTY: Medium
 * ASKED AT: SDET Interviews
 *
 * Problem: Compare two objects and find differences.
 * Real Use: API response comparison, data validation.
 */
public class Q03_CompareObjects {

    public static void main(String[] args) {
        Map<String, Object> expected = new LinkedHashMap<>();
        expected.put("name", "John");
        expected.put("age", 25);
        expected.put("city", "New York");
        expected.put("active", true);

        Map<String, Object> actual = new LinkedHashMap<>();
        actual.put("name", "John");
        actual.put("age", 26);  // Different
        actual.put("city", "New York");
        actual.put("status", "active");  // Extra field

        System.out.println("Expected: " + expected);
        System.out.println("Actual: " + actual);
        System.out.println();

        List<String> differences = compareObjects(expected, actual);

        System.out.println("=== Differences ===");
        differences.forEach(System.out::println);
    }

    // ============================================
    // Compare Two Maps and Find Differences
    // ============================================
    public static List<String> compareObjects(Map<String, Object> expected, Map<String, Object> actual) {
        List<String> differences = new ArrayList<>();

        // Check expected keys
        for (String key : expected.keySet()) {
            if (!actual.containsKey(key)) {
                differences.add("MISSING: Key '" + key + "' not found in actual");
            } else if (!Objects.equals(expected.get(key), actual.get(key))) {
                differences.add("MISMATCH: Key '" + key + "' - Expected: " +
                        expected.get(key) + ", Actual: " + actual.get(key));
            }
        }

        // Check for extra keys in actual
        for (String key : actual.keySet()) {
            if (!expected.containsKey(key)) {
                differences.add("EXTRA: Key '" + key + "' found in actual but not expected");
            }
        }

        return differences;
    }

    // ============================================
    // Deep Compare (Nested Objects)
    // ============================================
    @SuppressWarnings("unchecked")
    public static List<String> deepCompare(Map<String, Object> expected, Map<String, Object> actual, String path) {
        List<String> differences = new ArrayList<>();

        for (String key : expected.keySet()) {
            String currentPath = path.isEmpty() ? key : path + "." + key;

            if (!actual.containsKey(key)) {
                differences.add("MISSING: " + currentPath);
            } else {
                Object expVal = expected.get(key);
                Object actVal = actual.get(key);

                if (expVal instanceof Map && actVal instanceof Map) {
                    differences.addAll(deepCompare((Map<String, Object>) expVal,
                            (Map<String, Object>) actVal, currentPath));
                } else if (!Objects.equals(expVal, actVal)) {
                    differences.add("MISMATCH: " + currentPath + " - Expected: " + expVal + ", Actual: " + actVal);
                }
            }
        }

        return differences;
    }
}

