package com.missingperson.backend.controller;

import com.missingperson.backend.model.FoundPerson;
import com.missingperson.backend.service.FoundPersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/found")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class FoundPersonController {

    private final FoundPersonService service;


    @PostMapping("/report")
    public ResponseEntity<FoundPerson> report(
            @RequestBody FoundPerson person) {
        return ResponseEntity.ok(service.save(person));
    }


    @GetMapping("/all")
    public ResponseEntity<List<FoundPerson>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/unmatched")
    public ResponseEntity<List<FoundPerson>> getUnmatched() {
        return ResponseEntity.ok(service.getUnmatched());
    }
}