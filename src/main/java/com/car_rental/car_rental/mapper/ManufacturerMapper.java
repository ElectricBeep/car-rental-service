package com.car_rental.car_rental.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.car_rental.car_rental.dto.ManufacturerDto;
import com.car_rental.car_rental.model.Manufacturer;

@Mapper(componentModel = "spring")
public interface ManufacturerMapper {
  ManufacturerDto toDto(Manufacturer manufacturer);
  Manufacturer toEntity(ManufacturerDto manufacturerDto);
  @Mapping(target = "id", ignore = true)
  void updateEntity(ManufacturerDto manufacturerDto, @MappingTarget Manufacturer manufacturer);
}
