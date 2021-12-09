package misiontic.app.ciclo4.appG9mdb.controller;

import misiontic.app.ciclo4.appG9mdb.model.Footwear;
import misiontic.app.ciclo4.appG9mdb.service.FootwearService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/accessory")
public class FootwearController {
    @Autowired
    private FootwearService footwearService;

    @GetMapping("/all")
    public List<Footwear> getAll() {
        return footwearService.getAll();
    }

    @GetMapping("/{reference}")
    public Optional<Footwear> getFootwear(@PathVariable("reference") String reference) {
        return footwearService.getFootwear(reference);
    }

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Footwear create(@RequestBody Footwear footwear) {
        return footwearService.saveFootWear(footwear);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Footwear update(@RequestBody Footwear footwear) {
        return footwearService.update(footwear);
    }

    @DeleteMapping("/{reference}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("reference") String reference) {
        return footwearService.delete(reference);
    }
}
