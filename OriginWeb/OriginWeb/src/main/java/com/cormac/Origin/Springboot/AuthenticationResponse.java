package com.cormac.Origin.Springboot;

public class AuthenticationResponse {

    private String jwt;
    private Long userId;
    private String message;

    public AuthenticationResponse(String jwt, Long userId, String message) {
        this.jwt = jwt;
        this.userId = userId;
        this.message = message;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}


