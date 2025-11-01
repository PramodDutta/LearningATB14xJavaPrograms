package ex_27_Exceptions;

public class Lab207_Try_Catch {
    public static void main(String[] args) {
        String s1 = null;

        try {
            s1.trim();
        } catch (Exception e) {
            System.out.println("Error, Trim not allowed for the null values");
        }


        // unchecked null pointer
    }
}
