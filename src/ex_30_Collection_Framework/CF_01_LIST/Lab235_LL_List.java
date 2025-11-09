package ex_30_Collection_Framework.CF_01_LIST;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class Lab235_LL_List {

    public static void main(String[] args) {
        List mylist_a = new ArrayList();
        List mylist2 = new ArrayList(10);
        List mylist3 = List.of("12","23");

        List mylist = new LinkedList();
        mylist.add(1);
        mylist.add(2);
        mylist.add(3);
        mylist.add(4);
        mylist.add(4);
        System.out.println(mylist);



    }

}
