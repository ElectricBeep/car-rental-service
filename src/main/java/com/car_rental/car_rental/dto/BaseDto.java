package com.car_rental.car_rental.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public abstract class BaseDto {
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
}
