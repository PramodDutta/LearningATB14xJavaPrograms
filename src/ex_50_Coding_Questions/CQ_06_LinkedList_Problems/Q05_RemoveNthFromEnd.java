package ex_50_Coding_Questions.CQ_06_LinkedList_Problems;

/**
 * Q05: Remove Nth Node From End
 * =============================
 * DIFFICULTY: Medium
 * ASKED AT: Amazon, Facebook, Microsoft
 *
 * Problem: Remove nth node from end of list.
 * Input: 1->2->3->4->5, n=2
 * Output: 1->2->3->5
 */
public class Q05_RemoveNthFromEnd {

    public static void main(String[] args) {
        ListNode head = ListNode.fromArray(new int[]{1, 2, 3, 4, 5});
        int n = 2;

        System.out.print("Original: ");
        ListNode.print(head);

        System.out.print("After removing " + n + "th from end: ");
        ListNode.print(removeNthFromEnd(head, n));
    }

    // ============================================
    // Two Pointers (One Pass)
    // Time: O(n), Space: O(1)
    // ============================================
    public static ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;

        ListNode fast = dummy;
        ListNode slow = dummy;

        // Move fast n+1 steps ahead
        for (int i = 0; i <= n; i++) {
            fast = fast.next;
        }

        // Move both until fast reaches end
        while (fast != null) {
            fast = fast.next;
            slow = slow.next;
        }

        // Remove the node
        slow.next = slow.next.next;

        return dummy.next;
    }
}

