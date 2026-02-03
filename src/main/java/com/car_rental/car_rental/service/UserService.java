package com.car_rental.car_rental.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.car_rental.car_rental.dto.RegisterRequest;
import com.car_rental.car_rental.model.Role;
import com.car_rental.car_rental.model.User;
import com.car_rental.car_rental.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  public Optional<User> getUser(Long id) {
    return userRepository.findById(id);
  }

  public void saveAdminUser(RegisterRequest registerRequest) {
    if (userRepository.existsByUsername(registerRequest.getUsername())) {
      throw new IllegalArgumentException("Username already in user");
    }

    User user = User
        .builder()
        .fullName(registerRequest.getFullName())
        .username(registerRequest.getUsername())
        .password(passwordEncoder.encode(registerRequest.getPassword()))
        .role(Role.ROLE_ADMIN)
        .build();

    userRepository.save(user);    
  }

  public void saveManagerUser(RegisterRequest registerRequest) {
    if (userRepository.existsByUsername(registerRequest.getUsername())) {
      throw new IllegalArgumentException("Username already in user");
    }

    User user = User
        .builder()
        .fullName(registerRequest.getFullName())
        .username(registerRequest.getUsername())
        .password(passwordEncoder.encode(registerRequest.getPassword()))
        .role(Role.ROLE_MANAGER)
        .build();

    userRepository.save(user);    
  }

  public void deleteUser(Long id) {
    userRepository.deleteById(id);
  }

  public User findByUsername(String username) {
    return userRepository.findByUsername(username)
        .orElseThrow(() -> new IllegalArgumentException("User not found"));
  }
}
