package com.car_rental.car_rental.dto;


import com.car_rental.car_rental.model.Role;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
  @Size(min = 3, max = 50, message = "Full name must be between 3 and 50 characters")
  @Column(name = "full_name", nullable = false)
  private String fullName;

  @Size(min = 3, max = 10, message = "Username must be between 3 and 10 characters")
  @Column(nullable = false, unique = true)
  private String username;

  @Size(min = 3, max = 999, message = "Password must be at least 3 chacacters")
  @Column(nullable = false)
  private String password;

  private Role role;
}
