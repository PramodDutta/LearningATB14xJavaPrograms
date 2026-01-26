package ex_37_Serialization;

import java.io.*;
import java.util.*;

/**
 * LAB 273: Serialization for SDET - Practical Examples
 * ====================================================
 * Real-world scenarios in test automation
 */
public class Lab273_Serialization_SDET {

    public static void main(String[] args) {

        // ============================================
        // SCENARIO 1: Save/Load Test Configuration
        // ============================================
        System.out.println("===== SCENARIO 1: Test Configuration =====");

        TestConfig config = new TestConfig();
        config.setBrowser("chrome");
        config.setBaseUrl("https://example.com");
        config.setHeadless(true);
        config.setTimeout(30);
        config.setEnvironment("staging");

        // Save config
        saveObject(config, "src/ex_37_Serialization/test_config.ser");
        System.out.println("Config saved: " + config);

        // Load config
        TestConfig loadedConfig = (TestConfig) loadObject("src/ex_37_Serialization/test_config.ser");
        System.out.println("Config loaded: " + loadedConfig);

        // ============================================
        // SCENARIO 2: Cache Test Data
        // ============================================
        System.out.println("\n===== SCENARIO 2: Cache Test Data =====");

        List<TestUser> testUsers = Arrays.asList(
                new TestUser("user1", "pass1", "admin"),
                new TestUser("user2", "pass2", "user"),
                new TestUser("user3", "pass3", "guest")
        );

        // Save test data
        saveObject(testUsers, "src/ex_37_Serialization/test_users.ser");
        System.out.println("Test users cached!");

        // Load test data
        @SuppressWarnings("unchecked")
        List<TestUser> loadedUsers = (List<TestUser>) loadObject("src/ex_37_Serialization/test_users.ser");
        System.out.println("Loaded users:");
        loadedUsers.forEach(u -> System.out.println("  " + u));

        // ============================================
        // SCENARIO 3: Deep Clone Object
        // ============================================
        System.out.println("\n===== SCENARIO 3: Deep Clone =====");

        TestUser original = new TestUser("original", "pass", "admin");
        TestUser clone = deepClone(original);

        System.out.println("Original: " + original);
        System.out.println("Clone: " + clone);
        System.out.println("Same object? " + (original == clone));
        System.out.println("Equal values? " + original.getUsername().equals(clone.getUsername()));

        // ============================================
        // SCENARIO 4: Save Test Results
        // ============================================
        System.out.println("\n===== SCENARIO 4: Test Results =====");

        TestExecutionResult result = new TestExecutionResult();
        result.setTestName("LoginTest");
        result.setStatus("PASSED");
        result.setDuration(2500);
        result.setTimestamp(new Date());
        result.addLog("Step 1: Navigate to login page");
        result.addLog("Step 2: Enter credentials");
        result.addLog("Step 3: Click login button");
        result.addLog("Step 4: Verify dashboard");

        saveObject(result, "src/ex_37_Serialization/test_result.ser");

        TestExecutionResult loadedResult = (TestExecutionResult) loadObject("src/ex_37_Serialization/test_result.ser");
        System.out.println("Test: " + loadedResult.getTestName());
        System.out.println("Status: " + loadedResult.getStatus());
        System.out.println("Duration: " + loadedResult.getDuration() + "ms");
        System.out.println("Logs:");
        loadedResult.getLogs().forEach(log -> System.out.println("  " + log));
    }

    // Helper: Save object to file
    static void saveObject(Object obj, String filename) {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(filename))) {
            oos.writeObject(obj);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Helper: Load object from file
    static Object loadObject(String filename) {
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(filename))) {
            return ois.readObject();
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
            return null;
        }
    }

    // Helper: Deep clone using serialization
    @SuppressWarnings("unchecked")
    static <T extends Serializable> T deepClone(T obj) {
        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ObjectOutputStream oos = new ObjectOutputStream(baos);
            oos.writeObject(obj);

            ByteArrayInputStream bais = new ByteArrayInputStream(baos.toByteArray());
            ObjectInputStream ois = new ObjectInputStream(bais);
            return (T) ois.readObject();
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
            return null;
        }
    }
}

// Test Configuration class
class TestConfig implements Serializable {
    private static final long serialVersionUID = 1L;
    private String browser, baseUrl, environment;
    private boolean headless;
    private int timeout;

    // Getters and Setters
    public void setBrowser(String b) { browser = b; }
    public void setBaseUrl(String u) { baseUrl = u; }
    public void setHeadless(boolean h) { headless = h; }
    public void setTimeout(int t) { timeout = t; }
    public void setEnvironment(String e) { environment = e; }

    @Override
    public String toString() {
        return "TestConfig{browser='" + browser + "', url='" + baseUrl +
                "', headless=" + headless + ", timeout=" + timeout + "}";
    }
}

// Test User class
class TestUser implements Serializable {
    private static final long serialVersionUID = 1L;
    private String username, password, role;

    public TestUser(String u, String p, String r) { username = u; password = p; role = r; }
    public String getUsername() { return username; }

    @Override
    public String toString() {
        return "TestUser{username='" + username + "', role='" + role + "'}";
    }
}

// Test Execution Result class
class TestExecutionResult implements Serializable {
    private static final long serialVersionUID = 1L;
    private String testName, status;
    private long duration;
    private Date timestamp;
    private List<String> logs = new ArrayList<>();

    public void setTestName(String t) { testName = t; }
    public void setStatus(String s) { status = s; }
    public void setDuration(long d) { duration = d; }
    public void setTimestamp(Date t) { timestamp = t; }
    public void addLog(String log) { logs.add(log); }

    public String getTestName() { return testName; }
    public String getStatus() { return status; }
    public long getDuration() { return duration; }
    public List<String> getLogs() { return logs; }
}

