package com.grandparents.domain.member;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {

    ADMIN("ROLE_ADMIN", "관리자"),
    USER("ROLE_USER", "일반 사용자"),
    ASSISTANT("ROLE_ASSISTANT", "요양 보호사"),
    OAUTH("ROLE_OAUTH", "소셜 로그인");

    private final String key;
    private final String title;

}
