package com.grandparents.domain.member;

import com.grandparents.domain.member.dto.MemberDto;
import com.grandparents.jwt.dto.TokenDto;

public interface MemberService {

    MemberDto.ResponseDto processNewAccount(MemberDto.RequestDto memberRequestDto);

    TokenDto.ResponseDto login(MemberDto.RequestDto memberRequestDto);

    TokenDto.ResponseDto reIssue(TokenDto.RequestDto tokenRequestDto);

}
