package ex_38_Reflection;

import java.lang.reflect.*;
import java.util.*;

/**
 * LAB 275: Reflection for SDET - Practical Examples
 * =================================================
 * Real-world scenarios in test automation
 */
public class Lab275_Reflection_SDET {

    public static void main(String[] args) throws Exception {

        // ============================================
        // SCENARIO 1: Dynamic Page Object Creation
        // ============================================
        System.out.println("===== SCENARIO 1: Dynamic Page Creation =====");

        // Simulate creating page objects dynamically
        String pageClassName = "ex_38_Reflection.LoginPage";
        Class<?> pageClass = Class.forName(pageClassName);
        Object loginPage = pageClass.getDeclaredConstructor().newInstance();

        System.out.println("Created: " + loginPage.getClass().getSimpleName());

        // ============================================
        // SCENARIO 2: Access Private Fields for Testing
        // ============================================
        System.out.println("\n===== SCENARIO 2: Access Private Fields =====");

        UserService service = new UserService();

        // Access private field to verify internal state
        Field usersField = UserService.class.getDeclaredField("users");
        usersField.setAccessible(true);

        @SuppressWarnings("unchecked")
        List<String> users = (List<String>) usersField.get(service);

        service.addUser("John");
        service.addUser("Alice");

        System.out.println("Internal users list: " + users);
        System.out.println("Test: Users added correctly? " + (users.size() == 2));

        // ============================================
        // SCENARIO 3: Invoke Private Methods for Testing
        // ============================================
        System.out.println("\n===== SCENARIO 3: Test Private Methods =====");

        Calculator calc = new Calculator();

        // Test private validation method
        Method validateMethod = Calculator.class.getDeclaredMethod("validateInput", int.class);
        validateMethod.setAccessible(true);

        boolean valid1 = (boolean) validateMethod.invoke(calc, 10);
        boolean valid2 = (boolean) validateMethod.invoke(calc, -5);

        System.out.println("validateInput(10): " + valid1);
        System.out.println("validateInput(-5): " + valid2);

        // ============================================
        // SCENARIO 4: Generate Test Data from Class
        // ============================================
        System.out.println("\n===== SCENARIO 4: Generate Test Data =====");

        Object testData = generateTestData(TestUser.class);
        System.out.println("Generated: " + testData);

        // ============================================
        // SCENARIO 5: Compare Objects Field by Field
        // ============================================
        System.out.println("\n===== SCENARIO 5: Compare Objects =====");

        TestUser user1 = new TestUser("john", "john@test.com", 25);
        TestUser user2 = new TestUser("john", "john@test.com", 25);
        TestUser user3 = new TestUser("john", "different@test.com", 25);

        System.out.println("user1 vs user2: " + compareObjects(user1, user2));
        System.out.println("user1 vs user3: " + compareObjects(user1, user3));

        // ============================================
        // SCENARIO 6: List All Test Methods
        // ============================================
        System.out.println("\n===== SCENARIO 6: Find Test Methods =====");

        Class<?> testClass = SampleTestClass.class;
        Method[] methods = testClass.getDeclaredMethods();

        System.out.println("Methods starting with 'test':");
        for (Method method : methods) {
            if (method.getName().startsWith("test")) {
                System.out.println("  - " + method.getName() + "()");
            }
        }

        // ============================================
        // SCENARIO 7: Run Test Methods Dynamically
        // ============================================
        System.out.println("\n===== SCENARIO 7: Run Tests Dynamically =====");

        Object testInstance = testClass.getDeclaredConstructor().newInstance();

        for (Method method : methods) {
            if (method.getName().startsWith("test")) {
                System.out.print("Running " + method.getName() + "... ");
                try {
                    method.invoke(testInstance);
                    System.out.println("PASSED");
                } catch (Exception e) {
                    System.out.println("FAILED: " + e.getCause().getMessage());
                }
            }
        }
    }

    // Helper: Generate test data with default values
    static Object generateTestData(Class<?> clazz) throws Exception {
        Object instance = clazz.getDeclaredConstructor().newInstance();

        for (Field field : clazz.getDeclaredFields()) {
            field.setAccessible(true);
            Class<?> type = field.getType();

            if (type == String.class) {
                field.set(instance, "test_" + field.getName());
            } else if (type == int.class || type == Integer.class) {
                field.set(instance, 100);
            } else if (type == boolean.class || type == Boolean.class) {
                field.set(instance, true);
            }
        }
        return instance;
    }

    // Helper: Compare two objects field by field
    static boolean compareObjects(Object obj1, Object obj2) throws Exception {
        if (obj1.getClass() != obj2.getClass()) return false;

        for (Field field : obj1.getClass().getDeclaredFields()) {
            field.setAccessible(true);
            Object val1 = field.get(obj1);
            Object val2 = field.get(obj2);

            if (val1 == null ? val2 != null : !val1.equals(val2)) {
                System.out.println("  Mismatch in '" + field.getName() + "': " + val1 + " vs " + val2);
                return false;
            }
        }
        return true;
    }
}

// Sample classes for demonstration
class LoginPage {
    public void login(String user, String pass) { }
    public void logout() { }
}

class UserService {
    private List<String> users = new ArrayList<>();
    public void addUser(String user) { users.add(user); }
}

class Calculator {
    private boolean validateInput(int num) { return num >= 0; }
    public int add(int a, int b) { return a + b; }
}

class TestUser {
    private String username;
    private String email;
    private int age;

    public TestUser() {}
    public TestUser(String u, String e, int a) { username = u; email = e; age = a; }

    @Override
    public String toString() {
        return "TestUser{username='" + username + "', email='" + email + "', age=" + age + "}";
    }
}

class SampleTestClass {
    public void testLogin() { System.out.print(""); }
    public void testLogout() { System.out.print(""); }
    public void testSearch() { throw new RuntimeException("Search failed"); }
    public void helperMethod() { }  // Not a test
}

