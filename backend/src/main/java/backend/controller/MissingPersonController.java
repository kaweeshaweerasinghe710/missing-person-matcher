package com.missingperson.backend.controller;

import com.missingperson.backend.model.MissingPerson;
import com.missingperson.backend.service.MissingPersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/missing")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class MissingPersonController {

    private final MissingPersonService service;


    @PostMapping("/report")
    public ResponseEntity<MissingPerson> report(
            @RequestBody MissingPerson person) {
        return ResponseEntity.ok(service.save(person));
    }


    @GetMapping("/all")
    public ResponseEntity<List<MissingPerson>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }


    @GetMapping("/active")
    public ResponseEntity<List<MissingPerson>> getActive() {
        return ResponseEntity.ok(service.getActiveCases());
    }

  
    @GetMapping("/{id}")
    public ResponseEntity<MissingPerson> getById(
            @PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }
}