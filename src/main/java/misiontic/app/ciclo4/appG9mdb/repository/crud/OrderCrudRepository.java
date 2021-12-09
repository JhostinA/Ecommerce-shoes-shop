package misiontic.app.ciclo4.appG9mdb.repository.crud;

import misiontic.app.ciclo4.appG9mdb.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface OrderCrudRepository extends MongoRepository<Order,Integer> {

    @Query("{'salesMan.zone': ?0}")
    List<Order> findByZone(final String zone);

    @Query("{status: ?0}")
    List<Order> findByStatus(final String status);
}
