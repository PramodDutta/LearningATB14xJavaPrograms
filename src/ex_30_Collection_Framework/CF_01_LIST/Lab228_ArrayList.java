package ex_30_Collection_Framework.CF_01_LIST;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Lab228_ArrayList {
    public static void main(String[] args) {
        List list = new ArrayList();
        list.add("1"); // 0
        list.add("2"); // 1
        list.add("3");// 2
        list.add("3"); // 3
        list.add(4);
        list.add(true);

        System.out.println(list.size());
        System.out.println(list.isEmpty());
        System.out.println(list.contains("1"));
        System.out.println(list.contains(1));
        System.out.println(list.indexOf("3"));
        System.out.println(list.lastIndexOf("3"));

        System.out.println(list);

        System.out.println(" --- ");
        for (int i = 0; i < list.size() ; i++) {
            System.out.println(list.get(i));
        }

        System.out.println(" --- ");
        for (Object o:list){
            System.out.println(o);
        }

        System.out.println(" ----- ");
        Iterator iterator  = list.iterator();
        while (iterator.hasNext()){
            System.out.println(iterator.next());
        }



    }
}
