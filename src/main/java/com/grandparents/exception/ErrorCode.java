package com.grandparents.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    JWT_EXPIRED(UNAUTHORIZED, "TokenExpiredError"),
    JWT_UNSUPPORTED(BAD_REQUEST, "지원되지 않는 JWT 토큰입니다."),
    JWT_ILLEGAL(BAD_REQUEST, "JWT 토큰이 잘못되었습니다."),
    JWT_SECURITY(BAD_REQUEST, "잘못된 JWT 서명입니다.");

    private final HttpStatus httpStatus;
    private final String message;

}
