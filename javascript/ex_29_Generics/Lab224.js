// NOTE: JavaScript has no generics. Type safety is not enforced at compile time. TypeScript provides generics if needed.

temp_sum_t(10, 10);
temp_sum_t(10.34, 10.45);
temp_sum_t("Pramod", "Dutta");

// static Integer temp_sum(Integer a, Integer b){
//     return a+b;
// }
// static Double temp_sum(Double a, Double b){
//     return a+b;
// }

// In JavaScript, functions naturally accept any type - no generics needed
function temp_sum_t(a, b) {
    return null;
}

// static <MODI> MODI temp_sum1(MODI a, MODI b){
//     return null;
// }
