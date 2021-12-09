package misiontic.app.ciclo4.appG9mdb.controller;

import misiontic.app.ciclo4.appG9mdb.model.User;
import misiontic.app.ciclo4.appG9mdb.service.SequenceGeneratorService;
import misiontic.app.ciclo4.appG9mdb.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public List<User> getAll(){
        return userService.getAll();
    }
    @GetMapping("/{id}")
    public Optional<User> getUser(@PathVariable("id") int idUser) {
        return userService.getUser(idUser);
    }
    @GetMapping("emailexist/{email}")
    public boolean getUserByEmail(@PathVariable("email") String email){
        return userService.getUserby(email)!=null;
    }

    @GetMapping("/{email}/{password}")
    public User getByUserEmailAndUserPassword(@PathVariable("email") String email, @PathVariable("password") String password){
        return userService.getByEmailAndPassword(email,password);
    }

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public User save(@RequestBody User user){
        return userService.saveUser(user);
    }
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public User update(@RequestBody User user){

        return userService.update(user);
    }
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int id) {
        return userService.delete(id);
    }

}
