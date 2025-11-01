package ex_26_Wrapper_Class;

public class Lab203_Wrapper_Conversion {

    public static void main(String[] args) {
        String num = "10";
        int aa = 10;


        // String -> Wrapper Conversion
        Integer a = Integer.parseInt(num);
        // Double.parseDouble()
        // Float.parseFloat()
        // Long.parse

        // String to Primitive
        int a_p = Integer.parseInt(num);

        Integer aa3 = Integer.valueOf("10");
        System.out.println(aa3);

        Integer aa10 = 10;
        String s = aa10.toString();
        System.out.println(s);
        System.out.println(s instanceof String);



    }


}
