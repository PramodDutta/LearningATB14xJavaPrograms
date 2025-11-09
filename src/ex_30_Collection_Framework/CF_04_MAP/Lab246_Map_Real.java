package ex_30_Collection_Framework.CF_04_MAP;

import java.util.*;

public class Lab246_Map_Real {
    public static void main(String[] args) {
        Map<String,Object> student1 = new HashMap();
        student1.put("name","Diwakar");
        student1.put("phone","976543210");
        student1.put("address","BLR");
        student1.put("home_address","BTM");

        System.out.println(student1);

        Map<String,Object> student2 = new LinkedHashMap<>();
        student2.put("name","Diksha");
        student2.put("phone","976543210");
        student2.put("address","DEL");
        student2.put("home_address","RG");

        System.out.println(student2);


        Set book_read_items = new HashSet();
        book_read_items.add("Rich dad Poor Dad");
        book_read_items.add("Sapaiens");
        book_read_items.add("Secret");
        book_read_items.add("Atomic Habit");
        book_read_items.add("Atomic Habit");
        book_read_items.add("Eat the Frog");


    }
}
