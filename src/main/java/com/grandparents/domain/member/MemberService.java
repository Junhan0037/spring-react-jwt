package com.grandparents.domain.member;

import com.grandparents.jwt.TokenDto;
import com.grandparents.jwt.TokenRequestDto;

public interface MemberService {

    MemberResponseDto signUp(MemberRequestDto memberRequestDto);

    TokenDto login(MemberRequestDto memberRequestDto);

    TokenDto reIssue(TokenRequestDto tokenRequestDto);

}
