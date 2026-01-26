package ex_50_Coding_Questions.CQ_09_Real_World_SDET;

import java.util.Random;

/**
 * Q06: Retry Mechanism
 * ====================
 * DIFFICULTY: Medium
 * ASKED AT: SDET Interviews
 *
 * Problem: Implement retry logic for flaky operations.
 * Real Use: API calls, database connections, flaky tests.
 */
public class Q06_RetryMechanism {

    public static void main(String[] args) {
        System.out.println("=== Retry Mechanism Demo ===\n");

        // Simulate flaky operation
        try {
            String result = retryWithBackoff(() -> flakyOperation(), 3, 1000);
            System.out.println("Success: " + result);
        } catch (Exception e) {
            System.out.println("Failed after retries: " + e.getMessage());
        }
    }

    // ============================================
    // Basic Retry
    // ============================================
    public static <T> T retry(Operation<T> operation, int maxRetries) throws Exception {
        Exception lastException = null;

        for (int attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                System.out.println("Attempt " + attempt + "...");
                return operation.execute();
            } catch (Exception e) {
                lastException = e;
                System.out.println("Attempt " + attempt + " failed: " + e.getMessage());
            }
        }

        throw new Exception("All " + maxRetries + " attempts failed", lastException);
    }

    // ============================================
    // Retry with Exponential Backoff
    // ============================================
    public static <T> T retryWithBackoff(Operation<T> operation, int maxRetries, long initialDelay) throws Exception {
        Exception lastException = null;
        long delay = initialDelay;

        for (int attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                System.out.println("Attempt " + attempt + "...");
                return operation.execute();
            } catch (Exception e) {
                lastException = e;
                System.out.println("Attempt " + attempt + " failed: " + e.getMessage());

                if (attempt < maxRetries) {
                    System.out.println("Waiting " + delay + "ms before retry...");
                    Thread.sleep(delay);
                    delay *= 2;  // Exponential backoff
                }
            }
        }

        throw new Exception("All " + maxRetries + " attempts failed", lastException);
    }

    // Functional interface for operation
    @FunctionalInterface
    interface Operation<T> {
        T execute() throws Exception;
    }

    // Simulated flaky operation (fails randomly)
    private static final Random random = new Random();

    public static String flakyOperation() throws Exception {
        if (random.nextInt(3) != 0) {  // 66% chance of failure
            throw new Exception("Random failure occurred");
        }
        return "Operation completed successfully";
    }
}

