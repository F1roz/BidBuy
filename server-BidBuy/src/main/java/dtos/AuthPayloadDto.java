package dtos;

public class AuthPayloadDto {
    private int id;
    private String username;
    private String email;

    private String type;

    public AuthPayloadDto(int id, String username, String email, String type) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.type = type;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String serialize(){
        return username+"<>_<>"+id+"<>_<>"+email+"<>_<>"+type;
    }

    public static String serialize(int id,String username,String email,String type){
        return new AuthPayloadDto(id,username,email,type).serialize();
    }

    public static AuthPayloadDto deserialize(String payload){
        try{
            String[] properties = payload.split("<>_<>");
            if(properties.length!=4) return null;
            String username = properties[0];
            int id = Integer.parseInt(properties[1]);
            String email = properties[2];
            String type = properties[3];
            return new AuthPayloadDto(id,username,email,type);
        }
        catch (Exception e){
            return null;
        }
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
