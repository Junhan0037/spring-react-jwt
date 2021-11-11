package com.grandparents.exception;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ErrorResponse {

    private final LocalDateTime time;
    private final int status;
    private final String message;

    public ErrorResponse(ErrorCode errorCode) {
        this.time = LocalDateTime.now();
        this.status = errorCode.getHttpStatus().value();
        this.message = errorCode.getMessage();
    }

}
