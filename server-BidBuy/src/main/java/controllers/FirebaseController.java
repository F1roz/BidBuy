package controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import services.FirebaseService;
import utils.HashMapItem;
import utils.HashMapUtils;

import java.util.Map;

@RestController
@RequestMapping("/firebase")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class FirebaseController {
    private final FirebaseService firebaseService;

    @PostMapping("/upload")
    public ResponseEntity<Map<String, Object>> uploadFile(@RequestParam("MMaExhYy6NYi67symxfOEP4Hb5fl7N") MultipartFile multipartFile) {
        try {
            String fileUrl = firebaseService.upload(multipartFile);
            if (fileUrl == null) return new ResponseEntity<>(HashMapUtils.build(
                    HashMapItem.build("message", "Error uploading image")
            ), HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(HashMapUtils.build(
                    HashMapItem.build("url", fileUrl)
            ), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HashMapUtils.build(
                    HashMapItem.build("message", e.getMessage())
            ), HttpStatus.BAD_REQUEST);
        }
    }
}
