package com.missingperson.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "missing_persons")
public class MissingPerson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int age;
    private String gender;
    private String lastSeenLocation;
    private LocalDateTime lastSeenDate;
    private String contactNumber;
    private String description;
    private String photoUrl;
    private String status; 

    @Column(columnDefinition = "TEXT")
    private String faceEmbedding; 

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
        status = "MISSING";
    }
}