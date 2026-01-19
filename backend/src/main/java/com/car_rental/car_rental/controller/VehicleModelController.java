package com.car_rental.car_rental.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.car_rental.car_rental.dto.VehicleModelDto;
import com.car_rental.car_rental.mapper.VehicleModelMapper;
import com.car_rental.car_rental.model.Manufacturer;
import com.car_rental.car_rental.model.VehicleModel;
import com.car_rental.car_rental.service.ManufacturerService;
import com.car_rental.car_rental.service.VehicleModelService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/vehicle-models")
@RequiredArgsConstructor
public class VehicleModelController {
  private final VehicleModelService vehicleModelService;
  private final ManufacturerService manufacturerService;
  private final VehicleModelMapper vehicleModelMapper;

  @GetMapping
  public ResponseEntity<List<VehicleModelDto>> getAllVehicleModels() {
    List<VehicleModel> vehicleModels = vehicleModelService.getAllVehicleModels();
    return ResponseEntity.ok(vehicleModels.stream().map(vehicleModelMapper::toDto).toList());
  }

  @PostMapping
  public ResponseEntity<VehicleModelDto> createVehicleModel(@Valid @RequestBody VehicleModelDto vehicleModelDto, UriComponentsBuilder uriBuilder) {
    Optional<Manufacturer> manufacturer = manufacturerService.getManufacturer(vehicleModelDto.getManufacturerId());

    if (manufacturer.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    VehicleModel vehicleModel = vehicleModelService.saveVehicleModel(vehicleModelMapper.toEntity(vehicleModelDto));
    VehicleModelDto savedVehicleModel = vehicleModelMapper.toDto(vehicleModel);
    URI uri = uriBuilder.path("/api/vehicle-models/{id}").buildAndExpand(savedVehicleModel.getId()).toUri();
    return ResponseEntity.created(uri).body(savedVehicleModel);
  }
}
