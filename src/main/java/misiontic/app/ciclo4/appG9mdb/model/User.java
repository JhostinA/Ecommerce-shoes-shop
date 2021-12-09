package misiontic.app.ciclo4.appG9mdb.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.security.PrivateKey;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection="users")
public class User {

    @Transient
    public static final String SEQUENCE_NAME= "user_sequence";

    @Id
    private Integer id;
    private String identification;
    private String name;
    private Date birthtDay;
    private String monthBirthtDay;
    private String address;
    private String cellPhone;
    private String email;
    private String password;
    private String zone;
    private String type;

}
