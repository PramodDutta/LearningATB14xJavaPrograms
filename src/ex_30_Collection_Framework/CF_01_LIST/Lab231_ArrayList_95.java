package ex_30_Collection_Framework.CF_01_LIST;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Lab231_ArrayList_95 {
    public static void main(String[] args) {
        List list = new ArrayList<>();
        list.add("bread"); // 0
        list.add("milk");  // 1
        list.add("butter"); // 2
        list.add("paneer");  //3
        list.add("jam");  //4
        list.add("cheeze");  //5
        list.add(123);  //6
        list.add(true);  //7

        System.out.println(list);
        System.out.println(list.size());
        System.out.println(list.contains("1"));


        System.out.println(" ---");

        for (Object o:list){
            System.out.println(o);
        }

        Iterator iterator = list.iterator();
        while (iterator.hasNext()){
            System.out.println(iterator.next());
        }
    }
}
