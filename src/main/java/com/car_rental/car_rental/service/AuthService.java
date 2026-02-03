package com.car_rental.car_rental.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.car_rental.car_rental.dto.LoginRequest;
import com.car_rental.car_rental.dto.RefreshTokenRequest;
import com.car_rental.car_rental.dto.RegisterRequest;
import com.car_rental.car_rental.dto.TokenPair;
import com.car_rental.car_rental.model.Role;
import com.car_rental.car_rental.model.User;
import com.car_rental.car_rental.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;
  private final JwtService jwtService;
  private final UserDetailsService userDetailsService;

  @Transactional
  public void registerUser(RegisterRequest registerRequest) {
    if (userRepository.existsByUsername(registerRequest.getUsername())) {
      throw new IllegalArgumentException("Username already in user");
    }

    User user = User
        .builder()
        .fullName(registerRequest.getFullName())
        .username(registerRequest.getUsername())
        .password(passwordEncoder.encode(registerRequest.getPassword()))
        .role(Role.ROLE_USER)
        .build();

    userRepository.save(user);
  }

  public TokenPair login(LoginRequest loginRequest) {
    Authentication authentication = authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
    );

    SecurityContextHolder.getContext().setAuthentication(authentication);

    return jwtService.generateTokenPair(authentication);
  }

  public TokenPair refreshToken(RefreshTokenRequest request) {
    String refreshToken = request.getRefreshToken();

    if (!jwtService.isRefreshToken(refreshToken)) {
      throw new IllegalArgumentException("Invalid refresh token");
    }

    String username = jwtService.extractUsernameFromToken(refreshToken);
    UserDetails userDetails = userDetailsService.loadUserByUsername(username);

    if (userDetails == null) {
      throw new IllegalArgumentException("User not found");
    }

    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
      userDetails,
      null,
       userDetails.getAuthorities()
    );

    // ✅ FIX: Generate BOTH new access and refresh tokens (true rotation)
    String newAccessToken = jwtService.generateAccessToken(authenticationToken);
    String newRefreshToken = jwtService.generateRefreshToken(authenticationToken);
    return new TokenPair(newAccessToken, newRefreshToken);
  }
}
