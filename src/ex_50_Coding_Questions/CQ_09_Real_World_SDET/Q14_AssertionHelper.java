package ex_50_Coding_Questions.CQ_09_Real_World_SDET;

import java.util.*;

/**
 * Q14: Custom Assertion Helper
 * ============================
 * DIFFICULTY: Medium
 * ASKED AT: SDET Interviews
 *
 * Problem: Implement custom assertion methods.
 * Real Use: Test framework utilities, custom validations.
 */
public class Q14_AssertionHelper {

    public static void main(String[] args) {
        System.out.println("=== Assertion Helper Demo ===\n");

        // Test assertions
        try {
            assertEquals("Test 1", 5, 5);
            System.out.println("✓ assertEquals passed");

            assertTrue("Test 2", 10 > 5);
            System.out.println("✓ assertTrue passed");

            assertNotNull("Test 3", "value");
            System.out.println("✓ assertNotNull passed");

            assertContains("Test 4", "Hello World", "World");
            System.out.println("✓ assertContains passed");

            assertListEquals("Test 5", Arrays.asList(1, 2, 3), Arrays.asList(1, 2, 3));
            System.out.println("✓ assertListEquals passed");

            // This will fail
            assertEquals("Test 6", 5, 10);
        } catch (AssertionError e) {
            System.out.println("✗ " + e.getMessage());
        }
    }

    // Assert equals
    public static void assertEquals(String message, Object expected, Object actual) {
        if (!Objects.equals(expected, actual)) {
            throw new AssertionError(message + " - Expected: " + expected + ", Actual: " + actual);
        }
    }

    // Assert true
    public static void assertTrue(String message, boolean condition) {
        if (!condition) {
            throw new AssertionError(message + " - Expected true but was false");
        }
    }

    // Assert false
    public static void assertFalse(String message, boolean condition) {
        if (condition) {
            throw new AssertionError(message + " - Expected false but was true");
        }
    }

    // Assert not null
    public static void assertNotNull(String message, Object object) {
        if (object == null) {
            throw new AssertionError(message + " - Expected non-null but was null");
        }
    }

    // Assert null
    public static void assertNull(String message, Object object) {
        if (object != null) {
            throw new AssertionError(message + " - Expected null but was: " + object);
        }
    }

    // Assert contains (string)
    public static void assertContains(String message, String text, String substring) {
        if (text == null || !text.contains(substring)) {
            throw new AssertionError(message + " - '" + text + "' does not contain '" + substring + "'");
        }
    }

    // Assert list equals (order matters)
    public static <T> void assertListEquals(String message, List<T> expected, List<T> actual) {
        if (!expected.equals(actual)) {
            throw new AssertionError(message + " - Lists not equal\nExpected: " + expected + "\nActual: " + actual);
        }
    }

    // Assert list contains all (order doesn't matter)
    public static <T> void assertListContainsAll(String message, List<T> list, List<T> elements) {
        for (T element : elements) {
            if (!list.contains(element)) {
                throw new AssertionError(message + " - List missing element: " + element);
            }
        }
    }

    // Assert within range
    public static void assertInRange(String message, int value, int min, int max) {
        if (value < min || value > max) {
            throw new AssertionError(message + " - " + value + " not in range [" + min + ", " + max + "]");
        }
    }

    // Soft assert (collect all failures)
    public static class SoftAssert {
        private List<String> failures = new ArrayList<>();

        public void assertEquals(String message, Object expected, Object actual) {
            if (!Objects.equals(expected, actual)) {
                failures.add(message + " - Expected: " + expected + ", Actual: " + actual);
            }
        }

        public void assertAll() {
            if (!failures.isEmpty()) {
                throw new AssertionError("Soft assert failures:\n" + String.join("\n", failures));
            }
        }
    }
}

