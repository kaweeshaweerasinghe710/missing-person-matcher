package com.missingperson.backend.repository;

import com.missingperson.backend.model.MissingPerson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MissingPersonRepository 
    extends JpaRepository<MissingPerson, Long> {
    
    List<MissingPerson> findByStatus(String status);
}