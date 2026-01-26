package ex_50_Coding_Questions.CQ_06_LinkedList_Problems;

/**
 * Q03: Middle of Linked List
 * ==========================
 * DIFFICULTY: Easy
 * ASKED AT: Amazon, Microsoft
 *
 * Problem: Find middle node of linked list.
 * Input: 1 -> 2 -> 3 -> 4 -> 5
 * Output: 3
 */
public class Q03_MiddleOfList {

    public static void main(String[] args) {
        ListNode head = ListNode.fromArray(new int[]{1, 2, 3, 4, 5});

        System.out.print("List: ");
        ListNode.print(head);

        System.out.println("Middle: " + middleNode(head).val);

        // Even length
        ListNode head2 = ListNode.fromArray(new int[]{1, 2, 3, 4, 5, 6});
        System.out.print("List: ");
        ListNode.print(head2);
        System.out.println("Middle: " + middleNode(head2).val);
    }

    // ============================================
    // Two Pointers (Slow and Fast)
    // Time: O(n), Space: O(1)
    // ============================================
    public static ListNode middleNode(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        return slow;
    }
}

