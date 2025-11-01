package ex_25_ENUM;

public class Lab200_ENUM_REAL_WEB_AUTOMATION {
    public static void main(String[] args) {
        System.out.println(Locators.page_input_email.getLocator());
    }
}

enum Locators{
    page_input_email("//*[@id=\"login-username\"]"),
    page_input_password("//*[@id=\"login-password\"]"),
    page_button("#btn");

    private String locator;
    Locators(String locator){
        this.locator = locator;
    }

    String getLocator(){
        return this.locator;
    }

}