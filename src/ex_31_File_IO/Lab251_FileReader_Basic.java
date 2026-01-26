package ex_31_File_IO;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

/**
 * LAB 251: File I/O Basics
 * ========================
 * Topics Covered:
 * 1. File class - checking file existence, creating files/directories
 * 2. FileReader - reading character by character
 * 3. FileWriter - writing to files
 *
 * WHY IMPORTANT FOR SDET?
 * - Reading test data from files
 * - Writing test results/logs
 * - Managing configuration files
 */
public class Lab251_FileReader_Basic {

    public static void main(String[] args) {

        // ============================================
        // PART 1: File Class Basics
        // ============================================
        System.out.println("===== PART 1: File Class =====");

        File file = new File("src/ex_31_File_IO/testdata.txt");

        // Check if file exists
        System.out.println("File exists: " + file.exists());
        System.out.println("Is a file: " + file.isFile());
        System.out.println("Is a directory: " + file.isDirectory());
        System.out.println("File name: " + file.getName());
        System.out.println("Absolute path: " + file.getAbsolutePath());

        // ============================================
        // PART 2: FileWriter - Writing to File
        // ============================================
        System.out.println("\n===== PART 2: FileWriter =====");

        // Try-with-resources: Automatically closes the resource
        try (FileWriter writer = new FileWriter("src/ex_31_File_IO/testdata.txt")) {

            writer.write("Hello, this is test data!\n");
            writer.write("Line 2: Testing file operations\n");
            writer.write("Line 3: SDET Learning Java\n");

            System.out.println("Data written successfully!");

        } catch (IOException e) {
            System.out.println("Error writing file: " + e.getMessage());
        }

        // ============================================
        // PART 3: FileReader - Reading from File
        // ============================================
        System.out.println("\n===== PART 3: FileReader =====");

        try (FileReader reader = new FileReader("src/ex_31_File_IO/testdata.txt")) {

            int character;
            System.out.println("File content:");

            // Read character by character
            while ((character = reader.read()) != -1) {
                System.out.print((char) character);
            }

        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
        }

        // ============================================
        // PART 4: Append to File
        // ============================================
        System.out.println("\n\n===== PART 4: Append to File =====");

        // Second parameter 'true' means append mode
        try (FileWriter writer = new FileWriter("src/ex_31_File_IO/testdata.txt", true)) {

            writer.write("Line 4: This line was appended!\n");
            System.out.println("Data appended successfully!");

        } catch (IOException e) {
            System.out.println("Error appending: " + e.getMessage());
        }

        // ============================================
        // PART 5: Create Directory
        // ============================================
        System.out.println("\n===== PART 5: Create Directory =====");

        File newDir = new File("src/ex_31_File_IO/test_output");
        if (!newDir.exists()) {
            boolean created = newDir.mkdir();
            System.out.println("Directory created: " + created);
        } else {
            System.out.println("Directory already exists");
        }

        // ============================================
        // PART 6: List Files in Directory
        // ============================================
        System.out.println("\n===== PART 6: List Files =====");

        File dir = new File("src/ex_31_File_IO");
        String[] files = dir.list();

        if (files != null) {
            System.out.println("Files in directory:");
            for (String f : files) {
                System.out.println("  - " + f);
            }
        }
    }
}

