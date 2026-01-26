package ex_50_Coding_Questions.CQ_06_LinkedList_Problems;

/**
 * Q09: Remove Duplicates from Sorted List
 * =======================================
 * DIFFICULTY: Easy
 * ASKED AT: Amazon, Microsoft
 *
 * Problem: Remove duplicates from sorted linked list.
 * Input: 1->1->2->3->3
 * Output: 1->2->3
 */
public class Q09_RemoveDuplicates {

    public static void main(String[] args) {
        ListNode head = ListNode.fromArray(new int[]{1, 1, 2, 3, 3});

        System.out.print("Original: ");
        ListNode.print(head);

        System.out.print("After removing duplicates: ");
        ListNode.print(deleteDuplicates(head));
    }

    // ============================================
    // Single Pass
    // Time: O(n), Space: O(1)
    // ============================================
    public static ListNode deleteDuplicates(ListNode head) {
        ListNode current = head;

        while (current != null && current.next != null) {
            if (current.val == current.next.val) {
                current.next = current.next.next;
            } else {
                current = current.next;
            }
        }

        return head;
    }
}

