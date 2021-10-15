package com.grandparents.domain.member.dto;

import com.grandparents.domain.member.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class MemberDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RequestDto {
        @NotBlank
        @Email
        private String email;

        @NotBlank
        @Length(min = 8, max = 50)
        private String password;

        @NotBlank
        @Length(min = 8, max = 50)
        private String passwordConfirm;

        private String userType;
        private Role role;

        public UsernamePasswordAuthenticationToken toAuthentication() {
            return new UsernamePasswordAuthenticationToken(email, password);
        }

    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ResponseDto {
        private String email;
    }

}
