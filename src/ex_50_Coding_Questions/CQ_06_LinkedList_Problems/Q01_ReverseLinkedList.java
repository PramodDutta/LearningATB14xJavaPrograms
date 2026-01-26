package ex_50_Coding_Questions.CQ_06_LinkedList_Problems;

/**
 * Q01: Reverse Linked List
 * ========================
 * DIFFICULTY: Easy
 * ASKED AT: Amazon, Microsoft, Google (VERY COMMON)
 *
 * Problem: Reverse a singly linked list.
 * Input: 1 -> 2 -> 3 -> 4 -> 5
 * Output: 5 -> 4 -> 3 -> 2 -> 1
 */
public class Q01_ReverseLinkedList {

    public static void main(String[] args) {
        ListNode head = ListNode.fromArray(new int[]{1, 2, 3, 4, 5});

        System.out.print("Original: ");
        ListNode.print(head);

        System.out.print("Reversed (Iterative): ");
        ListNode reversed = reverseIterative(head);
        ListNode.print(reversed);

        // Reset for recursive
        head = ListNode.fromArray(new int[]{1, 2, 3, 4, 5});
        System.out.print("Reversed (Recursive): ");
        ListNode.print(reverseRecursive(head));
    }

    // ============================================
    // METHOD 1: Iterative
    // Time: O(n), Space: O(1)
    // ============================================
    public static ListNode reverseIterative(ListNode head) {
        ListNode prev = null;
        ListNode current = head;

        while (current != null) {
            ListNode next = current.next;  // Save next
            current.next = prev;           // Reverse link
            prev = current;                // Move prev forward
            current = next;                // Move current forward
        }

        return prev;
    }

    // ============================================
    // METHOD 2: Recursive
    // Time: O(n), Space: O(n)
    // ============================================
    public static ListNode reverseRecursive(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }

        ListNode newHead = reverseRecursive(head.next);
        head.next.next = head;
        head.next = null;

        return newHead;
    }
}

