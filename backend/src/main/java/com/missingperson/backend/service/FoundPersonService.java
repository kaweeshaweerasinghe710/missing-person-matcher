package com.missingperson.backend.service;

import com.missingperson.backend.model.FoundPerson;
import com.missingperson.backend.repository.FoundPersonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FoundPersonService {

    private final FoundPersonRepository repository;

    public FoundPerson save(FoundPerson person) {
        return repository.save(person);
    }


    public List<FoundPerson> getAll() {
        return repository.findAll();
    }


    public List<FoundPerson> getUnmatched() {
        return repository.findByStatus("UNMATCHED");
    }
}