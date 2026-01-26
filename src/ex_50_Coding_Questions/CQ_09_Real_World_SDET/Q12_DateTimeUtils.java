package ex_50_Coding_Questions.CQ_09_Real_World_SDET;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

/**
 * Q12: DateTime Utilities
 * =======================
 * DIFFICULTY: Easy
 * ASKED AT: SDET Interviews
 *
 * Problem: Common date/time operations for testing.
 * Real Use: Test data generation, date validation.
 */
public class Q12_DateTimeUtils {

    public static void main(String[] args) {
        System.out.println("=== DateTime Utilities ===\n");

        // Current date/time
        System.out.println("Today: " + getToday());
        System.out.println("Now: " + getNow());

        // Date manipulation
        System.out.println("Tomorrow: " + addDays(LocalDate.now(), 1));
        System.out.println("Last Week: " + addDays(LocalDate.now(), -7));
        System.out.println("Next Month: " + addMonths(LocalDate.now(), 1));

        // Format conversion
        System.out.println("\nFormatted: " + formatDate(LocalDate.now(), "dd-MMM-yyyy"));

        // Parse date
        LocalDate parsed = parseDate("2024-01-15", "yyyy-MM-dd");
        System.out.println("Parsed: " + parsed);

        // Days between
        LocalDate date1 = LocalDate.of(2024, 1, 1);
        LocalDate date2 = LocalDate.of(2024, 12, 31);
        System.out.println("\nDays between: " + daysBetween(date1, date2));

        // Age calculation
        LocalDate birthDate = LocalDate.of(1990, 5, 15);
        System.out.println("Age: " + calculateAge(birthDate));

        // Is weekend
        System.out.println("Is today weekend: " + isWeekend(LocalDate.now()));
    }

    // Get today's date
    public static LocalDate getToday() {
        return LocalDate.now();
    }

    // Get current timestamp
    public static LocalDateTime getNow() {
        return LocalDateTime.now();
    }

    // Add days to date
    public static LocalDate addDays(LocalDate date, int days) {
        return date.plusDays(days);
    }

    // Add months to date
    public static LocalDate addMonths(LocalDate date, int months) {
        return date.plusMonths(months);
    }

    // Format date
    public static String formatDate(LocalDate date, String pattern) {
        return date.format(DateTimeFormatter.ofPattern(pattern));
    }

    // Parse date string
    public static LocalDate parseDate(String dateStr, String pattern) {
        return LocalDate.parse(dateStr, DateTimeFormatter.ofPattern(pattern));
    }

    // Days between two dates
    public static long daysBetween(LocalDate start, LocalDate end) {
        return ChronoUnit.DAYS.between(start, end);
    }

    // Calculate age
    public static int calculateAge(LocalDate birthDate) {
        return Period.between(birthDate, LocalDate.now()).getYears();
    }

    // Check if weekend
    public static boolean isWeekend(LocalDate date) {
        DayOfWeek day = date.getDayOfWeek();
        return day == DayOfWeek.SATURDAY || day == DayOfWeek.SUNDAY;
    }

    // Get start of day
    public static LocalDateTime startOfDay(LocalDate date) {
        return date.atStartOfDay();
    }

    // Get end of day
    public static LocalDateTime endOfDay(LocalDate date) {
        return date.atTime(23, 59, 59);
    }

    // Convert to epoch milliseconds
    public static long toEpochMilli(LocalDateTime dateTime) {
        return dateTime.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
    }
}

