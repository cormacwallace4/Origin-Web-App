package com.cormac.Origin.Springboot;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    private final String JWT_SECRET = "fhethertherhrwrghwrhrthrhrthwrthrwthrthrth4rthrtwhrthwrthwrthwrthwrthr";

    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("userId", user.getId())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 600000)) // Set to expire in 10 minutes
                .signWith(SignatureAlgorithm.HS256, JWT_SECRET)
                .compact();
    }

    public String validateToken(String token) {
        return Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(token).getBody().getSubject();
    }
    
    public Long getUserIdFromToken(String token) {
        return Long.parseLong(Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(token).getBody().get("userId").toString());
    }
}

