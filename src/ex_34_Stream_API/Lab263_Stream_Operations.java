package ex_34_Stream_API;

import java.util.*;
import java.util.stream.Collectors;

/**
 * LAB 263: Stream Operations - filter, map, sorted, distinct
 * ==========================================================
 * Most commonly used Stream operations for SDET
 */
public class Lab263_Stream_Operations {

    public static void main(String[] args) {

        List<Employee> employees = Arrays.asList(
                new Employee(101, "John", "QA", 50000),
                new Employee(102, "Alice", "Dev", 70000),
                new Employee(103, "Bob", "QA", 55000),
                new Employee(104, "Charlie", "Dev", 80000),
                new Employee(105, "Diana", "QA", 60000),
                new Employee(106, "Eve", "SDET", 65000)
        );

        // ============================================
        // 1. FILTER - Select elements matching condition
        // ============================================
        System.out.println("===== 1. FILTER =====");

        // Get QA employees
        List<Employee> qaEmployees = employees.stream()
                .filter(e -> e.getDept().equals("QA"))
                .collect(Collectors.toList());

        System.out.println("QA Employees:");
        qaEmployees.forEach(e -> System.out.println("  " + e.getName()));

        // Get employees with salary > 60000
        employees.stream()
                .filter(e -> e.getSalary() > 60000)
                .forEach(e -> System.out.println("High earner: " + e.getName()));

        // ============================================
        // 2. MAP - Transform elements
        // ============================================
        System.out.println("\n===== 2. MAP =====");

        // Get all employee names
        List<String> names = employees.stream()
                .map(Employee::getName)
                .collect(Collectors.toList());
        System.out.println("Names: " + names);

        // Get names in uppercase
        List<String> upperNames = employees.stream()
                .map(e -> e.getName().toUpperCase())
                .collect(Collectors.toList());
        System.out.println("Upper: " + upperNames);

        // Calculate 10% raise for each
        System.out.println("\nWith 10% raise:");
        employees.stream()
                .map(e -> e.getName() + ": $" + (e.getSalary() * 1.1))
                .forEach(System.out::println);

        // ============================================
        // 3. SORTED - Sort elements
        // ============================================
        System.out.println("\n===== 3. SORTED =====");

        // Sort by name
        System.out.println("Sorted by name:");
        employees.stream()
                .sorted(Comparator.comparing(Employee::getName))
                .forEach(e -> System.out.println("  " + e.getName()));

        // Sort by salary (descending)
        System.out.println("\nSorted by salary (desc):");
        employees.stream()
                .sorted(Comparator.comparing(Employee::getSalary).reversed())
                .forEach(e -> System.out.println("  " + e.getName() + ": $" + e.getSalary()));

        // ============================================
        // 4. DISTINCT - Remove duplicates
        // ============================================
        System.out.println("\n===== 4. DISTINCT =====");

        List<String> depts = employees.stream()
                .map(Employee::getDept)
                .distinct()
                .collect(Collectors.toList());
        System.out.println("Unique departments: " + depts);

        List<Integer> numbers = Arrays.asList(1, 2, 2, 3, 3, 3, 4, 4, 5);
        List<Integer> unique = numbers.stream().distinct().collect(Collectors.toList());
        System.out.println("Unique numbers: " + unique);

        // ============================================
        // 5. LIMIT & SKIP
        // ============================================
        System.out.println("\n===== 5. LIMIT & SKIP =====");

        // Top 3 highest paid
        System.out.println("Top 3 highest paid:");
        employees.stream()
                .sorted(Comparator.comparing(Employee::getSalary).reversed())
                .limit(3)
                .forEach(e -> System.out.println("  " + e.getName()));

        // Skip first 2, take next 2
        System.out.println("\nSkip 2, take 2:");
        employees.stream()
                .skip(2)
                .limit(2)
                .forEach(e -> System.out.println("  " + e.getName()));

        // ============================================
        // 6. CHAINING OPERATIONS
        // ============================================
        System.out.println("\n===== 6. CHAINING =====");

        // QA employees, sorted by salary desc, get names
        List<String> qaByPay = employees.stream()
                .filter(e -> e.getDept().equals("QA"))
                .sorted(Comparator.comparing(Employee::getSalary).reversed())
                .map(Employee::getName)
                .collect(Collectors.toList());

        System.out.println("QA by salary: " + qaByPay);
    }
}

class Employee {
    private int id;
    private String name;
    private String dept;
    private double salary;

    public Employee(int id, String name, String dept, double salary) {
        this.id = id; this.name = name; this.dept = dept; this.salary = salary;
    }

    public int getId() { return id; }
    public String getName() { return name; }
    public String getDept() { return dept; }
    public double getSalary() { return salary; }
}

