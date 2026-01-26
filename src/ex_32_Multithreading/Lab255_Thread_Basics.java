package ex_32_Multithreading;

/**
 * LAB 255: Thread Basics
 * ======================
 * Topics Covered:
 * 1. What is a Thread?
 * 2. Creating threads by extending Thread class
 * 3. Creating threads by implementing Runnable interface
 * 4. Thread lifecycle and states
 *
 * WHY IMPORTANT FOR SDET?
 * - Parallel test execution
 * - Understanding async operations
 * - Performance testing concepts
 * - Handling concurrent API calls
 */
public class Lab255_Thread_Basics {

    public static void main(String[] args) {

        System.out.println("Main thread: " + Thread.currentThread().getName());

        // ============================================
        // METHOD 1: Extending Thread Class
        // ============================================
        System.out.println("\n===== METHOD 1: Extending Thread =====");

        MyThread thread1 = new MyThread("Thread-A");
        MyThread thread2 = new MyThread("Thread-B");

        thread1.start();  // start() creates new thread and calls run()
        thread2.start();

        // Wait for threads to complete
        try {
            thread1.join();
            thread2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // ============================================
        // METHOD 2: Implementing Runnable Interface
        // ============================================
        System.out.println("\n===== METHOD 2: Implementing Runnable =====");

        MyRunnable task1 = new MyRunnable("Task-1");
        MyRunnable task2 = new MyRunnable("Task-2");

        Thread t1 = new Thread(task1);
        Thread t2 = new Thread(task2);

        t1.start();
        t2.start();

        try {
            t1.join();
            t2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // ============================================
        // METHOD 3: Using Lambda (Java 8+)
        // ============================================
        System.out.println("\n===== METHOD 3: Lambda Expression =====");

        Thread lambdaThread = new Thread(() -> {
            for (int i = 1; i <= 3; i++) {
                System.out.println("Lambda Thread: Count " + i);
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });

        lambdaThread.start();

        try {
            lambdaThread.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // ============================================
        // Thread Properties
        // ============================================
        System.out.println("\n===== Thread Properties =====");

        Thread currentThread = Thread.currentThread();
        System.out.println("Thread Name: " + currentThread.getName());
        System.out.println("Thread ID: " + currentThread.getId());
        System.out.println("Thread Priority: " + currentThread.getPriority());
        System.out.println("Is Alive: " + currentThread.isAlive());
        System.out.println("Is Daemon: " + currentThread.isDaemon());

        System.out.println("\n===== All threads completed! =====");
    }
}

// Method 1: Extending Thread class
class MyThread extends Thread {
    private String threadName;

    public MyThread(String name) {
        this.threadName = name;
    }

    @Override
    public void run() {
        for (int i = 1; i <= 3; i++) {
            System.out.println(threadName + ": Count " + i);
            try {
                Thread.sleep(500);  // Sleep for 500ms
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println(threadName + " completed!");
    }
}

// Method 2: Implementing Runnable interface (PREFERRED)
class MyRunnable implements Runnable {
    private String taskName;

    public MyRunnable(String name) {
        this.taskName = name;
    }

    @Override
    public void run() {
        for (int i = 1; i <= 3; i++) {
            System.out.println(taskName + ": Executing step " + i);
            try {
                Thread.sleep(400);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println(taskName + " completed!");
    }
}

