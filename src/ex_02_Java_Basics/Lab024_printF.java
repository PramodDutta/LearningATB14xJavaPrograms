package ex_02_Java_Basics;

public class Lab024_printF {
    public static void main(String[] args) {

        int a= 10;
        int b = 20;
//        System.out.println(a);
//        System.out.println(b);

//        System.out.print(a);
//        System.out.print(b);

        System.out.printf("Value of a=%d",a);
        System.out.println();
        System.out.printf("Value of b=%d",b);

        // %d -> int, byte, long, short, - data type
        // %s -> String
        // %f -> float, double,
        // %b ->boolean

        System.out.println();
        int table = 9;
        System.out.printf("%dx1=%d", table, table*1);




    }
}
