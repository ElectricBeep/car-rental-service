package com.car_rental.car_rental.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.car_rental.car_rental.model.Manufacturer;

public interface ManufacturerRepository extends JpaRepository<Manufacturer, Long> {

}
