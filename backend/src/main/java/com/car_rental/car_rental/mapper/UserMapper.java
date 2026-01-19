package com.car_rental.car_rental.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.car_rental.car_rental.dto.UserDto;
import com.car_rental.car_rental.model.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
  UserDto toDto(User user);
  
  @Mapping(target = "password", ignore = true)
  User toEntity(UserDto userDto);
}
