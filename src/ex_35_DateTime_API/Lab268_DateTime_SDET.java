package ex_35_DateTime_API;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Random;

/**
 * LAB 268: Date/Time for SDET - Practical Examples
 * ================================================
 * Real-world scenarios for test automation
 */
public class Lab268_DateTime_SDET {

    public static void main(String[] args) {

        // ============================================
        // SCENARIO 1: Generate Test Data Dates
        // ============================================
        System.out.println("===== SCENARIO 1: Test Data Generation =====");

        // Future date (e.g., for booking)
        LocalDate futureDate = LocalDate.now().plusDays(7);
        System.out.println("Booking date (7 days later): " + futureDate);

        // Past date (e.g., for DOB - adult)
        LocalDate adultDOB = LocalDate.now().minusYears(25);
        System.out.println("Adult DOB (25 years ago): " + adultDOB);

        // Random date in range
        LocalDate randomDate = generateRandomDate(
                LocalDate.of(1990, 1, 1),
                LocalDate.of(2000, 12, 31)
        );
        System.out.println("Random DOB (1990-2000): " + randomDate);

        // ============================================
        // SCENARIO 2: Date Validation
        // ============================================
        System.out.println("\n===== SCENARIO 2: Date Validation =====");

        String inputDate = "15/06/2024";
        boolean isValid = isValidDate(inputDate, "dd/MM/yyyy");
        System.out.println("Is '" + inputDate + "' valid? " + isValid);

        String invalidDate = "32/13/2024";
        boolean isInvalid = isValidDate(invalidDate, "dd/MM/yyyy");
        System.out.println("Is '" + invalidDate + "' valid? " + isInvalid);

        // ============================================
        // SCENARIO 3: Age Calculation
        // ============================================
        System.out.println("\n===== SCENARIO 3: Age Calculation =====");

        LocalDate dob = LocalDate.of(1995, 6, 15);
        int age = calculateAge(dob);
        System.out.println("DOB: " + dob + ", Age: " + age);

        boolean isAdult = age >= 18;
        System.out.println("Is Adult: " + isAdult);

        // ============================================
        // SCENARIO 4: Test Execution Time
        // ============================================
        System.out.println("\n===== SCENARIO 4: Execution Time =====");

        LocalDateTime startTime = LocalDateTime.now();
        System.out.println("Test started: " + formatTimestamp(startTime));

        // Simulate test execution
        try { Thread.sleep(1500); } catch (InterruptedException e) { }

        LocalDateTime endTime = LocalDateTime.now();
        System.out.println("Test ended: " + formatTimestamp(endTime));

        long durationMs = ChronoUnit.MILLIS.between(startTime, endTime);
        System.out.println("Duration: " + durationMs + "ms");

        // ============================================
        // SCENARIO 5: Working Days Calculation
        // ============================================
        System.out.println("\n===== SCENARIO 5: Working Days =====");

        LocalDate start = LocalDate.now();
        LocalDate end = start.plusDays(14);

        long workingDays = countWorkingDays(start, end);
        System.out.println("Working days in next 2 weeks: " + workingDays);

        // ============================================
        // SCENARIO 6: Date Range for Reports
        // ============================================
        System.out.println("\n===== SCENARIO 6: Report Date Range =====");

        // Last 7 days
        LocalDate last7DaysStart = LocalDate.now().minusDays(7);
        LocalDate last7DaysEnd = LocalDate.now();
        System.out.println("Last 7 days: " + last7DaysStart + " to " + last7DaysEnd);

        // Current month
        LocalDate monthStart = LocalDate.now().withDayOfMonth(1);
        LocalDate monthEnd = LocalDate.now().withDayOfMonth(LocalDate.now().lengthOfMonth());
        System.out.println("Current month: " + monthStart + " to " + monthEnd);

        // ============================================
        // SCENARIO 7: Timezone Handling
        // ============================================
        System.out.println("\n===== SCENARIO 7: Timezone =====");

        ZonedDateTime localTime = ZonedDateTime.now();
        System.out.println("Local: " + localTime.format(DateTimeFormatter.ofPattern("HH:mm z")));

        ZonedDateTime utcTime = ZonedDateTime.now(ZoneId.of("UTC"));
        System.out.println("UTC: " + utcTime.format(DateTimeFormatter.ofPattern("HH:mm z")));

        ZonedDateTime istTime = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));
        System.out.println("IST: " + istTime.format(DateTimeFormatter.ofPattern("HH:mm z")));

        // ============================================
        // SCENARIO 8: Timestamp for Screenshots
        // ============================================
        System.out.println("\n===== SCENARIO 8: Screenshot Naming =====");

        String screenshotName = generateScreenshotName("LoginTest");
        System.out.println("Screenshot: " + screenshotName);
    }

    // Helper Methods

    static LocalDate generateRandomDate(LocalDate start, LocalDate end) {
        long days = ChronoUnit.DAYS.between(start, end);
        return start.plusDays(new Random().nextInt((int) days + 1));
    }

    static boolean isValidDate(String dateStr, String pattern) {
        try {
            LocalDate.parse(dateStr, DateTimeFormatter.ofPattern(pattern));
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    static int calculateAge(LocalDate dob) {
        return Period.between(dob, LocalDate.now()).getYears();
    }

    static String formatTimestamp(LocalDateTime dt) {
        return dt.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS"));
    }

    static long countWorkingDays(LocalDate start, LocalDate end) {
        return start.datesUntil(end)
                .filter(d -> d.getDayOfWeek() != DayOfWeek.SATURDAY
                        && d.getDayOfWeek() != DayOfWeek.SUNDAY)
                .count();
    }

    static String generateScreenshotName(String testName) {
        String timestamp = LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
        return testName + "_" + timestamp + ".png";
    }
}

