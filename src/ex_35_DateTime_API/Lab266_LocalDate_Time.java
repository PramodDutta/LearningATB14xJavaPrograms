package ex_35_DateTime_API;

import java.time.*;

/**
 * LAB 266: Java 8 Date/Time API - LocalDate, LocalTime, LocalDateTime
 * ====================================================================
 * Topics Covered:
 * 1. LocalDate - date without time
 * 2. LocalTime - time without date
 * 3. LocalDateTime - date and time
 * 4. Creating, manipulating dates
 *
 * WHY IMPORTANT FOR SDET?
 * - Test data generation with dates
 * - Validating date fields in applications
 * - Scheduling test executions
 * - Timestamp comparisons in logs
 */
public class Lab266_LocalDate_Time {

    public static void main(String[] args) {

        // ============================================
        // 1. LocalDate - Date without time
        // ============================================
        System.out.println("===== 1. LocalDate =====");

        // Current date
        LocalDate today = LocalDate.now();
        System.out.println("Today: " + today);

        // Specific date
        LocalDate specificDate = LocalDate.of(2024, 12, 25);
        System.out.println("Christmas 2024: " + specificDate);

        // Parse from string
        LocalDate parsed = LocalDate.parse("2024-06-15");
        System.out.println("Parsed: " + parsed);

        // Get components
        System.out.println("\nDate Components:");
        System.out.println("  Year: " + today.getYear());
        System.out.println("  Month: " + today.getMonth() + " (" + today.getMonthValue() + ")");
        System.out.println("  Day: " + today.getDayOfMonth());
        System.out.println("  Day of Week: " + today.getDayOfWeek());
        System.out.println("  Day of Year: " + today.getDayOfYear());

        // ============================================
        // 2. LocalTime - Time without date
        // ============================================
        System.out.println("\n===== 2. LocalTime =====");

        LocalTime now = LocalTime.now();
        System.out.println("Current time: " + now);

        LocalTime specificTime = LocalTime.of(14, 30, 45);
        System.out.println("Specific time: " + specificTime);

        LocalTime parsedTime = LocalTime.parse("09:30:00");
        System.out.println("Parsed time: " + parsedTime);

        System.out.println("\nTime Components:");
        System.out.println("  Hour: " + now.getHour());
        System.out.println("  Minute: " + now.getMinute());
        System.out.println("  Second: " + now.getSecond());

        // ============================================
        // 3. LocalDateTime - Date and Time
        // ============================================
        System.out.println("\n===== 3. LocalDateTime =====");

        LocalDateTime dateTime = LocalDateTime.now();
        System.out.println("Current: " + dateTime);

        LocalDateTime specific = LocalDateTime.of(2024, 12, 31, 23, 59, 59);
        System.out.println("New Year Eve: " + specific);

        // Combine date and time
        LocalDateTime combined = LocalDateTime.of(today, LocalTime.of(10, 30));
        System.out.println("Combined: " + combined);

        // ============================================
        // 4. Date Manipulation
        // ============================================
        System.out.println("\n===== 4. Date Manipulation =====");

        LocalDate date = LocalDate.now();

        // Add/subtract days, months, years
        System.out.println("Today: " + date);
        System.out.println("Tomorrow: " + date.plusDays(1));
        System.out.println("Yesterday: " + date.minusDays(1));
        System.out.println("Next week: " + date.plusWeeks(1));
        System.out.println("Next month: " + date.plusMonths(1));
        System.out.println("Next year: " + date.plusYears(1));

        // With methods (create new date with changed value)
        System.out.println("\nWith methods:");
        System.out.println("First of month: " + date.withDayOfMonth(1));
        System.out.println("Same day in Jan: " + date.withMonth(1));

        // ============================================
        // 5. Comparisons
        // ============================================
        System.out.println("\n===== 5. Comparisons =====");

        LocalDate date1 = LocalDate.of(2024, 6, 15);
        LocalDate date2 = LocalDate.of(2024, 12, 25);

        System.out.println("Date1: " + date1);
        System.out.println("Date2: " + date2);
        System.out.println("date1.isBefore(date2): " + date1.isBefore(date2));
        System.out.println("date1.isAfter(date2): " + date1.isAfter(date2));
        System.out.println("date1.isEqual(date2): " + date1.isEqual(date2));

        // ============================================
        // 6. Period - Difference between dates
        // ============================================
        System.out.println("\n===== 6. Period =====");

        LocalDate startDate = LocalDate.of(2024, 1, 1);
        LocalDate endDate = LocalDate.of(2024, 12, 31);

        Period period = Period.between(startDate, endDate);
        System.out.println("Period: " + period);
        System.out.println("Months: " + period.getMonths());
        System.out.println("Days: " + period.getDays());

        // ============================================
        // 7. Useful Checks
        // ============================================
        System.out.println("\n===== 7. Useful Checks =====");

        LocalDate checkDate = LocalDate.of(2024, 2, 29);
        System.out.println("Is 2024 leap year? " + checkDate.isLeapYear());
        System.out.println("Days in Feb 2024: " + checkDate.lengthOfMonth());
        System.out.println("Days in 2024: " + checkDate.lengthOfYear());
    }
}

