package ex_50_Coding_Questions.CQ_06_LinkedList_Problems;

/**
 * Q02: Detect Cycle in Linked List
 * ================================
 * DIFFICULTY: Easy
 * ASKED AT: Amazon, Microsoft, Google
 *
 * Problem: Detect if linked list has a cycle.
 * Time: O(n), Space: O(1)
 */
public class Q02_DetectCycle {

    public static void main(String[] args) {
        // Create list with cycle
        ListNode head = new ListNode(1);
        head.next = new ListNode(2);
        head.next.next = new ListNode(3);
        head.next.next.next = new ListNode(4);
        head.next.next.next.next = head.next;  // Cycle to node 2

        System.out.println("Has Cycle: " + hasCycle(head));

        // List without cycle
        ListNode head2 = ListNode.fromArray(new int[]{1, 2, 3, 4, 5});
        System.out.println("Has Cycle: " + hasCycle(head2));
    }

    // ============================================
    // Floyd's Cycle Detection (Tortoise and Hare)
    // Time: O(n), Space: O(1)
    // ============================================
    public static boolean hasCycle(ListNode head) {
        if (head == null || head.next == null) {
            return false;
        }

        ListNode slow = head;
        ListNode fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;

            if (slow == fast) {
                return true;
            }
        }

        return false;
    }

    // ============================================
    // Find Start of Cycle
    // ============================================
    public static ListNode detectCycleStart(ListNode head) {
        if (head == null || head.next == null) {
            return null;
        }

        ListNode slow = head;
        ListNode fast = head;

        // Find meeting point
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;

            if (slow == fast) {
                // Find cycle start
                slow = head;
                while (slow != fast) {
                    slow = slow.next;
                    fast = fast.next;
                }
                return slow;
            }
        }

        return null;
    }
}

