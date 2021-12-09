package misiontic.app.ciclo4.appG9mdb.repository;

import misiontic.app.ciclo4.appG9mdb.model.User;
import misiontic.app.ciclo4.appG9mdb.repository.crud.UserCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UserRepository {
    @Autowired
    private UserCrudRepository repositoryCrud;

    public List<User> getAll(){
        return repositoryCrud.findAll();
    }
    public Optional<User>getUser(Integer idUser){
        return repositoryCrud.findById(idUser);
    }
    public User saveUser(User user){
        //user.setId(serviceseq.getSequenceNumber(User.SEQUENCE_NAME));
        return repositoryCrud.save(user);

    }
    public User getUserByEmail(String email){
        return repositoryCrud.findUserByEmail(email);
    }
    public User getByEmailAndPassword(String email, String password){
        return repositoryCrud.findByEmailAndPassword(email, password);
    }
    public void delete(User user) {

        repositoryCrud.delete(user);
    }
}
