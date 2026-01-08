package com.car_rental.car_rental.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ManufacturerDto {
  private Long id;

  @NotBlank(message = "Name is required")
  @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")
  private String name;

  @Size(max = 500, message = "Description must not exceed 500 characters")
  private String description;

  @Size(max = 255, message = "Image URL must not exceed 255 characters")
  private String image;
}
