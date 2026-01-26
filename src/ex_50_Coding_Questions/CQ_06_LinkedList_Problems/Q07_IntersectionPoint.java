package ex_50_Coding_Questions.CQ_06_LinkedList_Problems;

/**
 * Q07: Intersection of Two Linked Lists
 * =====================================
 * DIFFICULTY: Easy
 * ASKED AT: Amazon, Microsoft, Facebook
 *
 * Problem: Find node where two lists intersect.
 * Time: O(n + m), Space: O(1)
 */
public class Q07_IntersectionPoint {

    public static void main(String[] args) {
        // Create intersecting lists
        ListNode common = ListNode.fromArray(new int[]{8, 4, 5});

        ListNode headA = new ListNode(4);
        headA.next = new ListNode(1);
        headA.next.next = common;

        ListNode headB = new ListNode(5);
        headB.next = new ListNode(6);
        headB.next.next = new ListNode(1);
        headB.next.next.next = common;

        ListNode intersection = getIntersectionNode(headA, headB);
        System.out.println("Intersection at: " + (intersection != null ? intersection.val : "null"));
    }

    // ============================================
    // Two Pointers Approach
    // Time: O(n + m), Space: O(1)
    // ============================================
    public static ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        if (headA == null || headB == null) return null;

        ListNode pA = headA;
        ListNode pB = headB;

        // When pA reaches end, redirect to headB
        // When pB reaches end, redirect to headA
        // They will meet at intersection or both become null
        while (pA != pB) {
            pA = (pA == null) ? headB : pA.next;
            pB = (pB == null) ? headA : pB.next;
        }

        return pA;
    }
}

