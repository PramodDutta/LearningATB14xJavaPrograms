package ex_50_Coding_Questions.CQ_09_Real_World_SDET;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Q13: Collection Utilities
 * =========================
 * DIFFICULTY: Easy
 * ASKED AT: SDET Interviews
 *
 * Problem: Common collection operations for testing.
 * Real Use: Data manipulation, test assertions.
 */
public class Q13_CollectionUtils {

    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(5, 2, 8, 1, 9, 3, 7, 4, 6);
        List<String> names = Arrays.asList("John", "Jane", "Bob", "Alice", "John");

        System.out.println("=== Collection Utilities ===\n");

        System.out.println("Numbers: " + numbers);
        System.out.println("Sorted: " + sortList(numbers));
        System.out.println("Reversed: " + reverseList(numbers));
        System.out.println("Max: " + findMax(numbers));
        System.out.println("Min: " + findMin(numbers));
        System.out.println("Sum: " + sum(numbers));
        System.out.println("Average: " + average(numbers));

        System.out.println("\nNames: " + names);
        System.out.println("Unique: " + removeDuplicates(names));
        System.out.println("Frequency: " + frequency(names));

        System.out.println("\n=== Partition ===");
        Map<Boolean, List<Integer>> partitioned = partition(numbers, n -> n > 5);
        System.out.println("Greater than 5: " + partitioned.get(true));
        System.out.println("Less or equal 5: " + partitioned.get(false));
    }

    // Sort list
    public static <T extends Comparable<T>> List<T> sortList(List<T> list) {
        return list.stream().sorted().collect(Collectors.toList());
    }

    // Reverse list
    public static <T> List<T> reverseList(List<T> list) {
        List<T> reversed = new ArrayList<>(list);
        Collections.reverse(reversed);
        return reversed;
    }

    // Find max
    public static <T extends Comparable<T>> T findMax(List<T> list) {
        return Collections.max(list);
    }

    // Find min
    public static <T extends Comparable<T>> T findMin(List<T> list) {
        return Collections.min(list);
    }

    // Sum of integers
    public static int sum(List<Integer> list) {
        return list.stream().mapToInt(Integer::intValue).sum();
    }

    // Average
    public static double average(List<Integer> list) {
        return list.stream().mapToInt(Integer::intValue).average().orElse(0);
    }

    // Remove duplicates
    public static <T> List<T> removeDuplicates(List<T> list) {
        return new ArrayList<>(new LinkedHashSet<>(list));
    }

    // Frequency count
    public static <T> Map<T, Long> frequency(List<T> list) {
        return list.stream()
                .collect(Collectors.groupingBy(e -> e, Collectors.counting()));
    }

    // Partition by condition
    public static <T> Map<Boolean, List<T>> partition(List<T> list, java.util.function.Predicate<T> predicate) {
        return list.stream().collect(Collectors.partitioningBy(predicate));
    }

    // Chunk list into smaller lists
    public static <T> List<List<T>> chunk(List<T> list, int size) {
        List<List<T>> chunks = new ArrayList<>();
        for (int i = 0; i < list.size(); i += size) {
            chunks.add(list.subList(i, Math.min(i + size, list.size())));
        }
        return chunks;
    }

    // Flatten nested list
    public static <T> List<T> flatten(List<List<T>> nestedList) {
        return nestedList.stream()
                .flatMap(List::stream)
                .collect(Collectors.toList());
    }
}

