package ex_40_JDBC;

/**
 * LAB 278: JDBC Basics - Concepts
 * ===============================
 * Topics Covered:
 * 1. What is JDBC?
 * 2. JDBC Architecture
 * 3. JDBC Components
 * 4. Connection steps
 *
 * WHY IMPORTANT FOR SDET?
 * - Database testing and validation
 * - Verifying data after API calls
 * - Test data setup and cleanup
 * - Backend validation in E2E tests
 *
 * NOTE: This file explains concepts. Lab279 has working code with H2 database.
 */
public class Lab278_JDBC_Basics {

    public static void main(String[] args) {

        // ============================================
        // 1. What is JDBC?
        // ============================================
        System.out.println("===== WHAT IS JDBC? =====");
        System.out.println("JDBC = Java Database Connectivity");
        System.out.println("API for connecting Java applications to databases");
        System.out.println("Works with: MySQL, PostgreSQL, Oracle, SQL Server, H2, etc.");

        // ============================================
        // 2. JDBC Architecture
        // ============================================
        System.out.println("\n===== JDBC ARCHITECTURE =====");
        System.out.println("Java Application");
        System.out.println("      ↓");
        System.out.println("  JDBC API (java.sql package)");
        System.out.println("      ↓");
        System.out.println("  JDBC Driver Manager");
        System.out.println("      ↓");
        System.out.println("  JDBC Driver (vendor specific)");
        System.out.println("      ↓");
        System.out.println("  Database");

        // ============================================
        // 3. Key JDBC Components
        // ============================================
        System.out.println("\n===== KEY COMPONENTS =====");

        System.out.println("\n1. DriverManager:");
        System.out.println("   - Manages database drivers");
        System.out.println("   - Creates connections");
        System.out.println("   - DriverManager.getConnection(url, user, pass)");

        System.out.println("\n2. Connection:");
        System.out.println("   - Represents connection to database");
        System.out.println("   - Creates statements");
        System.out.println("   - Manages transactions");

        System.out.println("\n3. Statement:");
        System.out.println("   - Executes SQL queries");
        System.out.println("   - Types: Statement, PreparedStatement, CallableStatement");

        System.out.println("\n4. ResultSet:");
        System.out.println("   - Holds query results");
        System.out.println("   - Cursor-based navigation");
        System.out.println("   - Methods: next(), getString(), getInt(), etc.");

        // ============================================
        // 4. Connection URL Formats
        // ============================================
        System.out.println("\n===== CONNECTION URL FORMATS =====");
        System.out.println("MySQL:      jdbc:mysql://localhost:3306/dbname");
        System.out.println("PostgreSQL: jdbc:postgresql://localhost:5432/dbname");
        System.out.println("Oracle:     jdbc:oracle:thin:@localhost:1521:dbname");
        System.out.println("SQL Server: jdbc:sqlserver://localhost:1433;databaseName=dbname");
        System.out.println("H2 (memory): jdbc:h2:mem:testdb");
        System.out.println("H2 (file):   jdbc:h2:./data/testdb");

        // ============================================
        // 5. Basic Steps
        // ============================================
        System.out.println("\n===== BASIC STEPS =====");
        System.out.println("1. Load JDBC Driver (optional in JDBC 4.0+)");
        System.out.println("2. Establish Connection");
        System.out.println("3. Create Statement");
        System.out.println("4. Execute Query");
        System.out.println("5. Process ResultSet");
        System.out.println("6. Close Resources");

        // ============================================
        // 6. Code Template
        // ============================================
        System.out.println("\n===== CODE TEMPLATE =====");
        System.out.println("""
            // Try-with-resources (auto-closes)
            try (Connection conn = DriverManager.getConnection(url, user, pass);
                 Statement stmt = conn.createStatement();
                 ResultSet rs = stmt.executeQuery("SELECT * FROM users")) {
                
                while (rs.next()) {
                    int id = rs.getInt("id");
                    String name = rs.getString("name");
                    System.out.println(id + ": " + name);
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
            """);

        // ============================================
        // 7. Statement vs PreparedStatement
        // ============================================
        System.out.println("\n===== Statement vs PreparedStatement =====");

        System.out.println("\nStatement:");
        System.out.println("  - Simple SQL execution");
        System.out.println("  - Vulnerable to SQL injection");
        System.out.println("  - stmt.executeQuery(\"SELECT * FROM users\")");

        System.out.println("\nPreparedStatement (PREFERRED):");
        System.out.println("  - Precompiled SQL");
        System.out.println("  - Prevents SQL injection");
        System.out.println("  - Better performance for repeated queries");
        System.out.println("  - Uses ? placeholders");
        System.out.println("  - pstmt.setString(1, value)");

        // ============================================
        // 8. SDET Use Cases
        // ============================================
        System.out.println("\n===== SDET USE CASES =====");
        System.out.println("1. Verify data after API POST request");
        System.out.println("2. Setup test data before tests");
        System.out.println("3. Cleanup test data after tests");
        System.out.println("4. Validate database constraints");
        System.out.println("5. Compare UI data with database");
        System.out.println("6. Generate test reports from DB");
    }
}

