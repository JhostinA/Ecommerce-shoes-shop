package misiontic.app.ciclo4.appG9mdb.controller;

import misiontic.app.ciclo4.appG9mdb.model.Order;
import misiontic.app.ciclo4.appG9mdb.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/all")
    public List<Order> getAll() {
        return orderService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Order> getOrder(@PathVariable("id") int idOrder) {
        return orderService.getOrder(idOrder);
    }

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Order create(@RequestBody Order order) {
        return orderService.saveOrder(order);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Order update(@RequestBody Order order) {
        return orderService.updateOrder(order);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int idOrder) {
        return orderService.deleteOrder(idOrder);
    }

    @GetMapping("/zona/{zona}")
    public List<Order> findByZone(@PathVariable("zona") String zona) {
        return orderService.findByZone(zona);
    }

}
