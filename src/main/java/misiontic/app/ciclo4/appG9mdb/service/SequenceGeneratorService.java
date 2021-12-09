package misiontic.app.ciclo4.appG9mdb.service;

import misiontic.app.ciclo4.appG9mdb.model.DbSequence;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.Objects;
@Service
public class SequenceGeneratorService {
    @Autowired
    private MongoOperations mongoOperations;


    public int getSequenceNumber(String sequenceName) {
        //get sequence no
        Query query = new Query(Criteria.where("id").is(sequenceName));
        //update the sequence no
        Update update = new Update().inc("seq", 1);
        //modify in document
        DbSequence counter = mongoOperations.findAndModify(query,
                update, FindAndModifyOptions.options().returnNew(true).upsert(true),
                DbSequence.class);

        return !Objects.isNull(counter) ? counter.getSeq() : 1;
    }
}