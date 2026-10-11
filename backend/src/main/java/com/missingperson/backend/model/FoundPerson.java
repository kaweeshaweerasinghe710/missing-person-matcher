package com.missingperson.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "found_persons")
public class FoundPerson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String foundLocation;
    private String foundDate;
    private String gpsCoordinates;
    private String reporterContact;
    private String notes;

    @Column(columnDefinition = "TEXT")
    private String photoUrl;
    private String status; 

    @Column(columnDefinition = "TEXT")
    private String faceEmbedding;

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
        status = "UNMATCHED";
    }
}