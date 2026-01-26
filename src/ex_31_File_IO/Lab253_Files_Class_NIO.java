package ex_31_File_IO;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;

/**
 * LAB 253: Java NIO - Files Class (Modern Approach)
 * =================================================
 * Topics Covered:
 * 1. Files.readAllLines() - Read entire file
 * 2. Files.write() - Write to file
 * 3. Files.copy(), Files.move(), Files.delete()
 * 4. Path and Paths classes
 *
 * WHY IMPORTANT FOR SDET?
 * - Modern, cleaner API for file operations
 * - Better exception handling
 * - More readable code in test frameworks
 */
public class Lab253_Files_Class_NIO {

    public static void main(String[] args) {

        // ============================================
        // PART 1: Path and Paths
        // ============================================
        System.out.println("===== PART 1: Path Basics =====");

        Path path = Paths.get("src/ex_31_File_IO/nio_test.txt");
        System.out.println("Path: " + path);
        System.out.println("File name: " + path.getFileName());
        System.out.println("Parent: " + path.getParent());
        System.out.println("Absolute: " + path.toAbsolutePath());

        // ============================================
        // PART 2: Write to File using Files class
        // ============================================
        System.out.println("\n===== PART 2: Files.write() =====");

        List<String> lines = List.of(
                "Test Case 1: Login Test - PASSED",
                "Test Case 2: Search Test - PASSED",
                "Test Case 3: Checkout Test - FAILED",
                "Test Case 4: Payment Test - PASSED"
        );

        try {
            Files.write(path, lines);
            System.out.println("File written successfully!");
        } catch (IOException e) {
            e.printStackTrace();
        }

        // ============================================
        // PART 3: Read All Lines
        // ============================================
        System.out.println("\n===== PART 3: Files.readAllLines() =====");

        try {
            List<String> readLines = Files.readAllLines(path);
            System.out.println("File contents:");
            for (String line : readLines) {
                System.out.println("  " + line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        // ============================================
        // PART 4: Read as String (Java 11+)
        // ============================================
        System.out.println("\n===== PART 4: Files.readString() =====");

        try {
            String content = Files.readString(path);
            System.out.println("Full content:\n" + content);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // ============================================
        // PART 5: File Operations
        // ============================================
        System.out.println("\n===== PART 5: File Operations =====");

        Path sourcePath = Paths.get("src/ex_31_File_IO/nio_test.txt");
        Path copyPath = Paths.get("src/ex_31_File_IO/nio_test_copy.txt");

        try {
            // Copy file
            Files.copy(sourcePath, copyPath, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("File copied successfully!");

            // Check if exists
            System.out.println("Copy exists: " + Files.exists(copyPath));
            System.out.println("File size: " + Files.size(copyPath) + " bytes");

            // Delete the copy
            Files.delete(copyPath);
            System.out.println("Copy deleted: " + !Files.exists(copyPath));

        } catch (IOException e) {
            e.printStackTrace();
        }

        // ============================================
        // PART 6: Append to File
        // ============================================
        System.out.println("\n===== PART 6: Append to File =====");

        try {
            Files.writeString(path, "\nTest Case 5: Logout Test - PASSED",
                    StandardOpenOption.APPEND);
            System.out.println("Content appended!");

            // Verify
            System.out.println("\nUpdated content:");
            Files.readAllLines(path).forEach(System.out::println);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

