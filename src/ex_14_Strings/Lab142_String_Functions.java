package ex_14_Strings;

public class Lab142_String_Functions {
    public static void main(String[] args) {
        //        String s1="HELLO"; // SCP
//        String s2= new String("world"); // OA
        String str1 = "Hello";
        String str2 = "Hello";
        String str3 = new String("Hello");
        System.out.println(str1 == str2);
        System.out.println(str1 == str3);
        System.out.println(str1.equals(str3));

        System.out.println(str1.concat(str3));



    }
}
