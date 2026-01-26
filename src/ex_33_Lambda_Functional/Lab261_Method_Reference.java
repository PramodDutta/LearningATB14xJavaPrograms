package ex_33_Lambda_Functional;

import java.util.Arrays;
import java.util.List;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.function.Supplier;

/**
 * LAB 261: Method References
 * ==========================
 * Topics Covered:
 * 1. Static method reference - ClassName::staticMethod
 * 2. Instance method reference - object::instanceMethod
 * 3. Instance method of arbitrary object - ClassName::instanceMethod
 * 4. Constructor reference - ClassName::new
 *
 * WHY IMPORTANT FOR SDET?
 * - Cleaner code in test frameworks
 * - Common in Stream operations
 * - Used in modern Java testing libraries
 */
public class Lab261_Method_Reference {

    public static void main(String[] args) {

        // ============================================
        // TYPE 1: Static Method Reference
        // ============================================
        System.out.println("===== 1. STATIC METHOD REFERENCE =====");

        // Lambda way
        Function<String, Integer> parseIntLambda = s -> Integer.parseInt(s);

        // Method reference way
        Function<String, Integer> parseIntRef = Integer::parseInt;

        System.out.println("Lambda: " + parseIntLambda.apply("123"));
        System.out.println("Method Ref: " + parseIntRef.apply("456"));

        // Using with list
        List<String> numbers = Arrays.asList("1", "2", "3", "4", "5");
        numbers.stream()
                .map(Integer::parseInt)  // Static method reference
                .forEach(System.out::println);

        // ============================================
        // TYPE 2: Instance Method Reference (specific object)
        // ============================================
        System.out.println("\n===== 2. INSTANCE METHOD (Specific Object) =====");

        String prefix = "Test: ";

        // Lambda way
        Function<String, String> concatLambda = s -> prefix.concat(s);

        // Method reference way
        Function<String, String> concatRef = prefix::concat;

        System.out.println("Lambda: " + concatLambda.apply("Login"));
        System.out.println("Method Ref: " + concatRef.apply("Logout"));

        // Printer example
        Printer printer = new Printer();
        List<String> messages = Arrays.asList("Hello", "World", "Java");
        messages.forEach(printer::print);  // Instance method reference

        // ============================================
        // TYPE 3: Instance Method (Arbitrary Object)
        // ============================================
        System.out.println("\n===== 3. INSTANCE METHOD (Arbitrary Object) =====");

        List<String> names = Arrays.asList("John", "Alice", "Bob");

        // Lambda way
        names.sort((a, b) -> a.compareToIgnoreCase(b));

        // Method reference way
        names.sort(String::compareToIgnoreCase);

        System.out.println("Sorted: " + names);

        // Another example - toUpperCase
        List<String> browsers = Arrays.asList("chrome", "firefox", "safari");
        browsers.stream()
                .map(String::toUpperCase)  // Calls toUpperCase on each string
                .forEach(System.out::println);

        // ============================================
        // TYPE 4: Constructor Reference
        // ============================================
        System.out.println("\n===== 4. CONSTRUCTOR REFERENCE =====");

        // Lambda way
        Supplier<StringBuilder> sbLambda = () -> new StringBuilder();

        // Constructor reference way
        Supplier<StringBuilder> sbRef = StringBuilder::new;

        StringBuilder sb1 = sbLambda.get();
        StringBuilder sb2 = sbRef.get();
        sb1.append("Lambda");
        sb2.append("Method Ref");
        System.out.println(sb1);
        System.out.println(sb2);

        // With parameters
        Function<String, Person> personCreator = Person::new;
        Person john = personCreator.apply("John");
        System.out.println("Created: " + john.getName());

        // BiFunction for two-parameter constructor
        BiFunction<String, Integer, Employee> empCreator = Employee::new;
        Employee emp = empCreator.apply("Alice", 101);
        System.out.println("Employee: " + emp);

        // ============================================
        // PRACTICAL SDET EXAMPLE
        // ============================================
        System.out.println("\n===== SDET EXAMPLE =====");

        List<String> testNames = Arrays.asList(
                "loginTest", "searchTest", "checkoutTest"
        );

        // Create TestCase objects using constructor reference
        Function<String, TestCase> testCaseCreator = TestCase::new;

        testNames.stream()
                .map(testCaseCreator)  // or TestCase::new
                .forEach(TestCase::execute);
    }
}

class Printer {
    public void print(String message) {
        System.out.println("[PRINT] " + message);
    }
}

class Person {
    private String name;
    public Person(String name) { this.name = name; }
    public String getName() { return name; }
}

class Employee {
    private String name;
    private int id;
    public Employee(String name, int id) { this.name = name; this.id = id; }
    @Override
    public String toString() { return "Employee{name='" + name + "', id=" + id + "}"; }
}

class TestCase {
    private String name;
    public TestCase(String name) { this.name = name; }
    public void execute() { System.out.println("Executing: " + name); }
}

