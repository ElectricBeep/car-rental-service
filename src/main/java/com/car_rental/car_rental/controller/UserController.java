package com.car_rental.car_rental.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.car_rental.car_rental.dto.RegisterRequest;
import com.car_rental.car_rental.dto.UserDto;
import com.car_rental.car_rental.mapper.UserMapper;
import com.car_rental.car_rental.model.User;
import com.car_rental.car_rental.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;
  private final UserMapper userMapper;

  @PostMapping("/manager")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<String> createManagerUser(@RequestBody RegisterRequest request) {
    userService.saveManagerUser(request);
    return ResponseEntity.ok("Manager user created successfully!");
  }

  @PostMapping("/admin")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<String> createAdminUser(@RequestBody RegisterRequest request) {
    userService.saveAdminUser(request);
    return ResponseEntity.ok("Admin user created successfully!");
  }

  @GetMapping
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<List<UserDto>> getAllUsers() {
    List<User> users = userService.getAllUsers();
    return ResponseEntity.ok(users.stream().map(userMapper::toDto).toList());
  }

  @GetMapping("/{id}")
  public ResponseEntity<UserDto> getUser(@PathVariable(name = "id") Long id) {
    Optional<User> user = userService.getUser(id);

    if (user.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(userMapper.toDto(user.get()));
  }

  @DeleteMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<Void> deleteUser(@PathVariable(name = "id") Long id) {
    Optional<User> user = userService.getUser(id);

    if (user.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    userService.deleteUser(id);
    
    return ResponseEntity.noContent().build();
  }
}
