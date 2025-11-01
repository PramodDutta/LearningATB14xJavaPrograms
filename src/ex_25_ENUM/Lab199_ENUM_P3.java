package ex_25_ENUM;

public class Lab199_ENUM_P3 {
    public static void main(String[] args) {
        System.out.println(HEX_COLORs.RED.getHexCode());
    }
}

enum HEX_COLORs{
    RED("#FF0000"),
    GREEN("#61FF33"),
    BLUE("#3377FF"),
    YELLOW("#4477FF");

    private String hexCode;

    HEX_COLORs(String hexCode){
        this.hexCode = hexCode;
    }
    String getHexCode(){
        return this.hexCode;
    }
}