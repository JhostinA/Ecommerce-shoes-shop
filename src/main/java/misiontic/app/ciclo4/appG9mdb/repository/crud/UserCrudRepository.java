package misiontic.app.ciclo4.appG9mdb.repository.crud;

import misiontic.app.ciclo4.appG9mdb.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserCrudRepository extends MongoRepository<User,Integer> {
    @Query("{email: ?0,password: ?1}")
    User findByEmailAndPassword(@Param("email") String email,
                                    @Param("password") String password);

    @Query("{email: ?0}")
    User findUserByEmail(String email);
}
