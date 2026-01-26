package ex_33_Lambda_Functional;

import java.util.Arrays;
import java.util.List;

/**
 * LAB 259: Lambda Expressions Basics
 * ==================================
 * Topics Covered:
 * 1. What is Lambda Expression?
 * 2. Syntax: (parameters) -> expression
 * 3. Lambda vs Anonymous class
 * 4. Functional Interface requirement
 *
 * WHY IMPORTANT FOR SDET?
 * - Modern Java code in frameworks
 * - Stream API operations
 * - Cleaner, more readable test code
 * - Used extensively in Selenium 4, RestAssured
 */
public class Lab259_Lambda_Basics {

    public static void main(String[] args) {

        // ============================================
        // PART 1: Before Lambda (Anonymous Class)
        // ============================================
        System.out.println("===== BEFORE LAMBDA =====");

        // Old way - Anonymous inner class
        Runnable oldWay = new Runnable() {
            @Override
            public void run() {
                System.out.println("Hello from anonymous class!");
            }
        };
        oldWay.run();

        // ============================================
        // PART 2: With Lambda Expression
        // ============================================
        System.out.println("\n===== WITH LAMBDA =====");

        // Lambda way - much cleaner!
        Runnable newWay = () -> System.out.println("Hello from lambda!");
        newWay.run();

        // ============================================
        // PART 3: Lambda Syntax Variations
        // ============================================
        System.out.println("\n===== LAMBDA SYNTAX =====");

        // No parameters
        Greeting noParam = () -> System.out.println("Hello!");
        noParam.sayHello();

        // One parameter (parentheses optional)
        Printer oneParam = message -> System.out.println("Message: " + message);
        oneParam.print("Testing Lambda");

        // Multiple parameters
        Calculator twoParams = (a, b) -> a + b;
        System.out.println("Sum: " + twoParams.calculate(10, 20));

        // Multiple statements (need curly braces and return)
        Calculator multiLine = (a, b) -> {
            int result = a + b;
            System.out.println("Calculating: " + a + " + " + b);
            return result;
        };
        System.out.println("Result: " + multiLine.calculate(5, 3));

        // ============================================
        // PART 4: Lambda with Collections
        // ============================================
        System.out.println("\n===== LAMBDA WITH COLLECTIONS =====");

        List<String> browsers = Arrays.asList("Chrome", "Firefox", "Safari", "Edge");

        // Old way - for loop
        System.out.println("Old way:");
        for (String browser : browsers) {
            System.out.println("  " + browser);
        }

        // Lambda way - forEach
        System.out.println("\nLambda way:");
        browsers.forEach(browser -> System.out.println("  " + browser));

        // Method reference (even shorter)
        System.out.println("\nMethod reference:");
        browsers.forEach(System.out::println);

        // ============================================
        // PART 5: Lambda for Sorting
        // ============================================
        System.out.println("\n===== LAMBDA FOR SORTING =====");

        List<String> names = Arrays.asList("John", "Alice", "Bob", "Charlie");

        // Sort alphabetically
        names.sort((a, b) -> a.compareTo(b));
        System.out.println("Sorted: " + names);

        // Sort by length
        names.sort((a, b) -> a.length() - b.length());
        System.out.println("By length: " + names);

        // Using Comparator method reference
        names.sort(String::compareTo);
        System.out.println("Method ref: " + names);

        // ============================================
        // PART 6: Custom Functional Interface
        // ============================================
        System.out.println("\n===== CUSTOM FUNCTIONAL INTERFACE =====");

        // Test validator using lambda
        TestValidator validator = (testName, status) ->
                testName + " - " + (status ? "PASSED ✓" : "FAILED ✗");

        System.out.println(validator.validate("Login Test", true));
        System.out.println(validator.validate("Payment Test", false));
    }
}

// Functional Interfaces (single abstract method)
@FunctionalInterface
interface Greeting {
    void sayHello();
}

@FunctionalInterface
interface Printer {
    void print(String message);
}

@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);
}

@FunctionalInterface
interface TestValidator {
    String validate(String testName, boolean passed);
}

