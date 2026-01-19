package com.car_rental.car_rental.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.car_rental.car_rental.model.VehicleModel;

public interface VehicleModelRepository extends JpaRepository<VehicleModel, Long> {

}
