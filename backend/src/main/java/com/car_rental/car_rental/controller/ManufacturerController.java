package com.car_rental.car_rental.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import com.car_rental.car_rental.dto.ManufacturerDto;
import com.car_rental.car_rental.mapper.ManufacturerMapper;
import com.car_rental.car_rental.model.Manufacturer;
import com.car_rental.car_rental.service.ManufacturerService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/manufacturers")
@AllArgsConstructor
public class ManufacturerController {
  private final ManufacturerService manufacturerService;
  private final ManufacturerMapper manufacturerMapper;

  @GetMapping
  public ResponseEntity<List<ManufacturerDto>> getAllManufacturers() {
    List<Manufacturer> manufacturers = manufacturerService.getAllManufacturers();
    return ResponseEntity.ok(manufacturers.stream().map(manufacturerMapper::toDto).toList());
  }

  @GetMapping("/{id}")
  public ResponseEntity<ManufacturerDto> getManufacturer(@PathVariable(name = "id") Long id) {
    Optional<Manufacturer> manufacturer = manufacturerService.getManufacturer(id);

    if (manufacturer.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(manufacturerMapper.toDto(manufacturer.get()));
  }

  @PostMapping
  public ResponseEntity<ManufacturerDto> createManufacturer(@Valid @RequestBody ManufacturerDto data, UriComponentsBuilder uriBuilder) {
    Manufacturer manufacturer = manufacturerService.saveManufacturer(manufacturerMapper.toEntity(data));
    ManufacturerDto manufacturerDto = manufacturerMapper.toDto(manufacturer);
    URI uri = uriBuilder.path("/api/manufacturers/{id}").buildAndExpand(manufacturerDto.getId()).toUri();
    return ResponseEntity.created(uri).body(manufacturerDto);
  }

  @PutMapping("/{id}")
  public ResponseEntity<ManufacturerDto> updateManufacturer(@PathVariable(name = "id") Long id, @Valid @RequestBody ManufacturerDto data) {
    Optional<Manufacturer> manufacturer = manufacturerService.getManufacturer(id);

    if (manufacturer.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    manufacturerMapper.updateEntity(data, manufacturer.get());
    manufacturerService.saveManufacturer(manufacturer.get());

    return ResponseEntity.ok(manufacturerMapper.toDto(manufacturer.get()));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteManufacturer(@PathVariable(name = "id") Long id) {
    Optional<Manufacturer> manufacturer = manufacturerService.getManufacturer(id);
    if (manufacturer.isEmpty()) {
      return ResponseEntity.notFound().build();
    }
    manufacturerService.deleteManufacturer(id);
    return ResponseEntity.noContent().build();
  }
}
