package ex_27_Exceptions;

import java.util.Scanner;

public class LabThrow {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if(!scanner.next().equalsIgnoreCase("pramod")){
            throw new ArithmeticException("Hehehehe");
        }

        new Object();
    }
}
