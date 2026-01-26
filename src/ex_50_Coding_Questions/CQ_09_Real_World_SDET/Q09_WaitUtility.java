package ex_50_Coding_Questions.CQ_09_Real_World_SDET;

import java.util.function.Supplier;

/**
 * Q09: Wait/Polling Utility
 * =========================
 * DIFFICULTY: Medium
 * ASKED AT: SDET Interviews
 *
 * Problem: Implement wait/polling mechanism.
 * Real Use: Selenium waits, async operation handling.
 */
public class Q09_WaitUtility {

    public static void main(String[] args) {
        System.out.println("=== Wait Until Condition ===\n");

        // Simulate condition that becomes true after some time
        final long startTime = System.currentTimeMillis();

        try {
            boolean result = waitUntil(
                    () -> {
                        // Condition: 2 seconds have passed
                        boolean ready = (System.currentTimeMillis() - startTime) > 2000;
                        System.out.println("Checking... ready=" + ready);
                        return ready;
                    },
                    5000,  // timeout
                    500    // polling interval
            );
            System.out.println("\nCondition met: " + result);
        } catch (Exception e) {
            System.out.println("Timeout: " + e.getMessage());
        }
    }

    // ============================================
    // Wait Until Condition is True
    // ============================================
    public static boolean waitUntil(Supplier<Boolean> condition, long timeoutMs, long pollingMs)
            throws InterruptedException {
        long endTime = System.currentTimeMillis() + timeoutMs;

        while (System.currentTimeMillis() < endTime) {
            if (condition.get()) {
                return true;
            }
            Thread.sleep(pollingMs);
        }

        throw new RuntimeException("Timeout after " + timeoutMs + "ms");
    }

    // ============================================
    // Wait Until with Return Value
    // ============================================
    public static <T> T waitFor(Supplier<T> supplier, long timeoutMs, long pollingMs)
            throws InterruptedException {
        long endTime = System.currentTimeMillis() + timeoutMs;

        while (System.currentTimeMillis() < endTime) {
            T result = supplier.get();
            if (result != null) {
                return result;
            }
            Thread.sleep(pollingMs);
        }

        throw new RuntimeException("Timeout waiting for non-null result");
    }

    // ============================================
    // Fluent Wait Builder
    // ============================================
    public static class FluentWait<T> {
        private long timeout = 30000;
        private long polling = 500;
        private Class<? extends Exception>[] ignoredExceptions;

        public FluentWait<T> withTimeout(long timeoutMs) {
            this.timeout = timeoutMs;
            return this;
        }

        public FluentWait<T> pollingEvery(long pollingMs) {
            this.polling = pollingMs;
            return this;
        }

        @SafeVarargs
        public final FluentWait<T> ignoring(Class<? extends Exception>... exceptions) {
            this.ignoredExceptions = exceptions;
            return this;
        }

        public T until(Supplier<T> condition) throws InterruptedException {
            long endTime = System.currentTimeMillis() + timeout;

            while (System.currentTimeMillis() < endTime) {
                try {
                    T result = condition.get();
                    if (result != null && !Boolean.FALSE.equals(result)) {
                        return result;
                    }
                } catch (Exception e) {
                    // Check if exception should be ignored
                    if (!shouldIgnore(e)) throw new RuntimeException(e);
                }
                Thread.sleep(polling);
            }

            throw new RuntimeException("Timeout after " + timeout + "ms");
        }

        private boolean shouldIgnore(Exception e) {
            if (ignoredExceptions == null) return false;
            for (Class<? extends Exception> ignored : ignoredExceptions) {
                if (ignored.isInstance(e)) return true;
            }
            return false;
        }
    }
}

