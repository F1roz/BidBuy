package dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public class EmailDto {

        private String recipient;

        private String body;

        private String subject;

        private String attachment;

}
