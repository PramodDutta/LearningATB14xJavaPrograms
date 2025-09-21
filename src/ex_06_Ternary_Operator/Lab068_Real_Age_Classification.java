package ex_06_Ternary_Operator;

public class Lab068_Real_Age_Classification {
    public static void main(String[] pramod_args) {

        String user_input = pramod_args[0]; // 68
        System.out.println(user_input);
        System.out.println(user_input instanceof String);

        // Input - String
        // String - Int
        int age = Integer.parseInt(user_input);

        String result = (age < 18) ? "Minor" : (age <= 60) ? "Adult": "Sr. Citizen";
        System.out.println(result);








    }
}
