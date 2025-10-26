package ex_21_OOPs_Encapsulation;

public class Lab189_Ecap_Demo {
    public static void main(String[] args) {

        VWOLogin vwoLogin = new VWOLogin("admin", "pass123");
        System.out.println(vwoLogin.password);
        vwoLogin.password = "345";
        System.out.println(vwoLogin.password);

        GoodVWOLogin vwoLogin1 = new GoodVWOLogin("admin", "pwd123");
//        System.out.println(vwoLogin1.password);
        String pass = vwoLogin1.getPassword();
        System.out.println(pass);
        vwoLogin1.setPassword("Pramodchild@123",false);


    }
}

class VWOLogin {
    public String username;
    public String password;

    public VWOLogin(String username, String password) {
        this.password = password;
        this.username = username;
    }
}


class GoodVWOLogin {

    // Instance Variable | Data variable | Attribute | Fields |  properties | member variables
    private String username;
    private String password;

    GoodVWOLogin(String username, String password) {
        this.password = password;
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password, boolean isGoodAuntyAdmin) {
        if (isGoodAuntyAdmin) {
            this.password = password;
        } else {
            System.out.println("No Allowed!");
        }
    }


}