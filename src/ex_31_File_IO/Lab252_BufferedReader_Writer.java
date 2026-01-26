package ex_31_File_IO;

import java.io.*;

/**
 * LAB 252: BufferedReader and BufferedWriter
 * ==========================================
 * Topics Covered:
 * 1. BufferedReader - efficient line-by-line reading
 * 2. BufferedWriter - efficient writing with buffer
 * 3. Reading user input from console
 *
 * WHY IMPORTANT FOR SDET?
 * - Reading large test data files efficiently
 * - Processing log files line by line
 * - Reading CSV/text test data
 */
public class Lab252_BufferedReader_Writer {

    public static void main(String[] args) {

        // ============================================
        // PART 1: BufferedWriter - Write to File
        // ============================================
        System.out.println("===== PART 1: BufferedWriter =====");

        String filePath = "src/ex_31_File_IO/buffered_test.txt";

        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filePath))) {

            writer.write("Employee ID, Name, Department");
            writer.newLine();  // Platform-independent new line
            writer.write("101, John Doe, QA");
            writer.newLine();
            writer.write("102, Jane Smith, Development");
            writer.newLine();
            writer.write("103, Bob Wilson, SDET");
            writer.newLine();

            System.out.println("Data written with BufferedWriter!");

        } catch (IOException e) {
            e.printStackTrace();
        }

        // ============================================
        // PART 2: BufferedReader - Read Line by Line
        // ============================================
        System.out.println("\n===== PART 2: BufferedReader =====");

        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {

            String line;
            int lineNumber = 1;

            System.out.println("Reading file line by line:");
            while ((line = reader.readLine()) != null) {
                System.out.println("Line " + lineNumber + ": " + line);
                lineNumber++;
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        // ============================================
        // PART 3: Read and Process CSV-like Data
        // ============================================
        System.out.println("\n===== PART 3: Process CSV Data =====");

        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {

            String line;
            boolean isHeader = true;

            while ((line = reader.readLine()) != null) {
                if (isHeader) {
                    isHeader = false;
                    continue;  // Skip header row
                }

                // Split by comma and process
                String[] parts = line.split(",");
                if (parts.length >= 3) {
                    String id = parts[0].trim();
                    String name = parts[1].trim();
                    String dept = parts[2].trim();

                    System.out.println("Employee: " + name + " (ID: " + id + ") - " + dept);
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        // ============================================
        // PART 4: Count Lines in File
        // ============================================
        System.out.println("\n===== PART 4: Count Lines =====");

        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {

            long lineCount = reader.lines().count();
            System.out.println("Total lines in file: " + lineCount);

        } catch (IOException e) {
            e.printStackTrace();
        }

        // ============================================
        // PART 5: Read Console Input (Commented - for manual testing)
        // ============================================
        System.out.println("\n===== PART 5: Console Input Example =====");
        System.out.println("// Uncomment below code to test console input");

        /*
        try (BufferedReader consoleReader = new BufferedReader(new InputStreamReader(System.in))) {
            System.out.print("Enter your name: ");
            String name = consoleReader.readLine();
            System.out.println("Hello, " + name + "!");
        } catch (IOException e) {
            e.printStackTrace();
        }
        */
    }
}

