package ex_50_Coding_Questions.CQ_02_Array_Problems;

import java.util.Arrays;

/**
 * Q16: Best Time to Buy and Sell Stock
 * ====================================
 * DIFFICULTY: Easy
 * ASKED AT: Amazon, Google, Facebook, Microsoft (VERY COMMON)
 *
 * Problem: Find maximum profit from one buy and one sell.
 * Input: [7, 1, 5, 3, 6, 4]
 * Output: 5 (buy at 1, sell at 6)
 */
public class Q16_BuySellStock {

    public static void main(String[] args) {
        int[] prices = {7, 1, 5, 3, 6, 4};

        System.out.println("Prices: " + Arrays.toString(prices));
        System.out.println("\n--- SOLUTIONS ---");

        System.out.println("Method 1 (Brute Force): " + maxProfitBruteForce(prices));
        System.out.println("Method 2 (One Pass): " + maxProfitOnePass(prices));
    }

    // ============================================
    // METHOD 1: Brute Force
    // Time: O(n²), Space: O(1)
    // ============================================
    public static int maxProfitBruteForce(int[] prices) {
        int maxProfit = 0;

        for (int i = 0; i < prices.length; i++) {
            for (int j = i + 1; j < prices.length; j++) {
                int profit = prices[j] - prices[i];
                maxProfit = Math.max(maxProfit, profit);
            }
        }

        return maxProfit;
    }

    // ============================================
    // METHOD 2: One Pass (OPTIMAL)
    // Time: O(n), Space: O(1)
    // ============================================
    public static int maxProfitOnePass(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;

        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price;
            } else {
                maxProfit = Math.max(maxProfit, price - minPrice);
            }
        }

        return maxProfit;
    }
}

