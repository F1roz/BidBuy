package dtos;

import lombok.*;
import model.Kyc;


@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class KycDto {
    private int id;
    private String number;
    private UserDto user;
    private String name;
    private String address;
    private String phone;
    private String gender;

    public static KycDto fromDb(Kyc kyc) {
        return new KycDto(
                kyc.getId(),
                kyc.getNumber(),
                null,
                kyc.getName(),
                kyc.getAddress(),
                kyc.getPhone(),
                kyc.getGender()
        );
    }

    public static KycDto fromDbWithRelations(Kyc kyc) {
        KycDto kycDto = fromDb(kyc);
        kycDto.setUser(UserDto.fromDb(kyc.getUser()));
        return kycDto;
    }
}
