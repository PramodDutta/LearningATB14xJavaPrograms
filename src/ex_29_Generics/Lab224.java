package ex_29_Generics;

public class Lab224 {

    public static void main(String[] args) {
        temp_sum_t(10,10);
        temp_sum_t(10.34,10.45);
        temp_sum_t("Pramod","Dutta");
    }

//    static Integer temp_sum(Integer a,Integer b){
//        return a+b;
//    }
//    static Double temp_sum(Double a,Double b){
//        return a+b;
//    }

    static <T> T temp_sum_t(T a, T b) {
        return null;
    }

//    static <MODI> MODI temp_sum1(MODI a, MODI b){
//        return null;
//    }


}

