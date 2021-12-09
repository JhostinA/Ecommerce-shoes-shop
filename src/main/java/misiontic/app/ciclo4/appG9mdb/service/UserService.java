package misiontic.app.ciclo4.appG9mdb.service;

import misiontic.app.ciclo4.appG9mdb.model.User;
import misiontic.app.ciclo4.appG9mdb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SequenceGeneratorService serviceseq;

    public List<User> getAll() {
        return userRepository.getAll();
    }

    public Optional<User> getUser(Integer idUser){
        return userRepository.getUser(idUser);
    }
    public User saveUser(User user){

        if (user.getId() == null){
            if (getUserByEmail(user.getEmail()) == false){
                user.setId(serviceseq.getSequenceNumber(User.SEQUENCE_NAME));
                return userRepository.saveUser(user);
            }else{
                return user;
            }

        }else {

           return userRepository.saveUser(user);
        }
    }
    public User update(User user) {

        if (user.getId() != null) {
            Optional<User> userDb = userRepository.getUser(user.getId());
            if (!userDb.isEmpty()) {
                if (user.getIdentification() != null) {
                    userDb.get().setIdentification(user.getIdentification());
                }
                if (user.getName() != null) {
                    userDb.get().setName(user.getName());
                }
                if (user.getAddress() != null) {
                    userDb.get().setAddress(user.getAddress());
                }
                if (user.getCellPhone() != null) {
                    userDb.get().setCellPhone(user.getCellPhone());
                }
                if (user.getEmail() != null) {
                    userDb.get().setEmail(user.getEmail());
                }
                if (user.getPassword() != null) {
                    userDb.get().setPassword(user.getPassword());
                }
                if (user.getZone() != null) {
                    userDb.get().setZone(user.getZone());
                }
                if (user.getType() != null){
                    userDb.get().setType(user.getType());
                }

                userRepository.saveUser(userDb.get());
                return userDb.get();
            } else {
                return user;
            }
        } else {
            return user;
        }
    }
    public boolean delete(int userId) {
        Boolean aBoolean = getUser(userId).map(user -> {
            userRepository.delete(user);
            return true;
        }).orElse(false);
        return aBoolean;
    }
    public boolean getUserByEmail(String email){
        return userRepository.getUserByEmail(email) != null;
    }
    public User getUserby(String email) {
        return userRepository.getUserByEmail(email);
    }
    public User getByEmailAndPassword(String email,String password){
        User user=userRepository.getByEmailAndPassword(email,password);
        User tempuser = new User();

        if(user==null){

            return tempuser;
        }
        return user;


    }

}

