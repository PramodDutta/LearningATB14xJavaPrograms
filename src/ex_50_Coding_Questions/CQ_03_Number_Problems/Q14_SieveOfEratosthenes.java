package ex_50_Coding_Questions.CQ_03_Number_Problems;

import java.util.Arrays;

/**
 * Q14: Sieve of Eratosthenes
 * ==========================
 * DIFFICULTY: Medium
 * ASKED AT: Amazon, Google, Microsoft
 *
 * Problem: Find all prime numbers up to n.
 * Input: 30
 * Output: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
 */
public class Q14_SieveOfEratosthenes {

    public static void main(String[] args) {
        int n = 50;

        System.out.println("Prime numbers up to " + n + ":");
        sieveOfEratosthenes(n);

        System.out.println("\n\nCount of primes up to " + n + ": " + countPrimes(n));
    }

    // ============================================
    // Sieve of Eratosthenes
    // Time: O(n log log n), Space: O(n)
    // ============================================
    public static void sieveOfEratosthenes(int n) {
        boolean[] isPrime = new boolean[n + 1];
        Arrays.fill(isPrime, true);

        isPrime[0] = isPrime[1] = false;

        for (int i = 2; i * i <= n; i++) {
            if (isPrime[i]) {
                // Mark all multiples as non-prime
                for (int j = i * i; j <= n; j += i) {
                    isPrime[j] = false;
                }
            }
        }

        // Print primes
        for (int i = 2; i <= n; i++) {
            if (isPrime[i]) {
                System.out.print(i + " ");
            }
        }
    }

    // ============================================
    // Count Primes (LeetCode style)
    // ============================================
    public static int countPrimes(int n) {
        if (n <= 2) return 0;

        boolean[] isPrime = new boolean[n];
        Arrays.fill(isPrime, true);

        for (int i = 2; i * i < n; i++) {
            if (isPrime[i]) {
                for (int j = i * i; j < n; j += i) {
                    isPrime[j] = false;
                }
            }
        }

        int count = 0;
        for (int i = 2; i < n; i++) {
            if (isPrime[i]) count++;
        }

        return count;
    }
}

