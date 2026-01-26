package ex_32_Multithreading;

/**
 * LAB 258: Multithreading Interview Questions
 * ===========================================
 * Common interview questions for SDET/QA
 */
public class Lab258_Thread_Interview {

    public static void main(String[] args) throws InterruptedException {

        // ============================================
        // Q1: Difference between start() and run()
        // ============================================
        System.out.println("===== Q1: start() vs run() =====");

        Thread thread = new Thread(() -> {
            System.out.println("Running in: " + Thread.currentThread().getName());
        });

        // run() - Executes in CURRENT thread (no new thread created)
        System.out.println("Calling run() directly:");
        thread.run();  // Runs in main thread

        // start() - Creates NEW thread and executes run() in it
        System.out.println("\nCalling start():");
        Thread thread2 = new Thread(() -> {
            System.out.println("Running in: " + Thread.currentThread().getName());
        });
        thread2.start();  // Runs in new thread
        thread2.join();

        // ============================================
        // Q2: Thread vs Runnable
        // ============================================
        System.out.println("\n===== Q2: Thread vs Runnable =====");
        System.out.println("Thread: Extends Thread class, can't extend other class");
        System.out.println("Runnable: Implements interface, can extend other class");
        System.out.println("Runnable is PREFERRED - better design, more flexible");

        // ============================================
        // Q3: What is Daemon Thread?
        // ============================================
        System.out.println("\n===== Q3: Daemon Thread =====");

        Thread daemonThread = new Thread(() -> {
            while (true) {
                System.out.println("Daemon running...");
                try { Thread.sleep(500); } catch (InterruptedException e) { break; }
            }
        });

        daemonThread.setDaemon(true);  // Must set before start()
        daemonThread.start();

        System.out.println("Is daemon: " + daemonThread.isDaemon());
        System.out.println("Daemon threads terminate when all user threads finish");

        Thread.sleep(1500);  // Let daemon run briefly

        // ============================================
        // Q4: Thread Priority
        // ============================================
        System.out.println("\n===== Q4: Thread Priority =====");
        System.out.println("MIN_PRIORITY: " + Thread.MIN_PRIORITY);    // 1
        System.out.println("NORM_PRIORITY: " + Thread.NORM_PRIORITY);  // 5
        System.out.println("MAX_PRIORITY: " + Thread.MAX_PRIORITY);    // 10

        // ============================================
        // Q5: What is Thread.join()?
        // ============================================
        System.out.println("\n===== Q5: Thread.join() =====");

        Thread worker = new Thread(() -> {
            System.out.println("Worker started");
            try { Thread.sleep(1000); } catch (InterruptedException e) { }
            System.out.println("Worker finished");
        });

        worker.start();
        System.out.println("Main waiting for worker...");
        worker.join();  // Main thread waits for worker to complete
        System.out.println("Main continues after worker finished");

        // ============================================
        // Q6: What is volatile keyword?
        // ============================================
        System.out.println("\n===== Q6: volatile keyword =====");
        System.out.println("volatile ensures variable is read from main memory");
        System.out.println("Used for flags shared between threads");
        System.out.println("Example: private volatile boolean running = true;");

        // ============================================
        // Q7: What is deadlock?
        // ============================================
        System.out.println("\n===== Q7: Deadlock =====");
        System.out.println("Deadlock: Two threads waiting for each other's locks");
        System.out.println("Thread A holds Lock1, waits for Lock2");
        System.out.println("Thread B holds Lock2, waits for Lock1");
        System.out.println("Prevention: Always acquire locks in same order");

        // ============================================
        // Q8: sleep() vs wait()
        // ============================================
        System.out.println("\n===== Q8: sleep() vs wait() =====");
        System.out.println("sleep(): Thread class, doesn't release lock");
        System.out.println("wait(): Object class, releases lock, needs notify()");

        // ============================================
        // Q9: Can we start a thread twice?
        // ============================================
        System.out.println("\n===== Q9: Start thread twice? =====");
        System.out.println("NO! IllegalThreadStateException will be thrown");
        System.out.println("Once a thread completes, it cannot be restarted");

        // ============================================
        // Q10: Thread States
        // ============================================
        System.out.println("\n===== Q10: Thread States =====");
        System.out.println("NEW -> RUNNABLE -> RUNNING -> BLOCKED/WAITING -> TERMINATED");
    }
}

