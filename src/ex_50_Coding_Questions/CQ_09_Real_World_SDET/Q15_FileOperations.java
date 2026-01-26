package ex_50_Coding_Questions.CQ_09_Real_World_SDET;

import java.io.*;
import java.nio.file.*;
import java.util.*;

/**
 * Q15: File Operations Utility
 * ============================
 * DIFFICULTY: Easy
 * ASKED AT: SDET Interviews
 *
 * Problem: Common file operations for testing.
 * Real Use: Test data files, screenshots, reports.
 */
public class Q15_FileOperations {

    public static void main(String[] args) {
        System.out.println("=== File Operations Demo ===\n");

        String testDir = "test_output";
        String testFile = testDir + "/test.txt";

        try {
            // Create directory
            createDirectory(testDir);
            System.out.println("✓ Created directory: " + testDir);

            // Write file
            writeFile(testFile, "Hello, World!\nThis is a test file.");
            System.out.println("✓ Written file: " + testFile);

            // Read file
            String content = readFile(testFile);
            System.out.println("✓ Read content: " + content.replace("\n", "\\n"));

            // Append to file
            appendToFile(testFile, "\nAppended line.");
            System.out.println("✓ Appended to file");

            // File exists
            System.out.println("✓ File exists: " + fileExists(testFile));

            // List files
            System.out.println("✓ Files in directory: " + listFiles(testDir));

            // Delete file
            deleteFile(testFile);
            System.out.println("✓ Deleted file");

            // Delete directory
            deleteDirectory(testDir);
            System.out.println("✓ Deleted directory");

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    // Create directory
    public static void createDirectory(String path) throws IOException {
        Files.createDirectories(Paths.get(path));
    }

    // Write content to file
    public static void writeFile(String path, String content) throws IOException {
        Files.writeString(Paths.get(path), content);
    }

    // Read file content
    public static String readFile(String path) throws IOException {
        return Files.readString(Paths.get(path));
    }

    // Read file as lines
    public static List<String> readLines(String path) throws IOException {
        return Files.readAllLines(Paths.get(path));
    }

    // Append to file
    public static void appendToFile(String path, String content) throws IOException {
        Files.writeString(Paths.get(path), content, StandardOpenOption.APPEND);
    }

    // Check if file exists
    public static boolean fileExists(String path) {
        return Files.exists(Paths.get(path));
    }

    // Delete file
    public static void deleteFile(String path) throws IOException {
        Files.deleteIfExists(Paths.get(path));
    }

    // Delete directory (recursive)
    public static void deleteDirectory(String path) throws IOException {
        Path dir = Paths.get(path);
        if (Files.exists(dir)) {
            Files.walk(dir)
                    .sorted(Comparator.reverseOrder())
                    .forEach(p -> {
                        try {
                            Files.delete(p);
                        } catch (IOException e) {
                            // Ignore
                        }
                    });
        }
    }

    // List files in directory
    public static List<String> listFiles(String path) throws IOException {
        List<String> files = new ArrayList<>();
        try (DirectoryStream<Path> stream = Files.newDirectoryStream(Paths.get(path))) {
            for (Path entry : stream) {
                files.add(entry.getFileName().toString());
            }
        }
        return files;
    }

    // Copy file
    public static void copyFile(String source, String destination) throws IOException {
        Files.copy(Paths.get(source), Paths.get(destination), StandardCopyOption.REPLACE_EXISTING);
    }

    // Move file
    public static void moveFile(String source, String destination) throws IOException {
        Files.move(Paths.get(source), Paths.get(destination), StandardCopyOption.REPLACE_EXISTING);
    }

    // Get file size
    public static long getFileSize(String path) throws IOException {
        return Files.size(Paths.get(path));
    }
}

