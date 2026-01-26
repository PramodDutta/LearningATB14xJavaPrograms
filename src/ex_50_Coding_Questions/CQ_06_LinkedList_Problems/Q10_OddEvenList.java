package ex_50_Coding_Questions.CQ_06_LinkedList_Problems;

/**
 * Q10: Odd Even Linked List
 * =========================
 * DIFFICULTY: Medium
 * ASKED AT: Amazon, Microsoft
 *
 * Problem: Group odd-indexed nodes followed by even-indexed nodes.
 * Input: 1->2->3->4->5
 * Output: 1->3->5->2->4
 */
public class Q10_OddEvenList {

    public static void main(String[] args) {
        ListNode head = ListNode.fromArray(new int[]{1, 2, 3, 4, 5});

        System.out.print("Original: ");
        ListNode.print(head);

        System.out.print("Odd-Even: ");
        ListNode.print(oddEvenList(head));
    }

    // ============================================
    // Two Pointers
    // Time: O(n), Space: O(1)
    // ============================================
    public static ListNode oddEvenList(ListNode head) {
        if (head == null) return null;

        ListNode odd = head;
        ListNode even = head.next;
        ListNode evenHead = even;

        while (even != null && even.next != null) {
            odd.next = even.next;
            odd = odd.next;
            even.next = odd.next;
            even = even.next;
        }

        odd.next = evenHead;

        return head;
    }
}

