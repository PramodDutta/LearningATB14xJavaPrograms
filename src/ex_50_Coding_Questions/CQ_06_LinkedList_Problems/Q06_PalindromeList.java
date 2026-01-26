package ex_50_Coding_Questions.CQ_06_LinkedList_Problems;

/**
 * Q06: Palindrome Linked List
 * ===========================
 * DIFFICULTY: Easy
 * ASKED AT: Amazon, Facebook, Microsoft
 *
 * Problem: Check if linked list is palindrome.
 * Input: 1->2->2->1
 * Output: true
 */
public class Q06_PalindromeList {

    public static void main(String[] args) {
        ListNode head1 = ListNode.fromArray(new int[]{1, 2, 2, 1});
        ListNode head2 = ListNode.fromArray(new int[]{1, 2, 3});

        System.out.print("List 1: ");
        ListNode.print(head1);
        System.out.println("Is Palindrome: " + isPalindrome(head1));

        System.out.print("List 2: ");
        ListNode.print(head2);
        System.out.println("Is Palindrome: " + isPalindrome(head2));
    }

    // ============================================
    // Reverse Second Half and Compare
    // Time: O(n), Space: O(1)
    // ============================================
    public static boolean isPalindrome(ListNode head) {
        if (head == null || head.next == null) return true;

        // Find middle
        ListNode slow = head, fast = head;
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        // Reverse second half
        ListNode secondHalf = reverse(slow.next);

        // Compare
        ListNode p1 = head;
        ListNode p2 = secondHalf;

        while (p2 != null) {
            if (p1.val != p2.val) return false;
            p1 = p1.next;
            p2 = p2.next;
        }

        return true;
    }

    private static ListNode reverse(ListNode head) {
        ListNode prev = null;
        while (head != null) {
            ListNode next = head.next;
            head.next = prev;
            prev = head;
            head = next;
        }
        return prev;
    }
}

