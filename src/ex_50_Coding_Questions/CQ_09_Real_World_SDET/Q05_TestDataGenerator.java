package ex_50_Coding_Questions.CQ_09_Real_World_SDET;

import java.util.*;

/**
 * Q05: Test Data Generator
 * ========================
 * DIFFICULTY: Easy
 * ASKED AT: SDET Interviews
 *
 * Problem: Generate random test data.
 * Real Use: Test data creation, load testing.
 */
public class Q05_TestDataGenerator {

    private static final Random random = new Random();

    private static final String[] FIRST_NAMES = {"John", "Jane", "Bob", "Alice", "Charlie", "Diana"};
    private static final String[] LAST_NAMES = {"Smith", "Johnson", "Williams", "Brown", "Jones"};
    private static final String[] DOMAINS = {"gmail.com", "yahoo.com", "test.com", "example.org"};
    private static final String[] CITIES = {"New York", "Los Angeles", "Chicago", "Houston", "Phoenix"};

    public static void main(String[] args) {
        System.out.println("=== Generate Random Users ===\n");

        List<Map<String, Object>> users = generateUsers(5);
        users.forEach(user -> System.out.println(user));

        System.out.println("\n=== Generate Random String ===");
        System.out.println("Random String (10): " + generateRandomString(10));
        System.out.println("Random Alphanumeric (8): " + generateAlphanumeric(8));

        System.out.println("\n=== Generate Random Numbers ===");
        System.out.println("Random Int (1-100): " + generateRandomInt(1, 100));
        System.out.println("Random Phone: " + generatePhoneNumber());
    }

    // Generate list of random users
    public static List<Map<String, Object>> generateUsers(int count) {
        List<Map<String, Object>> users = new ArrayList<>();

        for (int i = 0; i < count; i++) {
            Map<String, Object> user = new LinkedHashMap<>();
            String firstName = FIRST_NAMES[random.nextInt(FIRST_NAMES.length)];
            String lastName = LAST_NAMES[random.nextInt(LAST_NAMES.length)];

            user.put("id", i + 1);
            user.put("firstName", firstName);
            user.put("lastName", lastName);
            user.put("email", firstName.toLowerCase() + "." + lastName.toLowerCase() +
                    "@" + DOMAINS[random.nextInt(DOMAINS.length)]);
            user.put("age", generateRandomInt(18, 65));
            user.put("city", CITIES[random.nextInt(CITIES.length)]);
            user.put("phone", generatePhoneNumber());

            users.add(user);
        }

        return users;
    }

    // Generate random string
    public static String generateRandomString(int length) {
        String chars = "abcdefghijklmnopqrstuvwxyz";
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }
        return sb.toString();
    }

    // Generate alphanumeric string
    public static String generateAlphanumeric(int length) {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }
        return sb.toString();
    }

    // Generate random int in range
    public static int generateRandomInt(int min, int max) {
        return random.nextInt(max - min + 1) + min;
    }

    // Generate phone number
    public static String generatePhoneNumber() {
        return String.format("(%03d) %03d-%04d",
                generateRandomInt(100, 999),
                generateRandomInt(100, 999),
                generateRandomInt(1000, 9999));
    }
}

