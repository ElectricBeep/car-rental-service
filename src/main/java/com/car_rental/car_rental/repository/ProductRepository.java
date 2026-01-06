package com.car_rental.car_rental.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.car_rental.car_rental.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
