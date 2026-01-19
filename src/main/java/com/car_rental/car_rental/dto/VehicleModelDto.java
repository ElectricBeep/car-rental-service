package com.car_rental.car_rental.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class VehicleModelDto {
  private Long id;

  @NotBlank(message = "Name is required")
  @Size(min = 2, max = 20, message = "Name must be between 2 and 20 characters")
  private String name;

  @Size(max = 500, message = "Description must not exceed 500 characters")
  private String description;

  @NotBlank(message = "Manufacturer ID is required")
  private Long manufacturerId;
}
