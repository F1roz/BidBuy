package utils;

public class NumberUtils {
    public static int stringToNumOrNeg(String inp){
        try{
            return Integer.parseInt(inp);
        } catch (Exception e){
            return -1;
        }
    }
}
