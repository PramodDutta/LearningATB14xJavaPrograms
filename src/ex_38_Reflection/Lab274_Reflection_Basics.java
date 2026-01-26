package ex_38_Reflection;

import java.lang.reflect.*;

/**
 * LAB 274: Reflection API Basics
 * ==============================
 * Topics Covered:
 * 1. What is Reflection?
 * 2. Getting Class information
 * 3. Inspecting fields, methods, constructors
 * 4. Creating instances dynamically
 *
 * WHY IMPORTANT FOR SDET?
 * - Test frameworks use reflection (JUnit, TestNG)
 * - Page Object Model frameworks
 * - Dynamic test data generation
 * - Accessing private fields for testing
 */
public class Lab274_Reflection_Basics {

    public static void main(String[] args) throws Exception {

        // ============================================
        // 1. Getting Class Object
        // ============================================
        System.out.println("===== 1. Getting Class Object =====");

        // Method 1: Using .class
        Class<?> class1 = Employee.class;
        System.out.println("Method 1: " + class1.getName());

        // Method 2: Using getClass()
        Employee emp = new Employee();
        Class<?> class2 = emp.getClass();
        System.out.println("Method 2: " + class2.getName());

        // Method 3: Using Class.forName()
        Class<?> class3 = Class.forName("ex_38_Reflection.Employee");
        System.out.println("Method 3: " + class3.getName());

        // ============================================
        // 2. Class Information
        // ============================================
        System.out.println("\n===== 2. Class Information =====");

        Class<?> clazz = Employee.class;

        System.out.println("Simple Name: " + clazz.getSimpleName());
        System.out.println("Package: " + clazz.getPackageName());
        System.out.println("Superclass: " + clazz.getSuperclass().getSimpleName());
        System.out.println("Is Interface: " + clazz.isInterface());
        System.out.println("Modifiers: " + Modifier.toString(clazz.getModifiers()));

        // Interfaces implemented
        Class<?>[] interfaces = clazz.getInterfaces();
        System.out.print("Interfaces: ");
        for (Class<?> i : interfaces) {
            System.out.print(i.getSimpleName() + " ");
        }
        System.out.println();

        // ============================================
        // 3. Inspecting Fields
        // ============================================
        System.out.println("\n===== 3. Fields =====");

        // All declared fields (including private)
        Field[] fields = clazz.getDeclaredFields();
        System.out.println("Declared Fields:");
        for (Field field : fields) {
            System.out.println("  " + Modifier.toString(field.getModifiers()) +
                    " " + field.getType().getSimpleName() + " " + field.getName());
        }

        // ============================================
        // 4. Inspecting Methods
        // ============================================
        System.out.println("\n===== 4. Methods =====");

        Method[] methods = clazz.getDeclaredMethods();
        System.out.println("Declared Methods:");
        for (Method method : methods) {
            System.out.println("  " + method.getName() +
                    "() -> " + method.getReturnType().getSimpleName());
        }

        // ============================================
        // 5. Inspecting Constructors
        // ============================================
        System.out.println("\n===== 5. Constructors =====");

        Constructor<?>[] constructors = clazz.getDeclaredConstructors();
        System.out.println("Constructors:");
        for (Constructor<?> constructor : constructors) {
            System.out.print("  " + constructor.getName() + "(");
            Class<?>[] params = constructor.getParameterTypes();
            for (int i = 0; i < params.length; i++) {
                System.out.print(params[i].getSimpleName());
                if (i < params.length - 1) System.out.print(", ");
            }
            System.out.println(")");
        }

        // ============================================
        // 6. Create Instance Dynamically
        // ============================================
        System.out.println("\n===== 6. Create Instance =====");

        // Using no-arg constructor
        Employee emp1 = (Employee) clazz.getDeclaredConstructor().newInstance();
        System.out.println("Created with no-arg: " + emp1);

        // Using parameterized constructor
        Constructor<?> paramConstructor = clazz.getDeclaredConstructor(int.class, String.class, double.class);
        Employee emp2 = (Employee) paramConstructor.newInstance(101, "John", 50000.0);
        System.out.println("Created with params: " + emp2);

        // ============================================
        // 7. Access and Modify Fields
        // ============================================
        System.out.println("\n===== 7. Access Fields =====");

        Employee emp3 = new Employee(102, "Alice", 60000.0);

        // Access private field
        Field nameField = clazz.getDeclaredField("name");
        nameField.setAccessible(true);  // Bypass private access
        System.out.println("Original name: " + nameField.get(emp3));

        // Modify private field
        nameField.set(emp3, "Alice Smith");
        System.out.println("Modified name: " + nameField.get(emp3));

        // ============================================
        // 8. Invoke Methods
        // ============================================
        System.out.println("\n===== 8. Invoke Methods =====");

        // Invoke public method
        Method getNameMethod = clazz.getDeclaredMethod("getName");
        String name = (String) getNameMethod.invoke(emp3);
        System.out.println("getName(): " + name);

        // Invoke private method
        Method privateMethod = clazz.getDeclaredMethod("calculateBonus");
        privateMethod.setAccessible(true);
        double bonus = (double) privateMethod.invoke(emp3);
        System.out.println("calculateBonus(): " + bonus);
    }
}

class Employee implements Comparable<Employee> {
    private int id;
    private String name;
    private double salary;

    public Employee() {}

    public Employee(int id, String name, double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
    }

    public int getId() { return id; }
    public String getName() { return name; }
    public double getSalary() { return salary; }

    public void setName(String name) { this.name = name; }

    private double calculateBonus() { return salary * 0.1; }

    @Override
    public int compareTo(Employee o) { return Integer.compare(this.id, o.id); }

    @Override
    public String toString() {
        return "Employee{id=" + id + ", name='" + name + "', salary=" + salary + "}";
    }
}

