package com.car_rental.car_rental.service;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import com.car_rental.car_rental.model.User;
import com.car_rental.car_rental.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
  private final UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));

    return new org.springframework.security.core.userdetails.User(
      user.getUsername(),
      user.getPassword(),
      getAuthority(user)
    );
  }

  private Collection<? extends GrantedAuthority> getAuthority(User user) {
    GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().name());
    return List.of(authority);
  }
}
