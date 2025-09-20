package ex_04_Operators;

public class Task001 {
    public static void main(String[] args) {

        // Print the table of 9 or 5 using the System.out.printf
        int num = 9;
        // 9x1=9
        // 9x2=18
        // int -> %d, String -> %s, Char -%c, float -> %f
        System.out.printf("%dx1=%d",num,num*1);
        System.out.println();
        System.out.printf("%dx2=%d",num,num*2).println();
        System.out.printf("%dx3=%d",num,num*3).println();
        System.out.println("...");
        System.out.printf("%dx9=%d",num,num*9).println();
        System.out.printf("%dx10=%d",num,num*10).println();



    }
}
