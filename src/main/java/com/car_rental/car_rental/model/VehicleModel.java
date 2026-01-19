package com.car_rental.car_rental.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
@Table(name = "vehicle_models")
public class VehicleModel {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private Long id;

  @NotBlank(message = "Name is required")
  @Size(min = 2, max = 20, message = "Name must be between 2 and 20 characters")
  @Column(nullable = false, unique = true)
  private String name;

  private String description;

  @ManyToOne
  private Manufacturer manufacturer;
}
