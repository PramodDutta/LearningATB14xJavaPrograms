package ex_26_Wrapper_Class;

public class Lab204_Wrapper {
    public static void main(String[] args) {
        int a= 10;
        Integer b = a;
        // Boxing - primitive - Wrapper - AutoBoxing - JVM will do it.
        System.out.println(b.intValue());
        System.out.println(b);
        System.out.println(a);

        // UnBoxing (wrapper -> primitive)
        Integer aa = 43;
        int a1 = aa; // UNBOXING
        System.out.println(a1);

    }
}
