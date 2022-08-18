package utils;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public
class HashMapItem {
    private final String key;
    private final Object value;

    public static HashMapItem build(String key, Object value) {
        return new HashMapItem(key, value);
    }
}
