// NOTE: JavaScript Map maintains insertion order (like LinkedHashMap).

// Storing environment-specific configurations
const envConfig = new Map();
envConfig.set("production", "https://prod.api.com");
envConfig.set("staging", "https://staging.api.com");

// Managing user credentials
const credentials = new Map();
credentials.set("admin", "admin123");
credentials.set("user", "user123");
credentials.set("user", null);   // overwrites previous value for "user"
credentials.set("user2", null);

// Sending the data from Map to JSON, JSON TO MAP - API Automation

// Web Selenium - Store the Webelements with keys.

const map = new Map();
// initialCapacity -> 10
// 20 -> Load * new value = Total Capacity -> Hashmap -> increased.
// NOTE: JavaScript Map does not have an initialCapacity concept.
