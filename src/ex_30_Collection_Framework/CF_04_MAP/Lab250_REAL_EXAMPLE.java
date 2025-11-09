package ex_30_Collection_Framework.CF_04_MAP;

import java.util.*;

public class Lab250_REAL_EXAMPLE {
    public static void main(String[] args) {
        // Storing environment-specific configurations
        Map<String, String> envConfig = new HashMap<>();
        envConfig.put("production", "https://prod.api.com");
        envConfig.put("staging", "https://staging.api.com");

        // Managing user credentials
        Map<String, String> credentials = new HashMap<>();
        credentials.put("admin", "admin123");
        credentials.put("user", "user123");
        credentials.put("user", null);
        credentials.put("user2", null);


        // Sending the data from Map to JSON, JSON TO MAP - API Automation

        // Web Selenium - Store the Webelements with keys.

        Map<String,String> map = new HashMap(10);
        // initialCapacity -> 10
        // 20 -> Load * new value = Total Capacity -> Hashmap -> increased.


    }
}
