package com.car_rental.car_rental.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
  @Size(min = 3, max = 10, message = "Username is required")
  @Column(nullable = false, unique = true)
  private String username;

  @Size(min = 3, max = 999, message = "Password is required")
  @Column(nullable = false)
  private String password;
}
