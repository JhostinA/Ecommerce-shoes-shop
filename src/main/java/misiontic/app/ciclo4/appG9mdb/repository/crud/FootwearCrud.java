package misiontic.app.ciclo4.appG9mdb.repository.crud;

import misiontic.app.ciclo4.appG9mdb.model.Footwear;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FootwearCrud extends MongoRepository<Footwear,String> {

}
