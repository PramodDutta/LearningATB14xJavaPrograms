package ex_08_If_Condition;

public class Lab079_If {
    public static void main(String[] args) {

        String user_input = args[0];
        System.out.println(user_input);
        int age = Integer.parseInt(user_input);
        System.out.println(age);

        if (age > 18) {

            System.out.println("Yes you can vote!");

        } else {
            System.out.println("You can't vote!");
        }


    }
}
