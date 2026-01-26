package ex_40_JDBC;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * LAB 279: JDBC CRUD Operations
 * =============================
 * Complete example with in-memory H2 database
 *
 * NOTE: To run this, you need H2 database driver.
 * Add to pom.xml: <dependency>
 *     <groupId>com.h2database</groupId>
 *     <artifactId>h2</artifactId>
 *     <version>2.2.224</version>
 * </dependency>
 *
 * Or download h2-*.jar and add to classpath
 */
public class Lab279_JDBC_CRUD {

    // H2 in-memory database URL
    private static final String URL = "jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1";
    private static final String USER = "sa";
    private static final String PASSWORD = "";

    public static void main(String[] args) {

        System.out.println("===== JDBC CRUD OPERATIONS =====\n");

        // Note: This requires H2 driver. Showing the code structure.
        System.out.println("This example demonstrates JDBC operations.");
        System.out.println("To run: Add H2 database dependency to your project.\n");

        // Show the code that would execute
        showCreateTable();
        showInsert();
        showSelect();
        showUpdate();
        showDelete();
        showPreparedStatement();
    }

    static void showCreateTable() {
        System.out.println("===== CREATE TABLE =====");
        System.out.println("""
            String sql = "CREATE TABLE users (" +
                         "id INT PRIMARY KEY AUTO_INCREMENT, " +
                         "name VARCHAR(100), " +
                         "email VARCHAR(100), " +
                         "age INT)";
            
            try (Connection conn = DriverManager.getConnection(URL, USER, PASS);
                 Statement stmt = conn.createStatement()) {
                stmt.execute(sql);
                System.out.println("Table created!");
            }
            """);
    }

    static void showInsert() {
        System.out.println("\n===== INSERT (Create) =====");
        System.out.println("""
            String sql = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";
            
            try (Connection conn = DriverManager.getConnection(URL, USER, PASS);
                 PreparedStatement pstmt = conn.prepareStatement(sql)) {
                
                pstmt.setString(1, "John Doe");
                pstmt.setString(2, "john@test.com");
                pstmt.setInt(3, 30);
                
                int rows = pstmt.executeUpdate();
                System.out.println(rows + " row(s) inserted");
            }
            """);
    }

    static void showSelect() {
        System.out.println("\n===== SELECT (Read) =====");
        System.out.println("""
            String sql = "SELECT * FROM users WHERE age > ?";
            
            try (Connection conn = DriverManager.getConnection(URL, USER, PASS);
                 PreparedStatement pstmt = conn.prepareStatement(sql)) {
                
                pstmt.setInt(1, 25);  // age > 25
                ResultSet rs = pstmt.executeQuery();
                
                while (rs.next()) {
                    int id = rs.getInt("id");
                    String name = rs.getString("name");
                    String email = rs.getString("email");
                    int age = rs.getInt("age");
                    
                    System.out.println(id + " | " + name + " | " + email + " | " + age);
                }
            }
            """);
    }

    static void showUpdate() {
        System.out.println("\n===== UPDATE =====");
        System.out.println("""
            String sql = "UPDATE users SET email = ? WHERE id = ?";
            
            try (Connection conn = DriverManager.getConnection(URL, USER, PASS);
                 PreparedStatement pstmt = conn.prepareStatement(sql)) {
                
                pstmt.setString(1, "newemail@test.com");
                pstmt.setInt(2, 1);  // id = 1
                
                int rows = pstmt.executeUpdate();
                System.out.println(rows + " row(s) updated");
            }
            """);
    }

    static void showDelete() {
        System.out.println("\n===== DELETE =====");
        System.out.println("""
            String sql = "DELETE FROM users WHERE id = ?";
            
            try (Connection conn = DriverManager.getConnection(URL, USER, PASS);
                 PreparedStatement pstmt = conn.prepareStatement(sql)) {
                
                pstmt.setInt(1, 1);  // id = 1
                
                int rows = pstmt.executeUpdate();
                System.out.println(rows + " row(s) deleted");
            }
            """);
    }

    static void showPreparedStatement() {
        System.out.println("\n===== WHY PreparedStatement? =====");
        System.out.println("""
            // BAD - SQL Injection vulnerable:
            String name = "'; DROP TABLE users; --";
            String sql = "SELECT * FROM users WHERE name = '" + name + "'";
            // This would execute: SELECT * FROM users WHERE name = ''; DROP TABLE users; --'
            
            // GOOD - PreparedStatement prevents injection:
            String sql = "SELECT * FROM users WHERE name = ?";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, name);  // Safely escapes the input
            """);
    }
}

