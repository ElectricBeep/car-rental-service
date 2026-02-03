package com.car_rental.car_rental.service;

import io.jsonwebtoken.security.SignatureException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.car_rental.car_rental.dto.TokenPair;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class JwtService {
  @Value("${app.jwt.secret}")
  private String jwtSecret;

  @Value("${app.jwt.expiration}")
  private long jwtExpirationMs;

  @Value("${app.jwt.refresh-expiration}")
  private long refreshExpirationMs;

  public TokenPair generateTokenPair(Authentication authentication) {
    String accessToken = generateAccessToken(authentication);
    String refreshToken = generateRefreshToken(authentication);
    return new TokenPair(accessToken, refreshToken);
  }

  public String generateAccessToken(Authentication authentication) {
    UserDetails userPrinciple = (UserDetails) authentication.getPrincipal();
    
    // Extract role from authentication
    String role = authentication.getAuthorities().stream()
        .findFirst()
        .map(Object::toString)
        .orElse("ROLE_USER");

    Date now = new Date();
    Date expiryDate = new Date(now.getTime() + jwtExpirationMs);

    Map<String, Object> claims = new HashMap<>();
    claims.put("role", role);

    return Jwts
        .builder()
        .header()
        .add("typ", "JWT")
        .and()
        .subject(userPrinciple.getUsername())
        .claims(claims)
        .issuedAt(now)
        .expiration(expiryDate)
        .signWith(getSignInKey())
        .compact();
  }

  public String generateRefreshToken(Authentication authentication) {
    UserDetails userPrinciple = (UserDetails) authentication.getPrincipal();
    
    // Extract role from authentication for refresh token too
    String role = authentication.getAuthorities().stream()
        .findFirst()
        .map(Object::toString)
        .orElse("ROLE_USER");

    Date now = new Date();
    Date expiryDate = new Date(now.getTime() + refreshExpirationMs);

    Map<String, Object> claims = new HashMap<>();
    claims.put("tokenType", "refresh");
    claims.put("role", role);

    return Jwts
        .builder()
        .header()
        .add("typ", "JWT")
        .and()
        .subject(userPrinciple.getUsername())
        .claims(claims)
        .issuedAt(now)
        .expiration(expiryDate)
        .signWith(getSignInKey())
        .compact();
  }

  public boolean isValidToken(String token, UserDetails userDetails) {
    String username = extractUsernameFromToken(token);

    if (!username.equals(userDetails.getUsername())) {
      return false;
    }

    try {
      Jwts
          .parser()
          .verifyWith(getSignInKey())
          .build()
          .parseSignedClaims(token);
      return true;
    } catch (SignatureException e) {
      log.error("Invalid JWT signature {}", e.getMessage());
    } catch (MalformedJwtException e) {
      log.error("Invalid JWT token {}", e.getMessage());
    } catch (ExpiredJwtException e) {
      log.error("JWT token is expired {}", e.getMessage());
    } catch (UnsupportedJwtException e) {
      log.error("JWT token is unsupported {}", e.getMessage());
    } catch (IllegalArgumentException e) {
      log.error("JWT claims string is empty {}", e.getMessage());
    }
    return false;
  }

  public boolean isRefreshToken(String token) {
    Claims claims = Jwts
        .parser()
        .verifyWith(getSignInKey())
        .build()
        .parseSignedClaims(token)
        .getPayload();

    return "refresh".equals(claims.get("tokenType"));
  }

  public boolean isAccessToken(String token) {
    Claims claims = Jwts
        .parser()
        .verifyWith(getSignInKey())
        .build()
        .parseSignedClaims(token)
        .getPayload();

    return !"refresh".equals(claims.get("tokenType"));
  }

  public String extractUsernameFromToken(String token) {
    return Jwts
        .parser()
        .verifyWith(getSignInKey())
        .build()
        .parseSignedClaims(token)
        .getPayload()
        .getSubject();
  }

  public String extractRoleFromToken(String token) {
    Claims claims = Jwts
        .parser()
        .verifyWith(getSignInKey())
        .build()
        .parseSignedClaims(token)
        .getPayload();
    
    return claims.get("role", String.class);
  }

  private SecretKey getSignInKey() {
    byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
    return Keys.hmacShaKeyFor(keyBytes);
  }
}
