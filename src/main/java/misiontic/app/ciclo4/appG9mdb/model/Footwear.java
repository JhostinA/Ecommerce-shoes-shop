package misiontic.app.ciclo4.appG9mdb.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "footwears")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Footwear {
    @Id
    private String reference;
    private String brand;
    private String category;
    private String material;
    private String gender;
    private String size;
    private String description;
    private boolean availability = true;
    private double price;
    private int quantity;
    private String photography;
}
