package ex_32_Multithreading;

/**
 * LAB 256: Thread Synchronization
 * ===============================
 * Topics Covered:
 * 1. Race condition problem
 * 2. synchronized keyword
 * 3. synchronized methods
 * 4. synchronized blocks
 *
 * WHY IMPORTANT FOR SDET?
 * - Understanding thread-safe code
 * - Debugging concurrency issues
 * - Writing thread-safe test utilities
 */
public class Lab256_Synchronization {

    public static void main(String[] args) throws InterruptedException {

        // ============================================
        // PROBLEM: Race Condition (Without Sync)
        // ============================================
        System.out.println("===== WITHOUT SYNCHRONIZATION =====");

        Counter unsafeCounter = new Counter();

        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                unsafeCounter.incrementUnsafe();
            }
        });

        Thread t2 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                unsafeCounter.incrementUnsafe();
            }
        });

        t1.start();
        t2.start();
        t1.join();
        t2.join();

        // Expected: 2000, but may get different value due to race condition
        System.out.println("Unsafe Counter (Expected 2000): " + unsafeCounter.getUnsafeCount());

        // ============================================
        // SOLUTION: With Synchronization
        // ============================================
        System.out.println("\n===== WITH SYNCHRONIZATION =====");

        Counter safeCounter = new Counter();

        Thread t3 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                safeCounter.incrementSafe();
            }
        });

        Thread t4 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                safeCounter.incrementSafe();
            }
        });

        t3.start();
        t4.start();
        t3.join();
        t4.join();

        System.out.println("Safe Counter (Expected 2000): " + safeCounter.getSafeCount());

        // ============================================
        // REAL EXAMPLE: Bank Account
        // ============================================
        System.out.println("\n===== BANK ACCOUNT EXAMPLE =====");

        BankAccount account = new BankAccount(1000);

        Thread withdraw1 = new Thread(() -> account.withdraw("ATM-1", 600));
        Thread withdraw2 = new Thread(() -> account.withdraw("ATM-2", 600));

        withdraw1.start();
        withdraw2.start();
        withdraw1.join();
        withdraw2.join();

        System.out.println("Final Balance: $" + account.getBalance());
    }
}

class Counter {
    private int unsafeCount = 0;
    private int safeCount = 0;

    // Unsafe - Race condition possible
    public void incrementUnsafe() {
        unsafeCount++;  // Not atomic: read -> increment -> write
    }

    // Safe - synchronized method
    public synchronized void incrementSafe() {
        safeCount++;
    }

    public int getUnsafeCount() { return unsafeCount; }
    public int getSafeCount() { return safeCount; }
}

class BankAccount {
    private double balance;

    public BankAccount(double initialBalance) {
        this.balance = initialBalance;
    }

    // Synchronized method to prevent concurrent withdrawals
    public synchronized void withdraw(String source, double amount) {
        System.out.println(source + " attempting to withdraw $" + amount);

        if (balance >= amount) {
            System.out.println(source + " - Sufficient balance. Processing...");

            // Simulate processing time
            try { Thread.sleep(100); } catch (InterruptedException e) { }

            balance -= amount;
            System.out.println(source + " - Withdrawal successful. New balance: $" + balance);
        } else {
            System.out.println(source + " - Insufficient balance! Available: $" + balance);
        }
    }

    public double getBalance() { return balance; }
}

