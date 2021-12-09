package misiontic.app.ciclo4.appG9mdb.service;

import misiontic.app.ciclo4.appG9mdb.model.Footwear;
import misiontic.app.ciclo4.appG9mdb.repository.FootwearRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FootwearService {

    @Autowired
    private FootwearRepository footwearRepository;

    public List<Footwear> getAll() {
        return footwearRepository.getAll();
    }

    public Optional<Footwear> getFootwear(String reference) {
        return footwearRepository.getFootwear(reference);
    }

    public Footwear saveFootWear(Footwear footwear) {
        if (footwear.getReference() == null) {
            return footwear;
        } else {
            return footwearRepository.saveFootwear(footwear);
        }
    }

    public Footwear update(Footwear footwear) {

        if (footwear.getReference() != null) {
            Optional<Footwear> footwearDb = footwearRepository.getFootwear(footwear.getReference());
            if (!footwearDb.isEmpty()) {

                if (footwear.getBrand()!= null) {
                    footwearDb.get().setBrand(footwear.getBrand());
                }

                if (footwear.getCategory() != null) {
                    footwearDb.get().setCategory(footwear.getCategory());
                }

                if (footwear.getMaterial() != null) {
                    footwearDb.get().setMaterial(footwear.getMaterial());
                }
                if (footwear.getSize() != null) {
                    footwearDb.get().setSize(footwear.getSize());
                }

                if (footwear.getDescription() != null) {
                    footwearDb.get().setDescription(footwear.getDescription());
                }
                if (footwear.getGender() != null) {
                    footwearDb.get().setGender(footwear.getGender());
                }

                if (footwear.getPrice() != 0.0) {
                    footwearDb.get().setPrice(footwear.getPrice());
                }
                if (footwear.getQuantity() != 0) {
                    footwearDb.get().setQuantity(footwear.getQuantity());
                }
                if (footwear.getPhotography() != null) {
                    footwearDb.get().setPhotography(footwear.getPhotography());
                }
                footwearDb.get().setAvailability(footwear.isAvailability());
                footwearRepository.saveFootwear(footwearDb.get());
                return footwearDb.get();
            } else {
                return footwear;
            }
        } else {
            return footwear;
        }
    }

    public boolean delete(String reference) {
        Boolean aBoolean = getFootwear(reference).map(footwear -> {
            footwearRepository.delete(footwear);
            return true;
        }).orElse(false);
        return aBoolean;
    }
}
