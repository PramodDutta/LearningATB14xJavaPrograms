package ex_35_DateTime_API;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;

/**
 * LAB 267: Date Formatting and Parsing
 * ====================================
 * Topics: DateTimeFormatter, custom patterns, parsing strings
 *
 * WHY IMPORTANT FOR SDET?
 * - Formatting dates for test reports
 * - Parsing dates from API responses
 * - Validating date formats in UI
 */
public class Lab267_DateFormatting {

    public static void main(String[] args) {

        LocalDateTime now = LocalDateTime.now();
        LocalDate today = LocalDate.now();

        // ============================================
        // 1. Predefined Formatters
        // ============================================
        System.out.println("===== 1. Predefined Formatters =====");

        System.out.println("ISO_DATE: " + today.format(DateTimeFormatter.ISO_DATE));
        System.out.println("ISO_LOCAL_DATE_TIME: " + now.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        System.out.println("BASIC_ISO_DATE: " + today.format(DateTimeFormatter.BASIC_ISO_DATE));

        // ============================================
        // 2. Localized Formatters
        // ============================================
        System.out.println("\n===== 2. Localized Formatters =====");

        System.out.println("SHORT: " + now.format(DateTimeFormatter.ofLocalizedDateTime(FormatStyle.SHORT)));
        System.out.println("MEDIUM: " + now.format(DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM)));

        // ============================================
        // 3. Custom Patterns
        // ============================================
        System.out.println("\n===== 3. Custom Patterns =====");

        // Common patterns
        DateTimeFormatter pattern1 = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        DateTimeFormatter pattern2 = DateTimeFormatter.ofPattern("MM-dd-yyyy");
        DateTimeFormatter pattern3 = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        DateTimeFormatter pattern4 = DateTimeFormatter.ofPattern("EEEE, MMMM dd, yyyy");
        DateTimeFormatter pattern5 = DateTimeFormatter.ofPattern("dd-MMM-yyyy");

        System.out.println("dd/MM/yyyy: " + today.format(pattern1));
        System.out.println("MM-dd-yyyy: " + today.format(pattern2));
        System.out.println("yyyy/MM/dd HH:mm:ss: " + now.format(pattern3));
        System.out.println("Full format: " + today.format(pattern4));
        System.out.println("dd-MMM-yyyy: " + today.format(pattern5));

        // Time patterns
        LocalTime time = LocalTime.now();
        DateTimeFormatter timePattern1 = DateTimeFormatter.ofPattern("HH:mm:ss");
        DateTimeFormatter timePattern2 = DateTimeFormatter.ofPattern("hh:mm a");

        System.out.println("\n24-hour: " + time.format(timePattern1));
        System.out.println("12-hour: " + time.format(timePattern2));

        // ============================================
        // 4. Parsing Strings to Dates
        // ============================================
        System.out.println("\n===== 4. Parsing Strings =====");

        // Parse with default format
        LocalDate parsed1 = LocalDate.parse("2024-06-15");
        System.out.println("Parsed (default): " + parsed1);

        // Parse with custom format
        DateTimeFormatter customFormat = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate parsed2 = LocalDate.parse("25/12/2024", customFormat);
        System.out.println("Parsed (custom): " + parsed2);

        // Parse datetime
        DateTimeFormatter dtFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime parsedDT = LocalDateTime.parse("2024-06-15 14:30:00", dtFormat);
        System.out.println("Parsed DateTime: " + parsedDT);

        // ============================================
        // 5. Pattern Symbols Reference
        // ============================================
        System.out.println("\n===== 5. Pattern Symbols =====");
        System.out.println("y - Year (yyyy = 2024, yy = 24)");
        System.out.println("M - Month (MM = 06, MMM = Jun, MMMM = June)");
        System.out.println("d - Day of month (dd = 15)");
        System.out.println("E - Day of week (E = Mon, EEEE = Monday)");
        System.out.println("H - Hour 24h (HH = 14)");
        System.out.println("h - Hour 12h (hh = 02)");
        System.out.println("m - Minute (mm = 30)");
        System.out.println("s - Second (ss = 45)");
        System.out.println("a - AM/PM");

        // ============================================
        // 6. SDET Practical Examples
        // ============================================
        System.out.println("\n===== 6. SDET Examples =====");

        // Test report timestamp
        String reportTimestamp = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd_HH-mm-ss"));
        System.out.println("Report filename: TestReport_" + reportTimestamp + ".html");

        // Log timestamp
        String logTimestamp = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS"));
        System.out.println("Log entry: [" + logTimestamp + "] Test started");

        // API date format (ISO 8601)
        String apiDate = now.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        System.out.println("API format: " + apiDate);

        // Generate future date for test
        LocalDate futureDate = today.plusDays(30);
        String bookingDate = futureDate.format(DateTimeFormatter.ofPattern("MMM dd, yyyy"));
        System.out.println("Booking date: " + bookingDate);
    }
}

