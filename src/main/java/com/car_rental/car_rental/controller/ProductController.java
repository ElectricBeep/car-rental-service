package com.car_rental.car_rental.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.car_rental.car_rental.model.Product;
import com.car_rental.car_rental.service.ProductService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
  private final ProductService productService;

  @GetMapping
  public ResponseEntity<?> getAllProducts() {
    return ResponseEntity.ok(productService.getAllProducts());
  }
  
  @GetMapping("/{id}")
  public ResponseEntity<?> getProductbuId(@PathVariable("id") Long id) {
    return ResponseEntity.ok(productService.getProdyctbyId(id));
  }

  @PostMapping
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> saveProduct(@Valid @RequestBody Product product) {
    return ResponseEntity.ok(productService.saveProduct(product));
  }

  @PutMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> updateProduct(@PathVariable("id") Long id, @Valid @RequestBody Product product) {
    return ResponseEntity.ok(productService.saveProduct(product));
  }

  @DeleteMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> deleteProduct(@PathVariable("id") Long id) {
    productService.deleteProduct(id);
    return ResponseEntity.ok("Product deleted successfully");
  }
}
