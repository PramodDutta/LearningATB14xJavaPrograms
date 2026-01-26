package ex_50_Coding_Questions.CQ_06_LinkedList_Problems;

/**
 * Q08: Add Two Numbers
 * ====================
 * DIFFICULTY: Medium
 * ASKED AT: Amazon, Microsoft, Google, Facebook
 *
 * Problem: Add two numbers represented as linked lists (reverse order).
 * Input: (2->4->3) + (5->6->4) = 342 + 465
 * Output: 7->0->8 (807)
 */
public class Q08_AddTwoNumbers {

    public static void main(String[] args) {
        ListNode l1 = ListNode.fromArray(new int[]{2, 4, 3});  // 342
        ListNode l2 = ListNode.fromArray(new int[]{5, 6, 4});  // 465

        System.out.print("Number 1: ");
        ListNode.print(l1);
        System.out.print("Number 2: ");
        ListNode.print(l2);

        System.out.print("Sum: ");
        ListNode.print(addTwoNumbers(l1, l2));
    }

    // ============================================
    // Elementary Math with Carry
    // Time: O(max(m, n)), Space: O(max(m, n))
    // ============================================
    public static ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode current = dummy;
        int carry = 0;

        while (l1 != null || l2 != null || carry != 0) {
            int sum = carry;

            if (l1 != null) {
                sum += l1.val;
                l1 = l1.next;
            }

            if (l2 != null) {
                sum += l2.val;
                l2 = l2.next;
            }

            carry = sum / 10;
            current.next = new ListNode(sum % 10);
            current = current.next;
        }

        return dummy.next;
    }
}

