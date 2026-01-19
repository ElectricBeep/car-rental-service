package com.car_rental.car_rental.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.car_rental.car_rental.model.VehicleModel;
import com.car_rental.car_rental.repository.VehicleModelRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class VehicleModelService {
  private final VehicleModelRepository vehicleModelRepository;

  public List<VehicleModel> getAllVehicleModels() {
    return vehicleModelRepository.findAll();
  }

  public Optional<VehicleModel> getVehicleModel(Long id) {
    return vehicleModelRepository.findById(id);
  }

  public VehicleModel saveVehicleModel(VehicleModel vehicleModel) {
    return vehicleModelRepository.save(vehicleModel);
  }

  public void deleteVehicleModel(Long id) {
    vehicleModelRepository.deleteById(id);
  }
}
