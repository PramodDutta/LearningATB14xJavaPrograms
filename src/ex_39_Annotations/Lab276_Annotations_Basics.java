package ex_39_Annotations;

import java.util.ArrayList;
import java.util.List;

/**
 * LAB 276: Annotations Basics
 * ===========================
 * Topics Covered:
 * 1. What are Annotations?
 * 2. Built-in annotations (@Override, @Deprecated, @SuppressWarnings)
 * 3. Annotation syntax and usage
 *
 * WHY IMPORTANT FOR SDET?
 * - Test frameworks heavily use annotations (@Test, @BeforeMethod)
 * - Understanding how frameworks work
 * - Creating custom test annotations
 * - Page Object annotations (@FindBy)
 */
public class Lab276_Annotations_Basics {

    public static void main(String[] args) {

        // ============================================
        // 1. What are Annotations?
        // ============================================
        System.out.println("===== WHAT ARE ANNOTATIONS? =====");
        System.out.println("Annotations = Metadata about code");
        System.out.println("They provide information to:");
        System.out.println("  - Compiler (compile-time)");
        System.out.println("  - Runtime (via reflection)");
        System.out.println("  - Build tools (Maven, Gradle)");

        // ============================================
        // 2. @Override
        // ============================================
        System.out.println("\n===== @Override =====");
        System.out.println("Indicates method overrides superclass method");
        System.out.println("Compiler error if method doesn't actually override");

        Animal dog = new Dog();
        dog.makeSound();  // Calls overridden method

        // ============================================
        // 3. @Deprecated
        // ============================================
        System.out.println("\n===== @Deprecated =====");
        System.out.println("Marks element as deprecated (should not be used)");

        OldClass old = new OldClass();
        old.oldMethod();  // Shows warning in IDE

        // ============================================
        // 4. @SuppressWarnings
        // ============================================
        System.out.println("\n===== @SuppressWarnings =====");
        System.out.println("Suppresses compiler warnings");

        // Without @SuppressWarnings, this would show warning
        @SuppressWarnings("unused")
        String unusedVariable = "I'm not used";

        @SuppressWarnings("unchecked")
        List rawList = new ArrayList();  // Raw type warning suppressed

        System.out.println("Warnings suppressed for unused variable and raw type");

        // ============================================
        // 5. @FunctionalInterface
        // ============================================
        System.out.println("\n===== @FunctionalInterface =====");
        System.out.println("Ensures interface has exactly one abstract method");

        // Using our functional interface with lambda
        Calculator add = (a, b) -> a + b;
        Calculator multiply = (a, b) -> a * b;

        System.out.println("5 + 3 = " + add.calculate(5, 3));
        System.out.println("5 * 3 = " + multiply.calculate(5, 3));

        // ============================================
        // 6. Common Testing Annotations (Conceptual)
        // ============================================
        System.out.println("\n===== Testing Annotations (Conceptual) =====");
        System.out.println("JUnit 5:");
        System.out.println("  @Test - marks test method");
        System.out.println("  @BeforeEach - runs before each test");
        System.out.println("  @AfterEach - runs after each test");
        System.out.println("  @BeforeAll - runs once before all tests");
        System.out.println("  @Disabled - skips test");

        System.out.println("\nTestNG:");
        System.out.println("  @Test - marks test method");
        System.out.println("  @BeforeMethod - runs before each test");
        System.out.println("  @AfterMethod - runs after each test");
        System.out.println("  @DataProvider - provides test data");

        System.out.println("\nSelenium:");
        System.out.println("  @FindBy - locates web elements");
        System.out.println("  @CacheLookup - caches element lookup");

        // ============================================
        // 7. Annotation Placement
        // ============================================
        System.out.println("\n===== Annotation Placement =====");
        System.out.println("Annotations can be placed on:");
        System.out.println("  - Classes");
        System.out.println("  - Methods");
        System.out.println("  - Fields");
        System.out.println("  - Parameters");
        System.out.println("  - Constructors");
        System.out.println("  - Local variables");
        System.out.println("  - Packages");
    }
}

// Example classes demonstrating annotations

class Animal {
    public void makeSound() {
        System.out.println("Animal makes sound");
    }
}

class Dog extends Animal {
    @Override  // Compiler verifies this actually overrides
    public void makeSound() {
        System.out.println("Dog barks: Woof!");
    }

    // This would cause compiler error:
    // @Override
    // public void makeSond() { }  // Typo - doesn't override anything
}

class OldClass {
    @Deprecated(since = "1.5", forRemoval = true)
    public void oldMethod() {
        System.out.println("This method is deprecated");
    }

    public void newMethod() {
        System.out.println("Use this method instead");
    }
}

@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);

    // Can have default methods
    default void printResult(int result) {
        System.out.println("Result: " + result);
    }

    // Can have static methods
    static void info() {
        System.out.println("Calculator interface");
    }

    // Cannot have another abstract method (would break @FunctionalInterface)
    // int anotherMethod();  // Error!
}

