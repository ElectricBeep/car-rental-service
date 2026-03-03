package com.car_rental.car_rental.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.car_rental.car_rental.dto.LoginRequest;
import com.car_rental.car_rental.dto.RefreshTokenRequest;
import com.car_rental.car_rental.dto.RegisterRequest;
import com.car_rental.car_rental.dto.TokenPair;
import com.car_rental.car_rental.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
  private final AuthService authService;

  @PostMapping("/register")
  public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest request) {
    try {
      authService.registerUser(request);
      return ResponseEntity.ok(Map.of("message", "User registered successfully"));
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
    } catch (Exception e) {
      return ResponseEntity.status(500).body(Map.of("error", "Registration failed: " + e.getMessage()));
    }
  }

  @PostMapping("/login")
  public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest request) {
    TokenPair tokenPair = authService.login(request);
    return ResponseEntity.ok(tokenPair);
  }

  @PostMapping("/refresh-token")
  public ResponseEntity<?> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
    TokenPair tokenPair = authService.refreshToken(request);
    return ResponseEntity.ok(tokenPair);
  }

}
