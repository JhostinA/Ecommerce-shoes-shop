package misiontic.app.ciclo4.appG9mdb.repository;

import misiontic.app.ciclo4.appG9mdb.model.Order;
import misiontic.app.ciclo4.appG9mdb.repository.crud.OrderCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class OrderRepository {
    @Autowired
    private OrderCrudRepository orderCrudRepository;

    public List<Order> getAll() {
        return (List<Order>) orderCrudRepository.findAll();
    }

    public Optional<Order> getOrder(int idOrder) {
        return orderCrudRepository.findById(idOrder);
    }

    public Order saveOrder(Order order) {
        return orderCrudRepository.save(order);
    }


    public void deleteOrder(Order order) {
        orderCrudRepository.delete(order);
    }


    public List<Order> findByZone(String zona) {
        return orderCrudRepository.findByZone(zona);
    }
}
