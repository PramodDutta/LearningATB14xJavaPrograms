package ex_40_JDBC;

/**
 * LAB 280: JDBC for SDET - Practical Patterns
 * ===========================================
 * Database utility patterns for test automation
 */
public class Lab280_JDBC_SDET {

    public static void main(String[] args) {

        System.out.println("===== JDBC PATTERNS FOR SDET =====\n");

        showDatabaseUtilityClass();
        showTestDataSetup();
        showDataValidation();
        showTestCleanup();
    }

    static void showDatabaseUtilityClass() {
        System.out.println("===== 1. DATABASE UTILITY CLASS =====");
        System.out.println("""
            public class DatabaseUtil {
                private static final String URL = "jdbc:mysql://localhost:3306/testdb";
                private static final String USER = "root";
                private static final String PASS = "password";
                
                // Get connection
                public static Connection getConnection() throws SQLException {
                    return DriverManager.getConnection(URL, USER, PASS);
                }
                
                // Execute SELECT query
                public static ResultSet executeQuery(String sql) throws SQLException {
                    Connection conn = getConnection();
                    Statement stmt = conn.createStatement();
                    return stmt.executeQuery(sql);
                }
                
                // Execute INSERT/UPDATE/DELETE
                public static int executeUpdate(String sql) throws SQLException {
                    try (Connection conn = getConnection();
                         Statement stmt = conn.createStatement()) {
                        return stmt.executeUpdate(sql);
                    }
                }
                
                // Get single value
                public static String getValue(String sql, String column) throws SQLException {
                    try (Connection conn = getConnection();
                         Statement stmt = conn.createStatement();
                         ResultSet rs = stmt.executeQuery(sql)) {
                        if (rs.next()) {
                            return rs.getString(column);
                        }
                        return null;
                    }
                }
            }
            """);
    }

    static void showTestDataSetup() {
        System.out.println("\n===== 2. TEST DATA SETUP =====");
        System.out.println("""
            public class TestDataSetup {
                
                // Create test user before test
                public static int createTestUser(String name, String email) {
                    String sql = "INSERT INTO users (name, email) VALUES (?, ?)";
                    
                    try (Connection conn = DatabaseUtil.getConnection();
                         PreparedStatement pstmt = conn.prepareStatement(sql, 
                             Statement.RETURN_GENERATED_KEYS)) {
                        
                        pstmt.setString(1, name);
                        pstmt.setString(2, email);
                        pstmt.executeUpdate();
                        
                        ResultSet keys = pstmt.getGeneratedKeys();
                        if (keys.next()) {
                            return keys.getInt(1);  // Return generated ID
                        }
                    } catch (SQLException e) {
                        e.printStackTrace();
                    }
                    return -1;
                }
                
                // Usage in test:
                // @BeforeMethod
                // public void setup() {
                //     testUserId = TestDataSetup.createTestUser("TestUser", "test@test.com");
                // }
            }
            """);
    }

    static void showDataValidation() {
        System.out.println("\n===== 3. DATA VALIDATION IN TESTS =====");
        System.out.println("""
            public class DatabaseValidation {
                
                // Verify user exists after API call
                public static boolean userExists(String email) {
                    String sql = "SELECT COUNT(*) FROM users WHERE email = ?";
                    
                    try (Connection conn = DatabaseUtil.getConnection();
                         PreparedStatement pstmt = conn.prepareStatement(sql)) {
                        
                        pstmt.setString(1, email);
                        ResultSet rs = pstmt.executeQuery();
                        
                        if (rs.next()) {
                            return rs.getInt(1) > 0;
                        }
                    } catch (SQLException e) {
                        e.printStackTrace();
                    }
                    return false;
                }
                
                // Get user data for assertion
                public static Map<String, Object> getUserData(int userId) {
                    String sql = "SELECT * FROM users WHERE id = ?";
                    Map<String, Object> data = new HashMap<>();
                    
                    try (Connection conn = DatabaseUtil.getConnection();
                         PreparedStatement pstmt = conn.prepareStatement(sql)) {
                        
                        pstmt.setInt(1, userId);
                        ResultSet rs = pstmt.executeQuery();
                        
                        if (rs.next()) {
                            ResultSetMetaData meta = rs.getMetaData();
                            for (int i = 1; i <= meta.getColumnCount(); i++) {
                                data.put(meta.getColumnName(i), rs.getObject(i));
                            }
                        }
                    } catch (SQLException e) {
                        e.printStackTrace();
                    }
                    return data;
                }
                
                // Usage in test:
                // @Test
                // public void testCreateUser() {
                //     // Call API to create user
                //     apiClient.createUser("John", "john@test.com");
                //     
                //     // Verify in database
                //     Assert.assertTrue(DatabaseValidation.userExists("john@test.com"));
                // }
            }
            """);
    }

    static void showTestCleanup() {
        System.out.println("\n===== 4. TEST CLEANUP =====");
        System.out.println("""
            public class TestCleanup {
                
                // Delete test data after test
                public static void deleteTestUser(int userId) {
                    String sql = "DELETE FROM users WHERE id = ?";
                    
                    try (Connection conn = DatabaseUtil.getConnection();
                         PreparedStatement pstmt = conn.prepareStatement(sql)) {
                        
                        pstmt.setInt(1, userId);
                        pstmt.executeUpdate();
                    } catch (SQLException e) {
                        e.printStackTrace();
                    }
                }
                
                // Clean all test data (use with caution!)
                public static void cleanTestData() {
                    String sql = "DELETE FROM users WHERE email LIKE '%@test.com'";
                    
                    try (Connection conn = DatabaseUtil.getConnection();
                         Statement stmt = conn.createStatement()) {
                        
                        int deleted = stmt.executeUpdate(sql);
                        System.out.println("Cleaned " + deleted + " test records");
                    } catch (SQLException e) {
                        e.printStackTrace();
                    }
                }
                
                // Usage:
                // @AfterMethod
                // public void cleanup() {
                //     TestCleanup.deleteTestUser(testUserId);
                // }
            }
            """);
    }
}

