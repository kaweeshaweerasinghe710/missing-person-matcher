package com.missingperson.backend.service;

import com.missingperson.backend.model.MissingPerson;
import com.missingperson.backend.repository.MissingPersonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MissingPersonService {

    private final MissingPersonRepository repository;


    public MissingPerson save(MissingPerson person) {
        return repository.save(person);
    }


    public List<MissingPerson> getAll() {
        return repository.findAll();
    }


    public MissingPerson getById(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Not found"));
    }


    public List<MissingPerson> getActiveCases() {
        return repository.findByStatus("MISSING");
    }
}