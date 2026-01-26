package ex_50_Coding_Questions.CQ_06_LinkedList_Problems;

/**
 * Q04: Merge Two Sorted Lists
 * ===========================
 * DIFFICULTY: Easy
 * ASKED AT: Amazon, Microsoft, Google
 *
 * Problem: Merge two sorted linked lists.
 * Input: 1->2->4, 1->3->4
 * Output: 1->1->2->3->4->4
 */
public class Q04_MergeTwoLists {

    public static void main(String[] args) {
        ListNode l1 = ListNode.fromArray(new int[]{1, 2, 4});
        ListNode l2 = ListNode.fromArray(new int[]{1, 3, 4});

        System.out.print("List 1: ");
        ListNode.print(l1);
        System.out.print("List 2: ");
        ListNode.print(l2);

        System.out.print("Merged: ");
        ListNode.print(mergeTwoLists(l1, l2));
    }

    // ============================================
    // Iterative Approach
    // Time: O(n + m), Space: O(1)
    // ============================================
    public static ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode current = dummy;

        while (l1 != null && l2 != null) {
            if (l1.val <= l2.val) {
                current.next = l1;
                l1 = l1.next;
            } else {
                current.next = l2;
                l2 = l2.next;
            }
            current = current.next;
        }

        // Attach remaining
        current.next = (l1 != null) ? l1 : l2;

        return dummy.next;
    }

    // ============================================
    // Recursive Approach
    // Time: O(n + m), Space: O(n + m)
    // ============================================
    public static ListNode mergeTwoListsRecursive(ListNode l1, ListNode l2) {
        if (l1 == null) return l2;
        if (l2 == null) return l1;

        if (l1.val <= l2.val) {
            l1.next = mergeTwoListsRecursive(l1.next, l2);
            return l1;
        } else {
            l2.next = mergeTwoListsRecursive(l1, l2.next);
            return l2;
        }
    }
}

