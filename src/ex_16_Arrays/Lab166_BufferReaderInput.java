package ex_16_Arrays;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Lab166_BufferReaderInput {
    public static void main(String[] args) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));
        System.out.println("Enter the value if N");
        int N = Integer.parseInt(bufferedReader.readLine().trim());

//        Scanner scanner = new Scanner(System.in);
//        int N1 = scanner.nextInt();

        System.out.println(N);

    }
}
