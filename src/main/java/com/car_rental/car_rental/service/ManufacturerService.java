package com.car_rental.car_rental.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.car_rental.car_rental.model.Manufacturer;
import com.car_rental.car_rental.repository.ManufacturerRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ManufacturerService {
  private final ManufacturerRepository manufacturerRepository;

  public List<Manufacturer> getAllManufacturers() {
    return manufacturerRepository.findAll();
  }

  public Optional<Manufacturer> getManufacturer(Long id) {
    return manufacturerRepository.findById(id);
  }

  public Manufacturer saveManufacturer(Manufacturer manufacturer) {
    return manufacturerRepository.save(manufacturer);
  }

  public void deleteManufacturer(Long id) {
    manufacturerRepository.deleteById(id);
  }
}
