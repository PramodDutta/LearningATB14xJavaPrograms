package ex_27_Exceptions;

public class LabFinalize {
    public static void main(String[] args) {
        LabFinalize labFinalize = new LabFinalize();
        labFinalize = null;
        System.gc();
        System.out.println("main method done");
    }

    @Override
    public void finalize(){
        System.out.println("Finalize method called before GC");
    }
}
