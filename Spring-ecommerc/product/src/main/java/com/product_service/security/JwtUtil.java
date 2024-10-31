package com.product_service.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Date;
@Component
public class JwtUtil {
    @Value("${security.jwt.secret-key}")
    private String secretKey;
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(SignatureAlgorithm.HS256, decodeSecretKey(secretKey))
                .compact();
    }
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(decodeSecretKey(secretKey)).parseClaimsJws(token);
            return !isTokenExpired(token);
        } catch (Exception e) {
            return false;
        }
    }
    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser().setSigningKey(decodeSecretKey(secretKey)).parseClaimsJws(token).getBody();
        return claims.getSubject();
    }
    private boolean isTokenExpired(String token) {
        Date expiration = Jwts.parser().setSigningKey(decodeSecretKey(secretKey)).parseClaimsJws(token).getBody().getExpiration();
        return expiration.before(new Date());
    }
    private byte[] decodeSecretKey(String base64Secret) {
        return Base64.getDecoder().decode(base64Secret);
    }
}

