package com.grandparents.common;

import com.grandparents.domain.account.Account;
import com.grandparents.domain.account.AccountRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

public class BaseTimeEntityTest extends BaseTest {

    @Autowired AccountRepository accountRepository;

    @Test
    @DisplayName("Jpa Auditing 자동 생성 확인")
    public void jpaAuditing() throws Exception {
        String testEmail = "abc@naver.com";

        //given
        Account testAccount = Account.builder()
                                    .email(testEmail)
                                    .name("abc")
                                    .password("123123123")
                                    .build();
        LocalDateTime now = LocalDateTime.now();
        accountRepository.save(testAccount);

        //when
        Account account = accountRepository.findByEmail(testEmail).orElseThrow(() -> new UsernameNotFoundException("해당 회원을 찾을 수 없습니다."));

        //then
        assertThat(account.getCreatedDate().isAfter(now));
        assertThat(account.getLastModifiedDate().isAfter(now));
    }

}
