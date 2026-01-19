package com.car_rental.car_rental.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.car_rental.car_rental.dto.VehicleModelDto;
import com.car_rental.car_rental.model.VehicleModel;

@Mapper(componentModel = "spring")
public interface VehicleModelMapper {
  @Mapping(source = "manufacturer.id", target = "manufacturerId")
  VehicleModelDto toDto(VehicleModel vehicleModel);

  @Mapping(target = "manufacturer", expression = "java(new com.car_rental.car_rental.model.Manufacturer(vehicleModelDto.getManufacturerId()))")
  VehicleModel toEntity(VehicleModelDto vehicleModelDto);
}
