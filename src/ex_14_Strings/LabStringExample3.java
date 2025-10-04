package ex_14_Strings;

public class LabStringExample3 {
    public static void main(String[] args) {
        String s = "Java".substring(2);
        System.out.println(s);

        String s1 = "Java".substring(1, 3);
        System.out.println(s1);

        char[] arr = "Java".toCharArray();
        System.out.println(arr); // ['J', 'a', 'v', 'a']

        String st = " Java ".trim(); // "Java"
        System.out.println(st);

        boolean b = "   ".isBlank();
        System.out.println(b);

        String s2 = "ab".repeat(3);
        System.out.println(s2);

        boolean b11 = "Java".equalsIgnoreCase("java");
        System.out.println(b11);


        long count = "a\nb\nc".lines().count();
        System.out.println(count);


    }
}
