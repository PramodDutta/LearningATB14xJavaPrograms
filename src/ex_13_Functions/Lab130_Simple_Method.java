package ex_13_Functions;

public class Lab130_Simple_Method {
    public static void main(String[] args) {
        non_return_type_function();


        String name = return_string_type_function();
        System.out.println(name);


    }

    static void non_return_type_function() {
        System.out.println("Hi,there, No Return function!");
    }

    // Return Type - which return a data type (int, String, char, boolean, float)
    static String return_string_type_function() {
        System.out.println("Hi, there, I will return something.");
        return "dutta";
    }

    static boolean return_boolean(){
        return true;
    }

    static float return_float_pi_value(){
        return 3.14f;
    }

    static byte return_byte(){
        return 100;
    }

    static long return_long(){

        return 10l;
    }


}
