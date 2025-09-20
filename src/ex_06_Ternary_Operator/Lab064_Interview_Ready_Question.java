package ex_06_Ternary_Operator;

public class Lab064_Interview_Ready_Question {
    public static void main(String[] args) {
        int age = 21;

        // Nested Ternary
        // result = condition1 ? expression1 : (condition2 ? expression2 : expression3);

        String result = (age > 18) ? (age > 25 ? "You can drink" : "You can go to GOA, ButN can't Drink") : "No";
        System.out.println(result);
    }
}
