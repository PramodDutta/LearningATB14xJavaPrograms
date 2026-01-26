package ex_50_Coding_Questions.CQ_09_Real_World_SDET;

import java.util.*;

/**
 * Q07: Configuration Parser
 * =========================
 * DIFFICULTY: Easy
 * ASKED AT: SDET Interviews
 *
 * Problem: Parse configuration from different formats.
 * Real Use: Test configuration, environment setup.
 */
public class Q07_ConfigParser {

    public static void main(String[] args) {
        // Properties format
        String propertiesContent = """
                app.name=TestApp
                app.version=1.0.0
                db.host=localhost
                db.port=5432
                db.name=testdb
                """;

        System.out.println("=== Parse Properties ===");
        Map<String, String> props = parseProperties(propertiesContent);
        props.forEach((k, v) -> System.out.println(k + " = " + v));

        System.out.println("\n=== Get Nested Config ===");
        Map<String, Map<String, String>> nested = groupByPrefix(props);
        nested.forEach((prefix, values) -> {
            System.out.println(prefix + ":");
            values.forEach((k, v) -> System.out.println("  " + k + " = " + v));
        });

        System.out.println("\n=== Environment Variables ===");
        String envValue = getConfigValue("PATH", "default_path");
        System.out.println("PATH: " + envValue.substring(0, Math.min(50, envValue.length())) + "...");
    }

    // ============================================
    // Parse Properties Format
    // ============================================
    public static Map<String, String> parseProperties(String content) {
        Map<String, String> properties = new LinkedHashMap<>();

        for (String line : content.trim().split("\n")) {
            line = line.trim();

            // Skip empty lines and comments
            if (line.isEmpty() || line.startsWith("#")) continue;

            int equalsIndex = line.indexOf('=');
            if (equalsIndex > 0) {
                String key = line.substring(0, equalsIndex).trim();
                String value = line.substring(equalsIndex + 1).trim();
                properties.put(key, value);
            }
        }

        return properties;
    }

    // ============================================
    // Group Properties by Prefix
    // ============================================
    public static Map<String, Map<String, String>> groupByPrefix(Map<String, String> properties) {
        Map<String, Map<String, String>> grouped = new LinkedHashMap<>();

        for (Map.Entry<String, String> entry : properties.entrySet()) {
            String key = entry.getKey();
            int dotIndex = key.indexOf('.');

            if (dotIndex > 0) {
                String prefix = key.substring(0, dotIndex);
                String subKey = key.substring(dotIndex + 1);

                grouped.computeIfAbsent(prefix, k -> new LinkedHashMap<>())
                        .put(subKey, entry.getValue());
            }
        }

        return grouped;
    }

    // ============================================
    // Get Config with Default
    // ============================================
    public static String getConfigValue(String key, String defaultValue) {
        String value = System.getenv(key);
        return (value != null && !value.isEmpty()) ? value : defaultValue;
    }
}

