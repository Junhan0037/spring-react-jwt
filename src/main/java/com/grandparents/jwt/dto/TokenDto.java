package com.grandparents.jwt.dto;

import com.grandparents.domain.member.Role;
import lombok.*;

public class TokenDto {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RequestDto {
        private String accessToken;
        private String refreshToken;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ResponseDto {
        private String grantType;
        private String accessToken;
        private String refreshToken;
        private Long accessTokenExpiresIn;

        private String name;
        private String email;
        private Role role;
    }

}
