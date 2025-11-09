package ex_30_Collection_Framework.CF_01_LIST;

import java.util.ArrayList;
import java.util.List;

public class Lab227_List {
    public static void main(String[] args) {
        List fruits = List.of("orange","apple","guava","mango","watermelon");
        System.out.println(fruits);

        List arrayList = new ArrayList();
        arrayList.add("pramod");
        arrayList.add("pramod");
        arrayList.add("dutta");
        arrayList.add(true);
        arrayList.add(1.23);
        arrayList.add(123);

        System.out.println(arrayList);
        System.out.println(arrayList.size());





    }
}
