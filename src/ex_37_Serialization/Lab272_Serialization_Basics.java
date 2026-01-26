package ex_37_Serialization;

import java.io.*;

/**
 * LAB 272: Serialization Basics
 * =============================
 * Topics Covered:
 * 1. What is Serialization?
 * 2. Serializable interface
 * 3. ObjectOutputStream - writing objects
 * 4. ObjectInputStream - reading objects
 *
 * WHY IMPORTANT FOR SDET?
 * - Saving/loading test data objects
 * - Caching test configurations
 * - Understanding API data transfer
 * - Deep cloning objects for tests
 */
public class Lab272_Serialization_Basics {

    public static void main(String[] args) {

        // ============================================
        // PART 1: What is Serialization?
        // ============================================
        System.out.println("===== WHAT IS SERIALIZATION? =====");
        System.out.println("Serialization: Converting object to byte stream");
        System.out.println("Deserialization: Converting byte stream back to object");
        System.out.println("Use cases: Save to file, send over network, caching");

        // ============================================
        // PART 2: Create and Serialize Object
        // ============================================
        System.out.println("\n===== SERIALIZE OBJECT =====");

        // Create object
        Person person = new Person("John Doe", 30, "john@test.com");
        System.out.println("Original: " + person);

        // Serialize to file
        String filename = "src/ex_37_Serialization/person.ser";

        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(filename))) {
            oos.writeObject(person);
            System.out.println("Object serialized to: " + filename);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // ============================================
        // PART 3: Deserialize Object
        // ============================================
        System.out.println("\n===== DESERIALIZE OBJECT =====");

        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(filename))) {
            Person loadedPerson = (Person) ois.readObject();
            System.out.println("Loaded: " + loadedPerson);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }

        // ============================================
        // PART 4: Serialize Multiple Objects
        // ============================================
        System.out.println("\n===== MULTIPLE OBJECTS =====");

        Person[] people = {
                new Person("Alice", 25, "alice@test.com"),
                new Person("Bob", 35, "bob@test.com"),
                new Person("Charlie", 28, "charlie@test.com")
        };

        String arrayFile = "src/ex_37_Serialization/people.ser";

        // Serialize array
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(arrayFile))) {
            oos.writeObject(people);
            System.out.println("Array serialized!");
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Deserialize array
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(arrayFile))) {
            Person[] loadedPeople = (Person[]) ois.readObject();
            System.out.println("Loaded " + loadedPeople.length + " people:");
            for (Person p : loadedPeople) {
                System.out.println("  " + p);
            }
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }

        // ============================================
        // PART 5: transient Keyword
        // ============================================
        System.out.println("\n===== TRANSIENT KEYWORD =====");

        UserCredentials creds = new UserCredentials("admin", "secret123");
        System.out.println("Before: " + creds);

        String credsFile = "src/ex_37_Serialization/creds.ser";

        // Serialize
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(credsFile))) {
            oos.writeObject(creds);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Deserialize
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(credsFile))) {
            UserCredentials loadedCreds = (UserCredentials) ois.readObject();
            System.out.println("After: " + loadedCreds);
            System.out.println("Note: password is null (transient field not serialized)");
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }

        // ============================================
        // PART 6: serialVersionUID
        // ============================================
        System.out.println("\n===== serialVersionUID =====");
        System.out.println("serialVersionUID ensures version compatibility");
        System.out.println("If class changes, old serialized data may not load");
        System.out.println("Always define: private static final long serialVersionUID = 1L;");
    }
}

// Serializable class
class Person implements Serializable {
    private static final long serialVersionUID = 1L;

    private String name;
    private int age;
    private String email;

    public Person(String name, int age, String email) {
        this.name = name;
        this.age = age;
        this.email = email;
    }

    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + ", email='" + email + "'}";
    }
}

// Class with transient field
class UserCredentials implements Serializable {
    private static final long serialVersionUID = 1L;

    private String username;
    private transient String password;  // Won't be serialized!

    public UserCredentials(String username, String password) {
        this.username = username;
        this.password = password;
    }

    @Override
    public String toString() {
        return "UserCredentials{username='" + username + "', password='" + password + "'}";
    }
}

