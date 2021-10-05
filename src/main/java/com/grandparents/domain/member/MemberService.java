package com.grandparents.domain.member;

import com.grandparents.domain.member.dto.MemberDto;
import com.grandparents.jwt.dto.TokenDto;

public interface MemberService {

    MemberDto.Response signUp(MemberDto.Request memberRequestDto);

    TokenDto.Response login(MemberDto.Request memberRequestDto);

    TokenDto.Response reIssue(TokenDto.Request tokenRequestDto);

}
