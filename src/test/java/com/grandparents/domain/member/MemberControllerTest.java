package com.grandparents.domain.member;

import com.grandparents.common.BaseTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class MemberControllerTest extends BaseTest {

    @DisplayName("회원 가입 화면 출력 테스트")
    @Test
    void signUpForm() throws Exception {
        mockMvc.perform(get("/auth/sign-up"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(view().name("member/sign-up"))
                .andExpect(model().attributeExists("signUpForm"));
    }

}