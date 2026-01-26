package ex_32_Multithreading;

import java.util.concurrent.*;
import java.util.Arrays;
import java.util.List;

/**
 * LAB 257: ExecutorService - Thread Pool
 * ======================================
 * Topics Covered:
 * 1. ExecutorService basics
 * 2. Fixed Thread Pool
 * 3. Callable and Future
 * 4. Parallel task execution
 *
 * WHY IMPORTANT FOR SDET?
 * - Parallel test execution (TestNG, JUnit)
 * - Running multiple API calls concurrently
 * - Performance testing scenarios
 */
public class Lab257_ExecutorService {

    public static void main(String[] args) throws Exception {

        // ============================================
        // PART 1: Fixed Thread Pool
        // ============================================
        System.out.println("===== PART 1: Fixed Thread Pool =====");

        // Create a pool of 3 threads
        ExecutorService executor = Executors.newFixedThreadPool(3);

        // Submit 5 tasks to be executed by 3 threads
        for (int i = 1; i <= 5; i++) {
            final int taskId = i;
            executor.submit(() -> {
                System.out.println("Task " + taskId + " running on: " +
                        Thread.currentThread().getName());
                try { Thread.sleep(1000); } catch (InterruptedException e) { }
                System.out.println("Task " + taskId + " completed");
            });
        }

        executor.shutdown();
        executor.awaitTermination(10, TimeUnit.SECONDS);

        // ============================================
        // PART 2: Callable with Return Value
        // ============================================
        System.out.println("\n===== PART 2: Callable & Future =====");

        ExecutorService executor2 = Executors.newFixedThreadPool(2);

        // Callable returns a value (unlike Runnable)
        Callable<Integer> task1 = () -> {
            System.out.println("Calculating sum 1-100...");
            Thread.sleep(1000);
            int sum = 0;
            for (int i = 1; i <= 100; i++) sum += i;
            return sum;
        };

        Callable<Integer> task2 = () -> {
            System.out.println("Calculating factorial of 10...");
            Thread.sleep(1000);
            int factorial = 1;
            for (int i = 1; i <= 10; i++) factorial *= i;
            return factorial;
        };

        Future<Integer> future1 = executor2.submit(task1);
        Future<Integer> future2 = executor2.submit(task2);

        // Get results (blocks until complete)
        System.out.println("Sum 1-100: " + future1.get());
        System.out.println("Factorial 10: " + future2.get());

        executor2.shutdown();

        // ============================================
        // PART 3: Parallel Test Execution Simulation
        // ============================================
        System.out.println("\n===== PART 3: Parallel Test Execution =====");

        ExecutorService testExecutor = Executors.newFixedThreadPool(3);

        List<Callable<String>> testCases = Arrays.asList(
                () -> runTest("Login Test", 2000),
                () -> runTest("Search Test", 1500),
                () -> runTest("Checkout Test", 2500),
                () -> runTest("Payment Test", 1800),
                () -> runTest("Logout Test", 1000)
        );

        long startTime = System.currentTimeMillis();

        // Execute all tests in parallel
        List<Future<String>> results = testExecutor.invokeAll(testCases);

        // Collect results
        System.out.println("\n--- Test Results ---");
        for (Future<String> result : results) {
            System.out.println(result.get());
        }

        long endTime = System.currentTimeMillis();
        System.out.println("\nTotal execution time: " + (endTime - startTime) + "ms");
        System.out.println("(Sequential would take ~8800ms)");

        testExecutor.shutdown();
    }

    static String runTest(String testName, int duration) throws InterruptedException {
        System.out.println("Starting: " + testName + " on " + Thread.currentThread().getName());
        Thread.sleep(duration);
        return testName + " - PASSED (" + duration + "ms)";
    }
}

