package ex_50_Coding_Questions.CQ_03_Number_Problems;

/**
 * Q13: Swap Two Numbers Without Temp Variable
 * ===========================================
 * DIFFICULTY: Easy
 * ASKED AT: TCS, Infosys, Wipro (VERY COMMON)
 *
 * Problem: Swap two numbers without using a third variable.
 */
public class Q13_SwapWithoutTemp {

    public static void main(String[] args) {
        System.out.println("--- SWAP WITHOUT TEMP ---\n");

        // Method 1: Using Arithmetic
        int a = 5, b = 10;
        System.out.println("Before: a=" + a + ", b=" + b);

        a = a + b;  // a = 15
        b = a - b;  // b = 5
        a = a - b;  // a = 10

        System.out.println("After (Arithmetic): a=" + a + ", b=" + b);

        // Method 2: Using XOR
        int x = 5, y = 10;
        System.out.println("\nBefore: x=" + x + ", y=" + y);

        x = x ^ y;
        y = x ^ y;
        x = x ^ y;

        System.out.println("After (XOR): x=" + x + ", y=" + y);

        // Method 3: Using Multiplication/Division
        int p = 5, q = 10;
        System.out.println("\nBefore: p=" + p + ", q=" + q);

        p = p * q;  // p = 50
        q = p / q;  // q = 5
        p = p / q;  // p = 10

        System.out.println("After (Multiply): p=" + p + ", q=" + q);
    }
}

