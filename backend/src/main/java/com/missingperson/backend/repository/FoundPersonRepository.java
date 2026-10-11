package com.missingperson.backend.repository;

import com.missingperson.backend.model.FoundPerson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FoundPersonRepository 
    extends JpaRepository<FoundPerson, Long> {
    
    List<FoundPerson> findByStatus(String status);
}