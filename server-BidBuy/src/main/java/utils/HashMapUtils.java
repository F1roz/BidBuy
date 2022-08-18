package utils;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class HashMapUtils {
    public static Map<String, Object> build(HashMapItem... items) {
        Map<String, Object> map = new HashMap<>();
        Arrays.stream(items).forEach(item -> map.put(item.getKey(), item.getValue()));
        return map;
    }
}

