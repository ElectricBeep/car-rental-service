package com.car_rental.car_rental.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private Long id;

  @NotBlank(message = "Full name is required")
  @Size(min = 3, max = 50, message = "Full name must be between 3 and 50 characters")
  @Column(name = "full_name", nullable = false)
  private String fullName;

  @NotBlank(message = "Username is required")
  @Size(min = 3, max = 10, message = "Username must be between 3 and 10 characters")
  @Column(nullable = false, unique = true)
  private String username;

  @NotBlank(message = "Password is required")
  @Size(min = 3, max = 999, message = "Password must be at least 3 chacacters")
  @Column(nullable = false)
  private String password;

  @Enumerated(EnumType.STRING)
  private Role role;

  public User(
      @NotBlank(message = "Full name is required") @Size(min = 3, max = 50, message = "Full name must be between 3 and 50 characters") String fullName,
      @NotBlank(message = "Username is required") @Size(min = 3, max = 10, message = "Username must be between 3 and 10 characters") String username,
      @NotBlank(message = "Password is required") @Size(min = 3, max = 999, message = "Password must be at least 3 chacacters") String password,
      Role role) {
    this.fullName = fullName;
    this.username = username;
    this.password = password;
    this.role = role;
  }
}
