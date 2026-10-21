package com.missingperson.backend.service;

import com.missingperson.backend.dto.AuthResponse;
import com.missingperson.backend.dto.LoginRequest;
import com.missingperson.backend.dto.RegisterRequest;
import com.missingperson.backend.model.User;
import com.missingperson.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public AuthResponse register(RegisterRequest request) {
        if (request.getEmail() == null || request.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email is required");
        }
        if (request.getPassword() == null || request.getPassword().length() < 6) {
            throw new IllegalArgumentException("Password must be at least 6 characters");
        }
        if (request.getName() == null || request.getName().isBlank()) {
            throw new IllegalArgumentException("Name is required");
        }

        String normalizedEmail = request.getEmail().trim().toLowerCase();
        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new IllegalArgumentException("An account with this email already exists");
        }

        String hashedPassword = hashPassword(request.getPassword());

        User user = User.builder()
                .name(request.getName().trim())
                .email(normalizedEmail)
                .password(hashedPassword)
                .role(request.getRole() != null && !request.getRole().isBlank() ? request.getRole().toUpperCase() : "CITIZEN")
                .badgeNumber(request.getBadgeNumber() != null ? request.getBadgeNumber().trim() : null)
                .build();

        User savedUser = userRepository.save(user);

        return AuthResponse.builder()
                .token(UUID.randomUUID().toString())
                .id(savedUser.getId())
                .name(savedUser.getName())
                .email(savedUser.getEmail())
                .role(savedUser.getRole())
                .badgeNumber(savedUser.getBadgeNumber())
                .message("Registration successful")
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        if (request.getEmail() == null || request.getPassword() == null) {
            throw new IllegalArgumentException("Email and password are required");
        }

        String normalizedEmail = request.getEmail().trim().toLowerCase();
        User user = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        String inputHash = hashPassword(request.getPassword());
        if (!inputHash.equals(user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        return AuthResponse.builder()
                .token(UUID.randomUUID().toString())
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .badgeNumber(user.getBadgeNumber())
                .message("Login successful")
                .build();
    }

    public User getById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    private String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(password.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error hashing password", e);
        }
    }
}
