package ex_25_ENUM;

enum Env {
    DEV("https://dev.myapp.com"),
    STAGING("https://staging.myapp.com"),
    PROD("https://myapp.com");

    private final String baseUrl;

    Env(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public String getBaseUrl() {
        return baseUrl;
    }
}
