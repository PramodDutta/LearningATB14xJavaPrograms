package ex_33_Lambda_Functional;

import java.util.Arrays;
import java.util.List;
import java.util.function.*;

/**
 * LAB 260: Built-in Functional Interfaces
 * =======================================
 * Topics Covered:
 * 1. Predicate<T> - test condition, returns boolean
 * 2. Consumer<T> - accepts input, returns nothing
 * 3. Supplier<T> - no input, returns value
 * 4. Function<T,R> - accepts input, returns output
 *
 * WHY IMPORTANT FOR SDET?
 * - Used in Stream API filtering
 * - Custom wait conditions in Selenium
 * - Data transformation in tests
 */
public class Lab260_Functional_Interfaces {

    public static void main(String[] args) {

        // ============================================
        // 1. PREDICATE - Test a condition
        // ============================================
        System.out.println("===== 1. PREDICATE =====");

        // Predicate returns boolean
        Predicate<Integer> isPositive = num -> num > 0;
        Predicate<Integer> isEven = num -> num % 2 == 0;
        Predicate<String> isEmpty = str -> str == null || str.isEmpty();

        System.out.println("Is 5 positive? " + isPositive.test(5));
        System.out.println("Is 4 even? " + isEven.test(4));
        System.out.println("Is '' empty? " + isEmpty.test(""));

        // Combining predicates
        Predicate<Integer> isPositiveAndEven = isPositive.and(isEven);
        System.out.println("Is 6 positive AND even? " + isPositiveAndEven.test(6));

        // SDET Example: Validate test status
        Predicate<String> isPassed = status -> status.equalsIgnoreCase("PASSED");
        List<String> results = Arrays.asList("PASSED", "FAILED", "PASSED", "PASSED");
        long passedCount = results.stream().filter(isPassed).count();
        System.out.println("Passed tests: " + passedCount);

        // ============================================
        // 2. CONSUMER - Accept and process
        // ============================================
        System.out.println("\n===== 2. CONSUMER =====");

        // Consumer accepts input, returns nothing
        Consumer<String> printUpper = str -> System.out.println(str.toUpperCase());
        Consumer<String> printLength = str -> System.out.println("Length: " + str.length());

        printUpper.accept("hello");

        // Chaining consumers
        Consumer<String> combined = printUpper.andThen(printLength);
        combined.accept("testing");

        // SDET Example: Log test results
        Consumer<String> logResult = result ->
                System.out.println("[LOG] Test Result: " + result);

        List<String> testResults = Arrays.asList("Login-PASS", "Search-FAIL", "Checkout-PASS");
        testResults.forEach(logResult);

        // ============================================
        // 3. SUPPLIER - Provide values
        // ============================================
        System.out.println("\n===== 3. SUPPLIER =====");

        // Supplier returns value, takes no input
        Supplier<Double> randomNumber = () -> Math.random();
        Supplier<String> currentTime = () -> java.time.LocalTime.now().toString();

        System.out.println("Random: " + randomNumber.get());
        System.out.println("Time: " + currentTime.get());

        // SDET Example: Generate test data
        Supplier<String> generateUsername = () -> "user_" + System.currentTimeMillis();
        Supplier<String> generateEmail = () -> "test" + (int)(Math.random()*1000) + "@test.com";

        System.out.println("Generated username: " + generateUsername.get());
        System.out.println("Generated email: " + generateEmail.get());

        // ============================================
        // 4. FUNCTION - Transform data
        // ============================================
        System.out.println("\n===== 4. FUNCTION =====");

        // Function<Input, Output>
        Function<String, Integer> stringLength = str -> str.length();
        Function<Integer, Integer> square = num -> num * num;
        Function<String, String> toUpper = str -> str.toUpperCase();

        System.out.println("Length of 'Hello': " + stringLength.apply("Hello"));
        System.out.println("Square of 5: " + square.apply(5));

        // Chaining functions
        Function<String, Integer> getLengthThenSquare = stringLength.andThen(square);
        System.out.println("Length of 'Test' squared: " + getLengthThenSquare.apply("Test"));

        // SDET Example: Transform API response
        Function<String, String> extractStatus = response -> {
            // Simulate extracting status from JSON
            if (response.contains("success")) return "PASSED";
            return "FAILED";
        };

        System.out.println("Status: " + extractStatus.apply("{\"result\": \"success\"}"));

        // ============================================
        // 5. BiFunction, BiPredicate, BiConsumer
        // ============================================
        System.out.println("\n===== 5. BI-VARIANTS =====");

        // BiFunction - two inputs
        BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;
        System.out.println("Add 10 + 20: " + add.apply(10, 20));

        // BiPredicate - two inputs, boolean output
        BiPredicate<String, String> equals = (a, b) -> a.equals(b);
        System.out.println("'test' equals 'test': " + equals.test("test", "test"));

        // BiConsumer - two inputs, no output
        BiConsumer<String, Integer> printRepeat = (str, times) -> {
            for (int i = 0; i < times; i++) System.out.print(str + " ");
            System.out.println();
        };
        printRepeat.accept("Hello", 3);
    }
}

