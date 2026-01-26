package ex_50_Coding_Questions.CQ_01_String_Problems;

/**
 * Q03: Count Vowels and Consonants
 * ================================
 * DIFFICULTY: Easy
 * ASKED AT: TCS, Infosys, Cognizant, Accenture
 *
 * Problem: Count the number of vowels and consonants in a string.
 * Input: "Hello World"
 * Output: Vowels: 3, Consonants: 7
 */
public class Q03_CountVowelsConsonants {

    public static void main(String[] args) {
        String input = "Hello World";

        System.out.println("Input: \"" + input + "\"");
        System.out.println("\n--- SOLUTIONS ---");

        countMethod1(input);
        countMethod2(input);
        countMethod3(input);
    }

    // ============================================
    // METHOD 1: Using if-else
    // ============================================
    public static void countMethod1(String str) {
        int vowels = 0, consonants = 0;

        str = str.toLowerCase();

        for (int i = 0; i < str.length(); i++) {
            char ch = str.charAt(i);

            if (ch >= 'a' && ch <= 'z') {
                if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
                    vowels++;
                } else {
                    consonants++;
                }
            }
        }

        System.out.println("Method 1: Vowels=" + vowels + ", Consonants=" + consonants);
    }

    // ============================================
    // METHOD 2: Using String contains
    // ============================================
    public static void countMethod2(String str) {
        int vowels = 0, consonants = 0;
        String vowelSet = "aeiouAEIOU";

        for (char ch : str.toCharArray()) {
            if (Character.isLetter(ch)) {
                if (vowelSet.indexOf(ch) != -1) {
                    vowels++;
                } else {
                    consonants++;
                }
            }
        }

        System.out.println("Method 2: Vowels=" + vowels + ", Consonants=" + consonants);
    }

    // ============================================
    // METHOD 3: Using Stream API
    // ============================================
    public static void countMethod3(String str) {
        String vowelSet = "aeiouAEIOU";

        long vowels = str.chars()
                .filter(ch -> vowelSet.indexOf(ch) != -1)
                .count();

        long consonants = str.chars()
                .filter(Character::isLetter)
                .filter(ch -> vowelSet.indexOf(ch) == -1)
                .count();

        System.out.println("Method 3: Vowels=" + vowels + ", Consonants=" + consonants);
    }
}

