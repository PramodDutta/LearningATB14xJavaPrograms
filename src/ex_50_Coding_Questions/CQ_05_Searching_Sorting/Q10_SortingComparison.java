package ex_50_Coding_Questions.CQ_05_Searching_Sorting;

/**
 * Q10: Sorting Algorithms Comparison
 * ==================================
 * DIFFICULTY: N/A (Reference)
 * ASKED AT: Interview Theory Questions
 *
 * Summary of all sorting algorithms for quick reference.
 */
public class Q10_SortingComparison {

    public static void main(String[] args) {
        System.out.println("╔══════════════════════════════════════════════════════════════════════╗");
        System.out.println("║              SORTING ALGORITHMS COMPARISON                           ║");
        System.out.println("╠══════════════════════════════════════════════════════════════════════╣");
        System.out.println("║ Algorithm      │ Best      │ Average   │ Worst     │ Space  │ Stable║");
        System.out.println("╠══════════════════════════════════════════════════════════════════════╣");
        System.out.println("║ Bubble Sort    │ O(n)      │ O(n²)     │ O(n²)     │ O(1)   │ Yes   ║");
        System.out.println("║ Selection Sort │ O(n²)     │ O(n²)     │ O(n²)     │ O(1)   │ No    ║");
        System.out.println("║ Insertion Sort │ O(n)      │ O(n²)     │ O(n²)     │ O(1)   │ Yes   ║");
        System.out.println("║ Merge Sort     │ O(n log n)│ O(n log n)│ O(n log n)│ O(n)   │ Yes   ║");
        System.out.println("║ Quick Sort     │ O(n log n)│ O(n log n)│ O(n²)     │ O(logn)│ No    ║");
        System.out.println("║ Heap Sort      │ O(n log n)│ O(n log n)│ O(n log n)│ O(1)   │ No    ║");
        System.out.println("║ Counting Sort  │ O(n+k)    │ O(n+k)    │ O(n+k)    │ O(k)   │ Yes   ║");
        System.out.println("║ Radix Sort     │ O(nk)     │ O(nk)     │ O(nk)     │ O(n+k) │ Yes   ║");
        System.out.println("╚══════════════════════════════════════════════════════════════════════╝");

        System.out.println("\n--- WHEN TO USE WHICH ---");
        System.out.println("• Small arrays (n < 50): Insertion Sort");
        System.out.println("• Nearly sorted: Insertion Sort");
        System.out.println("• Guaranteed O(n log n): Merge Sort");
        System.out.println("• In-place + fast: Quick Sort");
        System.out.println("• Stability required: Merge Sort");
        System.out.println("• Limited range integers: Counting Sort");
    }
}

