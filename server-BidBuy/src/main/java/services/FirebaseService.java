package services;

import com.google.auth.Credentials;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.Objects;
import java.util.UUID;

@Service
@Transactional
public class FirebaseService {
    public String upload(MultipartFile multipartFile) {

        try {
            String fileName = multipartFile.getOriginalFilename();
            assert fileName != null;
            fileName = UUID.randomUUID().toString().concat(this.getExtension(fileName));
            File file = this.convertToFile(multipartFile, fileName);
            String TEMP_URL = this.uploadFile(file, "bid-buy/" + fileName);
            file.delete();
            return TEMP_URL;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    private String uploadFile(File file, String fileName) throws IOException {
        BlobId blobId = BlobId.of("test-app-aa484.appspot.com", fileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("media").build();
        Credentials credentials = GoogleCredentials
                .fromStream(
                        new FileInputStream(
                                Objects.requireNonNull(this.getClass()
                                                .getClassLoader()
                                                .getResource("test-app-aa484-firebase-adminsdk-oe604-d3bf3967a6.json")
                                        )
                                        .getPath()
                        )
                );
        Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();
        storage.create(blobInfo, Files.readAllBytes(file.toPath()));
        return String
                .format(
                        "https://firebasestorage.googleapis.com/v0/b/test-app-aa484.appspot.com/o/%s?alt=media",
                        URLEncoder.encode(fileName, StandardCharsets.UTF_8)
                );
    }

    private File convertToFile(MultipartFile multipartFile, String fileName) throws IOException {
        File tempFile = new File(fileName);
        try (FileOutputStream fos = new FileOutputStream(tempFile)) {
            fos.write(multipartFile.getBytes());
            fos.close();
        }
        return tempFile;
    }

    private String getExtension(String fileName) {
        if (fileName.lastIndexOf(".") == -1) return "";
        return fileName.substring(fileName.lastIndexOf("."));
    }
}
