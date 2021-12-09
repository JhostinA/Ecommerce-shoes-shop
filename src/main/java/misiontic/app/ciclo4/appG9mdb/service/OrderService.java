package misiontic.app.ciclo4.appG9mdb.service;

import misiontic.app.ciclo4.appG9mdb.model.Order;
import misiontic.app.ciclo4.appG9mdb.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private SequenceGeneratorService serviceseq;

    public List<Order> getAll() {
        return orderRepository.getAll();
    }

    public Optional<Order> getOrder(int idOrder) {
        return orderRepository.getOrder(idOrder);
    }

    public Order saveOrder(Order order) {

        if (order.getId() == null) {
            order.setId(serviceseq.getSequenceNumber(order.SEQUENCE_NAME));
        }
        return orderRepository.saveOrder(order);
    }

    public Order updateOrder(Order order) {

        if (order.getId() != null) {
            Optional<Order> orderDb = orderRepository.getOrder(order.getId());
            if (!orderDb.isEmpty()) {
                if (order.getStatus() != null) {
                    orderDb.get().setStatus(order.getStatus());
                }
                orderRepository.saveOrder(orderDb.get());
                return orderDb.get();
            } else {
                return order;
            }
        } else {
            return order;
        }
    }

    public boolean deleteOrder(int idOrder) {
        Boolean aBoolean = getOrder(idOrder).map(order -> {
            orderRepository.deleteOrder(order);
            return true;
        }).orElse(false);
        return aBoolean;
    }

    //Ordenes de pedido asociadas a los asesores de una zona
    public List<Order> findByZone(String zona) {
        return orderRepository.findByZone(zona);
    }
}
