package ex_34_Stream_API;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

/**
 * LAB 262: Stream API Basics
 * ==========================
 * Topics Covered:
 * 1. What is Stream?
 * 2. Creating Streams
 * 3. Intermediate vs Terminal operations
 * 4. Stream pipeline
 *
 * WHY IMPORTANT FOR SDET?
 * - Processing test data collections
 * - Filtering and transforming API responses
 * - Generating test reports
 * - Data-driven testing
 */
public class Lab262_Stream_Basics {

    public static void main(String[] args) {

        // ============================================
        // PART 1: What is Stream?
        // ============================================
        System.out.println("===== WHAT IS STREAM? =====");
        System.out.println("Stream = sequence of elements supporting sequential/parallel operations");
        System.out.println("NOT a data structure - it's a pipeline for processing data");
        System.out.println("Streams are LAZY - operations execute only when terminal op is called");

        // ============================================
        // PART 2: Creating Streams
        // ============================================
        System.out.println("\n===== CREATING STREAMS =====");

        // From Collection
        List<String> list = Arrays.asList("Chrome", "Firefox", "Safari");
        Stream<String> streamFromList = list.stream();
        System.out.println("1. From Collection: " + streamFromList.count() + " elements");

        // From Array
        String[] array = {"Java", "Python", "JavaScript"};
        Stream<String> streamFromArray = Arrays.stream(array);
        System.out.println("2. From Array: " + streamFromArray.count() + " elements");

        // Using Stream.of()
        Stream<Integer> streamOf = Stream.of(1, 2, 3, 4, 5);
        System.out.println("3. Stream.of(): " + streamOf.count() + " elements");

        // Generate infinite stream (limited)
        Stream<Double> randomStream = Stream.generate(Math::random).limit(5);
        System.out.print("4. Generated: ");
        randomStream.forEach(n -> System.out.printf("%.2f ", n));
        System.out.println();

        // Iterate
        Stream<Integer> iterateStream = Stream.iterate(1, n -> n + 1).limit(5);
        System.out.print("5. Iterate: ");
        iterateStream.forEach(n -> System.out.print(n + " "));
        System.out.println();

        // ============================================
        // PART 3: Stream Pipeline
        // ============================================
        System.out.println("\n===== STREAM PIPELINE =====");
        System.out.println("Source -> Intermediate Ops -> Terminal Op");

        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // Pipeline example
        long count = numbers.stream()      // Source
                .filter(n -> n % 2 == 0)   // Intermediate: filter even
                .map(n -> n * n)           // Intermediate: square
                .count();                   // Terminal: count

        System.out.println("Even numbers squared count: " + count);

        // ============================================
        // PART 4: Intermediate Operations (Lazy)
        // ============================================
        System.out.println("\n===== INTERMEDIATE OPERATIONS =====");
        System.out.println("These are LAZY - don't execute until terminal op");

        List<String> browsers = Arrays.asList("Chrome", "Firefox", "Safari", "Edge", "Opera");

        // Demonstrating laziness
        System.out.println("\nWithout terminal operation (nothing prints):");
        browsers.stream()
                .filter(b -> {
                    System.out.println("Filtering: " + b);  // Won't print!
                    return b.length() > 5;
                });

        System.out.println("\nWith terminal operation (now it executes):");
        browsers.stream()
                .filter(b -> {
                    System.out.println("Filtering: " + b);
                    return b.length() > 5;
                })
                .forEach(b -> System.out.println("Result: " + b));

        // ============================================
        // PART 5: Terminal Operations
        // ============================================
        System.out.println("\n===== TERMINAL OPERATIONS =====");

        List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);

        // forEach - iterate
        System.out.print("forEach: ");
        nums.stream().forEach(n -> System.out.print(n + " "));
        System.out.println();

        // count - count elements
        System.out.println("count: " + nums.stream().count());

        // collect - collect to collection
        System.out.println("collect: " + nums.stream().filter(n -> n > 2).toList());

        // reduce - combine elements
        int sum = nums.stream().reduce(0, (a, b) -> a + b);
        System.out.println("reduce (sum): " + sum);

        // findFirst - get first element
        System.out.println("findFirst: " + nums.stream().findFirst().orElse(0));

        // anyMatch - check if any matches
        System.out.println("anyMatch (>3): " + nums.stream().anyMatch(n -> n > 3));

        // allMatch - check if all match
        System.out.println("allMatch (>0): " + nums.stream().allMatch(n -> n > 0));
    }
}

