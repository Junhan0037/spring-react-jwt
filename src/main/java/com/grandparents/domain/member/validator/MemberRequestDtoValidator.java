package com.grandparents.domain.member.validator;

import com.grandparents.domain.member.MemberRepository;
import com.grandparents.domain.member.dto.MemberDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
@RequiredArgsConstructor
public class MemberRequestDtoValidator implements Validator {

    private final MemberRepository memberRepository;

    @Override
    public boolean supports(Class<?> aClass) {
        return aClass.isAssignableFrom(MemberDto.RequestDto.class);
    }

    @Override
    public void validate(Object target, Errors errors) { // 중복 검사
        MemberDto.RequestDto memberRequestDto = (MemberDto.RequestDto) target;
        if (memberRepository.existsByEmail(memberRequestDto.getEmail())) {
            errors.rejectValue("email", "invalid.email", new Object[]{memberRequestDto.getEmail()}, "이미 사용중인 이메일입니다.");
        }
        if (!memberRequestDto.getPassword().equals(memberRequestDto.getPasswordConfirm())) {
            errors.rejectValue("passwordConfirm", "wrong.value", "입력한 패스워드가 일치하지 않습니다.");
        }
    }

}
