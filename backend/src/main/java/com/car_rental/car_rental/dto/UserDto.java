package com.car_rental.car_rental.dto;

import com.car_rental.car_rental.model.Role;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserDto {
  private Long id;

  @Size(min = 3, max = 50, message = "Full name must be between 3 and 50 characters")
  private String fullName;

   @Size(min = 3, max = 10, message = "Username must be between 3 and 10 characters")
  private String username;

  private Role role;
}
