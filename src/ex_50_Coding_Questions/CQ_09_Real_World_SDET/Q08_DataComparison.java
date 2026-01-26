package ex_50_Coding_Questions.CQ_09_Real_World_SDET;

import java.util.*;

/**
 * Q08: Data Comparison Utility
 * ============================
 * DIFFICULTY: Medium
 * ASKED AT: SDET Interviews
 *
 * Problem: Compare two lists and find differences.
 * Real Use: Database comparison, API response validation.
 */
public class Q08_DataComparison {

    public static void main(String[] args) {
        List<String> list1 = Arrays.asList("apple", "banana", "cherry", "date");
        List<String> list2 = Arrays.asList("banana", "cherry", "elderberry", "fig");

        System.out.println("List 1: " + list1);
        System.out.println("List 2: " + list2);

        System.out.println("\n=== Comparison Results ===");
        ComparisonResult<String> result = compareLists(list1, list2);

        System.out.println("Only in List 1: " + result.onlyInFirst);
        System.out.println("Only in List 2: " + result.onlyInSecond);
        System.out.println("Common: " + result.common);

        System.out.println("\n=== Compare with Key ===");
        List<Map<String, Object>> users1 = Arrays.asList(
                Map.of("id", 1, "name", "John"),
                Map.of("id", 2, "name", "Jane"),
                Map.of("id", 3, "name", "Bob")
        );

        List<Map<String, Object>> users2 = Arrays.asList(
                Map.of("id", 2, "name", "Jane Updated"),
                Map.of("id", 3, "name", "Bob"),
                Map.of("id", 4, "name", "Alice")
        );

        compareByKey(users1, users2, "id");
    }

    // Comparison result holder
    static class ComparisonResult<T> {
        List<T> onlyInFirst = new ArrayList<>();
        List<T> onlyInSecond = new ArrayList<>();
        List<T> common = new ArrayList<>();
    }

    // ============================================
    // Compare Two Lists
    // ============================================
    public static <T> ComparisonResult<T> compareLists(List<T> list1, List<T> list2) {
        ComparisonResult<T> result = new ComparisonResult<>();

        Set<T> set1 = new HashSet<>(list1);
        Set<T> set2 = new HashSet<>(list2);

        // Only in first
        for (T item : list1) {
            if (!set2.contains(item)) {
                result.onlyInFirst.add(item);
            } else {
                result.common.add(item);
            }
        }

        // Only in second
        for (T item : list2) {
            if (!set1.contains(item)) {
                result.onlyInSecond.add(item);
            }
        }

        return result;
    }

    // ============================================
    // Compare Lists by Key Field
    // ============================================
    public static void compareByKey(List<Map<String, Object>> list1,
                                    List<Map<String, Object>> list2, String keyField) {
        Map<Object, Map<String, Object>> map1 = new HashMap<>();
        Map<Object, Map<String, Object>> map2 = new HashMap<>();

        list1.forEach(item -> map1.put(item.get(keyField), item));
        list2.forEach(item -> map2.put(item.get(keyField), item));

        System.out.println("Added: " + new HashSet<>(map2.keySet()) {{ removeAll(map1.keySet()); }});
        System.out.println("Removed: " + new HashSet<>(map1.keySet()) {{ removeAll(map2.keySet()); }});

        // Find modified
        for (Object key : map1.keySet()) {
            if (map2.containsKey(key) && !map1.get(key).equals(map2.get(key))) {
                System.out.println("Modified " + key + ": " + map1.get(key) + " -> " + map2.get(key));
            }
        }
    }
}

