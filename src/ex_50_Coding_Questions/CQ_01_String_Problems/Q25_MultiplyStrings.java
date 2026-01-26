package ex_50_Coding_Questions.CQ_01_String_Problems;

/**
 * Q25: Multiply Strings
 * =====================
 * DIFFICULTY: Medium
 * ASKED AT: Amazon, Google, Facebook
 *
 * Problem: Multiply two numbers represented as strings.
 * Input: num1="123", num2="456" -> "56088"
 * Note: Cannot use BigInteger or convert directly to integer.
 */
public class Q25_MultiplyStrings {

    public static void main(String[] args) {
        System.out.println("123 * 456 = " + multiply("123", "456"));
        System.out.println("2 * 3 = " + multiply("2", "3"));
        System.out.println("999 * 999 = " + multiply("999", "999"));
    }

    // ============================================
    // Grade School Multiplication
    // Time: O(m * n), Space: O(m + n)
    // ============================================
    public static String multiply(String num1, String num2) {
        if (num1.equals("0") || num2.equals("0")) return "0";

        int m = num1.length(), n = num2.length();
        int[] result = new int[m + n];

        // Multiply each digit
        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                int mul = (num1.charAt(i) - '0') * (num2.charAt(j) - '0');
                int p1 = i + j, p2 = i + j + 1;

                int sum = mul + result[p2];
                result[p2] = sum % 10;
                result[p1] += sum / 10;
            }
        }

        // Build result string
        StringBuilder sb = new StringBuilder();
        for (int digit : result) {
            if (!(sb.isEmpty() && digit == 0)) {
                sb.append(digit);
            }
        }

        return sb.isEmpty() ? "0" : sb.toString();
    }
}

