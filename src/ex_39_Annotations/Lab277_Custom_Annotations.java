package ex_39_Annotations;

import java.lang.annotation.*;
import java.lang.reflect.Method;

/**
 * LAB 277: Custom Annotations
 * ===========================
 * Topics: Creating custom annotations, retention policies, processing annotations
 */
public class Lab277_Custom_Annotations {

    public static void main(String[] args) throws Exception {

        // ============================================
        // 1. Retention Policies
        // ============================================
        System.out.println("===== RETENTION POLICIES =====");
        System.out.println("SOURCE - Discarded by compiler (e.g., @Override)");
        System.out.println("CLASS - In .class file, not available at runtime");
        System.out.println("RUNTIME - Available at runtime via reflection");

        // ============================================
        // 2. Using Custom @TestInfo Annotation
        // ============================================
        System.out.println("\n===== CUSTOM @TestInfo =====");

        Class<?> testClass = SampleTests.class;

        // Check class-level annotation
        if (testClass.isAnnotationPresent(TestInfo.class)) {
            TestInfo info = testClass.getAnnotation(TestInfo.class);
            System.out.println("Test Suite: " + info.name());
            System.out.println("Author: " + info.author());
            System.out.println("Version: " + info.version());
        }

        // ============================================
        // 3. Process Method Annotations
        // ============================================
        System.out.println("\n===== PROCESS @Test ANNOTATIONS =====");

        for (Method method : testClass.getDeclaredMethods()) {
            if (method.isAnnotationPresent(Test.class)) {
                Test test = method.getAnnotation(Test.class);

                System.out.println("\nTest Method: " + method.getName());
                System.out.println("  Description: " + test.description());
                System.out.println("  Priority: " + test.priority());
                System.out.println("  Enabled: " + test.enabled());
                System.out.println("  Tags: " + String.join(", ", test.tags()));
            }
        }

        // ============================================
        // 4. Run Enabled Tests Only
        // ============================================
        System.out.println("\n===== RUN ENABLED TESTS =====");

        Object testInstance = testClass.getDeclaredConstructor().newInstance();

        for (Method method : testClass.getDeclaredMethods()) {
            if (method.isAnnotationPresent(Test.class)) {
                Test test = method.getAnnotation(Test.class);

                if (test.enabled()) {
                    System.out.print("Running: " + method.getName() + "... ");
                    try {
                        method.invoke(testInstance);
                        System.out.println("PASSED");
                    } catch (Exception e) {
                        System.out.println("FAILED");
                    }
                } else {
                    System.out.println("Skipping: " + method.getName() + " (disabled)");
                }
            }
        }

        // ============================================
        // 5. Run Tests by Priority
        // ============================================
        System.out.println("\n===== RUN BY PRIORITY =====");

        Method[] methods = testClass.getDeclaredMethods();
        java.util.Arrays.sort(methods, (m1, m2) -> {
            Test t1 = m1.getAnnotation(Test.class);
            Test t2 = m2.getAnnotation(Test.class);
            if (t1 == null) return 1;
            if (t2 == null) return -1;
            return Integer.compare(t1.priority(), t2.priority());
        });

        System.out.println("Execution order by priority:");
        for (Method method : methods) {
            if (method.isAnnotationPresent(Test.class)) {
                Test test = method.getAnnotation(Test.class);
                System.out.println("  " + test.priority() + ". " + method.getName());
            }
        }
    }
}

// ============================================
// CUSTOM ANNOTATIONS
// ============================================

// Test Info annotation (class level)
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@interface TestInfo {
    String name();
    String author() default "Unknown";
    String version() default "1.0";
}

// Test annotation (method level) - similar to TestNG/JUnit
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@interface Test {
    String description() default "";
    int priority() default 0;
    boolean enabled() default true;
    String[] tags() default {};
}

// ============================================
// SAMPLE TEST CLASS USING ANNOTATIONS
// ============================================

@TestInfo(name = "Login Test Suite", author = "SDET Team", version = "2.0")
class SampleTests {

    @Test(description = "Verify login with valid credentials", priority = 1, tags = {"smoke", "login"})
    public void testValidLogin() {
        // Test implementation
    }

    @Test(description = "Verify login with invalid password", priority = 2, tags = {"regression"})
    public void testInvalidPassword() {
        // Test implementation
    }

    @Test(description = "Verify forgot password link", priority = 3, enabled = false)
    public void testForgotPassword() {
        // Test implementation - disabled
    }

    @Test(description = "Verify logout functionality", priority = 4, tags = {"smoke"})
    public void testLogout() {
        // Test implementation
    }
}

